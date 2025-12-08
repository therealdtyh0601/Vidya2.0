// ============================================================
// The Inner Path Map v2.0
// UI Flow: Welcome → Questions → Loading → Result
// ============================================================

let currentLang = "en";
let currentQuestionIndex = 0; // 0–9
let answers = new Array(10).fill(null);

// ============================================================
// QUESTION DEFINITIONS
// ============================================================

const questions = [
  {
    id: 1,
    text: {
      en: "I can notice changes in my breath, body, and emotions.",
      zh: "我能覺察呼吸、身體與情緒的變化。"
    }
  },
  {
    id: 2,
    text: {
      en: "I can stay focused without getting distracted easily.",
      zh: "我能在專注時不容易分心。"
    }
  },
  {
    id: 3,
    text: {
      en: "I like observing my thoughts to understand them better.",
      zh: "我喜歡觀察並理解自己的想法。"
    }
  },
  {
    id: 4,
    text: {
      en: "In difficult times, I rely on trust, intention, or goodwill.",
      zh: "我遇到困難時會依靠善心或信念。"
    }
  },
  {
    id: 5,
    text: {
      en: "I normally have motivation and energy for important things.",
      zh: "我通常很有動力去做重要的事。"
    }
  },
  {
    id: 6,
    text: {
      en: "I can relax my body and mind quite easily.",
      zh: "我能很快放鬆身心。"
    }
  },
  {
    id: 7,
    text: {
      en: "I tend to seek comfort or pleasant states.",
      zh: "我容易依賴愉悅與舒適感。"
    }
  },
  {
    id: 8,
    text: {
      en: "I react quickly to stress or criticism.",
      zh: "我對壓力與批評反應快。"
    }
  },
  {
    id: 9,
    text: {
      en: "I get distracted or feel mentally foggy easily.",
      zh: "我容易分心或腦袋模糊。"
    }
  },
  {
    id: 10,
    text: {
      en: "When it's quiet, I naturally feel a gentle happiness.",
      zh: "安靜時我會自然生起愉悅。"
    }
  }
];

// ============================================================
// i18n TEXT SYSTEM
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

    type_faith_desc:
      "你以信念、願心、安心感作為修行的力量來源，適合法以慈心、光明觀或誦念為起點。",
    type_dharma_desc:
      "你以理解、觀察、洞察力推動修行，適合從呼吸、正念與止觀開始。",

    // habits
    habit_greed: "貪行性",
    habit_aversion: "瞋行性",
    habit_delusion: "痴行性",
    habit_faithSoft: "信柔型",
    habit_insightAnalytic: "智觀型",

    habit_desc_greed:
      "你的心依賴愉悅或舒適，適合身體覺知與呼吸穩定法。",
    habit_desc_aversion:
      "你的心容易緊繃、反應快，適合慈心禪與放鬆法。",
    habit_desc_delusion:
      "你的心較散亂或不易集中，適合行禪與循序穩定呼吸。",
    habit_desc_faithSoft:
      "你心柔軟、感受力高，適合光明觀與慈心法門。",
    habit_desc_insightAnalytic:
      "你善於理解與觀察，適合同步練習止觀與內觀。",

    // practices
    p_walk: "行禪（Walking Meditation）",
    p_walk_desc:
      "透過步伐帶動覺知，非常適合散亂或緊繃的心。",

    p_breath: "安般念（觀呼吸）",
    p_breath_desc:
      "穩定心念、增強專注，是最廣泛適用的入門方法。",

    p_lovingkindness: "慈心禪（Loving-kindness）",
    p_lovingkindness_desc:
      "柔化情緒、減少瞋心、提升幸福感。",

    p_bodyscan: "身體掃描（Body Scan）",
    p_bodyscan_desc:
      "放鬆身心、提升覺知，非常適合初學者。",

    p_light: "光明觀（Light Visualization）",
    p_light_desc:
      "提升安心感與清明度，適合信柔型與感性行人。",

    p_shortchant: "短咒誦／念佛（非宗派）",
    p_shortchant_desc:
      "穩定情緒、安定心念，是信行人的快速入門法。",

    final_label: "你的入門修行建議：",

    // Scale labels (1–5)
    scale_1_label: "幾乎不符合",
    scale_2_label: "有一點",
    scale_3_label: "普通",
    scale_4_label: "大致符合",
    scale_5_label: "非常符合",

    scale_1_emoji: "😣",
    scale_2_emoji: "😕",
    scale_3_emoji: "🙂",
    scale_4_emoji: "😌",
    scale_5_emoji: "🤩"
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

    final_label: "Suggested entry practices:",

    // Scale labels (1–5)
    scale_1_label: "Not true",
    scale_2_label: "Slightly",
    scale_3_label: "Neutral",
    scale_4_label: "Mostly true",
    scale_5_label: "Very true",

    scale_1_emoji: "😣",
    scale_2_emoji: "😕",
    scale_3_emoji: "🙂",
    scale_4_emoji: "😌",
    scale_5_emoji: "🤩"
  }
};

