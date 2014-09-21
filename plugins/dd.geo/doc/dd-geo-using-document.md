###dd.geo.js下的方法

------


####geo.weixin(wxJsObj, opt)

#####1. wxJsObj
	
	微信的浏览器对象 WeixinJSBridge

#####2. opt
	{
		appid:"", // 默认 wx69b6673576ec5a65
		accesstoken:"", // 必备参数
		loading:function(){}, // 定位前的函数
		succCB:function(res){}, // 定位成功回调函数
		errorCB:function(){}, // 定位失败回调函数
		timeout: { // 定位超时对象
			cnt:, // 超时时间
			CB:function(res){} // 超时回调函数
		}
	}
	
####geo.h5(opt)

#####1. opt	
	{
		loading:function(){}, //加载要执行的函数
		succCB:function(res){}, // 定位成功后的回调函数
		deniedCB:function(res){}, // 用户不允许定位时候的回调函数
		timeout:{ // 定位超时对象
			cnt:,
			CB:function(res){}
		}
	}
	
####geo.location(wxJsObj, opt)

#####1. wxJsObj
	
	微信的浏览器对象 WeixinJSBridge

#####2.opt

	{
		h5:{}, // 同geo.h5的参数
		weixin:{} //同geo.weixin中opt参数
	}
