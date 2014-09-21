(function(dd, undefined) {

    // 避免命名空间冲突
    // 也为了避免更多的closure
    if (!dd || !dd.base) return;
    if (dd.geo) return dd.geo;

    var geo = dd.geo || {};

    var wxGeoLog = [],
        h5GeoLog = [],
        wxTimoutObj = 0,
        isWxTimeout = false;

    /**
     * 微信定位
     */
    geo.weixin = function(wxJsObj, opt) {
        if (!wxJsObj) return; // 没有微信对象则退出
        opt = opt || {};

        var that = this;
        var oldTimeStamp = "",
            oldNonceStr = "",
            wxGeoST = new Date().getTime(); // 微信定位开始时间

        //获取appid
        var getAppid = function() {
            return opt.appid || "wx69b6673576ec5a65"; //线上
            //return "wx9018279480c3f08e" //线下 
        };

        //获取随机数－－用于微信定位
        var getNonceStr = function() {
            var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
                maxPos = chars.length,
                noceStr = "";
            for (i = 0; i < 32; i++) noceStr += chars.charAt(Math.floor(Math.random() * maxPos));
            oldNonceStr = noceStr;
            return noceStr;
        };

        //获取时间戳－－用于微信定位
        var getTimeStamp = function() {
            var nowTimeStamp = new Date().getTime().toString();
            oldTimeStamp = nowTimeStamp;
            return nowTimeStamp;
        };

        // 计算签名－－用于微信定位
        var getSign = function() {
            var time_stamp = getTimeStamp(),
                nonce_str = getNonceStr(), //h_access_token.value,
                keyValPairs = "accesstoken=" + opt.accesstoken + "&appid=" + getAppid() + "&noncestr=" + nonce_str + "&timestamp=" + time_stamp + "&url=" + location.href + "";
            return CryptoJS.SHA1(keyValPairs).toString(); // 调用sha1.js
        };

        // 微信定位必备数据
        var postData = {
            "appId": getAppid(),
            "scope": "jsapi_location",
            "signType": "SHA1",
            "addrSign": getSign(),
            "timeStamp": oldTimeStamp,
            "nonceStr": oldNonceStr,
            "type": "wgs84"
        };

        // 微信定位回调函数
        var callback = function(res) {
            // alert(res);
            if (isWxTimeout) { //微信定位超时
                wxGeoLog.push("&w_type=weixin&w_status=timeout&w_time=" + (new Date().getTime() - wxGeoST)); //收集定位数据
                if (typeof opt.timeoutCB === 'function') opt.timeoutCB(res)
                return;
            }
            if (res.err_msg == "geo_location:ok") { //通过微信定位成功
                that.isGeoSucc = true;

                var maptype = "";
                dd.base.diffPlatform({
                    ios: function() {
                        maptype = "wgs84";
                    },
                    android: function() {
                        maptype = (res.type && res.type === "wgs84") ? "wgs84" : "gcj02";
                    }
                });

                var d = {
                    lat: res.latitude, //纬度
                    lng: res.longitude, //精度
                    maptype: maptype //坐标类型baidu|soso|wgs84|gcj02
                };
                wxGeoLog.push("&w_type=weixin&w_status=succ&lat=" + res.latitude + "&lng=" + res.longitude + "&maptype=" + maptype + "&w_time=" + (new Date().getTime() - wxGeoST));

                if (typeof opt.succCB === 'function') opt.succCB(d);
            } else {
                wxGeoLog.push("&w_type=weixin&w_status=failed&w_time=" + (new Date().getTime() - wxGeoST));
                if (typeof opt.errorCB === 'function') opt.errorCB(res);
            }
            clearTimeout(wxTimoutObj); // 清除掉超时对象
        };

        var timeout = opt.timeout || {};
        if (typeof opt.loading === 'function') opt.loading();
        if (typeof timeout.CB === 'function') {
            wxTimoutObj = setTimeout(function() {
                isWxTimeout = true;
                timeout.CB();
            }, timeout.cnt || 6000); // 设定微信定位超时对象
        }

        WeixinJSBridge.invoke('geoLocation', postData, callback); //调用微信定位接口
        that.wxGeoLog = wxGeoLog;
    };

    /**
     * H5定位
     */
    geo.h5 = function(opt) {
        opt = opt || {};

        var that = this,
            h5GeoST = new Date().getTime(),
            timeObj = opt.timeout || {};

        //H5定位成功回调函数
        var succ = function(pos) {
            that.isGeoSucc = true;
            h5GeoLog.push("&w_type=h5&w_status=succ&lat=" + pos.coords.latitude + "&lng=" + pos.coords.longitude + "&maptype=wgs84&w_time=" + (new Date().getTime() - h5GeoST));
            var d = {
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
                maptype: "wgs84"
            };
            if (typeof opt.succCB === 'function') opt.succCB(d);
        };

        //h5定位失败回调--失败包括超时、或者用户不允许
        var error = function(err) {
            var st = ""
            switch (err.code) {
                case err.TIMEOUT:
                    st = "timeout";
                    if (typeof timeObj.CB === 'function') timeObj.CB(err);
                    break;
                case err.POSITION_UNAVAILABLE:
                    st = "position_unavailable";
                    break;
                case err.PERMISSION_DENIED:
                    if (typeof opt.deniedCB === 'function') opt.deniedCB(err);
                    st = 'permission_denied';
                    break;
                case err.UNKNOWN_ERROR:
                    st = "unknow_error";
                    break;
            };
            h5GeoLog.push("&w_type=h5&w_status=" + st + "&w_time=" + (new Date().getTime() - h5GeoST));
        };

        if (typeof opt.loading === 'function') opt.loading(); // 提示正在加载中
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(succ, error, {
                enableHighAccuracy: true,
                timeout: timeObj.cnt || 5000,
                maximumAge: 2000
            });
        } else {
            base.loadJS("/static/webapp/gears_init.min.js", function() {
                if (!window.google || !google.gears) return;
                try {
                    var gears = google.gears.factory.create('beta.location');
                    gears.getCurrentPosition(succ, error, {
                        enableHighAccuracy: true,
                        timeout: timeObj.cnt || 5000,
                        maximumAge: 2000
                    });
                } catch (e) {}
            });
        }

        that.h5GeoLog = h5GeoLog;
    };

    /**
     * 定位总入口函数
     */
    geo.location = function(wxJsObj, opt) {
        opt = opt || {};
        var that = this;

        if (wxJsObj) {
            that.weixin(wxJsObj, opt.weixin); // 调用微信定位接口
        } else {
            that.h5(opt.h5);
        }
    };

    geo.isGeoSucc = false; // 初始化定位失败
    dd.geo = geo; // 注册geo到dd命名空间下
})(window.dd);