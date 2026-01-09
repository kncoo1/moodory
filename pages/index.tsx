import { useState } from "react";

export default function Moodtude() {
  const [entry, setEntry] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit() {
    setLoading(true);
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry })
    });
    const data = await res.json();
    setReply(data.reply);
    setLoading(false);
  }

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <h1>🧠 Moodtude</h1>
      <p>Your personal AI mental health journal</p>
      <textarea
        value={entry}
        onChange={e => setEntry(e.target.value)}
        placeholder="How did your day go?"
        style={{ width: "100%", height: 120 }}
      />
      <button onClick={submit} disabled={loading}>
        {loading ? "Thinking..." : "Get Encouragement"}
      </button>
      {reply && <p style={{ marginTop: 16 }}>{reply}</p>}
    </main>
  );
}
