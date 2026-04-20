import { navItems } from "@/lib/constants";
import { MobileNav } from "./mobile-nav";
import { siteConfig } from '@/lib/config';

const ceremonyLabel =
  siteConfig.ceremonyType === "Wedding Ceremony"
    ? "Wedding"
    : "Homecoming";
export function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="container-shell pt-4">
        <div className="flex items-center justify-between rounded-full border border-white/60 bg-white/70 px-5 py-3 shadow-soft backdrop-blur-xl">
          <a
            href="#home"
            className="font-serif text-sm font-semibold tracking-[0.2em] text-ink sm:text-base"
          >
            {ceremonyLabel === "Wedding"
              ? `${siteConfig.bride?.charAt(0).toUpperCase()} ♥ ${siteConfig.groom?.charAt(0).toUpperCase()}`
              : `${siteConfig.groom?.charAt(0).toUpperCase()} ♥ ${siteConfig.bride?.charAt(0).toUpperCase()}`}
          </a>

          <nav className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-muted transition hover:text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden lg:block">
            <a href="#rsvp" className="btn-secondary">
              RSVP
            </a>
          </div>

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
