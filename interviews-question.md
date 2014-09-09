##面试题提纲
###一、CSS

1. css选择器
2. Word-wrap
3. Text-overflow
4. 强制文字一行显示，多余部分用…代替 white-space:nowrap; word-break: keep-all; overflow:hidden; text-overflow:ellipsis;
5. position
6. 块级元素和行内元素
7. 标准盒子模型和IE盒子模型（包括padding和border）
8. css伪类
9. 响应式页面布局经验
10. 动手写css框架的思路
11. bootstrap
12. less
13. yui的reset.css


###二、HTML


1. html声明，html5的声明方式
2. html语义化
3. label跟span的区别
4. 元素垂直居中的方法最简单的line-height与height相同
5. 浏览器渲染html的整个过程1）用户输入网址，浏览器向服务器发出请求，服务器返回html文件；2）浏览器开始载入html代码，发现＜head＞标签内有一个＜link＞标签引用外部CSS文件；3）浏览器又发出CSS文件的请求，服务器返回这个CSS文件；4）浏览器继续载入html中＜body＞部分的代码，并且CSS文件已经拿到手了，可以开始渲染页面了；5）浏览器在代码中发现一个＜img＞标签引用了一张图片，向服务器发出请求。此时浏览器不会等到图片下载完，而是继续渲染后面的代码；6）服务器返回图片文件，由于图片占用了一定面积，影响了后面段落的排布，因此浏览器需要回过头来重新渲染这部分代码；7）浏览器发现了一个包含一行Javascript代码的＜script＞标签，赶快运行它；8）Javascript脚本执行了这条语句，它命令浏览器隐藏掉代码中的某个＜div＞ （style.display=”none”）。杯具啊，突然就少了这么一个元素，浏览器不得不重新渲染这部分代码；9）终于等到了＜/html＞的到来，浏览器泪流满面……
6. HTML和XHTML的区别，XHTML要求更严格比如img需要关闭，在js的解释上有一定的区别，如一段正常的<script>var a = b < c;</script>要加上CData，并且由于有些浏览器不支持CData，所以需要给CData加上注视
7. 文档模型的声明方式doctype，标准模式，怪异模式（默认不加就是怪异模式），HTML4.01严格模式以及XHTML1.01严格模型可以触发浏览器使用标准模式去渲染css跟html，而HTML4.01以及XHTML1.01的过渡模式会触发非标准模式

###三、CSS3


1. border-radius，border-shadow
2. gradient渐变
3. css3的盒子模型
4. background-size 牵扯到苹果屏幕模糊问题
5. box-sizing
6. webkit-box
7. transition 主要包含四个属性值：执行变换的属性：transition-property,变换延续的时间：transition-duration,在延续时间段，变换的速率变化transition-timing-function,变换延迟时间transition-delay
8. transform 转换 rotate() 旋转 / skew() 扭曲或倾斜 / scale() 缩放/ translate(,) 移动 ／matrix(a,b,c,d,e,f,g) 矩阵转换
9. translate 移动 translateX或者translateY
10. animation 由keyframes这个关键字，相当于flash的关键帧
11. viewport
12. media query

 
####四、HTML5


1. geolocation
2. canvas
3. localStorage
4. sessionStorage
5. history
6. webwork线程 缺点是不能访问window对象
7. audio & video
8. web socket 牵扯到的推问题 socket.io
9. 新增加的元素nav，section，footer，header，group，article
10. 新增加的特性placeholder，required，tel，num，email，range，



###五、HTTP和AJAX相关


1. HTTP的无状态怎么理解
2. HTTP的method方法
3. GET和POST的区别
4. 原生的AJAX怎么写
5. Ajax请求是GET好还是POST更好
6. ajax状态码
7. ajax的timeout实现





###六、LINUX命令以及一些svn命令


1. cd
2. ls
3. cp
4. scp
5. vi filename
6. :qw!
7. svn co svn://
8. svn add filename
9. svn up
10. svn ci filename -m
11. svn delete filename
12. svn log filename
13. svn diff


