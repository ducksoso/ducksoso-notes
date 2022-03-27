## HTTP 405 错误码原因

发现httppost请求目标网站会出现405 状态码，原因为 Apache、IIS、Nginx等绝大多数web服务器，都不允许静态文件响应POST请求

所以将post请求改为get请求即可


