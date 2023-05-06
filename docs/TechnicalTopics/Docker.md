- [容器](./Docker.html#容器)
  - [启动容器](./Docker.html#启动容器)
  - [终止容器](./Docker.html#终止容器)
  - [删除容器](./Docker.html#删除容器)
  - [导出容器](./Docker.html#导出容器)

## 容器

### 启动容器

#### 新建并启动: docker run

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
