import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@/lib/auth";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const confirmLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {/* tombol */}
      <button
        onClick={() => setOpen(true)}
        className="text-red-400 hover:text-red-500"
      >
        Logout
      </button>

      {/* modal */}
      {open && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 w-80 space-y-4">
            <h3 className="text-white font-semibold text-lg">
              Konfirmasi Logout
            </h3>

            <p className="text-zinc-400 text-sm">
              Kamu yakin ingin keluar?
            </p>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-300"
              >
                Batal
              </button>

              <button
                onClick={confirmLogout}
                className="px-4 py-2 rounded-lg bg-red-600 text-white"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
