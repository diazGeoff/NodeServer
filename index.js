var express = require( "express" );
var parser = require( "body-parser" );
var layouts = require( "express-ejs-layouts" );
var router = require( "./config/route" );
var database = require( "./config/database" );
var app = express( );

var cors = function cors ( request , response , next ) {	
	response.header( "Access-Control-Allow-Origin" , "*" );
	response.header( "Access-Control-Allow-Methods" , "GET, POST, DELETE" );
	response.header( "Access-Control-Allow-Headers" , "Content-Type" );

	next( );
};

app.set( "view engine" , ".ejs" );
app.set( "views" , __dirname + "/views" );

app.use( parser.json( ) );
app.use( parser.urlencoded( { "extended": false } ) );
app.use( function ( request , response , next ) {
	response.locals.layouts = "layouts/";
	next( );
} );
app.use( cors );
app.use( layouts );

router.controllers( __dirname , app );
router.static( __dirname , "library" , app );
router.static( __dirname , "script" , app );
router.static( __dirname , "style" , app );
router.static( __dirname , "images" , app );

database.set( __dirname );

/********************GLOBALS********************/
global[ "Static" ] = function createStatic ( layout , view , title ) {
	return function ( request , response ) {
		response.render( view , { "layout": "layouts/" + layout , "title": title } );
	}
};
/***********************************************/

app.listen( 3000 );

console.log( "Server Start at 3000" );