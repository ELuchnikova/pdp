(function() {
	var http = require('http');
	var userInput = {};

	http.createServer(function(request, response) {

		var postData;
		if (request.method == 'POST') {

			request.on('data', function(chunk) {

				postData = JSON.parse(chunk.toString());
				console.log('post reseive inner', chunk);

				if (postData.refresh === true) {
					userInput = {};

					console.log('refresh', chunk);
				
					response.writeHead(200, {
						'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					response.write('clear');
					return;
				}



				if ( Math.round(Math.random() * 10) % 2) {
					response.writeHead(500, {
						'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					response.write('Error');

				} else {
					for (var key in postData) {
						userInput[key] = postData[key];
					}

					console.log('post reseive', postData);

					response.writeHead(200, {
						'Content-Type': 'text/plain',
						'Access-Control-Allow-Origin' : '*',
						'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
					});
					response.write('OK');
				}
				response.end();
			});

		} else {

			console.log('get');

			response.writeHead(200, {
					'Content-Type': 'text/plain',
					'Access-Control-Allow-Origin' : '*',
					'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE'
				});
			response.write(JSON.stringify(userInput));
			userInput = {};
			response.end();
		}
	 
		
	
	}).listen(8888);

})();