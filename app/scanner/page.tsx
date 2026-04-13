"use client";

import { useState } from "react";
import { FodmapAnalysis } from "@/types/fodmap";
import FodmapResult from "@/components/FodmapResult";

export default function ScannerPage() {
  const [food, setFood] = useState("");
  const [portion, setPortion] = useState(100);
  const [result, setResult] = useState<FodmapAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyze = async () => {
    if (!food.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ food, portion }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error ?? "Une erreur est survenue.");
        return;
      }

      setResult(data);
    } catch {
      setError("Impossible de contacter le serveur.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") analyze();
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-16">
      <div className="w-full max-w-md space-y-6">

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">FODMAP Analyzer</h1>
          <p className="text-gray-500 text-sm">
            Entrez un aliment pour connaître son niveau FODMAP
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Aliment
            </label>
            <input
              type="text"
              value={food}
              onChange={(e) => setFood(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ex : mangue, ail, brocoli..."
              className="w-full px-4 py-2 rounded-xl border text-black border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Portion (g)
            </label>
            <input
              type="number"
              value={portion}
              onChange={(e) => setPortion(Number(e.target.value))}
              min={1}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={analyze}
            disabled={loading || !food.trim()}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Analyse en cours..." : "Analyser"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
            {error}
          </div>
        )}

        {result && <FodmapResult data={result} />}

      </div>
    </main>
  );
}