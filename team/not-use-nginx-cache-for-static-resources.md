####not use nginx cache for static 

1. Find your nginx location `cd /home/xiaoju/nginx`
2. open nginx config `vim conf/nginx.conf`
3. Find this in your server config and set like this.
		
		location ~ .*\.(css|js|swf|php|htm|html )$ {
		    add_header Cache-Control no-store;
		}
4. reload your nginx server.
 
		1 cd /home/xiaoju/nginx/sbin/
		2 ./nginx -s reload
		
note by liujb