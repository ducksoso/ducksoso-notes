## Docker 容器之间互相访问

---

docker 容器之间都是互相隔离的，不能互相访问，有时候我们希望能够在一个容器访问其他容器里的服务，以下是三种方法解决容器互访问题。



一、虚拟IP访问

安装docker时，docker 会默认创建一个内部的桥接网络 docker0，每创建一个容器都会分配一个虚拟网卡，容器之间可以根据IP互相访问

启动两个容器，分别查看IP地址，然后在容器中用IP地址进行访问

```sh
# 进入容器中，查看本容器IP地址

ifconfig

en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
	options=6463<RXCSUM,TXCSUM,TSO4,TSO6,CHANNEL_IO,PARTIAL_CSUM,ZEROINVERT_CSUM>
	ether 90:9c:4a:cf:56:7f
	inet6 fe80::c6b:647c:de96:ff54%en0 prefixlen 64 secured scopeid 0x6
	inet 10.1.3.65 netmask 0xffff0000 broadcast 10.1.255.255
	nd6 options=201<PERFORMNUD,DAD>
	media: autoselect
	status: active

```



这种方式必须知道每个容器的IP，实际使用中并不实用





二、link

运行容器的时候加上参数：link

```
# 运行第一个容器
docker run -it --name centos-1 docker.io/centos:latest

# 运行第二个容器
docker run -it --name centos-2 --link centos-1:centos-1 docker.io/centos:latest

```

--link：参数中第一个 centos-1 是容器名，第二个 centos-1 是定义的容器别名（实用别名访问容器），为了方便使用，一般别名默认容器名。



此方法对容器创建的顺序有要求，如果集群内多个容器要互访，实用就不太方便



三、创建bridge网络

1、安装好docker后，创建 bridge 网络：`docker network create bbtnet`

查看所有的 bridge 网络

```sh
docker network ls
NETWORK ID     NAME      DRIVER    SCOPE
519f34c044b3   bridge    bridge    local
dc8eba94337b   host      host      local
23a2dbb2a4b4   none      null      local

```



2、运行容器连接到 `bbtnet`网络

实用方式：`docker run -it --name <容器名> --network <bridge> --network-alias <网络别名> <镜像名>`

```sh
docker run -it --name centos-1 --network bbtnet --network-alias centos-1

docker run -it --name centos-2 --network bbtnet --network-alias centos-2

```



3、从一个容器访问另一个容器

4、若访问容器中服务，可以使用：<网络别名>:<服务端口号>  的形式访问。



推荐使用自定义网络的形式，使用的是网络别名，不用考虑IP是否变动，只要连接到 docker 内部 bridge 网络即可互相访问。bridge 也可以建立多个，隔离在不同的网段。













