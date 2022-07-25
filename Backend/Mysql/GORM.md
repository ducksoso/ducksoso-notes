



Gorm 的model如果有`deleted_at`字段，会默认执行删除。所谓的软删除就是把`deleted_at`置为当前时间，该记录并不会从db删除，<font color=red>在Gorm查询的时候，每个查询语句都会有一个自带的条件：</font>

```
where deleted_at is null
```

也就是说，gorm查询的时候是不会去查询那些已经被软删除的记录的，哪怕你在你的查询语句里面手动加上

```
where deleted_at is not null
```

