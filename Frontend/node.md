### 用nvm进行node版本管理

安装`homebrew`

`/usr/bin/ruby -e “$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)”`

1. 用 `homebrew`安装`nvm`

   `brew install nvm`

在`.zshrc`文件中添加

```
export NVM_DIR="$HOME/.nvm"
# This loads nvm
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  
# This loads nvm bash_completion
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  
```

**查看nvm版本**

`nvm --version`

**安装指定node版本**

`nvm install 版本号`

**查看本地node的所有版本**

`nvm list`

**切换到指定的node版本**

`nvm use 10.19`

**安装最新的node稳定版本**

`nvm install --lts`

**查看node的所有的版本**

`nvm ls-remote`

**使用node指定版本执行指定文件**

`nvm exec 版本号 node 要执行的文件路径`

例如：`nvm exec 4.8.3 node app.js`

表示使用 4.8.3 版本的node，指定 app.js 文件

**设置默认版本的node，每次启动终端都使用该版本的node**

`nvm alias default 版本号`





### NPM 安装 TypeScript

如果你的本地环境已经安装了 npm 工具，可以使用以下命令来安装。

使用国内镜像：

`npm config set registry https://registry.npm.taobao.org`

安装 typescript：

`npm install -g typescript`

安装完成后我们可以使用 **tsc** 命令来执行 TypeScript 的相关代码，以下是查看版本号：

```shell
$ tsc -v
Version 3.2.2
```

通常我们使用 **.ts** 作为 TypeScript 代码文件的扩展名。

然后执行以下命令将 TypeScript 转换为 JavaScript 代码：

`tsc app.ts`

![img](https://www.runoob.com/wp-content/uploads/2019/01/typescript_compiler.png)

这时候再当前目录下（与 app.ts 同一目录）就会生成一个 app.js 文件

使用 node 命令来执行 app.js 文件：

`node app.js`

所以，ts-node 就是直接能够执行 app.ts 的工具。

`ts-node app.ts`





##### 全局安装 typescript

`➜  ~ npm install -g typescript`

##### 全局安装 ts-node

`➜  ~ npm install -g ts-node`

小结：

* `tsc` 将` .ts `文件转换为 `.js` 文件

* `ts-node` 直接执行 `.ts` 文件

https://www.cnblogs.com/belongs-to-qinghua/p/11795908.html



### Node 引用私有仓库项目更新问题



`npm install git+ssh://git@git.basebit.me:DEV/enigma2-client-ts.git#hkstp`





### npm对项目进行安装、编译、运行

1. `npm install`
2. `npm run build`
3. `npm run start:dev`













