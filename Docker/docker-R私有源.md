## 包

查看R包的安装目录：`.libPaths()`

查看已安装的包：`library()`

查看已载入的包：`search`

安装新包：

可以从 [cran](https://cran.r-project.org/web/packages/available_packages_by_name.html) 下载

```

install.packages('要安装的包名')；

# 安装 XML 包
install.packages("XML")

# 从 cran 上下载，直接在本地安装
install.packages("./XML_3.98-1.3.zip")

# 指定镜像源安装
install.packages("XML", repos = "https://mirrors.ustc.edu.cn/CRAN/")

CRAD镜像源配置文件之一是 .Rprofile（Linux下位于 ~/.Rprofile）

文末添加：options("repos" = c(CRAN="https://mirrors.tuna.tsinghua.edu.cn/CRAN/"))

打开 R 即可使用该 CRAN 镜像源安装 R 软件包

```



使用包：

新安装的包需要先载入R编译环境中才可以使用，格式如下

```
library("包名")
library("XML")
```



### 上传包

下载包到本地，然后上传到服务器上

```

# 下载包的描述信息
wget https://cran.rstudio.com/src/contrib/PACKAGES

# 下载某个具体的包
wget https://cran.rstudio.com/src/contrib/XML2R_0.0.6.tar.gz

k cp XML2R_0.0.6.tar.gz xcore/devpi-service-nginx-0:/usr/share/nginx/html/src/contrib

```



`wget http://basebit-rrr.hkha-test.basebit.me/src/contrib/XML2R_0.0.6.tar`



参考：

https://www.runoob.com/r/r-package.html

https://cloud.tencent.com/developer/article/1078044

