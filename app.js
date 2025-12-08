// ============================================================
// The Inner Path Map v2.1
// Full Buddhist-Psychology Mapping Engine + i18n
// ============================================================

let currentLang = "en";

// ============================================================
// i18n Text System
// ============================================================

const i18nText = {
  zh: {
    result_title: "內在修行路徑圖：分析結果",
    type_label: "行人類型",
    habit_label: "心性習性",
    practice_label: "適合你的入門修行方式",

    // practitioner types
    type_faith: "信行人",
    type_dharma: "法行人",

    type_faith_desc: "你以信念、願心、安心感作為修行的力量來源，適合法以慈心、光明觀或誦念為起點。",
    type_dharma_desc: "你以理解、觀察、洞察力推動修行，適合從呼吸、正念與止觀開始。",

    // habits
    habit_greed: "貪行性",
    habit_aversion: "瞋行性",
    habit_delusion: "痴行性",
    habit_faithSoft: "信柔型",
    habit_insightAnalytic: "智觀型",

    habit_desc_greed: "你的心依賴愉悅或舒適，適合身體覺知與呼吸穩定法。",
    habit_desc_aversion: "你的心容易緊繃、反應快，適合慈心禪與放鬆法。",
    habit_desc_delusion: "你的心較散亂或不易集中，適合行禪與循序穩定呼吸。",
    habit_desc_faithSoft: "你心柔軟、感受力高，適合光明觀與慈心法門。",
    habit_desc_insightAnalytic: "你善於理解與觀察，適合同步練習止觀與內觀。",

    // practices
    p_walk: "行禪（Walking Meditation）",
    p_walk_desc: "透過步伐帶動覺知，非常適合散亂或緊繃的心。",

    p_breath: "安般念（觀呼吸）",
    p_breath_desc: "穩定心念、增強專注，是最廣泛適用的入門方法。",

    p_lovingkindness: "慈心禪（Loving-kindness）",
    p_lovingkindness_desc: "柔化情緒、減少瞋心、提升幸福感。",

    p_bodyscan: "身體掃描（Body Scan）",
    p_bodyscan_desc: "放鬆身心、提升覺知，非常適合初學者。",

    p_light: "光明觀（Light Visualization）",
    p_light_desc: "提升安心感與清明度，適合信柔型與感性行人。",

    p_shortchant: "短咒誦／念佛（非宗派）",
    p_shortchant_desc: "穩定情緒、安定心念，是信行人的快速入門法。",

    final_label: "你的入門修行建議："
  },

  en: {
    result_title: "The Inner Path Map · Results",
    type_label: "Practitioner Type",
    habit_label: "Disposition Pattern",
    practice_label: "Recommended Entry Practices",

    type_faith: "Faith-Inclined Practitioner",
    type_dharma: "Dharma-Inclined Practitioner",

    type_faith_desc:
      "You enter practice through trust, emotional openness, and intention. Methods like loving-kindness, light visualization, or chanting suit you well.",
    type_dharma_desc:
      "You progress through understanding, clarity, and observation. Breath meditation, mindfulness, and insight practices are ideal.",

    habit_greed: "Greed-Type",
    habit_aversion: "Aversion-Type",
    habit_delusion: "Delusion-Type",
    habit_faithSoft: "Faith-Soft",
    habit_insightAnalytic: "Insight-Analytical",

    habit_desc_greed:
      "You seek comfort and pleasant states. Body awareness and breath grounding help balance the mind.",
    habit_desc_aversion:
      "You react quickly or hold tension. Loving-kindness and relaxation practices support you.",
    habit_desc_delusion:
      "Your attention scatters easily. Walking meditation and stable breathing keep you grounded.",
    habit_desc_faithSoft:
      "You are intuitive and sensitive. Light visualization and compassion practices suit you.",
    habit_desc_insightAnalytic:
      "You analyze well and observe patterns. Insight and mindfulness practices match your mind.",

    p_walk: "Walking Meditation",
    p_walk_desc:
      "Movement anchors awareness gently, ideal for scattered or tense minds.",

    p_breath: "Breath Meditation",
    p_breath_desc:
      "A foundational practice for stability, clarity, and grounding.",

    p_lovingkindness: "Loving-kindness Meditation",
    p_lovingkindness_desc:
      "Softens emotional reactivity and cultivates warm presence.",

    p_bodyscan: "Body Scan",
    p_bodyscan_desc:
      "Reduces tension and increases embodied awareness.",

    p_light: "Light Visualization",
    p_light_desc:
      "Ideal for intuitive practitioners; quickly stabilizes and uplifts.",

    p_shortchant: "Short Chant / Non-sectarian Recitation",
    p_shortchant_desc:
      "Useful for quick emotional grounding and softening.",

    final_label: "Suggested entry practices:"
  }
};

// ============================================================
// Helper: Get current language text block
// ============================================================

function t() {
  return i18nText[currentLang] || i18nText.en;
}

// ============================================================
// MAIN ENGINE: SCORING + CLASSIFICATION
// ============================================================

