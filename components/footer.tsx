import { siteConfig } from "@/lib/config";
const ceremonyLabel =
  siteConfig.ceremonyType === "Wedding Ceremony"
    ? "Wedding"
    : "Homecoming";
export function Footer() {
  return (
    <footer className="border-t border-gold/10 py-10">
      <div className="container-shell text-center">
        <h3 className="text-2xl">{ceremonyLabel === "Wedding" ? (
          <>
            {siteConfig.bride} <span className="text-gold">♥</span> {siteConfig.groom}
          </>) :
          (
            <>
              {siteConfig.groom} <span className="text-gold">♥</span> {siteConfig.bride}
            </>
          )}</h3>
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
