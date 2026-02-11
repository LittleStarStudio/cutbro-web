import { Link } from "react-router-dom";
import { Scissors, Mail, Phone, MapPin, Heart } from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { label: "About Us", href: "/about" },
    { label: "Features", href: "/#features" },
    { label: "Pricing", href: "/#pricing" },
    { label: "Blog", href: "/blog" },
    { label: "FAQ", href: "/faq" },
  ];

  const partnerLinks = [
    { label: "Register Barbershop", href: "/register-barbershop" },
    { label: "Partner Program", href: "/partners" },
    { label: "API Integration", href: "/api-docs" },
    { label: "Business Support", href: "/business-support" },
    { label: "Case Studies", href: "/case-studies" },
  ];

  return (
    <footer className="relative bg-neutral-950 border-t border-neutral-800/50 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
      </div>

      <div className="container-custom relative z-10 py-16 lg:py-20">
        {/* ================= GRID ================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">

          {/* Brand */}
          <div className="lg:col-span-4 space-y-6">
            <Link to="/" className="inline-flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center">
                <Scissors className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-white">
                Cut
                <span className="text-amber-400">Bro</span>
              </span>
            </Link>

            <p className="text-neutral-400 text-sm max-w-sm leading-relaxed">
              A modern platform to manage barbershop bookings. Handle schedules,
              barbers, customers, and payments all in one dashboard.
            </p>
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold text-sm mb-6 uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-amber-400 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Partner */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-6 uppercase">
              For Partners
            </h4>
            <ul className="space-y-3">
              {partnerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="text-neutral-400 hover:text-amber-400 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold text-sm mb-6 uppercase">
              Contact
            </h4>
            <ul className="space-y-4 text-sm">
              <li className="flex gap-3 items-center">
                <Mail className="w-4 h-4 text-amber-400" />
                <a href="mailto:hello@cutbro.id" className="text-neutral-300">
                  hello@cutbro.id
                </a>
              </li>
              <li className="flex gap-3 items-center">
                <Phone className="w-4 h-4 text-amber-400" />
                <span className="text-neutral-300">
                  +62 812 3456 7890
                </span>
              </li>
              <li className="flex gap-3 items-center">
                <MapPin className="w-4 h-4 text-amber-400" />
                <span className="text-neutral-300">
                  Jakarta, Indonesia
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-neutral-800 mb-8" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p className="text-neutral-500 flex items-center gap-2">
            © 2026 CutBro. Made with
            <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
            in Indonesia
          </p>

          <div className="flex gap-6">
            <Link to="/privacy" className="text-neutral-500 hover:text-neutral-300">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-neutral-500 hover:text-neutral-300">
              Terms & Conditions
            </Link>
            <Link to="/cookies" className="text-neutral-500 hover:text-neutral-300">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
