import { FodmapLevel } from "@/types/fodmap";

const BADGE_STYLES: Record<FodmapLevel, string> = {
  low: "bg-green-100 text-green-800 border border-green-300",
  medium: "bg-yellow-100 text-yellow-800 border border-yellow-300",
  high: "bg-red-100 text-red-800 border border-red-300",
};

const BADGE_LABELS: Record<FodmapLevel, string> = {
  low: "Low FODMAP",
  medium: "Modéré",
  high: "High FODMAP",
};

export default function FodmapBadge({ level }: { level: FodmapLevel }) {
  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium ${BADGE_STYLES[level]}`}>
      {BADGE_LABELS[level]}
    </span>
  );
}