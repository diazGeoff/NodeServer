var fs = require( "fs" );
var Waterline = require( "waterline" );
var orm = new Waterline( );
var connection = require( "../connection" );

var CreateModel = function CreateModel ( name , schema ) {
	schema.identity = name.toLowerCase( );
	schema.connection = connection.default;

	var Model = Waterline.Collection.extend( schema );

	orm.loadCollection( Model );
};

module.exports = {
	"set": function setWaterline ( directory ) {
		fs.readdir( directory + "/models" , 
			function ( err , models ) {
				models.forEach( function ( model ) {
					var schema = require( directory + "/models/" + model );

					CreateModel( model.split( "." )[ 0 ] , schema );
				} );

				orm.initialize( connection.config , 
					function ( err  , models ) {
						Object.keys( models.collections ).forEach( function ( c ) {
							global[ c[0].toUpperCase( ) + c.slice( 1 ) ] = models.collections[ c ];
						} );
					} );
			} );
	}
};