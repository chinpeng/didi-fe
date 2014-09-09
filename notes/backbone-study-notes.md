1. 通过`Backbone.Model.extend({});`定义的对象，只能通过`obj.get('property');`才能访问到，而直接`obj.prop`或者`obj['prop']`却访问不到这是为啥？

	    (function($) {
	        var Man = Backbone.Model.extend({
	            initialize: function() {
	                // alert("hey, you create me!");
	            },
	            defaults: {
	                name: 'liujb',
	                age: 23
	            },
	            about: function() {
	                return "my name is" + this.get('name') + ".";
	            }
	        });
	
	        var man = new Man;
	        man.set({
	            lover: "no"
	        });
	
	        
	        console.log(JSON.stringify(man));
	        alert(man['age']); // undefined??
	        alert(man.get('age')); //23
	
	    })(Zepto);
	    
	    
2. 