/* 德奧旅行行程網站｜共用渲染
   每個頁面在 <body> 上宣告 data-page（與 data-day），本檔依此決定要畫什麼。
   資料全部來自 assets/data.js，本檔不含任何行程內容。 */

const PAGE = document.body.dataset.page;
const DAYN = +document.body.dataset.day || 0;

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const md  = s => esc(s).replace(/\*\*(.+?)\*\*/g, "<em>$1</em>");
const el  = id => document.getElementById(id);

/* ── 導覽 ───────────────────────────────────────────── */

const NAV = [
  ["index.html",  "總覽",     "index"],
  ["flights.html","航班",     "flights"],
  ["stays.html",  "住宿",     "stays"],
  ["day1.html",   "逐日行程", "day"],
  ["food.html",   "特色菜",   "food"],
  ["weather.html","天氣",     "weather"],
];

const DAY_SHORT = ["慕尼黑","新天鵝堡","楚格峰","因斯布魯克","薩爾斯堡","國王湖","哈修塔特","基姆湖","返程"];

el("nav").innerHTML = NAV.map(([href,label,key]) =>
  `<a href="${href}"${key === PAGE ? ' class="on" aria-current="page"' : ""}>${label}</a>`).join("");

const rail = el("rail");
if (rail && PAGE === "day") {
  rail.innerHTML = DAYS.map((d,i) =>
    `<a href="day${d.n}.html"${d.n === DAYN ? ' class="on" aria-current="page"' : ""}>` +
    `<b>${String(d.n).padStart(2,"0")}</b><span>${esc(DAY_SHORT[i])}</span></a>`).join("");
  rail.classList.add("show");
  // 目前這天捲進側邊選單可視範圍（窄螢幕的底部橫列）
  const on = rail.querySelector("a.on");
  if (on && rail.scrollWidth > rail.clientWidth)
    rail.scrollLeft = on.offsetLeft - (rail.clientWidth - on.offsetWidth) / 2;
}

/* ── 天氣共用：概況判定、圖示、量條 ───────────────────── */

function cond(c, p){
  if (p >= 50) return c >= 70 ? ["陰，易有雨","rain"] : ["時晴時雨","rain"];
  if (p >= 34) return c >= 65 ? ["多雲，短暫雨","shower"] : ["多雲偶陣雨","shower"];
  if (c < 30)  return ["晴","sun"];
  if (c < 55)  return ["晴時多雲","part"];
  if (c < 75)  return ["多雲","cloud"];
  return ["陰","cloud"];
}
const ICON = {
  sun:`<circle cx="12" cy="12" r="4.4"/><g stroke-linecap="round"><path d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6"/></g>`,
  part:`<circle cx="8.6" cy="8.4" r="3.4"/><g stroke-linecap="round"><path d="M8.6 1.9v1.7M2.1 8.4h1.7M4 3.8l1.2 1.2M13.2 3.8L12 5"/></g><path d="M7.4 19.6h9.3a3.4 3.4 0 0 0 .4-6.8 4.7 4.7 0 0 0-9-1.1 3.5 3.5 0 0 0-.7 7z"/>`,
  cloud:`<path d="M7.2 19.3h9.9a3.6 3.6 0 0 0 .4-7.2 5 5 0 0 0-9.6-1.2 3.7 3.7 0 0 0-.7 8.4z"/>`,
  shower:`<path d="M7.4 15.4h9.5a3.5 3.5 0 0 0 .4-6.9 4.8 4.8 0 0 0-9.2-1.2 3.6 3.6 0 0 0-.7 8.1z"/><g stroke-linecap="round"><path d="M9.2 18.4l-.9 2.4M13 18.4l-.9 2.4M16.8 18.4l-.9 2.4"/></g>`,
  rain:`<path d="M7.4 14.6h9.5a3.5 3.5 0 0 0 .4-6.9 4.8 4.8 0 0 0-9.2-1.2 3.6 3.6 0 0 0-.7 8.1z"/><g stroke-linecap="round"><path d="M8.6 17.2l-1.3 4M12.4 17.2l-1.3 4M16.2 17.2l-1.3 4"/></g>`,
};
const icon  = k  => `<svg class="wicon ${k}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${ICON[k]}</svg>`;
const bar   = p  => `<span class="bar"><i style="width:${p*0.6}px"></i><span>${p}%</span></span>`;
const mmBar = mm => `<span class="bar"><i class="rainmm" style="width:${Math.min(mm,6)*11}px"></i><span>${mm} mm</span></span>`;

