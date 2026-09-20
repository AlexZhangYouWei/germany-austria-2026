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
  ["day1.html",   "逐日行程", "day"],
  ["food.html",   "特色菜",   "food"],
  ["weather.html","天氣預報", "weather"],
  ["tickets.html","票券","tickets"],
  ["checklist.html","準備清單","checklist"],
  ["offices.html","緊急聯絡","offices"],
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
   兩個 class 是為了勝過 td.strong 這類既有規則。 */
const tCls = t  => "v " + (t < 0 ? "t0" : t < 6 ? "t1" : t < 10 ? "t2" : t < 13 ? "t3" : t < 16 ? "t4" : "t5");
const pCls = p  => "v " + (p <  30  ? "r0" : p <  50  ? "r1" : "r2");
const mCls = mm => "v " + (mm < 0.5 ? "r0" : mm < 1.5 ? "r1" : "r2");
const cCls = c  => "v " + (c <  30  ? "k0" : c <  70  ? "k1" : "k2");
const mm1  = v  => v.toFixed(1);     /* 1 → 「1.0 mm」，同一欄小數位要一致 */

/* ── 四段時段表：預報頁卡片與日頁共用同一個元件 ───────── */

/* 時段定義的唯一來源在 fetch_fc.js，經 FC_META 下傳。 */
const PD = FC_META.periods;

const PD_HEAD = `<div class="wxp-hd">`
  + `<span>時段</span><span>天氣</span><span>氣溫</span>`
  + `<span class="wxp-rain"><span class="wxp-p">雨機率</span><span class="wxp-m">雨量</span></span></div>`;

/* low＝系集：多一行成員區間，並把「雨機率」的語意換成「有雨成員比例」。
   兩種來源的鍵名已在資料層統一，這裡不再分支。 */
function wxRow(x, P, low){
  if (!x) return `<div class="wxp-row na${P.day ? "" : " dim"}">`
    + `<span class="wxp-when"><b>${esc(P.label)}</b><em>${esc(P.span)}</em></span>`
    + `<span class="wxp-dash">—</span></div>`;
  const [label, kind] = cond(x.c, x.p);
  const rg = low && x.lo != null ? `<em class="wxp-rg">${x.lo}–${x.hi}</em>` : "";
  return `<div class="wxp-row${P.day ? "" : " dim"}">`
    + `<span class="wxp-when"><b>${esc(P.label)}</b><em>${esc(P.span)}</em></span>`
    + `<span class="wxcond sm ${kind}">${icon(kind)}<span>${esc(label)}</span></span>`
    + `<span class="wxp-t"><b class="${tCls(x.a)}">${x.a}</b><i>°</i>${rg}</span>`
    + `<span class="wxp-rain">`
    + `<span class="wxp-p"><b class="${pCls(x.p)}">${x.p}</b><i>%</i></span>`
    + `<span class="wxp-m"><b class="${mCls(x.mm)}">${mm1(x.mm)}</b><i>mm</i></span>`
    + `</span></div>`;
}

function wxPeriods(f){
  const low = f.kind === "ens";
  return `<div class="wxp">` + PD_HEAD
    + PD.map(P => wxRow(f.p && f.p[P.k], P, low)).join("") + `</div>`;
}

/* 出處徽章。none 沒有 src/res 可標。 */
function wxSrc(f){
  if (f.kind === "none") return `<span class="wxsrc low">尚無預報</span>`;
  return `<span class="wxsrc${f.kind === "ens" ? " low" : ""}">${esc(f.src)} ${esc(f.res)}`
    + (f.kind === "ens" ? `<em>${f.members} 成員 · 低信度</em>` : `<em>提前 ${f.lead} 天</em>`)
    + `</span>`;
}

/* 「X 月 X 日起 Y 就報得到這天」。far 由資料層算出射程最遠的模式；
   任一模式抓取失敗時 avail 會少一筆，所以不能在這裡寫死索引。 */
const wxWhen = f => f.far ? `${esc(f.far.from)} 起 ${esc(f.far.src)} 就報得到這天。` : "";
/* AROME 沒有降雨機率，那一欄借自階梯下一個模式；借了就要標。 */
const wxPop  = f => f.pop_src ? `　·　雨機率取自 ${esc(f.pop_src)}` : "";

