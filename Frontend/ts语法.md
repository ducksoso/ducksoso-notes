[TOC]

# TypeScript是什么？

* 以JavaScript为基础构建的语言
* 一个JavaScript的超集
* 可以在任何支持JavaScript的平台中执行
* TypeScript扩展了JavaScript并添加了类型
* TS不能被JS解析器直接执行，必须要通过 tsc 编译成 JS代码才能被浏览器识别



增加了：类型、支持ES的新特性、添加ES不具备的新特性、丰富的配置选项



### ?: 可选参数、可选属性



## 基本类型

### 1 类型声明

语法：

```typescript
let 变量: 类型;
let 变量: 类型 = 值;
function fn(参数: 类型, 参数: 类型): 类型 {
  ...
}
```



### 2 类型推断

**如果一个变量的声明和赋值是同时进行的**，TS可以自动对变量进行类型检测

```typescript
let c = false;
c = true;
c = "hello";
```



### 3 联合类型 `|`

联合类型（Unio Types）表示取值可以为多种类型中的一种

```typescript
let myFavoriteNumber: string | number;
myFavoriteNumber = 'seven';
myFavoriteNumber = 7;
```

_**联合类型使用 `|`分隔每个类型**_。

这里的`let myFavoriteNumber: string | number;`的含义是，允许`myFavoriteNumber`的类型是`string`或者`number`，但是不能是其他类型。

**访问联合类型的属性和方法**

当typescript不确定一个联合类型的变量到底是哪个类型的时候，我们**只能访问此联合类型的所有类型里共有的属性和方法**。



### 4 any 和 unknown 类型

any 表示的是任意类型，一个变量设置类型为 any 后相当于对该变量关闭了 TS 的类型检测

声明变量如果不指定类型，则TS解析器会自动判断变量的类型为any（隐式的any）

```typescript
let d;
let d: any;

// unkown 表示未知类型的值
let e: unknown;
e = 10;
e = "hello";
e = true;
```

any 与 unknown 区别，

```typescript
let s: string;

// d 的类型是 any，它可以赋值给任何变量。会导致那个变量的类型发生改变。
s = d;
e = "hello";
s = e; // 会报错
```

unknown 实际上就是一个类型安全的any，unknown类型的变量，不能直接赋值给其他变量

```typescript
if(typeof e === "string") {
	s = e;
}
```



### 5 类型断言

告诉解析器变量的实际类型:

语法：

​	变量 as 类型;

​	<类型>变量

````typescript
s = e as string;
s = <string>e;
````

告诉 e 类型就是string

### 6 void 、never

void用来表示空，以函数为例，没有返回值的函数

```typescript
function fn(): string | number {
  return
}

function fn(): void {
  return undefined | null;
}
```

void 表示空值（undefined | null）



never 表示永远不会返回结果

```typescript
function fn(): never {
  throw new Error('报错了！');
}
```



### 7 字面量 其本身

限制变量的值就是该字面量的值

## 对象、函数、数组、元组、枚举、类型别名的类型限制

定义对象变量的结构 + 定义函数的结构

```typescript
记住是一个对象变量
// {} 用来指定对象中可以包含的属性
// 语法： {属性名：属性值， 属性名：属性值}
// 在属性名后面加上 ?，表示属性是可选的
let b: {name: string, age?: number};
b = {name: "hhh", age: 18};

// [propName: string]: any 表示任何类型的属性
let c: {name: string, [propsName: string]: any};
c = {name: "eee", age: 10, gender: "man"};


// 设置函数结构的类型声明，定义函数的类型
// 语法：(形参:类型, 形参:类型 ...) => 返回值
let d: Function
let d: (a: number, b: number) => number;

d = function (n1, n2): number {
  return 10;
}
// 希望 d 是一个函数，对函数的一些限制

```



数组的类型限定，类型声明两种方式

* 类型[]
*  Array<类型>

```typescript
let e: string[];
e = ['a','b','c'];

let f: number[];

let g: Array<number>;
g = [1,2,3]

let h: Array<any>;
```



**tuple 元组**：固定长度的数组，存储效率好一点

* 语法：[类型， 类型，类型]

```typescript
let h: [string, string]; // 数组长度为2
h = ['hello', 'abc'];

```



**enum枚举**：固定可选值的范围



```typescript
enum Gender{
  Male,
  Female
}

```



**& 表示同时**

```typescript
let j: {name: string} & {age: number};
j = {name: 'hhh', age: 18};

```



**类型别名**

```typescript
type myType = string; // 给string取别名

let m: myType;

type myType = 1 | 2 | 3 | 4 | 5
let k: myType;

k = 5;
k = 6; // 会报错
```









## TS编译选项

使项目能够自动编译



tsconfig.json 文件，是ts编译器的配置文件





*nodemon*将监视启动目录中的文件





## 面向对象

### 1 类

创建对象，必须要先定义类，所以类可以理解为对象的模型。

