var diskAdapter = require( "sails-disk" );
var mysqlAdapter = require( "sails-mysql" );


module.exports = {
    "config": {
        "adapters": {
            "disk": diskAdapter,
            "mysql": mysqlAdapter
        },
        "connections": {
            "diskConnect": {
                "adapter": "disk"
            },

            "mysqlConnect": {
                "adapter": "mysql",
                "host": "localhost",
                "database": "ORM",
                "user": "root",
                "password": "admin123"            
            }
        }
    },
    "default": "diskConnect"
};