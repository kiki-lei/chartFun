var websocket = new WebSocket("ws:/localhost:3001");

function showMsg(str, type) {
    var div = document.createElement('div');
    div.innerHTML = str;
    if (type == "enter") {
        div.style.color = "blue"
    } else if (type == "leave") {
        div.style.color = "pink"
    }
    document.getElementById("infoBox").appendChild(div);
}
websocket.onopen = function(str) {
    console.log("Websocket onopen!");
    document.getElementById("recv").innerHTML = "欢迎进入笨蛋聊天室~"
    var sendButton = document.getElementById("sendBtn");
    sendButton.onclick = function() {
        var txt = document.getElementById("sendTxt").value;
        if (txt) {
            websocket.send(txt);
            txt = "no";
        }
    }
}
websocket.onclose = function() {
    console.log("Websocket onclose!")
}
websocket.onmessage = function(e) {
    console.log(e.data);
    var msg = JSON.parse(e.data);
    showMsg(msg.data, msg.type);
}