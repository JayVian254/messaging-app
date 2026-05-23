let chats =
  JSON.parse(localStorage.getItem("chats"))
  || [];

const currentChat =
  localStorage.getItem(
    "currentChat"
  );

const chat =
  chats[currentChat];

document.getElementById(
  "chatName"
).innerText = chat.name;

function saveChats() {

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

}

function renderMessages() {

  const messagesDiv =
    document.getElementById(
      "messages"
    );

  messagesDiv.innerHTML = "";

  if (!chat.messages) return;

  chat.messages.forEach(msg => {

    const div =
      document.createElement("div");

    div.className =
      `message ${
        msg.sender === "me"
        ? "sent"
        : "received"
      }`;

    div.innerHTML = `

      <div>
        ${msg.text}
      </div>

      <div class="message-footer">

        <span class="message-time">
          ${msg.time}
        </span>

        ${
          msg.sender === "me"
          ?
          `<span class="message-status ${msg.status}">
            ${
              msg.status === "sent"
              ? "•"
              : "••"
            }
          </span>`
          :
          ""
        }

      </div>

    `;

    messagesDiv.appendChild(div);

  });

  messagesDiv.scrollTop =
    messagesDiv.scrollHeight;

}

function getTime() {

  const now = new Date();

  return now.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}

function sendMessage() {

  if (!chat.canReply) {

    alert(
      "You cannot reply to this contact."
    );

    return;

  }

  const input =
    document.getElementById(
      "messageInput"
    );

  const text =
    input.value.trim();

  if (!text) return;

  chat.messages.push({

    text: text,

    sender: "me",

    time: getTime(),

    status: "sent"

  });

  saveChats();

  input.value = "";

  renderMessages();

}

function goBack() {

  window.location.href =
    "index.html";

}

renderMessages();
