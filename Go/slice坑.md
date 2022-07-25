

```go
type slice struct {
  array unsafe.Pointer
  len 	int
  cap 	int
}
```

#### 场景1：在函数中修改`slice`的成员的值

原先的`slice`是可以感知到的



#### 场景2：在函数中向`slice`添加成员

原本想通过函数返回的`slice`，对原先的`slice`进行扩展

```go
func TestProtoReflect(t *testing.T) {
	filename1 := "../dist/service/proto/rank.proto"
	filename2 := "../dist/service/proto/subtask.proto"
	parser := protoparse.Parser{}

	fileDescriptors, err := parser.ParseFiles(filename1, filename2)
	if err != nil {
		panic(err)
	}

	file1 := fileDescriptors[0]
	file2 := fileDescriptors[1]

	methods := file1.GetServices()[0].GetMethods()
	// 想改变file1下service[0].methods 的，但是实际上没法改变
  // 因为违背了，slice的规则，无法感知 len 的改变
	methods = append(methods, file2.GetServices()[0].GetMethods()...)

	printer := protoprint.Printer{}
	var buf bytes.Buffer
	_ = printer.PrintProtoFile(file1, &buf)

	fmt.Println(buf.String())

	_ = ioutil.WriteFile("proto_test.proto", buf.Bytes(), 0666)
}
```



当slice作为函数参数传递时，实际上是将原来的`slice`做了一个拷贝，函数中新的`slice`变量拿到的其实是一个指针类型和两个`int`类型的值。

当我们在函数中修改`slice`时，如果修改的是指针，原`slice`的`array`同样指向这个地址，就可以感知到这个修改，但如果修改的是`int`变量，原`slice`就无法感知到。

而`append`操作，就是一种改变`len`和`cap`的操作。



#### 场景3：在函数中向slice添加成员，并且超过了原来的cap容量

会重新开辟一块新的地址，将原先的变量都拷贝过去。这时候，原先的`slice`就彻底无法感知到了。

