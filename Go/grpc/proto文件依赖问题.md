

1. 在项目中，我们的`xxx.proto`文件依赖了：`googleapis/api/httpbody.proto`、`googleapis/api/annotations.proto`、`google/protobuf/field_mask.proto`、`protoc-gen-swagger/options/annotations.proto`等文件，在项目中对应的现象是：文件会报红色的错误<font color=red>`cannot resolve import "google/api/httpbody.proto"`</font>?

   解决办法：

   * 首先报红不影响`build`，只需要在`protoc -I . xxx`的时候，指定相应的文件夹即可，不影响最终结果。

     ```shell
     protoc -I 
     ```

     

   * 在`IDE`中，我们使用的是`Goland`，只需要在`preferences => Languages & Frameworks => Protocol Buffers => Import paths`，中添加下载的`proto`文件对应的路径即可。我下载的`proto`文件都存放在`~/go/src/proto/`下的。

     ````sh
     cd ~/go/src/proto/
     
     git clone https://github.com/googleapis/googleapis.git
     git clone https://github.com/grpc-ecosystem/grpc-gateway.git
     ````

     

2. Nihau



