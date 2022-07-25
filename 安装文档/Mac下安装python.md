





### brew安装python



##### 1、安装brew

`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)`

##### 2、安装python3

`brew install python`

##### 3、修改.zshrc文件

```shell
alias python2="/usr/bin/python2.7"
alias python3="/usr/local/bin/python3.9"
alias python=python3
```

##### 4、刷新`.zshrc`文件

`source .zshrc`