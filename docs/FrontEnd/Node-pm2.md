[[toc]]

## 前言

- 简介
  pm2（process manager）是一个进程管理工具，维护一个进程列表，可以用它来管理你的 node 进程，负责所有正在运行的进程，并查看 node 进程的状态，也支持性能监控，负载均衡等功能。

- 优势
  1.  监听文件变化，自动重启程序
  2.  支持性能监控
  3.  负载均衡
  4.  程序崩溃自动重启
  5.  服务器重新启动时自动重新启动
  6.  自动化部署项目

## 安装使用

- 全局安装

```js
npm install pm2 -g
```

- 常用命令

  - 启动一个 node 程序

  ```js
  pm2 start app.js
  ```

  - 集群模式(-i 表示 number-instances 实例数量, max 表示 PM2 将自动检测可用 CPU 的数量 可以自己指定数量)

  ```js
  pm2 start app.js -i max
  ```

  - 列出所有进程

  ```js
  pm2 list
  ```

  - 查看进程资源消耗情况

  ```js
  pm2 monit
  ```

  - 重启进程

  ```js
  pm2 restart app
  pm2 restart all //重启全部
  ```

  - 查看进程日志

  ```js
  pm2 logs app
  pm2 logs all
  ```

  - 设置开机自启

  ```js
  pm2 startup centos
  ...
  pm2 save
  ```
