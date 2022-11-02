

## chart 使用

写好的chart需要推送到我们的 chart 仓库（或者在本地）



1. 生成一个chart release
   helm install --name my-release-name HELM_CHART_NAME
   helm install --name my-release basebit-chartmuseum/enigam2-reportx
   helm install --name my-release1 basebit-chartmuseum/xdp-backend-service

2. 升级 chart ，也即是部署一次新的pod
   helm upgrade -i my-release basebit-chartmuseum/xdp-backend-service
   ```
   .PHONY: upgrade-chart
   upgrade-chart: upgrade-chart
   @helm upgrade -i $(HELM_RELEASE_NAME) \
       -f $(HELM_VALUES_FILE) \
       --description $(VERSION) \
       --set-string image.repository=$(IMAGE) \
       --set-string image.tag=$(VERSION) \
       --namespace $(HELM_RELEASE_NAMESPACE) \
   $(HELM_CHART_NAME)
   ```
    -i 参数，就是为了确保没有安装自动install



