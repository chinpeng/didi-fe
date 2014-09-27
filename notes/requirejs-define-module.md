1. If the module does not have any dependencies, and it is just a collection of name/value pairs, then just pass an object literal to define():
	 
		//Inside file my/shirt.js:
		define({
		    color: "black",
		    size: "unisize"
		});
		
2. If the module does not have dependencies, but needs to use a function to do some setup work, then define itself, pass a function to define():

		
		//my/shirt.js now does setup work
		//before returning its module definition.
		define(function () {
		    //Do setup work here
		
		    return {
		        color: "black",
		        size: "unisize"
		    }
		});
		
3. If the module has dependencies, the first argument should be an array of dependency names, and the second argument should be a definition function. The function will be called to define the module once all dependencies have loaded. The function should return an object that defines the module. The dependencies will be passed to the definition function as function arguments, listed in the same order as the order in the dependency array:


		//my/shirt.js now has some dependencies, a cart and inventory
		//module in the same directory as shirt.js
		define(["./cart", "./inventory"], function(cart, inventory) {
		        //return an object to define the "my/shirt" module.
		        return {
		            color: "blue",
		            size: "large",
		            addToCart: function() {
		                inventory.decrement(this);
		                cart.add(this);
		            }
		        }
		    }
		);
		
4. Modules do not have to return objects. Any valid return value from a function is allowed. Here is a module that returns a function as its module definition:

		//A module definition inside foo/title.js. It uses
		//my/cart and my/inventory modules from before,
		//but since foo/title.js is in a different directory than
		//the "my" modules, it uses the "my" in the module dependency
		//name to find them. The "my" part of the name can be mapped
		//to any directory, but by default, it is assumed to be a
		//sibling to the "foo" directory.
		define(["my/cart", "my/inventory"],
		    function(cart, inventory) {
		        //return a function to define "foo/title".
		        //It gets or sets the window title.
		        return function(title) {
		            return title ? (window.title = title) :
		                   inventory.storeName + ' ' + cart.name;
		        }
		    }
		);
		
5. If you wish to reuse some code that was written in the traditional CommonJS module format it may be difficult to re-work to the array of dependencies used above, and you may prefer to have direct alignment of dependency name to the local variable used for that dependency. You can use the simplified CommonJS wrapper for those cases:

		define(function(require, exports, module) {
		        var a = require('a'),
		            b = require('b');
		
		        //Return the module value
		        return function () {};
		    }
		);
		
6. You may encounter some define() calls that include a name for the module as the first argument to define():

	    //Explicitly defines the "foo/title" module:
	    define("foo/title",
	        ["my/cart", "my/inventory"],
	        function(cart, inventory) {
	            //Define foo/title object in here.
	       }
	    );
