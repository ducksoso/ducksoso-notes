## Go test

单元测试只适合与本系统内测试，如果跨系统调用则不适合用 go test，应该另寻出路，考虑 go mock

先说命令使用：

```
go test
go test .

// 测试某个代码包下所有test文件中的func，禁止缓存
go test ./test --count=1 -v
// 测试代码包下指定的func正则表达式所匹配的
go test ./test --count=1 -v -run=(TestSprintf/TestSprin)
// 指定运行的func
go test -run TestSprintf -v  or  go test -v -run TestSprintf  or  go test -v -run=TestSprintf  
// 针对测试函数的引用问题 - 将被引用的文件加入其后
go test iota_test.go lib.go
// 控制测试时间 - 指定测试耗时上限
go test -timeout 100ms
// 缩短测试时间 - 添加 -short，需要代码端进行配合
go test -short ./test

    if testing.Short() {
        fmt.Println(num)
    } else {
        fmt.Println(num)
        fmt.Println(num)
    }

// 运行基准测试也要使用go test命令，不过我们要加上-bench=标记，它接受一个表达式作为参数，匹配基准测试的函数，.表示运行所有基准测试。
// 因为默认情况下 go test 会运行单元测试，为了防止单元测试的输出影响我们查看基准测试的结果，可以使用-run=匹配一个从来没有的单元测试方法，
// 过滤掉单元测试的输出，我们这里使用none，因为我们基本上不会创建这个名字的单元测试方法。
go test -bench=. -run=none or (go test -bench . -run none)
go test -bench=BenchmarkSprintf -run=none

// 测试时间默认是1秒，也就是1秒的时间，调用两千万次，每次调用花费117纳秒。如果想让测试运行的时间更长，可以通过-benchtime指定，比如3秒
go test -bench=. -benchtime=3s -run=none /  go test -bench=. -benchtime 3s -run=none
// -benchmem 可以提供每次操作分配内存的次数，以及每次操作分配的字节数
go test -bench=. -benchmem -run=none

```

查看帮助：`go help test/testfunc`

### 如果需要测试多个包，则需要在它们的导入路径之间加入空格以示分隔

go test ./scripts ./test

./scripts ./test 位于当前目录下

### 如果单元测试文件之间有相互引用，那么在运行一个单元测试文件的时候会有 undefined 错误

原因：go test 其实也牵扯到 go build，对指定源码文件进行编译和运行的命令程序一样。

为源码文件编译的时候，会生成一个虚拟代码包 -- `command-line-arguments`，它引用其他包

中的数据并不属于代码包 -- `command-line-arguments`，自然编译不通过

**解决办法：**

执行命令时加入这个测试文件需要引用的源码文件，在命令行后方的文件都会被加载到command-line-arguments中进行编译。

`go test -v iota_test.go lib.go other.go`

### go test 禁用测试缓存

Go 官方文档详细说明了 test 包的工作原理：在执行 go test 时会编译每个包和所有后缀匹配 *_test.go 命名的文件（这些测试文件包括一些单元测试和基准测试），

链接和执行生成的二进制程序, 然后打印每一个测试函数的输出日志。

每当执行 go test 时，如果功能代码和测试代码没有变动，则在下一次执行时，会直接读取缓存中的测试结果，并通过 (cached) 进行标记。

**Go test 支持两种模式：**

1. Local directory mode, 在调用 go test 时，没有加参数 (比如 go test 或 go test -v)。在这种模式下，缓存会被禁用。 会编译当前目录下的代码和测试，然后运行测试二进制程序。

2. Package list mode，执行 go test时，指定文件路径 (比如 go test math, go test ./...)。在这种模式下，会编译并测试路径列出的每个测试文件。

go test 会缓存成功的测试结果，以避免不必要的重复运行测试。当再次执行测试时，会检查缓存中对应的测试结果是否 OK, 如果 OK 会重新显示之前的输出，而不会运行测试二进制文件。此时 go test 会打印 '(cached)' 标识。


**解决方案**

有以下三种方式， 在测试中禁用缓存：

1. 执行 go test添加 --count=1 参数（推荐，效率高），以上面 例子：

`CGO_ENABLED=1 go test -v --count=1 --mod=vendor ./pkg/...`

2. Go 官方提供 clean工具，来删除对象文件和缓存文件， 不过这种方式相对麻烦：

`go clean -testcache // Delete all cached test results`

3. 设置 GOCACHE 环境变量。GOCACHE 指定了 go 命令执行时缓存的路径，以便之后被复用。 设置 GOCACHE=off 即可禁用缓存。



## Go mock

