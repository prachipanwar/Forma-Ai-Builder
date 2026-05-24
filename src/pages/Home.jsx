import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(120,119,255,0.18),transparent_35%)]" />

      <div className="absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/10 blur-3xl" />

      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-violet-500/10 blur-3xl" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6 flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-zinc-300 backdrop-blur-xl mt-8"
        >
          <Sparkles size={16} />
          AI-powered form generation
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.1,
            duration: 0.7,
          }}
          className="max-w-5xl text-5xl font-bold leading-tight tracking-tight sm:text-6xl md:text-7xl"
        >
          Build modern forms
          <span className="block bg-gradient-to-r from-white via-violet-200 to-cyan-300 bg-clip-text text-transparent">
            with AI assistance
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.7,
          }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400 sm:text-lg"
        >
          Generate intelligent form schemas, customize fields visually, and
          build production-ready forms with a sleek low-code experience.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.7,
          }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link to="/builder">
            <Button
              size="lg"
              className="group h-12 rounded-xl bg-gradient-to-r from-violet-500 to-cyan-500 px-8 text-base text-white shadow-lg shadow-violet-500/20 transition hover:scale-[1.02] hover:opacity-90 cursor-pointer"
            >
              Open Builder
              <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>

          <a href="#features">
            <Button
              variant="outline"
              size="lg"
              className="
              cursor-pointer
      h-12 rounded-xl
      border-white/10
      bg-white/5
      px-8
      text-base
      text-white
      backdrop-blur
      hover:bg-white/10
    "
            >
              Explore Features
            </Button>
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.35,
            duration: 0.7,
          }}
          className="mt-24 grid w-full max-w-6xl gap-5 md:grid-cols-3"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-500/10">
              ✨
            </div>

            <h3 className="text-lg font-semibold">AI Form Generation</h3>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Generate intelligent form schemas instantly using natural language
              prompts.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/10">
              ⚡
            </div>

            <h3 className="text-lg font-semibold">Visual Builder</h3>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Drag, reorder, and customize fields with a modern low-code
              experience.
            </p>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-pink-500/10">
              🚀
            </div>

            <h3 className="text-lg font-semibold">Live Preview</h3>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              Instantly preview forms with responsive, production-ready
              rendering.
            </p>
          </div>
        </motion.div>

        <motion.div
          id="features"
          initial={{ opacity: 0, y: 40 }}
          animate={{
            opacity: 1,
            y: [0, -10, 0],
          }}
          transition={{
            delay: 0.4,
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="mt-20 w-full max-w-5xl"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-2xl backdrop-blur-xl">
            <div className="rounded-2xl border border-white/10 bg-black/60 p-6 text-left">
              <div className="mb-4 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-400/80" />

                <div className="h-3 w-3 rounded-full bg-yellow-400/80" />

                <div className="h-3 w-3 rounded-full bg-green-400/80" />
              </div>

              <div className="space-y-4">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                  <p className="text-sm text-zinc-500">AI Prompt</p>

                  <p className="mt-2 text-zinc-200">
                    Create a modern employee onboarding form with department,
                    role, start date, and emergency contact fields.
                  </p>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-sm text-zinc-500">
                      Generated Field
                    </p>

                    <div className="space-y-2">
                      <div className="h-10 rounded-lg border border-white/10 bg-black/60" />

                      <div className="h-10 rounded-lg border border-white/10 bg-black/60" />
                    </div>
                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="mb-2 text-sm text-zinc-500">Live Preview</p>

                    <div className="space-y-2">
                      <div className="h-10 rounded-lg border border-white/10 bg-black/60" />

                      <div className="h-24 rounded-lg border border-white/10 bg-black/60" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      <div className="mt-16 pb-8 text-center text-sm text-zinc-500">
        Designed & developed by 👩🏻‍💻
        <span className="bg-gradient-to-r from-violet-300 to-cyan-300 bg-clip-text text-transparent">
          Prachi Panwar
        </span>
      </div>
    </div>
  );
}
