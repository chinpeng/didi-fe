#####Install package managment

`git clone https://github.com/gmarik/vundle.git ~/.vim/bundle/vundle` 安装vim的插件管理工具 `vundle`

#####using vundle
	
	" Be improved
	set nocompatible
	" Required!
	filetype off
	set rtp+=~/.vim/bundle/vundle/
	call vundle#rc()
	
	" Let Vundle manage Vundle
	Bundle 'gmarik/vundle'
	Bundle 'JavaScript-syntax'
	Bundle 'jQuery'
	Bundle 'othree/html5.vim'
	Bundle 'groenewege/vim-less'
	Bundle 'Markdown'
	Bundle 'Markdown-syntax'
	Bundle 'php.vim-html-enhanced'
	Bundle "pangloss/vim-javascript"
	Bundle "MarcWeber/vim-addon-mw-utils"
	Bundle "tomtom/tlib_vim"
	Bundle "snipmate-snippets"
	Bundle "garbas/vim-snipmate"
	
	" Original repos on github
	Bundle 'kien/ctrlp.vim'
	Bundle 'sukima/xmledit'
	Bundle 'sjl/gundo.vim'
	Bundle 'jiangmiao/auto-pairs'
	Bundle 'klen/python-mode'
	Bundle 'Valloric/ListToggle'
	Bundle 'SirVer/ultisnips'
	" Bundle 'Valloric/YouCompleteMe'
	Bundle 'scrooloose/syntastic'
	Bundle 't9md/vim-quickhl'
	Bundle 'Lokaltog/vim-powerline'
	Bundle 'scrooloose/nerdcommenter'
	
	" Vim-scripts repos
	Bundle 'YankRing.vim'
	Bundle 'vcscommand.vim'
	Bundle 'ShowPairs'
	Bundle 'SudoEdit.vim'
	Bundle 'EasyGrep'
	Bundle 'VOoM'
	Bundle 'VimIM'
	
	" Github repos
	Bundle 'git://git.wincent.com/command-t.git'
	
	filetype plugin indent on
	
#####Type of plugins

1. 在Github vim-scripts 用户下的repos,只需要写出repos名称
2. 在Github其他用户下的repos, 需要写出”用户名/repos名”
3. 不在Github上的插件，需要写出git全路径

#####Install plugins

打开一个vim, 运行`:BundleInstall` 或者在命令行运行 `vim +BundleInstall +qall`

#####Others command

1. 更新插件`:BundleUpdate`
2. 清除不再使用的插件`:BundleClean` -- `BundleClean`会清除所有不是用`Vundle`安装的插件，除了Vundle自己
3. 列出所有插件`:BundleList`
4. 查找插件`:BundleSearch`

#####Reference

1. [Comming From](http://zuyunfei.com/2013/04/12/killer-plugin-of-vim-vundle/)    
2. [Vim config](https://github.com/AlloVince/vim-of-allovince)