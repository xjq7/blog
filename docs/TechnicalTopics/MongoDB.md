[[toc]]

## 操作

连接

```sh
# 使用账号 root 密码 root 连接数据库
mongo -uroot -proot
```

use db

```sh
# 使用 monitor 数据库
use monitor
```

列出集合

```sh
show collections
```

## 更新

重命名字段

```sh
db.<collection>.updateMany({},{$rename:{"olgName":"newName"}})
```

## 删除

删除数据

```sh
db.<collection>.deleteMany({})
```

## 用户管理

### 创建用户

```js
db.createUser({
  user: 'admin',
  pwd: 'admin',
  roles: [{ role: 'readWrite', db: 'mydatabase' }],
})
```

#### role

- read: 可读
- readWrite: 可读可写
- dbAdmin: 允许用户管理指定数据库的元数据和统计信息
- userAdmin: 允许用户创建,修改和删除其他用户的账户以及分配角色
- clusterAdmin: 允许用户管理整个 MonogoDB 集群,包括服务器和复制集配置,分片和副本集管理等

db.createUser({
user: 'admin',
pwd: 'admin',
roles: [{ role: 'readWrite', db: 'monitor' }],
})
