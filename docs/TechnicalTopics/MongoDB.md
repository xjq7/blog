[[toc]]

## 基础

### 什么是 MongoDB

MongoDB 是面向文档的 NoSQL 数据库，用于大量数据存储

### MongoDB 功能

1. 每个数据库都包含集合，而集合又包含文档
2. 文档结构更符合开发人员如何使用各自的编程语言构造其类和对象
3. 行不需要预先定义结构，可以动态创建
4. MongoDB 中可用的数据模型 可以更轻松地表示层次结构关系，存储数组和更复杂的结构
5. MongoDB 环境具有很高的可伸缩性

### 为什么要使用 MongoDB

1. 面向文档：MongoDB 是 NoSQL 类型的数据库，它不是以关系类型的格式存储数据，而是将数据存储在文档中. 所以 MongoDB 非常灵活，可以适应实际的业务环境和需求
2. 临时查询：MongoDB 支持按字段，范围查询和正则表达式搜索. 可以查询返回文档中的特定字段
3. 索引
4. 复制：MongoDB 可以提供副本集的高可用性. 副本集由两个或多个 Mongo 数据库实例组成. 每个副本集成员可以随时充当主副本或辅助副本的角色. 主副本是与客户端交互并执行所有读/写操作的主服务器. 辅助副本使用内置复制维护主数据的副本. 当主副本发生故障时，副本集将自动切换到辅助副本，然后设置为主服务器
5. 负载均衡：MongoDB 使用分片的概念，通过在多个 MongoDB 实例之间拆分数据来水平扩展. MongoDB 可以在多台服务器上运行，以平衡负载或复制数据，以便在硬件出现故障时保持系统正常运行

## NoSQL

### 什么是 NoSQL

NoSQL 是一种非关系型 DMS，不需要固定的架构，可以避免 joins 链接，并且易于扩展

NoSQL 数据库用于具有庞大数据存储需求的分布式数据存储

NoSQL 用于大数据和实时 Web 应用程序

## 安装

### MongoDB 4 + Centos 7

编写源

```sh
cat <<EOF | sudo tee /etc/yum.repos.d/mongodb.repo
[mongodb-org-4.4]
name=MongoDB Repository
baseurl=https://repo.mongodb.org/yum/redhat/7/mongodb-org/4.4/x86_64/
gpgcheck=1
enabled=1
gpgkey=https://www.mongodb.org/static/pgp/server-4.4.asc
EOF
```

安装包

```sh
yum install mongodb-org
```

下载 timeout 或 404 时

执行以下命令, Import the MongoDB public key

```sh
rpm --import https://www.mongodb.org/static/pgp/server-3.2.asc
```

开机自启

```sh
systemctl enable --now mongod
```

## 连接

```sh
# 使用账号 root 密码 root 连接数据库
mongo -uroot -proot
```

## 数据库

### 列出

```Javascript
show dbs
```

### 显示当前数据库

```Javascript
db
```

### 创建/切换数据库

- use

创建数据库, 数据库不存在时创建并切换到 userDb

```Javascript
use userDb
```

### 删除

```Javascript
db.dropDatabase()
```

## 集合

### 列出集合

```Javascript
show collections
```

## CRUD

### Create

```Javascript
// 单条数据插入
db.user.insert({
  name: 'xjq',
  age: 26,
})

// 批量数据插入

db.user.insertMany([{ name: 'xjq1' }, { name: 'xjq2' }])
```

### Update

```Javascript
// 条件更新
db.user.update(
  {
    age: 28,
  },
  {
    name: 'xjq',
    age: 26,
  },
  {
    upsert: true,
  }
)

// 指定字段更新
db.user.update(
  {
    age: 28,
  },
  {
    $set: {
      name: 'xjq',
    },
  }
)

// 指定字段数量累加
db.user.update(
  { name: 'xjq' },
  {
    $inc: {
      age: 2,
    },
  }
)

// 重命名字段
db.user.update(
  {},
  {
    $rename: {
      likes: 'views',
    },
  }
)
```

### Delete

```Javascript
// 条件删除
db.user.remove({ name: 'xjq' })
```

### Read

```Javascript
// 查全部
db.userCollection.find()

// 格式化显示
db.userCollection.find().pretty()

// 条件查询
db.userCollection.find({ phone: '1234556' })

// 排序
db.userCollection.find().sort({ name: 1 })

// 统计数量
db.userCollection.find().count()

// 截断
db.userCollection.find().limit(10)

// 结合使用
db.userCollection.find().limit(2).sort({ name: 1 }).pretty()

// 过滤结果字段
db.userCollection.find(
  { name: 'xjq' },
  {
    name: 1,
    phone: 1,
  }
)
```

## 用户管理

### 创建用户

```Javascript
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

## 聚合查询

| 表达式 | 描述       | 实例                                                   |
| ------ | ---------- | ------------------------------------------------------ |
| $sum   | 计算总和   | `{ $sum: "$age" }`                                     |
| $avg   | 计算平均值 | `{ $avg: "$age" }`                                     |
| $min   | 取最小值   | `{ $min: "$age" }`                                     |
| $max   | 取最大值   | `{ $max: "$age" }`                                     |
| $first | 取第一项   | `{ $group: { _id: "$name", age: { $first: "$age" } }}` |
| $last  | 取最后一项 | `{ $group: { _id: "$name", age: { $last: "$age" } }}`  |

### 管道

| 表达式   | 描述                                                           |
| -------- | -------------------------------------------------------------- |
| $project | 选择输出字段                                                   |
| $match   | 过滤条件                                                       |
| $group   | 分组                                                           |
| $sort    | 排序                                                           |
| $skip    | 跳过指定数量的文档                                             |
| $limit   | 限制返回数量                                                   |
| $unwind  | 将文档中的某一个数组类型字段拆分成多条，每条包含数组中的一个值 |

## 索引

### 创建索引

1 表示 使用 phone 字段值创建索引时，应按升序对其进行排序

```Javascript
db.userCollection.createIndex({ phone: 1 })
```

### 查找索引

```Javascript
db.userCollection.getIndexes()
```

### 删除索引

```Javascript
db.userCollection.dropIndex({ phone: 1 })
```

## 面试题

### 解释什么是副本集？

副本集是一组托管相同数据集的 mongo 实例.

在副本集中，一个节点是主节点，另一个是辅助节点。从主节点到辅助节点，所有数据都会复制.

### Objecld 由什么组成？

- 时间戳记
- 客户端机器 ID
- 客户端进程 ID
- 字节递增计数器

### MongoDB 中的索引是什么？

索引时 MongoDB 中的特殊结构，它以易于遍历的形式存储一小部分数据集

索引按指定字段的值排序，存储特定字段或一组字段的值

## 5.0 功能新特性

### 原生支持时序数据

时间序列集合，集群索引

在提高应用程序构建和运行时间序列速度的同时，减少了数据和索引的磁盘使用量，实现了更好地性能和更大的规模

### 新版 MongoDB Shell

引入了语法高亮、智能自助、上下文帮助等功能

### Schema Validation 增强
