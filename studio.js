const byId = (id) => document.getElementById(id);
const pad = (number) => String(number).padStart(2, "0");
const fontFamily = '"Pretendard", "Noto Sans KR", "Malgun Gothic", "Apple SD Gothic Neo", sans-serif';

const themes = {
  violet: { name: "바이올렛", bg: "#291954", edge: "#442781", ink: "#fff9ff", soft: "#ded0ff", accent: "#d1ff92", orbit: "#a986ff", paper: "#eee5ff", paperInk: "#2d1b59" },
  green: { name: "그린", bg: "#123e32", edge: "#276047", ink: "#f5ffef", soft: "#d0efd6", accent: "#edff9e", orbit: "#7fd9aa", paper: "#e3f4e4", paperInk: "#123e32" },
  peach: { name: "피치", bg: "#572731", edge: "#8e3f49", ink: "#fff7f0", soft: "#ffe0d4", accent: "#ffdb9a", orbit: "#ffa3a2", paper: "#ffebe1", paperInk: "#572731" },
};

const collections = [
  {
    match: /습관|루틴/,
    cover: "무리하지 않고 꾸준히 이어가는 작은 실천",
    tips: [
      ["작을수록 시작하기 쉬워요", "매일 30분 운동이 부담된다면 스트레칭 한 동작부터 해보세요. 쉽게 시작할 수 있어야 내일도 이어갈 수 있어요."],
      ["이미 하는 일에 붙여 보세요", "양치 직후 물 한 잔처럼, 이미 매일 하는 행동 뒤에 새 습관을 이어 붙여 보세요."],
      ["눈에 보이게 준비하세요", "책을 읽고 싶다면 전날 책상 위에 펼쳐 두세요. 시작 전에 해야 할 일이 줄어들면 행동하기 쉬워져요."],
      ["완벽보다 다시 시작하기", "하루를 건너뛰었다면 다음 날 가장 작은 행동부터 이어가세요. 한 번 빠진 날까지 만회할 필요는 없어요."],
      ["일주일만 가볍게 기록하세요", "실천한 날 달력에 표시해 보세요. 일주일 뒤 자주 놓쳤던 시간대를 찾아 습관의 자리나 시간을 바꿔 보세요."],
    ],
    action: "지금 하는 일 하나와 그 뒤에 붙일 작은 행동 하나를 골라 보세요.",
  },
  {
    match: /커피|핸드드립|에스프레소|원두/,
    cover: "원두 고르기부터 내 취향 찾기까지",
    tips: [
      ["좋아하는 향부터 고르세요", "과일처럼 밝은 향이 좋은지, 견과류나 초콜릿 같은 고소한 향이 좋은지 생각해 보세요. 원두 포장의 향미 설명이 출발점이에요."],
      ["도구에 맞게 갈아 보세요", "핸드드립용이라면 원두를 살 때 추출 방법을 알려주고 그에 맞는 분쇄도를 요청해 보세요."],
      ["물과 원두의 양을 기록하세요", "한 잔을 내릴 때 쓴 원두와 물의 양을 적어두면 마음에 들었던 맛을 다시 내기 쉬워요."],
      ["한 번에 하나만 바꿔 보세요", "같은 원두로 두 잔을 만들면서 물의 양이나 분쇄도 중 하나만 바꿔 보세요. 어떤 차이가 느껴지는지 비교하기 쉬워요."],
      ["온도가 내려간 뒤에도 맛보세요", "처음 한 모금과 조금 식은 뒤의 맛을 비교해 보세요. 내가 좋아하는 향을 짧게 기록하면 다음 원두를 고를 때 도움이 돼요."],
    ],
    action: "다음 한 잔에서 가장 마음에 든 향을 단어 하나로 남겨 보세요.",
  },
  {
    match: /제로.?웨이스트|쓰레기 줄이기|일회용|다회용/,
    cover: "일상에서 버리는 물건을 하나씩 줄이는 방법",
    tips: [
      ["자주 버리는 것부터 살펴보세요", "하루 동안 어떤 쓰레기가 많이 생기는지 살펴보세요. 배달 용기나 일회용 컵처럼 반복해서 나오는 물건부터 줄여 보세요."],
      ["이미 가진 물건을 꺼내 쓰세요", "새로 사기 전에 집에 있는 텀블러, 장바구니, 보관 용기를 찾아보세요. 자주 쓰는 가방에 넣어두면 챙기기 쉬워요."],
      ["먹을 만큼만 사는 연습", "장보기 전 냉장고에 남은 식재료를 확인하고 며칠 안에 먹을 것만 목록에 적어 보세요."],
      ["버리기 전에 다른 용도를 찾아보세요", "멀쩡한 유리병은 건조 식재료를 담는 용기로, 상자는 서랍 정리함으로 써 보세요."],
      ["내 생활에 맞게 반복하세요", "일주일 동안 지속하기 편했던 방법을 하나 골라 다음 주에도 반복하세요."],
    ],
    action: "이번 주에 가장 자주 버리는 일회용품 하나를 줄여 보세요.",
  },
];

