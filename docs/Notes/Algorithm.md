- [哈希表](./Algorithm.html#最长连续序列)

  - [最长连续子序列](./Algorithm.html#最长连续序列)

- [单调栈](./Algorithm.html#单调栈)

  - [去除重复字母](./Algorithm.html#去除重复字母)

- [动态规划](./Algorithm.html#动态规划)

  - [组合总和\_Ⅳ](./Algorithm.html#组合总和_Ⅳ)

- [堆](./Algorithm.html#堆)

  - [第*k*个数](./Algorithm.html#第_k_个数)

## 最长连续序列

- 用例 1:

  输入：nums = [100,4,200,1,3,2]
  输出：4
  解释：最长数字连续序列是 [1, 2, 3, 4]。它的长度为 4。

- 用例 2:

  输入：nums = [0,3,7,2,5,8,4,6,0,1]
  输出：9

### 暴力解法

遍历每一位数 n，循环查找 n+1 数字是否存在，并且维护一个最长的序列值

### 哈希表

降低查找时间，将数字存入哈希表

另外对于这个序列 [0,3,7,2,5,8,4,6,0,1]，在遍历 3 这个数字并计算最长序列后，遍历 2 时会重复计算

因此我们跳过那些每段序列中不是最小的数字，例如当前遍历元素 n，检查是否存在 n-1，存在就跳过

code

- Go

```go
func longestConsecutive(nums []int) int {
    bucket := make(map[int]bool)
    for _,v := range nums{
        bucket[v]=true
    }
    res := 0
    for _,v := range nums{
        if !bucket[v-1] {
            cur := 1
            t := v+1
            for bucket[t] {
                cur++
                t++
            }
            res = max(res,cur)
        }
    }
    return res
}

func max(a,b int)int{
    if a>b{
        return a
    }
    return b
}
```

## 单调栈

### 去除重复字母

给你一个字符串 s ，请你去除字符串中重复的字母，使得每个字母只出现一次。需保证 返回结果的字典序最小（要求不能打乱其他字符的相对位置）

```
示例 1：

输入：s = "bcabc"
输出："abc"

示例 2：

输入：s = "cbacdcbc"
输出："acdb"
```

```cpp
class Solution {
public:
    string removeDuplicateLetters(string s) {
        // 字符是否存在栈中
        int vis[26] = {0};
        // 未遍历的字符数量
        int c[26] = {0};

        for (char ch:s){
            c[ch-'a']++;
        }

        string stack;
        for(char ch:s){
            // 栈里不存在当前字符时
            if(!vis[ch-'a']){
                // 栈顶字符大于当前字符时，需要保持单调栈
                while(!stack.empty() && stack.back() > ch){
                    // 栈顶字符在后面不会在出现时，不能将它出栈
                    if(c[stack.back()-'a']>0){
                        vis[stack.back()-'a']=0;
                        stack.pop_back();
                    }else{
                        // 直接终止，栈顶字符不能出栈，无需继续处理
                        break;
                    }
                }
                // 进栈当前字符，并标识当前字符存在栈中
                vis[ch-'a']=1;
                stack.push_back(ch);
            }
            // 字符数量减1,c 存储的是当前未遍历的字符串中每个字符的数量
            c[ch-'a']--;
        }
        return stack;
    }
};
```

## 动态规划

### 组合总和\_Ⅳ

给你一个由 不同 整数组成的数组 nums ，和一个目标整数 target 。请你从 nums 中找出并返回总和为 target 的元素组合的个数。

```
示例 1：

输入：nums = [1,2,3], target = 4
输出：7
解释：
所有可能的组合为：
(1, 1, 1, 1)
(1, 1, 2)
(1, 2, 1)
(1, 3)
(2, 1, 1)
(2, 2)
(3, 1)
请注意，顺序不同的序列被视作不同的组合。
示例 2：

输入：nums = [9], target = 3
输出：0
```

#### 解法一

从上往下看 [1,2,3] 中，target 为 4 的组合

应该为 dp[4-1] + dp[4-2] + dp[4-3]

target 为 3 的组合, 为 dp[3-1] + dp[3-2] + dp[3-3]

```cpp
class Solution {
public:
    int combinationSum4(vector<int>& nums, int target) {
        int n=nums.size();
        vector<double> dp(target+1,0);
        dp[0]=1;
        sort(nums.begin(),nums.end());

        for(int i=1;i<=target;i++){
            for(int j=0;j<n;j++){
                if(nums[j]>i)break;
                dp[i]+=dp[i-nums[j]];
            }
        }
        return dp[target];
    }
};
```

## 堆

### 第 k 个数

有些数的素因子只有 3，5，7，请设计一个算法找出第 k 个数。注意，不是必须有这些素因子，而是必须不包含其他的素因子。例如，前几个数按顺序应该是 1，3，5，7，9，15，21。

```
示例 1:

输入: k = 5

输出: 9
```

#### 解法一

堆，题目实际是合并有序链表，可以做个小顶堆，取堆中第 k 个数

```cpp
class Solution {
public:
    int getKthMagicNumber(int k) {
        if(k==1)return 1;
        priority_queue<long,vector<long>,greater<long>> q;
        unordered_set<long> s;
        int num[3] = {3,5,7};
        q.push(1);
        s.insert(1);
        long res = 1;
        while(k--){
            int top = q.top();
            res=top;
            q.pop();
            for(int i=0;i<3;i++){
                long n = (long)top*num[i];
                if(!s.count(n)){
                    s.insert(n);
                    q.push(n);
                }
            }
        }

        return res;
    }
};
```

#### 解法二

合并有序链表

```cpp
class Solution {
public:
    int getKthMagicNumber(int k) {
        vector<int> li(k+1,0);
        int i=0;
        int j=0;
        int l=0;
        li[0]=1;

        for(int p=1;p<k;p++){
            li[p] = min(min(li[i]*3,li[j]*5),li[l]*7);
            if(li[p]==li[i]*3)i++;
            if(li[p]==li[j]*5)j++;
            if(li[p]==li[l]*7)l++;
        }
        return li[k-1];
    }
};
```
