// lib/config.ts

export const siteConfig = {
  // --- 🎨 GLOBAL COLOR THEME ---
  colors: {
    background: "#FAF7F2", // ivory (main bg)
    foreground: "#2E2726", // ink (main topics/countdown/rsvp lables/ crad topics/ image tints)
    primary: "#C5A46D",    // gold (small topics/ card icons)
    secondary: "#D6A8A5",  // rose (* marks)
    accent: "#EFCFCE",     // blush (BG blush marks)
    champagne: "#F3E8D6",  // card icon BG
    muted: "#6C625E",      // (long contents/nav bar)
    
    // Hero Section specific colors
    heroText: "#F8F4ED", // Main banner name text color
    heroAmpersand: "#D4AF37", // Main banner "&" text color
    heroSubtitle: "#F1E7E3", // // Main banner slogan text color
  },

  // --- 📝 TEXT & CONTENT ---
  celebrant: "Shevona", // Replaces bride/groom
  parents: "Sachitha & Vinushi", // New field for parents
  // Contact details
  contactName: "Sachitha",
  contactNumber: "071 8007123",
  contactNumberInt: "+9471 8007123",
  contactEmail: "sachithasa@gmail.com",

  hero: {
    titleAmpersand: "is turning One", // Or replace with specific age
    subtitle: "Join us in celebrating this special day with joy and laughter",
    ctaText: "RSVP",
    ctaLink: "#rsvp",
  },
  
  // --- 📝 TEXT & CONTENT ---
  bride: "Buddhimanthi",
  groom: "Mahinsa",
  brideParents: "Mr. & Mrs. Thushara Bulathsinhala",
  groomParents: "Mr. & Mrs. Athula Ranasinghe",
  ceremonyDate: "2026-07-19T16:00:00+05:30",
  venue: "Our Residence, Yakkala",
  time: "Celebration from 04:00 PM onwards",
  dressCode: "Comfortable party wear.",
  ceremonyType: "Birthday",
  ceremonyDescription: "A joyful day to celebrate our little one's milestone.",
  receptionDescription: "A beautiful day of music, laughter, and celebration with loved ones.",
  brideContactName: "Thushara",
  brideContactNumber: "071 8007123",
  brideContactNumberInt: "+9471 8007123",
  groomContactName: "Athula",
  groomContactNumber: "077 7687481",
  groomContactNumberInt: "+9477 7687481",
  brideContactEmail: "sachithasa@gmail.com",
  groomContactEmail: "sachithasa@gmail.com",

  // --- ⚙️ SYSTEM CONFIG ---
  appsScriptUrl:
    process.env.GOOGLE_APPS_SCRIPT_URL || "https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec"
};