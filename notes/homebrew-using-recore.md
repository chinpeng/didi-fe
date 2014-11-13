[官方网站](http://brew.sh/index_zh-cn.html)

####install

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
	
####installeds software folder

	/usr/local/Cellar

####command list

	brew list --
	brew home -- 
	brew info --
	brew search redis -- search list 
	brew update -- update brew 
	brew install software -- install
	brew reinstall software -- reinstall
	brew remove software -- remove
	brew outdated -- show the outdated software
	brew deps wget -- show the deps of wget
	brew upgrade --  update all installed software

#####定制自己的软件包

    如果自己需要的软件包并不能在Homebrew中找到，怎么办呢，毕竟Homebrew是一个新生项目，不可能满足所有人的需求。当然，我们可以自行编译安装，但手工安装的软件包游离于Homebrew之外，管理起来不是很方便。


1. 首先找到待安装软件的源码下载地址
  		
		http://foo.com/bar-1.0.tgz

2. 建立自己的formula
		
		brew create http://foo.com/bar-1.0.tgz

3. 编辑formula，上一步建立成功后，Homebrew会自动打开新建的formula进行编辑，也可用如下命令打开formula进行编辑。
		
		brew edit bar
		Homebrew自动建立的formula已经包含了基本的configure和make install命令，对于大部分软件，不需要进行修改，退出编辑即可。

4. 输入以下命令安装自定义的软件包
		
		brew install bar

#####其他纪录
未使用brew安装git的时候，使用的是系统自带的git工具

	Macbook:~ kimi$ which git
	/usr/bin/git
	Macbook:~ kimi$ ll /usr/bin/git
	-rwxr-xr-x  1 root  wheel 14160 Sep 27 10:06 /usr/bin/git

使用brew安装git `brew install git` 后是这样的

	Macbook:~ kimi$ which git
	/usr/local/bin/git
	Macbook:~ kimi$ ll /usr/local/bin/git
	lrwxr-xr-x  1 kimi  admin  27 Oct 20 12:33 /usr/local/bin/git -> ../Cellar/git/2.1.2/bin/git

####homebrew-cask

软件安装在`/opt/homebrew-cask/Caskroom`

[http://caskroom.io](http://caskroom.io)    
[https://github.com/caskroom/homebrew-cask#learn-more](https://github.com/caskroom/homebrew-cask#learn-more)

可以快速安装appstore里面的软件如 qq、chrome等

	$ brew install caskroom/cask/brew-cask
	$ brew cask install google-chrome
	=> Downloading https://dl.google.com/chrome/mac/stable/GGRO/googlechrome.dmg
	=> Success! google-chrome installed to /opt/homebrew-cask/Caskroom/google-chrome/stable-channel
	=> Linking Google Chrome.app to /Users/phinze/Applications/Google Chrome.app