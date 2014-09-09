相关资料

1. [JavaScript获取DOM元素位置和尺寸大小](http://www.cnblogs.com/dolphinX/archive/2012/11/19/2777756.html)
2. [viewport-pc篇](http://www.w3cfuns.com/forum.php?mod=viewthread&tid=5598058)
3. [viewport-mobile篇](http://www.quirksmode.org/mobile/viewports2.html)

##1. window对象

_____

####1.1 window.screenLeft | window.screenTop | window.screenX | window.screenY

*表示窗口相对于屏幕左边和上边的位置*

1. IE，Safari，Chrome，Opera都实现了这个功能。
2. FF提供类似的screenX，screenY（Safari，Chrome也实现了此属性）
3. Opera也实现了screenX和screenY，但与screenLeft和screenTop并不对应，不建议使用。
4. IE，Opera中screenLeft表示从 **屏幕左边** 到由window对象（最外层window，也就是top）表示的 **页面可见区域** 的距离，及时浏览器紧贴屏幕左上方，screenTop会等于浏览器工具栏的高度。
5. Safari，Chrome，Firefox中保存的总是整个浏览器相对于屏幕的坐标值。
6. Safari，Chrome，Firefox保使用返回每个框架的 top.screenX，和 top.screenY 值，即使在页面由于被设置了外边距而发生偏移的情况下，相对于window对象使用screenX，和screenY每次也会返回相同的值。而IE，Opera则会给出框架相对于屏幕边界的精确左边值。

*代码如下：*

	var obj = {
	    leftPos: (typeof window.screenLeft === "number") ? window.screenLeft : window.screenX,
	    topPos: (typeof window.screenTop === "number") ? window.screenTop : window.screenY,
	};



####1.2 window.moveTo | window.moveBy

*精确的将窗口移动到一个新的位置。*

1. `moveTo(x,y);` 接收新位置的x，y坐标
2. `moveBy(leftPx,topPx);` 接收水平方向和垂直方向的像素数。
3. 这两个方法可以被浏览器禁用。

*代码如下*

	window.moveTo(0, 0); //将窗口移动到左上角
	window.moveBy(0, 100); //将窗口向下移动100像素

####1.3 window.innerWidth | window.innerHeight | window.outerWidth | window.outHeight

*确定一个窗口的大小－－跨浏览器实现可不是件容易的事情*

1. IE9+，FF，Chrome，Safari，Opera都提供了这四个属性。
2. IE9，Safari，FF中，outerHeight，outerWidth返回浏览器本身的尺寸（无论是从最外层的window对象访问还是从某个框架）
3. Opera中，outerWidth，outerHeight返回**页面视图容器**的大小，而innerWidth，innerHeight则表示**容器中页面视图区的大小**（减去边框宽度）。
4. Chrome中，outerWidth和innerHeight返回相同的值，都表示**视口（viewport）**的大小。

####1.4 document.documentElement.clientWidth | document.document.clientHeight | document.body.clientWidth | document.body.clientHeight

*跨浏览器获得窗口的大小不容易，但是取得viewport的大小却可行*

1. 五大浏览器都实现了`document.documentElement.clientWidth`和`document.document.clientHeight`。
2. IE6中必须在标准模式下才有效。如果是混杂模式，必须通过`document.body.clientWidth `和` document.body.clientHeight` 取得相同信息。
3. Chrome下的混杂模式，对应的两种属性都取得相同的视口大小。


*代码如下*

	/**
	 * 获得窗口viewport的大小
	 * @param  {[type]} argument [description]
	 * @return {[type]}          [description]
	 */
	var viewPortSize = function(argument) {
	    var res = {
	        width: window.innerWidth,
	        height: window.innerHeight
	    };
	
	    if (typeof res.width !== "number") {
	        if (document.compatMode == 'CSS1Compat') { //标准模式
	            res.width = document.documentElement.clientWidth;
	            res.height = document.documentElement.clientHeight;
	        } else {
	            res.width = document.body.clientWidth;
	            res.height = document.body.clientHeight;
	        }
	    }
	    return res;
	};
	
####1.5 window.resizeTo | window.resizeBy

**调整浏览器窗口的大小**

1. 只能对最外层框架的window对象使用。
2. 接收两个参数，其中resizeTo表示接收新窗口的新宽度和新高度，而resizeBy表示接收新窗口与原窗口的差。

*代码如下*

	window.resizeTo(100,100); //窗口为100*100像素了
	window.resizeBy(100,50); //在原来的基础上宽度增加100像素，高度增加50像素
	
	
##2. screen对象(不常用这个对象)

____
	
####2.1 screen.width | screen.height

*表示屏幕的像素高度和像素宽度*

####2.2 screen.top | screen.left

*表示当前屏幕距上边、坐标的像素距离*
	

##3. 各种event

____

####3.1 click

##4. 请看神图

![](./images/dom-width-heigth.gif)