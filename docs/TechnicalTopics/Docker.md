[[toc]]

## 操作容器

### 启动容器

新建并启动: docker run

-t 选项让 Docker 分配一个伪终端并绑定到容器的标准输入上

-i 选项让容器的标准输入保持打开

-v 指定文件挂载目录

--name 指定容器名称

-d 后台运行

-e 设置环境变量

--entrypoint 覆盖默认的入口点程序

--rm 容器退出时自动删除该容器

-p 将主机端口映射到容器端口

```sh
docker run -it <image-name> bash
```

#### 启动已终止容器

```sh
docker container start <container-id>
```

### 终止容器

```sh
docker container stop <container-id>
```

### 删除容器

根据 id 删除

```sh
docker container rm <container-id>
```

清除所有终止状态的容器

```sh
docker container prune
```

### 导出容器

```sh
docker export <container-id> > <filepath>/<filename>
```

### 导入容器

从文件导入

```sh
cat centos.tar | docker import - centos:7
```

从 url 导入

```sh
docker import http://example.com/centos.tgz example/centos
```

### 修改容器名

```sh
docker rename <old> <new>
```

### 查看

查看正在运行的容器

```sh
docker ps
```

查看所有容器

```sh
docker ps -a
```

查看最后一次运行的容器信息

```sh
docker ps -l
```

查看停止的容器

```sh
docker ps -f status=exited
```

## 镜像

### 获取镜像

```sh
docker pull centos:7
```

### 列出镜像

```sh
docker image ls
```

### 删除本地镜像

```sh
# 根据 id
docker image rm <id>
docker rmi <id>

# 根据 镜像名
docker image rm <name>
docker rmi <name>
```

配合 docker image ls

```sh
docker image rm $(docker image ls -q redis)
```

## docker hub

## 数据卷
