
## docker run -p ip:hostPort:containerPort redis

**使用-p参数 会分配宿主机的端口映射到虚拟机。**
​
IP表示主机的IP地址。
​ 
hostPort表示宿主机的端口。
​ 
containerPort表示虚拟机的端口。

### **支持的格式有三种：**


ip:hostPort:containerPort：映射指定地址的指定端口到虚拟机的指定端口（不常用） 
​
如：127.0.0.1:3306:3306，映射本机的3306端口到虚拟机的3306端口。 
​
ip::containerPort：映射指定地址的任意端口到虚拟机的指定端口。（不常用） 
​
如：127.0.0.1::3306，映射本机的3306端口到虚拟机的3306端口。 
​
hostPort:containerPort：映射本机的指定端口到虚拟机的指定端口。（常用）  
​
如：3306:3306，映射本机的3306端口到虚拟机的3306端口。



如果某个镜像的Dockerfile有默认的CMD，这个时候可以覆盖:

使用 `--entrypoint /bin/bash`可以覆盖镜像默认的 `entrypoint`

```shell
docker run -it --entrypoint /bin/bash docker-reg.basebit.me:5000/enigma2-apps/cromwell-dind:6.3_20.10
```











