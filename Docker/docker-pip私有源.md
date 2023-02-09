# 使用 devpi 搭建 PyPI Server


> 使用pip命令安装Python包时，默认是去 https://pypi.python.org/simple/ 源查找相应的包，下载并安装。
> 但是内网环境，或者需要发布一些私有包提供给指定用户时，就需要搭建自己的 PyPI Server


## PyPI Server 比较

| PyPI Server      | PyPI 代理镜像 | 本地缓存 | 单元测试 | 系统测试 | 搜索               |
| ---------------- | ------------- | -------- | -------- | -------- | ------------------ |
| devpi            | 支持          | 支持     | ★★★★     | ★★★★★    | 支持 Web + XML RPC |
| DjangoPyPI       | 支持          | 不支持   | ★        | 无       | 支持 Web + XML RPC |
| chishop          | 不支持        | 不支持   | 无       | 无       | 不支持             |
| pypiserver       | 支持          | 不支持   | ★★★★★    | 无       | 不支持             |
| Cheese Shop      | 不支持        | 不支持   | ★★       | 无       | 支持 Web + XML RPC |
| localshop        | 支持          | 支持     | ★★★★     | 无       | 只支持 XML RPC     |
| mypypi           | 不支持        | 不支持   | ★★       | 无       | 不支持             |
| proxypypi        | 支持          | 支持     | 无       | 无       | 不支持             |
| Flask-Pypi-Proxy | 支持          | 支持     | 无       | 无       | 不支持             |


## devpi 特有的功能

### 2.1 索引继承

pypiserver 等只支持两个索引： 私有的索引和公有的索引。 在私有索引上找不到 Python 包时， 就会去公有索引上找。 devpi 对这一功能做了扩展， devpi 可以支持多个索引。同时，新索引可以继承之前的索引，这在维护多版本系统上十分有用。

### 2.2 支持集群部署

支持一台或多台服务器部署，来加速访问。还支持通过 json 接口，实时监控集群的状态。

### 2.3 支持导入导出功能

支持导出服务器状态，并在必要时重新导回服务器，恢复服务器状态。

### 2.4 Jenkins 集成

支持给索引设置 Jenkins 触发器，可以使用 tox 自动测试上传的包。



## 搭建 devpi server

devpi 包含三个组件：

- devpi-server，是 devpi server 核心组件，提供镜像与缓存功能
- devpi-web，提供 Web 界面与查询功能
- devpi-client，命令行工具, 提供包上传等与服务器交互的功能









```
docker run --name devpi \
    --publish 3141:3141 \
    --volume /Users/zhijing.zhang/Public/go-best/demo-kit/data/wheelhouse:/wheelhouse \
    --volume /Users/zhijing.zhang/Public/go-best/demo-kit/data/devpi:/data \
    --env=DEVPI_PASSWORD=123456 \
    --restart always \
    muccg/devpi
    
```



# 进入容器

docker exec -it -u root devpi bash

# 登陆并上传

devpi use http://<host_ip>:3141/root/public --set-cfg
devpi login root 123
devpi upload --from-dir /wheelhouse



上传完成后可以使用 http://<host_ip>:3141 查看 pip 本地源服务器状态。
若要临时使用可以使用 pip install 的 --index 和 --trusted-host 选项







## 使用方式

临时使用 pip install 的 --index 和 --trusted-host 选项

`pip install --index http://<host_ip>:3141/root/public/+simple/ \
            --trusted-host <host_ip>`



或者永久修改 pip.conf 文件

```
# vim ~/.pip/pip.conf
[global]
index_url = http://<host_ip>:3141/root/public/+simple/
trusted-host = <host_ip>
[search]
index = http://<host_ip>:3141/root/public/
```



# 使用方式

## 一、上传

1. 手动上传到我们的持久化存储下

   1. 首先下载对应系统下的 pip 包，通过 scp 命令上传到我们的持久化目录（pvc）下，这里需要运维操作 pvc命令

   2. 进入服务，执行：

      ```shell
      devpi login root --password 123456
      devpi use http://localhost:3141/root/public --set-cfg
      devpi upload --from-dir /wheelhouse
      ```

2. 通过 k8s cp 命令进行上传

   1. cp文件到pod 的 wheelhouse 目录，例如

      ```
      kubectl cp pandas121-1.1.3-cp38-cp38-macosx_10_9_x86_64.whl xcore/devpi-service-0:/wheelhouse
      ```

   2. 进入容器执行如下命令

      ```shell
      devpi login root --password 123456
      devpi use http://localhost:3141/root/public --set-cfg
      devpi upload --from-dir /wheelhouse
      ```

   

3. 通过 twine 进行上传

   ```
   twine upload --repository https://basebit-devpi.hkha-test.basebit.me/root/public -u root -p 123456 my-package-18.6.0.tar.gz
   ```

   这里需要客户自己上传，这里上传失败了，还没找到原因





## 二、下载

1. 临时形式

   临时使用 pip install 的 --index 和 --trusted-host 选项

   `pip install --index http://<host_ip>:3141/root/public/+simple/ \
               --trusted-host <host_ip>`

   

2. 永久形式

   1. 用户自己修改 pip.conf 文件，重启需要再次修改

      ```
      # vim ~/.pip/pip.conf
      [global]
      index_url = http://enigma2-devpi-service:3141/root/public/+simple/
      trusted-host = enigma2-devpi-service
      timeout = 60
      [search]
      index = http://enigma2-devpi-service:3141/root/public/
      ```

      

   2. 提供的 Jupiter 等镜像，写死我们的 devpi 服务域名

      





## 三、部署

使用 k8s 的持久化存储方式：`StatefulSet` 形式，需要写对应的yaml文件











参考：

https://learnku.com/articles/26872

https://blog.csdn.net/Stephen_Curry11/article/details/107566830





