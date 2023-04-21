











## 数组

数组定义：

```
数组名=(值1 值2 ... 值n)

array_name=(value0 value1 value2 value3)

array_name=(
	value0
  value1
  value2
  value3
)
```

Shell 数组用括号来表示，元素用"空格"符号分割开，初始化时不需要定义数组大小

1. 只支持一维数组（不支持多维数组）





## 3. 运算符



```bash
#!/usr/bin/env bash

if [[ -t 1 ]]; then # is terminal?
	command
fi

标准输入 - 0；标准输出 - 1；标准错误输出 - 2；

因为Linux里都是文件，Linux哲学所在，一切皆文件；
-t 表示文件描述符（File Descriptor） 1 表示标准输出

我们的terminal同时满足标准输入 & 标准输出 & 标准错误输出，终端接受输入并将所产生的输出发送回到我们的终端

```



希望将 stdout 和 stderr 合并后重定向到 file

```bash

command > file 2>&1
command >> file 2>&1

```

#### /dev/null 文件

希望执行某个命令，但又不希望在屏幕上显示输出结果，那么可以将输出重定向到 /dev/null

```bash
command > /dev/null

/dev/null 是一个特殊的文件，写入到它的内容都会被丢弃；如果尝试从该文件读取内容，那么什么也读不到。但是 /dev/null 文件非常有用，将命令的输出重定向到它，会起到"禁止输出"的效果，说白了就是不显示任何信息

// 屏蔽 stdout & stderr, 这里的 2 和 > 之间不可以有空格，2> 是一体的时候才表示错误输出
command > /dev/null 2>&1

// 下面👇两个相等
command > /dev/null
command 1 > /dev/null
```

& 表示等同于的意思，2>&1，表示2的输出重定向等同于1

```bash
command < filename                         把标准输入重定向到filename文件中
command 0< filename                       把标准输入重定向到filename文件中

command > filename                         把标准输出重定向到filename文件中(覆盖)
command 1> fielname                       把标准输出重定向到filename文件中(覆盖)

command >> filename                       把标准输出重定向到filename文件中(追加)
command 1>> filename                     把标准输出重定向到filename文件中(追加)

command 2> filename                       把标准错误重定向到filename文件中(覆盖)
command 2>> filename                     把标准输出重定向到filename文件中(追加)

command > filename 2>&1               把标准输出和标准错误一起重定向到filename文件中(覆盖)
command >> filename 2>&1             把标准输出和标准错误一起重定向到filename文件中(追加)

command < filename >filename2      把标准输入重定向到filename文件中，把标准输出重定向到filename2文件中

command 0< filename 1> filename2   把标准输入重定向到filename文件中，把标准输出重定向到filename2文件中

```

**重定向的使用有如下规律：**

1）标准输入0、输出1、错误2需要分别重定向，一个重定向只能改变它们中的一个。
2）标准输入0和标准输出1可以省略。（当其出现重定向符号左侧时）
3）文件描述符在重定向符号左侧时直接写即可，在右侧时前面加&。
4）文件描述符与重定向符号之间不能有空格！












## 函数

定义：

```shell
[ function ] funname [()] {
	action;
	[return int;]
}
```

* 可以带function funname() 定义，也可以直接funname() 定义,不带任何参数

  * function print_usage() {}
  * funtction print_usage {}
  * print_usage() {}

* 参数返回，可以显示加：return 返回，如果不加，将以最后一条命令运行结果，作为返回值。 return后跟数值n(0-255)

* 函数返回值在调用该函数后通过 $? 来获得

  ```sh
  funWithReturn(){
      echo "这个函数会对输入的两个数字进行相加运算..."
      echo "输入第一个数字: "
      read aNum
      echo "输入第二个数字: "
      read anotherNum
      echo "两个数字分别为 $aNum 和 $anotherNum !"
      return $(($aNum+$anotherNum))
  }
  funWithReturn
  echo "输入的两个数字之和为 $? !"
  ```

  但是，如果中间还执行其他command，**$?** 就拿不到结果了，必须紧跟着func调用；

  **$?** 仅对其上一条指令负责，一旦函数返回后其返回值没有立即保存入参数，那么其返回值将不再能通过 **$?** 获得。

* 函数参数

  在Shell中，调用函数时可以向其传递参数。在函数体内部，通过 $n 的形式来获取参数的值，例如，$1表示第一个参数，$2表示第二个参数...

  这个跟我们执行 shell 脚本类似，`.release-chart.sh 1 2 3`

  





## 流程判断

**[ ... ] vs (( ... )) 区别**

* if else 的 **[...]** 判断语句中大于使用 **-gt**，小于使用 **-lt**。
* 如果使用 **((...))** 作为判断语句，大于和小于可以直接使用 **>** 和 **<**。











https://blog.csdn.net/K346K346/article/details/51819236









