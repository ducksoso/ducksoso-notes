[[_TOC_]]
# Setup Guide

This directory contains example of how to setup environment to access kubernetes by kubectl.
## Installation Guide
kubectl是kubernetes命令行工具，可以通过kubectl对k8s集群运行命令来部署应用、监测和管理集群资源以及查看日志。

- [安装kubectl](https://kubernetes.io/zh/docs/tasks/tools/)
- [配置对多集群的访问](https://kubernetes.io/zh/docs/tasks/access-application-cluster/configure-access-multiple-clusters/)
  - 简单来说，每个集群都有用于配置集群访问的kubeconfig文件，我们可以把每个配置文件加入到$KUBECONFIG环境变量以便后续切换不同集群
  - 举例：对于多个cfg文件
    ```
    for cfg in $(ls ~/.kube/*.cfg); do
        export KUBECONFIG=$KUBECONFIG:$cfg
    done
    ```
  - 用户可以使用 kubectl config use-context 命令快速地在集群之间进行切换，为了更方便地切换集群，还可以选择安装kubectx工具
- [文档](https://kubernetes.io/zh/docs/reference/kubectl/)
- kubeconfig file example
  ```cfg
  apiVersion: v1
  clusters:
  - cluster:
      certificate-authority-data: <CERTIFICATE_SECRET_TO_REPLACE>
      server: https://172.18.0.184:6443
    name: kubernetes-184
  contexts:
  - context:
      cluster: kubernetes-184
      namespace: yifang
      user: <USER_NAME_TO_REPLACE>
    name: basebit-184-context@dev
  current-context: basebit-184-context@dev
  kind: Config
  preferences: {}
  users:
  - name: <USER_NAME_TO_REPLACE>
    user:
      token: <USER_SECRET_TO_REPLACE>
  ```

  The example is for the ```yifang``` environment, the cluster will be ```kubernetes-184```, please replace the tags with ```<>``` quoted.


# Tools
## kubectx, kubens
使用kubectx和kubens可以方便地切换各个集群和命名空间
为了便于快速切换context或namespace
- [安装地址](https://github.com/ahmetb/kubectx#installation)
- 建议同时安装fzf，通过交互式菜单选择集群。[安装地址](https://github.com/junegunn/fzf#installation)


## kube-ps1
kube-ps1可以在bash或zsh提示符前显示当前所处context和namespace
- [安装地址](https://github.com/jonmosco/kube-ps1#installing)
- 
  ```
  $ brew update
  $ brew install kube-ps1
  ```
- 安装完成后brew会提示在.bashrc或.zshrc中把kube-ps1的路径加入PROMPT环境变量，加完之后source ~/.bashrc或source ~/.zshrc即可
- 开启/关闭kube-ps1
  ```
  kubeon     : 当前shell开启kube-ps1
  kubeoff    : 当前shell关闭kube-ps1
  kubeon -g  : 全局开启kube-ps1
  kubeoff -g : 全局关闭kube-ps1
  ```

## stern 
stern可以tail多个pod的日志
- [安装地址](https://github.com/wercker/stern#installation)

## krew
krew工具可以帮助搜索，安装和管理kubectl的各种插件
- [介绍](https://github.com/gabeduke/kubectl-iexec)
- [安装地址](https://krew.sigs.k8s.io/docs/user-guide/setup/install/)
- [文档](https://krew.sigs.k8s.io/docs/)

## iexec
iexec是一个为进入容器提供交互式选择界面的kubectl插件，可以通过搜索过滤选择并进入容器
- 安装方法 ```kubectl krew install iexec```
- [使用方法](https://github.com/gabeduke/kubectl-iexec#usage)

## pod-lens
pod-lens是一个可以展示pod相关资源信息的kubectl插件
- [介绍](https://pod-lens.guoxudong.io/)
- 安装方法 ```kubectl krew install pod-lens```

# Basic Commands
[reference](https://git.basebit.me/DEV/xdp-deployment-troubleshooting/-/tree/master/10-k8s-commands#basic-commands)


| command | desc                                              | example                                                                             |
| ------- | ------------------------------------------------- | ----------------------------------------------------------------------------------- |
| create  | 从文件或stdin创建资源                             | kubectl create -f using-projected-volume.yml                                        |
| delete  | 删除指定资源，支持文件名、资源名、label selector  | kubectl delete po -l foo=bar<br />kubectl delete -f using-projected-volume.yml      |
| edit    | 使用系统编辑器编辑资源                            | kubectl edit deploy/foo                                                             |
| apply   | 从文件或stdin创建/更新资源，建议直接用 apply 创建 | kubectl apply -f using-projected-volume.yml                                         |
| get     | 最基本的查询命令                                  | kubectl get rs<br />kubectl get deploy<br />kubectl get svc<br />kubectl get rs/foo |
| explain | 查看资源定义                                      | kubectl explain po                                                                  |



# Troubleshooting and Debugging Commands
[reference](https://git.basebit.me/DEV/xdp-deployment-troubleshooting/-/tree/master/10-k8s-commands#troubleshooting-and-debugging-commands)


| command      | desc                      | example                                                                                                                                                                                                                                                                                                          |
| ------------ | ------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| describe     | 查看资源详情              | # 查看资源详情，从 events 可以看出具体的错误信息<br />kubectl describe pod {POD-NAME}                                                                                                                                                                                                                            |
| logs         | 查看pod内容器的日志       | # 查看 Pod 日志<br />kubectl logs -f {POD-NAME}<br /># 查看容器上一次异常退出的日志<br />kubectl logs -f -p {POD-NAME}<br /># 查看 Pod 中某个容器日志<br />kubectl logs -f {POD-NAME} -c {CONTAINER-NAME}<br /># 查看 Pod 中某个容器最近500行日志<br />kubectl logs -f --tail 500 {POD-NAME} -c {CONTAINER-NAME} |
| exec         | 在指定容器内执行命令      | kubectl exec -it {POD-NAME} /bin/bash -c {CONTAINER-NAME}                                                                                                                                                                                                                                                        |
| port-forward | 为pod创建本地端口映射     | kubectl port-forward nginx-po 3000:80<br />将 localhost:3000的请求转发到 nginx-pod Pod 的80端口                                                                                                                                                                                                                  |
| port-forward | 为service创建本地端口映射 | kubectl port-forward svc/svc-name 3000                                                                                                                                                                                                                                                                           |


# Remote Connections
开发调试过程中如果需要访问集群内的服务，可以通过port-forward, kubefwd, telepresence等工具通过local的方式访问k8s集群中的服务。
- [参考文档](https://git.basebit.me/DEV/telepresence-labs)









kbx（切换集群）- kbx=/usr/local/bin/kubectx





kbs（切换namespace）- kbs=/usr/local/bin/kubens











