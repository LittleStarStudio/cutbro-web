import { Crown } from "lucide-react";

type BadgeProps = {
  text: string;
  variant: string;
  showCrown?: boolean;
  showDot?: boolean;
  dotColor?: string;
};

export default function Badge({
  text,
  variant,
  showCrown = false,
  showDot = false,
  dotColor,
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${variant}`}
    >
      {showCrown && <Crown className="w-3 h-3" />}
      {showDot && dotColor && (
        <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      )}
      {text}
    </span>
  );
}