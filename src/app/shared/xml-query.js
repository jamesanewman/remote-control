angular.module( 'remote.utility.xml-query' , [])

.service( 'XQ', function(){

	var XQ = this;

	XQ.find = function( element, name ){
		return element.getElementsByTagName( name );
	}

	XQ.getChildren = function( element ){

		var children = element.children;

		// drop anything that isn't a element

		return children;
		return _.filter( children , function( node ){
			return ( node.nodeType === Node.ELEMENT_NODE);
		});
	}

	XQ.getText = function( element ){
		return element.textContent;
	}

	XQ.getName = function( element ){
		return element.nodeName;
	}
})