/* 日頁上方那條預報。Day 3 有山谷與峰頂兩筆。 */
function dayWeather(n){
  const rows = FC.filter(f => f.day === n);
  if (!rows.length) return "";
  return `<div class="daywx">` + rows.map(f =>
    `<div class="daywx-one">`
    + `<div class="daywx-hd">${rows.length > 1 ? `<span class="daywx-place">${esc(f.place)}</span>` : ""}${wxSrc(f)}</div>`
    + wxPeriods(f)
    + (f.kind === "det"
        ? (f.pop_src ? `<p class="wxc-foot">${wxPop(f).slice(3)}</p>` : "")
        : `<p class="wxc-nodata">提前 ${f.lead} 天，超出數值模式射程。${wxWhen(f)}</p>`)
    + `</div>`).join("") + `</div>`;
}

/* ── 逐日行程 ───────────────────────────────────────── */

/* 地圖導航。座標來自 GEO（已逐筆查證），每個有座標的地點都給兩顆按鈕：
   左 Google Maps、右 Apple Maps，兩者都是「從我現在的位置帶我去這裡」。
   兩邊都不寫死起點，路上臨時偏離也還是對的。
   交通方式由類別推定，使用者在 App 裡仍可一鍵改。 */
function travelMode(cat){
  if (/步行|散步|步道/.test(cat)) return "walking";
  if (/公車|機場線|電車|S-Bahn/.test(cat)) return "transit";
  return "driving";
}
/* Apple Maps 的 dirflg：d 開車、w 步行、r 大眾運輸；daddr 單獨給就以目前位置為起點 */
const APPLE_FLG = { walking:"w", transit:"r", driving:"d" };

/* 兩個品牌標誌都是內嵌 SVG（站上不載外部資源）。
   G 是四色環＋橫槓，環的兩端切齊橫槓上下緣；蘋果單色吃 currentColor。
   蘋果原始路徑塞滿 0–24 且比 G 高，縮到高 19.7 並置中，兩顆並排才等重。 */
const ICON_G = '<svg class="gmk" viewBox="0 0 24 24" aria-hidden="true">'
  + '<path fill="#4285F4" d="M22.29 14.1A10.5 10.5 0 0 1 16.93 21.27L14.91 17.47A6.2 6.2 0 0 0 18.07 13.24Z"/>'
  + '<path fill="#34A853" d="M16.93 21.27A10.5 10.5 0 0 1 4.2 19.03L7.39 16.15A6.2 6.2 0 0 0 14.91 17.47Z"/>'
  + '<path fill="#FBBC05" d="M4.2 19.03A10.5 10.5 0 0 1 2.48 7.56L6.38 9.38A6.2 6.2 0 0 0 7.39 16.15Z"/>'
  + '<path fill="#EA4335" d="M2.48 7.56A10.5 10.5 0 0 1 22.29 9.9L18.07 10.76A6.2 6.2 0 0 0 6.38 9.38Z"/>'
  + '<path fill="#4285F4" d="M12 9.9H22.55V14.1H12Z"/></svg>';

const ICON_A = '<svg class="gmk" viewBox="0 0 24 24" aria-hidden="true">'
  + '<path fill="currentColor" transform="translate(2.63 2.15) scale(.8191)"'
  + ' d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014'
  + '-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987'
  + ' 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415'
  + '-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376'
  + '-2-.156-3.675 1.09-4.61 1.09ZM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818'
  + '-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701Z"/></svg>';

function geoLink(cat, key){
  const g = GEO[key];
  if (!g) return "";
  const [name, ll] = g;
  const mode = travelMode(cat);
  const gmap = `https://www.google.com/maps/dir/?api=1&destination=${ll}&travelmode=${mode}`;
  const amap = `https://maps.apple.com/?daddr=${ll}&dirflg=${APPLE_FLG[mode]}`;
  return `<span class="geo">`
    + `<a class="geo-g" href="${gmap}" target="_blank" rel="noopener" aria-label="用 Google 地圖導航至 ${esc(name)}">${ICON_G}</a>`
    + `<a class="geo-a" href="${amap}" target="_blank" rel="noopener" aria-label="用 Apple 地圖導航至 ${esc(name)}">${ICON_A}</a>`
    + `</span>`;
}

