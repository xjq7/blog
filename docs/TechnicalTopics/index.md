- [常用命令](./index.html#常用命令)
- [不常用命令](./index.html#不常用命令)
- [Git 报错集锦](./index.html#git-报错集锦)

---

> [阮一峰 git 教程](http:#www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)

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

# 强制覆盖本地代码
1.git fetch --all
2.git reset --hard origin/master
3.git pull
```

## 查看

```sh
# 查看历史提交记录
git log
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

## 版本管理

```sh
# 撤销文件更改,文件需要带路径
git checkout [file-name]

# 撤销当前更改(全部)
git checkout .

# 列出全部commit记录
git log

# 版本回退 --hard, 回退到历史中的某个commit,这个commit节点后的提交都会丢失
git reset --hard [commit-id]
# 回退后, 强推覆盖远程
git push -f

# 版本重做, 重做指定的commit,然后生成一个新的commit,不会影响其他 commit
git revert -n [commit-id] [commit-id] ...

# 撤回 commit
git reset --soft HEAD^

```

## 代码管理

```sh
# 添加指定文件到暂存区
git add [file1] [file2]...

# 添加目录到暂存区，递归
git add [dir]

# 添加当前所有更改到暂存区
git add .

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
```

## 其他

```sh
# .gitignore文件失效,gitignore只能忽略那些原来没有被 track 的文件，如果某些文件已经被纳入了版本管理中，则修改 .gitignore 是无效的。解决方法是先把本地缓存删除，然后再提交。
git rm -r --cached
git add .
git commit -m 'gitignore文件'

# fatal: refusing to merge unrelated histories, 分支间没有建立关系
git pull --allow-unrelated-histories
```

## 不常用命令

```bash
远程库中的更新合并到本地库中，–rebase的作用是取消掉本地库中刚刚的commit，并把他们接到更新后的版本库之中。
git pull --rebase origin master
```
