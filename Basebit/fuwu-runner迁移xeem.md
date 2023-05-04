# Xeem workflow

> 提供一种通用的部署模板，用于服务任意的用户部署需求



xeem Workflow，以及其相关子资源，例如Service, Task, VirtualMachineGroup/VirtualMachine, BlockStorage等都基于K8S CRD(custom resource definition)来实现，因此任意阶段，用户都可以通过`kubectl`或者其他调用K8S API的方式来操作workflow及其子资源



### Node

node 作为workflow执行的核心基础单元，在当前实现下，workflow spec中有三个字段与node相关（即nodes, skippedNodes, exitPhaseExpression)，因此这里将着重介绍node。node由以下字段构成:

- name
- annotations，即当前node的标注信息，参考k8s中资源的annotations
- inputs，当前node的传参
- workloadTemplate，当前node所执行的workload的spec描述，控制 deployment or job
- depends，当前node的depends
- xvmgTemplateName，当前node执行时所使用的xvmg的name，对应`workflow.spec.xvmgTemplates`中某个项目的name字段。因为xvmg是按需拉起的，因此在workflow spec定义时xvmg尚不存在，因此用xvmgTemplate的name；



### Inputs

input是当前node的传参。input可以分为静态参数和动态参数两种，形式如下:

```yaml
inputs:
  - name: static-example
    value:                 // 静态参数用value
      string: a-string-value
  - name: dynamic-example
    valueFrom:             // 动态参数用valueFrom
      inputRef:            // 引用parent或祖先node的input作为当前node的input
        nodeName: <name-of-ancestor-node>
        inputName: <name-of-ancestor-node-input>
```

静态传参包括: string, integer, bool, xMount (check `kubectl explain xwf.spec.nodes.inputs.value`)。xMount的字段目前对齐到XFS，例如serverAddr指向XFS server的地址，mountID指向具体的XFS 卷ID。



### xvmgTemplates

xvmgTemplates用于创建xvmg。xvmgTemplate具有如下属性:

- name
- annotations
- minSize, maxSize。当前实现下，需要minSize == maxSize 来指定xvmg的副本数
- template

template 用于按照template指定的xvm以及其对应的xbs，其属性如下:

- type，即xvmt。通过指定xvmt的name，来指明用哪个xvmt来创建xvm
- xbses，即xbs，通过指定相关子字段，来指明如何创建xbs
- rootVolumeSizeGB，在On-Demand场景下，指明创建的云主机实例的根盘大小；









区别？

1. fuwuNodeMount 问题，新的workflow 里没有，是不是可以不要？

2.  datasetsEnvVar是不是也可以不要？
3. 之前的parameterId 是不是都没有了？
4. fuwu subtask 会有多个 node 的情况
5. fuwu-runner 里 deployment 的 arguments & mounts  & fuwuSpec parameters 都是所有 node 共享的 app.input 吗？每个node里也有mounts & env 是不是也是 app.input







### 1. pickupStatusCheck

for each instance, create a goroutine to continue checking status



### 2. checkStatus

goroutine check instance status





```go
GetDeploymentEvents

GetDeploymentStatus

GetDeployment
```
