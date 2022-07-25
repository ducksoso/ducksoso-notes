



















helm upgrade --debug -i enigma2-operationx-crontabd \
        -f $(cd ./deploy/helm-charts && pwd)/hkstp-values.yaml \
        --description 2.1.2 \
        --set image.repository=docker-reg.basebit.me:5000/k8s/service/enigma2-operationx-amd64 \
        --set image.tag=def737a \
        --namespace hkstp \
        basebit-chartmuseum/enigma2-operationx-crontabd



helm upgrade --debug -i enigma2-fuwu-api \
        -f $(cd ./deploy/helm-charts && pwd)/enigma2-values.yaml \
        --description 2.1.2 \
        --set image.repository=docker-reg.basebit.me:5000/k8s/service/enigma2-fuwu-api-amd64 \
        --set image.tag=def737a \
        --namespace yifang \
        basebit-chartmuseum/enigma2-fuwu-api





```
helm upgrade -i enigma2-pipeline-api \
		-f /Users/zhijing.zhang/go/src/git.basebit.me/enigma/enigma2-pipeline/deploy/helm-charts/enigma2-values.yaml \
		--set-string image.repository=docker-reg.basebit.me:5000/k8s/service/enigma2-pipeline-api-amd64 \
		--set-string image.tag=v0.9.10 \
		--namespace yifang \
		$(pwd)/enigma2-pipeline-api
```







