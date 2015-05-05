var fs = require( "fs" );

var routeSet = function routeSet ( server , module ) {
	for( var action in module ) {
		var route = module[ action ];
		server[ route.method.toLowerCase( ) ]( action , route.controller );
	}
};

module.exports = {
	"controllers": function setController ( directory , server ) {
		fs.readdir( directory + "/controllers" , 
			function readDirectory ( err , routes ) {
				routes.forEach( function ( route ) {
					routeSet( server , require( directory + "/controllers/" + route ) );
				} );
			} );
	},
	"static": function setScripts ( directory , folder , server ) {
		server.get( "/" + folder + "/:name" , 
			function ( request , response ) {
				response.write( fs.readFileSync( directory + "/assets/" + folder + "/" + request.params.name ) );
				response.end( );
			} );
	}
};