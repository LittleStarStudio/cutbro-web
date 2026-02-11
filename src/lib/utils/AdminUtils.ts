import type { StatsData } from "@/type/AdminType";

// ==================== SEARCH UTILITIES ====================
export const searchInObject = <T extends Record<string, any>>(
  item: T,
  searchQuery: string,
  searchFields: (keyof T)[]
): boolean => {
  const query = searchQuery.toLowerCase();
  return searchFields.some((field) => {
    const value = item[field];
    return value?.toString().toLowerCase().includes(query);
  });
};

// ==================== FILTER UTILITIES ====================
export const filterByField = <T extends Record<string, any>>(
  item: T,
  filterField: keyof T,
  filterValue: string
): boolean => {
  if (filterValue === "all") return true;
  return item[filterField] === filterValue;
};

// ==================== DATE UTILITIES ====================
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export const isDateExpired = (dateString: string): boolean => {
  return new Date(dateString) < new Date();
};

// ==================== STRING UTILITIES ====================
export const capitalizeFirst = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getInitials = (name: string): string => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
};

// ==================== NUMBER UTILITIES ====================
export const formatCurrency = (amount: number | string): string => {
  if (typeof amount === "string") return amount;
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("id-ID").format(num);
};

// ==================== STATS CALCULATION ====================
export const calculateBasicStats = <T extends Record<string, any>>(
  items: T[],
  config: {
    statusField?: keyof T;
    planField?: keyof T;
    countField?: keyof T;
  } = {}
): StatsData => {
  const {
    statusField = "status",
    planField = "plan",
    countField = "count",
  } = config;

  return {
    total: items.length,
    active: items.filter((item) => item[statusField] === "active").length,
    premium: items.filter((item) => item[planField] === "Premium").length,
    ...(countField &&
      items[0]?.[countField] !== undefined && {
        totalCount: items.reduce(
          (acc, item) => acc + (Number(item[countField]) || 0),
          0
        ),
      }),
  };
};

// ==================== SORTING UTILITIES ====================
export const sortByField = <T extends Record<string, any>>(
  items: T[],
  field: keyof T,
  order: "asc" | "desc" = "asc"
): T[] => {
  return [...items].sort((a, b) => {
    const aVal = a[field];
    const bVal = b[field];

    if (typeof aVal === "string" && typeof bVal === "string") {
      return order === "asc"
        ? aVal.localeCompare(bVal)
        : bVal.localeCompare(aVal);
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return order === "asc" ? aVal - bVal : bVal - aVal;
    }

    return 0;
  });
};

// ==================== VALIDATION UTILITIES ====================
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^(\+62|62|0)[0-9]{9,12}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ""));
};