function t() {
  return i18nText[currentLang] || i18nText.en;
}

// ============================================================
// SCREEN MANAGEMENT
// ============================================================

function showScreen(screenId) {
  const screens = document.querySelectorAll(".screen");
  screens.forEach((s) => s.classList.remove("screen-active"));

  const target = document.getElementById(screenId);
  if (target) {
    target.classList.add("screen-active");
  }
}

// ============================================================
// ASSESSMENT FLOW CONTROLS
// ============================================================

function startAssessment() {
  currentQuestionIndex = 0;
  if (!answers || answers.length !== 10) {
    answers = new Array(10).fill(null);
  }
  showScreen("screen-questions");
  renderQuestion();
}

function resetAssessment() {
  answers = new Array(10).fill(null);
  currentQuestionIndex = 0;
  showScreen("screen-questions");
  renderQuestion();
}

function goHome() {
  answers = new Array(10).fill(null);
  currentQuestionIndex = 0;
  showScreen("screen-welcome");
}

// Move to previous / next question (manual nav)

function goToPreviousQuestion() {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex -= 1;
    renderQuestion();
  }
}

function goToNextQuestion() {
  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex += 1;
    renderQuestion();
  } else {
    // Last question -> show loading -> compute result
    showLoadingAndThenResult();
  }
}

// ============================================================
// QUESTION RENDERING
// ============================================================

function renderQuestion() {
  const qData = questions[currentQuestionIndex];
  if (!qData) return;

  const langBlock = t();

  const qTextEl = document.getElementById("question-text");
  const progressLabelEl = document.getElementById("progress-label");
  const progressFillEl = document.getElementById("progress-fill");
  const answerRowEl = document.getElementById("answer-row");

  if (qTextEl) {
    qTextEl.textContent = qData.text[currentLang] || qData.text.en;
  }

  if (progressLabelEl) {
    const labelEn = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
    const labelZh = `第 ${currentQuestionIndex + 1} 題／共 ${questions.length} 題`;
    progressLabelEl.textContent = currentLang === "zh" ? labelZh : labelEn;
  }

  if (progressFillEl) {
    const pct = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressFillEl.style.width = `${pct}%`;
  }

  if (answerRowEl) {
    answerRowEl.innerHTML = "";
    const scaleEmojis = [
      langBlock.scale_1_emoji,
      langBlock.scale_2_emoji,
      langBlock.scale_3_emoji,
      langBlock.scale_4_emoji,
      langBlock.scale_5_emoji
    ];
    const scaleLabels = [
      langBlock.scale_1_label,
      langBlock.scale_2_label,
      langBlock.scale_3_label,
      langBlock.scale_4_label,
      langBlock.scale_5_label
    ];

    for (let value = 1; value <= 5; value++) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "answer-btn";

      if (answers[currentQuestionIndex] === value) {
        btn.classList.add("selected");
      }

      const emojiSpan = document.createElement("span");
      emojiSpan.className = "answer-emoji";
      emojiSpan.textContent = scaleEmojis[value - 1];

      const labelSpan = document.createElement("span");
      labelSpan.className = "answer-label";
      labelSpan.textContent = scaleLabels[value - 1];

      btn.appendChild(emojiSpan);
      btn.appendChild(labelSpan);

      btn.addEventListener("click", () => {
        setAnswer(value);
      });

      answerRowEl.appendChild(btn);
    }
  }

  // Enable/disable prev button
  const prevBtn = document.getElementById("btn-prev");
  if (prevBtn) {
    prevBtn.disabled = currentQuestionIndex === 0;
    prevBtn.style.opacity = currentQuestionIndex === 0 ? "0.6" : "1";
  }

  const nextBtn = document.getElementById("btn-next");
  if (nextBtn) {
    const isLast = currentQuestionIndex === questions.length - 1;
    const nextTextEn = isLast ? "View results" : "Next";
    const nextTextZh = isLast ? "查看結果" : "下一題";
    const span = nextBtn.querySelector("span");
    if (span) {
      span.textContent = currentLang === "zh" ? nextTextZh : nextTextEn;
    }
  }
}

