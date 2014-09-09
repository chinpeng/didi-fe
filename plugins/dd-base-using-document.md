###dd.base.js下的方法

------

####diffPlatform(opt)

	{
		ios:function(){
		    // Do what you want.
		},
		android:function(){
		    // Do what you want.
		},
		wp:function(){
		    // Do what you want.
		},
		others:function(){
		    // Do what you want.
		}
	}


####loadJS(url, cb)
	
	url: js的访问路径
	cb: 加载完成时执行的回调函数
	
####touch(ele, cb, bubble)

	ele: DOM element
	cb: 事件监听函数
	bubble: 是否冒泡，默认false


####getElesByKls(node, className)

	node: dom 节点，默认document.body
	className: 类名

####getQueryStr

	没有参数，返回查询字符串的键值对。如 http://diditaxi.com.cn/api/v2/weixinapi?key=xx&val=oo {key: 'xx', val:'oo' }

####txtToJson

	将json格式的字符串转换为json对象

####ajax(opt)
	
	{
		method: "GET", // Http method
		url: "", // url
		async: true, // async
		data: {}, // POST data
		timeout: { // timeout object
			millisecond: 10000,
			callback: function(){
			}
		},
		succFunc: function(data){ //succ callback
		},
		failFunc: function(data){ // fail callback
		},
	    isSequenceReq: false // 是否连续发送请求
	}


####collectLog(openid, phone, params)

	openid: 微信openID
	phone: 用户电话号码
	params: 参数
	
####setCookie(key, value)
		
	key: 
	value: 
	
####getCookie(key)

	key: 
	
####delCookie(key)
	key: 

####clearCookies()

	clear cookies