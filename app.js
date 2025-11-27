// ============================================================
// Zen Buddhist Path Lite v2.0
// Full Mapping Engine for:
// - 行人類型（信行人 / 法行人）
// - 習性（貪 / 瞋 / 痴 / 信柔 / 智觀）
// - 五根五力
// - 七覺支
// - 入門修行建議（1–3）
// - Bilingual Output
// ============================================================

// i18n Engine ------------------------------------------------

let currentLang = "zh";

const i18nText = {
    zh: {
        result_title: "禪修人格分析結果",
        type_label: "行人類型",
        habit_label: "習性傾向",
        practice_label: "適合你的修行入門模式",

        // practitioner types
        type_faith: "信行人",
        type_dharma: "法行人",

        type_faith_desc: "你以信念、安心感與願力作為修行的核心，心性柔軟，適合法門以慈悲與觀想為主。",
        type_dharma_desc: "你以理解、觀察與洞察力推動修行，思路清晰，適合從觀呼吸、正念與止觀開始。",

        // habits
        habit_greed: "貪行性",
        habit_aversion: "瞋行性",
        habit_delusion: "痴行性",
        habit_faithSoft: "信柔型",
        habit_insightAnalytic: "智觀型",

        habit_desc_greed: "你的心向往愉悅與舒適，適合身體覺知與呼吸法。",
        habit_desc_aversion: "你的心容易緊繃或急躁，適合慈心禪與放鬆練習。",
        habit_desc_delusion: "你的心容易散亂與模糊，適合循序漸進與行禪。",
        habit_desc_faithSoft: "你感性細膩，適合光明觀與慈心法門。",
        habit_desc_insightAnalytic: "你善於觀察與理解，適合同步練習正念與止觀。",

        // practices
        p_walk: "行禪（Walking Meditation）",
        p_walk_desc: "以步伐帶動覺知，特別適合散亂或緊繃的心。",
        
        p_breath: "安般念（觀呼吸）",
        p_breath_desc: "建立穩定與安定力，是大多數行人的基礎法門。",
        
        p_lovingkindness: "慈心禪（Loving-kindness）",
        p_lovingkindness_desc: "柔軟情緒、緩和瞋心、提升幸福感。",
        
        p_bodyscan: "身體掃描（Body Scan）",
        p_bodyscan_desc: "減少緊繃、提升覺知，非常適合初學者。",
        
        p_light: "光明觀（Light Visualization）",
        p_light_desc: "適合信柔型與感性行人，能快速安定心念。",
        
        p_shortchant: "短咒誦／念佛（Non-sectarian）",
        p_shortchant_desc: "柔軟心、安定心，是信行人的快速入門法。",
        
        // final labels
        final_label: "你的入門修行建議：",
    },

    en: {
        result_title: "Meditation Personality Profile",
        type_label: "Practitioner Type",
        habit_label: "Disposition Pattern",
        practice_label: "Recommended Entry Practices",

        type_faith: "Faith-Inclined Practitioner",
        type_dharma: "Dharma-Inclined Practitioner",

        type_faith_desc: "You rely on trust, emotional openness, and intention to enter practice. Compassion- and visualization-based methods suit you well.",
        type_dharma_desc: "You progress through understanding, clarity, and insight. Breath awareness and mindfulness practices are ideal.",

        habit_greed: "Greed-Type",
        habit_aversion: "Aversion-Type",
        habit_delusion: "Delusion-Type",
        habit_faithSoft: "Faith-Soft",
        habit_insightAnalytic: "Insight-Analytical",

        habit_desc_greed: "You seek comfort and pleasant states. Body awareness and breath grounding help balance the mind.",
        habit_desc_aversion: "You react quickly or hold tension. Loving-kindness and relaxation practices support you.",
        habit_desc_delusion: "Your attention scatters easily. Walking meditation and steady breathing keep you grounded.",
        habit_desc_faithSoft: "You are intuitive and sensitive. Light visualization and compassion practices suit you.",
        habit_desc_insightAnalytic: "You analyze well and observe patterns. Insight and mindfulness practices match your mind.",

        p_walk: "Walking Meditation",
        p_walk_desc: "Movement anchors awareness gently, ideal for scattered or tense minds.",

        p_breath: "Breath Meditation",
        p_breath_desc: "A foundational practice for stability, clarity, and grounding.",

        p_lovingkindness: "Loving-kindness Meditation",
        p_lovingkindness_desc: "Softens emotional reactivity and cultivates warmth.",

        p_bodyscan: "Body Scan",
        p_bodyscan_desc: "Reduces tension and increases embodied awareness.",

        p_light: "Light Visualization",
        p_light_desc: "Ideal for intuitive practitioners; quickly stabilizes and uplifts the mind.",

        p_shortchant: "Short Chants / Non-sectarian recitation",
        p_shortchant_desc: "Useful for quick emotional grounding and softening.",
        
        final_label: "Recommended practices:",
    }
};


