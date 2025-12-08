/* ============================================================
   INNER PATH MAP — V3 ADVANCED ENGINE
   Lumi Studios 光靈
   Navigation · Question Logic · Advanced Scoring · Result Rendering
============================================================ */

/* ===============================
   GLOBAL STATE & UTILITIES
=============================== */

let currentLanguage = "en";
let userName = "";
let userDate = "";
let currentQuestion = 0;
let answerRecord = []; // index of selected option per question

// Show a screen by id and scroll to top
function showScreen(id) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("screen-active"));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add("screen-active");
  }
  window.scrollTo({ top: 0, behavior: "smooth" });
}

// Ensure the language picker is visible on initial load
document.addEventListener("DOMContentLoaded", () => {
  showScreen("language-screen");
});

/* ===============================
   LANGUAGE SELECTION
=============================== */

function selectLanguage(lang) {
  currentLanguage = lang === "zh" ? "zh" : "en";

  document.querySelectorAll("[data-lang-en]").forEach((el) => {
    const en = el.getAttribute("data-lang-en");
    const zh = el.getAttribute("data-lang-zh");
    if (!en || !zh) return;
    el.textContent = currentLanguage === "en" ? en : zh;
  });

  showScreen("info-screen");
}

/* ===============================
   USER INFO FLOW
=============================== */

function goToQuestions() {
  userName = document.getElementById("userName").value.trim();
  userDate = document.getElementById("userDate").value;

  if (!userName || !userDate) {
    alert(
      currentLanguage === "en"
        ? "Please enter your name and today's date."
        : "請輸入名字與今天日期。"
    );
    return;
  }

  currentQuestion = 0;
  answerRecord = [];
  showQuestion();
  showScreen("question-screen");
}

function goBack(targetId) {
  showScreen(targetId);
}

/* ===============================
   QUESTION SET (10 questions)
   Each option carries weights for 5 dispositions
   greed / aversion / delusion / faith / wisdom
=============================== */

