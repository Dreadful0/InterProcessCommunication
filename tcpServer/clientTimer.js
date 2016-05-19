var api = {};
global.api = api;
api.net = require('net');

var socket = new api.net.Socket();
var user;

socket.connect({
	port: 2000,
	host: '127.0.0.1',
}, function() {
	socket.on('data', function(data) {
		data = JSON.parse(data);
		console.log('Data received (by client): ' + data.currentPart);
		console.log(data.splitedTask[data.currentPart]);
		socket.write(JSON.stringify(data.currentPart));
		
		setTimeout(function(){
			var result = processData(data.splitedTask[data.currentPart]);
			console.log('Data processed (by client): ' + data.currentPart);
			console.log(result);
			var returnedData = {partID: data.currentPart, result: result};
			socket.write(JSON.stringify(returnedData));
			socket.destroy();
		}, 10000);
	});
});

function processData(data) {
	var result = [data.length];
	data.forEach(function(item, i, arr) {
		if(item != null){
			result[i] = item*2;
		}
		else result[i] = null;
	});
	return result;
}