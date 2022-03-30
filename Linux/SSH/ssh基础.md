# SSH 基础

以下 `ssh-keygen` 命令默认在 `~/.ssh` 目录中生成 4096 位 SSH RSA 公钥和私钥文件。 如果当前位置存在 SSH 密钥对，这些文件将被覆盖。

`ssh-keygen -m PEM -t rsa -b 4096`

`ssh-keygen -t rsa -m PEM -b 4096 -C "azureuser@myserver"`



### Linux远程服务器免密登录

1. 生成密钥对

2. 上传到服务器上

   1. 手动上传，copy id_rsa.pub 内容到服务器上的 `.ssh/authorized_keys` 里，没有`authorized_keys`文件就创建一个

   2. 直接使用`ssh-copy-id`命令

      `ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.144.131`

      ssh-copy-id是用来将本地公钥拷贝到远程的authorized_keys文件的脚本命令，它还会将身份标识追加到远程服务器的～/.ssh/authorized_keys文件中，并给远程主机的用户目录适当的权限。

3. 把专用密钥添加到 ssh-agent 的高速缓存中：

   `ssh-add`

4. 重启ssh服务

​	`service sshd restart or systemctl restart sshd`





