####install mysql

1. `brew install mysql`
2. `mysql.server start` #启动mysql服务
3. `mysql.server stop` #关闭mysql服务

####config your mysql

在终端运行`mysql_secure_installation`脚本，该脚本会一步步提示你设置一系列安全性相关的参数，包括：设置`root密码`，`关闭匿名访问`，`不允许root用户远程访问`，`移除test数据库`。当然运行该脚本前记得先启动mysql服务。

####basic command

1. `desc tablename;` -- 查看表结构
2. `show databases;` -- 查看所有的数据
3. `show tables;` -- 查看表
4. `mysql -h localhost -u root -p` -- 登陆数据库 [-h localhost -P]可选
5. `drop table Recommender_Candidacy_Relation` -- 
6. `show create table department;` 显示数据库建表语句
7. `show full fields from department;` 显示数据库建表语句
