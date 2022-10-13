## 配置yum源

使用yum的官方源进行yum install xxxx 的时候，速度非常慢，只有几kB/s，有时候还不到1kB/s。这就会造成安装包的速度的速度要么特变慢，要么就根本安装不了

**替换CentOS的yum 源 为 国内的镜像源。**

**更换 yum 源的原因：**

* 国外网站连接响应太慢
* 国内 yum 源响应速度快

1. ### 替换为国内阿里云yum源

   1. 安装wget

      `yum install -y wget`

   2. 备份你的原镜像文件，以免出错后可以恢复。(可忽略)

      `mv /etc/yum.repos.d/CentOS-Base.repo /etc/yum.repos.d/CentOS-Base.repo.backup `

   3. 下载新的CentOS-Base.repo 到/etc/yum.repos.d/

      ```
      CentOS 5
      wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-5.repo
      
      CentOS 6
      wget -O /etc/yum.repos.d/CentOS-Base.repo http://mirrors.aliyun.com/repo/Centos-6.repo
      
      centos 7
      wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
      
      centos8
      wget -O /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-8.repo
      
      or centos7
      curl -o /etc/yum.repos.d/CentOS-Base.repo https://mirrors.aliyun.com/repo/Centos-7.repo
      
      ```

   4. 运行 yum makecache 生成缓存

      yum clean all

      yum makecache

   5. dsaf

   6. dfas

2. ### 替换为清华yum源配置

   1. 备份同上

   2. 创建/etc/yum.repos.d/

      `touch /etc/yum.repos.d/CentOS-Base.repo`

   3. 向上一步创建的文件CentOS-Base.repo写入清华大学的yum源

      ```
      
      所有的baseurl改为：
      https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/os/$basearch/
      
      https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/updates/$basearch/
      
      https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/extras/$basearch/
      
      https://mirrors.tuna.tsinghua.edu.cn/centos/$releasever/centosplus/$basearch/
      
      ```

   4. 同上最后一步（可以不做，比较耗时）



### Vim 语法批量替换：

`  %s#http://mirrors.cloud.aliyuncs.com/centos/#http://mirrors.aliyun.com/centos#g`

