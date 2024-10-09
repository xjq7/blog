[[toc]]

# 架构

> [架构基本概念和架构本质](https://juejin.cn/post/6844904099519922184)

## 概念

### 系统、模块、组件、框架和架构

系统和子系统:

    有关联的个体, 根据某种规则运行, 共同完成独特的功能, 子系统是系统的组成部分

模块和组件:

    模块和组件都是系统的组成部分, 只是从不同角度拆分系统.

    从逻辑角度拆分是模块, 模块从逻辑上将系统分解, 即分而治之, 将复杂问题简单化

    模块的粒度可大可小, 可以是系统、子系统、某个服务、函数、类、方法、功能等

    从物理角度拆分是组件, 组件可以包括应用服务、数据库、网络、物理机, 还可以是 MQ、容器、Nginx 等技术组件

    模块是为了实现职责分离, 组件是为了实现复用

框架:

    为了实现某个业界标准或完成特定基本任务的软件组件规范, 按照规范提供所要求基础功能的软件产品

架构:

    顶层设计

## 架构分层和分类

### 分层

- 业务架构

  包括业务规划、业务模块、业务流程, 对整个系统的业务进行拆分, 对领域模型进行设计, 将现实的业务转化成抽象对象

- 应用架构

  承接业务架构和技术架构, 应用架构的本质是通过系统拆分, 平衡业务和技术复杂性, 保证系统形散神不散

  应用架构定义系统有哪些应用、以及应用之间如何分工和合作

- 技术架构

  确定组成应用系统的实际运行组件(技术选型), 这些组件之间的关系, 以及部署到硬件的策略

  技术架构主要考虑系统的非功能性特征, 对系统的高可用、高性能、扩展、安全、伸缩性、简洁等做系统级的把握

### 分类

- 逻辑架构

  逻辑架构关注功能, 不仅包括用户可见的功能, 还包括为实现用户功能而必须提供的 辅助功能模块

- 开发架构

  开发架构关注程序包, 不仅包括要编写的源程序, 还包含可以直接使用的第三方 SDK和框架、类库, 以及开发的系统将运行于其上的系统软件或中间间

- 运行架构

  运行架构关注进程、线程、对象等运行时概念, 以及相关的并发、同步、通信等问题, 运行架构关注运行期间各个单元的交互

- 物理架构

  物理架构关注‘目标程序及其依赖的运行库和系统软件’最终如何安装或部署到物理机器, 以及如何部署机器和网络来配合软件系统的可靠性、可伸缩性等要求

- 数据架构

  数据架构关注持久化数据的存储方案, 不仅包含实体及实体关系的存储格式、还包括数据传递、数据复制、数据同步等策略

## 常见的架构设计