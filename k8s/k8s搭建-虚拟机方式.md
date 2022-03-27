



### 搭建好三台虚拟机之后的配置

1. 主机名解析

   为了集群节点的直接调用，需要配置一下主机名解析，分别在三台服务器上编辑`/etc/hosts`

   ```bash
   192.168.144.130 master
   192.168.144.131 node1
   192.168.144.132 node2
   
   ```

   

2. 同步时间

   集群中的时间需要要精确一致，可以直接使用chronyd服务从网络同步时间，三台服务器需做同样的操作

   ```bash
   systemctl start chronyd
   systemctl enable chronyd
   date
   
   ```

   

3. 禁用iptables和firewalld服务

   Kubenetes和docker在运行中会产生大量的iptables规则，为了不让系统规则跟他们混淆，直接关闭系统的规则，三台虚拟机需做同样操作：

   ```shell
   # 1 关闭firewalld服务
   systemctl stop firewalld
   systemctl disable firewalld
   
   # 2 关闭iptables服务
   systemctl stop iptables
   systemctl disable iptables
   
   ```

4. 禁用selinux

   selinux是Linux系统下的一个安全服务，如果不关闭它，在安装集群中会产生各种各样的奇葩问题

   ```bash
   # 永久关闭
   sed -i 's/enforcing/disabled' /etc/selinux/config
   SELINUX=disabled
   # 临时关闭
   setenforce 0
   ```

5. 禁用swap分区

   swap分区指的是虚拟内存分区，它的作用是在物理内存使用完之后，将磁盘空间虚拟成内存来使用，启用swap设备会对系统的性能产生非常负面的影响，因此kubernetes要求每个节点都要禁用swap设备，但是如果因为某些原因确实不能关闭swap分区，就需要在集群安装过程中通过明确的参数进行配置说明

   ```bash
   # 临时关闭
   swapoff -a
   # 永久关闭
   vim /etc/fstab
   ```

   注释掉swap分区那一行

   ```bash
   
   # /dev/mapper/centos-swap swap	swap defaults 0 0
   ```

   

6. 修改Linux内核参数

   需要修改Linux内核参数，添加网桥过滤和地址转发功能，编辑`/etc/sysctl.d/kubernetes.conf`文件，添加如下配置：

   ```bash
   net.bridge.bridge-nf-call-ip6tables = 1
   net.bridge.bridge-nf-call-iptables = 1
   net.ipv4.ip_forward = 1
   ```

   添加后进行以下操作：

   ```bash
   # 重新加载配置
   sysctl -p
   # 加载网桥过滤模块
   modprobe br_netfilter
   # 查看网桥过滤模块是否加载成功
   lsmod | grep br_netfilter
   ```

   同样是三台服务器都进行操作，成功信息如下

   

7. 配置ipvs功能

   在kubernetes中service有两种代理模型，一种是基于iptables的，一种是基于ipvs的相比较的话，ipvs的性能明显要高一些，但是如果使用它，需要手动载入Ipvs模块

   ```
   # 安装ipset 和 ipvsadm
   
   
   ```

   





