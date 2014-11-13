(function(window, undefined) {

    // dd.dialog不依赖于dd.base
    // 需要将dialog注册到dd命名空间下
    var dd = window.dd || {};
    if (dd.dialog) return dd.dialog;


    var d = {};

    var docElem = document.documentElement,
        docEleClientH = docElem.clientHeight,
        docEleClientW = docElem.clientWidth;

    var dvWall = null,
        dvWrap = null,
        dialog = null;
    /**
     * 判断一个对象是否为数组
     */
    var isArray = function(obj) {
        return (typeof Array.isArray) ? Array.isArray(obj) : (Object.prototype.toString.call(obj) === '[object Array]');
    };

    /**
     * 往body中插入div
     */
    var insertDom = function(newNode) {
        document.body.appendChild(newNode);
    };
    /**
     * util
     */
    var util = {
        /**
         * 初始化配置及生成dom元素
         */
        genDom: function(opts, div_wall, div_wrap) {
            if (!opts) return;

            if (Object.prototype.toString.call(opts, null) === '[object Object]') { // 传入的object
                opts.type = opts.type || "loading";
                opts.bg = opts.bg || "";
                opts.op = opts.op || "";

                opts.width = opts.width || "280px";
                opts.d_bg = opts.d_bg || "#fff";
                opts.d_op = opts.d_op || "";
                //alert(opts.d_bg);
                //生成弹出框背景样式&弹出框wrap样式
                opts.wallCss = "background:" + opts.bg + ";opacity:" + opts.op + ";filter:" + opts.filter + ";";
                opts.wrapCss = "text-align:center;width:" + opts.width + ";height:" + opts.height + ";opacity:" + opts.d_op + ";filter:" + opts.d_filter + ";" + "background: " + opts.d_bg + ";";

                div_wall.style.cssText = opts.wallCss;
                div_wrap.style.cssText = opts.wrapCss;

                //生成弹窗内容
                var html = "<div style='" + ((opts.type === 'loading') ? "padding:0px;" : "padding: 0px 6%;") + "'>" + util.genIcon(opts) + util.genTitle(opts) + util.genTip(opts) + util.genButtons(opts) + "</div>" + util.genClose(opts);
                div_wrap.innerHTML = html;

            } else if (Object.prototype.toString.call(opts, null) === '[object String]') { // 配置为html
                div_wrap.innerHTML = opts;
            } else if (Object.prototype.toString.call(opts, null) === '[object HTMLDivElement]') { // 传入的dom
                div_wrap.style.cssText = "display:inline-block;width:280px;background-color:#fff;";
                opts.style.display = "inline-block";
                div_wrap.appendChild(opts);
            }

        },
        /**
         * 生成icon相关的html
         */
        genIcon: function(opts) {
            //默认无icon,true为默认icon
            if (!opts.icon) {
                return "";
            }
            var res = "";
            opts.icon = opts.icon || {};
            var w = opts.icon.width || "8px",
                h = opts.icon.height || "36px",
                url = opts.icon.url || "/static/webapp/src/images/i-plaint.png";
            var margin = "",
                icon = "",
                cssText = "";
            if (opts.type === 'loading') {
                url = opts.icon.url || "http://static.xiaojukeji.com/webapp/images/loading_2.gif"
                margin = "margin:36px 0 10px";
                cssText = 'display:inline-block;width:30px;height:30px;background:url(' + url + ') no-repeat;background-size:30px 30px;';

            } else {
                margin = "margin:24px 0 12px";
                cssText = 'display:inline-block;width:60px;height:60px;background-color:#f0f0f0;background-size:60px 60px;border-radius:50%;'
                icon = '<span style="vertical-align:middle;display:inline-block;height:100%;"></span><img src=' + url + ' style="width:' + w + ';height:' + h + ';vertical-align:middle;" />';
            }
            res = '<p  style="' + margin + '"><span style="' + cssText + '">' + icon + '</span></p>';
            return res;
        },

        /**
         * Title的样式和HTML
         */
        genTitle: function(opts) {
            opts.title = opts.title || {};
            var color = opts.title.color || "#ff8a01",
                size = opts.title.size || "1.9rem";
            return '<p style="margin-bottom: 5px;color:' + color + ';font-size:' + size + ';">' + (opts.title.txt || "") + '</p>';
        },

        /**
         * 生成提示信息
         */
        genTip: function(opts) {
            if (opts.title && opts.title.txt) {
                opts.tip.color = opts.tip.color || "#666";
                opts.tip.size = opts.tip.size || '1.4rem'
            } else {
                opts.tip.color = opts.tip.color || "#333";
                opts.tip.size = opts.tip.size || '1.6rem';
            }
            return opts.tip ? '<p style="' + ((opts.type !== "loading") ? "text-align:center;" : "") + 'line-height:1.9rem;color:' + opts.tip.color + ';font-size:' + opts.tip.size + ';">' + opts.tip.txt + '</p>' : "";
        },
        /**
         * 右上角关闭按钮
         */
        genClose: function(opts) {
            return opts.close ? '<a class="d-close" href="javascript:void(0);"></a>' : '';
        },
        /**
         * 尾部红包
         */
        genButtons: function(opts) {
            var res = "";
            if (opts.btns && isArray(opts.btns)) {
                res += '<div style="padding:20px 0;">';
                for (var i = 0, l = opts.btns.length; i < l; i++) {
                    var btn = opts.btns[i];
                    if (btn && opts.type === 'alert') {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '">' + btn.val + '</a>';
                    } else if (btn && opts.type === 'confirm') { //确认 取消两个按钮
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" style="width: 43%; height: 40px; line-height: 40px; margin:0 3%;">' + btn.val + '</a>';
                    } else { //
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" style="margin:5px 0;">' + btn.val + '</a>';
                    }
                }
                res += '</div>';
            }
            //按钮下面附加内容
            if (opts.ext && typeof opts.ext === 'string') {
                res += opts.ext;
            }
            return res;
        },

        /**
         * 为按钮注册事件
         */
        addEvents: function(opts) {
            var btn = null;
            if (opts.close) {
                var close = document.getElementsByClassName("d-close")[0];
                close.addEventListener("click", function() {
                    dialog.hide();
                }, false);
            }
            if (!isArray(opts.btns) || !opts.btns.length) return;
            for (var i = 0, l = opts.btns.length; i < l; i++) {
                btn = opts.btns[i];
                if (btn) {
                    var ev = btn.event || "click",
                        ele = document.getElementById(btn.id);
                    if (ele) {
                        ele.removeEventListener(ev, btn.handler, false);
                        ele.addEventListener(ev, btn.handler, false);
                    }
                }
            }
        }
    };

    /**
     * Dialog对象应该使用强制使用new模式
     */
    var Dialog = function(opts) {
        if (!(this instanceof Dialog)) {
            dialog = new Dialog(opts);
            return dialog; // 当不使用new的时候，会走到前一句，然后再走到dialog.fn.init,然后再执行return
        } else {
            new Dialog.fn.init(opts);
        }
    };

    /**
     * Dialog prototype
     * @type {Function}
     */
    Dialog.fn = Dialog.prototype = {
        constructor: Dialog,
        init: function(opts) {
            if (!opts) return;

            var div_wall = document.createElement('div');
            var div_wrap = document.createElement("div");
            div_wall.id = "d-wall";
            div_wrap.id = "d-wrap";

            //初始化配置 生成内容HTML
            util.genDom(opts, div_wall, div_wrap);

            //删除已存在的弹窗
            dvWall && document.body.removeChild(dvWall);
            dvWrap && document.body.removeChild(dvWrap);

            //插入dom
            insertDom(div_wall);
            insertDom(div_wrap);

            dvWall = div_wall;
            dvWrap = div_wrap;

            if (Object.prototype.toString.call(opts, null) === '[object Object]') {
                util.addEvents(opts);
            }
        },
        show: function() {
            var that = this;
            if (dvWall && dvWrap) {
                that.reset();
                dvWall.style.display = "block";
                dvWrap.style.display = "inline-block";

                window.addEventListener("resize", reset, false);
                window.addEventListener("scroll", reset, false);

                function reset(event) {
                    window.removeEventListener(event.type, reset, false); //先remove event
                    that.reset.call(that);
                }
            }
        },
        hide: function() {
            if (dvWall && dvWrap) {
                dvWall.style.display = "none";
                dvWrap.style.display = "none";
            }
        },
        reset: function() {
            if (dvWall && dvWrap) {
                dvWrap.style.top = (docEleClientH - dvWrap.clientHeight - 20) / 2 + "px";
                dvWrap.style.left = (docEleClientW - dvWrap.clientWidth) / 2 + "px";
                var scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //考虑到页面滚动和窗体重置
                dvWall.style.width = docEleClientW + "px";
                dvWall.style.height = scrollH + "px";
            }
        }
    };


    /**
     * alert弹出框
     */
    d.alert = function(cfg) {
        var opts = {};
        if (typeof arguments[0] === "string" && arguments[0]) {
            opts.title = arguments[1] || "";
            opts.tip = arguments[0];
            opts.btn = {
                val: arguments[2] || "我知道了"
            };
        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
        }

        dialog = Dialog({
            type: "alert",
            icon: opts.icon || {
                url: "/static/webapp/src/images/i-plaint.png",
                width: "8px",
                height: "36px"
            },
            title: {
                txt: opts.title
            },
            tip: {
                txt: opts.tip
            },
            btns: [{
                id: "btn-close",
                kls: 'btn-orange',
                event: "click",
                val: (opts.btn && opts.btn.val) || "我知道了",
                handler: function(ev) {
                    dialog.hide();
                    if (typeof opts.btn.handler === 'function') {
                        opts.btn.handler(ev);
                    }
                }
            }]
        });
        dialog.show();
    };

    /**
     * confirm dialog
     */
    d.confirm = function(cfg) {
        var opts = {};

        if (typeof arguments[0] === 'string' && arguments[0]) {
            opts.text = arguments[0] || "";
            opts.confirm = {};
            opts.confirm.handler = arguments[1];

        } else if (cfg && typeof cfg === 'object') {
            opts = cfg;
        }

        var cancel = opts.cancel || {};
        var confirm = opts.confirm || {};

        dialog = Dialog({
            type: "confirm",
            tip: {
                txt: opts.text
            },
            icon: opts.icon || {
                url: "/static/webapp/src/images/i-plaint.png"
            },
            btns: [{
                id: cancel.id || "btn-cancel",
                val: cancel.val || "取消",
                kls: cancel.kls || "btn-white",
                event: cancel.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof cancel.handler === 'function') {
                        cancel.handler(e);
                    }
                }
            }, {
                id: confirm.id || "btn-ok",
                val: confirm.val || "确定",
                kls: confirm.kls || "btn-orange",
                event: confirm.event || "click",
                handler: function(e) {
                    dialog.hide();
                    if (typeof confirm.handler === 'function') {
                        confirm.handler(e);
                    }
                }
            }],
            ext: opts.ext
        });
        dialog.show();
    };

    /**
     * Loading Dialog
     */
    d.loading = function(cfg) {
        var opts = {};
        if (typeof arguments[0] !== "object") {
            opts.text = arguments[0];
            opts.time = arguments[1] || 0
        } else {
            opts = cfg;
        }
        dialog = Dialog({
            type: "loading",
            bg: "#fff",
            d_bg: "#0c0d0d",
            d_op: "0.7",
            width: "140px",
            height: "140px",
            icon: true,
            tip: {
                txt: opts.text || "正在加载",
                color: "#fff",
                size: "14px"
            }
        });

        dialog.show();

        if (!opts.time) {
            opts.time = 5000;
        }
        window.setTimeout(function() {
            dialog.hide();
            console.log(typeof opts.hideCB === 'function')
            if (typeof opts.hideCB === 'function') {
                opts.hideCB();
            }
        }, opts.time);
    };

    /**
     * 扁平化的loading
     */
    d.flatLoading = function(cfg) {
        var opts = {};
        if (typeof arguments[0] !== "object") {
            opts.text = arguments[0];
            opts.time = arguments[1] || 0
        } else {
            opts = cfg;
        }
        dialog = Dialog({
            type: "loading",
            bg: "#fff",
            op: '1',
            d_bg: "#fff",
            d_op: "1",
            width: "140px",
            height: "140px",
            icon: true,
            tip: {
                txt: opts.text || "",
                color: "#666",
                size: "14px"
            }
        });

        dialog.show();

        if (!opts.time) {
            opts.time = 5000;
        }
        window.setTimeout(function() {
            dialog.hide();
            if (typeof opts.hideCB === 'function') {
                opts.hideCB();
            }
        }, opts.time);
    };

    /**
     * 滴滴打车logo的loading
     */
    d.logoLoading = function(time, hideCB) {
        dialog = Dialog('<div class="loading-car"><div class="bg"></div><div class="loading-car-icon"></div></div>');
        dialog.show();
        if (!time) {
            time = 5000;
        }
        setTimeout(function() {
            dialog.hide();
            if (typeof hideCB === 'function') {
                hideCB();
            }
        }, time);
    };

    /** 专车导流弹框
        cfg: {
            title: "",
            content: "",
            okFn: fn,
            cancel: fn
        }
     */
    d.guideUdache = function(cfg) {
        if (!cfg) return;

        cfg.title = cfg.title || "";
        cfg.content = cfg.content || "";
        cfg.cancelVal = cfg.cancelVal || "取消叫车";
        cfg.confirmlVal = cfg.confirmlVal || "去看看";
        cfg.image_url = "http://static.xiaojukeji.com/webapp/images/ad_biz.png";
        var dialog = Dialog({
            type: "confirm",
            tip: {
                txt: "<span style='display:block;font-size:2.3rem;color:#ff8903;line-height:30px;margin-top:160px' >" + cfg.title + "</span><span style='color:#666;font-size:1.2rem;' >" + cfg.content + "</span>"
            },
            d_bg: "url(" + cfg.image_url + ") no-repeat #fff;background-size:100% auto;",
            height: "auto",
            close: cfg.close || false,
            btns: [{
                id: "btn-cancel",
                val: cfg.cancelVal,
                kls: "btn-white",
                event: "click",
                handler: function(e) {
                    dialog.hide();
                    cfg.cancelFn && cfg.cancelFn();
                }
            }, {
                id: "btn-ok",
                val: cfg.confirmlVal,
                kls: "btn-orange",
                event: "click",
                handler: function(e) {
                    dialog.hide();
                    cfg.okFn && cfg.okFn();
                }
            }]
        });
        dialog.show();
    };

    d.Fn = Dialog;

    window.dd = dd; // 注册dd对象到window下
    dd.dialog = d; // 注册d到dialog命名空间

})(window);
