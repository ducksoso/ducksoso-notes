# 理解 $0 和 BASH_SOURCE



**一个 shell (bash) 脚本有两种执行方式：**

* 直接执行，类似于执行二进制程序
* source 加载，类似于加载库文件

<font color=red>$0</font> 保存了被执行脚本的程序名称。注意，它保存的是以二进制方式执行的脚本名而非以 source 方式加载的脚本名称。

例如，执行 `a.sh` 时，a.sh 中的 <font color=red>$0</font> 的值是 `a.sh`，如果 `a.sh` 执行 `b.sh`，``b.sh` 中的 <font color=red>$0</font> 的值是 `b.sh`，如果 `a.sh` 中 `source b.sh`，则 `b.sh` 中的<font color=red>$0</font> 的值为 `a.sh`。




除了 <font color=red>$0</font>，`bash` 还提供了一个数组变量 <font color=red>BASH_SOURCE</font>，该数组保存了 `bash` 的 <font color=SkyBlue>SOURCE</font> 调用层次。这个层次是怎么体现的，参考下面的示例。



执行 shell 脚本 `a.sh` 时，shell 脚本的程序名 `a.sh` 将被添加到 <font color=red>BASH_SOURCE</font> 数组的第一个元素中，即 <font color=red>${BASH_SOURCE[0]}</font> 的值为 `a.sh`，这时 <font color=red>${BASH_SOURCE[0]}</font> 等价于 <font color=red>$0</font>。



当在 `a.sh` 中执行 `b.sh` 时：

```sh
# a.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "a.sh"

# b.sh中的$0和BASH_SOURCE
$0 --> "b.sh"
${BASH_SOURCE[0]} -> "b.sh"
```



当在 `a.sh` 中 `source b.sh` 时：

```sh
# a.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "a.sh"

# b.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "b.sh"
${BASH_SOURCE[1]} -> "a.sh"
```



当在 `a.sh` 中 `source b.sh` 时，如果 `b.sh` 中还执行了 `source c.sh`，那么：

```sh
# a.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "a.sh"

# b.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "b.sh"
${BASH_SOURCE[1]} -> "a.sh"

# c.sh中的$0和BASH_SOURCE
$0 --> "a.sh"
${BASH_SOURCE[0]} -> "c.sh"
${BASH_SOURCE[1]} -> "b.sh"
${BASH_SOURCE[2]} -> "a.sh"
```



使用脚本来验证一下 <font color=red>BASH_SOURCE</font> 和 <font color=red>$0</font>。在 `x.sh` 中 `source y.sh`，在 `y.sh` 中 `source z.sh`：

```sh
#~ /tmp/x.sh
cat >/tmp/x.sh<<'eof'
source y.sh
echo "x.sh: ${BASH_SOURCE[@]}"
eof

#~ /tmp/y.sh
cat >/tmp/y.sh<<'eof'
source z.sh
echo "y.sh: ${BASH_SOURCE[@]}"
eof

#~ /tmp/z.sh
cat >/tmp/z.sh<<'eof'
echo "z.sh: ${BASH_SOURCE[@]}"
eof
```



执行 `x.sh` 输出结果：

```sh
$ bash /tmp/x.sh
z.sh: z.sh y.sh /tmp/x.sh
y.sh: y.sh /tmp/x.sh
x.sh: /tmp/x.sh
```



### 小结：

* 无论是直接执行还是 source 引用方式，使用 <font color=red>${BASH_SOURCE[0]}</font>获取的都是本文件名称。
* 不 source 的话，使用<font color=red>$0</font>或者<font color=red>${BASH_SOURCE[0]}</font>都一样。
* 若在 source 的时候，要想获取最外层的文件名可以使用<font color=red>$0</font>。





