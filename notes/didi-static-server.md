##didi-static-server

----

###Static server的好处

1. 方便静态资源管理。
2. 为未来cdn加速做准备。
3. 页面性能提升
	
	1. 浏览器对于单个域名并行下载限制。 pay.xiaojukeji.com static.xiaojukeji.com
	2. 服务器缓存静态资源，提升相应速度。
	2. Http request对cookie的携带导致request header过大，在请求js、css、imgs对cookies完全没有必要，浪费用户流量。
	3. 释放webserver部分http请求压力。
	
###Static server相关配置

1. 机器名 `gs-static00` 和 `gs-static01`。登录机器 `ssh gs-static00.qq`
2. root目录`/home/xiaoju/webroot/static`和目录结构如下
	
		rd@gs-static00:/home/xiaoju/webroot/static$ tree -L 1
		.
		|-- activity -- 运营活动相关静态资源
		|-- api -- 历史目录，native需要使用的静态资源
		|-- gulfstream -- 湾流相关静态资源
		|-- placeholder -- 干龙乐乐(没有用)
		|-- site -- 其他web页面相关的静态资源
		`-- webapp -- 大webapp相关的静态资源

	**注：目前还没有对应目录的请来找我，乱放信不信我打你屁股！！！😊**

3. 访问路径
	
		http://static.xiaojukeji.com/webapp/xx.png
		http://static.diditaxi.com.cn/webapp/xx.png 

4. 机器的详细配置以及需要扩机器的同学请直接联系OP。

###迁移到Static server cluster

1. 目前微信webapp所有静态资源已经迁移到static server上，预计本周（11号之前）手Qwebapp，以及已与30多家App合作的Common webapp均会迁移到Static server。
2. 其他项目希望陆续迁移，在未来某个时刻会停止web机器的static目录上线。
2. 打车业务mis系统静态资源由于项目历史悠久，经开发人员过多，目前比较混乱，辛苦@王郧臣整理。

###迁移Static server工具 [Use the gulp](https://github.com/gulpjs/gulp/)


####1. replace url

1. 静态资源的引入有以下几种
 
	1. `<script type="javascript" src="/static/webapp/xx.js"> `
	2. `<link rel="stylesheet" type="text/css" href="/static/webapp/base.css">`
	3. `<img src="./static/webapp/xx.png">`
	
	而静态资源服务器的文件访问路径为
	
		http://static.xiaojukeji.com/webapp/xx.png
		http://static.diditaxi.com.cn/webapp/xx.png 
	
2. So！我们需要工具来帮助我们替换路径，这里使用`gulp-replace`，（使用前请自备`node`环境以及`npm`。）
	
	1. 在工程目录下引入`package.json` 或者`npm init`根据提示自动创建package.json文件
	
			{
			  "name": "webapp-static-gulp",
			  "version": "0.0.1",
			  "description": "Something of gulp",
			  "main": "static-webapp",
			  "dependencies": {
			    "gulp": "~3.8.5"
			  },
			  "devDependencies": {
			    "gulp": "~3.8.5"
			  },
			  "scripts": {
			    "test": "echo \"Error: no test specified\" && exit 1"
			  },
			  "keywords": [
			    "webapp",
			    "gulp",
			    "grunt"
			  ],
			  "author": "Liujb",
			  "license": "MIT"
			}

	
	1. `npm install gulp -g`全局安装gulp，以便能够使用`gulp`命令
	2. `npm install gulp-replace --save-dev`安装`gulp-replace`，加上`--save-dev`会自动添加到`package.json`文件中作为依赖项存在。
	3. `touch gulpfile.js`，Copy and paste 。
		
			/**
			 * 引入gulp对象
			 * @type {Gulp|exports}
			 */
			var gulp = require('gulp');
			var replace = require('gulp-replace');
			
			/**
			 * gulp-replace
			 */
			gulp.task('replace', function() { 
			    gulp.src('../*.html') 
			        .pipe(replace('/static/webapp/', 'http://static.xiaojukeji.com/webapp/'))
			        .pipe(gulp.dest('../')); 
			});
			//replace为task name
			//src和dest自行更改
			

	4. 最后执行`gulp replace`

####2. Add version to files

#####为什么要添加文件版本
1. 静态资源服务器的缓存时间非常长，即使文件有变更，在相当长的一段时间内用户还是会请求到缓存的文件，所以当我们对某个js或者css发布新的版本会不起作用，最粗暴的办法就是服务器手动清除缓存，显然这种方法不够优。
 
2. 业内用的比较多的方法就是在js、css、imgs后面添加版本号或者日期时间戳等如`<link rel="stylesheet" type="text/css" href="/static/webapp/base.css?v=1.0.1">`或者`<link rel="stylesheet" type="text/css" href="/static/webapp/base.css?v=201407">`。这一类方法确实能解决缓存问题，但是容易被攻击。所以我们使用md5作为版本号来更新用户请求来避开Nginx缓存。
3. 还有一种方法使用文件hash，如本来引入`<link rel="stylesheet" type="text/css" href="/static/webapp/base.css">`发布时候变成`<link rel="stylesheet" type="text/css" href="/static/webapp/base_adlgw082s.css">`这种方式的优点在于上线的时候新老版本可以无缝切换，而缺点就是需要管理线上多个版本的文件。

#####使用`gulp-hash-src`

1. `npm install gulp-hash-src --save-dev`
2. 代码如下
	
		/**
		 * 
		 * 只支持href=,src=,url()三种形式的替换，如果需要匹配自定义的asyncLoadJs需要自己去修改源码更改中的正则表达式
		 * 优点不需要修改任何html结构，直接搞即可
		 * 必须确保文件存在并能被插件访问到，插件会真实计算文件的md5
		 * @type {[type]}
		 */
		gulp.task("hash-src", function() {
		    gulp.src('./*.html')
		        .pipe(hash_src({
		            build_dir: "/", //js/css/images所在的文件根目录
		            src_path: "./", //要替换引用的html文件目录
		            hash: 'md5',
		            enc: 'hex', //hex，base64
		            exts: ['.js', '.css'],
		            query_name: "v"
		        }))
		        .pipe(gulp.dest("../"));
		});
 
 3. 使用命令`gulp hash-src`
 
 
*写在后面：*    
gulp有很多插件帮助我们去更高效去开发前端项目，如常见代码`代码检查`、`代码格式化`、`代码合并`、`代码压缩`等本人已整理在[Github](https://github.com/diditaxi/didi-fe/blob/master/notes/gulp-plugins-list.md)

本人在github上建了一个项目[didi-fe](https://github.com/diditaxi/didi-fe) 有兴趣的同学可以随便看看。






