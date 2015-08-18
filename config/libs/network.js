var cors = require( "../cors" );

module.exports = {
	"setAllowedOrigins": function setAllowedOrigins ( ) {
		return function ( request , response , next ) {
			var host = cors.allow.hosts;
			for ( var i = 0 ; i < host.length ; i ++ ) {
				if ( request.get( "host" ) == host[i] )
					return next( );
			}

			return response.end( "Host not allowed" );
		}
	},
	"setBlockedOrigins": function setBlockedOrigins ( ) {
		return function ( request , response , next ) {
			var host = cors.block.hosts;
			for ( var i = 0 ; i < host.length ; i ++ ) {
				if ( request.get( "host" ) == host[i] )
					return response.end( "Host is blocked" );
			}

			return next( );
		}
	}
};