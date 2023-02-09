

1、Namespace 概述

Namespace是对一组资源和对象的抽象集合，比如可以用来将系统内部的对象划分为不同的项目组或用户组。常见的`pods, services, replication controllers`和`deployments`等都是属于某一个`namespace`的（默认是default），而`node, persistentVolumes`等则不属于任何`namespace`。

Namespace常用来隔离不同的用户，比如`Kubernetes`自带的服务一般运行在`kube-system namespace`中。

Kubernetes中的名称空间与`docker`中的名称空间不同。`K8s`中的名称空间只是做了一个逻辑上的隔离。



2、Namespace常用命令

查询

```
➜  ~ kubectl get namespaces
NAME                                             STATUS   AGE
default                                          Active   26d
ingress                                          Active   26d
kafka                                            Active   26d
kube-node-lease                                  Active   26d
kube-public                                      Active   26d
kube-system                                      Active   26d
elasticsearch                                    Active   26d

// namespace包含两种状态”Active”和”Terminating”。在namespace删除过程中，namespace状态被设置成”Terminating”。

// 查看default名称空间的详细信息
➜  ~ kubectl describe namespaces default

// 查看 elasticsearch 名称空间中的pod资源（两种写法都可以）
➜  ~ kubectl get pods --namespace=elasticsearch
➜  ~ kubectl get pods -n elasticsearch

// 如果不指定，默认也是查看 default 名称空间中的资源 / 如果配置了config文件则默认是从config中取
➜  ~ kubectl get pods

```

**创建、删除**

```
// 创建新的namesapce
➜  ~ kubectl create namespace ducksoso
// 删除创建的namespace
➜  ~ kubectl delete namespace ducksoso
```

注意：

> 删除一个名称空间时会自动删除所有属于该namespace的资源；
>
> default 和 kube-system 名称空间不可以删除；
>
> namespace 资源对象仅用于资源对象的隔离，并不能隔绝不同名称空间的`pod`之间的通信。如果需要隔离`pod`之间的通信可以使用网络策略资源这项功能；











