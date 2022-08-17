## Centos mysql 安装

mysql 是 c/s模式，需要一个客户端和一个服务端

安装完MySQL后，除了MySQL Server，即真正的MySQL服务器外，还附赠一个MySQL Client程序。MySQL Client是一个命令行客户端，可以通过MySQL Client登录MySQL，然后，输入SQL语句并执行。

> MySQL Client的可执行程序是mysql，MySQL Server的可执行程序是mysqld。

命令行程序`mysql`实际上是MySQL客户端，真正的MySQL服务器程序是`mysqld`，在后台运行



### 通过rpm方式安装：

```sh
查看已经安装的软件
rpm -qa | grep mysql
rpm -qa | grep -i mysql

rpm -ivh https://repo.mysql.com//mysql57-community-release-el7-11.noarch.rpm
yum update -y
yum install mysql-server
yum install mysql-community-client.x86_64

// 启动
systemctl start mysqld
// 查看运行状态
systemctl status mysqld
// 关闭默认启动
systemctl disable mysqld
// 停止
systemctl stop mysqld
// 查找mysql临时密码
grep 'temporary password' /var/log/mysqld.log

```





### mysql本身要支持远程访问

```sh
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'abcd123' WITH GRANT OPTION;
flush privileges;
```



允许用户root使用密码abcd123从任何主机连接到MYSQL服务器



### 遇到的问题？

1. 只安装mysql-client缺失mysql.sock

   通过rpm方式安装的mysql-client是不会有mysql.sock 和 /etc/my.conf 文件的，这样就无法本地连接mysql-server

   没有my.conf文件，

   * 可以从其他地方copy一份，自己创建
   * 或者通过 yum install mysql-server 就会生成

2. mysql 启动的时候才会创建mysql.sock，一旦停止则 mysql.sock 就会删除

   亲测

3. mysql配置文件是：my.conf，位置: /etc/my.cnf or /etc/mysql/my.cnf

   这个配置文件比较重要，它指定了 mysql.sock 的使用位置

4. docker 安装mysql，详见 `Docker/常用容器创建模块`

5. **犯了一个非常傻逼的事情**

   ```
   docker run -it --name mysql-test -p 3307:3306 -v /opt/data/mysql/mysqld:/var/run/mysqld -v /opt/data/mysql/conf:/etc/mysql/conf.d -v /opt/data/mysql/files:/var/lib/mysql-files -e MYSQL_ROOT_PASSWORD=123456 mysql:5.7
   ```

   container内部 mysql 使用的是 3306 端口。所以肯定要写成 **3307:3306.**

   这样远程访问的时候才可以.

   一般阿里云是有安全组的，需要在里面开启相应的 3307 端口安全组。以及关闭 Linux 自带的防火墙











