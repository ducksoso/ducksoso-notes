## SSH连接时出现Host key verification failed



用OpenSSH的人都知ssh会把你每个你访问过计算机的公钥(public key)都记录在~/.ssh/known_hosts。当下次访问相同计算机时，OpenSSH会核对公钥。如果公钥不同，OpenSSH会发出警告，避免你受到DNS Hijack之类的攻击

SSH对主机的public_key的检查等级是根据StrictHostKeyChecking变量来配置的。默认情况下，StrictHostKeyChecking=ask。

简单说下它的三种配置值：

1. StrictHostKeyChecking=no

   > 最不安全的级别，当然也没有那么多烦人的提示了，相对安全的内网时建议使用。果连接server的key在本地不存在，那么就自动添加到文件中（是known_hosts），并且给出一个警告。

2. StrictHostKeyChecking=ask

   >默认的级别，就是出现刚才的提示了。如果连接和key不匹配，给出提示，并拒绝登录。

3. StrictHostKeyChecking=yes

   > 最安全的级别，如果连接与key不匹配，就拒绝连接，不会提示详细信息。



### 解决办法

## 方法一、删除~/.ssh/known_hosts文件中对应ip的相关[rsa](https://so.csdn.net/so/search?q=rsa&spm=1001.2101.3001.7020)信息

输入命令`vi ~/.ssh/known_hosts`，编辑文件

删除对应ip的相关rsa信息，即可。

删除完毕之后，重新执行命令，会要求输入密码。

## 方法二、 使用 ssh-keygen -R hostname 命令

ssh-keygen -R [xxx.xxx.xxx.xxx](http://xxx.xxx.xxx.xxx/) (服务器ip地址)

> 目的是清除你当前机器里关于你的远程服务器的缓存和公钥信息，注意是大写的字母“R”。

比如 ~/.ssh/known_hosts文件中有一条 192.168.144.130 的配置。

执行`ssh-keygen -R 192.168.144.130`命令

删除完配置之后，重新执行命令，输入命令然后输入密码即可。







