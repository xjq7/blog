---
title: 数据结构
sidebarDepth: 3
---

## 栈

```js
function Stack(arr) {
  this.arr = arr;
}

Stack.prototype.push = function (o) {
  this.arr.push(o);
};

Stack.prototype.pop = function (o) {
  this.arr.pop(o);
};

Stack.prototype.isEmpty = function (o) {
  return this.arr.length === 0;
};

Stack.prototype.top = function (o) {
  return this.arr[this.arr.lenght - 1];
};

Stack.prototype.clear = function (o) {
  this.arr = [];
};
Stack.prototype.size = function (o) {
  return this.arr.length;
};
```

## 队列

```js
function Queue() {
  this.arr = [];
}

Queue.prototype.enqueue = function (o) {
  this.arr.push(o);
};

Queue.prototype.dequeue = function (o) {
  this.arr.shift();
};

Queue.prototype.front = function (o) {
  return this.arr[0];
};

Queue.prototype.isEmpty = function (o) {
  return this.arr.length === 0;
};

Queue.prototype.size = function (o) {
  return this.arr.length;
};
```

## 链表

单链表

```js
function Node(elem) {
  this.elem = elem;
  this.next = null;
}

function LinkedList() {
  this.node = null;
  this.next = null;
  this.head = null;
  this.length = 0;
}

LinkedList.prototype.append = function (o) {
  const node = new Node(o);

  if (this.head === null) {
    this.head = node;
    this.node = node;
  } else {
    this.node.next = node;
    this.node = node;
  }

  this.length++;
};

LinkedList.prototype.insert = function (position, elem) {
  const len = this.length();
  if (position < 0 || position > len) {
    throw new Error("越界");
  }
  if (position === undefined || elem === undefined) {
    throw new Error("insert调用参数不全");
  }
  if (position === len) {
    this.append(elem);
    return;
  }
  let index = 0;
  let cur = this.head;

  while (index < position) {
    cur = cur.next;
    index++;
  }
  let nextNode = cur.next;
  let newNode = new Node(elem);
  newNode.next = nextNode;
  cur.next = newNode;

  this.length++;
};

LinkedList.prototype.find = function (elem) {
  let cur = this.head;
  while (cur) {
    if (cur.elem === elem) {
      return cur;
    }
    cur = cur.next;
  }
  return null;
};

LinkedList.prototype.findPre = function (elem) {
  let cur = this.head;
  while (cur) {
    if (cur.next && cur.next.elem === elem) {
      return cur;
    }
    cur = cur.next;
  }
  return null;
};

LinkedList.prototype.remove = function (elem) {
  const preNode = this.findPre(elem);
  console.log(preNode);
  if (!preNode) {
    throw new Error("找不到该元素");
  }
  preNode.next = preNode.next.next;
  this.length--;
};

LinkedList.prototype.log = function () {
  let cur = this.head;
  while (cur) {
    console.log(cur.elem);
    cur = cur.next;
  }
};
```

### 双向链表

```js
function Node(elem) {
  this.elem = elem;
  this.next = null;
  this.pre = null;
}

function LinkedList() {
  this.node = null;
  this.head = null;
  this.length = 0;
}

LinkedList.prototype.append = function (elem) {
  const newNode = new Node(elem);
  if (this.head) {
    this.node.next = newNode;
    newNode.pre = this.node;
  } else {
    this.head = newNode;
  }
  this.node = newNode;
};

LinkedList.prototype.find = function (elem) {
  let cur = this.head;
  while (cur) {
    if (cur.elem === elem) {
      return cur;
    }
    cur = cur.next;
  }
  return null;
};

LinkedList.prototype.remove = function (elem) {
  let findNode = this.find(elem);
  if (!findNode.pre) {
    findNode.next.pre = null;
    this.head = findNode.next;
  } else if (!findNode.next) {
    findNode.pre.next = null;
  } else {
    let nextNode = findNode.next;
    findNode.pre.next = nextNode;
    nextNode.pre = findNode.pre;
  }

  findNode = null;
};

LinkedList.prototype.log = function () {
  let cur = this.head;
  while (cur) {
    console.log(cur);
    cur = cur.next;
  }
};
```

## 二叉树

### 构造

