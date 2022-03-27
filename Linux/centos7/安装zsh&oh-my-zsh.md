## zsh & oh-my-zsh

### 安装zsh & 设置默认zsh

```

cat /etc/shells # 查看系统有几种shell 

echo $SHELL # 当前系统默认的shell

// Linux
sudo yum install zsh (Fedora RedHat)
sudo apt install zsh (Debian系列，Ubuntu)

// Mac 自带了zsh

chsh -s /bin/zsh or 
chsh -s $(which zsh) # 切换zsh

```



### 安装oh-my-zsh

```
#方法一：wget方式自动化安装oh my zsh：
$ wget https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh

#方法二：
$ curl -L https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh | sh 

#官网上的另外一种写法 
$ sh -c "$(wget https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh -O -)"
$ sh -c "$(curl -fsSL https://raw.github.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"

#方法三：当然也可以通过git下载 
$ git clone git://github.com/robbyrussell/oh-my-zsh.git ~/.oh-my-zsh                       
#方法四：国内无法安装情况，使用码云上的安装脚本
$ sh -c "$(curl -fsSL https://gitee.com/shmhlsy/oh-my-zsh-install.sh/raw/master/install.sh)"
```



1. 命令自动补全 - zsh-autosuggestions

​	`git clone git://github.com/zsh-users/zsh-autosuggestions $ZSH_CUSTOM/plugins/zsh-autosuggestions`

​	在.zshrc中配置

​	`plugins=(其他的插件 zsh-autosuggestions)`

2. 高亮显示 - 

   `git clone https://github.com/zsh-users/zsh-syntax-highlighting.git ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting`

   `plugins=(其他的插件 zsh-syntax-highlighting)`

3. 自动跳转 - autojump

   `yum install autojump-zsh # Centos`

   `brew install autojump # Mac`

   centos安装好之后，需要在 .zshrc 中配置一下，除了在plugins中增加autojump之外，还需要添加一行

   `[[ -s ~/.autojump/etc/profile.d/autojump.sh ]] && . ~/.autojump/etc/profile.d/autojump.sh`

   安装好之后，通过 `j + 目录名`快速进行目录跳转，支持目录名的模糊匹配和自动补全

   * j -stat: 可以查看历史路径库

4. git-open - 在git项目下打开远程仓库浏览项目

   `git clone https://github.com/paulirish/git-open.git $ZSH_CUSTOM/plugins/git-open`

   Add `git-open` to your plugin list - edit `~/.zshrc` and change `plugins=(...)` to `plugins=(... git-open)`



#### bat 代替cat

cat 某个文件，可以在终端直接输出文件内容，bat 相比 cat 增加了行号和颜色高亮

````
brew install bat

sudo apt install bat

# centos
wget -c http://repo.openfusion.net/centos7-x86_64/bat-0.7.0-1.of.el7.x86_64.rpm
yum install -y bat-0.7.0-1.of.el7.x86_64.rpm
echo "alias cat='bat -n' " >> ~/.bashrc


````





