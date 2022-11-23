

nestjs star数很高





Nestjs 模仿 Springboot 

### 依赖注入方式

1. 构造器注入：依赖关系通过 class 构造器提供
2. Setter 注入：用 setter 方法注入依赖项
3. 接口注入：依赖项提供了一个注入方法，该方法将把依赖项注入到传递给它的任何客户端中，客户端必须实现一个接口，该接口的 setter 方法接收依赖；在nest中采用第一种方式 - 构造器注入



构造器注入：

```tsx
@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}
  // 不熟悉TS的同学请注意，上的一行代码等效下面的四行：
  // private readonly appService:AppService;
  // constructor(appService:AppService) {
  //   this.appService=appService;
  // }
}
```



Nest还支持基于属性方式注入:



```tsx
@Controller('/')
export class AppController {
  @Inject('AppService')
  private readonly appService: AppService;
}
```



在AppService类中，则只需要用一个`@Injectable()`装饰器即可：

```tsx
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
```





记住不一定非要是全部都是依赖注入形式，也可以先 let config = new ConfigService(); 然后在通过 Module 方式注入到其他的module中





## 元数据反射

我们都知道 ts 中的类型信息是在运行时是不存在的，那运行时是如何根据参数的类型注入对应实例的呢？

答案就是：元数据反射

要在 ts 中启用元数据反射相关功能需要

* npm i reflect-metadata --save
* 在 `tsconfig.json` 里配置 `emitDecoratorMetadata` 选项为`true`

### 定义元数据



### 获取元数据











Provider 决定了 IOC 注入依赖关系













https://juejin.cn/post/7049504750257045540#heading-4

[Module Provider 详解](https://juejin.cn/post/6925605351475806216#heading-0)

https://juejin.cn/post/6923020519113490440





