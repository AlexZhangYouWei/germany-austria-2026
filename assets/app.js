/* 德奧旅行行程網站｜共用渲染
   每個頁面在 <body> 上宣告 data-page（與 data-day），本檔依此決定要畫什麼。
   資料全部來自 assets/data.js，本檔不含任何行程內容。 */

const PAGE = document.body.dataset.page;
const DAYN = +document.body.dataset.day || 0;

const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* 備註支援 **粗體** 與 [文字](https://…)。先 esc 再轉，所以連結文字與網址都已經跳脫過；
   只收 http/https，不接受其他協定。 */
const md  = s => esc(s)
  .replace(/\n/g, "<br>")
  .replace(/\*\*(.+?)\*\*/g, "<em>$1</em>")
  .replace(/\[([^\]]+)\]\((https?:\/\/[^)\s]+)\)/g,
    '<a class="daylink" href="$2" target="_blank" rel="noopener">$1</a>');
const el  = id => document.getElementById(id);

/* ── 導覽 ───────────────────────────────────────────── */

const NAV = [
  ["index.html",  "總覽",     "index"],
  ["stays.html",  "住宿",     "stays"],
  ["day1.html",   "逐日行程", "day"],
  ["food.html",   "特色菜",   "food"],
  ["weather.html","天氣",     "weather"],
  ["checklist.html","準備清單","checklist"],
  ["offices.html","辦事處","offices"],
];

const DAY_SHORT = ["慕尼黑","新天鵝堡","楚格峰","因斯布魯克","薩爾斯堡","國王湖","哈修塔特","基姆湖","返程"];
const DAY_STAY  = ["慕尼黑","米滕瓦爾德","米滕瓦爾德","薩爾斯堡","薩爾斯堡","比紹夫斯維森","哈修塔特","慕尼黑",""];

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

/* 數值分級上色。色階只是輔助，數字本身仍是主要資訊。
   溫度以穿衣感受切段（冰點／厚外套／外套／舒適／溫暖），降雨以「要不要帶傘」切段。
   兩個 class 是為了勝過 td.strong、.bar span 這些既有規則。 */
const tCls = t  => "v " + (t < 0 ? "t0" : t < 6 ? "t1" : t < 10 ? "t2" : t < 13 ? "t3" : t < 16 ? "t4" : "t5");
const pCls = p  => "v " + (p <  30  ? "r0" : p <  50  ? "r1" : "r2");
const mCls = mm => "v " + (mm < 0.5 ? "r0" : mm < 1.5 ? "r1" : "r2");
const cCls = c  => "v " + (c <  30  ? "k0" : c <  70  ? "k1" : "k2");
const mm1  = v  => v.toFixed(1);     /* 1 → 「1.0 mm」，同一欄小數位要一致 */

const bar   = p  => `<span class="bar"><i style="width:${p*0.6}px"></i><span class="${pCls(p)}">${p}%</span></span>`;
const mmBar = mm => `<span class="bar"><i class="rainmm" style="width:${Math.min(mm,6)*11}px"></i><span class="${mCls(mm)}">${mm1(mm)} mm</span></span>`;

/* 與近五年十月基準的比較。w.oct 是 2021–2025 十月整月（每地 155 個白天）的同法統計，
   用來回答「這幾天在十月裡算濕還是乾」。差距小於門檻就標「接近」，不要製造假訊號。 */
function vsOct(now, base, tol){
  const d = +(now - base).toFixed(1);
  if (Math.abs(d) < tol) return { cls:"same", tag:"接近" };
  return d > 0 ? { cls:"wetter", tag:"偏濕" } : { cls:"drier", tag:"偏乾" };
}
const octP  = w => { const v = vsOct(w.dt.p,  w.oct.p,  3);
  return `<span class="base">十月 ${w.oct.p}%<b class="${v.cls}">${v.tag}</b></span>`; };
