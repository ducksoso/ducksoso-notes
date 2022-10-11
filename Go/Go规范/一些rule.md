

>  这里是日常开发遇到的一些golang写法


* [结构体](#结构体)



### 结构体

#### 初始化匿名结构体

匿名结构体没有类型名称，无需通过type关键字定义就可以直接使用

```go
inst := struct {
	// 匿名结构体字段定义
	key1 keyType1
	key2 keyType2
	...
} {
	初始化字段1: 字段1的值,
	初始化字段2: 字段2的值,
	...
}
```

#### 定义结构体另一种写法

```go
type (
	InstanceTypeData struct {
		Data []*InstanceType `json:"data"`
	}
	InstanceType struct {
		Key           string `json:"key"`
		Value         string `json:"value"`
		SpotAvailable bool   `json:"spotAvailable"`
	}
)
```

