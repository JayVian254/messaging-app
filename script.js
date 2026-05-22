let chats =
  JSON.parse(localStorage.getItem("chats"))
  || [];

function saveChats() {
  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );
}

function renderChats() {

  const chatList =
    document.getElementById("chatList");

  chatList.innerHTML = "";

  chats.forEach((chat, index) => {

    let lastMessage = "No messages";
    let lastTime = "";

    if (chat.messages.length > 0) {

      const last =
        chat.messages[
          chat.messages.length - 1
        ];

      lastMessage = last.text;
      lastTime = last.time;
    }

    const div =
      document.createElement("div");

    div.className = "chat-item";

    div.innerHTML = `
      <div class="profile">
        ${chat.name[0]}
      </div>

      <div class="chat-info">
        <div class="chat-name">
          ${chat.name}
        </div>

        <div class="last-message">
          ${lastMessage}
        </div>
      </div>

      <div class="time">
        ${lastTime}
      </div>
    `;

    div.onclick = () => {

      localStorage.setItem(
        "currentChat",
        index
      );

      window.location.href =
        "chat.html";
    };

    chatList.appendChild(div);

  });

}

function addChat() {

  const name =
    prompt("Enter contact name");

  if (!name) return;

  chats.push({
    name: name,
    messages: []
  });

  saveChats();
  renderChats();
}

renderChats();
