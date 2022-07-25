### 基本语法

- 大小写敏感
- 使用缩进表示层级关系
- 缩进不允许使用tab，只允许空格
- 缩进的空格数不重要，只要相同层级的元素左对齐即可
- '#'表示注释



### 数据类型

YAML 支持以下几种数据类型：

- 对象：键值对的集合，又称为映射（mapping）/ 哈希（hashes） / 字典（dictionary）
- 数组：一组按次序排列的值，又称为序列（sequence） / 列表（list）
- 纯量（scalars）：单个的、不可再分的值

### YAML 对象

对象键值对使用冒号结构表示 **key: value**，冒号后面要加一个空格。

也可以使用 **key:{key1: value1, key2: value2, ...}**。

还可以使用缩进表示层级关系；

```yaml
key: 
    child-key: value
    child-key2: value2
```

较为复杂的对象格式，可以使用问号加一个空格代表一个复杂的 key，配合一个冒号加一个空格代表一个 value：

```yaml
? 
    - complexkey1
    - complexkey2
:
    - complexvalue1
    - complexvalue2
```

意思即对象的属性是一个数组 [complexkey1,complexkey2]，对应的值也是一个数组 [complexvalue1,complexvalue2]



### YAML 数组

以 **-** 开头的行表示构成一个数组：



### 纯量

纯量是最基本的，不可再分的值，包括：

- 字符串
- 布尔值
- 整数
- 浮点数
- Null
- 时间
- 日期





### 引用

**&** 锚点和 ***** 别名，可以用来引用:

```yaml
defaults: &defaults
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  <<: *defaults

test:
  database: myapp_test
  <<: *defaults
```



相当于：

```yaml
defaults:
  adapter:  postgres
  host:     localhost

development:
  database: myapp_development
  adapter:  postgres
  host:     localhost

test:
  database: myapp_test
  adapter:  postgres
  host:     localhost
```



**&** 用来建立锚点（defaults），**<<** 表示合并到当前数据，***** 用来引用锚点。

下面是另一个例子:

```yaml
- &showell Steve 
- Clark 
- Brian 
- Oren 
- *showell 
```



转为 JavaScript 代码如下:

`[ 'Steve', 'Clark', 'Brian', 'Oren', 'Steve' ]`



