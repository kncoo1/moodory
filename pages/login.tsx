import { useState } from "react";
import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/router";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function Login() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  async function login() {
    await supabase.auth.signInWithOtp({ email });
    alert("Check your email for login link!");
  }

  return (
    <main style={{ maxWidth: 400, margin: "auto", padding: 40 }}>
      <h2>Moodtude Login</h2>
      <input
        placeholder="Email"
        onChange={e => setEmail(e.target.value)}
        style={{ width: "100%", marginBottom: 12 }}
      />
      <button onClick={login}>Send Login Link</button>
    </main>
  );
}
