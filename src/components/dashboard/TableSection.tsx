import {
  Ban,
  AlertCircle,
  Eye,
  Lock,
  Unlock,
  MapPin,
  TrendingUp,
} from "lucide-react";
import Badge from "@/components/admin/Badge";

/* ================= TYPES ================= */

export type Shop = {
  id: number;
  name: string;
  owner: string;
  location: string;
  plan: "Free" | "Pro" | "Premium";
  barbers: number;
  status: "active" | "suspended" | "pending";
  revenue: string;
  rating?: number;
};

type Props = {
  shops: Shop[];

  /** required */
  onView: (id: number) => void;

  /** optional actions */
  onEdit?: (id: number) => void;
  onSuspend?: (id: number, status: Shop["status"]) => void;
  onDelete?: (id: number) => void;
};

/* ================= COMPONENT ================= */

export default function BarbershopTable({
  shops,
  onView,
  onSuspend,
  onDelete,
}: Props) {
  // Plan badge config
  const getPlanBadge = (plan: Shop["plan"]) => {
    switch (plan) {
      case "Premium":
        return {
          text: plan,
          variant: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          showCrown: true,
        };
      case "Pro":
        return {
          text: plan,
          variant: "bg-blue-500/10 text-blue-400 border-blue-500/20",
          showCrown: false,
        };
      case "Free":
        return {
          text: plan,
          variant: "bg-neutral-700 text-neutral-300 border-neutral-600",
          showCrown: false,
        };
    }
  };

  // Status badge config
  const getStatusBadge = (status: Shop["status"]) => {
    switch (status) {
      case "active":
        return {
          text: "Active",
          variant: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
          showDot: true,
          dotColor: "bg-emerald-400",
        };
      case "suspended":
        return {
          text: "Suspended",
          variant: "bg-red-500/10 text-red-400 border-red-500/20",
          showDot: true,
          dotColor: "bg-red-400",
        };
      case "pending":
        return {
          text: "Pending",
          variant: "bg-amber-500/10 text-amber-400 border-amber-500/20",
          showDot: true,
          dotColor: "bg-amber-400",
        };
    }
  };

  if (shops.length === 0) {
    return (
      <div className="text-center py-12 text-neutral-400">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-neutral-600" />
        <p className="font-semibold">No barbershops found</p>
        <p className="text-sm mt-1 text-neutral-600">
          Try adjusting your search or filters
        </p>
      </div>
    );
  }

  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-800">
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Barbershop
              </th>
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Owner
              </th>
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Plan
              </th>
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Revenue
              </th>
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Barbers
              </th>
              <th className="px-6 py-4 text-left text-sm text-neutral-400">
                Status
              </th>
              <th className="px-6 py-4 text-right text-sm text-neutral-400">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {shops.map((shop) => {
              const planBadge = getPlanBadge(shop.plan);
              const statusBadge = getStatusBadge(shop.status);

              return (
                <tr
                  key={shop.id}
                  className="border-b border-neutral-800 hover:bg-neutral-800/50"
                >
                  {/* Shop */}
                  <td className="px-6 py-4">
                    <p className="font-semibold">{shop.name}</p>
                    <div className="flex items-center gap-1 text-sm text-neutral-400">
                      <MapPin className="w-3 h-3" />
                      {shop.location}
                    </div>
                  </td>

                  {/* Owner */}
                  <td className="px-6 py-4 text-neutral-300">{shop.owner}</td>

                  {/* Plan */}
                  <td className="px-6 py-4">
                    <Badge
                      text={planBadge.text}
                      variant={planBadge.variant}
                      showCrown={planBadge.showCrown}
                    />
                  </td>

                  {/* Revenue */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-emerald-400" />
                      {shop.revenue}
                    </div>
                  </td>

                  {/* Barbers */}
                  <td className="px-6 py-4">{shop.barbers}</td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <Badge
                      text={statusBadge.text}
                      variant={statusBadge.variant}
                      showDot={statusBadge.showDot}
                      dotColor={statusBadge.dotColor}
                    />
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      {/* View */}
                      <button
                        onClick={() => onView(shop.id)}
                        className="p-2 bg-neutral-800 rounded-lg hover:bg-neutral-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>

                      {/* Suspend */}
                      {onSuspend && shop.status !== "pending" && (
                        <button
                          onClick={() => onSuspend(shop.id, shop.status)}
                          className="p-2 bg-neutral-800 rounded-lg hover:bg-red-500/10"
                        >
                          {shop.status === "suspended" ? (
                            <Unlock className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                        </button>
                      )}

                      {/* Delete */}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(shop.id)}
                          className="p-2 bg-neutral-800 rounded-lg hover:bg-red-500/10"
                        >
                          <Ban className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}