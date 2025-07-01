"use client";
import { DynamicIcon, IconName } from "lucide-react/dynamic";
import { cn } from "@/lib/utils"; // Falls du shadcn/ui utils nutzt

interface HintTagOptions {
  title: string;
  icon: IconName;
  type: "info" | "warning" | "error" | "success";
  description?: string;
}

const typeStyles: Record<
  HintTagOptions["type"],
  { bg: string; text: string; border: string }
> = {
  info: {
    bg: "bg-blue-100 dark:bg-blue-900/20",
    text: "text-blue-800 dark:text-blue-200",
    border: "border-blue-200 dark:border-blue-800",
  },
  warning: {
    bg: "bg-yellow-100 dark:bg-yellow-900/20",
    text: "text-yellow-800 dark:text-yellow-200",
    border: "border-yellow-200 dark:border-yellow-800",
  },
  error: {
    bg: "bg-red-100 dark:bg-red-900/20",
    text: "text-red-800 dark:text-red-200",
    border: "border-red-200 dark:border-red-800",
  },
  success: {
    bg: "bg-green-100 dark:bg-green-900/20",
    text: "text-green-800 dark:text-green-200",
    border: "border-green-200 dark:border-green-800",
  },
};

export default function HintTag({
  title,
  icon,
  type,
  description,
}: HintTagOptions) {
  const styles = typeStyles[type];

  return (
    <div
      className={cn(
        "rounded-md border p-4 flex items-start gap-3",
        styles.bg,
        styles.text,
        styles.border
      )}
    >
      <DynamicIcon name={icon} className="mt-1 shrink-0" size={18} />
      <div>
        <div className="font-semibold">{title}</div>
        {description && (
          <div className="text-sm mt-1 opacity-90">{description}</div>
        )}
      </div>
    </div>
  );
}
