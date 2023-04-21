

设计模式：**不要通过共享内存来通信，而是应该通过通信来共享内存。**



原理：







应用：



1. 我们的项目中使用 signal 来作为项目的清理操作

   ```go
   
   	sigs := make(chan os.Signal, 1)
   	signal.Notify(sigs, syscall.SIGINT, syscall.SIGTERM)
   	go func() {
   		<-sigs
   		cancel()
   		xServer.Stop()
   	}()
   
   ```

   













