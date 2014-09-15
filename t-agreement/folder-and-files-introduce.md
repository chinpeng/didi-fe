####静态资源

	svn://10.10.10.60/xiaoju/server/static/trunk/


#####webapp

	/Users/kimi/svn/st-trunk/webapp/src 
	MacBookAir:src kimi$ tree -L 1
	.
	├── COA.js -- 陆续废弃(将挪到lib下)
	├── banner.js -- 陆续废弃（将挪到js下）
	├── base.css -- 陆续废弃（将挪到css下）
	├── css -- 具体页面相关的css如打车券页面p-coupon-list.css
	├── didi.animate.js  -- 陆续废弃（将挪到lib下）
	├── didi.dialog.js -- 陆续废弃（将被dd.dialog.js替换）
	├── didi.jbase.js -- 陆续废弃（将被dd.base.js替换）
	├── didi.min.js -- 陆续废弃（压缩的文件）
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

其中p表示page。(后续尽量避免在html页面中写js和css，都单独分开，考虑到在开发时js和css的缓存，已经与沛沛沟通将所有开发机的静态缓存禁止了，请知晓。)

#####activity

	svn://10.10.10.60/xiaoju/server/static/trunk/activity

	liujb:activity kimi$ tree -L 1
	.
	├── bs-imgs -- 以前的红包相关img（陆续废弃）
	├── bs_imgs -- 以前的红包相关img（陆续废弃）
	├── css -- 所有运营活动相关的css
	├── img-hb -- 所有红包图片，后期挪动到此文件夹
	├── img-mall -- 积分商城的图片
	├── imgs_redpocket -- 老路径
	├── js -- 所有运营活动的js
	└── lib -- 第三方库或者我们自己的插件
	
请伙伴们在放文件的时候切勿随意，切记。－不明确的地方找忍沟通清楚。


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
	

