---
title: 记录图床项目部署
sidebarDepth: 3
---

## nginx (centos 系统)

### 端口转发

#### 介绍

手里只有一台学生机,但是要部署三个项目,每个项目都是直接访问 80 端口,前端的项目自然是 80 端口,所以得用到 nginx 的端口转发功能

主域名 xjq.icu 对应我的博客,二级域名 img.xjq.icu 对应我的图床,二级域名 api.xjq.icu 对应图床接口服务

三个域名又都指向同一个 ip,这样服务器就面临端口抢占的问题,博客 80 端口是必须的,图床也是必须的,所以通过 nginx 的端口转发,将每个域名的请求在服务器内部转发到比如 20000 端口,20001 端口,接口域名也可以直接使用 80 端口,但是 node 服务监听还是要监听相应端口,比如 20002

#### 配置

比如我的博客配置文件 /etc/nginx/conf.d/blog.conf

```bash
server {
       location / {
             proxy_pass      http://localhost:20000;
       }
       listen       80;
       server_name  xjq.icu;
}
```

在 location 中配置 proxy_pass,指向本地 20000 端口,listen 监听用户访问端口,server_name 为访问域名

### https

对个人来说配置 https 还是比较容易的,certbot 非常方便,[文档地址](https://certbot.eff.org/lets-encrypt/centosrhel7-nginx),按流程来就好,安装过程可以选择一键 nginx 配置,也可以选择只要证书,自己手动配置,另外还可以申请通配符证书,\*.xjq.icu,二级域名都走 https

### 安全

#### 限制同一 ip 访问频率

nginx 层还能够对访问做一些限制,做到对服务器的保护,通过限制同一 ip 的访问频率防止循环请求

allips 为区域名称,占用空间大小 16m,请求频率限制为每秒 5 次內,binary_remote_addr 为客户端 ip 的二进制形式

```bash
http{
  limit_req_zone $binary_remote_addr zone=allips:16m rate=5r/s;
}
```

limit_req_zone 只能配置在 http 中,这样默认所有服务都有限制

#### 限制用户请求速率

这项是对并发情况做处理,如果请求的频率超过了限制域配置的值，请求处理会被延迟，所以所有的请求都是以定义的频率被处理的。 超过频率限制的请求会被延迟，直到被延迟的请求数超过了定义的阈值，这时，这个请求会被终止，并返回 503 (Service Temporarily Unavailable) 错误。这个阈值的默认值为 0。

```bash
server{
  location / {
    limit_req zone=allips burst=5 nodelay;
  }
}
```

限制平均每秒不超过一个请求，同时允许超过频率限制的请求数不多于 5 个,如果不希望超过的请求被延迟，可以用 nodelay 参数

### 跨域

原来我是在 node 里引入 cors 模块,实现跨域,现在可以在 nginx 里面加响应头,而且最好不要写\*号,哪个地址需要跨域就写哪个,这个配置是 nginx 官方给出的

```bash
server {
			if ($request_method = 'OPTIONS') {
        	add_header 'Access-Control-Allow-Origin' 'https://img.xjq.icu';
        	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        #
        # Custom headers and headers various browsers *should* be OK with but aren't
        #
        	add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        #
        # Tell client that this pre-flight info is valid for 20 days
        #
        	add_header 'Access-Control-Max-Age' 1728000;
        	add_header 'Content-Type' 'text/plain; charset=utf-8';
        	add_header 'Content-Length' 0;
        	return 204;
    	 }
     	if ($request_method = 'POST') {
        	add_header 'Access-Control-Allow-Origin' 'https://img.xjq.icu';
        	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        	add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     	}
     	if ($request_method = 'GET') {
        	add_header 'Access-Control-Allow-Origin' 'https://img.xjq.icu';
        	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
        	add_header 'Access-Control-Allow-Headers' 'DNT,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,Range';
        	add_header 'Access-Control-Expose-Headers' 'Content-Length,Content-Range';
     	}

}
```

## 前端

前端来说,在这上面工作不多,在 nginx 中配置域名指向打包好的文件就行了

### 我的博客

```bash
erver {
        server_name  xjq.icu;
        location / {
            root /blog; # 这里定位到你的文件路径
            try_files $uri $uri/ /index.html;
            index index.html index.htm;
        }

        error_page 404 /404.html;
            location = /40x.html {
        }

        error_page 500 502 503 504 /50x.html;
            location = /50x.html {
        }
}
```

博客是个纯静态的项目,在服务器上拉下博客代码,打包构建好,重载 nginx 即可,这些步骤可以写成脚本文件,而且还可以添加定时任务,每天更新,这样我只要提交代码,不用任何操作,我的站点就能每天按时更新好

```bash
# build.sh
cd /blog
git pull
yarn build
nginx -s reload
```
