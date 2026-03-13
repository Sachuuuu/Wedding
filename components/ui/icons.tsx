import { LucideProps } from "lucide-react";

export function HeartSpark(props: LucideProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M12 21s-6.7-4.4-9-8.2C1.4 10.4 2.1 6.8 5.4 5.3c2.2-1 4.5-.3 6 1.5 1.5-1.8 3.8-2.5 6-1.5 3.3 1.5 4 5.1 2.4 7.5C18.7 16.6 12 21 12 21Z" />
      <path d="M18.5 2.5v3" />
      <path d="M20 4h-3" />
      <path d="M6 2v2" />
      <path d="M7 3H5" />
    </svg>
  );
}
