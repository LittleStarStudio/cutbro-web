import Layout from "@/components/dashboard/DasboardLayout";
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Users as UsersIcon, Plus, Mail, Phone, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import { superAdminLogo, superAdminMenu } from "@/components/config/Menu";
import { logout, getUser } from "@/lib/auth";
import type { User } from "@/type/AdminType";
import { searchInObject, filterByField, capitalizeFirst } from "@/lib/utils/AdminUtils";
import {
  ROLE_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
  STATUS_STYLES,
  STATUS_DOT_COLORS,
} from "@/components/entities/constants/AdminConstants";
import StatCard from "@/components/admin/StatsCard";
import SearchAndFilters from "@/components/admin/SearchAndFilters";
import Badge from "@/components/admin/Badge";
import DeleteModal from "@/components/admin/DeleteModal";
import EmptyState from "@/components/admin/EmptyState";
import ActionButtons from "@/components/admin/ActionButtons";

// ==================== DUMMY DATA ====================
const DUMMY_USERS: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "owner",
    phone: "+62 812-3456-7890",
    status: "active",
    joinedDate: "2024-01-15",
    barbershop: "Classic Cuts",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    role: "barber",
    phone: "+62 813-4567-8901",
    status: "active",
    joinedDate: "2024-02-20",
    barbershop: "Barber King",
  },
  {
    id: 3,
    name: "Bob Wilson",
    email: "bob@example.com",
    role: "admin",
    phone: "+62 814-5678-9012",
    status: "active",
    joinedDate: "2023-12-10",
  },
  {
    id: 4,
    name: "Alice Brown",
    email: "alice@example.com",
    role: "customer",
    phone: "+62 815-6789-0123",
    status: "inactive",
    joinedDate: "2024-03-05",
  },
  {
    id: 5,
    name: "Charlie Davis",
    email: "charlie@example.com",
    role: "barber",
    phone: "+62 816-7890-1234",
    status: "active",
    joinedDate: "2024-01-25",
    barbershop: "Urban Cuts",
  },
];

// ==================== ROLE BADGE STYLES ====================
const ROLE_STYLES: Record<string, string> = {
  admin: "bg-purple-500/10 text-purple-400 border-purple-500/20",
  owner: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  barber: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  customer: "bg-neutral-500/10 text-neutral-400 border-neutral-500/20",
};

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const currentUser = getUser();

  useEffect(() => {
    setUsers(DUMMY_USERS);
  }, []);

  // Calculate stats
  const stats = useMemo(() => {
    return {
      total: users.length,
      active: users.filter((u) => u.status === "active").length,
      owners: users.filter((u) => u.role === "owner").length,
      barbers: users.filter((u) => u.role === "barber").length,
    };
  }, [users]);

  // Filter users
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = searchInObject(user, searchQuery, [
        "name",
        "email",
        "phone",
        "barbershop",
      ]);
      const matchesRole = filterByField(user, "role", filterRole);
      const matchesStatus = filterByField(user, "status", filterStatus);

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [users, searchQuery, filterRole, filterStatus]);

  const handleDeleteClick = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = () => {
    if (selectedUser) {
      setUsers((prev) => prev.filter((user) => user.id !== selectedUser.id));
      setShowDeleteModal(false);
      setSelectedUser(null);
    }
  };

  return (
    <Layout
      title="Users Management"
      subtitle="Manage all registered users"
      menuItems={superAdminMenu}
      logo={superAdminLogo}
      onLogout={logout}
      user={
        currentUser
          ? {
              name: currentUser.name,
              email: currentUser.email,
              avatar: currentUser.name.charAt(0).toUpperCase(),
            }
          : undefined
      }
      showNotification={true}
      notificationCount={3}
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">Users</h1>
            <p className="text-neutral-400 text-sm mt-1">
              Manage all registered users
            </p>
          </div>

          <Link to="/admin/users/add">
            <Button variant="gold" className="shadow-lg shadow-amber-500/25">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Users"
            value={stats.total}
            icon={UsersIcon}
            iconBgColor="bg-blue-500/10"
            iconColor="text-blue-400"
          />
          <StatCard
            title="Active Users"
            value={stats.active}
            icon={UsersIcon}
            iconBgColor="bg-emerald-500/10"
            iconColor="text-emerald-400"
          />
          <StatCard
            title="Owners"
            value={stats.owners}
            icon={Shield}
            iconBgColor="bg-amber-500/10"
            iconColor="text-amber-400"
          />
          <StatCard
            title="Barbers"
            value={stats.barbers}
            icon={UsersIcon}
            iconBgColor="bg-purple-500/10"
            iconColor="text-purple-400"
          />
        </div>

        {/* Filters */}
        <SearchAndFilters
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          searchPlaceholder="Search users by name, email, or phone..."
          filters={[
            {
              label: "Role",
              value: filterRole,
              onChange: setFilterRole,
              options: ROLE_FILTER_OPTIONS,
            },
            {
              label: "Status",
              value: filterStatus,
              onChange: setFilterStatus,
              options: STATUS_FILTER_OPTIONS,
            },
          ]}
        />

        {/* Table */}
        <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    User
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Contact
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Role
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Barbershop
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Joined Date
                  </th>
                  <th className="text-left px-6 py-4 text-sm font-semibold text-neutral-400">
                    Status
                  </th>
                  <th className="text-right px-6 py-4 text-sm font-semibold text-neutral-400">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <EmptyState
                    icon={UsersIcon}
                    title="No users found"
                    description="Try adjusting your search or filters"
                  />
                ) : (
                  filteredUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-neutral-800 hover:bg-neutral-800/50 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-white font-bold">
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {user.name}
                            </p>
                            <div className="flex items-center gap-1 text-sm text-neutral-400">
                              <Mail className="w-3 h-3" />
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-1 text-neutral-300">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={capitalizeFirst(user.role)}
                          variant={ROLE_STYLES[user.role]}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300">
                          {user.barbershop || "-"}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="text-neutral-300">
                          {new Date(user.joinedDate).toLocaleDateString(
                            "id-ID"
                          )}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <Badge
                          text={capitalizeFirst(user.status)}
                          variant={STATUS_STYLES[user.status]}
                          showDot
                          dotColor={STATUS_DOT_COLORS[user.status]}
                        />
                      </td>

                      <td className="px-6 py-4">
                        <ActionButtons
                          actions={[
                            {
                              type: "view",
                              href: `/admin/users/${user.id}`,
                            },
                            {
                              type: "edit",
                              href: `/admin/users/edit/${user.id}`,
                            },
                            {
                              type: "delete",
                              onClick: () => handleDeleteClick(user),
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        title="Delete User"
        itemName={selectedUser?.name || ""}
        onConfirm={handleConfirmDelete}
        onCancel={() => setShowDeleteModal(false)}
      />
    </Layout>
  );
}