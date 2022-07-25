



## Go test 的测试用例形式


测试用例四种形式：

* `TestXxxx(t *testing.T) `   //基本测试用例
* `BenchmarkXxxx(b *testing.B)`  //压力测试的用例
* `Example_Xxx()` //测试控制台输出的例子
* `TestMain(m *testing.M)` // 测试Main函数



 

go test 不是本地目录是会缓存的





Vscode goland 代码覆盖率插件（coverage of ）