function makeDeck(topic, count, tone, points = []) {
  const matches = collections.filter((entry) => entry.match.test(topic));
  const collection = matches.length === 1 ? matches[0] : null;
  const guide = collection?.tips ?? [
    ["먼저 궁금한 점 하나를 고르세요", `‘${topic}’에서 지금 가장 알고 싶은 것을 질문으로 적어 보세요. 답을 찾을 범위가 분명해져요.`],
    ["일상에서 예시를 찾아보세요", `‘${topic}’이 내 생활과 만나는 순간이 있는지 떠올려 보세요. 실제로 겪은 상황 하나를 적으면 주제를 더 구체적으로 볼 수 있어요.`],
    ["지금 할 수 있는 한 가지", "첫 시도는 준비가 적게 드는 행동으로 골라 보세요. 언제, 어디서, 무엇을 할지 한 문장으로 적어두면 시작하기 쉬워요."],
    ["다른 사례와 비교해 보세요", "이미 해본 사람의 사례를 하나 찾아 내 상황과 비교해 보세요. 그대로 적용할 수 있는 부분과 조정할 부분을 나눠 보세요."],
    ["해본 뒤에 한 줄로 기록하세요", "무엇을 했고 어떤 점이 달라졌는지 적어 보세요. 다음에 이어갈 행동은 그 기록에서 하나만 골라 보세요."],
  ];
  const middleCount = count - 2;
  const custom = points.slice(0, middleCount).map((point, index) => [`핵심 포인트 ${pad(index + 1)}`, point]);
  const tips = [...custom, ...guide].slice(0, middleCount);
  const cover = collection?.cover ?? "핵심을 정리하고 일상에 적용하는 방법";
  const action = collection?.action ?? `‘${topic}’에 대해 오늘 할 수 있는 행동을 하나 정해 보세요.`;
  const endTitle = { friendly: "오늘 하나만 시작해 볼까요?", informative: "핵심을 실천으로 옮기기", punchy: "오늘, 하나부터." }[tone];
  const bodyFor = (body) => {
    if (tone === "punchy") return body.match(/^[\s\S]+?(?:[.!?](?=\s|$)|$)/)?.[0] ?? body;
    if (tone === "informative") return body.replace(/해보세요|해 보세요/g, "해 봅니다").replace(/보세요/g, "봅니다").replace(/있어요/g, "있습니다").replace(/쉬워요/g, "쉽습니다").replace(/돼요/g, "됩니다").replace(/필요는 없어요/g, "필요는 없습니다").replace(/분명해져요/g, "분명해집니다");
    return body;
  };
  return [
    { title: topic, body: cover, label: "QUICK GUIDE" },
    ...tips.map(([title, body], index) => ({
      title: index < custom.length ? title : bodyFor(title),
      body: index < custom.length ? body : bodyFor(body),
      label: `POINT ${pad(index + 1)}`,
    })),
    { title: endTitle, body: bodyFor(action), label: "TAKE ACTION" },
  ];
}

const sampleTopic = "하루를 바꾸는\n작은 습관";
let deck = makeDeck(sampleTopic, 5, "friendly");
let deckName = "하루를 바꾸는 작은 습관";
let active = 0;
let themeKey = "violet";
let toastTimer;

function showStatus(message) {
  byId("status").textContent = message;
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => { byId("status").textContent = ""; }, 3200);
}

function wrapText(ctx, text, maxWidth) {
  return text.split(/\n+/).flatMap((paragraph) => {
    const lines = [];
    let line = "";
    for (const word of paragraph.trim().split(/\s+/)) {
      const proposed = line ? `${line} ${word}` : word;
      if (line && ctx.measureText(proposed).width > maxWidth) {
        lines.push(line);
        line = "";
      }
      if (ctx.measureText(word).width > maxWidth) {
        for (const character of word) {
          if (line && ctx.measureText(line + character).width > maxWidth) {
            lines.push(line);
            line = "";
          }
          line += character;
        }
      } else {
        line = line ? `${line} ${word}` : word;
      }
    }
    lines.push(line);
    return lines;
  });
}

