import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Home() {
  const [entry, setEntry] = useState("");
  const [reply, setReply] = useState("");
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data.user) router.push("/login");
      else setUser(data.user);
    });
  }, []);

  async function submit() {
    const res = await fetch("/api/ai", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ entry })
    });
    const data = await res.json();
    setReply(data.reply);

    await supabase.from("journals").insert({
      user_id: user.id,
      content: entry,
      ai_reply: data.reply
    });
  }

  return (
    <main style={{ maxWidth: 600, margin: "auto", padding: 24 }}>
      <h1>🧠 Moodtude</h1>
      <textarea
        value={entry}
        onChange={e => setEntry(e.target.value)}
        placeholder="How did your day go?"
        style={{ width: "100%", height: 120 }}
      />
      <button onClick={submit}>Save & Get Encouragement</button>
      {reply && <p style={{ marginTop: 16 }}>{reply}</p>}
    </main>
  );
}