/* 哪幾筆天氣資料屬於哪一天（Day 3 同時有山谷與峰頂兩筆） */
const WX_BY_DAY = { 1:[0], 2:[1], 3:[2,3], 4:[4], 5:[5], 6:[6], 7:[7], 8:[8], 9:[9] };

function dayWeather(n){
  const idx = WX_BY_DAY[n] || [];
  if (!idx.length) return "";
  return `<div class="daywx">` + idx.map(i => {
    const w = WX[i], [label,kind] = cond(w.dt.c, w.dt.p);
    return `<div class="daywx-row">
      <span class="wxcond ${kind}">${icon(kind)}<span>${esc(label)}</span></span>
      ${idx.length > 1 ? `<span class="daywx-place">${esc(w.place)}</span>` : ""}
      <span class="daywx-n"><b>${w.dt.a}°</b> 白天均溫</span>
      <span class="daywx-n"><b>${w.dt.h}°</b> 日間最高</span>
      <span class="daywx-n"><b>${w.dt.p}%</b> 降雨機率</span>
      <span class="daywx-n"><b>${w.dt.mm} mm</b> 平均雨量</span>
    </div>`;
  }).join("") + `</div>`;
}

/* ── 逐日行程 ───────────────────────────────────────── */

function timeline(rows){
  return `<ul class="tl">` + rows.map(([t,cat,place,note,fx]) => `
    <li class="${fx?"fx":""}">
      <div class="t">${esc(t)}</div><div class="m"></div>
      <div class="c">
        <div class="p"><span class="cat">${esc(cat)}</span>${esc(place)}</div>
        ${note && note !== "—" ? `<div class="n">${md(note)}</div>` : ""}
      </div>
    </li>`).join("") + `</ul>`;
}

function dayArticle(d){
  const blocks = d.blocks.map(b => {
    if (b.tabs) {
      const g = `d${d.n}`;
      const btns = b.tabs.map((p,i) =>
        `<button role="tab" aria-selected="${i===0}" data-g="${g}" data-i="${i}">${esc(p.label)}</button>`).join("");
      const panels = b.tabs.map((p,i) =>
        `<div class="panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>
           ${p.cond ? `<p class="cond">${esc(p.cond)}</p>` : ""}
           ${timeline(p.rows)}
         </div>`).join("");
      return `<div class="tabs" role="tablist">${btns}</div>${panels}`;
    }
    return (b.title ? `<div class="block-title">${esc(b.title)}</div>` : "") + timeline(b.rows);
  }).join("");

  const notes = d.notes && d.notes.length
    ? `<ul class="notes">${d.notes.map(([l,t]) =>
        `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("")}</ul>` : "";

  return `<article class="day glass rv">
    <div class="day-head">
      <span class="day-n">DAY ${d.n}</span>
      <span class="day-date">${esc(d.date)}</span>
      ${d.km ? `<span class="km">${esc(d.km)}</span>` : ""}
    </div>
    <h1 class="day-title">${esc(d.title)}</h1>
    <div class="day-meta">${d.meta.map(m => `<span>${esc(m)}</span>`).join("")}</div>
    ${dayWeather(d.n)}
    <p class="legend"><i></i> 發光標記為不可調動的固定時間：班機、導覽、船班、固定入住與還車</p>
    ${blocks}${notes}
  </article>`;
}

/* ── 各頁渲染 ───────────────────────────────────────── */

if (PAGE === "index") {
  el("facts").innerHTML = FACTS.map(([k,v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
  el("journey").innerHTML = JOURNEY.map(([c,n]) =>
    `<div class="stop"><div class="city">${esc(c)}</div><div class="nights">${esc(n)}</div></div>`).join("");
  el("daylinks").innerHTML = DAYS.map((d,i) => `
    <a class="dcard glass rv" href="day${d.n}.html">
      <span class="day-n">DAY ${d.n}</span>
      <span class="dcard-date">${esc(d.date)}</span>
      <span class="dcard-title">${esc(d.title)}</span>
      <span class="dcard-sub">${esc(DAY_SHORT[i])}${d.km ? "　·　" + esc(d.km) : ""}</span>
    </a>`).join("");
}

if (PAGE === "day") {
  const d = DAYS.find(x => x.n === DAYN);
  el("dayroot").innerHTML = dayArticle(d);
  /* 左右側點擊區翻頁 */
  const chev = dir => `<span class="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="${dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}"/></svg></span>`;
  const zone = (d, dir) => d ? `<a class="edge ${dir}" href="day${d.n}.html"
      aria-label="${dir === "prev" ? "上一天" : "下一天"}：Day ${d.n} ${esc(d.title)}"
      aria-keyshortcuts="${dir === "prev" ? "ArrowLeft" : "ArrowRight"}">
      <span class="edge-label">Day ${d.n}<b>${esc(d.title)}</b></span>${chev(dir)}</a>` : "";
  el("edges").innerHTML =
    zone(DAYS.find(x => x.n === DAYN - 1), "prev") +
    zone(DAYS.find(x => x.n === DAYN + 1), "next");
}

