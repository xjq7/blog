[[toc]]

> [STL 教程：C++ STL 快速入门](http://c.biancheng.net/stl/)

## STL-是什么

STL，英文全称 standard template library，中文可译为标准模板库或者泛型库，其包含有大量的模板类和模板函数，是 C++ 提供的一个基础模板的集合，用于完成诸如输入/输出、数学计算等功能

STL 最初由惠普实验室开发，于 1998 年被定为国际标准，正式成为 C++ 程序库的重要组成部分。值得一提的是，如今 STL 已完全被内置到支持 C++ 的编译器中，无需额外安装，这可能也是 STL 被广泛使用的原因之一。

    STL 就位于各个 C++ 的头文件中，即它并非以二进制代码的形式提供，而是以源代码的形式提供。

### STL-的组成

- 容器

一些封装数据结构的模板类

- 算法

  STL 提供了非常多（大约 100 个）的数据结构算法，它们都被设计成一个个的模板函数

- 迭代器

  在 C++ STL 中，对容器中数据的读和写，是通过迭代器完成的，扮演着容器和算法之间的胶合剂

- 函数对象

  如果一个类将 () 运算符重载为成员函数，这个类就称为函数对象类，这个类的对象就是函数对象（又称仿函数）

- 适配器

  可以使一个类的接口（模板的参数）适配成用户指定的形式，从而让原本不能在一起工作的两个类工作在一起。值得一提的是，容器、迭代器和函数都有适配器

- 内存分配器

  为容器类模板提供自定义的内存申请和释放功能，由于往往只有高级用户才有改变内存分配策略的需求，因此内存分配器对于一般用户来说，并不常用

### STL-头文件

1. iterator
2. functional
3. vector
4. deque
5. list
6. queue
7. stack
8. set
9. map
10. algorithm
11. numeric
12. memory
13. utility

## 迭代器成员函数

加前缀 c 代表 常量迭代器

### begin()

返回指向容器中第一个元素的正向迭代器；如果是 const 类型容器，在该函数返回的是常量正向迭代器

### end()

返回指向容器最后一个元素之后一个位置的正向迭代器；如果是 const 类型容器，在该函数返回的是常量正向迭代器。此函数通常和 begin() 搭配使用

### rbegin()

返回指向最后一个元素的反向迭代器；如果是 const 类型容器，在该函数返回的是常量反向迭代器

### rend()

返回指向第一个元素之前一个位置的反向迭代器。如果是 const 类型容器，在该函数返回的是常量反向迭代器。此函数通常和 rbegin() 搭配使用

## 序列式容器

定长数组

### array

```cpp
#include <iostream>
#include <array>
using namespace std;
int main() {
  array<int,10> arr;
  for(int i=0;i<10;i++)arr[i]=i;
  for(int i=0;i<arr.size();i++)cout << arr[i] << endl;
  return 0;
}
```

#### begin/end

```cpp
array<int,10>::iterator it = arr.begin();
cout << *it; // 0
it = arr.end();
it--;
cout << *it; // 9
```

#### rbegin/rend

```cpp
array<int,10>::reverse_iterator it = arr.rbegin();
cout << *it; // 9
it = arr.rend();
it--;
cout << *it; // 0
```

### vector

变长数组

初始化元素

```cpp
vector<int> arr = {1,2,3,4,5};
```

二维初始化

```cpp
// 一维长度 10, 二维 长度 10, 初始值为 2
vector<vector<int>> arr(10,vector<int>(10,2));

// 一维长度 2, 二维 长度 2, 指定初始值
vector<vector<int>> arr = {{1,2},{3,4}};
```

指定元素个数, 初始值为 0

```cpp
vector<int> arr(10);
```

指定元素且指定初始值

```cpp
vector<int> arr(10,100);
```

使用数组或者另一个容器初始化

```cpp
int array[] = {1,2,3};
vector<int> arr(array, array + 3);// {1,2,3}
vector<int> arr1 = {1,2,3,4,5};
vector<int> arr2(begin(arr1),end(arr1));// {1,2,3,4,5}
vector<int> arr3(begin(arr1),begin(arr1) + 2);// {1,2}
```

#### 成员函数

- max_size()

  返回元素个数的最大值

- resize()

  改变实际元素的个数

- capacity()

  返回当前容量

- empty()

  容器是否为空

- reserve()

  扩容

- front()

  返回第一个元素的引用

- back()

  返回最后一个元素的引用

- data()

  返回指向容器中第一个元素的指针

- push_back()

  在容器的尾部添加一个元素, push_back() 向容器尾部添加元素时，首先会创建这个元素，然后再将这个元素拷贝或者移动到容器中（如果是拷贝的话，事后会自行销毁先前创建的这个元素）

- pop_back()

  移除尾部第一个元素

- insert()

  ```cpp
  vector<int> arr = {1, 2, 3, 4, 5};
  arr.insert(arr.begin(), 66); // {66, 1, 2, 3, 4, 5}

  vector<int> arr1 = {1, 2};
  arr1.insert(arr1.end(), 2, 5); // {1, 2, 5, 5}

  vector<int> arr2 = {1, 2};
  vector<int> arr3 = {1, 2};
  arr3.insert(arr2.end(), arr2.begin(), arr2.end()); // {1, 2, 1, 2}

  vector<int> arr4 = {1, 2};
  arr4.insert(arr4.end(), {2, 5}); // {1, 2, 2, 5}
  ```

  在指定的位置插入一个或多个元素

- erase()

  ```cpp
  vector<int> arr = {1, 2, 3, 4, 5};
  arr.erase(arr.begin()+1,arr.end()-1); // {1, 5}
  ```

  移出一个元素或一段元素

- clear()

  ```cpp
  vector<int> arr = {1, 2, 3, 4, 5};
  arr.clear(); // {}
  ```

  移出所有的元素，容器大小变为 0

- swap()

  交换两个容器的所有元素

- emplace()

  ```cpp
  vector<int> arr = {1, 2, 3, 4, 5};
  arr.emplace(arr.begin(),66); // {66, 1, 2, 3, 4, 5}
  ```

  在指定的位置直接生成一个元素

- emplace_back()

  在容器尾部生成一个元素, emplace_back() 直接在容器尾部创建这个元素，省去了拷贝或移动元素的过程
