- [sort](./Algorithm.html#sort)
  - [默认升序](./Algorithm.html#默认升序)
  - [指定排序](./Algorithm.html#指定排序)
  - [自定义排序](./Algorithm.html#自定义排序)

## sort

排序函数

### 默认升序

```cpp
vector<int> arr;
sort<arr.begin(),arr.end()>;

int arr1[5] = {5,4,3,2,1};
sort(arr1,arr1+5); // {1,2,3,4,5}
```

### 指定排序

```cpp
vector<int> arr;
// 降序
sort(arr.begin(),arr.end(),greater<int>());

// 升序
sort(arr.begin(),arr.end(),less<int>());
```

### 自定义排序

```cpp
vector<vector<int>> arr(10,vector<int>(2));
bool compare(vector<int> a,vector<int> b){
  return a[0] > b[0];
}
sort(arr.begin(),arr.end(),compare);
```

lambda 表达式

```cpp
int arr[5] = {2,3,1,5,4};
sort(arr,arr+5,[](int a, int b) {return a > b;}));

vector<int> arr1;
sort(arr1.begin(), arr1.end(),[](const int &a, const int &b) -> bool { return a > b; });
```
