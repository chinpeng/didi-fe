<h2>Fiddler怎么对手机的数据进行抓包分析</h2>

<h4>设置Fiddler怎么对IPhone手机的数据进行抓包分析</h4>
	
	配置Fiddler,  允许"远程连接":
	  打开Fiddler,Tools->Fiddler Options 。（配置完后记得要重启Fiddler）.
	  选中"Decrpt HTTPS traffic", Fiddler就可以截获HTTPS请求
      选中"Allow remote computers to connect". 是允许别的机器把HTTP/HTTPS请求发送到Fiddler上来
	
	获取Fiddler所在机器的IP地址:
	  在cmd中输入ipconfig。

<h4>IPhone上配置Fiddler为代理</h4>	 

	 打开IPhone,找到你的网络连接（注：和PC一个网络下）打开HTTP代理，输入Fiddler所在机器的IP地址(比如:192.168.1.104) 以及Fiddler的端口号8888。
      
<h4>android上配置Fiddler为代理</h4>	 

	需要手机和安装 Fiddler 电脑在同一WIFI下，手机连接到WIFI。打开手机的WIFI设置界面，选中连接的WIFI，长按，弹出如下界面，选择“修改网络”。
	将使用代理服务器打勾，并填上刚才在 PC 机上 ipconfig 获得的 IP 地址 192.168.1.95，端口号填 Fiddler 默认的 8888

