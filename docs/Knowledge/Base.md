[[toc]]

# 数据结构

## 图论

### 最短路径

- :yellow_circle: [2385. 感染二叉树需要的总时间](https://leetcode.cn/problems/amount-of-time-for-binary-tree-to-be-infected/)

先走 深搜 构造无向图
然后从 start 节点开始走 广搜 寻找最短路径

## 二叉树

### 前序遍历

:green_circle: [144. 二叉树的前序遍历](https://leetcode.cn/problems/binary-tree-preorder-traversal/description/)

前序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 根结点 -> 左子树 -> 右子树 的顺序

示例 1:

```
example 1

        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [1,2,4,5,3,6,7]
```

示例 2:

```
example 2

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

:green_circle: [94. 二叉树的中序遍历](https://leetcode.cn/problems/binary-tree-inorder-traversal/description/)

中序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 左子树 -> 根结点 -> 右子树

示例 1:

```
example 1

        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [4,2,5,1,6,3,7]
```

示例 2:

```
example 2

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

:green_circle: [145. 二叉树的后序遍历](https://leetcode.cn/problems/binary-tree-postorder-traversal/)

后序遍历是一种深度优先搜索的遍历方式, 遍历顺序为 左子树 -> 右子树 -> 根结点

示例 1:

```
example 1

        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [4,5,2,6,7,3,1]
```

示例 2:

```
example 2

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

:yellow_circle: [102. 二叉树的层序遍历](https://leetcode.cn/problems/binary-tree-level-order-traversal/description/)

层序遍历是一种广度优先搜索的遍历方式, 从根节点开始, 按层访问树的节点

示例 1:

```
example 1

        1
      /   \
    2       3
  /  \     /  \
 4    5   6    7


遍历输出为 [[1],[2,3],[4,5,6,7]]
```

示例 2:

```
example 2

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

- :yellow_circle: [1302. 层数最深叶子节点的和](https://leetcode.cn/problems/deepest-leaves-sum/description/)

  使用 BFS 找出最深一层的节点集合, 然后求和

- :yellow_circle: [2583. 二叉树中的第 K 大层和](https://leetcode.cn/problems/kth-largest-sum-in-a-binary-tree/description/)

  使用 BFS 计算每一层的和, 然后排序

### 二叉搜索树

二叉搜索树（Binary Search Tree, BST）具有以下特性

- 节点左子树中所有节点都小于该节点的值
- 节点右子树中所有节点都大于该节点的值
- 左子树和右子树也分别是二叉搜索树

二叉搜索树 支持高效搜索、插入、删除操作

搜索操作的时间复杂度为 O(log n), n 是树中节点数量

示例 1:

```
example 1

        8
      /   \
    6       10
  /  \     /  \
 5    7   9    11

```

- :green_circle: [700. 二叉搜索树中的搜索](https://leetcode.cn/problems/search-in-a-binary-search-tree/description/)
- :yellow_circle: [95. 不同的二叉搜索树 II](https://leetcode.cn/problems/unique-binary-search-trees-ii/description/)

  DFS

### 二叉平衡树

二叉平衡树是一种特殊的二叉搜索树, 在最坏的情况下搜索时间复杂度也是 O(log n)

- 树中每个节点左子树跟右子树高度差不超过 1
- 左子树与右子树也分别是二叉平衡树

示例 1

```
example 1

        8
      /   \
    6       10
  /  \
 5    7

```

- :green_circle: [LCR 176. 判断是否为平衡二叉树](https://leetcode.cn/problems/ping-heng-er-cha-shu-lcof/description/)

  递归获取左右子树高度差做计算, 同时递归判断左右子树是否也是平衡树

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
  * @return {boolean}
  */
  var isBalanced = function (root) {
      if (!root) return true;
      return Math.abs(height(root.left) - height(root.right)) <= 1 && isBalanced(root.left) && isBalanced(root.right)
  };

  function height(root) {
      if (!root) return 0;

      return Math.max(height(root.left) + 1, height(root.right) + 1);
  }
  ```

- [1382. 将二叉搜索树变平衡](https://leetcode.cn/problems/balance-a-binary-search-tree/description/)

  通过中序遍历获取升序数组, 然后以中间点为 根 递归生成树

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
  * @return {TreeNode}
  */
  var balanceBST = function (root) {
      const arr = [];
      const stack = [];
      let current = root;

      while (current || stack.length) {
          while (current) {
              stack.push(current);
              current = current.left;
          }

          current = stack.pop();
          arr.push(current.val);
          current = current.right;
      }

      function build(start, end) {
          if (start > end) return null;
          const mid = start + Math.floor((end - start) / 2);

          const node = new TreeNode(arr[mid]);

          node.left = build(start, mid - 1);
          node.right = build(mid + 1, end);
          return node;
      }

      return build(0, arr.length - 1);
  };
  ```

## 树

## 链表

### 双链表

- [146. LRU 缓存](https://leetcode.cn/problems/lru-cache/description/)

构造双链表存储节点, 每新增一个新数添加到头部, 已存在则更新 value 以及移动到头部
构造 map 存储每个链表节点, 方便在 get 时直接取到对应链表节点, 然后做移动到头节点动作

# 算法

## 双指针

双指针通过两个指针在数组或链表中移动, 以解决一些特定类型的问题

- 快慢指针: 快指针移动速度快, 慢指针移动速度慢, 常用于解决链表成环检测、链表中点、链表是否相交等问题
- 左右指针: 左右指针分别位于数组两端, 移动左指针、右指针或同时移动, 常用于解决数组或字符串的搜索、反转、滑动窗口等问题
- 对撞指针: 对撞指针指向数组两端, 并向中间移动, 常用于解决需要同时考虑两端情况的问题, 例如有序数组的两数之和、反转数组等

双指针在 优化时间复杂度的问题时非常有用, 通常能在 O(n) 时间复杂度内解决问题, 例如将 O(n²) 降低到 O(n)

- :green_circle: [88. 合并两个有序数组](https://leetcode.cn/problems/merge-sorted-array/description/)

  这里因为是原地操作, 通过逆序遍历省去临时数组的使用, 从尾部逐个对比移动 i, j 指针, 实时将对比中较大的数覆盖到 nums1 中

  ```Js
  /**
  * @param {number[]} nums1
  * @param {number} m
  * @param {number[]} nums2
  * @param {number} n
  * @return {void} Do not return anything, modify nums1 in-place instead.
  */
  var merge = function (nums1, m, nums2, n) {
      let i = m - 1, j = n - 1;

      while (i >= 0 || j >= 0) {
          if (i === -1) {
              nums1[i + j + 1] = nums2[j--];
          } else if (j === -1) {
              i--;
          } else if (nums1[i] >= nums2[j]) {
              nums1[i+j+1] = nums1[i--];
          }else {
              nums1[i+j+1] = nums2[j--];
          }
      }
  };
  ```

- :yellow_circle: [15. 三数之和](https://leetcode.cn/problems/3sum/description/)

  暴力解法三重循环 O(n^3) 会超时, 通过排序 + 双指针 优化第二第三重循环, 左指针右指针向中间收拢, 找出和为 0 的组合, 同时去除重复组合

  ```Js
  /**
   * @param {number[]} nums
  * @return {number[][]}
  */
  var threeSum = function (nums) {
      nums = nums.sort((a, b) => a - b);
      const ans = [];

      for (let i = 0; i < nums.length - 2; i++) {
          if (nums[i] > 0) break;
          if (i > 0 && nums[i] === nums[i - 1]) continue;
          let l = i + 1, r = nums.length - 1;
          while (l < r) {
              const sum = nums[l] + nums[r] + nums[i];
              if (sum < 0) {
                  while (l < r && nums[l] === nums[++l]);
              } else if (sum > 0) {
                  while (l < r && nums[r] === nums[--r]);
              } else {
                  ans.push([nums[i], nums[l], nums[r]]);
                  while (l < r && nums[l] === nums[++l]);
                  while (l < r && nums[r] === nums[--r]);
              }
          }

      }
      return ans;
  };
  ```

- :yellow_circle: [19. 删除链表的倒数第 N 个结点](https://leetcode.cn/problems/remove-nth-node-from-end-of-list/description/)

  设立快慢指针, 让快指针先走 n 步, 然后移动慢指针找到要移除节点的位置, 这里我使用虚拟头节点, 找到要移除节点的前一个节点

  ```Js
  /**
   * Definition for singly-linked list.
  * function ListNode(val, next) {
  *     this.val = (val===undefined ? 0 : val)
  *     this.next = (next===undefined ? null : next)
  * }
  */
  /**
  * @param {ListNode} head
  * @param {number} n
  * @return {ListNode}
  */
  var removeNthFromEnd = function (head, n) {
    let front = (end = res = new ListNode());

    front.next = end.next = head;
    while (n--) {
      front = front.next;
    }

    while (front && front.next) {
      front = front.next;
      end = end.next;
    }

    end.next = end.next.next;
    return res.next;
  };

  ```

## 二分查找

- :yellow_circle: [33.搜索旋转排序数组](https://leetcode.cn/problems/search-in-rotated-sorted-array/description/)

  逻辑梳理有点复杂, 条件判断较多, 核心是利用单调性, 来判断二分继续往左还是往右找, 例如: 如果当前 mid 偏大, 左边是单调递增
  则判断左端点是否也偏大, 偏大则向右查找, 否则向左, 其他情况略...

  ```Js
  /**
   * @param {number[]} nums
  * @param {number} target
  * @return {number}
  */
  var search = function (nums, target) {
      let i = 0, j = nums.length - 1
      let mid
      while (i <= j) {
          mid = Math.floor((j - i) / 2) + i
          if (nums[mid] === target) {
              return mid
          }
          if (nums[mid] > nums[i]) {
              if (nums[mid] > target) {
                  if (nums[i] > target) {
                      i = mid + 1
                  } else {
                      j = mid - 1
                  }
              } else {
                  i = mid + 1
              }
          } else if (nums[mid] < nums[i]) {
              if (nums[mid] > target) {
                  j = mid - 1
              } else {
                  if (nums[j] < target) {
                      j = mid - 1
                  } else {
                      i = mid + 1
                  }
              }
          } else {
              i = mid + 1
          }
      }
      return -1
  };
  ```

## 哈希表

n 数之和

## 回溯

- :yellow_circle: [22. 括号生成](https://leetcode.cn/problems/generate-parentheses/description/)

  回溯过程中限制左括号数量小于右括号数量即可

  ```Js
  /**
   * @param {number} n
  * @return {string[]}
  */
  var generateParenthesis = function (n) {
    const ans = [];

    const store = [n, n];

    const dfs = (tmp) => {
      if (!store[0] && !store[1]) {
        ans.push(tmp);
        return;
      }

      if (store[0]) {
        store[0]--;
        dfs(tmp + '(');
        store[0]++;
      }

      if (store[0] < store[1]) {
        store[1]--;
        dfs(tmp + ')');
        store[1]++;
      }
    };
    dfs('');
    return ans;
  };

  ```

## 单调栈

## djb2 算法

djb2 是一个产生随机分布的的哈希函数

### 参数 33 的选择

在 DJB2 哈希算法中, 使用乘数 33 作为哈希算法的参数, 是为了利用位运算的性质, 避免乘法运算, 从而提高计算速度和效率

使用乘数 33 的主要原理是：将一个数左移一位, 相当于将这个数乘以 2, 左移 n 位相当于将这个数乘以 2 的 n 次方。而使用位运算的速度远远快于乘法运算, 因此在哈希算法中使用位运算可以显著提高计算速度和效率

同时, 33 作为乘数的选择也是有一定道理的。首先, 33 是一个奇数, 这可以确保在哈希过程中使用的乘数不会与偶数相关的信息发生冲突。其次, 33 可以写成 2 的五次方再加上 1, 即 33=2^5+1。这意味着在哈希过程中, 可以将原始哈希值左移 5 位, 再加上原始哈希值, 相当于将原始哈希值乘以 33, 从而得到更好的哈希值

## 动态规划

动态规划（英语：Dynamic programming, 简称DP）是一种在数学、管理科学、计算机科学、经济学和生物信息学中使用的, 通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法

动态规划适用于有重叠子问题和最优子结构性质的问题, 动态规划方法耗时远少于朴素解法

- :yellow_circle: [198. 打家劫舍](https://leetcode.cn/problems/house-robber/description/)

  找到 状态转移方程, 打劫第 i 家的收益最大化, 根据条件限制应该为 打劫第 i-2 家的收益加上 第 i 家 跟 打劫第 i-1 家的最大收益做比较, 最后结果返回 dp 的最后一项即可

  也就是 dp[i] = Math.max(dp[i-2] + nums[i], dp[i-1])

  ```Js
  /**
   * @param {number[]} nums
  * @return {number}
  */
  var rob = function (nums) {
      const dp = new Array(nums.length + 10).fill(0)
      dp[0] = nums[0]
      dp[1] = Math.max(nums[0], nums[1])

      for (let i = 2; i < nums.length; i++) {
          dp[i] = Math.max(dp[i - 2] + nums[i], dp[i - 1])
      }

      return dp[nums.length - 1]
  };
  ```

- :yellow_circle: [300. 最长递增子序列](https://leetcode.cn/problems/longest-increasing-subsequence/description/)

  动态规划解法: 状态转移方程 dp[j] = max(dp[i] + 1, dp[j])

  ```Js
  /**
   * @param {number[]} nums
  * @return {number}
  */
  var lengthOfLIS = function (nums) {
      const n = nums.length
      const dp = new Array(n).fill(1)

      let ans = 1

      for (let i = 0; i < n; i++) {
          for (let j = i + 1; j < n; j++) {
              if (nums[j] > nums[i]) {
                  dp[j] = Math.max(dp[i] + 1, dp[j])
                  if (dp[j] > ans) ans = dp[j]
              }
          }
      }

      return ans
  };
  ```

  二分查找解法: 我们维护一个单调递增的序列 arr, 存储当前最长子序列, 遍历数组元素, 大于 arr 元素则扩充 arr
  小于则用二分找到该元素插入点 更新序列 arr, 最终最大长度则是 arr 序列长度

  ```Js
  /**
   * @param {number[]} nums
  * @return {number}
  */
  var lengthOfLIS = function (nums) {
      const n = nums.length
      const arr = new Array(n)

      arr[0] = nums[0]

      let len = 0

      for (let i = 1; i < n; i++) {
          if (nums[i] > arr[len]) {
              arr[++len] = nums[i]
          } else {
              let l = 0, r = len, pos = 0

              while (l <= r) {
                  let mid = l + Math.floor((r - l) / 2)
                  if (arr[mid] >= nums[i]) {
                      r = mid - 1
                      pos = mid
                  } else {
                      pos = mid + 1
                      l = mid + 1
                  }
              }
              arr[pos] = nums[i]

          }
      }

      return len + 1
  };
  ```

- :yellow_circle: [221. 最大正方形](https://leetcode.cn/problems/maximal-square/description/)

  dp[i][j] 代表 以 i,j 索引的二维矩阵为右下角的最大边长, 状态转移方程 dp[i][j] = min(dp[i-1][j],dp[i][j-1],dp[i-1][j-1]) + 1

  当前元素 为 '1' 可根据靠左上角的三个邻近元素去推断当前元素能组成多大的正方形

  ```Js
  /**
   * @param {character[][]} matrix
  * @return {number}
  */
  var maximalSquare = function (matrix) {
      const m = matrix.length
      const n = matrix[0].length

      let edge = 0;

      for (let i = 0; i < m; i++) {
          for (let j = 0; j < n; j++) {
              if (matrix[i][j] === '1') {
                  if (i !== 0 && j !== 0) {
                      matrix[i][j] = Math.min(Math.min(matrix[i - 1][j], matrix[i][j - 1]), matrix[i - 1][j - 1]) + 1
                  }
                  if (matrix[i][j] > edge) {
                      edge = matrix[i][j]
                  }
              }
          }
      }

      return edge * edge
  };
  ```

- :yellow_circle: [53. 最大子数组和](https://leetcode.cn/problems/maximum-subarray/description/)

  状态转移方程: dp[i] = max(dp[i-1]+nums[i], nums[i]), 如果 i 之前的最大值 dp[i-1] 加上当前元素还没有 nums[i] 大
  那更新 dp[i] 为 nums[i], 也就是抛弃 i 之前的数字, 因为加上它们 结果反而更小了

  ```Js
  /**
   * @param {number[]} nums
  * @return {number}
  */
  var maxSubArray = function(nums) {
      const n = nums.length;
      const dp = new Array(n).fill(0);
      dp[0] = nums[0];

      let ans = dp[0];

      for(let i=1;i<n;i++){
          dp[i] = Math.max(dp[i-1]+nums[i], nums[i]);
          ans = Math.max(ans, dp[i]);
      }

      return ans
  };
  ```
