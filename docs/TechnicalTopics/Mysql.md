- [表列操作](./Mysql.html#add-column)

  - [ADD COLUMN](./Mysql.html#add-column)
  - [CHANGE COLUMN](./Mysql.html#change-column)

- [更新数据](./Mysql.html#update)

  - [UPDATE](./Mysql.html#update)

- [连接](./Mysql.html#join)

  - [join](./Mysql.html#join)
  - [left join](./Mysql.html#left-join)

- [查询](./Mysql.html#limit)

  - [LIMIT](./Mysql.html#limit)
  - [DISTINCT](./Mysql.html#distinct)
  - [Group By](./Mysql.html#group-by)
  - [Order By](./Mysql.html#order-by)
  - [IFNULL](./Mysql.html#ifnull)

## ADD COLUMN

添加表列

```sql
ALTER TABLE user
ADD COLUMN age int not NULL after name
```

## CHANGE COLUMN

修改表列

```sql
ALTER TABLE user
CHANGE name1 name VARCHAR(255)
```

## DELETE COLUMN

删除表列

```sql
ALTER TABLE user
DROP COLUMN name;
```

## UPDATE

更新数据

## join

内连接, 获取两个表字段匹配关系的记录

### left join

左连接, 列出左表所有记录，即使右表没有匹配

举个简单的例子，文章表跟用户表，文章表存的用户信息是用户 id ，但是想查出对应的用户名称，就可以使用左连接

```sql
SELECT article.id, article.title, user.name from article left join user on article.user_id = user.id
```

## NOT IN

## LIMIT

限定返回行数

查询用户并限定结果为 10 行

```sql
SELECT name from user LIMIT 10
```

## DISTINCT

检索不同的行, 去重匹配, 有多个列时, 多个列都相同才会被过滤

查用户, 过滤名字和年龄相同的用户

```sql
SELECT DISTINCT name, age from user
```

## Group By

## IS NULL 和 IS NOT NULL

对于 NULL 字段 需要使用 IS NULL 和 IS NOT NULL 判断

比如 有些 name 字段为 NULL 时

```sql
SELECT name from user where name!='张三' or name IS NULL
```

## Order By

排序默认升序(ASC)排序

查询用户 以年龄降序排序

```sql
SELECT name from user Order By age DESC
```

## IFNULL

用于判断一个表达式是否为 NULL, 如果是 NULL 则返回第二个参数的值

```sql
SELECT IFNULL((SELECT name from user LIMIT 1), 'xjq')
```

## UPDATE

批量修改时间，统一 +8 小时

```sql
update stat set createdAt = DATE_ADD(createdAt, INTERVAL 8 HOUR);
```
