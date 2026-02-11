import {
  LayoutDashboard,
  Building2,
  Users,
  Package,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  Store,
  Calendar,
  Scissors,
  Clock,
  DollarSign,
  UserCircle,
  History,
  ShoppingBag,
} from "lucide-react";

import type { MenuItem } from "@/components/layout/SideBar";

// Super Admin Menu
export const superAdminMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin" },
  { icon: Building2, label: "Barbershops", href: "/admin/barbershops" },
  { icon: Users, label: "Users", href: "/admin/users" },
  { icon: Package, label: "Packages", href: "/admin/packages" },
  { icon: CreditCard, label: "Subscriptions", href: "/admin/subscriptions" },
  { icon: BarChart3, label: "Reports", href: "/admin/reports" },
  { icon: Shield, label: "Security", href: "/admin/security" },
  { icon: Settings, label: "Settings", href: "/admin/settings" },
];

// Owner Menu
export const ownerMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/owner" },
  { icon: Store, label: "My Barbershop", href: "/owner/barbershop" },
  { icon: Calendar, label: "Bookings", href: "/owner/bookings" },
  { icon: Scissors, label: "Barbers", href: "/owner/barbers" },
  { icon: Package, label: "Services", href: "/owner/services" },
  { icon: BarChart3, label: "Reports", href: "/owner/reports" },
  { icon: DollarSign, label: "Finance", href: "/owner/finance" },
  { icon: CreditCard, label: "Subscription", href: "/owner/subscription" },
  { icon: Settings, label: "Settings", href: "/owner/settings" },
];

// Barber Menu
export const barberMenu: MenuItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/barber" },
  { icon: Calendar, label: "My Schedule", href: "/barber/schedule" },
  { icon: Clock, label: "Today's Bookings", href: "/barber/today" },
  { icon: History, label: "History", href: "/barber/history" },
  { icon: BarChart3, label: "Performance", href: "/barber/performance" },
  { icon: DollarSign, label: "Earnings", href: "/barber/earnings" },
  { icon: UserCircle, label: "Profile", href: "/barber/profile" },
  { icon: Settings, label: "Settings", href: "/barber/settings" },
];

// Customer Menu (No Sidebar - Empty array)
export const customerMenu: MenuItem[] = [];

// Logo configurations for each role
export const superAdminLogo = {
  icon: Shield,
  text: "Super",
  highlight: "Admin",
};

export const ownerLogo = {
  icon: Store,
  text: "Barber",
  highlight: "Owner",
};

export const barberLogo = {
  icon: Scissors,
  text: "Barber",
  highlight: "Pro",
};

export const customerLogo = {
  icon: ShoppingBag,
  text: "Barber",
  highlight: "Book",
};
