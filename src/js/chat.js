var websocket = new WebSocket("ws:/localhost:3001");

//显示信息
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

/* 
 * 打开聊天室时，欢迎句
 * input不为空的时候发送消息
 */
websocket.onopen = function(str) {
    console.log("Websocket onopen!");
    document.getElementById("recv").innerHTML = "Welcome to my Chatroom –"
    var sendButton = document.getElementById("sendBtn");
    sendButton.onclick = function() {
        var txt = document.getElementById("sendTxt").value;
        if (txt) {
            websocket.send(txt);
            document.getElementById("sendTxt").value = "";
        }
    }
    var sendTxt = document.getElementById("sendTxt");
    sendTxt.onkeydown = function(event) {
        var keyNum = window.event ? event.keyCode : event.which; //获取被按下的键值 
        //判断如果用户按下了回车键（keycody=13） 
        if (keyNum == 13) {
            var txt = document.getElementById("sendTxt").value;
            if (txt) {
                websocket.send(txt);
                //txt = "";  //失败
                document.getElementById("sendTxt").value = "";
            }
        }
    }
}

// 关闭聊天室
websocket.onclose = function() {
    console.log("Websocket onclose!")
}

// 接收消息
websocket.onmessage = function(e) {
    console.log(e.data);
    var msg = JSON.parse(e.data);
    showMsg(msg.data, msg.type);
}

document.onkeydown = function(e) {
    //对整个页面文档监听 
    var keyNum = window.event ? e.keyCode : e.which; //获取被按下的键值 
    //判断如果用户按下了回车键（keycody=13） 
    if (keyNum == 13) {
        document.getElementById("loginBox").style.display = "none";
    }
}