#####1. Mac

Mac已经自带`zsh`，需设置默认SHELL为`zsh`即可，另外安装`oh-my-zsh`插件有更多惊喜

1. 设置 `zsh` 为默认的SHELL，`chsh -s /bin/zsh` 
2. 进入`home`然后查看 `vim .zshrc` 进行其他配置
3. 安装`oh-my-zsh` [oh-my-zsh](https://github.com/robbyrussell/oh-my-zsh)


[oh-my-zsh-theme](https://github.com/robbyrussell/oh-my-zsh/wiki/themes)    
[oh-my-zsh-plugins](https://github.com/robbyrussell/oh-my-zsh/wiki/Plugins)


#####2. Linux

Linux 先安装`zsh`，然后安装`oh-my-zsh`

`sudo wget --no-check-certificate https://github.com/robbyrussell/oh-my-zsh/raw/master/tools/install.sh -O - | sh`

#####3. Support Chinese
1. `vi ~/.zshrc`
2. 将以下配置防到最后

		export LC_ALL=en_US.UTF-8
		export LANG=en_US.UTF-8

3. 重新打开终端或者`source ~/.zshrc`