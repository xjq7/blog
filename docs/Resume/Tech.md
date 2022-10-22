## html

1. 盒模型

标准 W3C 盒子模型的范围包括 margin、border、padding、content，并且 content 部分不包含其他部分

IE 盒子模型的范围也包括 margin、border、padding、content，和标准 W3C 盒子模型不同的是：IE 盒子模型的 content 部分包含了 border 和 pading

2. BFC

块级格式化上下文

BFC 的原理

1. BFC 这个元素的垂直的边距会发生重叠
2. BFC 的区域不会与浮动元素的 float 重叠
3. 独立的容器，内外元素互不影响
4. 计算 BFC 高度，浮动元素也参与计算

BFC 创建

1. float 不为 none 的时候
2. position 不为 static 或者 relative 的时候
3. display 与 table 相关的时候
4. overflow 为 auto, hidden 的时候

BFC 应用

1. 解决边距重叠问题

## Typescript

## React

1. 列表组件 key 的作用

2. setState

3.

## webpack && vite

1. 动态主题

2. 懒加载

## 架构

## 工程

### 脚手架

## 浏览器

1. async vs defer

## 工程化

1. 技术选型

2. 代码规范

3. git 规范、分支管理规范

4. 单元测试

5. CI CD

6. 监控

## babel

yundoc

## 类型体操

### Nginx

高性能 HTTP 和反向代理服务器

Nginx 以事件驱动的方式编写，所以有非常好的性能，同时也是一个非常高效的反向代理、负载平衡服务器

在性能上，Nginx 占用很少的系统资源，能支持更多的并发连接，达到更高的访问效率；在功能上，Nginx 是优秀的代理服务器和负载均衡服务器

在安装配置上，Nginx 安装简单、配置灵活。

Nginx 支持热部署，启动速度特别快，还可以在不间断服务的情况下对软件版本或配置进行升级，即使运行数月也无需重新启动。

## 其他

1. 首屏时间优化

   1. http 缓存
   2. cdn
   3. 按需加载
   4. 资源压缩
   5. http 2.0
