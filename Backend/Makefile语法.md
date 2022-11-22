
### linux makefile中规则

* all:这个伪目标是所有目标的目标，其功能一般是编译所有的目标。
* clean:这个伪目标功能是删除所有被make创建的文件。
* install:这个伪目标功能是安装已编译好的程序，其实就是把目标执行文件拷贝到指定的目标中去。
* print:这个伪目标的功能是例出改变过的源文件。
* tar:这个伪目标功能是把源程序打包备份。也就是一个tar文件。
* dist:这个伪目标功能是创建一个压缩文件，一般是把tar文件压成Z文件。或是gz文件。
* TAGS:这个伪目标功能是更新所有的目标，以备完整地重编译使用。
* check和test:这两个伪目标一般用来测试makefile的流程。


## QA:

1. .PHONY: xxx 中 .PHONY 作用 ？
   1. 告诉 make, .PHONY: 后面跟着的名称不是指文件名；
   2. 如果makefile中xxx写在 .PHONY: 后面，那么 make xxx 就表示执行 xxx: 指定的命令，而不是要生成xxx
   3. 声明一个target为"伪目标"之后，make就不会去检查是否存在一个叫做 xxx 的文件，而是每次运行都执行对应的命令
2. all 的作用？
   1. 一般来说，make的最终目标是makefile中的第一个目标
   2. 如果把all置成第一个目标，那么只需执行“make”


参考：


https://www.ruanyifeng.com/blog/2015/02/make.html
https://seisman.github.io/how-to-write-makefile/invoke.html
