
## 批量删除Docker中已经停止的容器
1. 显示所有的容器，过滤出Exited状态的容器，取出这些容器的ID

```
sudo docker ps -a|grep Exited|awk '{print $1}'

sudo docker rm `docker ps -a|grep Exited|awk '{print $1}'`
```

2. 删除所有未运行的容器（已经运行的删除不了）

`sudo docker rm $(sudo docker ps -a -q)`

3. 根据容器的状态，删除Exited状态的容器

`sudo docker rm $(sudo docker ps -qf status=exited)`

4. docker 1.13版本之后，可以使用 docker containers prune 命令，删除孤立的容器

`sudo docker container prune`


## 批量删除 images 

docker rmi -f $(docker images | grep 'docker-reg.basebit.me:5000/k8s/service/*' | awk '{print $3}' )



