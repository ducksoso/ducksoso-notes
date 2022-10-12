## MySQL的json查询

->、->>、json_extract、json_unquote

| 简写  | 函数           | 描述   |
|-----|--------------|------|
| ->  | json_extract | 单个箭头 |
| ->> | json_unquote | 双箭头  |


### 1. 在field中使用

->在field中使用的时候结果带引号，->>的结果不带引号

带引号：select info->"$.name" from member;

不带引号：select info->>"$.name" from member;

### 2. 在where条件中使用 

->当做where查询是要注意类型的，->>是不用注意类型的

1. select * from member where info->"$.id" = 1; // 有结果
2. select * from member where info->"$.id" = "1"; // 无结果
3. select * from member where info->>"$.id" = 1; // 有结果
3. select * from member where info->>"$.id" = "1"; // 有结果

### 3. 在 left joint 中使用

select hex(pri.instance_id) as instance_id, pri.status as project_status, pd.status as app_status, j.state as runner_state, 
       kdr.terminated_at as report_dockerrunner, kp.terminated_at as report_pod, kp.aws_instance_id as aws_id
from enigma2_project.project_runnable_instance pri
    left join enigma2_pipeline.pipeline_deployment pd on pri.instance_id = pd.id
    left join (select * from enigma2_pipeline.pipeline_instance where id 
         in (select SUBSTRING_INDEX(group_concat(id order by `created_at` desc),',',1) 
             from enigma2_pipeline.pipeline_instance where deployment_id in (0xC3D684AE5B5549E7AC5A40CA6A515D14, 0x693DE449DEC8478698E5DA61F7F93139) group by deployment_id))
        pi on pi.deployment_id = pri.instance_id
    left join enigma_docker.job j on j.id = pi.context->>'$.Terminal.job_id'
    left join enigma2_report.krs_dockerunner kdr on kdr.workspace_id = pi.context->>'$.Terminal.workspace_id'
    left join enigma2_report.krs_pod kp on kp.instance_id = kdr.id
where pri.instance_id in (0xC3D684AE5B5549E7AC5A40CA6A515D14, 0x693DE449DEC8478698E5DA61F7F93139);


**pi.context->>'$.Terminal.job_id' 注意这里的context 是一个json字符串**

## 总结：

使用的时候，用 ->> 没有问题的，且可以获取json嵌套中的对象

