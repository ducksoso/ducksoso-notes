## Gorm tag

**gorm 的哲学在于，对于零值，统一认为没有传，不会插入到数据库**

问题？

1. 默认值的更新总是不对？更新方式问题: map & struct
2. tag 上的 default 标签使用

```go
type User struct {
  ID   int64
  Name string `gorm:"default:galeone"`
  Age  int64  `gorm:"default:18"`
}
```
gorm 支持 default 标签，直接声明字段的默认值。这样在插入到数据库时，默认值就会被用于填充值为 **零值** 的字段。

例如上面的 Name 如果留空，在gorm生成sql时就会被转为 "galeone".

> 反射取 tag 操作，基本操作

 在更新数据时，如果使用了 struct 来更新数据，默认只会更新非零值字段，**如果使用map更新数据，则会更新全部字段，**在使用 struct 更新时，也可以使用 Select 方法来选择想要更新的字段，在这种情况下，零值/非零值字段都会更新.
> 对于声明了默认值的字段，像 0、''、false 等零值是不会保存到数据库。您需要使用指针类型或 Scanner/Valuer 来避免这个问题.












https://juejin.cn/post/7152494010903298062



