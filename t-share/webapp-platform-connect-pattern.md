####1. 初始化业务条－－依赖于定位信息，定位成功后确定该城市是否有专车，若有，初始化专车并做以下一系列事情，若没有专车则保持原有打车逻辑

业务条就是下面的打车和专车的两个icon
    
  	/**
     * 预先定义的业务数据
     * @type {Array}
     */
    business = [{
        name: 'diditaxi',
        desc: "出租车",
        js: "/static/webapp/src/js/diditaxi.js",
        selectedCB: function(i) {
            switchBiz(this);
        }
    }, {
        name: 'udache',
        desc: "商务车",
        js: "http://118.244.193.242:8888/static/js/src/biz/wlwebapp.js",
        selectedCB: function(i) {
            switchBiz(this);
        }
    }];

    /**
     * 初始化业务条
     * @return {[type]} [description]
     */
    base.loadJS('/static/webapp/src/lib/dd.biz.js', function() {
        if (!dd.initBiz) return;
        dd.initBiz(business);
    });


####2. 切换业务的方法


    var business = null;
    // 平台锁
    var lock = {
        handler: null,
        prevHanlder: null,
        btnOrder: null,
        current: ''
    };

    /**
     * 切换业务线
     * @param  {[type]} strBiz [description]
     * @return {[type]}        [description]
     */
    var switchBiz = function(biz) {
        if (lock.current === biz.name) return; // 缓存上一个业务线，控制js请求
        if (!business || !base.isArray(business)) return; // business不是数组则返回

        var bizObj = null;
        var bizData = null;
        var item = null;

        /**
         * js loaded
         * @return {[type]} [description]
         */
        var loaded = function() {

            bizObj = dd.webappBiz[biz.name]; //在业务端js已经注入一个object到dd命名空间下
            if (!base.isFunc(bizObj.init)) throw "Please inject object to dd namespace";

            bizData = bizObj.init.call(null, platData); //将平台数据传到业务端js，并且在业务端js执行完成后返回一个object对象
            if (!base.isObject(bizData)) throw "Please return object when invoked the init function";

            if (base.isFunc(bizData.outCB)) biz.outCB = bizData.outCB; // 为每条业务线注册划出事件

            lock.current = biz.name; // 上锁
            lock.btnOrder = bizData.btnOrder; // 业务数据返回的btn对象
            btn_call.innerText = lock.btnOrder.val; // button的值

            /**
             * 发送订单的处理函数
             * @param  {[type]} e [description]
             * @return {[type]}   [description]
             */
            lock.handler = function(e) {
                if (e.target.className !== "btn-orange") throw "Please fill from and to corrent";

                var obj = {
                    token: h_access_token.value, // token
                    phone: "phone", //兼容打车
                    openid: "openid", //兼容打车

                    lat: h_curr_lat.value, // 当前地点纬度
                    lng: h_curr_lng.value, // 当前地点精度

                    flat: h_from_lat.value, // 出发地纬度
                    flng: h_from_lng.value, // 出发地精度
                    from_name: h_from_name.value, // 出发地名称
                    from_address: h_from_addr.value, // 出发地地址

                    tlat: h_to_lat.value, // 目的地纬度
                    tlng: h_to_lng.value, // 目的地精度
                    to_name: txt_end.value, // 目的地名称
                    to_address: h_to_addr.value, // 目的地地址

                    cityid: h_cityid.value, // 城市ID
                    cityname: h_cityname.value, // 城市名称

                    from: txt_start.value,
                    fromAddr: txt_start.value,
                    to: txt_end.value,
                    toAddr: txt_end.value
                };
                /**
                 * 发单失败时的回调函数
                 * @return {[type]} [description]
                 */
                var failFn = function(txt) {
                    dd.dialog.alert(txt);
                    e.target.className = "btn-orange";
                };
                if (!obj.lng || !obj.lat) { //表示定位成功！todo:优化这个地方的逻辑
                    alert("未能获得您的位置，详细描述起点，可以帮助我们为您定位哦");
                    return;
                }
                if (!obj.from || !obj.to || !obj.cityid) {
                    throw "Need data is miss.";
                    return; // 检查是否缺失必备数据
                }
                localStorage.order = JSON.stringify(obj); //存储订单

                saveToList({
                    tlat: obj.tlat,
                    tlng: obj.tlng,
                    to_name: obj.to_name,
                    to_address: obj.to_address
                }); //存储历史目的地信息，老的数据存的是字符串即saveToList(txt_end)

                if (!phone || !token) { //本地phone或者token丢失，也可以表示第一次使用
                    location.replace("/api/v2/weixinapi?openid=" + h_openid + "&phone=" + _phone + "&page=phonecode&way=1");
                    return;
                }
                e.target.className = "btn-gray";

                if (base.isFunc(lock.btnOrder.touchCB)) lock.btnOrder.touchCB(obj, failFn);
            };

            if (lock.prevHanlder) btn_call.removeEventListener('touchend', lock.prevHanlder, false);
            btn_call.addEventListener('touchend', lock.handler, false);

            lock.prevHanlder = lock.handler; // 当前event handler会是“上一个event handler”

            for (var i = 0, l = business.length; i < l; i++) {
                item = business[i];
                if (item.name !== biz.name && lock.current) {
                    if (base.isFunc(item.outCB)) item.outCB('out of diditaxi');
                }
            };
        };
        base.loadJS(biz.js, loaded);
    };

####3. 业务端需要将业务注入到dd.webappBiz命名空间下

	dd.webappBiz['diditaxi'] = {init:init};
	//注意这个init必须是一个function
	
####4. 业务端的init方法应该返回

        /**
         * 返回给平台的数据
         * @type {Object}
         */
        var ret = {
            btnOrder: {
                val: "叫出租车", // 按钮名称
                touchCB: touchCB // 按钮点击的回调函数，这个回调函数接受两个参数(opt, failFn)
            },
            outCB: function(xx) {
                alert(xx);
            }
        };
        
        
        其中opt为地理定位信息
        var obj = {
	          token: h_access_token.value, // token
	          phone: "phone", //兼容打车
	          openid: "openid", //兼容打车
	
	          lat: h_curr_lat.value, // 当前地点纬度
	          lng: h_curr_lng.value, // 当前地点精度
	
	          flat: h_from_lat.value, // 出发地纬度
	          flng: h_from_lng.value, // 出发地精度
	          from_name: h_from_name.value, // 出发地名称
	          from_address: h_from_addr.value, // 出发地地址
	
	          tlat: h_to_lat.value, // 目的地纬度
	          tlng: h_to_lng.value, // 目的地精度
	          to_name: txt_end.value, // 目的地名称
	          to_address: h_to_addr.value, // 目的地地址
	
	          cityid: h_cityid.value, // 城市ID
	          cityname: h_cityname.value, // 城市名称
	
	          from: txt_start.value, // 打车老数据-专车忽略即可
	          fromAddr: txt_start.value, // 打车老数据-专车忽略即可
	          to: txt_end.value, // 打车老数据-专车忽略即可 
	          toAddr: txt_end.value // 打车老数据-专车忽略即可
	      };
	      
	    其中failFn为发单失败回调函数 (txt) 接收txt文本信息参数
	    
