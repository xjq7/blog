- [概念](./index.html#概念)
  - [四个工作区](./index.html#四个工作区)
  - [工作流程](./index.html#工作流程)
  - [文件的状态](./index.html#文件的状态)
- [配置](./index.html#配置)
- [源管理](./index.html#源管理)
- [代码同步](./index.html#代码同步)
- [分支管理](./index.html#分支管理)
- [代码管理](./index.html#代码管理)
- [版本管理](./index.html#版本管理)
- [暂存](./index.html#暂存)
- [其他](./index.html#其他)

---

> [阮一峰 git 教程](http:#www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

> [【Git】(1)---工作区、暂存区、版本库、远程仓库 ](https://www.cnblogs.com/qdhxhz/p/9757390.html)

## 概念

### 四个工作区

<div style="text-align: center;">
  <img src="https://image.xjq.icu/2022/11/1/1667274339519_git-relation.png"/>
</div>

1. Workspace:工作区, 代码存放目录
2. Index / Stage: 暂存区,用于临时存放你的改动,事实上它只是一个文件,保存即将提交到文件列表信息
3. Repository: 仓库区/版本库, HEAD 指向最新 commit
4. Remote: 远程仓库

### 工作流程

1. 工作目录中添加,修改文件
2. 将需要提交的文件放入暂存区
3. 将暂存区文件提交至远程仓库

### 文件的状态

- Untracked: 未跟踪, 此文件在文件夹中, 但并没有加入到 git 库, 不参与版本控制. 通过 git add 状态变为 Staged.
- Unmodify: 文件已经入库, 未修改. 1. 改动文件内容状态变为 Modified. 2. 使用 git rm 移出版本库, 则成为 Untracked 文件
- Modified: 文件已修改, 1. 通过 git add 可进入暂存 staged 状态, 使用 git checkout 则丢弃修改 状态变为 Unmodify , git checkout 是从仓库区取出文件, 覆盖当前修改
- Staged: 暂存状态, 1. 执行 git commit 将修改同步 仓库区, 成功后, 状态变更为 Unmodify

## 配置

```sh
# 在当前目录新建Git代码库
git init

# 新建一个目录，并将其初始化为Git代码库
git init [project-name]

# 拉一个新项目代码
git clone [url]

# 显示当前Git配置
git config --list

# 修改git配置用户信息
git config -g user.name "[name]"
git config -g user.email "[email]"

# 修改目录权限引发全部文件出现更改，可用以下命令忽略文件权限的配置
git config core.filemode false

# 去除ssl校验
git config --global http.sslVerify false
```

## 源管理

```sh
# 查看全部源, 会列出全部源名字加地址
git remote -v
# 关联远程仓库, 关联的源命名为 upstream
git remote add upstream git@github.com:xjq7/blog.git
# 删除已关联的远程仓库
git remote rm upstream
# 首次提交, -u 全称 --set-upstream, 后续在这个分支的提交都默认是 -u 时候指定的源
git push -u origin master
```

## 代码同步

```sh
# 首次拉取指定默认源
git pull --set-upstream origin master

# 拉取代码
git pull

# 往远程仓库推送变更
git push

# 首次推送指定默认源
git push --set-upstream origin master

# 强制覆盖本地代码
1.git fetch --all
2.git reset --hard origin/master
3.git pull
```

## 分支管理

```sh
# 列出本地分支
git branch

# 列出远程分支
git branch -r

# 列出全部分支
git branch -a

# 查看未合并到当前分支的分支
git branch --no-merged

# 查看已合并到当前分支的分支
git branch --merged

# 移动分支,可用于重命名分支,移动的是当前分支
git branch -m [branch-name]

# 重命名分支
git branch -m [old-branch-name] [new-branch-name]

# 筛选分支, 参数为筛选出来 f 分支
git branch -l "f-*"

# 筛选分支, 参数为筛选出来 20221010创建的 f 分支
git branch -l "f-20221010-*"

# 切换分支
git checkout [branch-name]

# 创建并切换到分支
git checkout -b [branch-name]

# 删除分支(本地)
git branch -d [branch-name]

# 删除分支(远程)
git push [remote] -d [branch-name]
git branch -dr [remote/branch]
```

## 代码管理

```sh
# 添加指定文件到暂存区
git add [file1] [file2]...

# 添加目录到暂存区，递归
git add [dir]

# 添加当前所有更改到暂存区
git add .

# 查看工作区和暂存区状态
git status

# 提交暂存区到仓库区
git commit -m [message]

# 提交暂存区的指定文件到仓库区
git commit [file1] [file2] ... -m [message]

# 提交工作区继上次commit后的变化，到仓库区
git commit -a

# 提交时显示所有diff信息
git commit -v

# 使用一次新的commit替代上一次提交，如果代码没有任何新变化，则用来改写上一次commit的提交信息
git commit --amend -m [message]

# 合并指定分支到当前分支
git merge [branch]
# 当你想终止这次合并时
git merge --abort

# 撤销文件更改,文件需要带路径
git checkout [file-name]

# 撤销当前更改(全部)
git checkout .

# 合并某些 commit
git cherry-pick [commit-id] [commit-id]...
```

## 版本管理

```sh
# 列出全部commit记录
git log

# 查看工作区与暂存区所有文件差异
git diff
# 具体文件之间的差异(需要带上相对路径)
git diff -- [filename] [filename]...

# 查看工作区, 暂存区与版本库的差异, 默认最新版本 HEAD
git diff [commit-hash | branch (版本)]
# 具体文件之间的差异
git diff [版本] -- [filename] [filename]...

# 查看暂存区与版本库的差异, 默认最新版本 HEAD
git diff --cached
# 具体文件
git diff --cached -- [filename] [filename]...
# 版本号
git diff --cached [版本]

# 查看不同版本间文件的差异
git diff [版本 A] [版本 B]
# 指定目录
git diff [版本 A] [版本 B] [dir]
# 指定文件
git diff [版本 A] [版本 B] -- [filename] [filename]...
# 列出改动文件
git diff [版本 A] [版本 B] --stat

# 版本回退 --hard, 回退到历史中的某个commit,这个commit节点后的提交都会丢失
git reset --hard [commit-id]
# 回退后, 强推覆盖远程
git push -f

# 版本重做, 重做指定的commit,然后生成一个新的commit,不会影响其他 commit
git revert -n [commit-id] [commit-id] ...

# 撤回 commit
git reset --soft HEAD^

# 变基, 合并当前分支的 多个 commit
git rebase -i

# 变基
git rebase [branch]
```

## 暂存

```sh
# 暂存修改
git stash

# 查看暂存列表, 每次暂存都有个 ID，删除跟恢复都是用 ID 关联
git stash list

# 暂存修改并命名
git stash save "message"

# 弹出暂存栈中第一个,先进后出
git stash pop
# 例如
# stash@{0}: On dev: second stash
# stash@{1}: On dev: first stash
# 在 弹出后变成
# stash@{1}: On dev: first stash

# 应用 某次暂存, 但是不删除他
git stash apply 1
# 例如
# stash@{0}: On dev: second stash
# stash@{1}: On dev: first stash
# 在 git stash apply 1 后暂存栈还是没变
# stash@{0}: On dev: second stash
# stash@{1}: On dev: first stash

# 删除某个暂存
git stash drop 1
# 例如
# stash@{0}: On dev: second stash
# stash@{1}: On dev: first stash
# 在 git stash drop 1 后
# stash@{0}: On dev: second stash
```

## 其他

```sh
# .gitignore文件失效,gitignore只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的。解决方法是先把本地缓存删除，然后再提交。
git rm -r --cached
git add .
git commit -m 'gitignore文件'

# fatal: refusing to merge unrelated histories, 分支间没有建立关系
git pull --allow-unrelated-histories

# 远程库中的更新合并到本地库中，–rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。
git pull --rebase origin master
```
