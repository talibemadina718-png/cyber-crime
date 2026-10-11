# Cyber Security & WhatsApp Protection Portal

A pixel-perfect, fully responsive, trilingual web application built with **HTML5, CSS3, and modern Vanilla JavaScript**. It replicates the layout, visual hierarchy, security features, and micro-interactions of the reference security platform, fully updated with the user's official branding, logo, contact channels, and 23-page PDF guide.

---

## 🌟 Updated Features & Integrations

1. **Official Logo Integration:**
   - Real logo integrated in Header, Mobile sliding navigation drawer, and Footer from `assets/logo.jpg`.
   - Scaled and responsive across desktop, tablet, and mobile screens.

2. **Official Contact Channels:**
   - **Phone:** `03126571673` (with direct click-to-call `tel:03126571673`).
   - **Gmail:** `hafiztalharazaattari@gmail.com` (with direct `mailto:` integration).

3. **Official WhatsApp Channel Banner:**
   - **Channel Title:** راہِ عــلم راہِ جــنت 📖🔏
   - **Channel Link:** [https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I](https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I)
   - **Invitation:** 📲 علمِ دین کا انمول خزانہ حاصل کرنے اور خوبصورت تحریرات پڑھنے کے لیے یہ چینل فالو کر لیجیے۔ 👇🏻
   - Placed in dedicated prominent banner card, navigation, and footer.

4. **Official 23-Page PDF Guide Integration:**
   - **File Location:** `assets/WhatsApp-Security-Guide.pdf`
   - **Title:** WhatsApp Security Guide (Version 1.0)
   - **Actions:**
     - 📥 **Download PDF Guide:** 1-click direct download with proper file name.
     - 👁️ **Read Online:** Opens the complete 23-page PDF in a new browser tab.
     - Embedded in Hero Section CTA buttons, Navigation bar, and Dedicated Guide Showcase card.

5. **Three-Language Configuration & Bidirectional Text:**
   - **Urdu (اردو - RTL)** — Active by default, uses `Noto Nastaliq Urdu` typography with authentic ligatures.
   - **English (LTR)** — Standard global cybersecurity advisory typography with `Plus Jakarta Sans`.
   - **Roman Urdu (LTR)** — Conversational Urdu written using English Latin alphabet for high accessibility.
   - Live real-time language switcher (Desktop dropdown & Mobile drawer chips) with persistent user preference in `localStorage`.

6. **12 Core Security Safeguards:**
   - Pixel-perfect cards highlighting two-step verification, passkeys, disable auto media download, chat lock, screen lock, link preview toggle, privacy settings, encrypted backups, linked devices audit, verification code protection, scam detection, and software updates.

7. **Interactive Functional Modules:**
   - **Universal Real-Time Search Bar:** Instant live filter across all 12 measures and knowledge articles with match counters and reset shortcuts.
   - **6-Article Knowledge Base & Guide Reader Modal:** Dedicated guides covering Passkeys/2FA, Linked Devices/QR, Scam & OTP Defense, Encrypted Backups, Privacy Blueprint, and Emergency Account Recovery with platform-specific instructions for Android, iPhone (iOS), and WhatsApp Web/Desktop.
   - **Official Meta Support Email Draft Generator:** Modal with live phone number interpolation, 1-click clipboard copy (`navigator.clipboard`), and direct `mailto:` launcher formatted to trigger WhatsApp's automated account deactivation protocol.
   - **Security Health Checker:** Honest 5-point self-assessment diagnostic tool calculating vulnerability posture with personalized hardening advice, saved locally to `localStorage`.
   - **Account Recovery Wizard:** 4-scenario diagnostic selector with step-by-step guidance.
   - **Threat Incident Report Modal:** Interactive form with input validation and reference ticket generation (`CYB-XXXXXX`).
   - **FAQ Accordion:** Expandable security advice for common attack vectors.

8. **Typography & Font Integrity:**
   - WhatsApp Channel name "**راہِ عــلم راہِ جــنت**" rendered in authentic **Jameel Noori Nastaleeq** (`.channel-nastaleeq`) font across all screens.
   - Headings rendered in **Bombay Black** (`'Bombay Black', 'Gulzar'`).
   - Body text in **Jameel Noori Nastaleeq** (Urdu) and **Plus Jakarta Sans** (English & Roman Urdu).

---

## 📁 Project Structure

```text
cyber crime/
│
├── index.html                           # Main semantic HTML5 structure with 3-language hooks
├── README.md                            # Documentation and setup guide
│
├── assets/
│   ├── logo.jpg                         # Official logo image
│   └── WhatsApp-Security-Guide.pdf      # Official 23-page WhatsApp Security Guide PDF
│
├── css/
│   └── style.css                        # Complete responsive stylesheet (Design Tokens, RTL/LTR, Math Specs, Animations)
│
└── js/
    ├── config.js                        # Centralized branding, contact & channel settings
    ├── translations.js                  # Complete dictionary for English, Urdu, and Roman Urdu
    └── main.js                          # Core reactive controller (i18n, drawer, quiz, modal, toast)
```

---

## 🚀 How to Run the Website

Simply double-click `index.html` or open it with any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

All links, logo images, PDF downloads, and language toggles will work seamlessly offline and online.
