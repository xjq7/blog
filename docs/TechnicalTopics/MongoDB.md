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

重命名字段

```sh
db.<collection>.updateMany({},{$rename:{"olgName":"newName"}})
```

删除数据

```sh
db.<collection>.deleteMany({})
```
