###dd.share.js下的方法

----

####default(wxJsObj)

wxJsObj: 

	WeixinJSBridge 微信浏览器对象
	

opt:	

	 {
	     appmsg: {
	         appid: 'wx69b6673576ec5a65',
	         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
	         link: "http://diditaxi.com.cn/api/v1/share/",
	         title: "最近用滴滴打车，每次都很快打到车，推荐给你试试！",
	         desc: "用滴滴打车，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了~",
	         succCB: null
	     },
	     timeline: {
	         appid: "wx69b6673576ec5a65",
	         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
	         link: "http://diditaxi.com.cn/api/v1/share/",
	         title: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
	         desc: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
	         succCB: null
	     },
	     weibo: {
	         content: "今天用滴滴打车了，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了，推荐你也下载试试 http://diditaxi.com.cn/api/v1/share",
	         url: "http://diditaxi.com.cn/api/v1/share",
	         succCB: null
	     }
	 }



####shareAll(wxJsObj, opt)

opt:	

	 {
	     appmsg: {
	         appid: 'wx69b6673576ec5a65',
	         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
	         link: "http://diditaxi.com.cn/api/v1/share/",
	         title: "最近用滴滴打车，每次都很快打到车，推荐给你试试！",
	         desc: "用滴滴打车，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了~",
	         succCB: null
	     },
	     timeline: {
	         appid: "wx69b6673576ec5a65",
	         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
	         link: "http://diditaxi.com.cn/api/v1/share/",
	         title: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
	         desc: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
	         succCB: null
	     },
	     weibo: {
	         content: "今天用滴滴打车了，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了，推荐你也下载试试 http://diditaxi.com.cn/api/v1/share",
	         url: "http://diditaxi.com.cn/api/v1/share",
	         succCB: null
	     }
	 }

####appMsg(wxJsObj, opt)

opt

	{
         appid: 'wx69b6673576ec5a65',
         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
         link: "http://diditaxi.com.cn/api/v1/share/",
         title: "最近用滴滴打车，每次都很快打到车，推荐给你试试！",
         desc: "用滴滴打车，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了~",
         succCB: null
     }



####timeline(wxJsObj, opt)

	{
         appid: "wx69b6673576ec5a65",
         img_url: "http://diditaxi.com.cn/share/images/webapp_share/diditaxi-logo.png",
         link: "http://diditaxi.com.cn/api/v1/share/",
         title: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
         desc: "滴滴打车室内叫好车，再不用路边日晒雨淋跟人抢车了",
         succCB: null
     }

####weibo(wxJsObj, opt)


	 {
        content: "今天用滴滴打车了，室内叫好车再出发，再也不用路边日晒雨淋跟人抢车了，推荐你也下载试试 http://diditaxi.com.cn/api/v1/share",
        url: "http://diditaxi.com.cn/api/v1/share",
        succCB: null
     }