###七、前端优化


1. 减少HTTP请求－－捆板文件、css sprite、inline-image
2. 减少dns查询次数－－域名规划一般2-4个
3. 避免页面跳转－－.net里面有redirect
4. ajax缓存－－expires针对静态内容更好，cache-control针对动态内容，配置ETags（就是服务器下发一个标识客户端请求的时候再发送到服务端，服务端会进行判断是否一样，若一样直接返回304提高响应速度）
5. 精简css以及js的文件大小－－去掉注释，压缩代码
6. 图片跟js的延时加载
7. 提前加载（无条件提前加载－－比如Google会在加载完成后立刻加载image sprite，有条件提前加载－－根据用户的输入去判断）
8. 减少DOM数量，尽量减少DOM操作，一般700个是一个参考值
9. 网站内容动态规划－－浏览器对同一域名下的连结束有限制，但是域名规划也不可过多，不然dns查询又是一个问题，一般2-4个即可。一般将静态资源放在静态域名上，能避免使用cookies
10. iframe 优点－－可以用来夹在速度较慢的内容如广告，安全沙箱保护，脚本并行下载；缺点：即使空的iframe也会消耗加载时间，阻止页面加载，没有语义，自适应是个问题
11. 避免404－－无用的请求浪费时间；会阻止其他请求，而且返回的404客户端也会当作js去解析
12. CDN－－内容分发
13. Gzip压缩传输文件－－记得剔除掉pdf文件，因为pdf文件本身就是被压缩过的，反而会浪费CPU
14. ETags－－通过文件版本标识文件是否修改过，如果没有修改过直接返回304，这样浏览器就会直接使用缓存；问题是服务器集群中无法判断从另一台服务器通过客户端带过来的ETags是否修改过
15. 尽早flush输入－－对于有很多js或者css的一个页面，可以提前调用response.flush来响应这些内容给客户端，让客户端去直接下载脚本，而主线程可以去执行接下来的计算
16. 使用GET ajax请求－－浏览器在实现XMLHttpRequest POST的时候分两步首先发送header，而后发送数据，而GET请求是一个TCP报文直接发送了。
17. 避免空的src的图片 
18. 减少cookie的数量和大小－－注意cookie的domain级别
19. css放在header的最前边，注意不要使用css表达式
20. 用link代替@import，因为@import相当于将css放在网页内容底部
21. 避免使用Filters－－这种滤镜的使用会导致图片在下载的时候阻塞网页绘制，另外使用这种滤镜会导致内存使用量的问题。IE9中已经不再支持
22. 脚本提速－－javascript脚本放置底部，defer，H5 async
23. 对同一个hostname不要超过两个并行下载链接，所以当你从多个domain下载img的时候可以提高并行下载连接，但是下载脚本的时候，即使来自不同的hostname浏览器也不会下载其他资源，因为浏览器要在脚本下载之后异常解析和执行
24. 使用外部js文件跟css文件有利于客户端缓存
25. 使用事件冒泡机制来绑定父元素
26. 优化图片－－检查gif中图片颜色的数量和调色板规格是否一致，如果图片中只用到了4种颜色，而调色板种显示256种，有压缩空间；尝试把gif转换到png格式；在所有png图片上运行pngcrush优化；在所有jpeg图片上运行jpegtran命令，这个工具对图片出现的锯齿做无损操作同时清除其他注释或无用信息
27. 使用小且可缓存的favicon.ico 不管你的服务器是否有这个图标，浏览器都回去请求，所以我们要确保－－存在，尽量小最好小于1k，设置长的过期时间
28. mobile，保持单个内容小于25kb，iPhone最大只能缓存25k，这还是解压后的大小
29. 优化css sprite，水平排列比竖直更节省空间，颜色相近的排在一起

###八、javascript语言基础


