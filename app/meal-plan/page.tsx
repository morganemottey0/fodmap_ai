"use client";

import { useState } from "react";
import { DayPlan, MealPlan } from "@/types/fodmap";
import MealCard from "@/components/MealCard";

export default function MealPlanPage() {
  const [days, setDays] = useState(3);
  const [preferences, setPreferences] = useState("");
  const [mealPlan, setMealPlan] = useState<MealPlan | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generate = async () => {
    setLoading(true);
    setError(null);
    setMealPlan(null);

    try {
        const res = await fetch("/api/meal-plan", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ days, preferences }),
          });
          
          const data = await res.json();
          
          if (!res.ok) {
            setError(data.error ?? "Erreur lors de la génération.");
            return;
          }
          
          setMealPlan(data);
    } catch {
      setError("Impossible de générer le plan de repas.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-16">
      <div className="max-w-2xl mx-auto space-y-8">

        <div className="text-center space-y-1">
          <h1 className="text-3xl font-bold text-gray-900">Plan de repas</h1>
          <p className="text-black text-sm">
            Génère un menu low-FODMAP personnalisé
          </p>
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre de jours
            </label>
            <select
              value={days}
              onChange={(e) => setDays(Number(e.target.value))}
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {[1, 2, 3, 5, 7].map((d) => (
                <option key={d} value={d}>
                  {d} jour{d > 1 ? "s" : ""}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Préférences alimentaires
            </label>
            <input
              type="text"
              value={preferences}
              onChange={(e) => setPreferences(e.target.value)}
              placeholder="Ex : végétarien, sans gluten, riche en protéines..."
              className="w-full px-4 py-2 rounded-xl border border-gray-300 text-black text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            onClick={generate}
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? "Génération en cours..." : "Générer mon plan"}
          </button>
        </div>

        {error && (
          <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-xl p-3">
            {error}
          </div>
        )}

        {mealPlan && (
          <div className="space-y-6">
            {mealPlan.days.map((day: DayPlan) => (
              <div key={day.day} className="space-y-3">
                <h2 className="text-lg font-semibold text-gray-800">
                  {day.day}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                  <MealCard title="Petit-déjeuner" meal={day.breakfast} />
                  <MealCard title="Déjeuner" meal={day.lunch} />
                  <MealCard title="Dîner" meal={day.dinner} />
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </main>
  );
}