const questions = [
  {
    id: "q1",
    en: "When you feel stressed, what do you usually do first?",
    zh: "當你感到壓力時，你通常最先會做什麼？",
    options: [
      {
        en: "Look for something pleasant (food, entertainment, scrolling).",
        zh: "找些讓自己愉快的事（吃東西、追劇、滑手機）。",
        weights: { greed: 2 },
      },
      {
        en: "Feel tense and easily irritated with others.",
        zh: "變得緊繃，容易對人不耐煩。",
        weights: { aversion: 2 },
      },
      {
        en: "Zone out, procrastinate, or feel mentally foggy.",
        zh: "整個人放空、拖延，或者腦袋一片糊。",
        weights: { delusion: 2 },
      },
    ],
  },
  {
    id: "q2",
    en: "What draws you more strongly toward a teaching or practice?",
    zh: "什麼會讓你更容易靠近一個教法或修行方式？",
    options: [
      {
        en: "Feeling of trust, blessings, or inner warmth.",
        zh: "內心的信任感、加持感、溫暖的感覺。",
        weights: { faith: 2 },
      },
      {
        en: "Clear reasoning, structure, and step-by-step clarity.",
        zh: "清楚的原理結構、條理分明的說明。",
        weights: { wisdom: 2 },
      },
    ],
  },
  {
    id: "q3",
    en: "When someone criticizes you, what happens inside?",
    zh: "當有人批評你時，你內在比較常出現的是？",
    options: [
      {
        en: "I feel hurt and may mentally argue back.",
        zh: "覺得受傷，內心會反駁對方。",
        weights: { aversion: 2 },
      },
      {
        en: "I try to understand if their point logically makes sense.",
        zh: "試著看對方說的在理不在理。",
        weights: { wisdom: 1 },
      },
      {
        en: "I go numb or shut down and do not process much.",
        zh: "整個人有點關機，沒有處理太多情緒或想法。",
        weights: { delusion: 1 },
      },
    ],
  },
  {
    id: "q4",
    en: "How do you usually relate to spiritual or religious imagery (statues, mantras, rituals)?",
    zh: "你對宗教或修行的形象（佛像、真言、儀軌）通常是什麼感覺？",
    options: [
      {
        en: "If I feel devotion or blessing, I naturally connect.",
        zh: "有感覺到加持或恭敬時，就會很自然地靠近。",
        weights: { faith: 2 },
      },
      {
        en: "I respect it, but I want to understand the principle behind it.",
        zh: "我會尊重，但更想先理解背後原理。",
        weights: { wisdom: 2 },
      },
      {
        en: "Sometimes I feel disconnected or unsure how to relate.",
        zh: "有時候會覺得跟自己有點沒關係，不太知道怎麼靠近。",
        weights: { delusion: 1 },
      },
    ],
  },
  {
    id: "q5",
    en: "In daily life, you tend to:",
    zh: "在日常生活中，你比較常：",
    options: [
      {
        en: "Seek pleasant experiences and avoid discomfort.",
        zh: "傾向追求愉快、避免不舒服的狀態。",
        weights: { greed: 2 },
      },
      {
        en: "Get stuck on what went wrong or what you dislike.",
        zh: "常常卡在自己不喜歡或看不順眼的事物上。",
        weights: { aversion: 2 },
      },
      {
        en: "Drift through the day without much clear intention.",
        zh: "一天就這樣飄過去，沒有太清楚的方向感。",
        weights: { delusion: 2 },
      },
    ],
  },
  {
    id: "q6",
    en: "When you hear a teaching that you do not fully grasp yet:",
    zh: "當你聽到一個暫時還聽不太懂的教法時：",
    options: [
      {
        en: "If it comes from a trusted teacher or lineage, I can still follow it.",
        zh: "如果是信任的上師或傳承說的，我還是可以先接受。",
        weights: { faith: 2, delusion: -0.5 },
      },
      {
        en: "I need more explanation; I cannot follow it only by faith.",
        zh: "需要再多解釋，光靠「相信」對我來說不太夠。",
        weights: { wisdom: 2 },
      },
    ],
  },
  {
    id: "q7",
    en: "Your natural way of observing the mind is closer to:",
    zh: "你比較自然的「看心方式」是：",
    options: [
      {
        en: "Feeling and sensing: warm, cold, open, closed.",
        zh: "偏向感受：溫暖、冷掉、打開、關起來的感覺。",
        weights: { faith: 1, greed: 0.5 },
      },
      {
        en: "Noticing patterns: cause, effect, triggers, loops.",
        zh: "偏向觀察：因果、觸發點、重複模式。",
        weights: { wisdom: 2 },
      },
    ],
  },
  {
    id: "q8",
    en: "When you try to meditate or be mindful:",
    zh: "當你嘗試打坐或覺知時：",
    options: [
      {
        en: "Mind jumps toward fantasies, plans, or pleasures.",
        zh: "心容易飄去幻想、計畫或愉快的畫面。",
        weights: { greed: 1, delusion: 1 },
      },
      {
        en: "Mind argues with itself or rejects experience.",
        zh: "心會在裡面跟自己爭辯，或拒絕正在發生的事。",
        weights: { aversion: 1.5 },
      },
      {
        en: "Mind simply blanks out or fades into dullness.",
        zh: "心直接變得一團糊，進入昏沉狀態。",
        weights: { delusion: 2 },
      },
    ],
  },
  {
    id: "q9",
    en: "Which sentence feels more like you at this stage?",
    zh: "以下哪一句，現在的你比較有共鳴？",
    options: [
      {
        en: "“If I feel the heart is right, I can walk the path.”",
        zh: "「只要心感覺對，我就走得下去。」",
        weights: { faith: 2 },
      },
      {
        en: "“If the view is clear, I can walk the path.”",
        zh: "「只要見地清楚，我就走得下去。」",
        weights: { wisdom: 2 },
      },
    ],
  },
  {
    id: "q10",
    en: "When making an important decision:",
    zh: "當你要做一個重要決定時：",
    options: [
      {
        en: "I check how it feels in my heart.",
        zh: "我會看這件事在心裡的感覺對不對。",
        weights: { faith: 1.5 },
      },
      {
        en: "I list pros/cons or think it through logically.",
        zh: "我會列出優缺點，或用邏輯仔細分析。",
        weights: { wisdom: 1.5 },
      },
      {
        en: "I avoid deciding until I am forced to.",
        zh: "我會拖到不得不決定為止。",
        weights: { delusion: 1.5 },
      },
    ],
  },
];

