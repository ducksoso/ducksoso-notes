## 使用TS遇到的问题

### ts 代码中很多对象用[''] ?

```ts
a1 = obj['init']

val['keyword_' + index] = '%' + keyword + '%';

```

> 访问特殊属性也无法使用.操作符，必须用['xxx']来访问
> 此外用['xxx'] 也可以做一些特殊的操作

### 遇到很多 Promise<any> 这种写法

1. 调用第三方接口的时候会返回 Promise<any>

    ```ts
    export declare class Enigma2AccountClient {
        private name;
        constructor(name?: string);
        static configure(option: GRPCConnectOptions): void;
        static init(cfg: ConfigService): void;
        assure(): void;
        createUser(ctx: Context, user: any, password: string): Promise<any>;
        getResetPasswordToken(ctx: Context, userName: string): Promise<string>;
        updateUser(ctx: Context, userId: string, user: any, paths: string[]): Promise<any>;
        changeUserStatus(ctx: Context, userId: string, status: number): Promise<any>;
        getUsers(ctx: Context, userIds: string[], paths: string[]): Promise<IGetUsersResponse>;
        getUser(ctx: Context, userId: string, paths: string[]): Promise<IGetUserResponse>;
        listUsers(ctx: Context, filter: string, paths: string[], page: number, pageSize: number, orderBy?: string): Promise<any>;
        listUsersCount(ctx: Context, filter: string, paths: string[], page: number, pageSize: number, orderBy?: string): Promise<any>;
        createOrg(ctx: Context, org: any): Promise<any>;
        changeOrgStatus(ctx: Context, orgId: string, status: number): Promise<any>;
        getOrg(ctx: Context, orgId: string, paths: string[]): Promise<GetOrgResponse>;
        getOrganizations(ctx: Context, orgIds: string[], paths: string[]): Promise<IGetOrganizationsResponse>;
        updateOrg(ctx: Context, org: any, paths: string[]): Promise<any>;
        listOrgs(ctx: Context, filter: any, paths: string[], page: number, pageSize: number, orderBy?: string): Promise<any>;
        listOrgsCount(ctx: Context, filter: any, paths: string[], page: number, pageSize: number, orderBy?: string): Promise<any>;
        listOrgUsers(ctx: Context, orgId: string, filter: any, paths: string[], page: number, pageSize: number, orderBy?: string): Promise<any>;
        listOrgUsersCount(ctx: Context, orgId: string, filter: any, paths: string[], page: number, pageSize: number): Promise<any>;
        getReceiverUser(ctx: Context, orgId: string): Promise<any[]>;
        addMemberToOrg(ctx: Context, userId: string, orgId: string, role: number): Promise<any>;
        getOrgUser(ctx: Context, userId: string, orgId: string, paths: string[]): Promise<AccountxOrgUser>;
        updateOrgUser(ctx: Context, userId: string, orgId: string, role: number): Promise<any>;
        changeOrgUser(ctx: Context, userId: string, orgId: string, role: number): Promise<any>;
        rejectedMemberToOrg(ctx: Context, email: string, orgId: string, role: number): Promise<any>;
        getOrgReceiver(ctx: Context, orgId: string): Promise<Receiver>;
        getUserByEmail(ctx: Context, userEmail: string, paths: string[]): Promise<any>;
        getOrgByName(ctx: Context, orgName: string, paths: string[]): Promise<any>;
        getOrgBySlug(ctx: Context, orgSlug: string, paths: string[]): Promise<any>;
        listUserOrgs(ctx: Context, userId: string, paths: string[]): Promise<ListUserOrgsResponse>;
        getUserTotalCount(ctx: Context): Promise<number>;
        getOrgTotalCount(ctx: Context): Promise<number>;
        statOrgMember(ctx: Context, orgIds: string[]): Promise<{
            [k: string]: number;
        }>;
        createUserWithOrg(ctx: Context, user: any, password: string, org: any, role: number): Promise<any>;
        adminChangePassword(ctx: Context, userId: string, password: string): Promise<any>;
    }
    
    ```

2. 第二种写法

    ```ts
    async getTokenPayload(req: any, payload): Promise<any> {
        return new Promise((resolve, reject) => {
            jwt.verify(
                payload,
                (header, cb) => {
                    this.getKey(header, cb);
                },
                this.options,
                (err, decoded) => {
                    if (!_.isNull(err)) {
                        if (err.message === 'jwt expired') {
                            reject(new BBHttpError(401, 'JWT_EXPIRED', ''));
                        }
                        reject(new BBHttpError(401, 'INVALID_BAUTH_TOKEN', ''));
                    }
                    resolve(decoded);
                },
            );
        });
    }
   
    const tokenPayload = await this.getTokenPayload(req, token);
   
    ```

小结：

理解 resolve 、 reject，**_resolve方法接收一个参数，这个参数是执行成功的结果，会传递给 .then(data) 方法，所以 .then() 方法很像一个回调函数。_**

reject 跟 resolve 类似

另外说到 async await ，其实是 promise & .then 表达式的简写

`const data = await Promise()` 的返回结果 与 resolve() 接收参数一样