function textBlock(ctx, text, x, y, options) {
  const { maxWidth, maxHeight, weight, color } = options;
  let size = options.size;
  let lines = [];
  for (; size >= 8; size -= 2) {
    ctx.font = `${weight} ${size}px ${fontFamily}`;
    lines = wrapText(ctx, text, maxWidth);
    if (lines.length * size * 1.25 <= maxHeight) break;
  }
  lines = lines.slice(0, Math.floor(maxHeight / (size * 1.25)));
  ctx.fillStyle = color;
  lines.forEach((line, index) => ctx.fillText(line, x, y + index * size * 1.25, maxWidth));
  return y + lines.length * size * 1.25;
}

function star(ctx, x, y, radius) {
  ctx.beginPath();
  ctx.moveTo(x, y - radius);
  ctx.quadraticCurveTo(x + radius * .15, y - radius * .15, x + radius, y);
  ctx.quadraticCurveTo(x + radius * .15, y + radius * .15, x, y + radius);
  ctx.quadraticCurveTo(x - radius * .15, y + radius * .15, x - radius, y);
  ctx.quadraticCurveTo(x - radius * .15, y - radius * .15, x, y - radius);
  ctx.fill();
}

function drawCard(canvas, card, index, total, key) {
  const ctx = canvas.getContext("2d");
  const theme = themes[key];
  const cover = index === 0;
  const dark = cover || index === total - 1;
  const ink = dark ? theme.ink : theme.paperInk;
  const soft = dark ? theme.soft : theme.paperInk;
  const accent = dark ? theme.accent : theme.paperInk;
  ctx.setTransform(canvas.width / 1080, 0, 0, canvas.height / 1080, 0, 0);
  ctx.textBaseline = "top";
  const background = ctx.createLinearGradient(0, 1080, 1080, 0);
  background.addColorStop(0, dark ? theme.bg : theme.paper);
  background.addColorStop(1, dark ? theme.edge : "#fffdfa");
  ctx.fillStyle = background;
  ctx.fillRect(0, 0, 1080, 1080);

  ctx.strokeStyle = dark ? theme.soft : theme.orbit;
  ctx.globalAlpha = dark ? .23 : .5;
  ctx.lineWidth = 2;
  ctx.strokeRect(49, 49, 982, 982);
  ctx.globalAlpha = 1;
  ctx.font = "750 22px system-ui, sans-serif";
  ctx.fillStyle = soft;
  ctx.fillText("SLIDEMAKER   /   CAROUSEL STUDIO", 86, 87);
  ctx.font = "650 22px system-ui, sans-serif";
  ctx.fillText(`${pad(index + 1)} / ${pad(total)}`, 893, 87);

  ctx.save();
  ctx.translate(cover ? 769 : 849, cover ? 765 : 791);
  ctx.strokeStyle = theme.orbit;
  ctx.lineWidth = cover ? 3 : 2;
  ctx.globalAlpha = cover ? .9 : .52;
  for (const angle of [-.66, -.22, .22, .66]) {
    ctx.beginPath();
    ctx.ellipse(0, 0, cover ? 235 : 152, cover ? 83 : 51, angle, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.globalAlpha = 1;
  ctx.fillStyle = accent;
  star(ctx, 0, 0, cover ? 58 : 29);
  star(ctx, 142, -133, cover ? 22 : 13);
  star(ctx, -177, 94, cover ? 16 : 10);
  ctx.restore();

  ctx.font = "800 21px system-ui, sans-serif";
  const labelWidth = ctx.measureText(card.label).width + 38;
  ctx.beginPath();
  ctx.roundRect(86, 217, labelWidth, 43, 21);
  ctx.fillStyle = accent;
  ctx.fill();
  ctx.fillStyle = dark ? theme.bg : theme.paper;
  ctx.fillText(card.label, 105, 227);

  const titleEnd = textBlock(ctx, card.title, 84, 295, { maxWidth: 905, maxHeight: cover ? 258 : 224, size: cover ? 112 : 91, weight: 850, color: ink });
  textBlock(ctx, card.body, 89, titleEnd + 15, { maxWidth: cover ? 670 : 765, maxHeight: cover ? 116 : 238, size: cover ? 34 : 40, weight: 550, color: soft });
  ctx.fillStyle = soft;
  ctx.font = "700 20px system-ui, sans-serif";
  ctx.fillText("INSTAGRAM SERIES", 86, 963);
  ctx.strokeStyle = accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(922, 974);
  ctx.lineTo(982, 974);
  ctx.lineTo(970, 962);
  ctx.moveTo(982, 974);
  ctx.lineTo(970, 986);
  ctx.stroke();
}

function render() {
  const current = deck[active];
  const canvas = byId("card");
  drawCard(canvas, current, active, deck.length, themeKey);
  canvas.setAttribute("aria-label", `${active + 1}번 카드. ${current.title}. ${current.body}`);
  byId("position").textContent = `${pad(active + 1)} / ${pad(deck.length)}`;
  byId("prev").disabled = active === 0;
  byId("next").disabled = active === deck.length - 1;
  const thumbs = byId("thumbs");
  while (thumbs.children.length > deck.length) thumbs.lastElementChild.remove();
  deck.forEach((card, index) => {
    let button = thumbs.children[index];
    if (!button) {
      button = document.createElement("button");
      button.type = "button";
      button.className = "thumb";
      const thumb = document.createElement("canvas");
      thumb.width = 96;
      thumb.height = 96;
      thumb.setAttribute("aria-hidden", "true");
      button.append(thumb);
      button.addEventListener("click", () => { active = index; render(); });
      thumbs.append(button);
    }
    button.setAttribute("aria-label", `${index + 1}번 카드: ${card.title}`);
    button.setAttribute("aria-current", String(index === active));
    drawCard(button.firstElementChild, card, index, deck.length, themeKey);
  });
}

for (const [key, theme] of Object.entries(themes)) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = "theme";
  button.setAttribute("aria-pressed", String(key === themeKey));
  button.style.setProperty("--swatch", theme.bg);
  button.style.setProperty("--swatch-line", theme.orbit);
  button.innerHTML = `<span class="swatch"></span><span class="swatch-check"><svg><use href="#check"/></svg></span><span class="theme-name">${theme.name}</span>`;
  button.addEventListener("click", () => {
    byId("themes").querySelector('[aria-pressed="true"]').setAttribute("aria-pressed", "false");
    button.setAttribute("aria-pressed", "true");
    themeKey = key;
    render();
  });
  byId("themes").append(button);
}

const topicInput = byId("topic");
const countTopic = () => {
  topicInput.setCustomValidity("");
  byId("topic-count").textContent = `${topicInput.value.length} / 80`;
};
topicInput.addEventListener("input", countTopic);
document.querySelectorAll("[data-topic]").forEach((button) => button.addEventListener("click", () => {
  topicInput.value = button.dataset.topic;
  countTopic();
  topicInput.focus();
}));

byId("create-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const topic = topicInput.value.trim().replace(/\s+/g, " ");
  if (!topic) {
    topicInput.setCustomValidity("카드뉴스 주제를 입력해 주세요.");
    topicInput.reportValidity();
    return;
  }
  const count = Number(byId("quantity").value);
  const points = byId("points").value.split("\n").map((line) => line.trim()).filter(Boolean);
  if (points.length > count - 2 || points.some((point) => point.length > 250)) {
    showStatus(`핵심 내용은 ${count - 2}줄까지, 한 줄에 250자 이내로 입력해 주세요.`);
    byId("points").focus();
    return;
  }
  deck = makeDeck(topic, count, byId("tone").value, points);
  deckName = topic;
  active = 0;
  byId("preview-description").textContent = "카드를 넘겨 보고 문구를 편집하세요.";
  render();
  showStatus(`카드뉴스 ${count}장을 만들었어요.`);
  if (matchMedia("(max-width: 820px)").matches) {
    byId("preview-title").scrollIntoView({ block: "start" });
  }
});