/* ===============================
   RENDER QUESTION
=============================== */

function showQuestion() {
  const q = questions[currentQuestion];
  if (!q) return;

  const qText = currentLanguage === "en" ? q.en : q.zh;
  document.getElementById("questionText").innerText = qText;
  document.getElementById("questionCounter").innerText = `Q${currentQuestion + 1} / ${questions.length}`;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";

    btn.textContent = currentLanguage === "en" ? opt.en : opt.zh;

    btn.addEventListener("click", () => selectOption(idx));
    container.appendChild(btn);
  });

  highlightSelected();
}

function selectOption(idx) {
  answerRecord[currentQuestion] = idx;
  highlightSelected();
}

function highlightSelected() {
  const buttons = document.querySelectorAll("#optionsContainer .option-btn");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("selected", answerRecord[currentQuestion] === idx);
  });
}

/* ===============================
   QUESTION NAVIGATION
=============================== */

function nextQuestion() {
  if (answerRecord[currentQuestion] === undefined) {
    alert(currentLanguage === "en" ? "Please choose an answer." : "請先選擇一個選項。");
    return;
  }

  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    calculateResultAdvanced();
    showScreen("result-screen");
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    showQuestion();
  } else {
    showScreen("info-screen");
  }
}

function restartAssessment() {
  userName = "";
  userDate = "";
  currentQuestion = 0;
  answerRecord = [];
  showScreen("language-screen");
}

/* ===============================
   ADVANCED SCORING ENGINE
=============================== */

function calculateResultAdvanced() {
  // Initialize scores
  const raw = {
    greed: 0,
    aversion: 0,
    delusion: 0,
    faith: 0,
    wisdom: 0,
  };

  // Aggregate weights
  questions.forEach((q, qIndex) => {
    const answerIdx = answerRecord[qIndex];
    if (answerIdx === undefined) return;
    const weights = q.options[answerIdx].weights || {};
    Object.keys(weights).forEach((k) => {
      if (raw[k] === undefined) return;
      raw[k] += weights[k];
    });
  });

  // Normalize to percentages
  const sumPos =
    Math.max(raw.greed, 0) +
    Math.max(raw.aversion, 0) +
    Math.max(raw.delusion, 0) +
    Math.max(raw.faith, 0) +
    Math.max(raw.wisdom, 0);

  const norm = {};
  if (sumPos > 0) {
    Object.keys(raw).forEach((k) => {
      norm[k] = Math.round((Math.max(raw[k], 0) / sumPos) * 100);
    });
  } else {
    Object.keys(raw).forEach((k) => {
      norm[k] = 0;
    });
  }

  // Determine primary & secondary traits
  const sortedTraits = Object.entries(norm)
    .sort((a, b) => b[1] - a[1])
    .map(([k]) => k);

  const primaryTrait = sortedTraits[0] || "faith";
  const secondaryTrait = sortedTraits[1] || "wisdom";

  // Faith vs Wisdom follower type
  const faithScore = norm.faith || 0;
  const wisdomScore = norm.wisdom || 0;

  let followerType; // "faith", "dhamma", "mixed"
  let confidence = 0;

  if (faithScore === 0 && wisdomScore === 0) {
    followerType = "mixed";
    confidence = 0;
  } else {
    const diff = Math.abs(faithScore - wisdomScore);
    const sum = faithScore + wisdomScore;
    confidence = Math.round((diff / sum) * 100);

    if (diff < 10) {
      followerType = "mixed";
    } else if (faithScore > wisdomScore) {
      followerType = "faith";
    } else {
      followerType = "dhamma";
    }
  }

  const resultModel = {
    raw,
    norm,
    primaryTrait,
    secondaryTrait,
    followerType,
    confidence,
  };

  renderAdvancedResult(resultModel);
}

/* ===============================
   RESULT TEXT LIBRARY
=============================== */

