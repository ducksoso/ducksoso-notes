
## 加快 zsh 启动时间-优化 nvm 加载时间

> 两种思路，一种是懒加载（使用到nvm或者node的时候才加载）
> 
> 另一种就是能够异步去执行 terminal task


### 分析：

使用 `time zsh -i -c exit` or `\time zsh -i -c exit` 查看terminal启动时间

查看不加载 .zshrc 文件的启动时间(使用--no-rcs 选项可以测试不加载 .zshrc 文件的启动时间)

`\time zsh --no-rcs -i -c exit`


1、懒加载

```shell
lazy_load_nvm() {
  unset -f node
  export NVM_DIR="$HOME/.nvm"
  [[ -s "$NVM_DIR/nvm.sh" ]] && source "$NVM_DIR/nvm.sh"
}

node() {
  lazy_load_nvm
  node $@
}

```

2、异步执行

在 .zshrc 文件中，添加如下内容：

```shell
# Install zsh-async if it’s not present
if [[ ! -a ~/.zsh-async ]]; then
  git clone git@github.com:mafredri/zsh-async.git ~/.zsh-async
fi
source ~/.zsh-async/async.zsh

export NVM_DIR="$HOME/.nvm"
function load_nvm() {
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    [ -s "$NVM_DIR/bash_completion" ] && . "$NVM_DIR/bash_completion"
}

# Initialize worker
async_start_worker nvm_worker -n
async_register_callback nvm_worker load_nvm
async_job nvm_worker sleep 0.1

```

项目仓库在这里：https://github.com/mafredri/zsh-async

**terminal task 能够异步执行！！！**

## 总结：

推荐异步执行

