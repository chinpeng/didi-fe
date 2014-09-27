[requirejs-get-started](http://www.ruanyifeng.com/blog/2012/11/require_js.html)
 
####好处

	（1）实现js文件的异步加载，避免网页失去响应；
	（2）管理模块之间的依赖性，便于代码的编写和维护。

#####Use
	
	<script type="text/javascript" defer async="true" data-main="./js/main" src="./lib/requirejs/require.js"></script>

####Config

		require.config({
	　　　　baseUrl: "js/lib",
	　　　　paths: {
	　　　　　　"jquery": "jquery.min",
	　　　　　　"underscore": "underscore.min",
	　　　　　　"backbone": "backbone.min" 
	　　　　　　//"https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min"
	　　　　}
	　　});
	　　
####defined

		// math.js
	　　define(function (){
	　　　　var add = function (x,y){
	　　　　　　return x+y;
	　　　　};
	　　　　return {
	　　　　　　add: add
	　　　　};
	　　});
	　　
	　　// main.js
	　　require(['math'], function (math){
	　　　　alert(math.add(1,1));
	　　});
	　　
####依赖

		define(['myLib'], function(myLib){
	　　　　function foo(){
	　　　　　　myLib.doSomething();
	　　　　}
	　　　　return {
	　　　　　　foo : foo
	　　　　};
	　　});	　
	　　当require()函数加载上面这个模块的时候，就会先加载myLib.js文件　
	　　
####加载非AMD规范的js


	举例来说，underscore和backbone这两个库，都没有采用AMD规范编写。如果要加载它们的话，必须先定义它们的特征。
	
	　　require.config({
	　　　　shim: {  //shim专门定义未采用AMD规范的js
	
	　　　　　　'underscore':{
	　　　　　　　　exports: '_' //输出的名称，如jQuery就是$
	　　　　　　},
	　　　　　　'backbone': {
	　　　　　　　　deps: ['underscore', 'jquery'], // backbone本身的依赖
	　　　　　　　　exports: 'Backbone'
	　　　　　　}
	　　　　}
	　　});
	　　
####requirejs plugins

		//DOM ready
	    require(['domready!'], function (doc){
	　　　　// called once the DOM is ready
	　　});
	　　
	　　// 加载文本和图片
	　　define(['text!review.txt', 'image!cat.jpg'], function(review,cat){
	　　　　　　console.log(review);
	　　　　　　document.body.appendChild(cat);
	　　　　}
	　　);