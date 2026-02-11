import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import Button from "@/components/ui/Button";

type EmptyStateProps = {
  icon: LucideIcon;
  title: string;
  description?: string;
  actionLabel?: string;
  actionLink?: string;
  onAction?: () => void;
};

export default function EmptyState({
  icon: Icon,
  title,
  description,
  actionLabel,
  actionLink,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-8 sm:p-12">
      <div className="text-center max-w-md mx-auto">
        {/* Icon Container */}
        <div className="inline-flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 bg-neutral-800/50 rounded-full mb-4 sm:mb-6">
          <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-500" />
        </div>
        
        {/* Title */}
        <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">
          {title}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-sm sm:text-base text-neutral-400 mb-6 sm:mb-8">
            {description}
          </p>
        )}

        {/* Action Button */}
        {actionLabel && (actionLink || onAction) && (
          <>
            {actionLink ? (
              <Link to={actionLink} className="inline-block w-full sm:w-auto">
                <Button variant="gold" className="w-full sm:w-auto">
                  {actionLabel}
                </Button>
              </Link>
            ) : (
              <Button 
                variant="gold" 
                onClick={onAction}
                className="w-full sm:w-auto"
              >
                {actionLabel}
              </Button>
            )}
          </>
        )}
      </div>
    </div>
  );
}