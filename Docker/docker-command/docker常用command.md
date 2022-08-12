### Docker history

查看镜像的`Dockerfile`历史:

```sh
docker history docker-reg.basebit.me:5000/enigma2-apps/cromwell-dind:6.3_20.10 --no-trunc

docker history docker-reg.basebit.me:5000/enigma2-apps/cromwell-dind:6.3_20.10_hkair --no-trunc > cromwell-dind.hist.hkair

docker history docker-reg.basebit.me:5000/enigma2-apps/cromwell-dind:6.3_20.10 --no-trunc > cromwell-dind.hist

diff cromwell-dind.hist cromwell-dind.hist.hkair

```



### Docker login

对于私有镜像仓库，通过命令行进行登录：

```sh
docker login -u zzj13865+1@gmail.com registry.yifang.dev.curisinsight.com
// 如果有密码的话，需要手动输入密码
Password: ****

// 带密码登录
docker login -u zzj13865+1@gmail.com -p d73c8c0160a5439cbfa5a753b7e67ed1 registry.yifang.dev.curisinsight.com

cat ~/my_password.txt | docker login --username foo --password-stdin
echo "$MY_PASSWORD" | docker login --username foo --password-stdin
// OR
docker login --username foo --password-stdin < ~/my_password

```



