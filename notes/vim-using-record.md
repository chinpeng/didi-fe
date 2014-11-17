####vim-info

2. vim文件存在 `/usr/share/vim/vim73`
1. 系统级别的vim配置文件在 `/usr/share/vim/vimrc`
2. 用户级别的vim配置在 `~/.vimrc`

####homebrew install vim

1. `/usr/local/Cellar/vim/7.4.430_1/share/vim/vim74`


####vim

1. `esc` -- turn to command mode
1. `i` -- turn to edit mode and ready to insert in line
2. `o` -- turn to edit mode and ready to insert next line
3. `h` -- left
7. `j` -- down
8. `k` -- up
9. `l` -- right
3. `^` -- start in line
4. `$` -- end of line
5. `dw` -- delete word
6. `dd` -- delete line
7. `yy` -- copy line
8. `p` -- paste
9. `e` -- skip an word next
10. `b` -- skip an word previous
10. `gg` -- 移动到首行
11. `G` -- 移动到末行
12. `V` -- 进入Visual模式
13. 进入Visual模式后
	
	1. `d` -- 删除所选
	2. `y` -- 复制到0号寄存器，只能在打开的vim使用
	3. `+y` -- 复制所选文件到1号寄存器，供其他程序使用。

14. 将选中的内容复制粘贴到另一个文件中
	
	1. `y` 复制（在选中状态下）
    2. `:ex b` 转到b文件
    3. `p` 粘贴
    4. `:wq` 保存&退出 
    
15. `4m5` 将第4行移动到第5行



####vim diff

1. `dp` -- switch left to right
2. `dd` -- delete one line

#####vim分屏幕

1. `vim -On file1 file2` -- 垂直分屏
2. `vim -on file1 file2` -- 水平分屏
