## service account 和 cluster role

起因：

在 ai-validation服务中，直接调用 xeem 服务

* 配置kubeconfig
* 为kubeconfig中的account配置权限

在 `deployment.yaml.spec.template.spec.serviceAccount` or `cluster-role-binding.yaml.subjects.kind`中绑定 service account -> clusterRoleBinding



## service account

运行在pod里的进程需要调用Kubernetes API以及非Kubernetes API的其它服务，Service Account它并不是给kubernetes集群的用户使用的，而是**给pod里面的进程使用**的，它为pod提供必要的身份认证。这样pod里的容器就可以访问api

```shell
// 默认情况下，每个namespace都会有一个default account

k get serviceaccounts

k get sa default -o yaml

// 具体看下 secret
k get secret default-token-l92rm -o yaml

// 进入容器中
ls -l  /var/run/secrets/kubernetes.io/serviceaccount/
lrwxrwxrwx 1 root root 13 Apr 17 04:08 ca.crt -> ..data/ca.crt
lrwxrwxrwx 1 root root 16 Apr 17 04:08 namespace -> ..data/namespace
lrwxrwxrwx 1 root root 12 Apr 17 04:08 token -> ..data/token

// 可以看到已将ca.crt 、namespace和token放到容器内了，那么这个容器就可以通过https的请求访问apiserver了

```



Kubernetes提供了Secret来处理敏感信息，目前Secret的类型有3种：

* Opaque(default): 任意字符串
* kubernetes.io/service-account-token: 作用于ServiceAccount
* kubernetes.io/dockerconfigjson: 作用于Docker registry，用户下载docker镜像认证使用



### ClusterRoleBinding

```
// 集群 role
k get clusterrolebinding

kubectl get rolebinding

```





参考：



[serviceAccount](https://kubernetes.io/zh-cn/docs/tasks/configure-pod-container/configure-service-account/#%E6%89%8B%E5%8A%A8%E4%B8%BA-serviceaccount-%E5%88%9B%E5%BB%BA%E9%95%BF%E6%9C%9F%E6%9C%89%E6%95%88%E7%9A%84-api-%E4%BB%A4%E7%89%8C-manually-create-a-long-lived-api-token-for-a-serviceaccount)

https://www.cnblogs.com/xzkzzz/p/9889173.html