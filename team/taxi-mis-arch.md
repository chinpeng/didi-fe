#####svn

	https://svn.xiaojukeji.com/xiaoju/server/data_center/trunk/static/mis
	https://svn.xiaojukeji.com/xiaoju/server/data_center/trunk/web/mis_nash

#####header and footer

	<?php include(dirname(__FILE__). "/../common/footer.php"); ?>
	<?php include(dirname(__FILE__). "/../common/header.php"); ?>
  
#####scripts

		<script>
		requirejs.config({
		    paths: {
		        content: "/static/mis/js/imall/goods-list",
		        page: "/static/mis/lib/page"
		    }
		});
		
		require(['jquery', "content", "myTool"], function($, content, myTool) {
		    $(document).ready(function() {
		        content.init();
		    });
		});
		</script>

#####header

	<?php
	    //$type_view=$_REQUEST["type_view"];
	    if(isset($_REQUEST["type_view"])){
	    //balabala
	    }else{
	?>
	<!DOCTYPE HTML>
	<html>
	<head>
	<meta charset="utf-8"/>
	    <title>数据中心</title>
	    <link rel="stylesheet" href="/static/data_center/css/common.css"/>
	    <script type="text/javascript" src="/static/js/require.js" data-main="/static/js/main"></script>
	</head>
	<body class="yahei">
	<div class="header ">
	    <div class=" didi-width rel">
	        <h1 class="header-title  yahei orange"><span>滴滴打车</span></h1>
	        <div class="header-user  rel" id="userBox">
	            <span>欢迎<em class="user-name"><?php echo $username;?></em></span>
	            <span class="arrow-bottom"></span>
	        </div>
	        <ul class="user-center-box hide" id="userTip">
	            <li><a href="http://data.xiaojukeji.com/mis/login/index?type=0" target="_blank">mis后台</a></li>
	            <li><a href="http://data.xiaojukeji.com/platform/report/report_index" target="_blank">报表中心</a></li>
	            <li><a href="/mis/usermanage/exit_system">退出</a></li>
	        </ul>
	    </div>
	</div>
	<div class="body-box clearfix">
	    <div class="nav-tree" id="navTree">
	    </div>
	    <div class="content-box" id="contentBody">
	<?php
	}
	?>
	
#####main

	requirejs.config({
	    baseUrl: "/static/mis/lib",
	    paths: {
	        'jquery': "jquery",
	        'handlebars': "handlebars",
	        'highcharts': "highcharts",
	        'echarts': 'echarts/echarts',
	        'echarts/chart/bar': 'echarts/echarts-map',
	        'echarts/chart/line': 'echarts/echarts-map',
	        'echarts/chart/map': 'echarts/echarts-map'
	    },
	    shim: {
	        'handlebars': {
	            exports: 'Handlebars'
	        },
	        "highcharts": {
	            deps: ["jquery"],
	            exports: 'jQuery.fn.highcharts'
	        }
	    }
	});

#####examples
	
	<?php include(dirname(__FILE__). "/../common/header.php"); ?>
	
	<style>
	input[type='text'] {
	    height: 26px;
	    width: 200px;
	    border: 2px solid #ededed;
	    padding: 0px 5px;
	    margin-right: 20px;
	}
	</style>
	
	<!-- start content -->
	<!--主体内容相关-->
	<div class="content-wrap">
	    <div class="con-title-box">
	        <h2 class="con-title02">商品详情</h2>
	    </div>
	
	    <div class="con-title-box">
	        <input type="text" id='txt-phone' placeholder="请输入电话号码">
	        <input type="button" class="mis-btn mis-btn02" id='btn-search' value="查 询" />
	    </div>
	
	    <!-- <div class="mis-tab-box" id="tabBox">
	        <div class="mis-tab-item mis-tab-active" id="unactiveTab" for="unactiveGridViewBox">待上架</div>
	    </div>
	 -->
	    <div id="unactiveGridViewBox">
	        <div class="mis-gridview-box" id="gridViewDirverBDStat">
	        </div>
	        <div class="page-box">
	            <ol class="ep-pages " id="gridViewPage">
	            </ol>
	        </div>
	    </div>
	</div>
	
	<!--主体内容相关结束-->
	<!-- // <script src="/static/js/My97/WdatePicker.js"></script> -->
	<script>
	requirejs.config({
	    paths: {
	        content: "/static/mis/js/imall/get-score-by-phone",
	        page: "/static/mis/lib/page"
	    }
	});
	
	require(['jquery', "content"], function($, content) {
	    $(document).ready(function() {
	        content.init();
	    });
	});
	</script>
	
	<!-- end content -->
	
	
	<!--footer 开始-->
	<?php include(dirname(__FILE__). "/../common/footer.php"); ?>