* **定义类**

  ```typescript
  class 类名 {
    属性名: 类型;
    ...
    
    constructor(参数: 类型){
      this.属性名 = 参数;
      ...
    }
      
    方法名() {
      ...
    }
  }
  ```

  例子：

  ```typescript
  class Person {
    /*
    * 		直接定义的属性是实例属性，需要通过对象的实例去访问：
    *						const per = new Person();
    *						per.name;
    * 		
    * 		使用static开头的属性是静态属性（类属性），可以直接通过类去访问
    * 				Person.age
    *
    * 		readonly 开头的属性表示一个只读的属性，无法修改
    **/
    
    // 定义实例属性
    name: string = '孙悟空';
    
    readonly name_alias: string = '悟空';
    
    // 在属性前使用static关键字可以定义类属性（静态属性）
    static readonly age: number = 18;
    
    // 定义方法
    /*
    *		如果方法以static开头则方法就是类方法，可以直接通过类去调用
    *		否则需要通过实例去调用
    **/
    sayHello() {
      console.log('hello everyone!')
    }
    
    static sayWorld() {
      console.log('hello world!')
    }
    
  }
  
  
  const per = new Person() ;
  
  console.log(per.name);
  
  ```

  

  

* **构造函数**

  

  ```typescript
  class Dog {
    name: string;
    age: number;
    
    // constructor 被称为构造函数
    // 构造函数会在对象创建时调用，Java 的构造函数名为类名
    constrcutor(name: string, age: number) {
      // 在实例方法中，this就表示当前对象的实例
      // 在构造函数中当前对象就是当前新建的那个对象
      // 可以通过this向新建的对象中添加属性
      this.name = name;
      this.age = age;
    }
    
    bark() {
      console.log(this);
    }
    
  }
  ```

  

* **继承** extends

  函数自定义，闭包，自定义域

  ```typescript
  (function () {
    class Animal{
      
    }
    
    // 子类拥有父类的方法和属性
    // 使Dog类 和 Cat类 继承Animal类
    class Dog extends Animal{
      
    }
    class Cat extends Animal{
      
    }
    
  })()
  ```

  

* **super**

  在子类构造函数中必须要**手动调用一次父类的构造函数**，否则会失败

  ```typescript
  (function () {
    class Animal{
      name: string;
      
      constructor(name: string) {
        this.name = name;
      }
      
      sayHello() {
        console.log('动物在叫~');
      }
    }
    
    // 子类拥有父类的方法和属性
    // 使Dog类 和 Cat类 继承Animal类
    class Dog extends Animal{
      age: number;
      constructor(name: string, age: number) {
        super(name); // 调用父类的构造函数，确保继承的正常
        // 如果在子类中写了构造函数（同名构造函数会覆盖重写），此时父类的构造函数不会自动调用
        // 所以在子类构造函数必须对父类构造函数进行调用
        this.age = age;
      }
      
      sayHello() {
        // 在类的方法中super就表示当前类的父类
        super.sayHello();
        
      }
    }
    
    const dog = new Dog('旺财'，13);
    dog.sayHello();
  })()
  
  ```

  

* 抽象类

  

  ```typescript
  (function () {
    // 以abstract开头的类是抽象类，
    // 抽象类和其他类区别不大，只是不能用来创建对象
    // 抽象类就是专门用来被继承的类
    // 抽象类可以添加抽象方法
    abstract class Animal{
      name: string;
      
      constructor(name: string) {
        this.name = name;
      }
      
      // 定义一个抽象方法
      // 抽象方法使用 abstract 开头，没有方法体
      // 抽象方法只能定义在抽象类中，子类必须对抽象方法进行重写
      abstract sayHello(): void;
    }
    
    // 子类拥有父类的方法和属性
    // 使Dog类 和 Cat类 继承Animal类
    class Dog extends Animal{
      age: number;
      constructor(name: string, age: number) {
        super(name); // 调用父类的构造函数，确保继承的正常
        // 如果在子类中写了构造函数（同名构造函数会覆盖重写），此时父类的构造函数不会自动调用
        // 所以在子类构造函数必须对父类构造函数进行调用
        this.age = age;
      }
      
      sayHello() {
        console.log('Dog ...')
      }
    }
    
    const dog = new Dog('旺财'，13);
    dog.sayHello();
  })()
  ```

  

  抽象类就是专门用来被其他类所继承的，以及可以添加抽象方法

  **天生就是当爸爸的**

