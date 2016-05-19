var api = {};
global.api = api;
api.net = require('net');

//var user = { name: 'Marcus Aurelius', age: 1895 };
var task = [10, 5, 6, 7, 5, 7];
var partsNumber = 2;
var splitedTask = splitData(task, partsNumber);
console.log('Task: ' + splitedTask);

var result = [partsNumber];

var currentPart = 0;
var partsReturned = 0;
var server = api.net.createServer(function(socket) {
	
	var dataToWrite = {'currentPart': currentPart, 'splitedTask': splitedTask}
	socket.write(JSON.stringify(dataToWrite));
	
	console.log('Connected: ' + socket.localAddress);
	socket.on('data', function(data) {
		console.log('Data received (by server): ' + data);
	
		part = JSON.parse(data);
		if(typeof(part) == 'number'){
			currentPart++;
		}
		else{
			partsReturned++;
			result[part.partID] = part.result;
			console.log('Result: ' + result);
			if(partsReturned == partsNumber)process.exit(0);
		}
	});
	
	

}).listen(2000);

function splitData(task, partsNumber) {
	var partSize = task.length/partsNumber;
	var result = [partsNumber];
	var count = 0;
	for (var i = 0; i < partsNumber; i++) {
		result[i] = [partSize];
		for (var j = 0; j < partSize; j++) {
			result[i][j] = task[count];
			count++;
		}
	}
	return result;
}