if (PAGE === "flights") {
  el("flightlist").innerHTML = FLIGHTS.map(g => `
    <div class="fgroup rv">
      <div class="grouplabel">${esc(g.label)}</div>
      ${g.legs.map(l => `
        <div class="leg glass">
          <div>
            <div class="code">${esc(l.code)}　${esc(l.date)}</div>
            <div class="path">${esc(l.path)}</div>
            <div class="time">${esc(l.time)}</div>
          </div>
          <div class="side">${l.side.map(s => esc(s)).join("<br>")}</div>
        </div>`).join("")}
    </div>`).join("");
}

if (PAGE === "stays") {
  el("staylist").innerHTML = STAYS.map(s => `
    <div class="card glass rv">
      <div class="meta">${esc(s.city)}　${esc(s.date)}　${s.nights} 晚</div>
      <h3 class="cardtitle">${esc(s.name)}</h3>
      <dl class="kv">
        <dt>地址</dt><dd>${esc(s.addr)}</dd>
        <dt>房型</dt><dd>${esc(s.room)}</dd>
        <dt>入住</dt><dd>${esc(s.inn)}</dd>
        <dt>退房</dt><dd>${esc(s.out)}</dd>
        ${s.note ? `<dt>備註</dt><dd>${esc(s.note)}</dd>` : ""}
      </dl>
    </div>`).join("");
}

if (PAGE === "food") {
  el("foodlist").innerHTML = FOOD.map(f => `
    <details class="glass rv">
      <summary><span class="s-t">${esc(f.region)}</span><span class="s-d">${esc(f.days)}</span></summary>
      <div class="dbody">
        ${f.items.length ? `<table>${f.items.map(([a,b]) =>
          `<tr><td style="width:44%"><strong>${esc(a)}</strong></td><td>${esc(b)}</td></tr>`).join("")}</table>` : ""}
        ${f.text ? `<p style="font-size:13px;color:var(--ink2);margin:${f.items.length?"16px":"0"} 0 0">${esc(f.text)}</p>` : ""}
      </div>
    </details>`).join("");
  el("foodnote").innerHTML = `<p><b>共通提醒</b></p>` + FOODNOTE.map(t => `<p>${esc(t)}</p>`).join("");
}

