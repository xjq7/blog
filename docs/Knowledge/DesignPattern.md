[[toc]]

## 面向对象六大原则

### 单一职责

- **概念**

  1. 单一职责原则(Single Responsibility Principle, SRP)：一个类只负责一个功能领域中的相应职责, 或者可以定义为：就一个类而言, 应该只有一个引起它变化的原因。

  2. 单一职责原则是实现高内聚、低耦合的指导方针, 它是最简单但又最难运用的原则

  3. 单一职责原则是最简单的面向对象设计原则, 它用于控制类的粒度大小

  4. 扩展: 一个类越简单, 功能越单一, 复用性越大

> [嘻哈说：设计模式之里氏替换原则](https://zhuanlan.zhihu.com/p/41673613)

### 里氏替换原则

- **概念**

  1. 里氏替换原则（Liskov Substitution Principle, LSP）:子类可以扩展父类功能,但不能改变父类原有功能

  2. 子类可以实现父类的抽象方法,但不能覆盖父类的非抽象方法

  3. 子类可以增加自己特有的方法

  4. 当子类重载父类的方法时,方法的前置条件(方法的形参)要比父类方法的输入参数条件更宽松

  5. 当子类实现父类的抽象方法时,方法的后置条件(方法返回值)要比父类严格

- **优点**

  1. 克服了继承中重写父类方法造成的可复用性变差的缺点,继承:1、代码共享,减少创建类的工作量,每个子类都拥有父类
     的方法和属性.2、提高代码重用性.3、提高代码可扩展性.4、继承是侵入性的,只要继承就必须拥有父类的属性和方法.5、降低代码的灵活性

  2. 类的扩展不会给已有的系统引入新的错误,降低了代码出错的可能性

### 依赖倒置原则

- **概念**

  1. 依赖倒置原则(Dependence Inversion Principle, DIP): 核心思想:面向接口编程,不要面向实现编程

     - 高层模块不应该依赖于底层模块, 两者都应该依赖其抽象
     - 抽象不应该依赖于细节, 细节应该依赖于抽象

  2. 由于在软件设计中, 细节具有多变性, 而抽象层则相对稳定, 因此以抽象为基础搭建起来的架构要比以细节为基础搭建起来的架构要稳定得多

- **优点**

  1. 降低类间的耦合性

  2. 提高系统稳定性

  3. 降低并行开发引起的风险

  4. 提高代码可读性和可维护性

- **最佳实践**

  1. 每个类尽量都有接口或抽象类,或者抽象类和接口都具备

  2. 变量的表面类型尽量是接口或者抽象类

  3. 任何类都不应该从具体类派生

  4. 遵循里氏替换原则

## 设计模式

### 单例模式

全局可访问, 并且只有一个实例

### 工厂模式

批量创建对象

### 策略模式

根据不同参数命中不同策略

### 适配器模式

解决两个接口不匹配的问题

桥接模式

### 观察者模式

当观察的数据对象发生变化时, 自动调用相应函数

### 职责链模式

类似多米诺骨牌, 通过请求第一个条件, 会持续执行后续的条件, 直到返回结果为止

### 发布订阅模式

在异步编程中通过发布订阅模式可以实现更松散的解耦

缺点是过多的使用会导致维护难度变高
