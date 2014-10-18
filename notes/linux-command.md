####[LINUX命令速查](http://ganquan.info/linux/)

#####1. 初阶命令

0. touch -- create a file
1. ls -- show the list 
2. cp -- copy file
4. mv -- rename or move
5. scp -- `scp pay.html xiaoju@10.10.10.174:/home/webroot/app/api/v2/views/webapp`
6. `scp  -r  $DIR $DIR` -- scp -r 113.11.197.199:~/app/api/v2/views/webapp/home.html .
6. rm -- remove

#####2. 打包解包

1. tar cvf filename.tar DIRNAME -- 打包
2. tar xvf filename.tar -- 解包（tar是打包不是压缩）
3. tar zcvf filename.tar.gz DIRNAME -- 打包文件夹并压缩为tar.gz
4. tar zxvf filename.tar.gz -- 解压.tar.gz并解包
5. gzip -d filename.gz -- 解压文件
6. gzip filename -- 压缩为filename.gz
7. gunzip gilename.gz -- 解压gz文件


#####3. 磁盘相关

1. `du -sh f-weixin-sug` -- 查看文件夹占用的磁盘空间
2. `du -h` -- 列出文件夹下所有子文件夹占用磁盘空间的大小

#####4. 进阶命令

1. hostname－－显示主机名
1. `passwd` -- 修改密码
2. top－－显示进程
3. tail -f /home/xiaoju/php/logs/v2/didi.log.wf  |grep wxtransaction -A10 —color
4. curl
5. wget
6. 安装wget的方法

		1. curl -O http://ftp.gnu.org/gnu/wget/wget-1.13.4.tar.gz
		2. tar -xzvf wget-1.13.4.tar.gz
		3. cd wget-1.13.4
		4. ./configure --with-ssl=openssl
		5. make
		6. sudo make install

7. ifconfig en0     
8. ping ifconfig.me
8. curl ifconfig.me
9. ps -ef |grep packagename
10. kill pid
11. grep的详细使用

#####5. 其他技巧

1. `which svn` -- Find the svn path