byId("prev").addEventListener("click", () => { active -= 1; render(); });
byId("next").addEventListener("click", () => { active += 1; render(); });
const editor = byId("editor");
byId("edit-card").addEventListener("click", () => {
  byId("edit-title").value = deck[active].title;
  byId("edit-title").setCustomValidity("");
  byId("edit-body").value = deck[active].body;
  editor.showModal();
});
byId("edit-title").addEventListener("input", () => byId("edit-title").setCustomValidity(""));
byId("close-editor").addEventListener("click", () => editor.close());
byId("cancel-editor").addEventListener("click", () => editor.close());
byId("edit-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = byId("edit-title").value.trim();
  if (!title) {
    byId("edit-title").setCustomValidity("카드 제목을 입력해 주세요.");
    byId("edit-title").reportValidity();
    return;
  }
  deck[active] = { ...deck[active], title, body: byId("edit-body").value.trim() };
  editor.close();
  render();
  showStatus("카드 문구를 수정했어요.");
});

const png = (canvas) => new Promise((resolve, reject) => {
  canvas.toBlob((blob) => blob ? resolve(blob) : reject(new Error("PNG 생성 실패")), "image/png");
});

function download(blob, fileName) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}

function safeName(name) {
  return name.replace(/[^\p{L}\p{N}\s_-]/gu, "").trim().replace(/\s+/g, "-").slice(0, 40) || "cardnews";
}

