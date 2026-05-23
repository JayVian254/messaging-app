let chats =
  JSON.parse(localStorage.getItem("chats"))
  || [];

const contactSelect =
  document.getElementById(
    "contactSelect"
  );

function loadContacts() {

  contactSelect.innerHTML = "";

  chats.forEach((chat, index) => {

    const option =
      document.createElement("option");

    option.value = index;

    option.innerText = chat.name;

    contactSelect.appendChild(option);

  });

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

function sendIncomingMessage() {

  const messageInput =
    document.getElementById(
      "incomingMessage"
    );

  const text =
    messageInput.value.trim();

  if (!text) return;

  const selectedChat =
    contactSelect.value;

  chats[selectedChat].messages.push({

    text: text,

    type: "received",

    time: getTime(),

    status: "delivered"

  });

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

  messageInput.value = "";

  alert(
    "Incoming message injected."
  );

}

function goBack() {

  window.location.href =
    "settings.html";

}

loadContacts();
