#include <signal.h>
#include <unistd.h>
#include <stdlib.h>
#include <sys/time.h>
#include <string>

#include "curl.h"
#include "cmdline.hpp"

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

int main(int argc, char *argv[]) {
    cmdline::parser parser;
    parser.add<std::string>("deb", 'd', "deb path", true);
    parser.add<std::string>("output", 'o', "output path", false, "plate_result");
    parser.parse_check(argc, argv);

    signal(SIGINT, exit_handler);
    signal(SIGQUIT, exit_handler);

    std::string deb_path = parser.get<std::string>("deb");
    std::string output_path = parser.get<std::string>("output");

    if (download_file(deb_path.c_str(), output_path.c_str()) == 0) {
        printf("\n#\n");
        printf("#\n");
        printf("# File downloaded successfully.\n");
        printf("#\n");
        printf("#\n");
        printf("# Begin remove aibox.\n");
        printf("#\n");
        printf("#\n");
        system("/usr/bin/dpkg -r aibox");
        printf("#\n");
        printf("#\n");
        printf("# Finish remove aibox.\n");
        printf("#\n");
        printf("#\n");
        printf("# Begin install aibox.\n");
        printf("#\n");
        printf("#\n");
        std::string cmd = "/usr/bin/dpkg -i " + output_path;
        system(cmd.c_str());
        printf("#\n");
        printf("#\n");
        printf("# Finish install aibox.\n");
        printf("#\n");
        printf("#\n");

    } else {
        printf("# Failed to download file.\n");
    }

    return 0;
}