/* 今日行車路線：航點與路線圖同一組，兩者永遠一致 */
function routeLink(day, variant){
  if (typeof MAP === "undefined") return "";
  const r = MAP.routes.find(x => x.day === day && (x.variant || "") === (variant || ""));
  if (!r || !r.gmap || r.gmap.length < 2) return "";
  const pts = r.gmap, way = pts.slice(1, -1);
  const u = `https://www.google.com/maps/dir/?api=1&travelmode=driving`
    + `&origin=${pts[0]}&destination=${pts[pts.length-1]}`
    + (way.length ? `&waypoints=${way.join("|")}` : "");
  return `<a class="daylink" href="${u}" target="_blank" rel="noopener">`
    + `在 Google Maps 開啟今日路線　${r.km} km</a>`;
}

function timeline(rows){
  return `<ul class="tl">` + rows.map(([t,cat,place,note,fx,geo]) => `
    <li class="${fx?"fx":""}">
      <div class="t">${geo ? geoLink(cat, geo) : ""}<span>${esc(t)}</span></div><div class="m"></div>
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
      const panels = b.tabs.map((p,i) => {
        const rl = routeLink(d.n, (p.label.match(/^([ABC])/) || [])[1]);
        return `<div class="panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>
           ${p.cond ? `<p class="cond">${esc(p.cond)}</p>` : ""}
           ${rl ? `<p class="routeline">${rl}</p>` : ""}
           ${timeline(p.rows)}
         </div>`; }).join("");
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
    <div class="daybox-t">天氣預報<a class="daylink" href="weather.html">九天完整預報</a></div>
    ${wx}
  </section>` : ""}

  ${chk}

  <section class="day glass rv">
    <div class="daybox-t">時辰表${d.blocks.some(b => b.tabs) ? "" : routeLink(d.n, "")}</div>
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

/* ── 日頁：九天一條橫向軌道 ─────────────────────────
   手機（≤760px）：CSS scroll-snap 做跟手的分頁捲動。慣性、橡皮筋與吸附全交給瀏覽器，
   JS 只在吸附完成後同步網址、標題、日期列與翻頁區。
   桌機（≥760.02px）：CSS 以 display:contents 攤平軌道、只留 .cur 那一天，
   盒模型與先前完全相同（.day 仍是 main.wrap 的直接子元素）。
   內容本來就是執行期由 DAYS 產生，九天合計約 84 KB，不增加任何下載量。 */
if (PAGE === "day") {
  el("dayroot").innerHTML =
    `<div class="daytrack" id="daytrack">`
    + DAYS.map((d, i) =>
        `<section class="daypanel${d.n === DAYN ? " cur" : ""}" data-n="${d.n}"`
        + ` aria-label="Day ${d.n} ${esc(DAY_SHORT[i])}">${dayArticle(d)}</section>`).join("")
    + `</div>`
    + `<p class="srlive" id="daylive" aria-live="polite"></p>`;

  /* 左右側點擊區翻頁：桌機用。手機由 CSS 隱藏——它是覆在軌道上的固定條，
     會把滑動誤判成點擊，而且正好落在 iOS 邊緣返回手勢的地盤。 */
  const chev = dir => `<span class="chev"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
    stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="${dir === "prev" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}"/></svg></span>`;
  const zone = (d, dir) => d ? `<a class="edge ${dir}" href="day${d.n}.html"
      aria-label="${dir === "prev" ? "上一天" : "下一天"}：Day ${d.n} ${esc(d.title)}"
      aria-keyshortcuts="${dir === "prev" ? "ArrowLeft" : "ArrowRight"}">
      <span class="edge-label">Day ${d.n}<b>${esc(d.title)}</b></span>${chev(dir)}</a>` : "";
  const drawEdges = n => { el("edges").innerHTML =
    zone(DAYS.find(x => x.n === n - 1), "prev") + zone(DAYS.find(x => x.n === n + 1), "next"); };
  drawEdges(DAYN);

  const track  = el("daytrack");
  const railEl = el("rail");
  const panels = DAYS.map(d =>
    track && track.querySelector ? track.querySelector(`.daypanel[data-n="${d.n}"]`) : null);

  if (track && panels.every(Boolean)) {
    const mq    = window.matchMedia ? matchMedia("(max-width:760px)") : null;
    const pager = () => !!(mq && mq.matches);
    /* file:// 下 WebKit 視每份文件為不透明來源，replaceState 換路徑會丟 SecurityError */
    const canHist = location.protocol === "http:" || location.protocol === "https:";

    let cur = DAYN;      // 已確定停妥的那天
    let live = DAYN;     // 拖曳中目前最接近的那天（只驅動日期列高亮）
    let touching = false, settleT = 0, resizeT = 0;

    const nearest = () => {
      let best = 0, d = Infinity;
      for (let i = 0; i < panels.length; i++){
        const dd = Math.abs(panels[i].offsetLeft - track.scrollLeft);
        if (dd < d){ d = dd; best = i; }
      }
      return best;
    };

    const syncRail = n => {
      if (!railEl) return;
      railEl.querySelectorAll("a").forEach(a => {
        const me = a.getAttribute("href") === `day${n}.html`;
        a.classList.toggle("on", me);
        if (me) a.setAttribute("aria-current", "page");
        else a.removeAttribute("aria-current");
      });
      const onA = railEl.querySelector("a.on");
      if (onA && railEl.scrollWidth > railEl.clientWidth)
        railEl.scrollLeft = onA.offsetLeft - (railEl.clientWidth - onA.offsetWidth) / 2;
    };

    /* 拖曳途中只動日期列高亮，便宜且讓籌碼跟得上手指 */
    const setLive = n => { if (n !== live){ live = n; syncRail(n); } };

    /* 吸附停妥才做不可逆的事：換網址、改標題、調整 inert 與朗讀 */
    const commit = n => {
      if (n < 1 || n > DAYS.length || n === cur) return;
      cur = n;
      const d = DAYS.find(x => x.n === n);
      panels.forEach(p => {
        const me = +p.dataset.n === n;
        p.classList.toggle("cur", me);
        p.inert = !me;
      });
      const ae = document.activeElement;
      if (ae && ae.closest && ae.closest(".daypanel") && !ae.closest(".daypanel.cur") && ae.blur) ae.blur();
      document.title = `Day ${n}　${d.title}｜德國・奧地利`;
      if (canHist) { try { history.replaceState(null, "", `day${n}.html`); } catch (err) {} }
      setLive(n);
      drawEdges(n);
      const say = el("daylive");
      if (say) say.textContent = `Day ${n}　${esc(d.title)}`;
    };

    const check = () => {
      if (!pager() || touching) return;
      const i = nearest();
      /* 動量的尾巴可能停超過去抖時間，先確認真的落在吸附點上再提交 */
      if (Math.abs(panels[i].offsetLeft - track.scrollLeft) > 2) return arm();
      commit(i + 1);
    };
    function arm(){ clearTimeout(settleT); settleT = setTimeout(check, 140); }

    track.addEventListener("scroll", () => {
      if (!pager()) return;
      setLive(nearest() + 1);
      arm();
    }, { passive:true });
    if ("onscrollend" in window) track.addEventListener("scrollend", check);
    track.addEventListener("touchstart", () => { touching = true; clearTimeout(settleT); }, { passive:true });
    ["touchend","touchcancel"].forEach(t =>
      track.addEventListener(t, () => { touching = false; arm(); }, { passive:true }));

    /* 對位時先關掉 snap，免得修正動作本身又被吸到別處 */
    const place = () => {
      const prev = track.style.scrollSnapType;
      track.style.scrollSnapType = "none";
      track.scrollLeft = panels[cur - 1].offsetLeft;
      const back = () => { track.style.scrollSnapType = prev || ""; };
      if (window.requestAnimationFrame) requestAnimationFrame(back); else back();
    };
    panels.forEach(p => { p.inert = +p.dataset.n !== cur; });
    if (window.requestAnimationFrame) requestAnimationFrame(place); else place();

    addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(place, 150); });
    addEventListener("pageshow", e => { if (e.persisted) place(); });

    const goTo = (n, smooth) => {
      if (n < 1 || n > DAYS.length) return;
      if (!pager()) { location.href = `day${n}.html`; return; }
      track.scrollTo({ left:panels[n - 1].offsetLeft, behavior: smooth ? "smooth" : "auto" });
    };

    /* 日期列：手機平滑滑過去，桌機維持整頁跳轉（href 保留，長按開新分頁仍可用） */
    if (railEl) railEl.addEventListener("click", e => {
      if (!pager()) return;
      const a = e.target.closest && e.target.closest("a");
      if (!a) return;
      const m = /day(\d+)\.html/.exec(a.getAttribute("href") || "");
      if (!m) return;
      e.preventDefault();
      goTo(+m[1], true);
    });

    addEventListener("keydown", e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName)) return;
      if (e.key === "ArrowLeft")  goTo(cur - 1, true);
      if (e.key === "ArrowRight") goTo(cur + 1, true);
    });

    /* ≥760.02px 的觸控裝置沒有分頁軌道，沿用原本的整頁跳轉手勢 */
    let x0 = null, y0 = 0, t0 = 0;
    addEventListener("touchstart", e => {
      x0 = null;
      if (pager() || e.touches.length !== 1) return;
      if (e.target.closest && e.target.closest(".scroll,.navbar,.rail,.tabs,.mapsvg,a,button")) return;
      x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; t0 = Date.now();
    }, { passive:true });
    addEventListener("touchend", e => {
      if (x0 === null) return;
      const t = e.changedTouches[0], dx = t.clientX - x0, dy = t.clientY - y0;
      x0 = null;
      if (pager()) return;
      if (Date.now() - t0 > 700) return;              // 太慢的不算滑動
      if (Math.abs(dx) < 64) return;                  // 位移不足
      if (Math.abs(dx) < Math.abs(dy) * 1.6) return;  // 比較像直向捲動
      goTo(dx < 0 ? cur + 1 : cur - 1, false);
    }, { passive:true });
  }
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
  const built = new Date(FC_META.built);
  const stamp = built.toISOString().slice(0, 16).replace("T", " ").replace(/-/g, "/");
  const age   = Math.round((Date.now() - built) / 864e5);

  el("wxasof").innerHTML =
    `預報發布：<b>${esc(stamp)} UTC</b>`
    + `　·　確定性預報 <b>${FC_META.n}／${FC_META.total}</b> 天`
    + `　·　每日四時段（Europe/Berlin）`
    + `<br>德國地點以 <b>DWD</b>、奧地利地點以 <b>GeoSphere Austria</b> 的官方模式為首選；超出射程時改用 ECMWF 與 GEFS＋GEM 系集，可用下方 tab 切換比對。`
    + (age >= 1 ? `　·　<b class="stale">本頁已 ${age} 天未更新，請重跑建置</b>` : "");

  /* 色階圖例。手機的四段列會隱藏欄位頭，這裡補上「數字各是什麼」。 */
  const KEY = [
    ["氣溫 °C", [["t1","&lt;6"],["t2","6–10"],["t3","10–13"],["t4","13–16"],["t5","≥16"]]],
    ["雨機率 %", [["r0","&lt;30"],["r1","30–50"],["r2","≥50"]]],
    ["雨量 mm", [["r0","&lt;0.5"],["r1","0.5–1.5"],["r2","≥1.5"]]],
  ];
  el("wxkey").innerHTML = KEY.map(([name, xs]) =>
    `<span class="vkey-g"><b>${name}</b>`
    + xs.map(([c, t]) => `<i class="${c}"></i>${t}`).join("　") + `</span>`).join("");

  /* 三層來源 tab。FC 每筆的 v 存三層各自的結果，筆身是最準那層；「最佳」就是筆身。
     卡片結構不因 tab 而變，只換餵進去的那筆資料。 */
  const TABS = [
    ["best",  "最佳",           "每天自動採用射程內最準的一層：官方模式 → ECMWF 系集 → GEFS＋GEM 系集。"],
    ["model", "官方模式",       "德國 DWD ICON-D2 2.2 km、奧地利 GeoSphere AROME 2.5 km，約 2 天內；再遠退到 ICON-EU／ICON／ECMWF IFS。"],
    ["ecmwf", "ECMWF 系集",     "ECMWF ENS 51 成員，約 15 天內；中期展望公認最強，給區間不給單點。"],
    ["pool",  "GEFS＋GEM 系集", "NOAA GEFS 31＋加拿大 GEM 21 併成 52 成員多模式系集，35 天內；只看趨勢。"],
  ];
  const card = (f, shown) => `<article class="wxcard glass rv${shown ? " in" : ""}${f.kind === "none" ? " wxc-empty" : ""}">
      <div class="wxc-head">
        <a class="daylink" href="day${f.day}.html">Day ${f.day}</a>
        <span class="wxc-date">${esc(f.date.slice(5).replace("-", "/"))}</span>
        <span class="wxc-place">${esc(f.place)}</span>
        ${wxSrc(f)}
      </div>
      ${wxPeriods(f)}
      ${f.kind === "det"
        ? `<p class="wxc-foot">提前 ${f.lead} 天　·　Europe/Berlin${wxPop(f)}</p>`
        : `<p class="wxc-nodata">提前 ${f.lead} 天，超出數值模式射程。${wxWhen(f)}</p>`}
    </article>`;
  const pickRec = (f, t) => t === "best" ? f : (f.v && f.v[t]) || { day:f.day, date:f.date, place:f.place, lead:f.lead, kind:"none" };

  let cur = "best";
  try { const s = localStorage.getItem("wxtab"); if (TABS.some(t => t[0] === s)) cur = s; } catch (e) {}
  /* 切 tab 重畫的卡片直接帶 in：進場觀察器只在載入時掃過一次 .rv，之後新加的節點不會被看到 */
  function draw(shown){
    el("wxtabs").innerHTML = TABS.map(([k, name]) =>
      `<button type="button" role="tab" class="wxtab${k === cur ? " on" : ""}" data-tab="${k}" aria-selected="${k === cur}">${name}</button>`).join("");
    el("wxtabnote").textContent = TABS.find(t => t[0] === cur)[2];
    el("wxcards").innerHTML = FC.map(f => card(pickRec(f, cur), shown)).join("");
  }
  draw(false);
  el("wxtabs").addEventListener("click", e => {
    const b = e.target && e.target.closest ? e.target.closest("[data-tab]") : null;
    if (!b || b.dataset.tab === cur) return;
    cur = b.dataset.tab;
    try { localStorage.setItem("wxtab", cur); } catch (e2) {}
    draw(true);
  });
}

