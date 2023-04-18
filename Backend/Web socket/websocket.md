## websocket



websocket 是 HTML5新增的协议，目的是在浏览器和服务器之间建立一个不受限的双向通信的通道，例如：服务器可以在任意时刻发送消息给浏览器。

wesocket请求格式如下：

```
GET ws://localhost:3000/ws/chat HTTP/1.1
Host: localhost
Upgrade: websocket
Connection: Upgrade
Origin: http://localhost:3000
Sec-WebSocket-Key: client-random-string
Sec-WebSocket-Version: 13
```



与传统HTTP协议区别：

1. HTTP协议是请求-响应协议，而websocket是全双工通信；
2. websocket底层基于HTTP协议来建立连接的；
3. 以`ws://`开头的地址，不是之前的 `http://`这种；
4. 请求头`Upgrade: websocket`和`Connection: Upgrade`表示这个连接将要被转换为WebSocket连接；
5. `Sec-WebSocket-Key`是用于标识这个连接，并非用于加密数据；
6. `Sec-WebSocket-Version`指定了WebSocket的协议版本；



服务器如果接受该请求，就会返回如下响应：

```
HTTP/1.1 101 Switching Protocols
Upgrade: websocket
Connection: Upgrade
Sec-WebSocket-Accept: server-random-string
```

响应代码`101`表示本次连接的HTTP协议即将被更改，更改后的协议就是`Upgrade: websocket`指定的WebSocket协议。版本号和子协议规定了双方能理解的数据格式，以及是否支持压缩等。



一个WebSocket连接就建立成功，浏览器和服务器就可以随时主动发送消息给对方。消息有两种，一种是文本，一种是二进制数据。通常，我们可以发送JSON格式的文本，这样，在浏览器处理起来就十分容易。



安全的WebSocket连接机制和HTTPS类似。首先，浏览器用`wss://xxx`创建WebSocket连接时，会先通过HTTPS创建安全的连接，然后，该HTTPS连接升级为WebSocket连接，底层通信走的仍然是安全的SSL/TLS协议。



















QA:

1. WebSocket连接可以实现全双工通信而HTTP连接不行呢？

   实际上HTTP协议是建立在TCP协议之上的，TCP协议本身就实现了全双工通信，但是HTTP协议的请求－应答机制限制了全双工通信。WebSocket连接建立以后，其实只是简单规定了一下：接下来，咱们通信就不使用HTTP协议了，直接互相发数据吧！















[Go的websocket实现gorilla](https://github.com/gorilla/websocket)

[Go的tiny websocket gobwas](https://github.com/gobwas/ws)