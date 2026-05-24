import { useState } from "react";

import { toast } from "sonner";

import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

import { generateFormSchema } from "@/services/ai";

export default function AIPrompt({ setSchema, setIsGenerating }) {
  const [prompt, setPrompt] = useState("");

  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");

      return;
    }

    try {
      setIsGenerating(true);

      setLoading(true);

      const generatedSchema = await generateFormSchema(prompt);

      setSchema(generatedSchema);

      toast.success("Form generated successfully");

      setPrompt("");
    } catch (error) {
      console.error(error);

      toast.error("AI limit reached. Please try again later.", {
        duration: 4000,
      });
    } finally {
      setIsGenerating(false);

      setLoading(false);
    }
  };

  return (
    <div
      className="
        mb-6
        rounded-3xl
        border
        border-white/10
        bg-white/[0.03]
        p-4
        backdrop-blur-xl
      "
    >
      <div className="flex flex-col gap-3 sm:flex-row">
        <input
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Generate a job application form..."
          className="
            flex-1
            rounded-xl
            border
            border-white/10
            bg-black/20
            px-4
            py-3
            outline-none
            transition-all
            duration-200
            placeholder:text-zinc-500
            focus:border-violet-500/40
            focus:ring-2
            focus:ring-violet-500/10
          "
        />

        <Button
          onClick={handleGenerate}
          disabled={loading}
          className="
            w-full
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
            disabled:cursor-not-allowed
            disabled:opacity-50
            sm:w-auto
          "
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            "Generate"
          )}
        </Button>
      </div>
    </div>
  );
}