1.  javascript有一个defer属性，async
2. 定义变量，若不var会发生什么
3. 关键字和保留字的问题－－一般遇到这两种情况使用引号
4. typeof－－几种类型，typeof null，instanceof
5. undefined和null的区别
6. ＊－－如果有一个对象不是number，则会在后台调用Number ()然后相乘，如果一个操作数是NaN，
7. ＋－－如果有一个为string，则会将另一个非string的在后台调用String()来执行字符串相加
8. ＝＝－－会进行类型转换，number靠近 console.log([] == ![])
9. for－－注意的地方，发散到dom访问，for(;;){//doSomething(); }
10. for-in
11. 函数传参数－－全部都是传值不要困惑，因为参数就是函数的局部变量！，arguments类数组
12. null，undefined，string，number，boolean是值类型，存在栈中，而Date，Regex，Object，Array，值得大小不固定，所以放在堆中，其地址引用的大小是固定的存储在栈中，访问时只是访问栈中的变量名
13. 深copy一个对象
14. 执行函数以及作用域连
15. 查询的代价（局部变量访问速度最快）
16. 垃圾清除－－标记清除，引用计数，主动设置 obj ＝null;以便回收
17. 数组的常用方法和属性－－length，join，concat，reverse，push，shift，unshift，pop，splice，slice，sort，var are＝[,,,];
18. Data－－UTC时间，获取时间戳
19. Function－－先声明在使用 推荐使用函数表达式，函数可以作为值返回
20. 函数内两个特殊对象arguments和this，arguments.callee
21. this的几种情况，new，function，method，apply&call 的时候
22. 函数的length属性
23. Number的toFixed方法
24. 正则表达式，reg.test()和reg.exec()
25. Global对象的uriEncode，蛋疼的evel，以及属性undefined，NaN，Infinity，Object，String，Function，Number，Boolean，Date，RegExp，Error，等都是Global的属性！！！
26. Math的方法比如max，min，random
27. 创建对象的模式，工厂，构造函数，原型模式，最佳方案结合使用构造函数模式和原型模式
28. 原型图   prototype，constructor，__proto__，hasOwnPrototype，原型的动态性
29. 继承－－原型链、组合继承（构造函数和原型链）、寄身式继承
30. 匿名函数和闭包－－有权访问另一函数作用域中变量的函数，模仿块级作用域
31. 涉及到一个闭包的经典问题五个li分别对应1，2，3，4，5怎么才能弹出对应的数字
32. 匿名自执行
33. BOM－－window对象，location，screen，navigator，history
34. window－－frames，open，top.frames[0]，setInterval
35. location－－hash，host，hostname，href，pathname，port，protocol，search
36. location.href == location.assgin，location.search=“?q=12”，replace，reloca(true)，修改location 的任何属性（除了hash）页面都会以心得URL重新加载
37. navigator－－检测浏览器差异性，比如userAgent
38. screen－－width，height
39. history－－go()，back()，forward()，
40. Node类型有多少种12种，常见的1，2，3，9分别表示元素，属性，文本，Document对象（HTML对象）
41. document－－title，referrer（来源），domain，查找元素getEleById，ByClassName，byTagName，byName
42. nodeName，nodeValue
43. childNodes，parentNode，NodeList是有生命的对象
44. appendChild，inserBefore
45. 创建元素节点document.createElement()
46. DocumentFragment
47. Attr－－name，value，specified
48. innerHTML，innerText，outerText
49. DOM操作可以实现动态加载js，图片等，通过js、img的src图片
50. 事件机制


###九、发散性质的问题探讨


1. webapp定位的问题
2. 2G网络或者慢网络下web优化，页面假死
3. canvas在打电话会卡死
4. 微信返回按钮
5. localStorage被回收的情况
6. 红米圆角兼容问题
7. ajax请求中断－－像这种sug
8. touch move事件
9. SPA
10. 前端架构的建设
11. css架构


###十、后端语言相关nodejs，php，python，ruby，java，c#


###11. 其他问题

1. 返回什么
 
		(function f(){		  function f(){ return 1; }		  return f();		  function f(){ return 2; }		})();
		返回什么  1，2，或者语法错误