const traitLabels = {
  greed: {
    en: "Greed-type (Rāga)",
    zh: "貪行性",
  },
  aversion: {
    en: "Aversion-type (Dosa)",
    zh: "瞋行性",
  },
  delusion: {
    en: "Delusion-type (Moha)",
    zh: "癡行性",
  },
  faith: {
    en: "Faith-soft (Saddhā)",
    zh: "信柔型（信根）",
  },
  wisdom: {
    en: "Insight-analytic (Paññā)",
    zh: "智觀型（慧根）",
  },
};

const traitInsight = {
  greed: {
    en: "Your mind naturally seeks comfort, pleasant experiences, and ease. When balanced, this can become appreciation and joy; when unbalanced, it leads to distraction.",
    zh: "你的心比較自然地往舒適、愉悅與輕鬆走。平衡時是欣賞與喜悅，不平衡時容易變成分心與逃避。",
  },
  aversion: {
    en: "You are sensitive to what is wrong or unfair. When balanced, this becomes clarity and courage; when unbalanced, it turns into harshness and tension.",
    zh: "你對於不對勁與不公平特別敏感。平衡時是清晰與勇氣，不平衡時會變成嚴苛與緊繃。",
  },
  delusion: {
    en: "Your system easily goes into fog, shutdown, or avoidance. Training gentle mindfulness will be especially important for you.",
    zh: "你的系統比較容易進入迷糊、關機或逃避模式。溫柔地訓練覺知，對你格外重要。",
  },
  faith: {
    en: "Your heart moves through trust, devotion, and resonance. For you, warmth and blessings are real forces for transformation.",
    zh: "你的心是透過信任、恭敬與共鳴而移動的。對你而言，溫度與加持是真實的轉化力量。",
  },
  wisdom: {
    en: "You move when the view is clear. Understanding, structure, and insight are your main gateways to practice.",
    zh: "當見地清楚時，你才真正會動。理解、結構與洞見，是你入道的主要門。",
  },
};

// Practice suggestions depending on follower type + primary trait
function getPracticeSuggestions(followerType, primaryTrait) {
  const lang = currentLanguage;
  const suggestions = [];

  // Faith follower base
  if (followerType === "faith") {
    suggestions.push(
      lang === "en"
        ? "Begin with heart-based practices: loving-kindness, refuge, or light visualization, even for short sessions."
        : "先從心為主的練習開始，例如慈心禪、皈依觀、光明觀，即使只是短時間也可以。",
      lang === "en"
        ? "Keep a simple daily phrase of devotion or aspiration that you repeat with sincerity."
        : "給自己一兩句真心有感的發願或祈請語，日常反覆默念。"
    );
  }

  // Dhamma follower base
  if (followerType === "dhamma") {
    suggestions.push(
      lang === "en"
        ? "Include short sessions of breath awareness (5–10 breaths) with clear counting or labeling."
        : "加入短時間的觀呼吸練習（5–10 個呼吸），可以配合清楚的數息或標記。",
      lang === "en"
        ? "Read or listen to concise teachings on dependent arising, the four noble truths, or mind science."
        : "閱讀或聽一些簡明的緣起、四聖諦或心識結構的教學，有助於你穩定信心。"
    );
  }

  // Mixed type base
  if (followerType === "mixed") {
    suggestions.push(
      lang === "en"
        ? "Combine a short devotional element (refuge, prayer, bowing) with a brief period of clear observation."
        : "把一小段皈依、祈請或頂禮，與一小段清楚的觀察練習結合在一起。",
      lang === "en"
        ? "Alternate between feeling the heart and observing mental patterns, without forcing a single style."
        : "在「感受心」與「觀察念頭模式」之間交替，不必強迫自己只用一種方式。"
    );
  }

  // Modulate by primaryTrait
  switch (primaryTrait) {
    case "greed":
      suggestions.push(
        lang === "en"
          ? "Train contentment: intentionally enjoy simple, non-sensual things like breath, silence, or generosity."
          : "刻意訓練「知足」：學會享受呼吸、安靜、布施等非感官刺激的喜樂。",
        lang === "en"
          ? "Practice sharing and generosity whenever possible to soften grasping."
          : "有機會就練習布施與分享，慢慢鬆開抓取感。"
      );
      break;
    case "aversion":
      suggestions.push(
        lang === "en"
          ? "Use softening practices: body relaxation, gentle breathing, and consciously releasing micro-tensions."
          : "加入鬆身、柔和呼吸、有意識地放鬆微小緊繃等練習，讓心先軟下來。",
        lang === "en"
          ? "Practice reframing: instead of ‘against’, explore ‘how can this be understood or integrated?’"
          : "練習換位思考：從「對立」轉成「這件事我可以怎麼理解、怎麼安放？」。"
      );
      break;
    case "delusion":
      suggestions.push(
        lang === "en"
          ? "Keep practices short and clear: 1–3 minutes of simple noticing, repeated many times."
          : "保持練習短而清楚：1–3 分鐘的簡單覺察，一天重複多次。",
        lang === "en"
          ? "Anchor attention with physical cues (touch, posture, breath at nostrils) to reduce spacing out."
          : "用身體的觸覺、姿勢、鼻尖呼吸等作為錨點，減少發呆與走神。"
      );
      break;
    case "faith":
      suggestions.push(
        lang === "en"
          ? "Let devotion feed steadiness: combine chanting or prayer with a stable sitting posture."
          : "讓恭敬與祈請成為穩定的力量：配合簡單持誦與端正的坐姿。",
        lang === "en"
          ? "Spend moments simply feeling gratitude toward your teachers, lineage, or the path itself."
          : "每天留一點時間，單純安住在對師長、傳承或道路的感恩之中。"
      );
      break;
    case "wisdom":
      suggestions.push(
        lang === "en"
          ? "After understanding a teaching, deliberately sit and feel it in silence for a few minutes."
          : "在理解教法之後，刻意安靜地坐幾分鐘，讓見地落到身心裡。",
        lang === "en"
          ? "Practice observing cause and effect in your own reactions, not only in theory."
          : "不只是概念上懂緣起，也觀察自己日常反應中的起因與結果。"
      );
      break;
  }

  return suggestions;
}

