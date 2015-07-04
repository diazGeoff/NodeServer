var cors = require( "../cors" );

module.exports = {
	"setAllowedOrigins": function setAllowedOrigins ( ) {
		return function ( request , response , next ) {
			cors.allow.hosts.forEach( function ( host ) {
				if ( request.get( "host" ) == host )
					next( );
			} );

			response.end( "Host not allowed" );
		}
	},
	"setBlockedOrigins": function setBlockedOrigins ( ) {
		return function ( request , response , next ) {
			cors.block.hosts.forEach( function ( host ) {
				if ( request.get( "host" ) == host )
					response.end( "Host is blocked" );
			} );

			next( );
		}
	}
};