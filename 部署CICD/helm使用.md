

## Introduction

enigma2 report crontabd service 部署包管理.

## QuickStart

### Simulate an install

```bash
helm install --debug --dry-run --name my-release basebit-chartmuseum/enigma2-report-crontabd
```

### Installing the Chart

```bash
helm install --name my-release basebit-chartmuseum/enigma2-report-crontabd
```

### Upgrading the Chart

```bash
helm upgrade -i my-release basebit-chartmuseum/enigma2-report-crontabd
```

###  Uninstalling the Chart

```bash
helm delete my-release --purge
```



## Configuration

所有可配置参数可以在 value.yaml 中可以看到，下面列出了 enigma2 reportx application service Chart 可配置参数以及默认值。



| Parameter                         | Description                                                  | Default                                                      |
| --------------------------------- | ------------------------------------------------------------ | ------------------------------------------------------------ |
| replicaCount                      | 部署服务实例个数                                             | 1                                                            |
| fullnameOverride                  | kube 资源名称                                                | enigma2-report-crontabd                                      |
|                                   |                                                              |                                                              |
| image.repository                  | 镜像地址                                                     | docker-reg.basebit.me:5000/k8s/service/enigma2-report-crontabd-amd64 |
| image.tag                         | 镜像标签                                                     | v0.0.1                                                       |
| image.pullPolicy                  | 镜像拉取策略                                                 | IfNotPresent - 如果本地存在就不拉取                          |
|                                   |                                                              |                                                              |
| service.type                      | 服务类型                                                     | ClusterIP                                                    |
| service.port                      | 服务端口                                                     | 22234                                                        |
|                                   |                                                              |                                                              |
| ingress.enabled                   | 是否启用 ingress                                             | false                                                        |
|                                   |                                                              |                                                              |
| livenessProbe.enabled             | 是否启用存活探针检查                                         | false                                                        |
| livenessProbe.periodSeconds       | 执行探测的频率                                               | 20                                                           |
| livenessProbe.initialDelaySeconds | 容器启动后在第一次执行探测之前需要等待 X 秒钟                | 15                                                           |
| livenessProbe.timeoutSeconds      | 探测超时时间                                                 | 5                                                            |
| livenessProbe.successThreshold    | 设置成功的阈值                                               | 1                                                            |
| livenessProbe.failureThreshold    | 设置失败的阈值，如果超过 X 次健康检查都失败了，容器就会被重启 | 5                                                            |
|                                   |                                                              |                                                              |
| resources                         | CPU/Memory resource requests/limits                          | {}                                                           |
| nodeSelector                      | 节点选择器                                                   | {}                                                           |
| tolerations                       | 亲和性                                                       | []                                                           |
|                                   |                                                              |                                                              |
| configMaps                        | configMap 配置                                               | dev 环境配置                                                 |



## Usage

### ci

在 CI 流程中，每次 commit 的都会生成一个新的镜像标签，可通过 —set 方式将镜像标签通过变量动态传进来加以覆盖默认值

```bash
helm upgrade -i my-release         --description $(VERSION)         --set image.repository=$(IMAGE)         --set image.tag=$(VERSION)         --wait         basebit-chartmuseum/enigma2-report-crontabd
```

### production

至于正式生产环境，需要事先准备好生产环境的配置参数，通过文件形式覆盖

```bash
helm upgrade -i my-release         -f values-production.yaml         --wait         basebit-chartmuseum/enigma2-report-crontabd
```





