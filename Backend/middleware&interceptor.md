





Difference:

* Middleware 在外层，在handler之外。而 interceptor 分为 client & server interceptor，可以对 gRPC 请求和响应进行拦截处理。
* Middleware 进行身份验证、日志记录等，中间件可以拦截发送给handler的请求，也可以拦截handler返回给客户端的响应。
* 