import { cn } from "@/lib/utils";

interface BrandProps {
  className?: string;
}

function Brand({ className }: BrandProps) {
  return (
    <span className={cn("font-semibold tracking-tight", className)}>
      Quick Answer
    </span>
  );
}

export { Brand };
