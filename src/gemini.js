export async function analyzeProblem(text) {
  const res = await fetch(
    "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
      import.meta.env.VITE_GEMINI_API_KEY,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `
Summarize the following problem in ONE short sentence.
Classify it into ONE category: Electrical, Medical, Household, Other.
Set urgency: Low, Medium, or High.

Respond ONLY in valid JSON.

Problem:
"${text}"
`
              }
            ]
          }
        ]
      })
    }
  );

  const data = await res.json();

  if (!data.candidates || !data.candidates.length) {
    throw new Error("No response from Gemini");
  }

  return JSON.parse(
    data.candidates[0].content.parts[0].text
  );
}