const crcTable = Uint32Array.from({ length: 256 }, (_, index) => {
  let crc = index;
  for (let bit = 0; bit < 8; bit += 1) crc = (crc >>> 1) ^ ((crc & 1) ? 0xedb88320 : 0);
  return crc;
});

function crc32(data) {
  let crc = 0xffffffff;
  for (const byte of data) crc = (crc >>> 8) ^ crcTable[(crc ^ byte) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

// PNG files already use compression, so the ZIP stores their original bytes.
async function makeZip(files) {
  const blocks = [];
  const directory = [];
  const encoder = new TextEncoder();
  let offset = 0;
  let directorySize = 0;
  for (const { name, blob } of files) {
    const filename = encoder.encode(name);
    const bytes = new Uint8Array(await blob.arrayBuffer());
    const crc = crc32(bytes);
    const local = new DataView(new ArrayBuffer(30));
    local.setUint32(0, 0x04034b50, true);
    local.setUint16(4, 20, true);
    local.setUint16(6, 0x800, true);
    local.setUint16(12, 33, true);
    local.setUint32(14, crc, true);
    local.setUint32(18, bytes.length, true);
    local.setUint32(22, bytes.length, true);
    local.setUint16(26, filename.length, true);
    blocks.push(local.buffer, filename, bytes);

    const entry = new DataView(new ArrayBuffer(46));
    entry.setUint32(0, 0x02014b50, true);
    entry.setUint16(4, 20, true);
    entry.setUint16(6, 20, true);
    entry.setUint16(8, 0x800, true);
    entry.setUint16(14, 33, true);
    entry.setUint32(16, crc, true);
    entry.setUint32(20, bytes.length, true);
    entry.setUint32(24, bytes.length, true);
    entry.setUint16(28, filename.length, true);
    entry.setUint32(42, offset, true);
    directory.push(entry.buffer, filename);
    directorySize += entry.byteLength + filename.length;
    offset += local.byteLength + filename.length + bytes.length;
  }
  const end = new DataView(new ArrayBuffer(22));
  end.setUint32(0, 0x06054b50, true);
  end.setUint16(8, files.length, true);
  end.setUint16(10, files.length, true);
  end.setUint32(12, directorySize, true);
  end.setUint32(16, offset, true);
  return new Blob([...blocks, ...directory, end.buffer], { type: "application/zip" });
}

byId("download-card").addEventListener("click", async () => {
  const name = `${safeName(deckName)}-${pad(active + 1)}.png`;
  try {
    download(await png(byId("card")), name);
    showStatus("현재 카드를 PNG로 저장했어요.");
  } catch {
    showStatus("PNG를 만들지 못했어요. 다시 시도해 주세요.");
  }
});

byId("download-all").addEventListener("click", async (event) => {
  const button = event.currentTarget;
  const cards = [...deck];
  const theme = themeKey;
  const name = safeName(deckName);
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = 1080;
  button.disabled = true;
  try {
    const files = [];
    for (const [index, card] of cards.entries()) {
      drawCard(canvas, card, index, cards.length, theme);
      files.push({ name: `${pad(index + 1)}.png`, blob: await png(canvas) });
    }
    download(await makeZip(files), `${name}.zip`);
    showStatus(`카드 ${cards.length}장을 ZIP으로 저장했어요.`);
  } catch {
    showStatus("ZIP을 만들지 못했어요. 다시 시도해 주세요.");
  } finally {
    button.disabled = false;
  }
});

render();
