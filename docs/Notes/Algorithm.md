- [哈希表](./Algorithm.html#最长连续序列)

  - [最长连续子序列](./Algorithm.html#最长连续序列)

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