// ============================================================
// Mapping Engine — Main Entry Function
// ============================================================

function generateProfile() {
    const form = document.getElementById("questionnaireForm");

    const Q = {};
    for (let i = 1; i <= 10; i++) {
        Q[i] = parseInt(form[`Q${i}`].value || "3"); // default midpoint
    }
    const Bonus = parseInt(form["Q11"]?.value || "3");

    // --------------------------------------------------------
    // 1. 行人類型計算
    // --------------------------------------------------------
    const faithScore = Q[4] + (Q[1] * 0.5) + (Q[10] * 0.5);
    const dharmaScore = Q[3] + (Q[2] * 0.5) + (Q[5] * 0.3);

    const practitionerType =
        faithScore > dharmaScore ? "faith" : "dharma";

    // --------------------------------------------------------
    // 2. 習性計算（五類取前二）
    // --------------------------------------------------------

    const dispositions = {
        greed: Q[7],
        aversion: Q[8],
        delusion: Q[9],
        faithSoft: Q[4] + Q[10],
        insightAnalytic: Q[3] + Q[1],
    };

    const sortedHabits = Object.entries(dispositions)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([k]) => k);

    // --------------------------------------------------------
    // 3. 入門修行建議 Algorithm
    // --------------------------------------------------------

    const recommendations = [];

    // Layer 1: Practitioner type
    if (practitionerType === "faith") {
        recommendations.push("p_lovingkindness");
        recommendations.push("p_light");
    } else {
        recommendations.push("p_breath");
        recommendations.push("p_walk");
    }

    // Layer 2: Habit-based
    if (sortedHabits.includes("aversion"))
        recommendations.push("p_lovingkindness");

    if (sortedHabits.includes("delusion"))
        recommendations.push("p_walk");

    if (sortedHabits.includes("greed"))
        recommendations.push("p_bodyscan");

    if (sortedHabits.includes("insightAnalytic"))
        recommendations.push("p_breath");

    if (sortedHabits.includes("faithSoft"))
        recommendations.push("p_light");

    // Deduplicate
    const finalRecs = [...new Set(recommendations)].slice(0, 3);

    // --------------------------------------------------------
    // Render output
    // --------------------------------------------------------

    const t = i18nText[currentLang];

    const output = `
        <h2>${t.result_title}</h2>

        <h3>${t.type_label}</h3>
        <p><strong>${t["type_" + practitionerType]}</strong></p>
        <p>${t["type_" + practitionerType + "_desc"]}</p>

        <h3>${t.habit_label}</h3>
        <p><strong>${sortedHabits.map(h => t["habit_" + h]).join(" ＋ ")}</strong></p>
        <p>${sortedHabits.map(h => t["habit_desc_" + h]).join(" ")}</p>

        <h3>${t.practice_label}</h3>
        ${finalRecs.map(key => `
            <p><strong>${t[key]}</strong><br>${t[key + "_desc"]}</p>
        `).join("")}
    `;

    document.getElementById("result").innerHTML = output;
}


// ============================================================
// Language Switcher
// ============================================================

function switchLang(lang) {
    currentLang = lang;
    document.body.setAttribute("data-lang", lang);
    const result = document.getElementById("result");
    if (result.innerHTML.trim().length > 0) {
        generateProfile();
    }
}
