

####1. The First time to build webapp env

#####1.1 install nodejs and npm

	yum install nodejs
	yum install npm

#####1.2 remove old static and then checkout the latest files 

	cd /home/webroot/webroot/static/
	rm -rf webapp
	svn co https://svn.xiaojukeji.com/xiaoju/server/static/trunk/webapp webapp
	
#####1.3 change to the src folder then install gulp and plugins
	
	cd static/webapp/src
	npm install -g gulp
	npm install
	
#####1.4 run the gulp `gulp` to build files

#####1.5 remove the older views/webapp and check out the latest files
	
	cd /home/webroot/app/api/v2/views/
	rm -rf webapp
	svn co https://svn.xiaojukeji.com/xiaoju/server/api/v2/trunk/views/webapp webapp
	
#####1.6 change to the src folder then install plugins
	
	cd src
	npm install
	
#####1.7 run gulp command `gulp` to build files


####2. Not first time

1. Go to the `static` folder then `svn up` and go to the `src` folder then run `gulp`
2. Go to the `views` folder then `svn up` and go to the `src` folder then run `gulp`



####3. Tips-Important!!!

1. In this file `https://svn.xiaojukeji.com/xiaoju/server/api/v2/trunk/views/webapp/src/gulpfile.js` -- 搭建测试环境的是时候不需要动
		
		'use strict';
		/*
		 * 外部配置
		 * 供FE和QA同学配置
		 */
		var file = {
		    src: './*.html',
		    dest: '../'
		};
		
		// 开发环境到测试环境的路径替换
		var devCfg = [{
		    pattern: '/static/webapp/src/',
		    replacement: '/static/webapp/'
		}];
		
		// 线上环境的路径替换
		var releaseCfg = [{
		    pattern: '/static/webapp/src/',
		    replacement: 'http://static.xiaojukeji.com/webapp/' //release
		}];


2. In this file `https://svn.xiaojukeji.com/xiaoju/server/static/trunk/webapp/src/gulpfile.js` -- Your need to modified to your path

		// 开发环境不需要配置，所有代码都唯一指向src文件夹下
		// 测试环境的配置，因为源代码中关于专车的接口就已经是线上路径了，所以需要变更为测试环境
		var devCfg = [{
		    pattern:'/static/webapp/src/',
		    replacement: '/static/webapp/'
		}, {
		    pattern: 'http://static.udache.com/gulfstream/webapp/js/biz.min.js', // 线上路径，
		    replacement: 'http://static.udache.com/gulfstream/webapp/js/biz.min.js' // 测试环境请自行变换
		}, {
		    pattern: 'http://api.udache.com/gulfstream/api/v1/webapp/pIndex',
		    replacement: 'http://api.udache.com/gulfstream/api/v1/webapp/pIndex'
		}, {
		    pattern: 'http://api.udache.com/gulfstream/api/v1/webapp/pGetFlag',
		    replacement: 'http://api.udache.com/gulfstream/api/v1/webapp/pGetFlag'
		}, {
		    pattern: 'http://api.udache.com/gulfstream/api/v1/webapp/',
		    replacement: 'http://api.udache.com/gulfstream/api/v1/webapp/'
		}];
		
		// 上线配置，因为源代码中关于专车的接口就已经是线上路径了，所以不需要变更
		var releaseCfg = [{
		    pattern: '/static/webapp/src/',
		    replacement: 'http://static.xiaojukeji.com/webapp/'
		}];
		
		// 单个文件配置
		var file = {
		    src: './js/*.js',
		    dest: '../js/'
		};
		
####4. controllers/weixinapi

1. 不走授权的weixinapi－－注释掉weixinapi118行－131行之间if的代码
2. 登录问题－－端口，线上是8000，线下可能是8080或者其他，可以参考nginx中的配置

####5. some pay question

1. 使用`charles`或者`fiddler`挂代理，并用手机连上电脑的代理网络。
2. 设置DNS解析映射关系为`pay.xiaojukeji.com` <-> `yourserver:port`
3. 以`http://pay.xiaojukeji.com/api/v2/weixinapi`访问保证其能落到测试机器上面

	


	

