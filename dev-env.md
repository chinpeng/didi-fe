*写在前面*

> 关于svn、开发环境、测试环境、线上路径、访问路径、域名之间的对应关系进行记录，希望Team内同学对这些路径熟记于心，在工作中能够快速找到对应的资源以提高效率。

####mvc

*写这段的目的是帮助大家更好的理解前后台是怎么协调的*

1. MVC开发模式 -- M（Model）C（Controller）V（View）。
2. 两个分离 -- 数据M和行为C分离，行为C和表现V分离，V就是FE的一亩三分地。
3. MVC跟传统的asp、jsp、php最大的不同就在于，以往用户请求都是直接请求一个文件，而MVC请求的是action，action是Controller中的方法比如我们访问`http://test.diditaxi.com.cn/api/v2/weixinapi` `weixinapi`就是一个Controller对应着controllers文件夹下的`weixinapi.php`。
4. `weixinapi.php`里面有一个`function index`，index方法就是Controller的默认方法，这个index内部需要load->(home.html)，执行完load方法后，正常情况下就response了`home.html`
5. `home.html`里面如`/static/webapp/didi.min.js`等代码，浏览器会再次发起请求，这个时候就是请求**静态资源**了如`http://test.diditaxi.com.cn/static/webapp/didi.min.js`这些资源在静态目录下的`/static/...`下

*PS：想了解更详细的细节请再沟通*


####svn路径

2. 前端同学svn中的路径有4个
 
    - `svn://10.10.10.60/xiaoju/server/static/` 静态资源目录，跟线上一致
    - `svn://10.10.10.60/xiaoju/server/share/` 运营活动相关的静态页面，跟线上一致
    - `svn://10.10.10.60/xiaoju/server/frontend/` 前端同学特有的路径，用来做前端知识积累使用，跟具体项目无关 
    - 其他的具体项目比如微信的主干`svn://10.10.10.60/xiaoju/server/api/v2/trunk/views/webapp`已被废弃
*注意:除share文件夹之外，不允许对任何主干的代码直接ci*

####online

1. static目录在线上的位置为/home/webroot/webroot/static/
2. share目录在线上的位置为/home/webroot/webroot/share/
3. 项目路径/home/webroot/app/api/v2/views/...
4. 访问域名
    - http://diditaxi.com.cn/static/webapp/didi.min.js -- 对外看不到url的路径
    - http://diditaxi.qq.com/static/webapp/didi.min.js -- 腾讯的二级域名
    - http://pay.xiaojukeji.com/static/webapp/didi.min.js -- 对外能看到url时使用。
    
    
####常见命令 [linux-svn-git-command](./note/non-fe/linux-svn-git-mysql-common-command.md)