const octMm = w => { const v = vsOct(w.dt.mm, w.oct.mm, 0.2);
  return `<span class="base">十月 ${mm1(w.oct.mm)} mm<b class="${v.cls}">${v.tag}</b></span>`; };

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
      <span class="daywx-n"><b class="${tCls(w.dt.a)}">${w.dt.a}°</b> 白天均溫</span>
      <span class="daywx-n"><b class="${tCls(w.dt.h)}">${w.dt.h}°</b> 日間最高</span>
      <span class="daywx-n"><b class="${pCls(w.dt.p)}">${w.dt.p}%</b> 降雨機率<em>十月典型 ${w.oct.p}%</em></span>
      <span class="daywx-n"><b class="${mCls(w.dt.mm)}">${mm1(w.dt.mm)} mm</b> 平均雨量<em>十月典型 ${mm1(w.oct.mm)} mm</em></span>
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

  const wx = dayWeather(d.n);

  /* 當日確認：只有需要臨場判斷的日子才有（目前 Day 3）。獨立成塊，不埋在時間軸裡。 */
  const chk = d.check ? `<section class="day glass rv">
    <div class="daybox-t">當日確認<span class="daybox-when">${esc(d.check.when)}</span></div>
    <p class="cfm-lead">${md(d.check.lead)}</p>
    <ol class="cfm">${d.check.items.map(([name,url,why],i) => `
      <li><span class="no">${"①②③④⑤⑥"[i] || i+1}</span>
        <div><a class="daylink" href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>
        <p>${md(why)}</p></div></li>`).join("")}
    </ol>
    ${d.check.foot ? `<p class="cfm-foot">${md(d.check.foot)}</p>` : ""}
  </section>` : "";

  return `<article class="day glass rv">
    <div class="day-head">
      <span class="day-n">DAY ${d.n}</span>
      <span class="day-date">${esc(d.date)}</span>
      ${d.km ? `<span class="km">${esc(d.km)}</span>` : ""}
    </div>
    <h1 class="day-title">${esc(d.title)}</h1>
    <div class="day-meta">${d.meta.map(m => `<span>${esc(m)}</span>`).join("")}</div>
  </article>

  ${wx ? `<section class="day glass rv">
    <div class="daybox-t">天氣概況<a class="daylink" href="weather.html">完整氣候統計</a></div>
    ${wx}
  </section>` : ""}

  ${chk}

  <section class="day glass rv">
    <div class="daybox-t">時辰表</div>
    <p class="legend"><i></i> 發光標記為不可調動的固定時間：班機、導覽、船班、固定入住與還車</p>
    ${blocks}${notes}
  </section>`;
}

/* ── 各頁渲染 ───────────────────────────────────────── */

/* 日卡第四行：當晚住宿地與里程。里程砍掉「／約 3 小時 15 分」這種時間尾巴，
   A／B 方案的里程字串不受影響（分隔字串是「／約」不是「／」）。 */
function dcardSub(d, i){
  const km = d.km ? d.km.split("／約")[0] : "無自駕";
  return [DAY_STAY[i] ? "宿 " + DAY_STAY[i] : "", km].filter(Boolean).join("　·　");
}

