## yum

- yum 常用命令

```js
//更新所有软件
yum update

//列出所有可安装的软件清单
yum list

//删除软件包
yum remove [package_name]

//安装firewall防火墙
yum install -y firewalld firewall-config
```

## 管理 firewall

```js
//启动防火墙:
systemctl start firewalld
systemctl enable firewalld

//禁用防火墙
systemctl disable firewalld
systemctl stop firewalld

//查看firewalld的状态:
firewall-cmd --state

//列出防火墙规则
firewall-cmd --zone=public --list-ports

//放行端口
firewall-cmd --permanent --zone=public --add-port=8080/tcp

//删除端口
firewall-cmd --permanent --zone=public --remove-port=8080/tcp

//重载防火墙:(不会中断已经建立的连接,如果打算中断,可以使用 --complete-reload选项)
firewall-cmd --reload
```
