import { Link } from "react-router-dom";
import { Eye, Edit, Trash2, type LucideIcon } from "lucide-react";

type Action = {
  type: "view" | "edit" | "delete" | "custom";
  href?: string;
  onClick?: () => void;
  icon?: LucideIcon;
  label?: string;
  className?: string;
};

type ActionButtonsProps = {
  actions: Action[];
};

const getDefaultIcon = (type: Action["type"]) => {
  switch (type) {
    case "view":
      return Eye;
    case "edit":
      return Edit;
    case "delete":
      return Trash2;
    default:
      return Eye;
  }
};

const getDefaultClassName = (type: Action["type"]) => {
  const baseClass =
    "p-2 rounded-lg bg-neutral-800 transition-colors text-neutral-400";

  switch (type) {
    case "view":
      return `${baseClass} hover:bg-neutral-700 hover:text-white`;
    case "edit":
      return `${baseClass} hover:bg-neutral-700 hover:text-amber-400`;
    case "delete":
      return `${baseClass} hover:bg-red-500/10 hover:text-red-400`;
    default:
      return `${baseClass} hover:bg-neutral-700 hover:text-white`;
  }
};

export default function ActionButtons({ actions }: ActionButtonsProps) {
  return (
    <div className="flex items-center justify-end gap-2">
      {actions.map((action, index) => {
        const Icon = action.icon || getDefaultIcon(action.type);
        const className = action.className || getDefaultClassName(action.type);

        if (action.href) {
          return (
            <Link key={index} to={action.href}>
              <button className={className} aria-label={action.label}>
                <Icon className="w-4 h-4" />
              </button>
            </Link>
          );
        }

        return (
          <button
            key={index}
            onClick={action.onClick}
            className={className}
            aria-label={action.label}
          >
            <Icon className="w-4 h-4" />
          </button>
        );
      })}
    </div>
  );
}