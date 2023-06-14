





## 事务的开启 与 提交模式，无非以下两种情况：

### 1. 参数 autocommit=0

事务会在用户对数据操作时候，自动开启，在用户执行 commit 命令时提交。

用户本次对数据库开始进行操作到用户执行commit命令之间的一系列操作为一个完整的事务周期。

若不执行commit命令，系统则默认事务回滚。

总而言之，当前情况下事务的状态是：**自动开启 + 手动提交**。

### 2. 参数 autocommit=1 （系统默认值），事务开启与提交又分为两种状态

1. **手动开启手动提交：** 当用户执行 `start transaction` 命令时（事务初始化），一个事务开启，当用户执行`commit`命令时，当前事务提交。

   从用户执行 `start transaction`命令到用户执行`commit`命令之间的一系列操作为一个完整的事务周期。
   若不执行 `commit`命令，系统则默认事务回滚。

2. **自动开启，自动提交：**如果用户在当前情况下未执行`start transaction`命令而对数据库进行了操作，系统则默认用户对数据库的每一个操作为一个孤立的事务，也就是说用户每进行一次操作，系统都会及时提交或者及时回滚。

   这种情况下用户的每一个操作都是一个完整的事务周期。
   





## 当前读 & 快照读 & mvcc



1. 当前读，读取的是最新版本，并且对读取的记录加锁，阻塞其他事务同时改动相同记录，避免出现安全问题。

   1. **哪些形式的 sql 属于当前读**

      1. select ... lock in share mode （共享读锁）
      2. select ... for update
      3. update、delete、insert

      例如，假设要update一条记录，但是另一个事务已经delete这条数据且commit了，如果不加锁就会产生冲突。所以update的时候肯定是当前读，得到最新的信息并且锁定相应的记录。

      

   2. **关于 for update**

      利用 select ... for update 可以锁表/锁行 （视情况而定，用到了索引就会锁行，否则锁表）

      锁表的压力远大于锁行，应尽量采用锁行。

      for update仅适用于 InnoDB，且必须在事务处理模块（begin/commit）中才能生效。

      什么时候会锁表？这里不一定非要是主键，只要是带索引即可

      * 例1：明确指定主键，并且有数据，row lock
   
        `select * from project where id = '3' for update`
   
      * 例2：明确指定主键，查不到数据，无lock
   
        `select * from project where id = '99999' for update`
        
      * 例3：无主键，table lock
   
        `select * from project where name = 'pj1' for update`
        
      * 例4：主键不明确，table lock
   
        `select * from project where id <> '3' for update`
        
      * 例5：主键不明确，table lock
   
        `select * from project where id like '3' for update`
   
   3. **当前读的实现方式**
   
      当前读使用 `next-key`锁（行记录锁 + Gap间隙锁）实现
      
      间隙锁：只有在 repeatable read、serializable 隔离级别才有，就是锁定范围空间的数据，假设id有3、4、5，锁定 id > 3 的数据，是指 4、5及后面的数字都会被锁定，因为此时如果不锁定没有的数据，当加入了新的数据 id = 6，就会出现幻读，间隙锁避免了幻读。
      
      
      
      * 对主键或唯一索引，如果当前读时，where 条件全部精准命中（= 或者 in），这种场景本身就不会出现幻读，所以只会加行记录锁。
      * 没有索引的列，当前读 操作时，会加全表 Gap 锁，生产环境要注意。
      * 非唯一索引列，如果 where 条件部分命中（>、<、like 等）或者全未命中，则会加附近 Gap 间隙锁。例如，某表数据，非唯一索引列 2，6，9，9，11，15。要操作非唯一列9的数据，Gap 锁将会锁定的列是(6,11]，该区间内无法插入数据。
      
      
      
      
      
   
2. 快照读
	
	单纯的 select 操作，不包括上述的 `select ... lock in share mode, select ... for update`
	read committed 隔离级别：每次 select 都生成一个快照读
	read repeatable 隔离级别：开启事务后，第一个 select 语句才是快照读的地方，而不是一开启事务就快照读
	
	
	
	**快照读的实现方式：undolog 和 多版本并发控制 MVCC**







所有的 sql 操作跟事务没有必然的关系，可以将所有的 sql 操作封装到一个事务当中。也可以一条任意的 sql 针对一个事务。例如，一个简单的快照读都可以包含到一个事务中。



也可以关闭事务，



事务（Transaction）是访问和更新数据库的程序执行单元；事务中可能包含一个或多个sql语句，这些语句要么都执行，要么都不执行。







**mysql 服务如果使用 InnoDB ，则每一个mysql提交，肯定会有一个事务。**





https://www.runoob.com/w3cnote/mysql-different-nnodb-myisam.html



























