### Get方法URL长度

Http get方法提交的数据大小长度并没有限制，Http协议规范没有对URL长度进行限制。

目前说的get长度有限制，是特定的浏览器及服务器对它的限制。

各种浏览器和服务器的最大处理能力如下：

```js
IE:对IE浏览器URL的最大长度为2083个字符。若超出这个数字，提交按钮没有任何反应。
Firefox:对Firefox浏览器URL的最大长度为65536个字符。   
Safari: 对Safari浏览器URL的最大长度为80000个字符。   
Opera:  对Opera浏览器URL的最大长度为190000个字符。
Google(chrome):对Google浏览器URL的最大长度为8182个字符。  
Apache(Server):对Apache浏览器URL的最大长度为8192个字符(待定?)   
Microsoft Internet Information Server(IIS):对IIS浏览器URL的最大长度为16384个字符。
```

理论上讲，post是没有大小限制的。Http协议规范也没有进行大小限制，起限制作用的是服务器处理程序的处理能力。

```js
Tomcat下默认post长度为2M，可通过修改conf/server.xml中的“maxPostSize=0”来取消对post大小的限制。
```



**注意:(若长度超限，则服务端返回414标识)**

1、首先即使有长度限制，也是限制的是整个URI长度，而不仅仅是你的参数值数据长度。

2、HTTP协议从未规定GET/POST的请求长度限制是多少

3、所谓的请求长度限制是由浏览器和web服务器决定和设置的，浏览器和web服务器的设定均不一样，这依赖于各个浏览器厂家的规定或者可以根据web服务器的处理能力来设定。



### Get和Post方式请求的对比

|                  | Get                                                          | Post                                                         |
| ---------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 后退按钮/刷新    | 无害                                                         | 数据会被重新提交（浏览器应该告知用户数据会被重新提交）       |
| 书签             | 可收藏为书签                                                 | 不可收藏为书签                                               |
| 缓存             | 能被缓存                                                     | 不能缓存                                                     |
| 编码类型         | `application/x-www-form-urlencoded`                          | `application/x-www-form-urlencoded or multipart/form-data`，为二进制数据使用多重编码 |
| 历史             | 参数保留在浏览器历史中                                       | 参数不会保存在浏览器历史中                                   |
| 对数据长度的限制 | 是的，当发送数据时，GET方法向URL添加数据，URL长度时受限的    | 无限制                                                       |
| 对数据类型的限制 | 只允许ascii字符                                              | 没有限制，也允许二进制数据                                   |
| 安全性           | 与POST相比，GET的安全性较差，因为所发送的数据是URL的一部分<br />在发送密码或其他敏感信息时，不要使用GET | POST比GET更安全，因为参数不会被保存在浏览器历史或web服务器日志中 |
| 可见性           | 数据在URL中对所有人都是可见的                                | 数据不会显示在URL中                                          |

安全性：`GET` 和 `POST` 的安全问题都一样的，不要有谁比谁更安全



https://github.com/microsoft/api-guidelines/blob/vNext/Guidelines.md#711-http-status-codes