function setAnswer(value) {
  answers[currentQuestionIndex] = value;

  // Re-render to update selection state
  renderQuestion();

  // Auto-advance after short delay, unless last question
  if (currentQuestionIndex < questions.length - 1) {
    setTimeout(() => {
      currentQuestionIndex += 1;
      renderQuestion();
    }, 300);
  } else {
    setTimeout(() => {
      showLoadingAndThenResult();
    }, 350);
  }
}

// ============================================================
// LOADING + RESULT
// ============================================================

function showLoadingAndThenResult() {
  showScreen("screen-loading");

  // Simulate processing delay
  setTimeout(() => {
    generateProfileFromAnswers();
  }, 1000);
}

function generateProfileFromAnswers() {
  // Build Q object as in original logic (default 3 if null)
  const Q = {};
  for (let i = 0; i < questions.length; i++) {
    const val = answers[i] || 3;
    Q[i + 1] = val;
  }

  // 1. Practitioner type
  const faithScore = Q[4] + Q[1] * 0.5 + Q[10] * 0.5;
  const dharmaScore = Q[3] + Q[2] * 0.5 + Q[5] * 0.3;
  const practitionerType = faithScore > dharmaScore ? "faith" : "dharma";

  // 2. Disposition types
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

  // 3. Practice recommendations
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

  // Render result
  const langBlock = t();
  const resultContainer = document.getElementById("result");
  if (!resultContainer) return;

  const habitNames = sortedHabits
    .map((h) => langBlock["habit_" + h] || "")
    .join(" ＋ ");

  const habitDescs = sortedHabits
    .map((h) => langBlock["habit_desc_" + h] || "")
    .join(" ");

  const resultHtml = `
    <h2>${langBlock.result_title}</h2>

    <h3>${langBlock.type_label}</h3>
    <p><strong>${langBlock["type_" + practitionerType]}</strong></p>
    <p>${langBlock["type_" + practitionerType + "_desc"]}</p>

    <h3>${langBlock.habit_label}</h3>
    <p><strong>${habitNames}</strong></p>
    <p>${habitDescs}</p>

    <h3>${langBlock.practice_label}</h3>
    ${finalRecs
      .map((key) => {
        return `
        <p>
          <strong>${langBlock[key]}</strong><br />
          ${langBlock[key + "_desc"]}
        </p>`;
      })
      .join("")}
  `;

  resultContainer.innerHTML = resultHtml;
  showScreen("screen-result");

  // Scroll into view on mobile
  resultContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

// ============================================================
// LANGUAGE SWITCHER
// ============================================================

function switchLang(lang) {
  if (!i18nText[lang]) {
    lang = "en";
  }
  currentLang = lang;

  // Toggle active state on language buttons
  const langButtons = document.querySelectorAll(".lang-btn");
  langButtons.forEach((btn) => {
    const btnLang = btn.getAttribute("data-lang-btn");
    btn.classList.toggle("active", btnLang === lang);
  });

  // Update any element with data-lang-en / data-lang-zh
  document.querySelectorAll("[data-lang-en]").forEach((el) => {
    const value = el.getAttribute(`data-lang-${lang}`);
    if (value !== null) {
      el.textContent = value;
    }
  });

  // Re-render question if we are on question screen
  const questionsScreen = document.getElementById("screen-questions");
  if (questionsScreen && questionsScreen.classList.contains("screen-active")) {
    renderQuestion();
  }

  // Re-render result in new language if result already exists
  const resultScreen = document.getElementById("screen-result");
  const resultContainer = document.getElementById("result");
  if (
    resultScreen &&
    resultScreen.classList.contains("screen-active") &&
    resultContainer &&
    resultContainer.innerHTML.trim() !== ""
  ) {
    generateProfileFromAnswers();
  }
}

// ============================================================
// SOCIAL SHARE
// ============================================================

function shareTo(platform) {
  const url = encodeURIComponent(window.location.href);

  if (platform === "fb") {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      "_blank"
    );
  } else if (platform === "ig") {
    alert(
      currentLang === "zh"
        ? "Instagram 不支援直接預覽分享，請截圖結果卡片後分享到 IG。"
        : "Instagram does not support direct preview sharing. Please screenshot your result card and share on IG."
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
// INITIALIZE
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // Default language
  switchLang("en");
  // Start on welcome screen
  showScreen("screen-welcome");
});
