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

5. **Trilingual Support & Bidirectional Text:**
   - **Urdu (اردو - RTL)** — Active by default, uses `Noto Nastaliq Urdu` typography.
   - **English (LTR)** — Uses `Plus Jakarta Sans` typography.
   - **Arabic (العربية - RTL)** — Seamless RTL layout with crisp `Cairo` typography.
   - Live real-time language switcher with persistent user preference in `localStorage`.

6. **12 Core Security Safeguards:**
   - Pixel-perfect cards highlighting two-step verification, passkeys, disable auto media download, chat lock, screen lock, link preview toggle, privacy settings, encrypted backups, linked devices audit, verification code protection, scam detection, and software updates.

7. **Interactive Functional Modules:**
   - **Security Health Checker:** 5-point vulnerability assessment calculating risk posture with customized remediation tips.
   - **Account Recovery Wizard:** 4-scenario diagnostic selector with step-by-step guidance and a 1-click **Official WhatsApp Support Email Draft Generator**.
   - **Threat Incident Report Modal:** Interactive form with reference ticket generation (`CYB-XXXXXX`).
   - **FAQ Accordion:** Expandable security advice for common attack vectors.

---

## 📁 Project Structure

```text
cyber crime/
│
├── index.html                           # Main semantic HTML5 structure with trilingual hooks
├── README.md                            # Documentation and setup guide
│
├── assets/
│   ├── logo.jpg                         # Official logo image
│   └── WhatsApp-Security-Guide.pdf      # Official 23-page WhatsApp Security Guide PDF
│
├── css/
│   └── style.css                        # Complete responsive stylesheet (Design Tokens, RTL/LTR, Animations)
│
└── js/
    ├── config.js                        # Centralized branding, contact & channel settings
    ├── translations.js                  # Trilingual dictionary (EN, UR, AR)
    └── main.js                          # Core reactive controller (i18n, drawer, quiz, modal, toast)
```

---

## 🚀 How to Run the Website

Simply double-click `index.html` or open it with any modern web browser (Google Chrome, Microsoft Edge, Firefox, Safari).

All links, logo images, PDF downloads, and language toggles will work seamlessly offline and online.
