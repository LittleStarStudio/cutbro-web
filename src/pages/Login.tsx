import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail } from "lucide-react";

import Button from "@/components/ui/Button";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";

import { login, getRoleDashboard, type User } from "@/lib/auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // ===============================
      // 🔥 SIMULASI RESPONSE BACKEND
      // ===============================
      const fakeResponse: User = {
        name: email.split("@")[0],
        email,
        role: getRoleFromEmail(email),
      };

      await new Promise((r) => setTimeout(r, 800));

      login(fakeResponse);

      navigate(getRoleDashboard(fakeResponse.role), { replace: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout title="Sign In" subtitle="" selectedRole={null} onBack={() => {}}>
      <form onSubmit={onSubmit} className="space-y-6">
        <FormInput
          label="Email"
          icon={Mail}
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <PasswordInput
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button type="submit" className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Login"}
        </Button>

        <p className="text-center text-sm text-neutral-400">
          Don't have an account?{" "}
          <Link to="/roleselect" className="text-amber-400 hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

/* ================= ROLE SIMULATOR ================= */
function getRoleFromEmail(email: string) {
  if (email.startsWith("admin")) return "admin";
  if (email.startsWith("owner")) return "owner";
  if (email.startsWith("barber")) return "barber";
  return "customer";
}
