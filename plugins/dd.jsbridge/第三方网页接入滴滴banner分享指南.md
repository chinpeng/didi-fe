####第三方网页接入滴滴Banner分享指南

#####必要说明

1. 滴滴打车3.6版本之后，3.6之前的版本需要将分享信息给到滴滴后台人员通过CMS完成上线。
2. 第三方网站的域名要加入滴滴的白名单。
3. 一般支持分享到`微信朋友圈`，`微信好友`，`新浪微博`。如需要分享到其他渠道，请联系滴滴技术人员。

#####实现步骤

1. 引入js文件 `<script type='text/javascript' src='dd.jsbridge.js'></script>`
2. 使用方法 `didi.initShare(data,callback)`.
3. 参数说明

	1）data参数－分享数据
	
	    var default_data = {
	        share_url: 'http://www.xiaojukeji.com',
	        share_icon_url: 'http://static.xiaojukeji.com/webapp/images/taxi.png',
	        share_img_url: 'http://diditaxi.com.cn/share/images/na_landing_kuhang/02.png',
	        share_title: '滴滴一下，美好出行',
	        share_content: '滴滴打车，美好出行',
	        share_from: ''
	    };
	    
	    
	  2）callback－分享回调，此方法在android未能正常回调
	  
#####Examples
	
	<!DOCTYPE html>
	<html lang="en">
	
	<head>
	    <meta charset="UTF-8">
	    <title>滴滴打车</title>
	    <script type='text/javascript' src='./dd.jsbridge.js'></script>
	
	</head>
	
	<body>
	    <script type='text/javascript'>
	    window.addEventListener('DOMContentLoaded', function() {
	
	        // 分享数据
	        var shareData = {
	            share_url: 'http://www.xiaojukeji.com', // 分享的落地页面
	            share_icon_url: 'http://static.xiaojukeji.com/webapp/images/taxi.png', // 分享的icon
	            share_img_url: 'http://diditaxi.com.cn/share/images/na_landing_kuhang/02.png', //分享的大图
	            share_title: '滴滴一下，美好出行', // 分享标题
	            share_content: '滴滴打车，美好出行', // 分享内容
	            share_from: '' // 分享来源
	        };
	
	        if (window.didi) {
	            didi.shareInit(shareData, function() {
	                console.log('分享成功');
	            });
	        }
	
	    });
	    </script>
	</body>
	
	</html>
	
#####Notes

	这样用户在滴滴打车里面打开web页面的时候就能分享到社交平台了。如有疑问，请联系liujiangbei@diditaxi.com.cn