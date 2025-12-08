# The Inner Path Map  
### 內在修行路徑圖  
*A Buddhist-psychology meditation personality profiler.*

---

## Overview  
The Inner Path Map is a lightweight, bilingual (EN/中文), fully client-side webapp that analyzes a user’s meditation personality based on classical Buddhist psychological frameworks:

- **Five Spiritual Faculties（五根五力）**
- **Seven Factors of Awakening（七覺支）**
- **Disposition Patterns（貪／瞋／痴／信柔／智觀）**
- **Practitioner Types（信行人／法行人）**

No metaphysics, astrology, superstition, or religious affiliation is used.  
All interpretations are grounded in **Buddhist psychology** and designed to be fully **AdSense-compliant**.

The results include:

1. Practitioner Type  
2. Personality Disposition Pattern  
3. Recommended Entry Meditation Methods (1–3 suggestions)

The app is free to use and monetized through Google AdSense.

---

## Features

### ✔ Buddhist-Psychology Engine  
A deterministic scoring model analyzes:

- Mindfulness  
- Concentration  
- Wisdom  
- Faith  
- Energy  
- Joy  
- Tranquility  
- Equanimity (optional)

### ✔ Bilingual UI  
All interface elements and results are available in:

- **English**  
- **中文（繁簡通用）**

### ✔ Clean, Mobile-First UI  
Soft, calm aesthetics suitable for a meditation tool.

### ✔ No Backend Needed  
Runs entirely on static hosting via Cloudflare Pages.

### ✔ Share-Ready Output  
Built-in share buttons for:

- Facebook  
- Twitter / X  
- WhatsApp  
- Instagram (via screenshot prompt)

### ✔ Call-to-Action (CTA)  
Users may contact **Lumi** via WhatsApp for extended consultation.

---

## Technology Stack

- **HTML5** (Static UI)
- **CSS3** (Modern, soft theme)
- **Vanilla JavaScript** (Engine + i18n)
- **Google AdSense** (Monetization)
- **Cloudflare Pages** (Hosting)
- **GitHub** (Version control)

No frameworks, dependencies, or build pipelines required.

---

## File Structure

/root
│── index.html
│── style.css
│── app.js
│── README.md
│── assets.json
│
└── /assets
│── app-icon.png
│── share-wide.png
│── share-square.png
│
└── /share-icons
│── facebook.png
│── instagram.png
│── whatsapp.png
│── twitter.png
│── share.png

---

## Deployment Instructions

### 1. Push to GitHub  
Ensure all assets are inside `/assets`.

### 2. Deploy via Cloudflare Pages  
Choose:

- Framework preset: **None**  
- Build command: **None**  
- Output folder: **root**  

### 3. Enable AdSense  
Ensure:

- `index.html` contains `<script>` for AdSense client  
- The domain is publicly accessible  
- Privacy, disclaimers, and non-religious clarification are present  

### 4. Confirm Metadata  
Check that the following exist:

- OpenGraph image  
- Favicon  
- Title + description  
- Keywords  
- Social preview assets

---

## Developer Notes

### i18n  
Text is managed through `i18nText` in `app.js`  
All visible strings reference `data-lang-en` / `data-lang-zh`.

### Mapping Engine  
All scoring and personality logic is contained inside:

generateProfile() in app.js


This includes:

- Practitioner type calculation  
- Disposition ranking  
- Practice recommendation  
- Result rendering  
- CTA activation  

### CTA  
Results automatically show a card that invites users to contact **Lumi** (via WhatsApp) for deeper guidance.

---

## License  
This project is free to use, modify, and share for personal or educational purposes.  
Commercial use of the Frontend is permitted; however, the mapping logic remains copyright to the project owner.

---

## Maintainer  
Created and maintained by **DTYH (Lumi Studio)**.

For extended spiritual consultation or personalized practice guidance, contact via WhatsApp.
