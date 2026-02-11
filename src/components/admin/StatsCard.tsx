import type{ LucideIcon } from "lucide-react";

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  iconBgColor: string;
  iconColor: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
};

export default function StatCard({
  title,
  value,
  icon: Icon,
  iconBgColor,
  iconColor,
  trend,
}: StatCardProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-3 sm:p-4 hover:border-neutral-700 transition-colors">
      <div className="flex items-center justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-neutral-400 text-xs sm:text-sm truncate">{title}</p>
          <p className="text-xl sm:text-2xl font-bold text-white mt-1 truncate">{value}</p>
          {trend && (
            <p
              className={`text-xs mt-1 sm:mt-2 ${
                trend.isPositive ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {trend.isPositive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className={`w-10 h-10 sm:w-12 sm:h-12 rounded-lg ${iconBgColor} flex items-center justify-center flex-shrink-0`}
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${iconColor}`} />
        </div>
      </div>
    </div>
  );
}