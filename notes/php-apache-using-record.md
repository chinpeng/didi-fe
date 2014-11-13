*引用文档*    
1. [参考地址1](http://my.oschina.net/u/1156611/blog/192306)    
2. [参考地址2](http://yangjunwei.com/a/1378.html)    
3. [参考地址3](http://www.guomii.com/posts/30136)

Mac的终端的默认目录为：/Applications/Utilities

####1. php-info

1. 查看php版本号 `php --version`   
2. php的配置在 `/etc/php.ini.default`
3. php的文件路径在 `where??`
4. 查找php的执行文件 `which php`


####2. apache

1. 查看apache版本: `apachectl -v`    
2. 查看版本另一方式: `httpd -v`
3. apache安装路径: `/etc/apache2/`
1. 启动apache：`sudo /usr/sbin/apachectl start`
2. 关闭apache：`sudo /usr/sbin/apachectl stop`
3. 重启apache：`sudo /usr/sbin/apachectl restart`
4. 平滑启动apache: `sudo apachectl graceful`

#####apache system root

1. 配置: `/etc/apache2/httpd.conf`
2. 系统级的根目录: `DocumentRoot "/Library/WebServer/Documents"`

#####apache user root
尼玛没有走通－不纠结这个了，直接修改httpd.conf中的DocumentRoot配置节点即可。

1. `sudo mkdir ~/Sites`
2. `cd /etc/apache2/users/ && touch kimi.conf`
3. `vim kimi.conf`

		<Directory "/Users/kimi/Sites/">
		    Options Indexes MultiViews
		    AllowOverride None
		    Order allow,deny
		    Allow from all
		</Directory>
4. `sudo chmod 755 /etc/apache2/users/kimi.conf`
5. `sudo chown root:wheel /etc/apache2/users/kimi.conf`
6. `sudo apachectl restart`
7. 修改`~/Sites`的权限为可读可写。
8. `cp /Library/WebServer/Documents/index.html.en ~/Sites`
9. `sudo apachectl restart`
10. `http://localhost/~kimi/`

#####apache using php

1. `sudo vim /ect/apache2/httpd.conf`
2. `LoadModule php5_module libexec/apache2/libphp5.so`
3. `http://localhost/phpinfo.php`

