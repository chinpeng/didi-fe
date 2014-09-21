####didi.alert

1. didi.alert(text, title, btnVal);

		text: 弹出框的提示文案 // need
		title: 弹出框的标题 // not need
		btnVal: 弹出框按钮的文案 // not need

2. didi.alert({...});

		{
		    icon: {   //弹出框的icon
		        url: "",  
		        width: "",
		        heigth: ""
		    },
		    title: "", // 标题 not need
		    tip: "", // 提示 need
		    btn: {  // 按钮，alert弹出框上只能有1个按钮
		        val: "", // button的value
		        handler: function(e) {} // 按钮事件监听函数
		    }
		}
		
3. example

		didi.alert("当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？");
	    didi.alert("当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？","LET ME FUCK YOU");
	    didi.alert("当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？", "LET ME FUCK YOU", "我要确定！");
		
		didi.alert({
		    icon:{
		    	url:"",
		    	width:"",
		    	heigth:""
			}
           tip: "当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？",
           title: "",
           btn: {
               val: "HELLO",
               handler: function(ev) {
                   // alert("HELLO");
               }
           }
       });

	
####didi.confirm

1. didi.confirm(text, confirm);
	
		text: 弹出框的文案 // need
		confirm: 确认按钮的回调函数 // need

2. didi.confirm({...})
		
        didi.confirm({
            text: "当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？", //need
            icon: { // not need
            	url:"",
            	width:"",
            	height:"",
            },
            cancel: {
                id: "btn-cancel", // not need
                val: "CANCEL", // not need
                kls: "btn-white", // not need
                event: "click", // not need
                handler: function(e) { // not need
                    console.log('canceld');
                }
            },
            confirm: {
                id: "btn-ok", // not need
                val: 'CONFIRM', // not need
                kls: "btn-orange", // not need
                event: "click", // not need
                handler: function() { // not need
                    console.log('confirmed'); 
                }
            }
        })
		
		
####didi.loading

1. didi.loading(text)
		
		text: //文案提示，默认 "加载中..."
		
2. didi.loading({ text:"",time:"",hideCB: function(){} });

		{
			text:"",
			time: // 消失时间
			hideCB: //消失时的回调函数
		}


3. example

		 1. didi.loading("加载中...");
		 
         2. didi.loading({
              text: "加载中...",
              time: 2000,
              hideCB: function() {
                  alert("Hello");
              }
          })



####var dialog = new Dialog({});

1.config

		{
			type:""  // 弹窗类型 alert | loading | confirm 默认alert
			bg:"", // bgcolor 整个背景颜色 | #000
			op:"", // opacity 整个背景透明度 | 0.3
			d_bg:"", // 弹出框的背景颜色 | #0c0d0d
			d_op:"", // 弹出框透明度 | 0.7
			width:"", // 宽度 | 280px
			icon:{ // icon-alert
				width:"", // 8px
				height:"", // 36px
				url:"" // /static/webapp/images/i-plaint.png
			},
			title:{ // 标题
				txt:"", 
				size:"", // 1.9rem
				color:"" // #ff8a01
			},
			tip:{ // 提示
				txt:"",
				size:"", // 1.6rem
				color:"" // #333
			},
			btns:[{ // 按钮
				id:"", // btn-know
				val:"", // 我知道了
				kls:"", // btn-orange
				event:"", // click
				handler:function(){}
			}],
			ext:{ // 扩展信息
				html:"",
				id:"",
				val:"",
				event:"",
				handler:function(){}
			}
		}
		
2. use
	
		var dialog = didi.dialog({
	              type: "threeSel",
	              tip: {
	                  txt: "当前不是WIFI网络, 下载离线地图包需要18.2m流量，继续下载吗？"
	              },
	              icon: {
	                  url: "/static/webapp/images/i-plaint.png"
	              },
	              btns: [{
	                  id: "btn-close",
	                  val: "给滴滴好评",
	                  kls: "btn-orange",
	                  event: "click",
	                  handler: function(ev) {
	                      dialog.hide();
	                  }
	              }, {
	                  id: "btn-xx",
	                  val: "下次再评",
	                  kls: "btn-white",
	                  event: "click",
	                  handler: function(ev) {
	                      dialog.hide();
	                  }
	              }, {
	                  id: "btn-oo",
	                  val: "无情的拒绝",
	                  kls: "btn-white",
	                  event: "click",
	                  handler: function(ev) {
	                      dialog.hide();
	                  }
	              }]
	          });
	          dialog.show();