```js
function Node(elem, left, right) {
  this.elem = elem;
  this.left = left || null;
  this.right = right || null;
}

function BST() {
  this.root = null;
}
```

### 插入

```js
BST.prototype.insert = function (elem) {
  const newNode = new Node(elem);
  if (!this.root) {
    this.root = newNode;
  } else {
    let cur = this.root;
    let parent;
    while (true) {
      parent = cur;
      if (elem < cur.elem) {
        cur = cur.left;
        if (cur === null) {
          parent.left = newNode;
          break;
        }
      } else {
        cur = cur.right;
        if (cur === null) {
          parent.right = newNode;
          break;
        }
      }
    }
  }
};
```

### 遍历

递归

```js
function inOrder(node) {
  if (node !== null) {
    inOrder(node.left);
    console.log(node.elem);
    inOrder(node.right);
  }
}

function preOrder(node) {
  if (node !== null) {
    console.log(node.elem);
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  if (node !== null) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.elem);
  }
}
```

### 查找

```js
BST.prototype.find = function (elem) {
  let cur = this.root;
  while (cur !== null && cur.elem !== elem) {
    if (cur.elem > elem) {
      cur = cur.left;
    } else {
      cur = cur.right;
    }
  }
  return cur;
};
```

## 图

### 无向图

```js
function Vertex(label) {
  this.label = label;
}

function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
  }
}

Graph.prototype.addEdge = function (v, w) {
  const vVertex = new Vertex(v);
  const wVertex = new Vertex(w);
  this.adj[v].push(wVertex);
  this.adj[w].push(vVertex);
  this.edges++;
};

Graph.prototype.show = function () {
  let log = "";
  for (var i = 0; i < this.vertices; ++i) {
    log = `${i} -> `;
    for (var j = 0; j < this.vertices; ++j) {
      const item = this.adj[i][j];
      if (item !== undefined) {
        log = log.concat(`${item.label}, `);
      }
    }
    console.log(log);
  }
};
```

### 搜索图

#### 深度优先搜索

```js
function Graph(v) {
  this.vertices = v;
  this.edges = 0;
  this.marked = [];

  this.adj = [];
  for (var i = 0; i < this.vertices; ++i) {
    this.adj[i] = [];
    this.marked[i] = false;
  }
}

Graph.prototype.addEdge = function (v, w) {
  this.adj[v].push(w);
  this.adj[w].push(v);
  this.edges++;
};

Graph.prototype.show = function () {
  let log = "";
  for (var i = 0; i < this.vertices; ++i) {
    log = `${i} -> `;
    for (var j = 0; j < this.vertices; ++j) {
      const item = this.adj[i][j];
      if (item !== undefined) {
        log = log.concat(`${item}, `);
      }
    }
    console.log(log);
  }
};

Graph.prototype.dfs = function (v = 0) {
  this._dfs(v);
};
Graph.prototype._dfs = function (v) {
  this.marked[v] = true;
  console.log(v);
  this.adj[v].forEach((w) => {
    if (!this.marked[w]) {
      this._dfs(w);
    }
  });
};
```

#### 广度优先搜索

```js
Graph.prototype.bfs = function (v) {
  const queue = [];
  queue.push(v);
  this.marked[v] = true;
  while (queue.length > 0) {
    let log = "";
    let curV = queue.shift();
    log = log.concat(`${curV} `);
    console.log(curV);

    this.adj[curV].forEach((w) => {
      if (!this.marked[w]) {
        this.marked[w] = true;
        queue.push(w);
      }
    });
  }
};
```

### BFS 寻找最短路径

d 记录距离，pred 记录前溯点

```js
Graph.prototype.bfs = function (v) {
  const queue = [];
  const d = [];
  const pred = [];

  for (let i = 0; i < this.vertices; i++) {
    d[i] = 0;
    pred[i] = null;
  }
  queue.push(v);
  this.marked[v] = true;
  while (queue.length > 0) {
    let curV = queue.shift();
    this.adj[curV].forEach((w) => {
      if (!this.marked[w]) {
        d[w] = d[curV] + 1;
        pred[w] = curV;
        this.marked[w] = true;
        queue.push(w);
      }
    });
  }
  return { d, pred };
};
```
