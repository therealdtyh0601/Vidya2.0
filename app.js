/* ============================================================
   INNER PATH MAP — V3 JavaScript Engine
   Lumi Studios 光靈
   Navigation · Question Logic · Scoring · Result Rendering
============================================================ */

/* ===============================
   SCREEN CONTROL
=============================== */

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('screen-active'));
  document.getElementById(id).classList.add('screen-active');

  window.scrollTo({ top: 0, behavior: "smooth" });
}

/* ===============================
   LANGUAGE SELECTION
=============================== */

let currentLanguage = "en";

function selectLanguage(lang) {
  currentLanguage = lang;

  document.querySelectorAll("[data-lang-en]").forEach(el => {
    el.innerText = lang === "en" ? el.dataset.langEn : el.dataset.langZh;
  });

  showScreen("info-screen");
}

/* ===============================
   USER INFO
=============================== */

let userName = "";
let userDate = "";

function goToQuestions() {
  userName = document.getElementById("userName").value.trim();
  userDate = document.getElementById("userDate").value;

  if (!userName || !userDate) {
    alert(currentLanguage === "en" ? "Please enter your name and date." : "請輸入名字與日期。");
    return;
  }

  currentQuestion = 0;
  showQuestion();
  showScreen("question-screen");
}

/* ===============================
   QUESTION SET (v3 clean version)
=============================== */

const questions = [
  // 貪
  {
    en: "When facing difficulties, what is your first tendency?",
    zh: "面對困難時，你的第一反應是什麼？",
    options: [
      { en: "Look for comfort or relief", zh: "尋求讓自己舒服的方法", type: "greed" },
      { en: "Get irritated easily", zh: "容易不耐煩或煩躁", type: "aversion" },
      { en: "Feel confused or lost", zh: "感到混亂或不知所措", type: "delusion" }
    ]
  },
  // 信
  {
    en: "What motivates you more?",
    zh: "什麼更能激勵你？",
    options: [
      { en: "Inspiration and trust", zh: "受到啟發與信心的感覺", type: "faith" },
      { en: "Clarity and analysis", zh: "清晰邏輯與分析能力", type: "wisdom" }
    ]
  },
  // 瞋
  {
    en: "When someone disagrees with you, how do you react?",
    zh: "當有人不同意你的看法時，你會如何反應？",
    options: [
      { en: "Feel annoyed or defensive", zh: "感到不爽或想反擊", type: "aversion" },
      { en: "Try to understand logically", zh: "嘗試用理性理解", type: "wisdom" },
      { en: "Avoid confrontation", zh: "避免衝突", type: "delusion" }
    ]
  },
  // 慧
  {
    en: "How do you understand new teachings?",
    zh: "你如何理解新的教法或概念？",
    options: [
      { en: "I feel it first, then understand", zh: "先感受，再理解", type: "faith" },
      { en: "I must see its logic", zh: "必須看到邏輯才接受", type: "wisdom" }
    ]
  }
];

let currentQuestion = 0;
let answerRecord = [];

/* ===============================
   RENDER QUESTION
=============================== */

function showQuestion() {
  const q = questions[currentQuestion];
  const qText = currentLanguage === "en" ? q.en : q.zh;

  document.getElementById("questionText").innerText = qText;
  document.getElementById("questionCounter").innerText =
    `Q${currentQuestion + 1} / ${questions.length}`;

  const container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  q.options.forEach((opt, idx) => {
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = currentLanguage === "en" ? opt.en : opt.zh;

    btn.onclick = () => selectOption(idx);
    container.appendChild(btn);
  });

  highlightSelected();
}

function selectOption(idx) {
  answerRecord[currentQuestion] = idx;
  highlightSelected();
}

function highlightSelected() {
  const buttons = document.querySelectorAll(".option-btn");
  buttons.forEach((btn, idx) => {
    btn.classList.toggle("selected", answerRecord[currentQuestion] === idx);
  });
}

/* ===============================
   NAVIGATION
=============================== */

function nextQuestion() {
  if (answerRecord[currentQuestion] === undefined) {
    alert(currentLanguage === "en" ? "Please choose an answer." : "請選擇一個選項。");
    return;
  }
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    showQuestion();
  } else {
    calculateResult();
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
  answerRecord = [];
  currentQuestion = 0;
  showScreen("language-screen");
}

/* ===============================
   SCORING ENGINE (五習性 + 信/法)
=============================== */

const score = {
  greed: 0,
  aversion: 0,
  delusion: 0,
  faith: 0,
  wisdom: 0
};

function calculateResult() {
  Object.keys(score).forEach(k => (score[k] = 0));

  questions.forEach((q, qi) => {
    const type = q.options[answerRecord[qi]].type;
    score[type]++;
  });

  renderResult();
}

/* ===============================
   RESULT RENDER
=============================== */

function renderResult() {
  const card = document.getElementById("resultCard");

  const isFaithType = score.faith >= score.wisdom;
  const resultType = isFaithType
    ? (currentLanguage === "en" ? "Saddhānusārī · Follower by Faith" : "信行人")
    : (currentLanguage === "en" ? "Dhammānusārī · Follower by Dhamma" : "法行人");

  const oneLine = isFaithType
    ? (currentLanguage === "en"
        ? "You progress through trust, devotion, and heart-based openness."
        : "你的進步依賴信心、柔順與心的開放。")
    : (currentLanguage === "en"
        ? "You progress through clarity, analysis, and insight."
        : "你的進步依賴清晰、分析力與觀察力。");

  const suttaText = isFaithType
    ? `<div class="result-sutta">
         <div class="sutta-label">AN 6.46 · EA 27.7</div>
         <div class="sutta-text">“未能以慧見，而能隨信受者，是名信行。”</div>
         <div class="sutta-trans">“One who follows the Dhamma through faith is called a follower-by-faith.”</div>
       </div>`
    : `<div class="result-sutta">
         <div class="sutta-label">AN 6.46 · EA 27.7</div>
         <div class="sutta-text">“能以慧見，如實知法者，是名法行。”</div>
         <div class="sutta-trans">“One who sees with wisdom is called a follower-by-Dhamma.”</div>
       </div>`;

  card.innerHTML = `
    <div class="result-type">${resultType}</div>
    <div class="result-one-line">${oneLine}</div>
    ${suttaText}
  `;
}

/* ===============================
   ACCORDION INITIALIZER
=============================== */

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("accordion-header")) {
    const item = e.target.parentElement;
    const content = item.querySelector(".accordion-content");

    item.classList.toggle("active");

    if (item.classList.contains("active")) {
      content.style.maxHeight = content.scrollHeight + "px";
    } else {
      content.style.maxHeight = 0;
    }
  }
});
