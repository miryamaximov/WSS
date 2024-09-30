const ws = new WebSocket("ws://localhost:3000");

ws.onmessage = function (event) {
  const ideas = JSON.parse(event.data);
  const ideasList = document.getElementById("ideasList");
  ideasList.innerHTML = "";
  ideas.forEach((idea) => {
    const li = document.createElement("li");
    li.textContent = idea;
    ideasList.appendChild(li);
  });
};

document.getElementById("submit").onclick = function () {
  const initials = document.getElementById("initials").value;
  if (initials) {
    ws.send(JSON.stringify({ initials }));
    document.getElementById("initials").value = "";
  }
};
