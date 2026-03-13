import { siteConfig } from "@/lib/config";

export function Footer() {
  return (
    <footer className="border-t border-gold/10 py-10">
      <div className="container-shell text-center">
        <h3 className="text-2xl">{siteConfig.coupleNames}</h3>
        <p className="mt-3">
          Thank you for being part of our story and celebrating this beautiful day with us.
        </p>
        <p className="mt-4 text-sm text-muted">
          © {new Date().getFullYear()} · Made with love for our forever
        </p>
      </div>
    </footer>
  );
}
