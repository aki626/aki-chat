let userName = localStorage.getItem("userName") || "名無し";

function saveName() {
    const name = document.getElementById("nameInput").value;
    if (name.trim() !== "") {
        userName = name;
        localStorage.setItem("userName", name);
        alert("名前を「" + name + "」に変更したよ！");
    }
}

function sendMessage() {
    const msg = document.getElementById("messageInput").value;

    fetch("https://YOUR-RAILWAY-URL/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            name: userName,
            message: msg
        })
    })
    .then(res => res.json())
    .then(data => {
        addMessage(userName, msg, data.reply);
        document.getElementById("messageInput").value = "";
    });
}

function addMessage(name, userMsg, botMsg) {
    const chatBox = document.getElementById("chatBox");
    chatBox.innerHTML += `<p><strong>${name}：</strong> ${userMsg}</p>`;
    chatBox.innerHTML += `<p style="color:#4caf50;"><strong>Bot：</strong> ${botMsg}</p>`;
    chatBox.scrollTop = chatBox.scrollHeight;
}
