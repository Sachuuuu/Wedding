import { siteConfig } from "@/lib/config";

export function Map() {
  const mapTitle = siteConfig.ceremonyType === "Birthday" 
    ? "Where we celebrate" 
    : "A Joyful Destination";

  return (
    <section className="section-space">
      <div className="container-shell">
        {/* Updated Title Styling to match site elegance */}
        <div className="text-center mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold mb-4">
            Our Location
          </p>
          <h3 className="text-4xl sm:text-5xl font-serif text-ink">
            {mapTitle}
          </h3>
        </div>
        
        <div className="group relative rounded-[2rem] overflow-hidden h-[400px] w-full transition-all duration-500 shadow-lg hover:shadow-2xl hover:-translate-y-1">
          <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-black/5 rounded-[2rem]" />
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3959.3207997977674!2d80.02881474308026!3d7.088761496055202!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fc15f33fcbcf%3A0x27b6199d84aab661!2sUdumbara%20Gardens%2C%20Yakkala!5e0!3m2!1sen!2slk!4v1782922326736!5m2!1sen!2slk"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </section>
  );
}