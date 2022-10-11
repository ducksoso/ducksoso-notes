golang空结构体有什么作用？

golang空结构体 struct{} 可以用来节省内存

```go
a := struct{}{}
println(unsafe.Sizeof(a))
// Output: 0
```

* 如果使用的是map且map又很长，通常会节省不少资源
* 空struct{}只是一个占位符，不占用任何资源



