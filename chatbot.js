async function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  const response = await fetch("https://meta-learnings-hcweyq4v5-mohans-projects-733d3d9c.vercel.app/api/chat", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ message })
  });

  const data = await response.json();
  chatbox.innerHTML += `<p><b>AI Tutor:</b> ${data.reply}</p>`;
  chatbox.scrollTop = chatbox.scrollHeight;
}
