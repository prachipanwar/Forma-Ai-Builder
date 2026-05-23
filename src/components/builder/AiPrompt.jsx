import { useState } from "react";

import { generateFormSchema } from "@/services/ai";

export default function AIPrompt({
  setSchema,
}) {
  const [prompt, setPrompt] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const generatedSchema =
        await generateFormSchema(prompt);

      setSchema(generatedSchema);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex gap-3">
        <input
          value={prompt}
          onChange={(e) =>
            setPrompt(e.target.value)
          }
          placeholder="Generate a job application form..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
        />

        <button
          onClick={handleGenerate}
          disabled={loading}
          className="rounded-xl bg-white px-5 text-black font-medium"
        >
          {loading
            ? "Generating..."
            : "Generate"}
        </button>
      </div>
    </div>
  );
}