### typescript 返回值是 promise

如何定义 Promise 的返回值类型：

```tsx

const ma = new Promise((resolve, reject) => {
  resolve(1);
});

public async createOrgRole(ctx: Context, dto: RoleCreateDto): Promise<string> {
    return '';
}
```



方法一：

通过 Promise 的构造函数，声明返回值的泛型类型

```tsx
const ma = new Promise<number>((resolve, reject) => {
	resolve(1);
});
```



方法二：

修改 resolve 的类型定义

```tsx
const ma = new Promise((reslover: (value: number) => void, reject) => {
	resolve(1);
});

```



#### 原理

```tsx
    /**
     * Creates a new Promise.
     * @param executor A callback used to initialize the promise. This callback is passed two arguments:
     * a resolve callback used resolve the promise with a value or the result of another promise,
     * and a reject callback used to reject the promise with a provided reason or error.
     */
    new <T>(executor: (resolve: (value?: T | PromiseLike<T>) => void, reject: (reason?: any) => void) => void): Promise<T>;
```





`Promise`的类型定义如上，我们可以看到 Promise 返回值的类型定义，可以由两部分决定。第一个是构造时的泛

型值，第二个是 `reslove`函数 `value`值得类型。











