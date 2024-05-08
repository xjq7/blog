[[toc]]

# 数据结构

## 图论

### 最短路径

- [2385. 感染二叉树需要的总时间](https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/)

先走 深搜 构造无向图
然后从 start 节点开始走 广搜 寻找最短路径

## 二叉树

### 前序遍历

[144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/)

前序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 根结点 -> 左子树 -> 右子树 的顺序

示例 1:

```
        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [1,2,4,5,3,6,7]
```

示例 2:

```
        1
      /   \
    2       3
   / \
  4   5
 / \
6   7

遍历输出为 [1,2,4,6,7,5,3]
```

#### 递归

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function preOrder(root, queue=[]){
  if(!root)return queue;
  queue.push(root.val)
  preOrder(root.left,queue);
  preOrder(root.right,queue);
  return queue;
}
```

#### 迭代

利用栈先进后出的性质 实现迭代方式遍历

先入栈右子树

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
function preOrder(root){
  if(!root)return [];

  const ans = [];
  const stack = [root];
  while (stack.length) {
      const top = stack.pop();
      ans.push(top.val);
      if (top.right) stack.push(top.right);
      if (top.left) stack.push(top.left);
  }

  return ans;
}
```

### 中序遍历

[94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/)

中序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 左子树 -> 根结点 -> 右子树

示例 1:

```
        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [4,2,5,1,6,3,7]
```

示例 2:

```
        1
      /   \
    2       3
   / \
  4   5
 / \
6   7

遍历输出为 [6,4,7,2,5,1,3]
```

#### 递归

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root, ans = []) {
    if (!root) return ans;

    inorderTraversal(root.left, ans);
    ans.push(root.val);
    inorderTraversal(root.right, ans);
    return ans;
};
```

#### 迭代

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var inorderTraversal = function (root) {
    if (!root) return [];

    const ans = [];
    const stack = [];
    let current = root;

    while (current || stack.length) {
        while (current) {
            stack.push(current);
            current = current.left;
        }

        const top = stack.pop();
        ans.push(top.val);
        current = top.right;
    }

    return ans;
};
```

### 后序遍历

[145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

后序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 左子树 -> 右子树 -> 根结点

示例 1:

```
        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [4,5,2,6,7,3,1]
```

示例 2:

```
        1
      /   \
    2       3
   / \
  4   5
 / \
6   7

遍历输出为 [6,7,4,5,2,3,1]
```

#### 递归

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root, ans = []) {
    if (!root) return ans;

    postorderTraversal(root.left, ans);
    postorderTraversal(root.right, ans);
    ans.push(root.val);
    return ans;
};
```

#### 迭代

先按 根节点 -> 右子树 -> 左子树 顺序遍历

然后将结果 逆转

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[]}
 */
var postorderTraversal = function (root) {
    if (!root) return [];

    const stack = [root];
    const ans = [];

    while (stack.length) {
        const top = stack.pop();
        ans.push(top.val);

        if (top.left) stack.push(top.left);
        if (top.right) stack.push(top.right);
    }

    return ans.reverse();
};
```

### 层序遍历

[102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/description/)

层序遍历是一种广度优先搜索的遍历方式, 从根节点开始, 按层访问树的节点

示例 1:

```
        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [[1],[2,3],[4,5,6,7]]
```

示例 2:

```
        1
      /   \
    2       3
   / \
  4   5
 / \
6   7

遍历输出为 [[1],[2,3],[4,5],[6,7]]
```

#### 迭代

```Js
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function (root) {
    if (!root) return [];
    let q = [root];
    const ans = [];
    while (q.length) {
        const size = q.length;
        let current = [];
        ans.push([]);
        for (let i = 0; i < size; i++) {
            const head = q[i];
            ans[ans.length-1].push(head.val);
            if (head.left) current.push(head.left);
            if (head.right) current.push(head.right);
        }
        q = current;
    }
    return ans;
};
```

#### 相关的一些题目

- [1302. 层数最深叶子节点的和](https://leetcode.cn/problems/deepest-leaves-sum/description/)

  使用BFS 找出最深一层的节点集合, 然后求和

## 树

## 数组

## 链表

### 双链表

- [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/description/)

构造双链表存储节点, 每新增一个新数添加到头部, 已存在则更新 value 以及移动到头部
构造 map 存储每个链表节点, 方便在 get 时直接取到对应链表节点, 然后做移动到头节点动作

# 算法

## 双指针

## 哈希表

n 数之和

## 单调栈
