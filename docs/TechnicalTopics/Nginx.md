## Install

## 反向代理

### 获取用户真实 ip

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
