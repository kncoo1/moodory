import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { entry } = req.body;

  const prompt = `You are a kind mental health coach. Respond with encouragement and coping tips for:\n${entry}`;

  const ai = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4.1-mini",
      messages: [{ role: "user", content: prompt }]
    })
  });

  const json = await ai.json();
  res.json({ reply: json.choices[0].message.content });
}