* 接口

  

  ```typescript
  
  // 描述一个对象的类型
  type myType = {
    name: string,
    age: number
  };
  
  const obj: myType = {
    name: 'sss',
    age: 111
  };
  
  /**
  * 	接口用来定义一个类结构，用来定义一个类中应该包含哪些属性和方法
  *			同时接口也可以当成类型声明去使用，与普通类型声明一样
  *			接口可以重复声明
  **/
  interface myInterface{
    name: string;
    age: number;
  }
  
  interface myInterface{
    gender: string;
  }
  
  const obj1: myInterface = {
    name: 'sss',
    age: 111,
    gender: '男'
  };
  
  // 接口可以在定义类的时候去限定类的结构
  // 	接口中的所有属性都不能有实际的值
  // 	接口只定义对象的结构，而不考虑实际值
  // 		在接口中所有的方法都是抽象方法
  interface myInter{
    name: string;
    sayHello():void;
  }
  
  class MyClass implements myInter{
    name: string;
    
    constructor(name: string) {
      this.name = name;
    }
    sayHello(): void {
      console.log('hello ~');
    }
    
  }
  
  ```

  抽象类可以有抽象方法、实质方法，真实属性，但是接口中没有

  

* **属性的封装**

  属性的: public 、private、protected；默认时 public 如果不写的话

  private 的属性通过 setXXX 方法类改变

  

* **泛型**

  ```typescript
  // 不用any，免去类型检查
  // 在定义函数或是类时，如果遇到类型不明就可以使用泛型
  function fn<T>(a: T): T {
  	return a;
  }
  
  // 可以直接调用具有泛型的函数
  fn(10); // 不指定泛型，TS可以自动对类型进行推断
  
  // 指定泛型
  fn<string>('hello');
  
  // 泛型可以同时指定多个
  function fn2<T,K>(a: T, b: K): T{
    console.log(b);
    return a;
  }
  fn2<number, string>(123,'hello');
  
  
  interface Inter{
    length: number;
  }
  // T extends Inter 表示泛型 T 必须是 Inter 实现类（子类）
  function fn3<T extends Inter>(a: T): number{
    return a.length;
  }
  
  fn3({length: 10});
  // 表示用的泛型是一个实现Inter的实例对象
  
  // 类中使用泛型
  class MyClass<T>{
    name: T;
    constructor(name: T) {
      this.name = name;
    }
  }
  const mc = new MyClass<string>('孙悟空');
  
  ```

  



### 接口类型

使用接口（Interfaces）来定义对象的类型

### 1 可选属性

```typescript
interface IPerson {
  name: string;
  age?: number;
}
let tom: IPerson = {
  name: 'Tom'
};
```



### 2 任意属性

```typescript
interface IPerson {
  name: string;
  age?: number;
  [propName: string]: any;
}
let tom: IPerson = {
  name: 'Tom'
};
```

`[propName: string]` 定义类任意属性取`string`类型的值

需要注意的是，**一旦定义了任意属性，那么确定属性和可选属性的类型都必须是它的类型的子集**：

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};

// index.ts(3,5): error TS2411: Property 'age' of type 'number' is not assignable to string index type 'string'.
// index.ts(7,5): error TS2322: Type '{ [x: string]: string | number; name: string; age: number; gender: string; }' is not assignable to type 'Person'.
//   Index signatures are incompatible.
//     Type 'string | number' is not assignable to type 'string'.
//       Type 'number' is not assignable to type 'string'.
```

上例中，任意属性的值允许是 `string`，但是可选属性 `age` 的值却是 `number`，`number` 不是 `string` 的子属性，所以报错了。

另外，在报错信息中可以看出，此时 `{ name: 'Tom', age: 25, gender: 'male' }` 的类型被推断成了 `{ [x: string]: string | number; name: string; age: number; gender: string; }`，这是联合类型和接口的结合。

一个接口中只能定义一个任意属性。如果接口中有多个类型的属性，则可以在任意属性中使用联合类型：

```typescript
interface Person {
    name: string;
    age?: number;
    [propName: string]: string | number;
}

let tom: Person = {
    name: 'Tom',
    age: 25,
    gender: 'male'
};
```



### 3 只读属性

有时候希望对象中的一些字段只能在创建的时候被赋值，那么可以使用`readonly`定义只读属性：

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    id: 89757,
    name: 'Tom',
    gender: 'male'
};

tom.id = 9527;

// index.ts(14,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，使用 `readonly` 定义的属性 `id` 初始化后，又被赋值了，所以报错了。

**注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候**

```typescript
interface Person {
    readonly id: number;
    name: string;
    age?: number;
    [propName: string]: any;
}

let tom: Person = {
    name: 'Tom',
    gender: 'male'
};

tom.id = 89757;

// index.ts(8,5): error TS2322: Type '{ name: string; gender: string; }' is not assignable to type 'Person'.
//   Property 'id' is missing in type '{ name: string; gender: string; }'.
// index.ts(13,5): error TS2540: Cannot assign to 'id' because it is a constant or a read-only property.
```

上例中，报错信息有两处，第一处是在对 `tom` 进行赋值的时候，没有给 `id` 赋值。

第二处是在给 `tom.id` 赋值的时候，由于它是只读属性，所以报错了。



https://www.typescriptlang.org/docs/handbook/interfaces.html



参考：https://ts.xcatliu.com/basics/type-of-object-interfaces.html



Mixins: https://www.tslang.cn/docs/handbook/mixins.html





































