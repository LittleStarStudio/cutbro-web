import type { PlanType, StatusType, SubscriptionStatus } from "@/type/AdminType";

// ==================== PLAN STYLES ====================
export const PLAN_STYLES: Record<PlanType, string> = {
  Free: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  Pro: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  Premium: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

// ==================== STATUS STYLES ====================
export const STATUS_STYLES: Record<StatusType, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  inactive: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  suspended: "bg-red-500/10 text-red-400 border-red-500/20",
};

// ==================== SUBSCRIPTION STATUS STYLES ====================
export const SUBSCRIPTION_STATUS_STYLES: Record<SubscriptionStatus, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  expired: "bg-red-500/10 text-red-400 border-red-500/20",
  cancelled: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
  trial: "bg-blue-500/10 text-blue-400 border-blue-500/20",
};

// ==================== STATUS DOT COLORS ====================
export const STATUS_DOT_COLORS: Record<StatusType, string> = {
  active: "bg-emerald-400",
  inactive: "bg-neutral-400",
  pending: "bg-amber-400",
  suspended: "bg-red-400",
};

// ==================== SUBSCRIPTION STATUS DOT COLORS ====================
export const SUBSCRIPTION_STATUS_DOT_COLORS: Record<SubscriptionStatus, string> = {
  active: "bg-emerald-400",
  expired: "bg-red-400",
  cancelled: "bg-neutral-400",
  trial: "bg-blue-400",
};

// ==================== FILTER OPTIONS ====================
export const PLAN_FILTER_OPTIONS = [
  { label: "All Plans", value: "all" },
  { label: "Free", value: "Free" },
  { label: "Pro", value: "Pro" },
  { label: "Premium", value: "Premium" },
];

export const STATUS_FILTER_OPTIONS = [
  { label: "All Status", value: "all" },
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Pending", value: "pending" },
  { label: "Suspended", value: "suspended" },
];

export const ROLE_FILTER_OPTIONS = [
  { label: "All Roles", value: "all" },
  { label: "Admin", value: "admin" },
  { label: "Owner", value: "owner" },
  { label: "Barber", value: "barber" },
  { label: "Customer", value: "customer" },
];