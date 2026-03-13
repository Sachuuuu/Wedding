import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "mx-auto max-w-3xl",
        align === "center" ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow ? (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-4xl sm:text-5xl">{title}</h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg">{description}</p>
      ) : null}
    </div>
  );
}
