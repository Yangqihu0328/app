#include <signal.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/time.h>
#include <string>
#include <cstdio>

#include "curl.h"
#include "cmdline.hpp"
#include "nlohmann/json.hpp"

using json = nlohmann::json;

// const std::string SERVER_URL = "http://192.168.0.196:8010";

const std::string SERVER_URL = "https://api-aibox.yunjist.com";

static bool gIsRunning = false;

static int gExitCount = 0;
static void exit_handler(int s) {
    printf("\n====================== Caught signal: %d ======================\n", s);
    printf("please waiting to quit ...\n\n");
    gIsRunning = false;
    gExitCount++;
    if (gExitCount >= 3) {
        printf("\n======================      Force to exit    ====================== \n");
        _exit(1);
    }
}

// 全局变量，用于存储下载进度
double start_time;
double downloaded_size = 0.0; // 已下载大小（字节）

// 写入数据的回调函数
size_t write_data(void *ptr, size_t size, size_t nmemb, FILE *stream) {
    size_t written = fwrite(ptr, size, nmemb, stream);
    downloaded_size += written; // 更新已下载大小
    return written;
}

// 获取当前时间的函数（微秒）
double get_current_time() {
    struct timeval tv;
    gettimeofday(&tv, NULL);
    return (double)tv.tv_sec * 1000000.0 + (double)tv.tv_usec;
}

// 进度回调函数（可选，但用于更精确的下载速度计算）
int progress_callback(void *clientp,
                      curl_off_t dltotal,
                      curl_off_t dlnow,
                      curl_off_t ultotal,
                      curl_off_t ulnow) {
    if (dltotal > 0) {
        double elapsed_time = (double)(get_current_time() - start_time) / 1000000.0; // 转换为秒
        double speed = (downloaded_size / elapsed_time) / 1024.0; // 转换为KB/s
        printf("\rDownload speed: %.2f KB/s", speed);
        fflush(stdout);
    }
    return 0;
}
 
// 下载文件的方法
int download_file(const char *url, const char *outfilename) {
    CURL *curl;
    FILE *fp;
    CURLcode res;
 
    // 初始化libcurl
    curl_global_init(CURL_GLOBAL_ALL);
    curl = curl_easy_init();
    if(curl) {
        // 打开文件用于写入
        fp = fopen(outfilename, "wb");
        if(!fp) {
            perror("fopen");
            return 1;
        }
 
        curl_easy_setopt(curl, CURLOPT_URL, url);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_data);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, fp);

        // 设置进度回调函数
        curl_easy_setopt(curl, CURLOPT_XFERINFOFUNCTION, progress_callback);
        // 告诉libcurl我们想要接收进度信息
        curl_easy_setopt(curl, CURLOPT_NOPROGRESS, 0L);
 
        // 记录开始时间
        start_time = get_current_time();

        // 执行请求
        res = curl_easy_perform(curl);
 
        // 检查请求是否成功
        if(res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
            fclose(fp);
            curl_easy_cleanup(curl);
            return 1;
        }
 
        // 关闭文件和清理curl
        fclose(fp);
        curl_easy_cleanup(curl);
    }
 
    // 清理libcurl全局资源
    curl_global_cleanup();
 
    return 0;
}

// 回调函数，用于处理接收到的HTTP响应
size_t write_callback(void* contents, size_t size, size_t nmemb, std::string* response) {
    size_t total_size = size * nmemb;
    response->append((char*)contents, total_size);
    return total_size;
}

std::string http_post_request(const std::string& url, const std::string& headers, const std::string& params, long timeout) {
    CURL* curl;
    CURLcode res;
    std::string response;

    // 初始化 libcurl
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

        // 设置请求方法
        curl_easy_setopt(curl, CURLOPT_POST, 1L);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, params.c_str());

        // 设置请求头
        struct curl_slist* header_list = nullptr;
        if (!headers.empty()) {
            std::istringstream headerStream(headers);
            std::string header;
            while (std::getline(headerStream, header, ';')) {
                header_list = curl_slist_append(header_list, header.c_str());
            }
            curl_easy_setopt(curl, CURLOPT_HTTPHEADER, header_list);
        }

        // 设置超时时间
        curl_easy_setopt(curl, CURLOPT_TIMEOUT_MS, timeout);

        // 设置响应回调函数
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        // 发送请求
        res = curl_easy_perform(curl);

        // 检查是否发生错误
        if (res != CURLE_OK) {
            response = curl_easy_strerror(res);
        }

        // 清理资源
        curl_easy_cleanup(curl);
        curl_slist_free_all(header_list);
    }

    // 清理 libcurl
    curl_global_cleanup();  

    return response;
}

