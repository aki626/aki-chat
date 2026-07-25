let lastMessageElement = null;

document.getElementById("send-btn").onclick = async () => {
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;

    if (!message) return;

    const chatBox = document.getElementById("chat-box");

    // 自分のメッセージ表示
    const msg = document.createElement("div");
    msg.innerHTML = `<span style="color:#0ff">${name}</span>: ${message}`;
    chatBox.appendChild(msg);

    lastMessageElement = msg;

    // サーバーへ送信
    const res = await fetch("/send", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, message})
    });

    // 返信が空でもエラーにならないようにする
    let data = {};
    try {
        data = await res.json();
    } catch (e) {
        data.reply = "";
    }

    // AI返信が空なら何も表示しない
    if (data.reply) {
        const reply = document.createElement("div");
        reply.innerHTML = `<span style="color:#f0f">AI</span>: ${data.reply}`;
        chatBox.appendChild(reply);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
};

// 取り消し機能
document.getElementById("undo-btn").onclick = () => {
    if (lastMessageElement) {
        lastMessageElement.remove();
        lastMessageElement = null;
    }
};
