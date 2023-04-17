
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
```
npm install git+ssh://git@git.basebit.me:DEV/enigma2-client-ts.git#v22.0621.1343

node v16.18.0 不支持 git+ssh://git@git.own.com:group/enigma2-client-ts.git#branch
```


## npm package.json 与 package-lock.json 文件

如果间接依赖某一个包（在项目里使用，但是在package.json里没有），没有在 package.json 文件里直接依赖，这时候每次更新都会拉取最新的该包版本。

**举个例子：**
*在我们的 ticket 项目里有依赖 lodash ，但是在我们的package.json里却没有标明依赖的版本，然后在我们使用 npm install 的时候，就会自动去更新 lodash 最新版本（体现在package-lock.json文件里）
```json
// 这个是node_modules里的lodash package.json
{
	"_from": "@types/lodash@^4.14.104",
	"_id": "@types/lodash@4.14.194",
	"_inBundle": false,
	"_integrity": "sha512-r22s9tAS7imvBt2lyHC9B8AGwWnXaYb1tY09oyLkXDs4vArpYJzw09nj8MLx5VfciBPGIb+ZwG0ssYnEPJxn/g==",
	"_location": "/@types/lodash",
	"_phantomChildren": {},
	"_requested": {
		"type": "range",
		"registry": true,
		"raw": "@types/lodash@^4.14.104",
		"name": "@types/lodash",
		"escapedName": "@types%2flodash",
		"scope": "@types",
		"rawSpec": "^4.14.104",
		"saveSpec": null,
		"fetchSpec": "^4.14.104"
	}
}

// 这个是项目里的 package-lock.json 文件
{
"@types/lodash": {
	"version": "4.14.194",
	"resolved": "https://registry.npmjs.org/@types/lodash/-/lodash-4.14.194.tgz",
	"integrity": "sha512-r22s9tAS7imvBt2lyHC9B8AGwWnXaYb1tY09oyLkXDs4vArpYJzw09nj8MLx5VfciBPGIb+ZwG0ssYnEPJxn/g=="
	}
}
```