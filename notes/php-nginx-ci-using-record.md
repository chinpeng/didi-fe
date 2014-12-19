####1. nginx

[mac下编译安装ngxin](http://www.kazaff.me/2013/07/18/%E5%9C%A8mac-os-x-10-9%E4%B8%8A%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85nginx/)
&nbsp;[homebrew安装ngxin](http://learnaholic.me/2012/10/10/installing-nginx-in-mac-os-x-mountain-lion/)

1. nginx安装路径 `/usr/local/Cellar/nginx/1.6.2`
2. nginx的配置 `/usr/local/etc/nginx`
3. `which nginx` -- `/usr/local/bin/nginx`
3. 停止nginx服务 `nginx -s stop`
4. 启动nginx服务 `sudo nginx`
5. 平滑启动nginx `sudo nginx -s reload`
6. `http://localhost:8080` -- 即可访问到nginx服务

####2. FastCGI

1. FastCGI，也称为FCGI，是一个外部服务与Web服务器的接口协议。FastCGI是早期的通用网关接口(CGI)的增强版本。 FastCGI致力于减少网页服务器与CGI程序之间的开销，从而使服务器可以同时处理更多的网页请求。

2. Nginx为了许多外部工具和服务而引入FastCGI技术，例如Perl, PHP 和 Python。所以，在FastCGI服务启动之前，它们都是不能使用的。

3. 有不同的方式可以启动PHP FastCGI服务,我们将介绍php-fpm.这也是推荐的方案.

####3. php-fpm

[参考文章](https://wiki.archlinux.org/index.php/Nginx_(简体中文)

####4. 配置php-fpm

Mac OSX 10.9的系统自带了PHP、php-fpm，省去了安装php-fpm的麻烦.    
这里需要简单地修改下php-fpm的配置，否则运行php-fpm会报错。

	sudo cp /private/etc/php-fpm.conf.default /private/etc/php-fpm.conf
	vim /private/etc/php-fpm.conf

修改php-fpm.conf文件中的error_log项，默认该项被注释掉，这里需要去注释并且修改为`error_log = /usr/local/var/log/php-fpm.log`。`如果不修改该值，运行`php-fpm`的时候会提示log文件输出路径不存在的错误。

启动php-fpm，`sudo php-fpm`

https://svn.xiaojukeji.com/xiaoju/server/api/v2/trunk/views/webapp/home.html 44457

####5. 配置nginx

1.配置root
       
    root   /Users/kimi/ng-sites/;

2.配置fast-cgi

	location / {
	    root   /Users/kimi/ng-sites/;
	    index  index.php index.html index.htm;
	}
	
	location ~ \.php$ {
	    fastcgi_pass 127.0.0.1:9000;
	    fastcgi_index index.php;
	    fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
	    include fastcgi_params;
	}

[必看Mac-brew-install-php-nginx-phpfpm-mysql](http://my.oschina.net/chen0dgax/blog/190161)

####6. 配置ci

1. 配置nginx路由

        location / {
            #root   html;

            root   /Users/kimi/webroot/;
            index  index.php index.html index.htm;
        }

        location ~ \.php$ {
            fastcgi_pass 127.0.0.1:9000;
            fastcgi_index index.php;
            fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
            include fastcgi_params;
        }

        location /api {
             rewrite ^/api/(.*?)/(.*)$ /api/$1/index.php/$2 break;
             fastcgi_pass   127.0.0.1:9000;
             fastcgi_index  index.php;
             include fastcgi.conf;
        }
        
2. 配置ci文件结构
		
		Macbook:webroot kimi$ tree -L 3
		.
		├── api
		│   └── v2
		│       ├── cache
		│       ├── config
		│       ├── controllers
		│       ├── core
		│       ├── errors
		│       ├── helpers
		│       ├── hooks
		│       ├── index.html
		│       ├── index.php
		│       ├── language
		│       ├── libraries
		│       ├── logs
		│       ├── models
		│       ├── third_party
		│       └── views
		├── ci-sys
		│   └── system
		│       ├── core
		│       ├── database
		│       ├── fonts
		│       ├── helpers
		│       ├── index.html
		│       ├── language
		│       └── libraries
		└── index.php
		
3. 其中v2下面的`index.php`下面修改两处

	 `$application_folder = '/Users/kimi/webroot/api/v2';`
	 `$system_path = '/Users/kimi/webroot/ci-sys/system';`
	 
4. 其中`v2/config/routes.php`
	 
		$route['default_controller'] = "welcome"; -- 默认controller
		$route['api/v2'] = "get";  -- 配置 http://xx.com/api/v2/ -- 默认进入get
		$route['api/v2/(.+)'] = "$1"; -- 匹配api/v2/get
		$route['404_override'] = ''; 
		
		