/* ── 駐外館處與急難救助 ─────────────────────────────── */

if (PAGE === "tickets") {
  const rules = r => `<ul class="notes tkrules">${r.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("")}</ul>`;

  el("tkbought").innerHTML = TICKETS.bought.map(t => `
    <article class="card glass rv tkcard">
      <div class="meta">Day ${t.day}　${esc(t.date)}　${esc(t.city)}</div>
      <h3 class="cardtitle">${esc(t.name)}</h3>
      <div class="tkbig"><b>${esc(t.big)}</b><span>${esc(t.bigk)}</span></div>
      <dl class="kv tkkv">${t.kv.map(([k, v]) =>
        `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}
        ${t.tel ? `<dt>電話</dt><dd><a href="tel:${esc(t.tel[1])}">${esc(t.tel[0])}</a></dd>` : ""}
      </dl>
      <p class="tkwarn">${esc(t.warn)}</p>
      ${rules(t.rules)}
      ${t.links.map(([x, u]) =>
        `<p class="tklink"><a class="daylink" href="${esc(u)}" target="_blank" rel="noopener">${esc(x)}</a></p>`).join("")}
    </article>`).join("");

  el("tklater").innerHTML = TICKETS.later.map(t => `
    <article class="card glass rv">
      <div class="meta">${esc(t.price)}</div>
      <h3 class="cardtitle">${esc(t.name)}</h3>
      <dl class="kv"><dt>時點</dt><dd>${esc(t.when)}</dd><dt>做法</dt><dd>${md(t.how)}</dd></dl>
    </article>`).join("");

  el("tknotes").innerHTML = `<ul class="notes">${TICKETS.notes.map(([l, t]) =>
    `<li><b class="lbl">${esc(l)}</b>${esc(t)}</li>`).join("")}</ul>`;
}

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

  el("road").innerHTML =
    ROADSIDE.lines.map(x => `
      <div class="sos-line glass rv">
        <div class="sos-k">${esc(x.label)}</div>
        <a class="sos-num" href="tel:${esc(x.dial)}">${esc(x.num)}</a>
        <p class="sos-note">${esc(x.where)}</p>
        ${x.warn ? `<p class="sos-warn">${esc(x.warn)}</p>` : ""}
      </div>`).join("") +
    `<div class="sos-line glass rv roadlinks">
      <div class="sos-k">即時路況</div>
      ${ROADSIDE.roads.map(([t,u,d]) =>
        `<p class="roadlink"><a class="daylink" href="${esc(u)}" target="_blank" rel="noopener">${esc(t)}</a>
         <span>${esc(d)}</span></p>`).join("")}
    </div>`;

  el("roadtips").innerHTML = `<ul class="notes">${ROADSIDE.tips.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${esc(t)}</li>`).join("")}</ul>`;

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
