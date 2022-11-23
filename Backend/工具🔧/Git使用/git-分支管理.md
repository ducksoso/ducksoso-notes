



分支合并 merge & rebase



1. merge 合并 (--ff & --no-ff)

   merge 分支合并有 `fast-forward` 和 `no-fast-forward` 两种模式。下图 dev 合入 master，默认触发快进模式(fast-forward)，因为只需要修改指针即可实现合并；而普通模式(no-fast-forward)需要生成一个新的commit，因此即使 dev 分支删除，也能从 master 分支历史上看出分支合并信息。

   ![ko500fq8r2](/Users/zhijing.zhang/go/src/ducksoso/notes/statics/images/ko500fq8r2.png)

2. fast-forward 模式

   合并分支时 git 默认会优先用 `fast forward` 快进模式。

   * 操作：直接修改 HEAD 指针指向，不会创造一个新的 commit 节点，所以合并速度非常快
   * 缺点：删除分支或指针向前走会丢失分支信息 (log中体现不出原来的分支操作)
   * 触发时机：例如下图合并 dev 分支到 master 分支时，如果 master 分支的状态没有被更改过则触发快速合并

   ```
   # 合并某分支到当前分支，默认 git merge --ff [待合入分支]
   $ git merge dev
   ```

   

3. no-fast-forward 模式

   触发时机：例如下图合并 dev 分支到 master 分支时，master 分支的历史记录有更新，合并两个分支修改会生成一个新的提交，同时 master 分支的 HEAD 指针会移动到该提交上

   * 强制禁用 fast-forward 模式:

     ```
     # 添加 --no-ff 参数禁用 fast forward 改为普通模式合并保留合并历史
     $ git merge --no-ff -m "merge with no-ff" dev # 可以通过 -m 填写新 commit 信息
     ```

     

   - 设置默认 no-fast-forward 模式

     ```
     # 方案1：全局设置禁用 fast-forward
     $ git config --global --add merge.ff false
     # 方案2：某个分支单独禁用 fast-forward
     $ git config branch.[branch name].mergeoptions "--no-ff"
     ```

   - 冲突解决

     ```
     # 若出现冲突，需要在文件中解决冲突，然后添加提交
     # ...
     $ git add [file name]
     $ git commit -m "some message" # 注意：此时 commit 不能加具体文件名
     ```

   

   

   

4. rebase 变基

   rebase 操作可以通过复制提交记录，改变本地未 push 的分叉提交历史所基于的 commit，并整理成直线，使得查看历史提交的变化时更直观，缺点是本地的分叉提交会被修改。

   ```
   # 将当前 dev 分支修改合并到 master 分支
   $ git rebase master
   ```

   

5. 工作区储藏与恢复 stash 

   对于工作区中未开发完无法 add / commit 的内容，可以先 stash 起来，切换到其他分支，后面再切回来恢复。

   工作区的恢复有两种方式：

   **方式1**：使用 `git stash pop` 恢复，同时删除 stash 内容：

   ​	`git stash pop`

   **方式2**：使用 `git stash apply` 恢复，删除需要额外使用 `git stash drop` 来删除：

   ```
   $ git stash apply stash@{0}
   $ git stash drop stash@{0}
   ```

   

6. 复制提交 cherry-pick

   有一种场景，如 BUG 修复，在 dev 分支上修复并提交，需要同样在 master 上修改，但是却不能直接合并 dev 分支，因为只需要复制其中某一个 commit，使用 `cherry-pick` 命令，即可复制一个特定的提交到当前分支并生成一次新的提交，避免了在 master 分支再修复一次。

   

> 查看分支合并图：git log --graph --pretty=oneline --abbrev-commit



## git workflow



**master**：主干分支

**hotfix**：bug 修理分支

**release**：预发布分支

**develop**：开发分支

**feature**：功能分支



![img](https://ask.qcloudimg.com/http-save/1065788/jdl2cwdrdk.png?imageView2/2/w/1620)



https://dev.to/lydiahallie/cs-visualized-useful-git-commands-37p1

