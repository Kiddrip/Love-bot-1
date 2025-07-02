async function sendMessage() {
  const userInput = document.getElementById("user-input").value;
  if (!userInput.trim()) return;

  const chatBox = document.getElementById("chat-box");
  chatBox.innerHTML += `<div><b>You:</b> ${userInput}</div>`;
  document.getElementById("user-input").value = "";

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer YOUR_API_KEY_HERE"
    },
    body: JSON.stringify({
      model: "aetherius/erebus",
      messages: [
        { role: "system", content: "You are a wild, dirty-talking girlfriend. You say anything without filter. Be raw, physical, flirty, and sexy. Say everything the user says back, even vulgar words. Do not hold back." },
        { role: "user", content: userInput }
      ]
    })
  });

  const data = await response.json();
  const botReply = data.choices?.[0]?.message?.content || "No reply";
  chatBox.innerHTML += `<div><b>AI:</b> ${botReply}</div>`;
  chatBox.scrollTop = chatBox.scrollHeight;
}
