# GRPC 序列化



序列化的时候，遇到一些 `grpc`默认值类型时候，不进行赋值

`Json` 也是一样的，`omitempty`

Node 调用 grpc 服务的时候，是需要传入相应的 proto 文件的

### 一、go json的omitempty标签导致protocbuf忽略默认值属性的问题

**序列化**的时候遇到`omitempty`的时候就会省略这些字段。

####  1. json序列化会丢失默认值字段

Go的json有一个`omitempty`标签，意思是如果字段为空值，定义为false、0、零指针、nil接口值以及任何空数组、切片、映射或字符串,则该字段在json序列化时省略。

```go
package main

import (
    "encoding/json"
    "log"
)

type Asdqwe struct {
    A int32    `json:"a,omitempty"`
    B bool     `json:"b,omitempty"`
    C [0]int32 `json:"c,omitempty"`
    D []int32  `json:"d,omitempty"`
}

func main() {
    testStruct := Asdqwe{A: 1}
    log.Printf("%v\n", testStruct)
    res, err := json.Marshal(testStruct)
    if err != nil {
        log.Fatal(err)
    }
    log.Println(string(res))
    testStruct2 := Asdqwe{}
    err = json.Unmarshal(res, &testStruct2)
    log.Printf("%v", testStruct2)
}
```

输出：

```go
2021/04/16 10:10:18 {1 false [] []}
2021/04/16 10:10:18 {"a":1}
2021/04/16 10:10:18 {1 false [] []}
```

可以看到，`json`序列化之后，除了赋值的A，其他B、C、D都没有了。但是，使用`json`反序列化后，重新赋予了默认值。所以这里问题不大。



#### 2. grpc使用Protobuf时关于json这个特性的处理

gRPC使用Protobuf，在自动生成的代码中，可以看到所有字段都加上了`omitempty`标签。Protobuf 2版本还可以使用required关键字，但是Protobuf 3取消了这个关键字，而我们使用gRPC基本都是使用Protobuf 3。

#### Todo 

做一个实验，在 grpc client. 调用 grpc server 的时候，传入一个字段的默认值，会不会在 服务端 对这个字段进行忽略。

<font color=red>实验结果</font>：**grpc server 端在解析conn连接的时候，会将默认值的字段在生成 proto.Message 的时候进行忽略。**



这个过程是由 `grpc server`端完成的。在使用 printf 打印的时候，是无法打印出这个字段的，但是断点测试的时候是可以看到这个值为默认值的。

![image-20210416151336916](/Users/zhijing.zhang/Desktop/notes/grpc/grpc语法.assets/image-20210416151336916.png)

**GO 的结构体打印的时候，只会打印已经存在的字段，对于不存在的字段其是不会进行打印的。**

所以在传到 grpc server 的时候，req 里就缺失了这个字段。也就是在protobuf 将默认值当成了不存在。



Proto 3 在传入的时候，不可以设置默认值。解决办法：http://kaelzhang81.github.io/2017/05/15/proto3%E9%BB%98%E8%AE%A4%E5%80%BC%E4%B8%8E%E5%8F%AF%E9%80%89%E9%A1%B9/

`github.com/golang/protobuf/ptypes/wrappers/wrappers.proto`



**小结：**所以我们在使用的时候，对于默认值可以不传。因为传了跟不传没有区别。



链接：https://www.jianshu.com/p/ffff11015ccf















