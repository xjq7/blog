---
title: centos定时任务crontab
---

## crontab

### vuepress 博客每次更新都比较麻烦,在服务器上有个脚本,但也得每次登录服务器运行,因此设置一个定时任务,每天晚上定时执行比较方便,在本地更新博客后推送 github 就好啦

### 安装

```Shell
yum install crontabs

systemctl enable crond #开机自启

systemctl start crond #启动

systemctl status crond #查看状态
```

### 编写定时任务

**1. vim /etc/crontab,会看到里面官方的注释**

```Shell
Example of job definition:
.---------------- minute (0 - 59)
| .------------- hour (0 - 23)
| | .---------- day of month (1 - 31)
| | | .------- month (1 - 12) OR jan,feb,mar,apr ...
| | | | .---- day of week (0 - 6) (Sunday=0 or 7) OR sun,mon,tue,wed,thu,fri,sat
| | | | |
* * * * * user-name command to be executed
```

**2. 详细配置信息**

```Shell
[分钟] [小时] [日] [月] [星期(0-6)] [用户] [我们要执行的命令]

# 事例
*/30 * * * * root bash ~/build.sh # 每天，每 30分钟执行一次bash build.sh命令
```

> 3.让我们的配置生效

```Shell
# 生效
crontab /etc/crontab

# 查看我们定时任务日志(配置出什么错能查看到详细信息)
cat /var/log/cron

```

## 更多事例

- **每天凌晨两点执行命令**

```Shell
0 2 * * * root ...
```

- **晚上 11 点到早上 8 点之间每两个小时**

```Shell
0 23-7/2,8 * * * root ...
```

- **周一到周五每天晚上 11 点**

```Shell
0 23 * * 1-5 root ...
```
