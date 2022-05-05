



使用maven进行依赖包管理

一个project下面可以有多个module，一个module是一个具体的服务



### 创建一个spring boot工程

1. spring initializr  ---> spring boot

2. Spring.io 官网

   https://start.spring.io 这里可以下载一个压缩包，然后在project structure导入module，这里也可以快速创建工程，避免idea不能联网

3. 设置阿里云的start: http://start.aliyun.com

4. 手工创建maven工程，修改为spring boot工程

   1. pom.xml 添加 parent 和 dependency
   2. 添加一个application引导类





**想使用高版本，直接在pom.xml 里改就可以，然后刷新下maven**





## Spring boot 简介

* spring boot 是由Pivotal团队提供的全新框架，其设计目的是用来**简化**spring应用的<font color=red>初始搭建</font>以及<font color=red>开发过程</font>
  * Spring 程序缺点
    * 依赖设置繁琐
    * 配置繁琐
  * spring boot程序优点
    * 起步依赖（简化依赖配置）
    * 自动配置（简化常用工程相关配置）
    * 辅助功能（内置tomcat服务器，... ）



1. 开发spring boot程序要继承spring-boot-starter-parent
2. Spring-boot-starter-parent中定义了若干个依赖管理
3. 继承parent模块可以避免多个依赖使用相同技术时出现依赖版本冲突
4. 继承parent的形式也可以采用引入依赖的形式实现效果 - 阿里云上面的也行



* parent
* starter： 俄罗斯套娃🪆，代表一种技术，有无数个starter来使用，每个
* 























