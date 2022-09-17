## 查进程

### 端口

```sh
# linux
# 占用10089端口的进程
netstat -ltnp | grep -w ':10089'

# windows
# 占用10089端口的进程
netstat -aon|findstr "10089"
# 杀死进程
taskkill /f /pid  10000
```
