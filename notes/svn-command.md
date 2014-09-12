####svn命令

[svn命令详解](http://blog.csdn.net/wklken/article/details/6594956)    

#####基础

1. `svn list svn://10.10.10.60/xiaoju/server/static/` -- show list
2. `svn co svn://10.10.10.60/xiaoju/server/trunk/api/v2/views` -- checkout
3. `svn add xx` -- add files or folders
4. `svn import $DIR $URL -m “Something your want to mark.”` -- import local folder to svn and commit to remote
4. `svn rm file` -- remove
5. `svn mv old_file new_file` -- move or rename
5. `svn up` -- update
3. `svn ci  filename -m "checkin note”` -- checkin
4. `svn st -v/-u` -- show status
5. `svn log filename` -- show logs
6. `svn cat -r 10528 home.html ` -- show history 
6. `svn delete filename` -- delete
13. `svn delete –force over-there` -- force to delete


#####进阶


1. `svn export svn://10.10.10.60/xiaoju/server/trunk/api/v2/views` -- use for release project, without .svn folder
8. `svn diff -r 12302:12304 home.html` -- diff two files
2. `svn diff filename` -- show difference from the working file and the latest version
2. `svn diff get_hb_list.tpl |vim -R -` -- use vim to diff two files
4. `svn diff filename -r1234:2345[|vim -R -]` -- use vim to diff two files
3. `svn up –r 200 file.c` -- 将本地的file.c还原为200版本，【本地是拿下来了，版本库端并没有改变】
1. `svn mkdir newdir`
1. `svn mkdir newdir -m "Making a new dir" svn://10.10.10.60/xiaoju/server/`
20. svn resolve --accept working compressed，svn revert compressed－－解决目录compressed树冲突
22. svn revert filename
22. 冲突的解决方法：
  
		1. 先将.mine文件拷贝到你自己的文件
		2. 先跟test.html跟低版本的比较
		3. 再将test.html跟高版本的比较
		4. 解决完冲突之后再diff一下
		5. 然后设置svn resolved test.html
		6. 然后ci
		
23. ci的时候出现 xx.html is out of date－－解决方法就是先update一下，然后再ci  