function generateProfile() {
  const form = document.getElementById("questionnaireForm");
  if (!form) return;

  // Collect inputs (default to 3 if somehow unset)
  const Q = {};
  for (let i = 1; i <= 10; i++) {
    const field = form[`Q${i}`];
    const raw = field && field.value ? field.value : "3";
    Q[i] = parseInt(raw, 10) || 3;
  }

  // --------------------------------------------------------
  // 1. Practitioner Type (信行人 / 法行人)
  // --------------------------------------------------------
  const faithScore = Q[4] + Q[1] * 0.5 + Q[10] * 0.5;
  const dharmaScore = Q[3] + Q[2] * 0.5 + Q[5] * 0.3;

  const practitionerType = faithScore > dharmaScore ? "faith" : "dharma";

  // --------------------------------------------------------
  // 2. Disposition Types (Top 2)
  // --------------------------------------------------------
  const dispositions = {
    greed: Q[7],
    aversion: Q[8],
    delusion: Q[9],
    faithSoft: Q[4] + Q[10],
    insightAnalytic: Q[3] + Q[1]
  };

  const sortedHabits = Object.entries(dispositions)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([key]) => key);

  // --------------------------------------------------------
  // 3. Practice Recommendation Logic
  // --------------------------------------------------------
  const baseRecs = [];

  if (practitionerType === "faith") {
    baseRecs.push("p_lovingkindness", "p_light", "p_shortchant");
  } else {
    baseRecs.push("p_breath", "p_walk");
  }

  if (sortedHabits.includes("aversion")) baseRecs.push("p_lovingkindness");
  if (sortedHabits.includes("greed")) baseRecs.push("p_bodyscan");
  if (sortedHabits.includes("delusion")) baseRecs.push("p_walk");
  if (sortedHabits.includes("insightAnalytic")) baseRecs.push("p_breath");
  if (sortedHabits.includes("faithSoft")) baseRecs.push("p_light");

  const finalRecs = [...new Set(baseRecs)].slice(0, 3);

  // ============================================================
  // RENDER RESULT
  // ============================================================
  const lang = t();
  const resultContainer = document.getElementById("result");
  if (!resultContainer) return;

  const habitNames = sortedHabits.map((h) => lang["habit_" + h] || "").join(" ＋ ");
  const habitDescs = sortedHabits
    .map((h) => lang["habit_desc_" + h] || "")
    .join(" ");

  const resultHtml = `
    <h2>${lang.result_title}</h2>

    <h3>${lang.type_label}</h3>
    <p><strong>${lang["type_" + practitionerType]}</strong></p>
    <p>${lang["type_" + practitionerType + "_desc"]}</p>

    <h3>${lang.habit_label}</h3>
    <p><strong>${habitNames}</strong></p>
    <p>${habitDescs}</p>

    <h3>${lang.practice_label}</h3>
    ${finalRecs
      .map((key) => {
        return `
        <p>
          <strong>${lang[key]}</strong><br />
          ${lang[key + "_desc"]}
        </p>`;
      })
      .join("")}
  `;

  resultContainer.innerHTML = resultHtml;

  // Show CTA after results are generated
  const cta = document.getElementById("cta-section");
  if (cta) {
    cta.style.display = "block";
  }

  // Scroll result into view for mobile users
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// FORM RESET
// ============================================================

function resetFormAndResult() {
  const form = document.getElementById("questionnaireForm");
  if (form) {
    form.reset();
  }

  const resultContainer = document.getElementById("result");
  if (resultContainer) {
    resultContainer.innerHTML = "";
  }

  const cta = document.getElementById("cta-section");
  if (cta) {
    cta.style.display = "none";
  }

  // Re-apply default values (3) as per original logic, to avoid empty states
  if (form) {
    for (let i = 1; i <= 10; i++) {
      const select = form[`Q${i}`];
      if (select) {
        select.value = "3";
      }
    }
  }
}

// ============================================================
// LANGUAGE SWITCHER
// ============================================================

function switchLang(lang) {
  if (!i18nText[lang]) {
    lang = "en";
  }
  currentLang = lang;

  // Toggle active state on buttons
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang-btn");
    btn.classList.toggle("active", btnLang === lang);
  });

  // Update all elements with data-lang-en / data-lang-zh
  const attrName = `data-lang-${lang}`;
  document.querySelectorAll("[data-lang-en]").forEach((el) => {
    const value = el.getAttribute(attrName);
    if (value !== null) {
      el.innerHTML = value;
    }
  });

  // Re-render result in new language if it exists
  const resultContainer = document.getElementById("result");
  if (resultContainer && resultContainer.innerHTML.trim() !== "") {
    generateProfile();
  }
}

// ============================================================
// SOCIAL SHARE
// ============================================================

function shareTo(platform) {
  const url = encodeURIComponent(window.location.href);

  if (platform === "fb") {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  } else if (platform === "ig") {
    alert(
      "Instagram does not support direct URL share for previews. Please screenshot the result card to share on IG."
    );
  } else if (platform === "twitter") {
    window.open(
      `https://twitter.com/intent/tweet?url=${url}`,
      "_blank"
    );
  } else if (platform === "wa") {
    window.open(`https://wa.me/?text=${url}`, "_blank");
  }
}

// ============================================================
// INITIALIZE ON LOAD
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Initialise in English
  switchLang("en");
});
