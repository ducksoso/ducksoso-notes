



## 排序常用方法：sort

语法：

> arr.sort([compareFunction])：返回一个新的数组

> 如果 compareFunction(a, b) 小于 0 ，那么 a 会被排列到 b 之前；
> 如果 compareFunction(a, b) 等于 0 ， a 和 b 的相对位置不变。备注： ECMAScript 标准并不保证这一行为，而且也不是所有浏览器都会遵守（例如 Mozilla 在 2003 年之前的版本）；
> 如果 compareFunction(a, b) 大于 0 ， b 会被排列到 a 之前。
> compareFunction(a, b) 必须总是对相同的输入返回相同的比较结果，否则排序的结果将是不确定的。



用法：

```js
arr.sort(function(a,b){return a - b})
```



字符串排序：

> ```
> arr.sort(function(a,b){return a.localeCompare(b)})来进行排序
> ```
>
> 但中文排序时发现不是我们想要的 可以通过加参数的方法 a.localeCompare(b,'zh-CN')



与 go 的排序算法类似，需要定义一个 func 用于比较两个字段的顺序

```go
sort.Strings(arr);
```

