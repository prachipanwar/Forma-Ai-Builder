import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  import.meta.env.VITE_GEMINI_API_KEY
);

export async function generateFormSchema(
  prompt
) {
  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const result =
    await model.generateContent(`
Generate a form schema.

Return ONLY valid JSON array.

Each field must contain:
- id
- type
- label
- placeholder (if applicable)
- required

Supported field types:
text
email
textarea
select
checkbox
date

For select include:
options: []

Prompt:
${prompt}
`);

const rawText =
result.response.text();

const cleanedText = rawText
.replace(/```json/g, "")
.replace(/```/g, "")
.trim();

return JSON.parse(cleanedText);
}