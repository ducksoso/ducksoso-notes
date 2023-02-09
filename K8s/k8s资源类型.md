[TOC]



# 资源类型





最核心三个资源对象

deployment：最常见的无状态应用的控制器，支持应用的扩缩容、滚动更新等操作。

service：为弹性变动且存在生命周期的pod对象提供了一个固定的访问接口，用于服务发现和服务访问。

pod：是运行容器以及调度的最小单位，同一个pod可以同时运行多个容器，这些容器共享NET、UTS、IPC





ingress



endpoints



Headless service vs clusterip











## StatefulSet



| 类型&特性                            | Deployment                                                   | StatefulSet                                                  |
| ------------------------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ |
| 是否暴露到外网                       | 可以                                                         | 一般不                                                       |
| 请求面向的对象                       | serviceName                                                  | 指定pod的域名                                                |
| 灵活性                               | 只能通过service/serviceIp访问到k8s自动转发的pod              | 可以访问任意一个自定义的pod                                  |
| 易用性                               | 只需要关心Service的信息即可                                  | 需要知道要访问的pod启动的名称、headlessService名称           |
| PV/PVC绑定关系的稳定性（多replicas） | （pod挂掉后重启）无法保证初始的绑定关系                      | 可以保证                                                     |
| pod名称稳定性                        | 不稳定，因为是通过template创建，每次为了避免重复都会后缀一个随机数 | 稳定，每次都一样                                             |
| 启动顺序（多replicas）               | 随机启动，如果pod宕掉重启，会自动分配一个node重新启动        | pod按 app-0、app-1...app-（n-1），如果pod宕掉重启，还会在之前的node上重新启动 |
| 停止顺序（多replicas）               | 随机停止                                                     | 倒序停止                                                     |
| 集群内部服务发现                     | 只能通过service访问到随机的pod                               | 可以打通pod之间的通信（主要是被发现）                        |



## secret 资源

secret 有三种类型

* Opaque：使用base64编码存储信息，可以通过base64 --decode解码获得原始数据，因此安全性弱。

* kubernetes.io/dockerconfigjson：用于存储docker registry的认证信息。

* kubernetes.io/service-account-token：用于被 serviceaccount 引用。serviceaccout 创建时 Kubernetes 会默认创建对应的 secret。Pod 如果使用了 serviceaccount，对应的 secret 会自动挂载到 Pod 的 /run/secrets/kubernetes.io/serviceaccount 目录中。

项目中我们的项目中常用方式：

```shell
(☸ |xdp-system-kubernetes-admin-fit@xdp-system:hkha)➜  charts git:(feat/pip-chart) ✗ k get secret                                  
NAME                              TYPE                                  DATA   AGE
default-token-hjxzd               kubernetes.io/service-account-token   3      62d
entropy-registry-service-secret   Opaque                                5      42d
hkha-shell-api                    Opaque                                3      56d
xfs2-grpc-tls                     Opaque                                2      62d
```





### Opaque Secret

Opaque类型的Secret，其value为base64编码后的值

1. 从文件中创建 secret

   分别创建两个名为username.txt和password.txt的文件：

   ```
   $ echo -n "admin" > ./username.txt
   $ echo -n "1f2d1e2e67df" > ./password.txt
   ```

   使用kubectl create secret命令创建secret，

   generic：从本地 file, directory 或者 literal value 创建一个 secret

   ```shell
   $ kubectl create secret generic db-user-pass --from-file=./username.txt --from-file=./password.txt
   secret "db-user-pass" created
   ```

   

2. 使用描述文件创建 secret

   首先使用base64对数据进行编码：

   ```
   ```

   



​	





TODO





https://www.jianshu.com/p/1c54a8a33217