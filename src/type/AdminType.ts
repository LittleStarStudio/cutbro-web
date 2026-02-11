// ==================== BASE TYPES ====================
export type PlanType = "Free" | "Pro" | "Premium";
export type StatusType = "active" | "inactive" | "pending" | "suspended";

// ==================== BARBERSHOP TYPES ====================
export type Barbershop = {
  id: number;
  name: string;
  owner: string;
  location: string;
  plan: PlanType;
  barbers: number;
  status: StatusType;
  revenue: string;
};

// ==================== USER TYPES ====================
export type UserRole = "admin" | "owner" | "barber" | "customer";

export type User = {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  phone: string;
  status: StatusType;
  joinedDate: string;
  barbershop?: string;
};

// ==================== SUBSCRIPTION TYPES ====================
export type SubscriptionStatus = "active" | "expired" | "cancelled" | "trial";

export type Subscription = {
  id: number;
  name: string;
  email: string;
  plan: PlanType;
  status: SubscriptionStatus;
  startDate: string;
  endDate: string;
  revenue: string;
  barbershop: string;
};

// Alias for backward compatibility
export type Subscriber = Subscription;

// ==================== PACKAGE TYPES ====================
export type PackageType = {
  id: number;
  name: string;
  plan: PlanType;
  price: string;
  duration: string;
  features: number;
  subscribers: number;
  status: StatusType;
  revenue: string;
};

// ==================== REPORT TYPES ====================
export type ReportType = "sales" | "users" | "barbershops" | "subscriptions";
export type ReportPeriod = "daily" | "weekly" | "monthly" | "yearly";

export type Report = {
  id: number;
  title: string;
  type: ReportType;
  period: ReportPeriod;
  generatedDate: string;
  generatedBy: string;
  status: "completed" | "processing" | "failed";
  fileSize: string;
};

// ==================== STATS TYPES ====================
export type StatsData = {
  total: number;
  active: number;
  premium?: number;
  totalBarbers?: number;
  [key: string]: number | undefined;
};

// ==================== TABLE COLUMN TYPE ====================
export type TableColumn<T> = {
  key: keyof T | string;
  label: string;
  sortable?: boolean;
  render?: (item: T) => React.ReactNode;
};

// ==================== FILTER TYPES ====================
export type FilterOption = {
  label: string;
  value: string;
};