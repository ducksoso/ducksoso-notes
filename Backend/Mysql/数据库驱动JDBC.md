

#### Connection 和 Session

* 连接(connection)是一个物理的概念，它指的是一个通过网络建立的客户端和mysql服务器的一个网络连接。

* 会话(Session)是不同的用户，与mysql实例(进程)建立的。

* 一个连接可以拥有多个会话也可以没有会话，同一个连接上的不同会话之间不会相互影响。

* 一个会话可以创建多个事务。(使用客端登录到数据库)

* 一个事务只能由一个会话产生。

MySQL下，一个connection生成了50000个Statement都不报错



## 加载驱动



## 创建连接



## Statement接口（sql预编译）

**用于执行静态SQL语句并返回其生成的结果的对象。**默认情况下，每个statement对象只能有一个ResultSet对象同时打开。statement对象也需要关闭，`execUpdate、execQuery`

### 1. statement的sql注入问题

直接传 string，可能后面带一些不可预料的 sql ，例如：drop table table_name;

### 2. preparedStatement的使用

​	完成sql预编译的过程，**使用它可以完成动态sql，可以最大限度的避免 sql 注入问题。**所有不确定的数据都以 `?`表示，向sql语句中传入参数替换 `?`。







