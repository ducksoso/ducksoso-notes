



#### pprof 使用

使用 pprof 需要在代码里引入如下的包

`import _ "net/http/pprof"`

如果没有跑http server，比如说跑了一个进程，那么需要另起一个 goroutines 跑一下 http server

```
go func() {
    log.Println(http.ListenAndServe("localhost:6060", nil))
}()
```

##### 使用交互式命令

1. 查看堆栈调用信息

   `go tool pprof http://localhost:6060/debug/pprof/heap`

2. 查看 30 秒内的 CPU 信息

   `go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30`

3. 查看 goroutine 阻塞

   `go tool pprof http://localhost:6060/debug/pprof/block`

4. 收集 5 秒内的执行路径

   `go tool pprof http://localhost:6060/debug/pprof/trace?seconds=5`

5. 争用互斥持有者的堆栈跟踪

   `go tool pprof http://localhost:6060/debug/pprof/mutex`

#### UI web 界面

相比较于交互式命令行，这个UI分析工具就比较强大了，包括各种流程图式的分析，还有火焰图。但是会麻烦一点，首先我们得导出文件，下面例子是查看堆栈调用信息，其他相关信息需要调相关接口。

`curl -sK -v http://localhost:6060/debug/pprof/heap > heap.out`

然后用 go tool 工具 使用该导出文件起一个服务，会自动跳到 UI 界面。这个需要服务器安装 graphviz

`go tool pprof -http=:8080 heap.out`

##### UI VIEW

UI VIEW 提供多种查看模式，我们可以从下图看到共有 6 种模式。这里主要需要两个参数的意义（
 `flat` 表示堆栈中当前层函数的内存，`cum` 表示堆栈中直到当前函数所累积的内存）

1. Top：类似于 linux top 那种形式。从高到底排序
2. Graph：默认弹出来的就是该模式，也就是上一个图的那种带有调用关系的图。
3. Flame Graph：pprof 火焰图。
4. Peek：类似于 Top 也是从高到底的排序。
5. Source：和交互命令式的那种一样，带有源码标注。
6. Disassemble：显示所有的总量。

##### UI SAMPLE

UI SAMPLE 为 VIEW 提供 4 种查询模式。

1. alloc_objects：已分配的对象总量（不管是否已释放）
2. alloc_space：已分配的内存总量（不管是否已释放）
3. inuse_objects： 已分配但尚未释放的对象数量
4. inuse_sapce：已分配但尚未释放的内存数量

##### UI REFINE

UI REFINE 主要是依据右边的 Search regexp 输入框对 SAMPLE 做一些结果筛选分析，从名字我们可以看到是支持正则的。

