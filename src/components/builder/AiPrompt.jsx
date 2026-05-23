import { useState } from "react";
import { Toaster, toast } from "sonner";
import { Button } from "@/components/ui/button";
import { generateFormSchema } from "@/services/ai";

export default function AIPrompt({ setSchema }) {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;

    try {
      setLoading(true);

      const generatedSchema = await generateFormSchema(prompt);

      setSchema(generatedSchema);
      toast.success("Form generated successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to generate form");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-2xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Generate a job application form..."
          className="flex-1 rounded-xl border border-zinc-800 bg-zinc-950 px-4 py-3 outline-none"
        />

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="
w-full sm:w-auto
cursor-pointer
rounded-xl
bg-gradient-to-r
from-violet-500
to-cyan-500
px-5
text-white
shadow-lg
shadow-violet-500/20
transition-all
duration-200
hover:opacity-90
disabled:opacity-50
"
        >
          {loading ? "Generating..." : "Generate"}
        </Button>
      </div>
    </div>
  );
}
