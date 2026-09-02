import { Leaf } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  size = "lg",
}: {
  eyebrow?: string;
  title: string;
  size?: "sm" | "lg";
}) {
  return (
    <div className="min-w-0">
      {eyebrow && (
        <p className="flex items-center gap-2 text-xs font-medium tracking-wide text-emerald-soft">
          <Leaf className="h-4 w-4 shrink-0" />
          {eyebrow}
        </p>
      )}
      <h2
        className={
          size === "lg"
            ? "mt-2 font-display text-2xl font-bold text-foreground sm:text-3xl"
            : "mt-2 font-display text-xl font-semibold text-foreground"
        }
      >
        {title}
      </h2>
    </div>
  );
}
