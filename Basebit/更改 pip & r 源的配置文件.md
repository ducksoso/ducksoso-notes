

修改 python site.py 文件 & r Linux 的 .Rprofile 配置文件，添加相应的 path



### 修改 site.py

1. 更改 python 的 pip install 默认安装路径

   查看 site.py 文件的位置（一般在 python 安装目录的 lib 下）

   ```shell
   pip3 show pip
   
   vim /Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/site.py
   
   ```

   `python -m site -help`

2. 修改 site.py 文件，更改里面的 USER_BASE 和 USER_SITE 即可，USER_BASE和USER_SITE其实就是用户自定义的启用 Python 脚本和依赖安装包的基础路径

   ```shell
   
   USER_SITE = "/Users/zhijing.zhang/Library/Python/3.8/lib/python/site-packages"
   
   ```

3. test

   ```shell
   // 必须要使用 --user 才会下载到我们设置的目录下
   pip3 install pandas --user
   
   查看 USER_SITE 下是否添加安装包
   
   ```

   

?  Jupyter  引用的安装包路径



### 修改 .Rprofile 文件



位置 工作目录 `~`



```
.libPaths() 进行验证

// 临时性
.libPaths("~/R/library")

// 添加多个 lib path
.libPaths(c("/Users/zhijing.zhang/Library/R/x86_64/4.2/library","/Library/Frameworks/R.framework/Versions/4.2/Resources/library"))
```



```
.libPaths("C:/Program Files/R/R-3.3.1/library")

install.packages("thepackage",lib="/path/to/directory/with/libraries")

install.packages("XML2R",repos="http://basebit-rrr.hkha-test.basebit.me",destdir="/Users/zhijing.zhang/enigma/local_storage/r_workspace/downloaded_packages/",lib="/Users/zhijing.zhang/enigma/local_storage/r_workspace/lib")


```







### 具体操作

1. 在起实例的时候，创建下面目录

   ```
   // r workspace
   /enigma/local_storage/r_workspace/lib
   /enigma/local_storage/r_workspace/downloaded_packages
   
   // pip site
   /enigma/local_storage/pip_workspace/lib/python/site-packages
   ```

   

2. 修改 python site.py & r .Rprofile 文件

   1. pip

      ```
      // 修改 site.py
      USER_SITE = "/enigma/local_storage/pip_workspace/lib/python/site-packages"
      
      ```

   2. r语言

      ```
      // 添加多个 lib path
      .libPaths(c("/Users/zhijing.zhang/Library/R/x86_64/4.2/library","/Library/Frameworks/R.framework/Versions/4.2/Resources/library","/enigma/local_storage/r_workspace/lib"))
      
      ```

      

3. 使用的时候注意事项

   1. pip

      ```
      // 必须要使用 --user 才会下载到我们设置的目录下
      pip3 install pandas --user
      
      ```

   2. r语言

      ```
      install.packages("XML2R",repos="http://basebit-rrr.hkha-test.basebit.me",destdir="/enigma/local_storage/r_workspace/downloaded_packages",lib="/enigma/local_storage/r_workspace/lib")
      
      ```

      











https://blog.csdn.net/sinat_35187039/article/details/80239668

https://mirrors.ustc.edu.cn/CRAN/bin/macosx/contrib/4.2/

https://mirrors.ustc.edu.cn/CRAN/src/contrib/

















