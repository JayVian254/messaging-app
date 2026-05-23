
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

function getCurrentTime() {

  const now = new Date();

  return now.toLocaleTimeString(
    [],
    {
      hour: "2-digit",
      minute: "2-digit"
    }
  );

}

function getCustomTime() {

  const customTime =
    document.getElementById(
      "customTime"
    ).value;

  if (!customTime) {

    return getCurrentTime();

  }

  let [hour, minute] =
    customTime.split(":");

  hour = Number(hour);

  const suffix =
    hour >= 12
    ? "PM"
    : "AM";

  hour =
    hour % 12 || 12;

  return `${hour}:${minute} ${suffix}`;

}

function injectMessage() {

  const selectedChat =
    Number(
      contactSelect.value
    );

  const messageText =
    document.getElementById(
      "incomingMessage"
    ).value.trim();

  if (!messageText) {

    alert(
      "Please enter a message."
    );

    return;

  }

  const timeMode =
    document.querySelector(
      'input[name=\"timeMode\"]:checked'
    ).value;

  const finalTime =
    timeMode === "current"
    ? getCurrentTime()
    : getCustomTime();

  chats[selectedChat]
    .messages
    .push({

      text: messageText,

      sender: "them",

      time: finalTime,

      status: "delivered"

    });

  chats[selectedChat]
    .unreadCount++;

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

  alert(
    "Message injected successfully."
  );

  document.getElementById(
    "incomingMessage"
  ).value = "";

}

function goBack() {

  window.location.href =
    "settings.html";

}

loadContacts();
