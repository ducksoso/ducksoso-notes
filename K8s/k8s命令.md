

```shell
kubectl controls the Kubernetes cluster manager.

 Find more information at: https://kubernetes.io/docs/reference/kubectl/overview/

Basic Commands (Beginner):
  create        Create a resource from a file or from stdin.
  expose        使用 replication controller, service, deployment 或者 pod 并暴露它作为一个 新的 Kubernetes
Service
  run           在集群中运行一个指定的镜像
  set           为 objects 设置一个指定的特征

Basic Commands (Intermediate):
  explain       查看资源的文档
  get           显示一个或更多 resources
  edit          在服务器上编辑一个资源
  delete        Delete resources by filenames, stdin, resources and names, or by resources and label selector

Deploy Commands:
  rollout       Manage the rollout of a resource
  scale         Set a new size for a Deployment, ReplicaSet or Replication Controller
  autoscale     自动调整一个 Deployment, ReplicaSet, 或者 ReplicationController 的副本数量

Cluster Management Commands:
  certificate   修改 certificate 资源.
  cluster-info  显示集群信息
  top           Display Resource (CPU/Memory/Storage) usage.
  cordon        标记 node 为 unschedulable
  uncordon      标记 node 为 schedulable
  drain         Drain node in preparation for maintenance
  taint         更新一个或者多个 node 上的 taints

Troubleshooting and Debugging Commands:
  describe      显示一个指定 resource 或者 group 的 resources 详情
  logs          输出容器在 pod 中的日志
  attach        Attach 到一个运行中的 container
  exec          在一个 container 中执行一个命令
  port-forward  Forward one or more local ports to a pod
  proxy         运行一个 proxy 到 Kubernetes API server
  cp            复制 files 和 directories 到 containers 和从容器中复制 files 和 directories.
  auth          Inspect authorization
  debug         Create debugging sessions for troubleshooting workloads and nodes

Advanced Commands:
  diff          Diff live version against would-be applied version
  apply         通过文件名或标准输入流(stdin)对资源进行配置
  patch         Update field(s) of a resource
  replace       通过 filename 或者 stdin替换一个资源
  wait          Experimental: Wait for a specific condition on one or many resources.
  kustomize     Build a kustomization target from a directory or a remote url.

Settings Commands:
  label         更新在这个资源上的 labels
  annotate      更新一个资源的注解
  completion    Output shell completion code for the specified shell (bash or zsh)

Other Commands:
  api-resources Print the supported API resources on the server
  api-versions  Print the supported API versions on the server, in the form of "group/version"
  config        修改 kubeconfig 文件
  plugin        Provides utilities for interacting with plugins.
  version       输出 client 和 server 的版本信息

Usage:
  kubectl [flags] [options]

Use "kubectl <command> --help" for more information about a given command.
Use "kubectl options" for a list of global command-line options (applies to all commands).
```


### k8s 上有哪些资源 resource


### Node 

**获取集群中的node**

```
kubectl get nodes

NAME         STATUS   ROLES    AGE   VERSION
sgx-d10-23   Ready    <none>   25h   v1.19.2
xdp-dev1     Ready    master   26d   v1.19.2
xdp-dev2     Ready    master   26d   v1.19.2
xdp-dev3     Ready    master   26d   v1.19.2
xdp-dev4     Ready    <none>   26d   v1.19.2
```

**查看node详细信息**

```
kubectl describe node xdp-dev1

Name:               xdp-dev1
Roles:              master
Labels:             beta.kubernetes.io/arch=amd64
                    beta.kubernetes.io/os=linux
                    kubernetes.io/arch=amd64
                    kubernetes.io/hostname=xdp-dev1
                    kubernetes.io/os=linux
                    kubernetes.io/project=storage
                    kubernetes.io/utils=true
                    kubernetes.io/xdp=true
                    node-role.kubernetes.io/master=
                    project/xdp=on
                    topology.me.basebit.enigma.xfs2.csi/node=xdp-dev1
                    xdp/dev=on
Annotations:        csi.volume.kubernetes.io/nodeid: {"me.basebit.enigma.xfs2.csi":"xdp-dev1"}
                    kubeadm.alpha.kubernetes.io/cri-socket: /var/run/dockershim.sock
                    node.alpha.kubernetes.io/ttl: 0
                    projectcalico.org/IPv4Address: 172.18.0.135/24
                    projectcalico.org/IPv4IPIPTunnelAddr: 10.100.160.128
                    volumes.kubernetes.io/controller-managed-attach-detach: true
CreationTimestamp:  Thu, 25 Mar 2021 12:06:57 +0800

.......
```


### Config

查看当前 cluster config 配置

`kubectl config view`



更改当前context的namespace

`kubectl config set-context --current --namespace=yifang`





### 查看k8s configMap 信息

```
kubectl get configmaps enigma2-pipeline-api -o yaml

kubectl get cm // 获取本namespace下所有pod configMap

kubectl edit cm hkha-project-api // 编辑pod configMap


```

ConfigMap和Secret是Kubernetes系统上两种特殊类型的存储卷，ConfigMap对象用于为容器中的应用提供配置数据以定制程序的行为，
不过敏感的配置信息，例如密钥、证书等通常由Secret对象来进行配置。它们将相应的配置信息保存于对象中，
而后在Pod资源上以存储卷的形式将其挂载并获取相关的配置，以实现配置与镜像文件的解耦

https://www.cnblogs.com/Andya/p/12490000.html


### 修改crontab配置信息

------

```
kubectl patch cronjob enigma2-report-crontabd-upload-report-to-s3 -p '{"spec": {"schedule": "48 8 * * *"}}'

```





