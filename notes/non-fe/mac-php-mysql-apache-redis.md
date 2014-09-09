###mac下php安装

-----


*引用文档*    
1. [参考地址1](http://my.oschina.net/u/1156611/blog/192306)    
2. [参考地址2](http://yangjunwei.com/a/1378.html)
3. [参考地址3](http://www.guomii.com/posts/30136)

Mac的终端的默认目录为：/Applications/Utilities

查看php版本号 `php --version` 如图：    

![]()

查看apache版本 `apachectl -v`    

![]()

重启apache：sudo /usr/sbin/apachectl restart

关闭apache：sudo /usr/sbin/apachectl stop

开启apache：sudo /usr/sbin/apachectl start



###mac下安装和启动ngxin

[mac下编译安装ngxin](http://www.kazaff.me/2013/07/18/%E5%9C%A8mac-os-x-10-9%E4%B8%8A%E7%BC%96%E8%AF%91%E5%AE%89%E8%A3%85nginx/)
[homebrew安装ngxin](http://learnaholic.me/2012/10/10/installing-nginx-in-mac-os-x-mountain-lion/)

------

###mac下安装redis

------

####install

1. [Download](http://www.redis.io/download)
2. `tar zxvf redis-2.8.12.tar.gz `
3. `cd redis-2.8.12`
4. `make`
5. `src/redis-server` -- start the redis server
6. `src/redis-client` -- start the client command
5. `sudo vim .bash_profile` -- setting the alias
6. `alias redis="~/Documents/dev/redis-2.8.12/src/redis-server"` -- redis server shortcut
6. `alias rediscli="~/Documents/dev/redis-2.8.12/src/redis-cli"`


####commands

1. `ping` -- test the server is ready.
2. `quit` -- close the client connection.
3. `set key value` -- 
3. `get key`