if (PAGE === "index") {
  el("facts").innerHTML = FACTS.map(([k,v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("");
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
  /* 路線圖：內嵌 SVG。國界與行車幾何都由 make_map.js 於建置時投影好，執行期不取外部資料。 */
  const SIDE = {
    n:  { dx:0,   dy:-20, a:"middle" },
    s:  { dx:0,   dy:30,  a:"middle" },
    e:  { dx:15,  dy:6,   a:"start"  },
    w:  { dx:-15, dy:6,   a:"end"    },
    sw: { dx:-14, dy:22,  a:"end"    },
  };
  /* 長的先畫、短的後畫，短路線才不會被長路線埋掉 */
  const drawOrder = MAP.routes.slice().sort((x,y) => y.km - x.km);
  const chipDays = [...new Set(MAP.routes.map(r => r.day))].sort((x,y) => x - y);

  el("map").innerHTML = `
  <svg viewBox="0 0 ${MAP.w} ${MAP.h}" class="mapsvg" role="img"
       aria-label="德國與奧地利逐日行車路線圖，依實際道路繪製，每日不同顏色">
    <defs>
      <clipPath id="mclip"><rect x="0" y="0" width="${MAP.w}" height="${MAP.h}"/></clipPath>
      ${drawOrder.map(r => `<path id="rt-${r.key}" d="${r.d}"/>`).join("")}
    </defs>

    <g clip-path="url(#mclip)">
      <g class="m-land">
        ${Object.entries(MAP.border).map(([k,d]) => `<path class="m-c m-${k}" d="${d}"/>`).join("")}
      </g>

      <g class="m-routes">
        ${drawOrder.map(r => `<use class="m-case" href="#rt-${r.key}" data-day="${r.day}"/>`).join("")}
        ${drawOrder.map(r =>
          `<use class="m-line d${r.day}${r.variant === "B" ? " alt" : ""}"
                href="#rt-${r.key}" data-day="${r.day}"
                aria-label="Day ${r.day}${r.variant} ${r.label} ${r.km} 公里"/>`).join("")}
      </g>

      ${MAP.places.map(p => {
        const S = SIDE[p.side] || SIDE.n, big = p.kind === "stay";
        return `<g class="m-pt ${p.kind}">
          ${big ? `<circle class="m-halo" cx="${p.x}" cy="${p.y}" r="13"/>` : ""}
          <circle class="m-dot" cx="${p.x}" cy="${p.y}" r="${big ? 7 : 4.5}"/>
          <text class="m-name" x="${p.x + S.dx}" y="${p.y + S.dy}" text-anchor="${S.a}">${esc(p.name)}</text>
          ${p.nights ? `<text class="m-sub" x="${p.x + S.dx}" y="${p.y + S.dy + 17}"
             text-anchor="${S.a}">${esc(p.nights)}</text>` : ""}
        </g>`;
      }).join("")}
    </g>
  </svg>

  <div class="m-chips" role="group" aria-label="依日期篩選路線">
    ${chipDays.map(n => {
      const rs = MAP.routes.filter(r => r.day === n);
      const km = rs.map(r => r.km).join("／");
      return `<button type="button" class="m-chip d${n}" data-day="${n}" aria-pressed="false">
        <i></i>Day ${n}<em>${km} km</em></button>`;
    }).join("")}
    <button type="button" class="m-chip m-clear" data-day="all" hidden>顯示全部</button>
  </div>
  <p class="m-cap">路線依 OpenStreetMap 路網的實際道路繪製，與總檔的 Google 里程差 0.3–7%。
     虛線為天候二選一的 B 方案。Day 1、5 無自駕；Day 9 僅市區短程後轉搭 S-Bahn，皆未繪製。</p>`;

  /* 點日期籌碼 → 只留那一天，其餘淡出。再點一次還原。 */
  const mapBox = el("map");
  let only = null;
  const apply = () => {
    mapBox.querySelectorAll(".m-line, .m-case").forEach(n =>
      n.classList.toggle("dim", only !== null && +n.dataset.day !== only));
    mapBox.querySelectorAll(".m-chip[data-day]").forEach(b => {
      if (b.dataset.day === "all") { b.hidden = only === null; return; }
      b.setAttribute("aria-pressed", String(+b.dataset.day === only));
    });
  };
  mapBox.addEventListener("click", e => {
    const b = e.target.closest(".m-chip");
    if (!b) return;
    only = b.dataset.day === "all" ? null : (+b.dataset.day === only ? null : +b.dataset.day);
    apply();
  });

  el("daylinks").innerHTML = DAYS.map((d,i) => `
    <a class="dcard glass rv" href="day${d.n}.html">
      <span class="day-n">DAY ${d.n}</span>
      <span class="dcard-date">${esc(d.date)}</span>
      <span class="dcard-title">${esc(d.title)}</span>
      <span class="dcard-sub">${esc(dcardSub(d,i))}</span>
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
    <p><b>降雨兩個數字下方附的是十月基準。</b>同樣的座標、同樣的白天 06–18、同樣 ≥0.2 mm 算有雨，
       但樣本改成近五年（2021–2025）十月整月，每地 155 個白天，用來看行程這幾天在十月裡偏濕還是偏乾。
       十處有九處的當期數值高於十月平均，因為逐日統計含 2016–2020 那五個較濕的年份，且 10/05–10/13 前後本身在十月裡偏濕。</p>
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
        <td class="num strong ${tCls(w.dt.a)}">${w.dt.a}°</td>
        <td class="num ${tCls(w.dt.h)}">${w.dt.h}°</td>
        <td class="num ${cCls(w.dt.c)}">${w.dt.c}%</td>
        <td class="num">${bar(w.dt.p)}${octP(w)}</td>
        <td class="num">${mmBar(w.dt.mm)}${octMm(w)}</td>
      </tr>`;
    }).join("")}</tbody>`;

  /* 色階說明。門檻改在上面的 tCls／pCls，這裡的文字要跟著改。 */
  el("wxkey").innerHTML =
    `<span class="vkey-g"><b>溫度</b>` +
    [["t0","0° 以下"],["t1","0–6°"],["t2","6–10°"],["t3","10–13°"],["t4","13–16°"],["t5","16° 以上"]]
      .map(([k,t]) => `<i class="v ${k}"></i>${t}`).join("") + `</span>` +
    `<span class="vkey-g"><b>降雨</b>` +
    [["r0","低"],["r1","中"],["r2","高"]]
      .map(([k,t]) => `<i class="v ${k}"></i>${t}`).join("") + `</span>` +
    `<span class="vkey-g"><b>雲量</b>` +
    [["k0","少"],["k1","中"],["k2","多"]]
      .map(([k,t]) => `<i class="v ${k}"></i>${t}`).join("") + `</span>`;

  const PERIODS = [
    ["morn","上午 06–12",1],["noon","下午 12–18",1],
    ["dawn","清晨 00–06",0],["night","夜間 18–24",0],
  ];
  el("wxdaily").innerHTML = WX.map(w => {
    const [label] = cond(w.dt.c, w.dt.p);
    return `<details class="glass rv">
      <summary>
        <span class="s-t">${esc(w.day)}｜${esc(w.place)}</span>
        <span class="s-d">${esc(label)}　<b class="${tCls(w.dt.a)}">${w.dt.a}°</b> / <b class="${tCls(w.dt.h)}">${w.dt.h}°</b>　雨 <b class="${pCls(w.dt.p)}">${w.dt.p}%</b></span>
      </summary>
      <div class="dbody"><div class="scroll"><table>
        <thead><tr><th>時段</th><th class="num">均溫</th><th class="num">歷年區間</th>
          <th class="num">雲量</th><th class="num">雨機率</th><th class="num">平均雨量</th></tr></thead>
        <tbody>${PERIODS.map(([k,name,day]) => { const s = w.p[k]; return `
          <tr class="${day?"":"dim"}"><td>${esc(name)}${day?"":' <span class="tag">夜</span>'}</td>
            <td class="num ${tCls(s.a)}">${s.a} °C</td>
            <td class="num"><span class="${tCls(s.lo)}">${s.lo}</span> – <span class="${tCls(s.hi)}">${s.hi}</span> °C</td>
            <td class="num ${cCls(s.c)}">${s.c}%</td>
            <td class="num ${pCls(s.p)}">${s.p}%</td>
            <td class="num ${mCls(s.mm)}">${mm1(s.mm)} mm</td></tr>`;
        }).join("")}</tbody>
      </table></div></div>
    </details>`;
  }).join("");

  el("wxnotes").innerHTML = `<ul class="notes">${WX_NOTES.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${esc(t)}</li>`).join("")}</ul>`;
}

/* ── 駐外館處與急難救助 ─────────────────────────────── */

if (PAGE === "offices") {
  const L = EMERGENCY.local;
  el("sos").innerHTML = `
    <div class="sos-local glass">
      <div>
        <div class="sos-k">${esc(L.label)}</div>
        <a class="sos-big" href="tel:${esc(L.dial)}">${esc(L.num)}</a>
      </div>
      <p class="sos-note">${esc(L.note)}</p>
    </div>
    ${EMERGENCY.lines.map(x => `
      <div class="sos-line glass">
        <div class="sos-k">${esc(x.label)}</div>
        <a class="sos-num" href="tel:${esc(x.dial)}">${esc(x.num)}</a>
        <p class="sos-note">${esc(x.where)}</p>
        ${x.warn ? `<p class="sos-warn">${esc(x.warn)}</p>` : ""}
      </div>`).join("")}`;

  el("offices").innerHTML = OFFICES.map(o => `
    <article class="office glass rv${o.pri ? " pri" : ""}">
      <div class="of-tag${o.pri ? " on" : ""}">${esc(o.tag)}</div>
      <h2 class="of-name">${esc(o.name)}</h2>
      <p class="of-local">${esc(o.local)}</p>
      <p class="of-why">${esc(o.why)}</p>

      <div class="of-calls">
        <a class="of-call sos" href="tel:${esc(o.sosDial)}">
          <span>急難救助專線</span><b>${esc(o.sos)}</b><em>${esc(o.sosLocal)}</em></a>
        <a class="of-call" href="tel:${esc(o.telDial)}">
          <span>辦公室總機</span><b>${esc(o.tel)}</b><em>限領務服務時間</em></a>
      </div>

      <dl class="of-kv">
        <dt>地址</dt><dd>${esc(o.addr)}　<a class="daylink" href="${esc(o.map)}" target="_blank" rel="noopener">在地圖開啟</a></dd>
        ${o.extra ? `<dt>交通</dt><dd>${esc(o.extra)}</dd>` : ""}
        <dt>服務時間</dt><dd>${esc(o.hours)}</dd>
        <dt>領務轄區</dt><dd>${esc(o.area)}</dd>
        <dt>電子信箱</dt><dd>${o.mail.map(m => `<a class="daylink" href="mailto:${esc(m)}">${esc(m)}</a>`).join("　")}</dd>
        <dt>傳真</dt><dd>${esc(o.fax)}</dd>
      </dl>
    </article>`).join("");
}

/* ── 出發前準備清單 ─────────────────────────────────── */

/* 勾選狀態存在各自裝置的 localStorage，不同步給其他人。
   無痕模式下讀寫會直接拋例外，兩個函式都必須包 try/catch，否則整頁會掛掉。 */
const CK_KEY = "trip2026.checklist.v1";
function ckLoad(){
  try { return JSON.parse(localStorage.getItem(CK_KEY)) || {}; } catch (e) { return {}; }
}
function ckSave(state){
  try { localStorage.setItem(CK_KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
}

if (PAGE === "checklist") {
  const state = ckLoad();
  const total = CHECKLIST.reduce((a,g) => a + g.items.length, 0);
  const doneIn = g => g.items.filter(([id]) => state[id]).length;
  const doneAll = () => CHECKLIST.reduce((a,g) => a + doneIn(g), 0);

  el("ckroot").innerHTML = CHECKLIST.map(g => `
    <section class="ck-group glass rv" data-g="${g.id}">
      <div class="ck-head">
        <h2>${esc(g.title)}</h2>
        <span class="ck-count" data-count="${g.id}">${doneIn(g)}／${g.items.length}</span>
      </div>
      ${g.items.map(([id,label,note]) => `
        <label class="ck-item${state[id] ? " on" : ""}" data-item="${id}">
          <input type="checkbox" data-id="${id}"${state[id] ? " checked" : ""}>
          <span class="ck-text">
            <span class="ck-label">${esc(label)}</span>
            ${note ? `<span class="ck-note">${esc(note)}</span>` : ""}
          </span>
        </label>`).join("")}
    </section>`).join("");

  function paint(){
    const n = doneAll();
    el("ckbar").style.width = total ? (n / total * 100) + "%" : "0%";
    el("cknum").textContent = `${n}／${total}`;
    el("ckstate").textContent = n === total ? "全部完成" : `還有 ${total - n} 項`;
    CHECKLIST.forEach(g => {
      document.querySelector(`[data-count="${g.id}"]`).textContent = `${doneIn(g)}／${g.items.length}`;
    });
  }
  paint();

  /* 事件委派：只改動當下那一項，不整頁重繪 */
  el("ckroot").addEventListener("change", e => {
    const box = e.target.closest('input[type="checkbox"]');
    if (!box) return;
    const id = box.dataset.id;
    if (box.checked) state[id] = 1; else delete state[id];
    box.closest(".ck-item").classList.toggle("on", box.checked);
    if (!ckSave(state)) el("cknostore").hidden = false;
    paint();
  });

  el("ckreset").addEventListener("click", () => {
    if (!confirm("確定要清空所有勾選嗎？此動作無法復原。")) return;
    Object.keys(state).forEach(k => delete state[k]);
    ckSave(state);
    document.querySelectorAll('#ckroot input[type="checkbox"]').forEach(b => {
      b.checked = false;
      b.closest(".ck-item").classList.remove("on");
    });
    paint();
  });

  /* 開啟時就先探測一次能不能寫入，無痕模式直接提示 */
  if (!ckSave(state)) el("cknostore").hidden = false;
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
