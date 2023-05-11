[[toc]]

## 简介

高性能 HTTP 和反向代理服务器

Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡服务器

在性能上，Nginx 占用很少的系统资源，能支持更多的并发连接，达到更高的访问效率；在功能上，Nginx 是优秀的代理服务器和负载均衡服务器

在安装配置上，Nginx 安装简单、配置灵活。

Nginx 支持热部署，启动速度特别快，还可以在不间断服务的情况下对软件版本或配置进行升级，即使运行数月也无需重新启动。

## 安装

## 反向代理

## 其他

### 获取用户真实-ip

应用中 获取 X-Forwarded-For header 头,注意大小写, 看你的应用里是否都转成小写了

这个头可能是几个 ip 的组成,需要使用正则取第一个
例如:

```
192.168.1.1,192.168.1.2
```

```
server {
       ...
       location /{
          proxy_set_header X-Real-IP $remote_addr;
          proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
       }
      ...
}
```
