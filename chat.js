let chats =
  JSON.parse(localStorage.getItem("chats"))
  || [];

const currentChat =
  localStorage.getItem("currentChat");

const chat =
  chats[currentChat];

document.getElementById(
  "chatName"
).innerText = chat.name;

function renderMessages() {

  const messagesDiv =
    document.getElementById("messages");

  messagesDiv.innerHTML = "";

  chat.messages.forEach(msg => {

    const div =
      document.createElement("div");

    div.style.maxWidth = "70%";
    div.style.padding = "10px";
    div.style.marginBottom = "10px";
    div.style.borderRadius = "10px";

    if (msg.type === "sent") {

      div.style.background = "#00c853";
      div.style.marginLeft = "auto";

    } else {

      div.style.background = "#333";

    }

    div.innerHTML = `
      <div>${msg.text}</div>

      <small>
        ${msg.time}
      </small>
    `;

    messagesDiv.appendChild(div);

  });

}

function getTime() {

  const now = new Date();

  return now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

}

function sendMessage() {

  const input =
    document.getElementById(
      "messageInput"
    );

  const text =
    input.value.trim();

  if (!text) return;

  chat.messages.push({

    text: text,
    type: "sent",
    time: getTime()

  });

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

  input.value = "";

  renderMessages();
}

function goBack() {

  window.location.href =
    "index.html";
}

renderMessages();
