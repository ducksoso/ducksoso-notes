

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





