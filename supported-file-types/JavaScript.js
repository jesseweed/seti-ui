module.exports = function (app) {

	return {

		// ALLOW TESLA LOGGING TO BE TURNED OFF IN CONFIG
		log: function(what) {
			if ( app.config.logging.console === true ) console.log(what);
		},

		emptyObject: function(obj) {
		  return !Object.keys(obj).length;
		},

		countObject: function(obj) {
			var count = 0;
			for( var key in obj ) {
			  if(obj(key)) {
			    count++;
			  }
			}

			return count;
		},

		throw: function(num) {

			var code = {
				400 : '400 Bad Request',
				401 : '401 Unauthorized',
				403 : '403 Forbidden',
				404 : '404 Not Found',
				405 : '405 Method Not Allowed',
				500 : '500 Internal Server Error',
			};

			var err = new Error( code[num] );
			    err.code = num;
			    err.message = code[num];
			    err.status = num;

			return err;

		}

	};

};
