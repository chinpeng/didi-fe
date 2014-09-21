(function(window, undefined) {

    // dd.dialog不依赖于dd.base
    // 需要将dialog注册到dd命名空间下
    var dd = window.dd || {};
    if (dd.dialog) return dd.dialog;


    var d = dd.dialog || {};


    var docElem = document.documentElement,
        docEleScrollT = docElem.scrollTop,
        docEleScrollL = docElem.scrollLeft,
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
        // var firstScriptInBody = document.getElementsByTagName("script")[0];
        document.body.appendChild(newNode);
        // return firstScriptInBody ? document.body.insertBefore(newNode, firstScriptInBody) : document.body.appendChild(newNode);
    };

    /**
     * 初始化配置
     */
    var initOpts = function(opts) {
        if (!opts) return;

        opts.type = opts.type || "loading";
        opts.bg = opts.bg || "#000";
        opts.op = opts.op || "0.3";

        opts.width = opts.width || "280px";
        opts.d_bg = opts.d_bg || "#fff";
        opts.d_op = opts.d_op || "";

        // opts.filter = opts.op ? "alpha(opacity=" + (opts.op * 100) + ")" : "alpha(opacity=20)";
        // opts.d_filter = opts.d_op ? "alpha(opacity=" + (opts.d_op * 100) + ")" : "alpha(opacity=20)";
        //生成弹出框背景样式&弹出框wrap样式
        opts.wallCss = "position:absolute;left:0;top:0;display:none;z-index:9998;background-color:" + opts.bg + ";opacity:" + opts.op + ";filter:" + opts.filter + ";";
        opts.wrapCss = "position:fixed;text-align:center;border-radius:5px;z-index:9999;width:" + opts.width + ";height:" + opts.height + ";background-color:" + opts.d_bg + ";opacity:" + opts.d_op + ";filter:" + opts.d_filter + ";" + ((opts.type === 'loading') ? "padding:0;" : "") + "";
    };

    var util = {

        /**
         * 生成icon相关的html
         */
        genIcon: function(opts) {
            var res = "";
            opts.icon = opts.icon || {};
            var w = opts.icon.width || "8px",
                h = opts.icon.height || "36px",
                url = opts.icon.url || "./imgs/i-plaint.png";
            var margin = "",
                icon = "",
                cssText = "";
            if (opts.type !== 'loading') {
                margin = "margin:24px 0 12px";
                cssText = 'display:inline-block;width:60px;height:60px;background-color:#f0f0f0;background-size:60px 60px;border-radius:50%;'
                icon = '<span style="vertical-align:middle;display:inline-block;height:100%;"></span><img src=' + url + ' style="width:' + w + ';height:' + h + ';vertical-align:middle;" />'
            } else {
                url = opts.icon.url || "http://static.xiaojukeji.com/webapp/images/loading_2.gif"
                margin = "margin:36px 0 10px";
                cssText = 'display:inline-block;width:30px;height:30px;background:url(' + url + ') no-repeat;background-size:30px 30px;';
            }
            res = '<p style="' + margin + '"><span style="' + cssText + '">' + icon + '</span></p>';
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
                    } else if (btn && opts.type === 'confirm') {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" style="width: 43%; height: 40px; line-height: 40px; margin:0 3%;">' + btn.val + '</a>';
                    } else {
                        res += '<a class="' + btn.kls + '" id="' + btn.id + '" sdscs style="margin:5px 0;">' + btn.val + '</a>';
                    }
                }
                res += '</div>';
            }
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

            if (Object.prototype.toString.call(opts, null) === '[object Object]') {
                initOpts(opts); //初始化配置
                div_wall.style.cssText = opts.wallCss;
                div_wrap.style.cssText = opts.wrapCss;

                var html = "<div style='" + ((opts.type === 'loading') ? "padding:0px;" : "padding: 0px 6%;") + "'>" + util.genIcon(opts) + util.genTitle(opts) + util.genTip(opts) + util.genButtons(opts) + "</div>";
                div_wrap.innerHTML = html;

            } // 配置为json对象

            if (Object.prototype.toString.call(opts, null) === '[object String]') {
                div_wall.style.cssText = "display:none;position:absolute;left:0;top:0;display:none;z-index:9998;background-color:#000;opacity:0.3";
                div_wrap.style.cssText = "position:absolute;z-index:9999;";
                div_wrap.innerHTML = opts;
            } // 配置为html

            if (Object.prototype.toString.call(opts, null) === '[object HTMLDivElement]') {
                div_wall.style.cssText = "position:absolute;left:0;top:0;display:none;z-index:9998;background-color:#000;opacity:0.3";
                div_wrap.style.cssText = "position:absolute;z-index:9999;display:inline-block;border-radius:5px;padding:0;width:280px;background-color:#fff;";
                opts.style.display = "inline-block";
                div_wrap.appendChild(opts);
            } // 传入的dom div元素


            if (dvWall) {
                document.body.removeChild(dvWall);
                dvWall = null;
            }
            if (dvWrap) {
                document.body.removeChild(dvWrap)
                dvWrap = null;
            }

            if (!dvWall) {
                insertDom(div_wall);
                dvWall = document.getElementById('d-wall');

            }
            if (!dvWrap) {
                insertDom(div_wrap);
                console.log("init" + document.body.scrollHeight);
                dvWrap = document.getElementById('d-wrap');
                if (Object.prototype.toString.call(opts, null) === '[object Object]') {
                    util.addEvents(opts);
                }
            }

        },
        show: function() {
            var that = this;
            if (dvWall && dvWrap) {
                that.reset();
                dvWall.style.display = "block";
                dvWrap.style.display = "inline-block";

                window.addEventListener("resize", function() {
                    that.reset.call(that);
                }, false);
                window.addEventListener("scroll", function() {
                    that.reset.call(that);
                }, false);
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
                var p = this._dialogPosi();
                console.log("reset" + document.body.scrollHeight);
                var scrollH = document.body.scrollHeight || document.documentElement.scrollHeight; //考虑到页面滚动和窗体重置

                dvWall.style.width = docEleClientW + "px";
                dvWall.style.height = scrollH + "px";



                dvWrap.style.top = p.top + "px";
                dvWrap.style.left = p.left + "px";
            }
        },
        _dialogPosi: function() {
            var h = dvWrap.clientHeight,
                w = dvWrap.clientWidth;
            var scrollT = document.body.scrollTop || document.documentElement.scrollTop;
            return {
                top: scrollT + (docEleClientH - h - 20) / 2,
                left: docEleScrollL + (docEleClientW - w) / 2
            };
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

        dialog = new Dialog({
            type: "alert",
            icon: opts.icon || {
                url: "./imgs/i-plaint.png",
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

        dialog = new Dialog({
            type: "confirm",
            tip: {
                txt: opts.text
            },
            icon: opts.icon || {
                url: "./imgs/i-plaint.png"
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
        dialog = new Dialog({
            type: "loading",
            bg: "#fff",
            d_bg: "#0c0d0d",
            d_op: "0.7",
            width: "140px",
            height: "140px",
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
        dialog = new Dialog({
            type: "loading",
            bg: "#fff",
            op: '1',
            d_bg: "#fff",
            d_op: "1",
            width: "140px",
            height: "140px",
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
        dialog = new Dialog('<div class="loading-car"><div class="bg"></div><div class="loading-car-icon"></div></div>');
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
    d.Fn = Dialog;

    window.dd = dd; // 注册dd对象到window下
    dd.dialog = d; // 注册d到dialog命名空间

})(window);