
let chats =
  JSON.parse(localStorage.getItem("chats"));

if (!chats) {

  chats = [

    {
      name: "MPESA",

      canReply: false,

      messages: [
        {
          text:
            "Welcome to MPESA.",

          sender: "them",

          time: "09:10 AM",

          status: "delivered"
        }
      ]
    },

    {
      name: "Alex",

      canReply: true,

      messages: []
    }

  ];

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

}

function saveChats() {

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

}

function renderChats() {

  const chatList =
    document.getElementById(
      "chatList"
    );

  if (!chatList) return;

  chatList.innerHTML = "";

  chats.forEach((chat, index) => {

    let lastMessage =
      "No messages yet";

    let lastTime = "";

    if (
      chat.messages &&
      chat.messages.length > 0
    ) {

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

      <div class="chat-content">

        <div class="chat-top">

          <div class="chat-name">
            ${chat.name}
          </div>

          <div class="chat-time">
            ${lastTime}
          </div>

        </div>

        <div class="last-message">
          ${lastMessage}
        </div>

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

function toggleMenu() {

  document
    .getElementById(
      "dropdownMenu"
    )
    .classList.toggle(
      "hidden"
    );

}

function goToSettings() {

  window.location.href =
    "settings.html";

}

renderChats();
