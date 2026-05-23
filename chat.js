let currentType = "sent";
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
        :
        "••"
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
function setMessageType(type) {

  currentType = type;

  document
    .getElementById("sentBtn")
    .classList.remove("active");

  document
    .getElementById("receivedBtn")
    .classList.remove("active");

  if (type === "sent") {

    document
      .getElementById("sentBtn")
      .classList.add("active");

  } else {

    document
      .getElementById("receivedBtn")
      .classList.add("active");

  }

}