if (PAGE === "weather") {
  el("wxwarn").innerHTML = `
    <p><b>這不是預報，是氣候統計。</b>DWD 與 GeoSphere 的官方逐日預報最遠只到 10 天，撰寫日 2026/09/19 還涵蓋不到行程日期。</p>
    <p>數值取自 ECMWF ERA5 再分析（溫度、降水、雲量），2016–2025 共 10 年、每個目標日期 ±2 天的實際觀測值，每格 50 個「年×日」樣本。
       <b>所有主要數值都只取白天 06–18</b>；降雨機率＝該時段累積降水 ≥0.2 mm 的樣本比例。</p>
    <p>可取得官方預報的時間：09/25 起涵蓋 Day 1、09/28 起涵蓋至 Day 4、10/01 起涵蓋至 Day 7、<b>10/03 起完整涵蓋至 Day 9</b>。</p>`;

  el("wxtable").innerHTML = `
    <thead><tr>
      <th>日程</th><th>地點</th><th>概況</th>
      <th class="num">白天均溫</th><th class="num">日間最高</th>
      <th class="num">雲量</th><th class="num">降雨機率</th><th class="num">平均雨量</th>
    </tr></thead>
    <tbody>${WX.map((w,i) => {
      const [label,kind] = cond(w.dt.c, w.dt.p);
      const n = +w.day.match(/Day (\d)/)[1];
      return `<tr>
        <td style="white-space:nowrap"><a class="daylink" href="day${n}.html">${esc(w.day)}</a></td>
        <td style="white-space:nowrap">${esc(w.place)}</td>
        <td><span class="wxcond ${kind}">${icon(kind)}<span>${esc(label)}</span></span></td>
        <td class="num strong">${w.dt.a}°</td><td class="num">${w.dt.h}°</td>
        <td class="num">${w.dt.c}%</td><td class="num">${bar(w.dt.p)}</td>
        <td class="num">${mmBar(w.dt.mm)}</td>
      </tr>`;
    }).join("")}</tbody>`;

  const PERIODS = [
    ["morn","上午 06–12",1],["noon","下午 12–18",1],
    ["dawn","清晨 00–06",0],["night","夜間 18–24",0],
  ];
  el("wxdaily").innerHTML = WX.map(w => {
    const [label] = cond(w.dt.c, w.dt.p);
    return `<details class="glass rv">
      <summary>
        <span class="s-t">${esc(w.day)}｜${esc(w.place)}</span>
        <span class="s-d">${esc(label)}　${w.dt.a}° / ${w.dt.h}°　雨 ${w.dt.p}%</span>
      </summary>
      <div class="dbody"><div class="scroll"><table>
        <thead><tr><th>時段</th><th class="num">均溫</th><th class="num">歷年區間</th>
          <th class="num">雲量</th><th class="num">雨機率</th><th class="num">平均雨量</th></tr></thead>
        <tbody>${PERIODS.map(([k,name,day]) => { const s = w.p[k]; return `
          <tr class="${day?"":"dim"}"><td>${esc(name)}${day?"":' <span class="tag">夜</span>'}</td>
            <td class="num">${s.a} °C</td><td class="num">${s.lo} – ${s.hi} °C</td>
            <td class="num">${s.c}%</td><td class="num">${s.p}%</td><td class="num">${s.mm} mm</td></tr>`;
        }).join("")}</tbody>
      </table></div></div>
    </details>`;
  }).join("");

  el("wxnotes").innerHTML = `<ul class="notes">${WX_NOTES.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${esc(t)}</li>`).join("")}</ul>`;
}

/* ── 互動 ───────────────────────────────────────────── */

/* A/B/C 方案頁籤 */
document.addEventListener("click", e => {
  const b = e.target.closest(".tabs button");
  if (!b) return;
  const g = b.dataset.g, i = b.dataset.i;
  document.querySelectorAll(`.tabs button[data-g="${g}"]`)
    .forEach(x => x.setAttribute("aria-selected", x.dataset.i === i));
  document.querySelectorAll(`.panel[data-g="${g}"]`)
    .forEach(x => x.hidden = x.dataset.i !== i);
});

/* 進場動畫 */
const rvio = new IntersectionObserver((es,o) => {
  es.forEach(e => { if (e.isIntersecting) { e.target.classList.add("in"); o.unobserve(e.target); } });
}, { rootMargin:"0px 0px -8% 0px" });
document.querySelectorAll(".rv").forEach(n => rvio.observe(n));

/* 日頁：左右方向鍵翻頁 */
if (PAGE === "day") {
  addEventListener("keydown", e => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
    if (e.key === "ArrowLeft"  && DAYN > 1) location.href = `day${DAYN-1}.html`;
    if (e.key === "ArrowRight" && DAYN < DAYS.length) location.href = `day${DAYN+1}.html`;
  });
}
