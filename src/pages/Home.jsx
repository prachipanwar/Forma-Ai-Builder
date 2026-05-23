import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <div className="text-center space-y-6">
        <h1 className="text-6xl font-bold">
          AI Form Pilot
        </h1>

        <p className="text-zinc-400 text-lg max-w-xl">
          Build intelligent forms using AI-powered schema generation.
        </p>

        <Link
          to="/builder"
          className="inline-flex items-center justify-center rounded-xl bg-white text-black px-6 py-3 font-medium hover:opacity-90 transition"
        >
          Open Builder
        </Link>
      </div>
    </div>
  );
}