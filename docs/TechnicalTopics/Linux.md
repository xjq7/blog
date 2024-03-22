[[toc]]

## 命令

### cd

```sh
cd <dir>

# 回到切换前的目录
cd -

# 回到上层目录
cd ..
```

### pwd

### ls

```sh
# 长格式显示文件
ls -l

# 显示隐藏文件
ls -a

# 逆序显示
ls -r

# 递归显示
ls -R

# 按照时间顺序显示
ls -t
```

### mkdir

```sh
# 新建目录
mkdir <dir> <dir>

# 多层级创建
mkdir -p /<dir>/<dir>/<dir>
```

### rmdir

删除目录

```sh
rmdir <dir>
```

### rm

删除目录或文件

```sh
rm <dir>

# 递归删除
rm <dir> -r

# 无需确认
rm <dir> -f
```

### cp

复制文件或目录

```sh
# 文件复制
cp a.txt b.txt

# 显示过程
cp a.txt b.txt -v

# 目录复制
cp -r /a /b

# 保留原有文件时间
cp -p a.txt b.txt

# 保留全部
cp -a a.txt b.txt
```

### mv

移动文件或文件夹

## man

通过man指令可以查看Linux中的指令帮助、配置文件帮助和编程帮助等信息

## 常用

### 大文件搜索

```sh
du -h --max-depth=1 / | sort -hr
```
