var adapter = require( "sails-mysql" );

module.exports = {
    "config": {
        "adapters": {        
            "mysql": adapter
        },
        "connections": {
            "mysqlConnect": {
                "adapter": "mysql",
                "host": "localhost",
                "database": "ORM",
                "user": "root",
                "password": "admin123"            
            }
        }
    },
    "default": "mysqlConnect"
};