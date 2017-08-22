var ws = require("nodejs-websocket");
var PORT = 3001;
var userCount = 0;

var server = ws.createServer(function(conn) {
    console.log("New connection");
    userCount++;
    conn.nickname = "User" + userCount;
    var msg = {};
    msg.type = "enter";
    msg.data = conn.nickname + " is coming!";
    boardcast(JSON.stringify(msg));
    var total = {};
    total.data = "There are " + userCount + " participants";
    boardcast(JSON.stringify(total));
    conn.on('text', function(str) {
        console.log("Received " + str);
        var msg = {};
        msg.type = "message";
        msg.data = conn.nickname + " says: " + str;
        boardcast(JSON.stringify(msg));
    })
    conn.on('close', function(code, reason) {
        console.log("connection closed");
        var msg = {};
        msg.type = "leave";
        msg.data = conn.nickname + " is leaving!";
        boardcast(JSON.stringify(msg));
        var total = {};
        total.data = "There are " + (userCount - 1) + " participants";
        boardcast(JSON.stringify(total));
    })
    conn.on('error', function(err) {
        console.log("handler error!");
        console.log(err);
    })
}).listen(PORT);

console.log("Server is running at port 3001")

//广播信息
function boardcast(str) {
    server.connections.forEach(function(connection) {
        connection.sendText(str);
    })
}