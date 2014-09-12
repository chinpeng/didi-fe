####静态资源

	svn://10.10.10.60/xiaoju/server/static/trunk/


#####webapp

	/Users/kimi/svn/st-trunk/webapp/src 
	MacBookAir:src kimi$ tree -L 1
	.
	├── COA.js -- 陆续废弃
	├── banner.js -- 陆续废弃
	├── base.css -- 陆续废弃
	├── css -- 具体页面相关的css如打车券页面p-coupon-list.css
	├── didi.animate.js  -- 陆续废弃
	├── didi.dialog.js -- 陆续废弃
	├── didi.jbase.js -- 陆续废弃
	├── didi.min.js -- 陆续废弃
	├── fonts  -- 继续沿用
	├── geoLocation.js -- 陆续废弃
	├── gulpfile.js -- 用来做发布构建的方法（每个项目中都有）
	├── images  -- 继续沿用
	├── js -- 具体页面相关的js如打车券页面p-coupon-list.js
	├── lib -- 用来放第三方库以及我们自己的插件或者模块化的js
	├── menu.css -- 应挪到css文件夹中
	├── menu.js -- 陆续废弃
	├── package.json
	├── pages -- 继续沿用放一些纯静态的html页面
	├── priceBar.js -- 陆续废弃
	└── wx.share.js -- 陆续废弃
	
	
PS：具体页面相关的js和css文件命名保持一致，如打车券页面coupon-list.html，js、css的命名如

1. css为p-coupon-list.css，
2. js为p-coupon-list.js

其中p表示page。


####V2主要项目文件

	svn://10.10.10.60/xiaoju/server/api/v2/trunk/views/

#####app-pages

	/Users/kimi/svn/v2-trunk/views/app-pages
	MacBookAir:app-pages kimi$ tree -L 1
	.
	├── coupon-list.html -- 打车券列表
	├── coupon-use-rule.html -- 打车券使用规则
	├── driver-appleid.html -- 司机端appid账号领取
	├── driver-task-details.html -- 司机端任务详情页面
	├── driver-task-list.html -- 司机任务列表
	├── my_account.html -- 我的余额
	└── src -- 以上所有文件的源文件
	
#####webapp

	/Users/kimi/svn/v2-trunk/views/webapp/src
	MacBookAir:src kimi$ tree -L 1
	.
	├── complete.html
	├── feedback.html
	├── gulpfile.js
	├── hold.html
	├── home.html
	├── introduce.html
	├── my_balance.html
	├── node_modules
	├── package.json
	├── pay.html
	├── recall.html
	├── sftp-config.json
	├── valid.html
	└── waitting.html
	
#####

