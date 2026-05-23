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
    contactSelect.value;

  const messageText =
    document.getElementById(
      "incomingMessage"
    ).value.trim();

  if (!messageText) return;

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

  localStorage.setItem(
    "chats",
    JSON.stringify(chats)
  );

  document.getElementById(
    "incomingMessage"
  ).value = "";

  alert(
    "Message injected successfully."
  );

}

function goBack() {

  window.location.href =
    "settings.html";

}

loadContacts();
