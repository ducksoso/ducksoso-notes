# 







deployment

service

ingress























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