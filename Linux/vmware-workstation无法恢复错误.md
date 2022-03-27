## VMware Workstation 无法恢复错误: (vcpu-0) Exception 0xc0000005 (access violation) has occurred.



### 原因

产生这个问题的是因为VMware Workstation 的虚拟化与window10自带的Hyper-V 服务发生了冲突，关闭windows的Hyper-V功能重启电脑就好了。
如果你电脑上同时安装了Docker Desktop 和 WMware Workstation，就有些麻烦了。因为Docker Desktop以来windows 的Hyper-V 技术。

windows的Hyper-V服务 与 VMware Workstation 的虚拟化发生了冲突，所以我们先关闭Hyper-V功能然后重启电脑。

但是Docker Desktop依赖windows 的Hyper-V 技术。



### 解决方案 - 关闭hyper-v

以管理员身份运行CMD，输入以下命令：

`bcdedit /set hypervisorlaunchtype off`

运行，重启电脑



