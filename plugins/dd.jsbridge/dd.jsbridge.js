'use strict';
(function(window) {

    // 默认分享信息
    var default_data = {
        share_url: 'http://www.xiaojukeji.com',
        share_icon_url: 'http://static.xiaojukeji.com/webapp/images/taxi.png',
        share_img_url: 'http://diditaxi.com.cn/share/images/na_landing_kuhang/02.png',
        share_title: '滴滴一下，美好出行',
        share_content: '滴滴打车，美好出行',
        share_from: ''
    };

    // 连接DidiJSBridge
    var connectDidiJSBridge = function(callback) {
        if (typeof DidiJSBridge !== 'undefined') {
            callback(DidiJSBridge);
        } else {
            document.addEventListener('DidiJSBridgeReady', function() {
                callback(DidiJSBridge);
            }, false);
        }
    };

    // 返回对象
    var didi = {
        initShare: function(shareData, callback) {
            if (!shareData) {
                shareData = default_data;
            }
            if (typeof callback !== 'function') {
                callback = function() {};
            }

            // 人口配置
            var entranceCfg = {
                buttons: [{
                    type: 'share_weixin_timeline',
                    name: '微信朋友圈',
                    data: shareData,
                    callback: callback
                }, {
                    type: 'share_weixin_appmsg',
                    name: '微信好友',
                    data: shareData,
                    callback: callback
                }, {
                    type: 'share_sina_weibo',
                    name: '新浪微博',
                    data: shareData,
                    callback: callback
                }, {
                    type: 'page_refresh',
                    name: '刷新'
                }]
            };

            // 连接DidiJSBridge
            // 初始化信息
            connectDidiJSBridge(function(bridge) {
                if (typeof bridge === 'undefined') {
                    return;
                }
                bridge.callHandler('init_entrance', JSON.stringify(entranceCfg));
                bridge.callHandler('show_entrance');
            });

        }
    };

    window.didi = didi;

})(window);