int main(int argc, char *argv[]) {
    signal(SIGINT, exit_handler);
    signal(SIGQUIT, exit_handler);

    cmdline::parser parser;
    parser.add<std::string>("id", 'i', "device id", true);
    parser.add<std::string>("url", 'u', "package url", true);
    parser.add<std::string>("name", 'n', "package name", true);
    parser.add<std::string>("describe", 'd', "package describe", true);
    parser.add<std::string>("token", 't', "web once token", true);
    parser.parse_check(argc, argv);

    std::string did = parser.get<std::string>("id");
    std::string package_url = parser.get<std::string>("url");
    std::string package_name = parser.get<std::string>("name");
    std::string package_describe = parser.get<std::string>("describe");
    std::string web_token = parser.get<std::string>("token");

    std::string res;
    std::string host = SERVER_URL;
    std::string api = "/devices/admin/upgradeRecord/save";
    std::string url = host + api;
    std::string header = "token: " + web_token + ";Content-Type: application/json;";

    // 更新中
    json message = {{"deviceSymbol", did}, 
                    {"packageName", package_name}, 
                    {"packageDescribe", package_describe}, 
                    {"upgradeStatus", 2}};
    std::string params = message.dump();
    res = http_post_request(url, header, params, 5000);
    printf("response: %s.\n", res.c_str());

    bool success = false;
    nlohmann::json jsonRes;
    try {
        jsonRes = nlohmann::json::parse(res);
        success = jsonRes["success"];
        if (success) {
            std::string id = jsonRes["content"]["id"];

            std::string package_full_name = "/opt/" + package_name + ".deb";
            if (download_file(package_url.c_str(), package_full_name.c_str()) == 0) {
                printf("\n");
                printf("# File downloaded successfully.\n");
                printf("#\n");
                printf("#\n");

                printf("# Begin backups medias.json file.\n");
                printf("#\n");
                printf("#\n");
                system("/usr/bin/cp -rf /opt/aibox/medias.json /opt");
                printf("# Finish backups medias.json file.\n");
                printf("#\n");
                printf("#\n");

                printf("# Begin remove aibox.\n");
                printf("#\n");
                printf("#\n");
                system("/usr/bin/dpkg -r aibox");
                printf("# Finish remove aibox.\n");
                printf("#\n");
                printf("#\n");

                printf("# Begin install aibox.\n");
                printf("#\n");
                printf("#\n");
                std::string cmd = "/usr/bin/dpkg -i " + package_full_name;
                system(cmd.c_str());
                printf("# Finish install aibox.\n");
                printf("#\n");
                printf("#\n");

                printf("# Begin update medias.json file.\n");
                printf("#\n");
                printf("#\n");
                system("/usr/bin/cp -rf /opt/medias.json /opt/aibox");
                printf("# Finish update medias.json file.\n");
                printf("#\n");
                printf("#\n");

                // 更新成功
                message = {{"id", id},
                           {"deviceSymbol", did},
                           {"packageName", package_name},
                           {"packageDescribe", package_describe},
                           {"upgradeStatus", 1}};
                params = message.dump();
                res = http_post_request(url, header, params, 5000);
                printf("response: %s.\n", res.c_str());

                // remove file
                if (std::remove(package_full_name.c_str()) == 0) {
                    printf("remove file [%s] success.\n", package_full_name.c_str());
                }

            } else {
                printf("# Failed to download file.\n");

                // 更新失败
                message = {{"id", id},
                           {"deviceSymbol", did},
                           {"packageName", package_name},
                           {"packageDescribe", package_describe},
                           {"upgradeStatus", 0}};
                params = message.dump();
                res = http_post_request(url, header, params, 5000);
                printf("response: %s", res.c_str());
            }
        }
    } catch (const nlohmann::json::parse_error &e) {
        std::cerr << "JSON parse error: " << e.what() << std::endl;
    } catch (const std::exception &e) {
        std::cerr << "An error occurred: " << e.what() << std::endl;
    }

    return 0;
}
