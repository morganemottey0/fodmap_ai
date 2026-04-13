import { Meal } from "@/types/fodmap";

export default function MealCard({
  title,
  meal,
}: {
  title: string;
  meal: Meal;
}) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-2">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
        {title}
      </p>
      <p className="font-medium text-gray-900">{meal.name}</p>
      <ul className="text-sm text-gray-600 space-y-0.5">
        {meal.ingredients.map((ing, i) => (
          <li key={i} className="flex items-start gap-1">
            <span className="text-green-500 mt-0.5">•</span>
            {ing}
          </li>
        ))}
      </ul>
      <p className="text-xs text-blue-600 bg-blue-50 rounded-lg px-2 py-1">
        {meal.tips}
      </p>
    </div>
  );
}