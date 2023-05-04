### 1、安装`kubectl`

需要本地安装：`kubectl`，类似于`docker`，可以用来管理`k8s`中的服务

1. 运行安装命令

   `brew install kubectl` or `brew install kubernetes-cli`

2. 查看版本信息

   `kubectl version --client`



1. k8s 184开发集群的配置文件

   一般都是直接放在 `.kube/config`下面，kubectl 会自动去`.kube/`下找的，应该也是可以直接指定的

2. 查看集群下的项目运行情况

   这个项目的pod在yifang namespace下：
   kubectl get pod | grep ycjk-dashboard-api



### `kubectl`使用

##### Kubernetes kubectl 指定不同 config 文件访问不同集群

指定集群配置`API`访问配置文件，并搜索相应的`pod`

`kubectl --kubeconfig ~/Downloads/local_bee get pods | grep enigma2-operation`


##### 查看指定pod的日志

`kubectl logs <pod_name>`

`kubectl logs -f <pod_name>` # 类似tail -f的方式查看

查看指定pod中指定容器的日志

`kubectl logs <pod_name> -c <container_name>`





https://kubernetes.io/zh/docs/tasks/tools/install-kubectl/

### 使用 Telepresence 在本地调试 Kubernetes 微服务

使用`Telepresence`主要是为了接近开发时候的痛点，`Telepresence`是一个面向 Kubernetes 用户的开发测试环境治理的辅助工具，用于在本地轻松开发和调试服务，同时将服务代理到远程 Kubernetes 集群。

#### 01-quick-start

**Installing Telepresence(Mac OS)**

```bash
# required by sshfs to mount the pod's filesystem
brew install --cask osxfuse

# installing telepresence
brew install datawire/blackbird/telepresence
```











https://www.telepresence.io/reference/install









