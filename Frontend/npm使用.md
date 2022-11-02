
## npm install
看下 npm 安装 git 仓库的协议：

`<protocol>://[<user>[:<password>]@]<hostname>[:<port>][:][/]<path>[#<commit-ish> | #semver:<semver>]`

即 protocol 支持 git, git+ssh, git+http, git+https, git+file，私有仓库需要用户名和密码时需要填写用户名和密码

直接写 #branch 表示需要安装的 `branch` 分支号。

```
npm install github:mygithubuser/myproject

npm install git+https://isaacs@github.com/npm/npm.git

开发过程中我们可以这么写包：
npm i git+https://username:password@git.example.com/path/reposity#master

或者使用打的 tag：
npm i git+https://username:password@git.example.com/path/reposity#1.0.0

```


### 安装私有模块

npm install git+ssh://git@git.basebit.me:DEV/enigma2-client-ts.git#v22.0621.1343


node v16.18.0 不支持 git+ssh://git@git.own.com:group/enigma2-client-ts.git#branch