/* ===============================
   ADVANCED RESULT RENDER
=============================== */

function renderAdvancedResult(model) {
  const { norm, primaryTrait, secondaryTrait, followerType, confidence } = model;
  const card = document.getElementById("resultCard");
  const lang = currentLanguage;

  // Determine follower label & one-line summary
  let typeLabel, oneLine, suttaBlock;

  if (followerType === "faith") {
    typeLabel =
      lang === "en"
        ? "Faith-Follower (Saddhānusārī)"
        : "信行人（Saddhānusārī）";
    oneLine =
      lang === "en"
        ? "You enter the path mainly through trust, warmth, and devotion."
        : "你主要是透過信任、溫度與恭敬之心來走上修行之路。";
    suttaBlock = `
      <div class="result-sutta">
        <div class="sutta-label">AN 6.46 · EA 27.7</div>
        <div class="sutta-text">“未能以慧見，而能隨信受者，是名信行。”</div>
        <div class="sutta-trans">${
          lang === "en"
            ? "One who follows the Tathāgata’s teaching by faith, before fully seeing with wisdom, is called a follower-by-faith."
            : "對如來所說之法，雖尚未以慧見之，然能隨信受持者，名為信行人。"
        }</div>
      </div>
    `;
  } else if (followerType === "dhamma") {
    typeLabel =
      lang === "en"
        ? "Dhamma-Follower (Dhammānusārī)"
        : "法行人（Dhammānusārī）";
    oneLine =
      lang === "en"
        ? "You enter the path mainly through clarity, understanding, and insight."
        : "你主要是透過清楚的理解與見地來走上修行之路。";
    suttaBlock = `
      <div class="result-sutta">
        <div class="sutta-label">AN 6.46 · EA 27.7</div>
        <div class="sutta-text">“能以慧見，如實知法者，是名法行。”</div>
        <div class="sutta-trans">${
          lang === "en"
            ? "One who sees the Dhamma with wisdom, knowing it as it really is, is called a follower-by-Dhamma."
            : "能以智慧見法，如實而知者，名為法行人。"
        }</div>
      </div>
    `;
  } else {
    typeLabel =
      lang === "en"
        ? "Mixed-Follower (Faith & Dhamma)"
        : "信法並行（混合型）";
    oneLine =
      lang === "en"
        ? "Your path weaves both heart-based trust and clarity-based understanding."
        : "你是同時透過心的信任與見地的清楚來走路的混合型行者。";
    suttaBlock = `
      <div class="result-sutta">
        <div class="sutta-label">AN 6.46 · EA 27.7</div>
        <div class="sutta-text">${
          lang === "en"
            ? "The Buddha taught disciples who follow primarily by faith and those who follow primarily by Dhamma. Some naturally combine both."
            : "佛陀曾教導有依信而行者，也有依法而行者；有些弟子天生兼具兩種傾向。"
        }</div>
      </div>
    `;
  }

  const confidenceLine =
    followerType === "mixed"
      ? lang === "en"
        ? "Your faith–wisdom tendency is balanced; classification is mixed-type."
        : "你的信與慧傾向相對接近，較偏向混合型行者。"
      : lang === "en"
      ? `Confidence of this classification: about ${confidence}% (based on your faith vs wisdom pattern).`
      : `此分類的信心水平：約為 ${confidence}%（依你的信心與智慧分佈推算）。`;

  const primaryLabel = traitLabels[primaryTrait]
    ? traitLabels[primaryTrait][lang]
    : "";
  const secondaryLabel = traitLabels[secondaryTrait]
    ? traitLabels[secondaryTrait][lang]
    : "";

  const primaryInsight = traitInsight[primaryTrait]
    ? traitInsight[primaryTrait][lang]
    : "";
  const suggestions = getPracticeSuggestions(followerType, primaryTrait);

  const traitLines = [
    {
      key: "faith",
      label: traitLabels.faith[lang],
      value: norm.faith,
    },
    {
      key: "wisdom",
      label: traitLabels.wisdom[lang],
      value: norm.wisdom,
    },
    {
      key: "greed",
      label: traitLabels.greed[lang],
      value: norm.greed,
    },
    {
      key: "aversion",
      label: traitLabels.aversion[lang],
      value: norm.aversion,
    },
    {
      key: "delusion",
      label: traitLabels.delusion[lang],
      value: norm.delusion,
    },
  ];

  const traitListHtml = traitLines
    .map(
      (t) =>
        `<li>${t.label}: ${t.value}%</li>`
    )
    .join("");

  const suggestionHtml = suggestions
    .map((s) => `<li>${s}</li>`)
    .join("");

  card.innerHTML = `
    <div class="result-type">${typeLabel}</div>
    <div class="result-one-line">${oneLine}</div>
    ${suttaBlock}

    <div class="tendencies-summary">
      <h4>${
        lang === "en" ? "Your inner disposition map" : "你的心性結構概覽"
      }</h4>
      <ul>${traitListHtml}</ul>
      <p style="font-size:0.8rem;color:#5C6976;margin-top:4px;">${confidenceLine}</p>
    </div>

    <div class="primary-insight" style="margin-top:10px;">
      <h4>${
        lang === "en" ? "Primary tendency" : "主要傾向"
      }：${primaryLabel}</h4>
      <p style="font-size:0.88rem;color:#444;">${primaryInsight}</p>
      <p style="font-size:0.82rem;color:#666;">
        ${
          lang === "en"
            ? `Secondary tendency: ${secondaryLabel}`
            : `次要傾向：${secondaryLabel}`
        }
      </p>
    </div>

    <div class="practice-suggestions" style="margin-top:10px;">
      <h4>${
        lang === "en" ? "Suggested practice directions" : "建議修行方向"
      }</h4>
      <ul>${suggestionHtml}</ul>
    </div>
  `;
}

/* ===============================
   LEARN MORE BUTTON HOOK
=============================== */

document.addEventListener("DOMContentLoaded", () => {
  const learnBtn = document.getElementById("learnMoreBtn");
  if (learnBtn) {
    learnBtn.addEventListener("click", () => {
      showScreen("learn-faculties");
    });
  }
});

/* ===============================
   ACCORDION INITIALIZER
=============================== */

document.addEventListener("click", (e) => {
  const header = e.target.closest(".accordion-header");
  if (!header) return;

  const item = header.parentElement;
  const content = item.querySelector(".accordion-content");

  item.classList.toggle("active");

  if (item.classList.contains("active")) {
    content.style.maxHeight = content.scrollHeight + "px";
  } else {
    content.style.maxHeight = 0;
  }
});
