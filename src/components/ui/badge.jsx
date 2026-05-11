import { cn } from "@/lib/utils";

export function Badge({ className, variant = "default", ...props }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border px-2 py-1 text-xs font-medium",
        variant === "default" && "border-primary/30 bg-primary/12 text-primary",
        variant === "secondary" && "border-border bg-secondary text-secondary-foreground",
        variant === "accent" && "border-accent/35 bg-accent/15 text-accent-foreground",
        className,
      )}
      {...props}
    />
  );
}
