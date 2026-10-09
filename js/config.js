/**
 * ==============================================================================
 * CENTRALIZED USER CONFIGURATION & BRANDING SETTINGS
 * ==============================================================================
 * Updated with user's official details:
 * - Logo: assets/logo.jpg
 * - Phone: 03126571673
 * - Email: hafiztalharazaattari@gmail.com
 * - WhatsApp Channel: https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I
 * - PDF Guide: assets/WhatsApp-Security-Guide.pdf
 */

const SITE_CONFIG = {
  // Brand & Identity Details
  branding: {
    websiteName: "Hafiz Talha Attari",
    logoUrl: "assets/logo.jpg",
    logoAltText: "Hafiz Talha Attari",
    tagline: "Official WhatsApp & Cyber Security Advisory Portal",
  },

  // Contact Information
  contact: {
    phoneNumber: "03126571673",
    phoneTel: "tel:+923126571673",
    emailAddress: "hafiztalharazaattari@gmail.com",
    whatsappLink: "https://wa.me/923126571673",
    physicalAddress: "Pakistan",
    supportHours: "24/7 Incident Advisory",
  },

  // Official WhatsApp Channel
  whatsappChannel: {
    url: "https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I",
    titleUrdu: "راہِ عــلم راہِ جــنت 📖🔏",
    invitationUrdu: "📲 علمِ دین کا انمول خزانہ حاصل کرنے اور خوبصورت تحریرات پڑھنے کے لیے یہ چینل فالو کر لیجیے۔ 👇🏻",
  },

  // Security Guide PDF Document
  pdfGuide: {
    url: "assets/WhatsApp-Security-Guide.pdf",
    filename: "WhatsApp-Security-Guide.pdf",
    title: "Official WhatsApp Security Guide (12 Chapters)",
    pages: "23 Pages",
    version: "Version 1.0 (2026)",
  },

  // Social Media Channels
  socialMedia: {
    facebookUrl: "https://facebook.com",
    instagramUrl: "https://instagram.com",
    youtubeUrl: "https://youtube.com",
    whatsappChannelUrl: "https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I",
  },

  // Application Defaults
  settings: {
    defaultLanguage: "ur", // Defaulting to Urdu as preferred by the user, while supporting English and Arabic fully
    enableSoundEffects: false,
    enableThemeToggle: true,
  }
};

// Export to window object for global availability in vanilla JS
if (typeof window !== "undefined") {
  window.SITE_CONFIG = SITE_CONFIG;
}
