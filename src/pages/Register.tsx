import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, User } from "lucide-react";

import Button from "@/components/ui/Button";
import AuthLayout from "@/components/auth/AuthLayout";
import FormInput from "@/components/auth/FormInput";
import PasswordInput from "@/components/auth/PasswordInput";
import GoogleButton from "@/components/auth/GoogleButton";
import Divider from "@/components/auth/Divider";

import { useRoleGuard } from "@/hooks/useAuth";

/* ================= TYPES ================= */
type FormData = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type Errors = Partial<FormData>;

/* ================= COMPONENT ================= */
export default function Register() {
  const navigate = useNavigate();
  const { selectedRole, backToRoleSelect } = useRoleGuard();

  /* ================= STATE ================= */
  const [form, setForm] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<Errors>({});
  const [isLoading, setIsLoading] = useState(false);

  /* ================= INPUT HANDLER ================= */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    // hapus error saat user mengetik
    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));
  };

  /* ================= REDIRECT LOGIC ================= */
  const redirectAfterRegister = () => {
    if (selectedRole === "owner") {
      // 🔑 dipakai PricingGuard
      sessionStorage.setItem("registeredOwner", "true");
      navigate("/pricing", { replace: true });
    } else {
      navigate("/login?registered=true", { replace: true });
    }
  };

  /* ================= SUBMIT ================= */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    setIsLoading(true);

    try {
      // simulasi API register
      await new Promise((r) => setTimeout(r, 1000));
      redirectAfterRegister();
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= GOOGLE REGISTER ================= */
  const handleGoogleRegister = async () => {
    if (!selectedRole) return;

    setIsLoading(true);

    try {
      await new Promise((r) => setTimeout(r, 800));
      redirectAfterRegister();
    } finally {
      setIsLoading(false);
    }
  };

  /* ================= UI ================= */
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Sign up as"
      selectedRole={selectedRole}
      onBack={backToRoleSelect}
    >
      <div className="space-y-6">
        <GoogleButton onClick={handleGoogleRegister} />
        <Divider />

        <form onSubmit={handleSubmit} className="space-y-4">
          <FormInput
            label="Full Name"
            icon={User}
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter your full name"
            error={errors.name}
            required
          />

          <FormInput
            label="Email"
            icon={Mail}
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@example.com"
            error={errors.email}
            required
          />

          <PasswordInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Minimum 8 characters"
            error={errors.password}
            required
          />

          <PasswordInput
            label="Confirm Password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Repeat your password"
            error={errors.confirmPassword}
            required
          />

          <Button
            type="submit"
            variant="gold"
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </form>

        <p className="text-sm text-neutral-400 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-amber-400 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
}
