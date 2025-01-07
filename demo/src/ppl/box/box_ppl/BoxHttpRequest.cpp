#include "BoxHttpRequest.hpp"

#include "curl.h"

#include <thread>
#include <sstream>
#include <functional>

// 回调函数，用于处理接收到的HTTP响应
size_t write_callback(void* contents, size_t size, size_t nmemb, std::string* response) {
    size_t total_size = size * nmemb;
    response->append((char*)contents, total_size);
    return total_size;
}

void run(const std::string& method, const std::string& url, const std::string& headers, const std::string& params, long timeout, std::string& response) {
    CURL* curl;
    CURLcode res;

    // 初始化 libcurl
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();

    if (curl) {
        // 设置请求 URL
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());

        // 设置请求方法
        if (method == "get") {
            curl_easy_setopt(curl, CURLOPT_HTTPGET, 1L);
        } else if (method == "post") {
            curl_easy_setopt(curl, CURLOPT_POST, 1L);
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, params.c_str());
        } else if (method == "put") {
            curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
            curl_easy_setopt(curl, CURLOPT_POSTFIELDS, params.c_str());
        } else if (method == "delete") {
            curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "DELETE");
        }

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
}

/*
* method = "GET"
* url = "https://iii.x-packing.com/control/phone/official/list"
* headers = "Content-Type: application/json;"
* params = "iszh=0&belong=0&onsale=1"
* timeout = 5000ms
*/
// 发送HTTP请求
std::string BoxHttpRequest::Send(const std::string& method, const std::string& url, const std::string& headers, const std::string& params, long timeout) {
    std::string response;

    // 创建一个线程来发送HTTP请求
    std::thread thread_(std::bind(&run, method, url, headers, params, timeout, std::ref(response)));

    // wait thread exit
    if (thread_.joinable()) {
        thread_.join();
    }

    return response;
}

void uploadRequest(const std::string& tenantid, const std::string& url, const std::string& path, std::string& response) {
    CURL* curl;
    CURLcode res;
    curl = curl_easy_init();
    if (curl) {
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "POST");

        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");

        // 设置请求头
        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Accept: */*");
        headers = curl_slist_append(headers, "Connection: keep-alive");
        headers =
         curl_slist_append(headers, "Content-Type: multipart/form-data; boundary=--------------------------667840143398521661629613");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        curl_mime* mime;
        curl_mimepart* part;
        mime = curl_mime_init(curl);
        part = curl_mime_addpart(mime);
        curl_mime_name(part, "file");
        curl_mime_filedata(part, path.c_str());
        part = curl_mime_addpart(mime);
        curl_mime_name(part, "tenantId");
        curl_mime_data(part, tenantid.c_str(), CURL_ZERO_TERMINATED);
        curl_easy_setopt(curl, CURLOPT_MIMEPOST, mime);

        // 设置超时时间
        curl_easy_setopt(curl, CURLOPT_TIMEOUT_MS, 5000);

        // 设置响应回调函数
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &response);

        res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            response = curl_easy_strerror(res);
        }

        curl_mime_free(mime);
    }

    curl_easy_cleanup(curl);
}

std::string BoxHttpRequest::UploadFile(const std::string& tenantid, const std::string& url, const std::string& path) {
    std::string response;

    // 创建一个线程来发送HTTP请求
    std::thread thread_(std::bind(&uploadRequest, tenantid, url, path, std::ref(response)));

    // wait thread exit
    if (thread_.joinable()) {
        thread_.join();
    }

    return response;
}

void uploadDataRequest(const std::string& url, const std::string& path, std::string& response) {
    CURL* curl;
    CURLcode res;
    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if (curl) {
        FILE *file = fopen(path.c_str(), "rb");
        if (!file) {
            perror("fopen");
            curl_easy_cleanup(curl);
            curl_global_cleanup();
            return;
        }

        // Set up the PUT request
        curl_easy_setopt(curl, CURLOPT_URL, url.c_str());
        curl_easy_setopt(curl, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_easy_setopt(curl, CURLOPT_FOLLOWLOCATION, 1L);
        curl_easy_setopt(curl, CURLOPT_DEFAULT_PROTOCOL, "https");

        fseek(file, 0, SEEK_END);
        size_t size = ftell(file);
        fseek(file, 0, SEEK_SET);

        char* ptr = (char *)malloc(size);
        if (!ptr) {
            perror("malloc");
            fclose(file);
            curl_easy_cleanup(curl);
            curl_global_cleanup();
            return;
        }

        // 读取文件内容到内存
        size_t bytesRead = fread(ptr, 1, size, file);
        if (bytesRead != size) {
            perror("fread");
            free(ptr);
            fclose(file);
            curl_easy_cleanup(curl);
            curl_global_cleanup();
            return;
        }

        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, ptr);
        curl_easy_setopt(curl, CURLOPT_POSTFIELDSIZE, size);

        // Set appropriate headers
        struct curl_slist* headers = nullptr;
        headers = curl_slist_append(headers, "Accept: */*");
        headers = curl_slist_append(headers, "Content-Type: application/octet-stream");
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);

        // Perform the request
        res = curl_easy_perform(curl);
        if (res != CURLE_OK) {
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));
        }

        fclose(file);
        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);

        free(ptr);
        ptr = nullptr;
    }
    curl_global_cleanup();
}

std::string BoxHttpRequest::UploadFileData(const std::string& url, const std::string& path) {
    std::string response;

    // 创建一个线程来发送HTTP请求
    std::thread thread_(std::bind(&uploadDataRequest, url, path, std::ref(response)));

    // wait thread exit
    if (thread_.joinable()) {
        thread_.join();
    }

    return response;
}
