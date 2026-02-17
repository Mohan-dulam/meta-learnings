async function sendMessage() {

  const input = document.getElementById("userInput");
  const message = input.value;

  if (!message) return;

  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML += `<p><b>You:</b> ${message}</p>`;
  input.value = "";

  try {

    const response = await fetch("https://meta-learnings-hcweyq4v5-mohans-projects-733d3d9c.vercel.app/api/chat", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();

    chatbox.innerHTML += `<p><b>AI Tutor:</b> ${data.reply}</p>`;
    chatbox.scrollTop = chatbox.scrollHeight;

  } catch (error) {
    chatbox.innerHTML += `<p><b>AI Tutor:</b> Connection failed. Check API.</p>`;
  }
}
