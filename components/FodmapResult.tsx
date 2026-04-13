import { FodmapAnalysis } from "@/types/fodmap";
import FodmapBadge from "./FodmapBadge";

export default function FodmapResult({ data }: { data: FodmapAnalysis }) {
  return (
    <div className="mt-6 p-5 rounded-2xl border border-gray-200 bg-white shadow-sm space-y-4">
      
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-black capitalize">{data.food}</h2>
        <FodmapBadge level={data.level} />
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-black mb-1">Portion analysée</p>
          <p className="font-medium text-black">{data.portion}g</p>
        </div>
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-black mb-1">Portion sûre</p>
          <p className="font-medium text-black">
            {data.safe_portion === 0 ? "À éviter" : `${data.safe_portion}g`}
          </p>
        </div>
      </div>

      {data.fodmaps.length > 0 && (
        <div>
          <p className="text-sm text-black mb-2">FODMAP présents</p>
          <div className="flex flex-wrap gap-2">
            {data.fodmaps.map((f) => (
              <span
                key={f}
                className="px-2 py-1 text-xs rounded-full bg-orange-50 text-orange-700 border border-orange-200"
              >
                {f}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="text-sm text-gray-600 bg-blue-50 border border-blue-100 rounded-xl p-3">
        <p className="font-medium text-blue-700 mb-1">Conseil</p>
        <p>{data.tips}</p>
      </div>

    </div>
  );
}