
## node 中自带npm


## npm install 问题
x = moduleName

npm install x

1. 会把x模块安装到项目的node-modules目录中
2. 不会修改package.json文件（不添加依赖） --- 别人下载之后，无法启动项目

npm install x -g

1. 安装模块到全局，不会把x模块安装到项目的node-modules目录中，具体安装到磁盘哪个位置，要看 npm cinfig prefix的位置
2. 不会修改package.json文件（不添加依赖）

npm install x -save

1. 会把x模块安装到项目的node-modules目录中
2. 修改package.json文件的dependencies属性写入x模块的依赖（添加依赖）
3. 之后运行npm install - production或者注明NODE_ENV变量值为production时，会自动把x模块安装到项目的node-modules目录中
4. 运行 npm install 初始化项目时，会将模块下载到项目目录下

npm install x -save-dev

1. 会把x模块安装到项目的node-modules目录中
2. 修改package.json文件的DevDependencies属性写入x模块的依赖（添加依赖）
3. 之后运行npm install - production或者注明NODE_ENV变量值为production时，不会自动把x模块安装到项目的node-modules目录中
4. 运行 npm install 初始化项目时，会将模块下载到项目目录下

package.json 添加依赖的重要性

程序上传到GitHub，别人拿到这个项目，并使用了npm install安装项目，使用 npm install x -save-dev 即没有添加依赖，别人下载后项目是不会跑起来的

npm install x -save 在 dependencies属性（生产）添加依赖，即项目做完时时跑在服务器了，必须把包（模块）进行依赖

-save 在开发模式、生产模式用都可以

npm install x -save-dev 在 DevDependencies 属性（开发环境）添加依赖，项目开发时使用。






