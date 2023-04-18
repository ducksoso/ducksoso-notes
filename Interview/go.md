





### oss对象存储

Minio : 我们的图片、文件都是利用minio服务进行存储的。



```go
// https://github.com/minio/minio

import (
	"github.com/minio/minio-go/v7"
	"github.com/minio/minio-go/v7/pkg/credentials"
)

var minioClient *minio.Client

func init() {
	// Initialize minio client object.
	var err error
	creds := credentials.NewStaticV4(options.Config.Minio.AccessKeyID(), options.Config.Minio.SecretAccessKey(), "")
	minioClient, err = minio.New(options.Config.Minio.Endpoint(), &minio.Options{
		Creds:  creds,
		Secure: options.Config.Minio.Secure(),
	})
	if err != nil {
		panic(err)
	}
}

// Client minio client 
func Client() *minio.Client {
	return minioClient
}
```



### Uber-go/fx

依赖注入，对比 dig & wire



### 我们的发布工具 **argocd**



### ingress vs istio

两个都是对外开放服务的形式，对外提供http域名访问









https://juejin.cn/post/7153582825399124005

https://github.com/uber-go/fx



https://argoproj.github.io/argo-workflows/quick-start/



https://juejin.cn/post/7116400234711744525



