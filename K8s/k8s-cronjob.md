

### Cronjob 任务永不执行

给一个错误的执行计划即可，这里的 2-31 号永远不会出现

`invoiceUpdateDailyAtSchedule: "0 5 31 2 ?"`





设置crontab执行时间



// 查看所有的 cronjob

`kubectl get cronjobs`



// 修改 cronjob 的定时时间

```
kubectl patch cronjob enigma2-operationx-crontabd-process-ctl -p '{"spec":{"schedule": "*/1 * * * *"}}'
```



// 查看cronjob 的pod情况



// 手动启动cronjob



```
kubectl create job --from=cronjob/ycjk-dashboard-crontabd-run-all ycjk-dashboard-crontabd-run-all-manual
```