import { Eye, Lock, Unlock } from "lucide-react";
import type { Barbershop } from "@/type/typeBarbershop";
import StatusBadge from "./StatusBadge";
import { formatCurrency, formatDate } from "@/lib/utils";

interface BarbershopTableProps {
  barbershops: Barbershop[];
  onViewDetail: (id: number) => void;
  onToggleSuspend: (id: number, status: string) => void;
  variant?: "default" | "compact"; // optional variant
}

export default function BarbershopTable({
  barbershops,
  onViewDetail,
  onToggleSuspend,
  variant = "default",
}: BarbershopTableProps) {
  if (barbershops.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground text-sm sm:text-base">
          No barbershop data available
        </p>
      </div>
    );
  }

  const cellPadding = variant === "compact" ? "py-3 px-2 sm:px-4" : "py-4 px-4";
  const fontSize = variant === "compact" ? "text-xs sm:text-sm" : "text-sm sm:text-base";

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Barbershop
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Owner
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Location
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Revenue
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Bookings
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Rating
              </th>
              <th className={`text-left ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Status
              </th>
              <th className={`text-center ${cellPadding} text-sm font-semibold text-muted-foreground`}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {barbershops.map((shop) => (
              <tr
                key={shop.id}
                className="border-b border-border hover:bg-muted/50 transition-colors"
              >
                <td className={cellPadding}>
                  <p className={`font-semibold text-foreground ${fontSize}`}>
                    {shop.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Joined: {formatDate(shop.joinDate)}
                  </p>
                </td>
                <td className={`${cellPadding} text-foreground ${fontSize}`}>
                  {shop.owner}
                </td>
                <td className={`${cellPadding} text-foreground ${fontSize}`}>
                  {shop.location}
                </td>
                <td className={cellPadding}>
                  <span className={`font-semibold text-foreground ${fontSize}`}>
                    {formatCurrency(shop.revenue)}
                  </span>
                </td>
                <td className={cellPadding}>
                  <span className={`font-semibold text-foreground ${fontSize}`}>
                    {shop.bookings}
                  </span>
                </td>
                <td className={cellPadding}>
                  <div className="flex items-center gap-1">
                    <span className={`font-semibold text-foreground ${fontSize}`}>
                      {shop.rating}
                    </span>
                    <span className="text-amber-500">⭐</span>
                  </div>
                </td>
                <td className={cellPadding}>
                  <StatusBadge status={shop.status} size={variant === "compact" ? "sm" : "md"} />
                </td>
                <td className={cellPadding}>
                  <div className="flex items-center justify-center gap-2">
                    <button
                      onClick={() => onViewDetail(shop.id)}
                      className="p-2 hover:bg-muted rounded-lg transition-colors"
                      title="View Details"
                    >
                      <Eye className="w-4 h-4 text-foreground" />
                    </button>

                    {shop.status !== "pending" && (
                      <button
                        onClick={() => onToggleSuspend(shop.id, shop.status)}
                        className={`p-2 hover:bg-muted rounded-lg transition-colors ${
                          shop.status === "suspended" ? "text-emerald-600" : "text-red-600"
                        }`}
                        title={shop.status === "suspended" ? "Activate" : "Suspend"}
                      >
                        {shop.status === "suspended" ? (
                          <Unlock className="w-4 h-4" />
                        ) : (
                          <Lock className="w-4 h-4" />
                        )}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="lg:hidden space-y-4">
        {barbershops.map((shop) => (
          <div
            key={shop.id}
            className="border border-border rounded-lg p-4 hover:shadow-md transition-shadow bg-background"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-foreground truncate">
                  {shop.name}
                </h3>
                <p className="text-xs text-muted-foreground">
                  {shop.owner} • {shop.location}
                </p>
              </div>
              <StatusBadge status={shop.status} size="sm" />
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-3 mb-3 text-sm">
              <div>
                <p className="text-muted-foreground text-xs">Revenue</p>
                <p className="font-semibold text-foreground truncate">
                  {formatCurrency(shop.revenue)}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Bookings</p>
                <p className="font-semibold text-foreground">{shop.bookings}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Rating</p>
                <p className="font-semibold text-foreground">
                  {shop.rating} ⭐
                </p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs">Joined</p>
                <p className="font-semibold text-foreground text-xs">
                  {formatDate(shop.joinDate)}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-3 border-t border-border">
              <button
                onClick={() => onViewDetail(shop.id)}
                className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg transition-colors text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                Details
              </button>

              {shop.status !== "pending" && (
                <button
                  onClick={() => onToggleSuspend(shop.id, shop.status)}
                  className={`flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg transition-colors text-sm font-medium ${
                    shop.status === "suspended"
                      ? "bg-emerald-100 hover:bg-emerald-200 text-emerald-700 dark:bg-emerald-950 dark:hover:bg-emerald-900 dark:text-emerald-400"
                      : "bg-red-100 hover:bg-red-200 text-red-700 dark:bg-red-950 dark:hover:bg-red-900 dark:text-red-400"
                  }`}
                >
                  {shop.status === "suspended" ? (
                    <>
                      <Unlock className="w-4 h-4" />
                      Activate
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Suspend
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
