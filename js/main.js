/**
 * ==============================================================================
 * CORE JAVASCRIPT CONTROLLER
 * ==============================================================================
 * Handles trilingual localization, RTL/LTR layout transitions, mobile drawer,
 * security health checker, recovery diagnostic wizard, modal forms, and UI states.
 */

(function () {
  "use strict";

  // State Management
  let currentLang = "en";
  let checkerAnswers = {};

  // DOM Elements Cache
  const elements = {
    html: document.documentElement,
    body: document.body,
    header: document.querySelector(".site-header"),
    langBtn: document.getElementById("langBtn"),
    langBtnLabel: document.getElementById("langBtnLabel"),
    langDropdown: document.getElementById("langDropdown"),
    langOptions: document.querySelectorAll(".lang-option"),
    mobileToggle: document.getElementById("mobileToggle"),
    mobileDrawer: document.getElementById("mobileDrawer"),
    drawerOverlay: document.getElementById("drawerOverlay"),
    drawerClose: document.getElementById("drawerClose"),
    mobileNavLinks: document.querySelectorAll(".mobile-nav-link"),
    
    // Dynamic Render Containers
    measuresGrid: document.getElementById("measuresGrid"),
    checkerContainer: document.getElementById("checkerContainer"),
    scenariosList: document.getElementById("scenariosList"),
    recoveryStepsList: document.getElementById("recoveryStepsList"),
    faqList: document.getElementById("faqList"),
    
    // Modal & Toast
    reportModal: document.getElementById("reportModal"),
    btnOpenReport: document.querySelectorAll(".open-report-modal"),
    modalCloseBtn: document.getElementById("modalCloseBtn"),
    modalCancelBtn: document.getElementById("modalCancelBtn"),
    reportForm: document.getElementById("reportForm"),
    toastContainer: document.getElementById("toastContainer"),
    
    // Recovery Action
    btnDraftEmail: document.getElementById("btnDraftEmail"),
  };

  /**
   * Initialize Application
   */
  function init() {
    // 1. Load saved language or default from config
    const savedLang = localStorage.getItem("site_lang");
    if (savedLang && (savedLang === "en" || savedLang === "ur" || savedLang === "ar")) {
      currentLang = savedLang;
    } else if (window.SITE_CONFIG && window.SITE_CONFIG.settings.defaultLanguage) {
      currentLang = window.SITE_CONFIG.settings.defaultLanguage;
    }

    // 2. Apply Brand Config Placeholders
    applyConfigPlaceholders();

    // 3. Set Active Language & Render Components
    setLanguage(currentLang);

    // 4. Attach Event Listeners
    setupEventListeners();
  }

  /**
   * Apply Centralized Configuration Placeholders to the DOM
   */
  function applyConfigPlaceholders() {
    if (!window.SITE_CONFIG) return;
    const config = window.SITE_CONFIG;

    // Brand elements
    document.querySelectorAll(".cfg-website-name").forEach(el => {
      el.textContent = config.branding.websiteName;
    });

    document.querySelectorAll(".cfg-logo-img").forEach(el => {
      el.setAttribute("src", config.branding.logoUrl);
      el.setAttribute("alt", config.branding.logoAltText);
    });

    // Contact elements
    document.querySelectorAll(".cfg-phone").forEach(el => {
      el.textContent = config.contact.phoneNumber;
    });

    document.querySelectorAll(".cfg-phone-link").forEach(el => {
      el.setAttribute("href", config.contact.phoneTel || ("tel:" + config.contact.phoneNumber));
    });

    document.querySelectorAll(".cfg-email").forEach(el => {
      el.textContent = config.contact.emailAddress;
    });

    document.querySelectorAll(".cfg-email-link").forEach(el => {
      el.setAttribute("href", "mailto:" + config.contact.emailAddress);
    });

    document.querySelectorAll(".cfg-address").forEach(el => {
      el.textContent = config.contact.physicalAddress;
    });

    // WhatsApp Channel Links
    document.querySelectorAll(".cfg-whatsapp-channel-link").forEach(el => {
      el.setAttribute("href", config.whatsappChannel ? config.whatsappChannel.url : "https://whatsapp.com/channel/0029VazXk2Y59PwRQcj4pZ2I");
    });

    // PDF Guide Links
    document.querySelectorAll(".cfg-pdf-link").forEach(el => {
      el.setAttribute("href", config.pdfGuide ? config.pdfGuide.url : "assets/WhatsApp-Security-Guide.pdf");
    });

    // Social Media Links
    if (config.socialMedia) {
      document.querySelectorAll(".cfg-social-fb").forEach(el => el.setAttribute("href", config.socialMedia.facebookUrl || "#"));
      document.querySelectorAll(".cfg-social-ig").forEach(el => el.setAttribute("href", config.socialMedia.instagramUrl || "#"));
      document.querySelectorAll(".cfg-social-yt").forEach(el => el.setAttribute("href", config.socialMedia.youtubeUrl || "#"));
    }
  }

  /**
   * Set Language and Trigger UI Recalculation
   * @param {string} lang - 'en' | 'ur' | 'ar'
   */
  function setLanguage(lang) {
    if (!window.TRANSLATIONS || !window.TRANSLATIONS[lang]) return;
    currentLang = lang;
    localStorage.setItem("site_lang", lang);

    const t = window.TRANSLATIONS[lang];

    // 1. Set HTML Attributes
    elements.html.setAttribute("lang", t.meta.lang);
    elements.html.setAttribute("dir", t.meta.dir);

    // 2. Set Typography Font Class on Body
    elements.body.className = t.meta.fontClass;

    // 3. Update Language Selector Button Label
    const langLabels = {
      en: "English",
      ur: "اردو",
      ar: "العربية",
    };
    if (elements.langBtnLabel) {
      elements.langBtnLabel.textContent = langLabels[lang] || "Language";
    }

    // Update active state in dropdown
    elements.langOptions.forEach(opt => {
      if (opt.getAttribute("data-lang") === lang) {
        opt.classList.add("active");
      } else {
        opt.classList.remove("active");
      }
    });

    // 4. Translate Static HTML elements with data-i18n
    translateStaticElements(t);

    // 5. Render Dynamic Sections
    render12SecurityMeasures(t);
    renderSecurityChecker(t);
    renderRecoveryWizard(t);
    renderFaqAccordion(t);
  }

  /**
   * Translate static elements using data-i18n path
   */
  function translateStaticElements(t) {
    document.querySelectorAll("[data-i18n]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n");
      const translation = resolveTranslationKey(t, keyPath);
      if (translation !== undefined) {
        el.textContent = translation;
      }
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach(el => {
      const keyPath = el.getAttribute("data-i18n-placeholder");
      const translation = resolveTranslationKey(t, keyPath);
      if (translation !== undefined) {
        el.setAttribute("placeholder", translation);
      }
    });
  }

  function resolveTranslationKey(obj, path) {
    return path.split(".").reduce((prev, curr) => (prev ? prev[curr] : undefined), obj);
  }

  /**
   * Render the 12 Security Measures Cards
   */
  function render12SecurityMeasures(t) {
    if (!elements.measuresGrid) return;
    const items = t.measuresSection.items;

    const iconSvgMap = {
      "shield-check": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path></svg>`,
      "key": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><circle cx="7.5" cy="15.5" r="5.5"></circle><path d="m21 2-9.6 9.6"></path><path d="m15.5 7.5 3 3L22 7l-2-2"></path></svg>`,
      "laptop": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="18" height="12" x="3" y="4" rx="2"></rect><line x1="2" x2="22" y1="20" y2="20"></line></svg>`,
      "fingerprint": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4"></path><path d="M14 13.12c0 2.38 0 6.38-1 8.88"></path><path d="M2 16h.01"></path><path d="M21.8 16c.2-2 .131-5.354 0-6"></path><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"></path><path d="M8.65 22c.21-.66.45-1.32.57-2"></path><path d="M9 6.8a6 6 0 0 1 9 5.2v2"></path></svg>`,
      "eye-off": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"></path><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"></path><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>`,
      "users": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M22 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>`,
      "cloud-lock": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 2a5 5 0 0 0-4.9 4.08A6 6 0 0 0 2 12a6 6 0 0 0 6 6h1"></path><rect width="8" height="6" x="14" y="14" rx="1"></rect><path d="M16 14v-2a2 2 0 1 1 4 0v2"></path></svg>`,
      "alert-triangle": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"></path><line x1="12" x2="12" y1="9" y2="13"></line><line x1="12" x2="12.01" y1="17" y2="17"></line></svg>`,
      "phone-off": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M10.68 13.31a16 16 0 0 0 3.41 2.6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.42 19.42 0 0 1-3.33-2.67m-2.67-3.34a19.79 19.79 0 0 1-3.07-8.63A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91"></path><line x1="2" x2="22" y1="2" y2="22"></line></svg>`,
      "refresh-cw": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8"></path><path d="M21 3v5h-5"></path><path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16"></path><path d="M3 21v-5h5"></path></svg>`,
      "qr-code": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><rect width="5" height="5" x="3" y="3" rx="1"></rect><rect width="5" height="5" x="16" y="3" rx="1"></rect><rect width="5" height="5" x="3" y="16" rx="1"></rect><path d="M21 16h-3a2 2 0 0 0-2 2v3"></path><path d="M21 21v.01"></path><path d="M12 7v3a2 2 0 0 1-2 2H7"></path><path d="M3 12h.01"></path><path d="M12 3h.01"></path><path d="M12 16v.01"></path><path d="M16 12h1"></path><path d="M21 12v.01"></path><path d="M12 21v-1"></path></svg>`,
      "zap": `<svg width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>`,
    };

    elements.measuresGrid.innerHTML = items
      .map((item, idx) => {
        const iconSvg = iconSvgMap[item.icon] || iconSvgMap["shield-check"];
        return `
          <div class="measure-card">
            <span class="measure-card-number">0${item.id}</span>
            <div class="measure-card-top">
              <div class="measure-icon-wrap">${iconSvg}</div>
              <span class="measure-badge">${item.badge}</span>
            </div>
            <h3 class="measure-title">${item.title}</h3>
            <p class="measure-desc">${item.desc}</p>
          </div>
        `;
      })
      .join("");
  }

  /**
   * Render Interactive Security Health Checker
   */
  function renderSecurityChecker(t) {
    if (!elements.checkerContainer) return;
    const sec = t.checkerSection;

    elements.checkerContainer.innerHTML = `
      <div class="checker-question-list">
        <div class="checker-item">
          <div class="checker-question">1. ${sec.q1}</div>
          <div class="checker-options">
            <label class="checker-option-label">
              <input type="radio" name="chk_q1" value="yes"> ${sec.optYes}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q1" value="no"> ${sec.optNo}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q1" value="unsure"> ${sec.optUnsure}
            </label>
          </div>
        </div>

        <div class="checker-item">
          <div class="checker-question">2. ${sec.q2}</div>
          <div class="checker-options">
            <label class="checker-option-label">
              <input type="radio" name="chk_q2" value="yes"> ${sec.optYes}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q2" value="no"> ${sec.optNo}
            </label>
          </div>
        </div>

        <div class="checker-item">
          <div class="checker-question">3. ${sec.q3}</div>
          <div class="checker-options">
            <label class="checker-option-label">
              <input type="radio" name="chk_q3" value="yes"> ${sec.optYes}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q3" value="no"> ${sec.optNo}
            </label>
          </div>
        </div>

        <div class="checker-item">
          <div class="checker-question">4. ${sec.q4}</div>
          <div class="checker-options">
            <label class="checker-option-label">
              <input type="radio" name="chk_q4" value="never"> ${sec.optNeverShared}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q4" value="shared"> ${sec.optShared}
            </label>
          </div>
        </div>

        <div class="checker-item">
          <div class="checker-question">5. ${sec.q5}</div>
          <div class="checker-options">
            <label class="checker-option-label">
              <input type="radio" name="chk_q5" value="yes"> ${sec.optYes}
            </label>
            <label class="checker-option-label">
              <input type="radio" name="chk_q5" value="no"> ${sec.optNo}
            </label>
          </div>
        </div>
      </div>

      <div style="text-align: center;">
        <button id="btnRunChecker" class="btn btn-primary btn-lg">
          <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          ${sec.btnCalculate}
        </button>
      </div>

      <div id="checkerResultBox" class="checker-result-box">
        <!-- Results dynamically inserted here -->
      </div>
    `;

    // Attach event to Run Checker
    const btnRunChecker = document.getElementById("btnRunChecker");
    if (btnRunChecker) {
      btnRunChecker.addEventListener("click", calculateSecurityScore);
    }

    // Attach styling on radio change
    document.querySelectorAll(".checker-option-label input").forEach(radio => {
      radio.addEventListener("change", function () {
        const groupName = this.getAttribute("name");
        document.querySelectorAll(`input[name="${groupName}"]`).forEach(r => {
          r.closest(".checker-option-label").classList.remove("selected");
        });
        if (this.checked) {
          this.closest(".checker-option-label").classList.add("selected");
        }
      });
    });
  }

  /**
   * Calculate Security Score Based on Answers
   */
  function calculateSecurityScore() {
    const t = window.TRANSLATIONS[currentLang];
    const sec = t.checkerSection;
    const resultBox = document.getElementById("checkerResultBox");
    if (!resultBox) return;

    let score = 0;
    let missingAdvice = [];

    // Q1: 2FA PIN (30 pts)
    const q1Val = document.querySelector('input[name="chk_q1"]:checked')?.value;
    if (q1Val === "yes") {
      score += 30;
    } else {
      missingAdvice.push(t.measuresSection.items[0].title + ": " + t.measuresSection.items[0].desc);
    }

    // Q2: Privacy profile restriction (15 pts)
    const q2Val = document.querySelector('input[name="chk_q2"]:checked')?.value;
    if (q2Val === "yes") {
      score += 15;
    } else {
      missingAdvice.push(t.measuresSection.items[4].title + ": " + t.measuresSection.items[4].desc);
    }

    // Q3: Audit linked devices (20 pts)
    const q3Val = document.querySelector('input[name="chk_q3"]:checked')?.value;
    if (q3Val === "yes") {
      score += 20;
    } else {
      missingAdvice.push(t.measuresSection.items[2].title + ": " + t.measuresSection.items[2].desc);
    }

    // Q4: Never shared code (20 pts)
    const q4Val = document.querySelector('input[name="chk_q4"]:checked')?.value;
    if (q4Val === "never") {
      score += 20;
    } else {
      missingAdvice.push(t.measuresSection.items[1].title + ": " + t.measuresSection.items[1].desc);
    }

    // Q5: Encrypted backup (15 pts)
    const q5Val = document.querySelector('input[name="chk_q5"]:checked')?.value;
    if (q5Val === "yes") {
      score += 15;
    } else {
      missingAdvice.push(t.measuresSection.items[6].title + ": " + t.measuresSection.items[6].desc);
    }

    let scoreClass = "score-good";
    let riskText = sec.riskLow;

    if (score < 50) {
      scoreClass = "score-bad";
      riskText = sec.riskHigh;
    } else if (score < 85) {
      scoreClass = "score-medium";
      riskText = sec.riskMedium;
    }

    resultBox.innerHTML = `
      <div class="score-display-row">
        <div class="score-circle ${scoreClass}">${score}%</div>
        <div class="score-text-details">
          <h4>${sec.scoreTitle}</h4>
          <p><strong>${riskText}</strong></p>
        </div>
      </div>
      <div>
        <h5 style="font-weight: 700; margin-bottom: 0.5rem; color: var(--secondary);">${sec.adviceTitle}</h5>
        <ul class="score-advice-list">
          ${
            missingAdvice.length > 0
              ? missingAdvice.map(item => `<li>${item}</li>`).join("")
              : `<li>${sec.riskLow} — Excellent protection habits! Continue to remain cautious of unsolicited links.</li>`
          }
        </ul>
      </div>
    `;

    resultBox.classList.add("visible");
    resultBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }

  /**
   * Render Account Recovery Assistant
   */
  function renderRecoveryWizard(t) {
    if (!elements.scenariosList || !elements.recoveryStepsList) return;
    const rec = t.recoverySection;

    const scenarios = [
      { id: 1, title: rec.scenario1Title, desc: rec.scenario1Desc },
      { id: 2, title: rec.scenario2Title, desc: rec.scenario2Desc },
      { id: 3, title: rec.scenario3Title, desc: rec.scenario3Desc },
      { id: 4, title: rec.scenario4Title, desc: rec.scenario4Desc },
    ];

    elements.scenariosList.innerHTML = scenarios
      .map(
        (sc, idx) => `
        <div class="scenario-card ${idx === 0 ? "active" : ""}" data-scenario="${sc.id}">
          <h4>${sc.title}</h4>
          <p>${sc.desc}</p>
        </div>
      `
      )
      .join("");

    // Recovery Steps
    elements.recoveryStepsList.innerHTML = `
      <div class="recovery-step-item">
        <div class="step-number-bubble">1</div>
        <div class="step-details">
          <h4>${rec.step1Title}</h4>
          <p>${rec.step1Desc}</p>
        </div>
      </div>
      <div class="recovery-step-item">
        <div class="step-number-bubble">2</div>
        <div class="step-details">
          <h4>${rec.step2Title}</h4>
          <p>${rec.step2Desc}</p>
        </div>
      </div>
      <div class="recovery-step-item">
        <div class="step-number-bubble">3</div>
        <div class="step-details">
          <h4>${rec.step3Title}</h4>
          <p>${rec.step3Desc}</p>
        </div>
      </div>
      <div class="recovery-step-item">
        <div class="step-number-bubble">4</div>
        <div class="step-details">
          <h4>${rec.step4Title}</h4>
          <p>${rec.step4Desc}</p>
        </div>
      </div>
    `;

    // Attach click event to scenarios
    document.querySelectorAll(".scenario-card").forEach(card => {
      card.addEventListener("click", function () {
        document.querySelectorAll(".scenario-card").forEach(c => c.classList.remove("active"));
        this.classList.add("active");
        showToast("Selected Scenario: " + this.querySelector("h4").textContent);
      });
    });
  }

  /**
   * Render FAQ Accordions
   */
  function renderFaqAccordion(t) {
    if (!elements.faqList) return;
    const items = t.faqSection.items;

    elements.faqList.innerHTML = items
      .map(
        (item, idx) => `
        <div class="faq-item ${idx === 0 ? "open" : ""}">
          <button class="faq-question-btn">
            <span>${item.q}</span>
            <span class="faq-chevron">
              <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><polyline points="6 9 12 15 18 9"></polyline></svg>
            </span>
          </button>
          <div class="faq-answer-content">
            <p>${item.a}</p>
          </div>
        </div>
      `
      )
      .join("");

    // Toggle logic
    document.querySelectorAll(".faq-question-btn").forEach(btn => {
      btn.addEventListener("click", function () {
        const parent = this.closest(".faq-item");
        const isOpen = parent.classList.contains("open");
        document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("open"));
        if (!isOpen) {
          parent.classList.add("open");
        }
      });
    });
  }

  /**
   * Generate Support Email Template
   */
  function generateSupportEmail() {
    const t = window.TRANSLATIONS[currentLang];
    const userPhonePrompt = prompt(
      currentLang === "ur"
        ? "براہ کرم اپنا مکمل فون نمبر بین الاقوامی کوڈ کے ساتھ درج کریں (مثلاً +923001234567):"
        : currentLang === "ar"
        ? "يرجى إدخال رقم هاتفك بالصيغة الدولية الكاملة (مثال: +966501234567):"
        : "Please enter your full phone number in international format (e.g. +12345678900):",
      "+1 234 567 8900"
    );

    if (!userPhonePrompt) return;

    const emailSubject = encodeURIComponent("Lost/Stolen: Please deactivate my account");
    const emailBody = encodeURIComponent(
      `Hello WhatsApp Support,\n\nMy WhatsApp account has been compromised / stolen.\nPlease deactivate my account immediately to protect my identity and data.\n\nPhone Number: ${userPhonePrompt}\n\nThank you.`
    );

    const mailtoLink = `mailto:support@whatsapp.com?subject=${emailSubject}&body=${emailBody}`;
    window.open(mailtoLink, "_blank");
    showToast(currentLang === "ur" ? "ای میل کلائنٹ کھول دیا گیا ہے!" : "Email client opened with pre-filled support message!");
  }

  /**
   * Toast Notification Helper
   */
  function showToast(message) {
    if (!elements.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="#10b981" stroke-width="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
      <span>${message}</span>
    `;
    elements.toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transition = "opacity 0.3s ease";
      setTimeout(() => toast.remove(), 300);
    }, 4000);
  }

  /**
   * Setup UI Event Listeners
   */
  function setupEventListeners() {
    // 1. Language Dropdown Toggle
    if (elements.langBtn && elements.langDropdown) {
      elements.langBtn.addEventListener("click", e => {
        e.stopPropagation();
        elements.langDropdown.classList.toggle("show");
      });

      document.addEventListener("click", () => {
        elements.langDropdown.classList.remove("show");
      });
    }

    // 2. Language Selection
    elements.langOptions.forEach(opt => {
      opt.addEventListener("click", function () {
        const selectedLang = this.getAttribute("data-lang");
        setLanguage(selectedLang);
        if (elements.langDropdown) elements.langDropdown.classList.remove("show");
      });
    });

    // 3. Mobile Navigation Drawer Toggle
    const toggleDrawer = open => {
      if (!elements.mobileDrawer || !elements.drawerOverlay) return;
      if (open) {
        elements.mobileDrawer.classList.add("active");
        elements.drawerOverlay.classList.add("active");
        document.body.style.overflow = "hidden";
      } else {
        elements.mobileDrawer.classList.remove("active");
        elements.drawerOverlay.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    if (elements.mobileToggle) {
      elements.mobileToggle.addEventListener("click", () => toggleDrawer(true));
    }
    if (elements.drawerClose) {
      elements.drawerClose.addEventListener("click", () => toggleDrawer(false));
    }
    if (elements.drawerOverlay) {
      elements.drawerOverlay.addEventListener("click", () => toggleDrawer(false));
    }
    elements.mobileNavLinks.forEach(link => {
      link.addEventListener("click", () => toggleDrawer(false));
    });

    // 4. Incident Report Modal
    const toggleModal = open => {
      if (!elements.reportModal) return;
      if (open) {
        elements.reportModal.classList.add("active");
        document.body.style.overflow = "hidden";
      } else {
        elements.reportModal.classList.remove("active");
        document.body.style.overflow = "";
      }
    };

    elements.btnOpenReport.forEach(btn => {
      btn.addEventListener("click", e => {
        e.preventDefault();
        toggleModal(true);
      });
    });

    if (elements.modalCloseBtn) elements.modalCloseBtn.addEventListener("click", () => toggleModal(false));
    if (elements.modalCancelBtn) elements.modalCancelBtn.addEventListener("click", () => toggleModal(false));
    if (elements.reportModal) {
      elements.reportModal.addEventListener("click", e => {
        if (e.target === elements.reportModal) toggleModal(false);
      });
    }

    // 5. Submit Incident Report Form
    if (elements.reportForm) {
      elements.reportForm.addEventListener("submit", e => {
        e.preventDefault();
        const ticketId = "CYB-" + Math.floor(100000 + Math.random() * 900000);
        const t = window.TRANSLATIONS[currentLang];
        alert(t.reportModal.successMsg + ticketId);
        elements.reportForm.reset();
        toggleModal(false);
        showToast("Ticket #" + ticketId + " Generated Successfully");
      });
    }

    // 6. Draft Email Action
    if (elements.btnDraftEmail) {
      elements.btnDraftEmail.addEventListener("click", generateSupportEmail);
    }

    // 7. Sticky Header Scroll Effect
    window.addEventListener("scroll", () => {
      if (!elements.header) return;
      if (window.scrollY > 40) {
        elements.header.classList.add("scrolled");
      } else {
        elements.header.classList.remove("scrolled");
      }
    });

    // 8. Guide Category Tab Filtering
    document.querySelectorAll(".guide-tab-btn").forEach(tab => {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".guide-tab-btn").forEach(t => t.classList.remove("active"));
        this.classList.add("active");
        const category = this.getAttribute("data-category");
        showToast("Filtered: " + this.textContent);
      });
    });
  }

  // Run on DOM Ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
