import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "@/components/ui/Button";
import { Scissors, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

/* ================= NAV LINKS ================= */
const navLinks = [
  { label: "Home", href: "#hero" },
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Bookings", href: "#booking" },
];

/* ================= LOGO ================= */
const CutBroLogo: React.FC = () => {
  return (
    <div className="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center transition-transform group-hover:scale-105">
      <Scissors className="w-5 h-5 text-neutral-900 stroke-[2.5]" />
    </div>
  );
};

/* ================= NAV ITEM HELPER ================= */
const NavItem = ({
  href,
  label,
  onClick,
}: {
  href: string;
  label: string;
  onClick?: () => void;
}) => {
  const isHash = href.startsWith("#");

  // 👉 Anchor scroll
  if (isHash) {
    return (
      <a
        href={href}
        onClick={onClick}
        className="text-sm font-medium text-amber-200 hover:text-amber-400 transition-colors"
      >
        {label}
      </a>
    );
  }

  // 👉 Router page
  return (
    <Link
      to={href}
      onClick={onClick}
      className="text-sm font-medium text-amber-200 hover:text-amber-400 transition-colors"
    >
      {label}
    </Link>
  );
};

/* ================= NAVBAR ================= */
const NavbarLayout: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#1a1410]/80 via-[#2a1f1a]/80 to-[#1a1410]/80 backdrop-blur-lg border-b border-[#3a2e25]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ================= TOP BAR ================= */}
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group">
            <CutBroLogo />
            <span className="text-xl font-bold text-amber-50">
              Cut<span className="font-extrabold">Bro</span>
            </span>
          </Link>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavItem key={link.label} {...link} />
            ))}
          </div>

          {/* DESKTOP CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" className="text-amber-200 hover:text-amber-400">
                Login
              </Button>
            </Link>

            <Link to="/register">
              <Button className="bg-amber-500 text-neutral-900 font-bold px-5 hover:bg-amber-400">
                Sign Up Free
              </Button>
            </Link>
          </div>

          {/* MOBILE BUTTON */}
          <button
            className="lg:hidden p-2 text-amber-400"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={cn(
            "lg:hidden overflow-hidden transition-all duration-300",
            isMenuOpen ? "max-h-96 pb-6" : "max-h-0"
          )}
        >
          <div className="flex flex-col gap-4 pt-4 border-t border-[#3a2e25]">

            {navLinks.map((link) => (
              <NavItem
                key={link.label}
                {...link}
                onClick={() => setIsMenuOpen(false)}
              />
            ))}

            <div className="flex flex-col gap-3 pt-4 border-t border-[#3a2e25]">
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Login
                </Button>
              </Link>

              <Link to="/register">
                <Button className="w-full bg-amber-500 text-neutral-900 font-bold">
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>
        </div>

      </nav>
    </header>
  );
};

export default NavbarLayout;
