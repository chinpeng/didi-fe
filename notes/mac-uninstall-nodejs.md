[FROM](http://stackoverflow.com/questions/11177954/how-do-i-completely-uninstall-node-js-and-reinstall-from-beginning-mac-os-x)

EDIT:

To recap, the best way (I've found) to completely uninstall node + npm is to do the following:

1. go to `/usr/local/lib` and delete any `node` and `node_modules`
2. go to `/usr/local/include` and delete any `node` and `node_modules` directory
3. if you installed with brew install node, then run brew uninstall node in your terminal
4. check your Home directory for any `local` or `lib` or `include` folders, and delete any `node` or `node_modules` from there
5. go to `/usr/local/bin` and delete any node executable

You may need to do the additional instructions as well:

1. remove: `/usr/local/bin/npm`
2. remove: `/usr/local/share/man/man1/node.1`
3. remove: `/usr/local/lib/dtrace/node.d`
4. execute: `rm -rf /Users/[homedir]/.npm`

Then download nvm and follow the instructions to install node. The latest versions of node come with npm, I believe, but you can also reinstall that as well.