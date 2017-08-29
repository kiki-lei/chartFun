const websocket = new WebSocket("ws:/localhost:3001");

//显示信息
function showMsg(str, type) {
    let div = document.createElement('div');
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
    // console.log("Websocket onopen!");


    // 设置昵称
    var setNickname = document.getElementById("nickname");
    setNickname.onkeydown = function(event) {
        var keyNum = window.event ? event.keyCode : event.which; //获取被按下的键值
        //判断如果用户按下了回车键（keycody=13）
        if (keyNum == 13) {
            // 隐藏设置昵称对话框
            document.getElementById("loginBox").style.display = "none";
            var nickname = document.getElementById("nickname").value;
            if (nickname) {
                // var nickname = {};
                // nickname.type = "nickname";
                // nickname.txt = document.getElementById("nickname").value;

                console.log(nickname);
                websocket.send(nickname);
                //txt = "";  //失败
            }
        }
    }


    // 点击发送按钮发送消息
    var sendButton = document.getElementById("sendBtn");
    sendButton.onclick = function() {
        var txt = document.getElementById("sendTxt").value;
        if (txt) {
            websocket.send(txt);
            document.getElementById("sendTxt").value = "";
        }
    }

    // 回车键发送消息
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