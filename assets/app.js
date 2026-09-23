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
  ["index.html",  "行程總覽", "index"],
  ["day1.html",   "每日行程", "day"],
  ["food.html",   "地區美食", "food"],
  ["weather.html","天氣預報", "weather"],
  ["tickets.html","票券","tickets"],
  ["shop.html","伴手禮與藥妝","shop"],
  ["drive.html","自駕指南","drive"],
  ["esim.html","eSIM 方案","esim"],
  ["checklist.html","行李與待辦","checklist"],
  ["offices.html","緊急聯絡","offices"],
];

const DAY_SHORT = ["慕尼黑","新天鵝堡","楚格峰","因斯布魯克","薩爾斯堡","國王湖","哈修塔特","基姆湖","返程"];
const DAY_STAY  = ["慕尼黑","米滕瓦爾德","米滕瓦爾德","薩爾斯堡","薩爾斯堡","比紹夫斯維森","哈修塔特","慕尼黑",""];

el("nav").innerHTML = NAV.map(([href,label,key]) =>
  `<a href="${href}"${key === PAGE ? ' class="on" aria-current="page"' : ""}>${label}</a>`).join("");
/* 窄螢幕導覽列會橫向捲動：把目前頁的膠囊捲到正中間，點過去後不會只剩半顆露在邊上 */
{
  const nb = el("nav"), on = nb.querySelector("a.on");
  if (on && nb.scrollWidth > nb.clientWidth)
    nb.scrollLeft = on.offsetLeft - (nb.clientWidth - on.offsetWidth) / 2;
}

const rail = el("rail");
if (rail && PAGE === "day") {
  rail.innerHTML = DAYS.map((d,i) =>
    `<a href="day${d.n}.html"${d.n === DAYN ? ' class="on" aria-current="page"' : ""}>` +
    `<span class="rail-date">${esc(d.date.slice(0,5))}</span>` +
    `<span class="rail-copy"><b>DAY ${d.n}</b><i aria-hidden="true">·</i><span>${esc(DAY_SHORT[i])}</span></span></a>`).join("");
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

/* 氣溫一律給「最低–最高」（整數）。色階仍依均溫 x.a 判斷，
   因為單看極值會被一小時的尖峰帶偏。 */
const wxT = x => `<b class="${tCls(x.a)}">${Math.round(x.l)}–${Math.round(x.h)}</b><i>°</i>`;

/* 全日概況：由四段合成。最低／最高取極值，均溫與雲量取平均，雨機率取最大，雨量加總。
   四段有缺就不合成，避免用半天冒充整天。 */
const rd1 = v => Math.round(v * 10) / 10;
function daySum(f){
  const xs = PD.map(P => f.p && f.p[P.k]);
  if (xs.some(x => !x)) return null;
  const avg = a => a.reduce((s, v) => s + v, 0) / a.length;
  const cs = xs.map(x => x.c).filter(c => c != null);
  return {
    l:Math.min(...xs.map(x => x.l)), h:Math.max(...xs.map(x => x.h)), a:rd1(avg(xs.map(x => x.a))),
    c:cs.length ? Math.round(avg(cs)) : 0, p:Math.max(...xs.map(x => x.p)), mm:rd1(xs.reduce((s, x) => s + x.mm, 0)),
  };
}
/* 全日概況：整張卡最先被看到的東西，獨立成一個面板，底色隨天氣狀況微調。
   四段有缺就不畫，避免用半天冒充整天。 */
function wxSum(f){
  const s = daySum(f);
  if (!s) return "";
  const [label, kind] = cond(s.c, s.p);
  return `<div class="wxsum ${kind}">
      <div class="wxsum-lbl">全日概況</div>
      <div class="wxsum-row">
        <span class="wxcond lg ${kind}">${icon(kind)}<span>${esc(label)}</span></span>
        <span class="wxsum-t">${wxT(s)}</span>
      </div>
      <div class="wxsum-kv">
        <div><span>降雨機率</span><b class="${pCls(s.p)}">${s.p}</b><i>%</i></div>
        <div><span>預估雨量</span><b class="${mCls(s.mm)}">${mm1(s.mm)}</b><i>mm</i></div>
      </div>
    </div>`;
}

/* 分時預報：四段各一張小卡，排成 2×2。缺格仍畫卡，卡片高度才不會忽高忽低。 */
function wxCell(x, P){
  const head = `<div class="wxpc-h"><b>${esc(P.label)}</b><em>${esc(P.span)}</em></div>`;
  if (!x) return `<div class="wxpc na${P.day ? "" : " dim"}">${head}<span class="wxpc-dash">—</span></div>`;
  const [label, kind] = cond(x.c, x.p);
  return `<div class="wxpc${P.day ? "" : " dim"}">${head}
      <span class="wxcond sm ${kind}">${icon(kind)}<span>${esc(label)}</span></span>
      <div class="wxpc-t">${wxT(x)}</div>
      <div class="wxpc-r"><span>降雨 <b class="${pCls(x.p)}">${x.p}%</b></span>`
    + `<span><b class="${mCls(x.mm)}">${mm1(x.mm)}</b> mm</span></div>
    </div>`;
}

function wxPeriods(f){
  return wxSum(f)
    + `<div class="wxph"><span>分時預報</span><em>溫度 °C　·　降雨</em></div>`
    + `<div class="wxpg">` + PD.map(P => wxCell(f.p && f.p[P.k], P)).join("") + `</div>`;
}

/* 出處：抬頭下的一行小字，不再做成徽章。none 沒有 src/res 可標。 */
function wxSrc(f){
  if (f.kind === "none") return `<p class="wxc-src low">尚無預報</p>`;
  return `<p class="wxc-src${f.kind === "ens" ? " low" : ""}">${esc(f.src)} ${esc(f.res)}`
    + (f.kind === "ens" ? `　·　${f.members} 成員　·　低信度` : `　·　提前 ${f.lead} 天`)
    + `</p>`;
}

/* 「X 月 X 日起 Y 就報得到這天」。far 由資料層算出射程最遠的模式；
   任一模式抓取失敗時 avail 會少一筆，所以不能在這裡寫死索引。 */
const wxWhen = f => f.far ? `${esc(f.far.from)} 起 ${esc(f.far.src)} 就報得到這天。` : "";
/* AROME 沒有降雨機率，那一欄借自階梯下一個模式；借了就要標。 */
const wxPop  = f => f.pop_src ? `　·　雨機率取自 ${esc(f.pop_src)}` : "";
/* 腳註：確定性預報標時區，系集標信度——後者才是看這張卡時真正要留意的事。 */
const wxFoot = f => `<p class="wxc-foot">`
  + (f.kind === "ens" ? `長期預報　·　低信度，請於出發前再次查看`
                      : `預報時間：Europe/Berlin　·　模型數值僅供參考`)
  + wxPop(f) + `</p>`;

/* 預報卡內容（預報頁與日頁共用）：抬頭、出處、全日概況、分時預報、腳註。
   外框由呼叫端決定。 */
function wxBody(f, head){
  return `<div class="wxc-head">${head}
        <span class="wxc-date">${esc(f.date.slice(5).replace("-", "/"))}</span>
        <span class="wxc-place">${esc(f.place)}</span>
      </div>
      ${wxSrc(f)}
      ${wxPeriods(f)}
      ${f.kind === "none"
        ? `<p class="wxc-nodata">提前 ${f.lead} 天，超出數值模式射程。${wxWhen(f)}</p>`
        : wxFoot(f)}`;
}

/* 日頁那張預報卡。Day 3 有山谷與峰頂兩筆，多地點時用與時辰表相同的頁籤切換。 */
function dayWeather(n){
  const rows = FC.filter(f => f.day === n);
  if (!rows.length) return "";
  if (rows.length === 1) return wxBody(rows[0], "");
  const g = `wx${n}`;
  return `<div class="tabs daywx-tabs" role="tablist">${rows.map((f,i) =>
      `<button role="tab" aria-selected="${i===0}" data-g="${g}" data-i="${i}">${esc(f.place)}</button>`).join("")}</div>`
    + rows.map((f,i) => `<div class="panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>${wxBody(f, "")}</div>`).join("");
}

/* ── 逐日行程 ───────────────────────────────────────── */

/* 地圖地點連結。MAP_QUERY 以地點正式名稱＋地址逐筆核對，開啟後先顯示該地點的
   資訊卡，再由使用者按地圖 App 內的「路線」。不能只傳裸座標：Google／Apple 可能
   把座標吸附到附近店家，造成按鈕名稱與實際開啟的地點不一致。 */
function travelMode(cat, noDrive){
  if (/公車|機場線|電車|S-Bahn/.test(cat)) return "transit";
  if (noDrive || /步行|散步|步道/.test(cat)) return "walking";
  return "driving";
}
/* 「無自駕」的日子（Day 1、5）市區景點一律步行導航，否則老城裡 300 m 的教堂會開出開車路線 */
const noDriveDay = d => d.meta.some(m => /無自駕/.test(m));

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

function navUrls(cat, key, noDrive){
  const g = GEO[key];
  if (!g) return null;
  const [name, ll] = g;
  const query = (typeof MAP_QUERY !== "undefined" && MAP_QUERY[key]) || name;
  return { name,
    gmap:`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`,
    amap:`https://maps.apple.com/search?query=${encodeURIComponent(query)}` };
}
/* 兩顆圖示：左 Google、右 Apple。時間軸列、今日導航表、票券、購物、自駕頁共用 */
function geoLink(cat, key, noDrive){
  const u = navUrls(cat, key, noDrive);
  if (!u) return "";
  return `<span class="geo">`
    + `<a class="geo-g" href="${u.gmap}" target="_blank" rel="noopener" aria-label="在 Google 地圖開啟 ${esc(u.name)}">${ICON_G}</a>`
    + `<a class="geo-a" href="${u.amap}" target="_blank" rel="noopener" aria-label="在 Apple 地圖開啟 ${esc(u.name)}">${ICON_A}</a>`
    + `</span>`;
}

/* 今日行車路線：航點與路線圖同一組，兩者永遠一致 */
function routeLink(day, variant){
  if (typeof MAP === "undefined") return "";
  const r = MAP.routes.find(x => x.day === day && (x.variant || "") === (variant || ""));
  if (!r || !r.gmap || r.gmap.length < 2) return "";
  /* Day 8 正式行程已取消普里恩；舊地圖資料仍有該航點，建立連結時明確剔除。 */
  const pts = day === 8 ? [r.gmap[0], r.gmap[r.gmap.length - 1]] : r.gmap;
  const way = pts.slice(1, -1);
  const u = `https://www.google.com/maps/dir/?api=1&travelmode=driving`
    + `&origin=${pts[0]}&destination=${pts[pts.length-1]}`
    + (way.length ? `&waypoints=${way.join("|")}` : "");
  return `<a class="daylink" href="${u}" target="_blank" rel="noopener">`
    + `在 Google Maps 開啟今日路線　${day === 8 ? "直達" : `${r.km} km`}</a>`;
}

/* 一列寫了好幾個地點（用「、」隔開，或「／」並列而不是「→」路線）時只有一個座標，
   列上的按鈕會指不準，所以不掛；這種列請到下方的「今日導航」表找。 */
const multiPlace = place => /、/.test(place) || (/／/.test(place) && !/→/.test(place));

function timePeriod(t){
  const m = String(t).match(/(?:^|[^0-9])([0-2]?[0-9]):([0-5][0-9])/);
  if (!m) return null;
  const hour = +m[1], minute = +m[2], total = hour * 60 + minute;
  return { total, period:hour >= 5 && hour < 12 ? "morning" : hour >= 12 && hour < 18 ? "afternoon" : "night" };
}

const ICON_PIN = '<svg class="sh-pin" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a7 7 0 0 0-7 7c0 5 7 13 7 13s7-8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z"/></svg>';
const ICON_LOCK = '<svg class="tt-lock" viewBox="0 0 24 24" aria-label="固定時間" role="img"><path fill="currentColor"'
  + ' d="M7 10V7a5 5 0 0 1 10 0v3h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2Zm2 0h6V7a3 3 0 0 0-6 0Z"/></svg>';

/* 時辰表一列：[時間, 類別, 地點, 說明, 固定?, GEO key, 版面]。
   第 7 格版面 { title, tags, aside, stops:[[key, 名稱, 副標]] } 選填：
   沒給時標題用地點欄、地點只列第 6 格那一個，說明收進「行程細節」。
   只有一個地點時標題就是它，不再重複名稱，只留副標與導航鈕。 */
function timeline(rows, noDrive){
  return `<ul class="tl">` + rows.map(([t,cat,place,note,fx,geo,x]) => {
    const tm = timePeriod(t);
    x = x || {};
    const stops = x.stops || (geo && !multiPlace(place) ? [[geo]] : []);
    const detail = note && note !== "—" && note !== x.aside;
    return `
    <li class="${fx?"fx":""}"${tm ? ` data-time-period="${tm.period}" data-time-minutes="${tm.total}"` : ""}>
      <div class="t"><span class="tt-time">${fx ? ICON_LOCK : ""}${esc(t)}</span><span class="cat">${esc(cat)}</span></div><div class="m"></div>
      <div class="c">
        <div class="p"><span class="tt-title">${esc(x.title || place)}</span>${(x.tags || []).map(g =>
          `<span class="tt-tag">${esc(g)}</span>`).join("")}${x.aside ? `<span class="tt-aside">${esc(x.aside)}</span>` : ""}</div>
        ${stops.length === 1 ? `<div class="tt-one">${stops[0][2] ? `<span class="tt-sub">${esc(stops[0][2])}</span>` : ""}${geoLink(cat, stops[0][0], noDrive)}</div>`
          : stops.length ? `<div class="tt-stops">${stops.map(([k, name, sub]) => `
          <div class="tt-stop">
            <span class="tt-nm"><b>${esc(name || (GEO[k] ? GEO[k][0] : k))}</b>${sub ? `<small>${esc(sub)}</small>` : ""}</span>
            ${geoLink(cat, k, noDrive)}</div>`).join("")}</div>` : ""}
        ${detail ? `<details class="tt-more"><summary>行程細節</summary><div class="n">${md(note)}</div></details>` : ""}
      </div>
    </li>`;
  }).join("") + `</ul>`;
}

/* 今日導航：依首次出現順序把當天的地點去重列出。時間與交通方式取首次出現那列，
   所以行為跟原本掛在列上的按鈕一致。
   A／B／C 方案日用與時辰表同一組 data-g 的頁籤：共用的點擊處理會同步整頁同組按鈕與面板，
   所以時辰表選 B，行程地點也跟著切到 B，反之亦然。
   共同區塊的地點只列一次；各方案只列該方案獨有的地點，方案之間不互相吃掉。 */
function dayPlaces(d){
  const hasTabs = d.blocks.some(b => b.tabs);
  const common = new Set();
  d.blocks.forEach(b => { if (!b.tabs) b.rows.forEach(r => r[5] && common.add(r[5])); });

  const groups = [], done = new Set();   /* 方案區塊整組推一筆 { plans:[...] }，保留在區塊順序裡的位置 */
  const pick = (rows, skip) => {
    const seen = new Set(), out = [];
    rows.forEach(([t,cat,place,note,fx,key]) => {
      if (!key || !GEO[key] || seen.has(key) || skip.has(key)) return;
      seen.add(key);
      out.push({ key, cat, time:t, name:GEO[key][0] });
    });
    return out;
  };
  d.blocks.forEach(b => {
    if (b.tabs){
      groups.push({ plans:b.tabs.map(p => ({ label:p.label, items:pick(p.rows, common) })) });
    } else {
      const items = pick(b.rows, done);
      items.forEach(x => done.add(x.key));
      if (items.length) groups.push({ label:hasTabs ? (b.title || "共同") : "", items });
    }
  });
  return groups;
}

function navCard(d){
  const groups = dayPlaces(d), noDrive = noDriveDay(d);
  const g = `d${d.n}`;                     /* 與時辰表方案頁籤同組，切換互相連動 */
  const planSet = groups.find(x => x.plans);
  const commonCount = groups.reduce((sum, x) => sum + (x.items ? x.items.length : 0), 0);
  if (!commonCount && !(planSet && planSet.plans.some(p => p.items.length))) return "";
  const list = items => `
      <ul class="navlist">
        ${items.map(x => `
          <li class="navitem">
            <span class="navname">${esc(x.name)}</span>
            ${geoLink(x.cat, x.key, noDrive)}
          </li>`).join("")}
      </ul>`;
  const lists = groups.map(x => x.plans
    ? `<div class="navgroup">
      <div class="tabs navtabs" role="tablist">${x.plans.map((p,i) =>
        `<button role="tab" aria-selected="${i===0}" data-g="${g}" data-i="${i}"${p.label.length >= 12 ? ' class="tab-long"' : ""}><span class="tab-label">${esc(p.label)}</span></button>`).join("")}</div>
      ${x.plans.map((p,i) => `<div class="panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>${p.items.length
        ? list(p.items) : `<p class="navhint navnone">這個方案沒有另外的地點，見共同地點。</p>`}</div>`).join("")}
    </div>`
    : `<div class="navgroup">
      ${x.label ? `<div class="navgrp">${esc(x.label)}</div>` : ""}${list(x.items)}
    </div>`).join("");
  /* 地點數＝共同＋目前方案；每個方案一個 .panel 數字，由同一個點擊處理切換 */
  const count = planSet
    ? planSet.plans.map((p,i) => `<span class="navcount panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>${commonCount + p.items.length} 個地點</span>`).join("")
    : `<span class="navcount">${commonCount} 個地點</span>`;
  return `<section class="day glass rv navcard">
    <div class="navhead">
      <div class="daybox-t">行程地點${count}</div>
      <p class="navhint">依行程順序排列，選擇地圖 App 開始導航。</p>
    </div>
    <div class="navgroups">${lists}</div>
  </section>`;
}

function dayArticle(d){
  const noDrive = noDriveDay(d);
  const blocks = d.blocks.map(b => {
    if (b.tabs) {
      const g = `d${d.n}`;
      const btns = b.tabs.map((p,i) =>
        `<button role="tab" aria-selected="${i===0}" data-g="${g}" data-i="${i}"${p.label.length >= 12 ? ' class="tab-long"' : ""}><span class="tab-label">${esc(p.label)}</span></button>`).join("");
      const panels = b.tabs.map((p,i) => {
        const rl = routeLink(d.n, (p.label.match(/^([ABC])/) || [])[1]);
        return `<div class="panel" data-g="${g}" data-i="${i}" ${i===0?"":"hidden"}>
           ${p.cond ? `<p class="cond">${esc(p.cond)}</p>` : ""}
           ${rl ? `<p class="routeline">${rl}</p>` : ""}
           ${timeline(p.rows, noDrive)}
         </div>`; }).join("");
      return `<div class="tabs" role="tablist">${btns}</div>${panels}`;
    }
    return `<div class="tlb">${b.title ? `<div class="block-title">${esc(b.title)}</div>` : ""}${timeline(b.rows, noDrive)}</div>`;
  }).join("");

  const notes = d.notes && d.notes.length
    ? `<ul class="notes">${d.notes.map(([l,t]) =>
        `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("")}</ul>` : "";

  const wx = dayWeather(d.n);

  /* 今日待辦：當日確認（需臨場判斷，目前只有 Day 3）與今日聯絡住宿講的是同一件事——
     今天要主動做的動作。併成一張卡，卡面只留概覽，細節點開彈窗（沿用票券頁的 .tkdlg）。 */
  const TD = [];
  const tdRow = (when, title, sub, body) => {
    const i = TD.push(body) - 1;
    return `<button type="button" class="td-row" data-td="${i}" aria-haspopup="dialog">
      <span class="td-when">${esc(when)}</span>
      <span class="td-m"><b class="td-t">${esc(title)}</b><span class="td-s">${esc(sub)}</span></span>
    </button>`;
  };

  const rows = [];
  if (d.check) rows.push(tdRow(d.check.when, d.check.title, d.check.sub, `
    <div class="daybox-t">${esc(d.check.title)}<span class="daybox-when">${esc(d.check.when)}</span></div>
    <p class="cfm-lead">${md(d.check.lead)}</p>
    <ol class="cfm">${d.check.items.map(([name, url, why], i) => `
      <li><span class="no">${"①②③④⑤⑥"[i] || i + 1}</span>
        <div><a class="daylink" href="${esc(url)}" target="_blank" rel="noopener">${esc(name)}</a>
        <p>${md(why)}</p></div></li>`).join("")}
    </ol>
    ${d.check.foot ? `<p class="cfm-foot">${md(d.check.foot)}</p>` : ""}`));

  (typeof STAY_NOTIFY === "undefined" ? [] : STAY_NOTIFY).filter(n => n.day === d.n).forEach(n => {
    const s = STAYS[n.stay], c = s.confirm || {};
    rows.push(tdRow(n.when, `聯絡${s.city}住宿`, c.who || "", `
      <div class="daybox-t">聯絡${esc(s.city)}住宿<span class="daybox-when">${esc(n.when)}</span></div>
      <p class="ntf-name">${esc(s.name)}</p>
      <p class="ntf-act">${md(n.act)}</p>
      <p class="ntf-who">${esc(c.who || "")}${c.dial ? `<a class="ntf-tel" href="tel:${esc(c.dial)}">${esc(c.tel)}</a>` : ""}</p>
      ${c.steps ? `<ol class="cfm-steps td-steps">${c.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol>` : ""}`));
  });

  /* 彈窗不給 id：九天的 DOM 同時在頁面上，靠 .daypanel 往上找當天那一個 */
  const todo = rows.length ? `<section class="day glass rv">
    <div class="daybox-t">今日待辦<span class="daybox-when">${rows.length} 項</span></div>
    <div class="td-list">${rows.join("")}</div>
  </section>
  <dialog class="tkdlg td-dlg" aria-label="待辦細節"><div class="tkdlg-in glass">
    <button type="button" class="tkdlg-x" data-close aria-label="關閉">×</button>
    <div class="td-body">${TD.map((b, i) => `<div data-tdi="${i}" hidden>${b}</div>`).join("")}</div>
  </div></dialog>` : "";

  return `<article class="day glass rv">
    <div class="day-head">
      <span class="day-n">DAY ${d.n}</span>
      <span class="day-date">${esc(d.date)}</span>
      ${d.km ? `<span class="km">${esc(d.km)}</span>` : ""}
    </div>
    <h1 class="day-title">${esc(d.title)}</h1>
    <div class="day-meta">${d.meta.map(m => `<span>${esc(m)}</span>`).join("")}</div>
  </article>

  ${todo}

  ${wx ? `<details class="day glass rv wxcard wxfold">
    <summary><span class="s-t">天氣預報</span><a class="daylink" href="weather.html">九天完整預報</a></summary>
    <div class="wxfold-b">${wx}</div>
  </details>` : ""}

  <section class="day glass rv timetable">
    <div class="daybox-t">時辰表${d.blocks.some(b => b.tabs) ? "" : routeLink(d.n, "")}</div>
    ${blocks}${notes}
  </section>

  ${navCard(d)}`;
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
            <div class="time">${esc(l.time)}${l.dur ? `<em class="dur">飛行 ${esc(l.dur)}</em>` : ""}</div>
          </div>
          <div class="side">${l.side.map(s => esc(s)).join("<br>")}</div>
        </div>`).join("")}
    </div>`).join("");
  /* 入住確認：何時聯絡、聯絡誰、要確認什麼、目前狀態。電話走 tel: 連結，寫法同緊急聯絡頁。 */
  const stayConfirm = c => `
      <details class="stay-cfm">
        <summary><span class="s-t">入住確認</span><span class="s-d">${esc(c.status)}</span></summary>
        <div class="dbody">
          <dl class="kv">
            <dt>時間點</dt><dd>${esc(c.when)}</dd>
            <dt>聯絡</dt><dd>${esc(c.who)}${c.dial ? `　<a href="tel:${esc(c.dial)}">${esc(c.tel)}</a>` : ""}</dd>
            <dt>要確認</dt><dd><ol class="cfm-steps">${c.steps.map(x => `<li>${esc(x)}</li>`).join("")}</ol></dd>
            <dt>狀態</dt><dd><strong>${esc(c.status)}</strong></dd>
          </dl>
        </div>
      </details>`;
  /* 城市當標題（六張卡一眼掃出路線），旅館名列在下方小字。入住／退房是最常查的兩個數字，
     拉出來獨立成一條，入住確認緊接在它下面。
     設備只列「有」與「未確認」；沒有的不佔版面（薩爾斯堡與哈修塔特的廚房無來源可查）。 */
  /* 優先開啟核對過的 Google Maps 商家頁；沒有可確認商家頁才用地址導航。 */
  const addressDirections = a => `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(a)}`;
  const amRow = s => [["洗衣機", s.wash], ["廚房", s.kit]]
    .filter(([, v]) => v !== false)
    .map(([label, v]) => v === true
      ? `<span class="am am-on"><i aria-hidden="true"></i>${label}</span>`
      : `<span class="am am-unk"><i aria-hidden="true"></i>${label}<em>未確認</em></span>`).join("");
  el("staylist").innerHTML = STAYS.map(s => {
    const am = amRow(s);
    return `
    <div class="card glass rv">
      <div class="meta">${esc(s.date)}　${s.nights} 晚</div>
      <h3 class="cardtitle stay-city">${esc(s.city)}</h3>
      <p class="stay-name">${esc(s.name)}</p>
      <div class="stay-io">
        <div><span>入住</span><b>${esc(s.inn)}</b></div>
        <div><span>退房</span><b>${esc(s.out)}</b></div>
      </div>
      ${s.confirm ? stayConfirm(s.confirm) : ""}
      ${am ? `<div class="stay-am">${am}</div>` : ""}
      ${s.notes ? `<ul class="stay-notes">${s.notes.map(n => `<li>${esc(n)}</li>`).join("")}</ul>` : ""}
      <a class="stay-map" href="${esc(s.mapUrl || addressDirections(s.addr))}" target="_blank" rel="noopener"
         aria-label="${s.mapUrl ? `在 Google 地圖查看 ${esc(s.name)} 商家` : `在 Google 地圖以地址導航至 ${esc(s.addr)}`}"
         >${s.mapUrl ? `在 Google 地圖查看商家${s.mapName ? `（${esc(s.mapName)}）` : ""}` : "Google 地圖地址導航（未確認商家頁）"}</a>
    </div>`; }).join("");
  /* 小費：德奧分欄對照，數字本身兩國多半相同，真正的差別寫在下方「怎麼給」。 */
  el("tiptable").innerHTML =
    `<thead><tr><th>場合</th><th>德國</th><th>奧地利</th></tr></thead><tbody>`
    + TIPS.rows.map(r => `<tr>${r.map(c => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")
    + `</tbody>`;
  el("tiphow").innerHTML = TIPS.how.map(([t, d]) =>
    `<div><b>${esc(t)}</b><p>${md(d)}</p></div>`).join("");
  el("tipfoot").textContent = TIPS.foot;

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
  `;

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
   手機（≤600px）：CSS scroll-snap 做跟手的分頁捲動。慣性、橡皮筋與吸附全交給瀏覽器，
   JS 只在吸附完成後同步網址、標題、日期列與翻頁區。
   桌機（>600px）：CSS 以 display:contents 攤平軌道、只留 .cur 那一天，
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

  const timeJump = document.createElement("nav");
  timeJump.id = "timejump";
  timeJump.className = "timejump";
  timeJump.setAttribute("aria-label", "時辰表時段快速跳轉");
  timeJump.hidden = true;
  timeJump.innerHTML = [
    ["morning", "上午"],
    ["afternoon", "下午"],
    ["night", "晚上"]
  ].map(([key, label]) =>
    `<button type="button" data-period="${key}" aria-label="跳到${label}" title="${label}" aria-pressed="false">${label}</button>`
  ).join("");
  document.body.appendChild(timeJump);

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

  /* 今日待辦彈窗：九天 DOM 同時存在，所以不靠 id，從被點的那天 .daypanel 往下找 */
  const root = el("dayroot");
  if (root && root.addEventListener) root.addEventListener("click", e => {
    const t = e.target;
    if (!t || !t.closest) return;
    const panel = t.closest(".daypanel") || root;
    const dlg = panel.querySelector ? panel.querySelector("dialog.td-dlg") : null;
    if (!dlg) return;
    const b = t.closest("[data-td]");
    if (b && dlg.showModal) {
      const body = dlg.querySelector(".td-body");
      if (body && body.querySelectorAll) [].forEach.call(body.querySelectorAll("[data-tdi]"),
        x => { x.hidden = x.dataset.tdi !== b.dataset.td; });
      dlg.showModal();
      const inner = dlg.querySelector(".tkdlg-in");
      if (inner) inner.scrollTop = 0;
      return;
    }
    /* 點關閉鈕或點到深色背景（dialog 本體而非內層）就關 */
    if (dlg.open && (t.closest("[data-close]") || t === dlg) && dlg.close) dlg.close();
  });

  const track  = el("daytrack");
  const railEl = el("rail");
  const panels = DAYS.map(d =>
    track && track.querySelector ? track.querySelector(`.daypanel[data-n="${d.n}"]`) : null);

  if (track && panels.every(Boolean)) {
    const mq    = window.matchMedia ? matchMedia("(max-width:600px)") : null;
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

    const timeButtons = timeJump.querySelectorAll("button[data-period]");
    let timeFrame = 0;
    let activeTimeTable = null;
    const timePanel = () => pager() ? panels[nearest()] : panels.find(p => p.classList.contains("cur"));
    const visibleTimeRows = panel => panel ? [].filter.call(panel.querySelectorAll(".timetable .tl li[data-time-period]"), row =>
      !row.closest(".panel[hidden]") && !row.closest("[hidden]")) : [];
    const updateTimeJump = () => {
      const panel = timePanel();
      const table = panel && panel.querySelector(".timetable");
      const hide = () => {
        if (activeTimeTable) activeTimeTable.classList.remove("timejump-active");
        activeTimeTable = null;
        timeJump.hidden = true;
        timeJump.classList.remove("show");
      };
      if (!table || pager()) { hide(); return; }   /* 手機時辰表直接全部顯示，不掛時段跳轉 */
      const r = table.getBoundingClientRect();
      const inView = r.bottom > 72 && r.top < window.innerHeight - 24;
      const rows = visibleTimeRows(panel);
      if (!inView || !rows.length) { hide(); return; }

      const available = new Set(rows.map(row => row.dataset.timePeriod));
      const anchor = Math.min(Math.max(window.innerHeight * .3, 140), 260);
      let current = rows[0];
      rows.forEach(row => { if (row.getBoundingClientRect().top <= anchor) current = row; });
      const active = current.dataset.timePeriod;
      timeButtons.forEach(button => {
        const selected = button.dataset.period === active;
        button.disabled = !available.has(button.dataset.period);
        button.setAttribute("aria-pressed", String(selected));
      });
      if (activeTimeTable !== table) {
        if (activeTimeTable) activeTimeTable.classList.remove("timejump-active");
        activeTimeTable = table;
      }
      table.classList.toggle("timejump-active", window.innerWidth <= 1039);
      timeJump.hidden = false;
      timeJump.classList.add("show");
    };
    const scheduleTimeJump = () => {
      if (timeFrame) return;
      timeFrame = requestAnimationFrame(() => { timeFrame = 0; updateTimeJump(); });
    };
    timeJump.addEventListener("click", e => {
      const button = e.target.closest("button[data-period]");
      if (!button || button.disabled) return;
      const panel = timePanel();
      const row = visibleTimeRows(panel).find(item => item.dataset.timePeriod === button.dataset.period);
      if (!panel || !row) return;
      const top = row.getBoundingClientRect().top;
      if (pager()) {
        const base = panel.getBoundingClientRect().top;
        panel.scrollTo({ top:panel.scrollTop + top - base - 96, behavior:"smooth" });
      } else {
        window.scrollTo({ top:window.scrollY + top - 76, behavior:"smooth" });   /* 日期選單已移到底部，頂部只剩 62px 導覽列 */
      }
      button.focus({ preventScroll:true });
    });
    panels.forEach(panel => panel.addEventListener("scroll", scheduleTimeJump, { passive:true }));
    track.addEventListener("scroll", scheduleTimeJump, { passive:true });
    addEventListener("scroll", scheduleTimeJump, { passive:true });
    addEventListener("resize", scheduleTimeJump);
    document.addEventListener("click", e => {
      if (e.target.closest && e.target.closest(".tabs button")) scheduleTimeJump();
    });
    scheduleTimeJump();

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
      scheduleTimeJump();
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
      scheduleTimeJump();
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

    addEventListener("resize", () => { clearTimeout(resizeT); resizeT = setTimeout(place, 150); scheduleTimeJump(); });
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
      if (document.querySelector && document.querySelector("dialog[open]")) return;
      if (e.key === "ArrowLeft")  goTo(cur - 1, true);
      if (e.key === "ArrowRight") goTo(cur + 1, true);
    });

    /* >600px 的觸控裝置沒有分頁軌道，沿用原本的整頁跳轉手勢 */
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
        ${f.spots ? `<p class="fd-h">口袋名單 · 取自 Google Maps 清單「德奧」</p><table>${f.spots.map(([n,m,t,c]) =>
          `<tr><td style="width:44%"><a class="fd-a" href="https://maps.google.com/?cid=${c}" target="_blank" rel="noopener" aria-label="在 Google 地圖開啟 ${esc(n)}"><strong>${esc(n)}</strong></a><span class="fd-m">${esc(m)}</span></td><td>${esc(t)}</td></tr>`).join("")}</table>` : ""}
        ${f.text ? `<p style="font-size:13px;color:var(--ink2);margin:${f.items.length?"16px":"0"} 0 0">${esc(f.text)}</p>` : ""}
      </div>
    </details>`).join("");
}

if (PAGE === "weather") {
  const built = new Date(FC_META.built);
  const stamp = built.toISOString().slice(0, 16).replace("T", " ").replace(/-/g, "/");
  const age   = Math.round((Date.now() - built) / 864e5);

  el("wxasof").innerHTML =
    `預報發布：<b>${esc(stamp)} UTC</b>`
    + `　·　確定性預報 <b>${FC_META.n}／${FC_META.total}</b> 天`
    + `　·　每日四時段（Europe/Berlin）`
    + (age >= 1 ? `　·　<b class="stale">本頁已 ${age} 天未更新，請重跑建置</b>` : "");

  /* 三層來源 tab。FC 每筆的 v 存三層各自的結果，筆身是最準那層；「最佳」就是筆身。
     卡片結構不因 tab 而變，只換餵進去的那筆資料。 */
  const TABS = [
    ["best",  "最佳",           "每天自動採用射程內最準的一層。"],
    ["model", "官方模式",       "德國 DWD、奧地利 GeoSphere 官方模式，約 2 天內最準。"],
    ["ecmwf", "ECMWF 系集",     "約 15 天內的中期展望，給區間不給單點。"],
    ["pool",  "GEFS＋GEM 系集", "35 天內的多模式系集，只看趨勢。"],
  ];
  const card = (f, shown) => `<article class="wxcard glass rv${shown ? " in" : ""}${f.kind === "none" ? " wxc-empty" : ""}">
      ${wxBody(f, `<a class="daylink" href="day${f.day}.html">Day ${f.day}</a>`)}
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

/* 票券：第一層只有「哪張票、幾點、在哪」，點「更多」才展開票務規定與抵達攻略。
   已買／尚未購買用與時辰表相同的頁籤切換；每張卡連回該日時辰表。 */
if (PAGE === "tickets") {
  const li = r => r.map(([l,t]) => `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("");

  /* 抵達攻略：怎麼上去、怎麼下來、注意，塞進票卡的「更多」裡 */
  const access = a => !a ? "" : `
      <div class="ac-block">
        <h4 class="ac-h">抵達攻略</h4>
        <div class="tkbig"><b>${esc(a.big)}</b><span>${esc(a.bigk)}</span></div>
        <ul class="notes ac-lead">${li(a.lead)}</ul>
        <div class="ac-cols">
          <section>
            <h4 class="ac-h">怎麼上去</h4>
            <ol class="ac-steps">${a.up.map(([n,l,t]) =>
              `<li><span class="ac-n">${esc(n)}</span><div><b>${esc(l)}</b>${md(t)}</div></li>`).join("")}</ol>
          </section>
          <section>
            <h4 class="ac-h">怎麼下來</h4>
            <ul class="ac-down">${a.down.map(([l,t]) => `<li><b>${esc(l)}</b>${md(t)}</li>`).join("")}</ul>
            <h4 class="ac-h">注意</h4>
            <ul class="ac-down">${a.notes.map(([l,t]) => `<li><b>${esc(l)}</b>${md(t)}</li>`).join("")}</ul>
          </section>
        </div>
        <p class="ac-src">資料來源　${esc(a.src)}${a.links.map(([x,u]) =>
          `　·　<a class="daylink" href="${esc(u)}" target="_blank" rel="noopener">${esc(x)}</a>`).join("")}</p>
      </div>`;

  /* 「更多」開成浮層視窗（<dialog>），內容先存在 DETAIL，點的時候才填進去 */
  const DETAIL = [];
  const card = t => {
    const a = t.ac ? ACCESS.find(x => x.id === t.ac) : null;
    const idx = DETAIL.push(`
          <div class="meta">Day ${t.day}　${esc(t.date)}　${esc(t.city)}</div>
          <h3 class="cardtitle">${esc(t.name)}</h3>
          <div class="tkbig"><b>${esc(t.big)}</b><span>${esc(t.bigk)}</span></div>
          ${t.kv ? `<dl class="kv tkkv">${t.kv.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>` : ""}
          ${t.price ? `<dl class="kv tkkv"><dt>票價</dt><dd>${esc(t.price)}</dd><dt>做法</dt><dd>${md(t.how)}</dd></dl>` : ""}
          ${t.warn ? `<p class="tkwarn">${esc(t.warn)}</p>` : ""}
          ${t.rules ? `<ul class="notes tkrules">${li(t.rules)}</ul>` : ""}
          ${(t.links || []).map(([x, u]) =>
            `<p class="tklink"><a class="daylink" href="${esc(u)}" target="_blank" rel="noopener">${esc(x)}</a></p>`).join("")}
          ${access(a)}`) - 1;
    return `
    <article class="card glass rv tkcard">
      <div class="meta">Day ${t.day}　${esc(t.date)}　${esc(t.city)}</div>
      <h3 class="cardtitle">${esc(t.name)}</h3>
      <div class="tkbig"><b>${esc(t.big)}</b><span>${esc(t.bigk)}</span></div>
      <p class="tkaddr">${esc(t.addr)}${t.geo ? geoLink("步行", t.geo) : ""}</p>
      <p class="tkday"><a class="daylink" href="day${t.day}.html">看 Day ${t.day} 時辰表</a>${t.tel ? `　·　<a class="daylink" href="tel:${esc(t.tel[1])}">${esc(t.tel[0])}</a>` : ""}</p>
      <button type="button" class="tkmore" data-tk="${idx}" aria-haspopup="dialog"><span class="s-t">更多</span><span class="s-d">${t.kv ? "票務規定" : "購買做法"}${a ? "・抵達攻略" : ""}</span></button>
    </article>`;
  };

  const groups = [["已買", TICKETS.bought], ["尚未購買", TICKETS.later]];
  const D = TICKETS.drive;
  el("tkroot").innerHTML =
    `<a class="glass rv tkdrive" href="${esc(D.url)}" target="_blank" rel="noopener">
      <span class="tkdrive-t">${esc(D.label)}　→</span>
      <span class="tkdrive-n">${esc(D.note)}</span>
    </a>`
    + `<div class="tabs tktabs" role="tablist">${groups.map(([l], i) =>
      `<button role="tab" aria-selected="${i===0}" data-g="tk" data-i="${i}">${l}</button>`).join("")}</div>`
    + groups.map(([l, xs], i) =>
      `<div class="panel" data-g="tk" data-i="${i}" ${i===0?"":"hidden"}><div class="cards">${xs.map(card).join("")}</div></div>`).join("")
    + `<dialog class="tkdlg" id="tkdlg" aria-label="票券詳情"><div class="tkdlg-in glass"><button type="button" class="tkdlg-x" data-close aria-label="關閉">×</button><div id="tkdlgbody"></div></div></dialog>`;

  const dlg = el("tkdlg");
  el("tkroot").addEventListener("click", e => {
    const b = e.target && e.target.closest ? e.target.closest("[data-tk]") : null;
    if (b && dlg && dlg.showModal) {
      el("tkdlgbody").innerHTML = DETAIL[+b.dataset.tk];
      dlg.showModal();
      dlg.querySelector(".tkdlg-in").scrollTop = 0;
      return;
    }
    /* 點關閉鈕或點到深色背景（dialog 本體而非內層）就關 */
    if (dlg && dlg.open && e.target && (e.target.closest("[data-close]") || e.target === dlg)) dlg.close();
  });
}

if (PAGE === "shop") {
  /* 有圖的品項放 64px 縮圖（可點開放大），沒有的放品名首字母佔位；圖片 title 帶作者與授權 */
  const CR = Object.fromEntries((SHOP.credits || []).map(([k, f, au, li]) => [k, `${f}　©${au}　${li}`]));
  const pic = (k, name) => k
    ? `<img class="sh-img" src="assets/img/shop/${k}.jpg" loading="lazy" alt="${esc(name)}" title="${esc(CR[k] || "Wikimedia Commons")}">`
    : `<span class="sh-img sh-noimg" aria-hidden="true">${esc(name.trim().charAt(0))}</span>`;
  /* 每項一張卡：左圖、右品名＋推薦理由；底列「建議購買」點了捲到下方「路過可買的點」 */
  const cards = rows => `<div class="sh-list">${rows.map(([a,b,c,k]) =>
    `<article class="glass sh-item"><div class="sh-top">${pic(k, a)}<div class="sh-main">`
    + `<strong>${esc(a)}</strong>`
    + `<span class="sh-label">推薦理由</span><div class="sh-note">${md(b)}</div></div></div>`
    + `<a class="sh-buy" href="#shstops-card">${ICON_PIN}<span class="sh-blbl">建議購買</span><span class="sh-where">${esc(c)}</span><span class="sh-chev" aria-hidden="true"></span></a></article>`).join("")}</div>`;
  /* 雙層 tab：第一層國家、第二層食品／藥妝，一次只顯示一張表 */
  const CC = [["DE","德國"],["AT","奧地利"]], KIND = [["food","食品"],["med","藥妝"]];
  let cc = 0, kd = 0;
  const tabs = (xs, cur, lv) => xs.map(([, l], i) =>
    `<button type="button" role="tab" class="wxtab${i === cur ? " on" : ""}" data-lv="${lv}" data-i="${i}" aria-selected="${i === cur}">${l}</button>`).join("");
  const show = () => {
    el("shtabs").innerHTML = tabs(CC, cc, "cc");
    el("shtabs2").innerHTML = tabs(KIND, kd, "kd");
    el("shroot").innerHTML = cards(SHOP[CC[cc][0]][KIND[kd][0]]);
  };
  show();
  const onTab = e => {
    const b = e.target.closest("[data-lv]"); if (!b) return;
    if (b.dataset.lv === "cc") cc = +b.dataset.i; else kd = +b.dataset.i;
    show();
  };
  el("shtabs").addEventListener("click", onTab);
  el("shtabs2").addEventListener("click", onTab);

  /* 點縮圖放大：沿用票券頁的 .tkdlg 彈窗 */
  const dlg = el("shdlg");
  el("shroot").addEventListener("click", e => {
    const img = e.target.closest("img.sh-img");
    if (!img || !dlg || !dlg.showModal) return;
    el("shdlgbody").innerHTML = `<img class="sh-big" src="${esc(img.getAttribute("src"))}" alt="${esc(img.alt)}">
      <p class="sh-bigcap">${esc(img.alt)}</p><p class="sh-bigsrc">${esc(img.title)}</p>`;
    dlg.showModal();
  });
  if (dlg) dlg.addEventListener("click", e => {
    if (dlg.open && (e.target.closest("[data-close]") || e.target === dlg)) dlg.close();
  });
  el("shstops").innerHTML = `<table>${SHOP.stops.map(([t,pl,w,g]) =>
    `<tr><td style="width:22%"><strong>${esc(t)}</strong></td><td>${esc(pl)}${geoLink("步行", g)}</td><td class="sh-where">${md(w)}</td></tr>`).join("")}</table>`;
}

/* 開車須知：租車、停車、加油站、與台灣不同的交通法規。
   加油站沒有逐點查證座標，改用 Google Maps 名稱＋地址搜尋連結。 */
if (PAGE === "drive") {
  const li = r => r.map(([l,t]) => `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("");
  const q = s => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
  const D = DRIVE;

  /* 租車資訊（依設計稿）：桌機兩欄、手機單欄。兩版文字不同的地方都輸出，用 .dr-d／.dr-m 由 CSS 切換。
     櫃檯確認的勾選只存在各自裝置的 localStorage，無痕模式讀寫會拋例外，所以包 try/catch。 */
  const R = D.rental, DR_KEY = "trip2026.drive.v1";
  let drck = {};
  try { drck = JSON.parse(localStorage.getItem(DR_KEY)) || {}; } catch (e) {}
  const chev = `<span class="sh-chev" aria-hidden="true"></span>`;
  const card = (cls, title, body, tag = "") =>
    `<article class="glass rv dr-c ${cls}"><div class="dr-hd"><h3>${esc(title)}</h3>${tag ? `<span class="dr-tag">${esc(tag)}</span>` : ""}</div>${body}</article>`;
  /* 手機收合卡：標題＋摘要在 summary，點開看細節；桌機同樣可展開 */
  const fold = (cls, title, sum, body) =>
    `<article class="glass rv dr-c ${cls}"><details class="dr-fold"><summary><div class="dr-fsum"><h3>${esc(title)}</h3>${sum}</div>${chev}</summary>${body}</details></article>`;

  const [shopN, shopA, shopH] = R.shop;
  const order = card("dr-order", "租車訂單資訊", `
    <div class="dr-orow">
      <dl class="dr-shop"><dt>租車公司</dt><dd>${esc(shopN)}</dd><dt class="dr-m">取車地點</dt><dd>${esc(shopA)}</dd><dt class="dr-m">營業時間</dt><dd>${esc(shopH)}</dd></dl>
      <dl class="dr-ocols">${R.order.map(([l, a, b, hi, s]) => `<div><dt>${esc(l)}</dt><dd>${esc(a)}${b ? `<span class="dr-sep">・</span><b${hi ? ` class="hi"` : ""}>${esc(b)}</b>` : ""}${s ? `<small>${esc(s)}</small>` : ""}</dd></div>`).join("")}</dl>
    </div>
    <p class="dr-cover">${esc(R.cover)}</p>`, "已確認");

  const ctr = card("dr-ctr", "取車櫃檯確認", `<ul class="dr-cklist">${R.counter.map(([id, t, s, n]) => `<li><label>
      <input type="checkbox" class="dr-box" data-k="${id}"${drck[id] ? " checked" : ""}>
      <span class="dr-d">${esc(t)}</span><span class="dr-m">${esc(s)}</span><small class="dr-m">${esc(n)}</small>
    </label></li>`).join("")}</ul>`, "到店逐項確認");

  const docs = card("dr-docs", "必備文件", `<ul class="dr-doclist">${R.docs.map(([d, m, s]) =>
    `<li><span class="dr-d">${esc(d)}</span><span class="dr-m">${esc(m)}</span><small class="dr-m">${esc(s)}</small></li>`).join("")}</ul>`);

  const inspList = `<ul class="dr-plain">${R.inspect.map(t => `<li><span class="dr-sq"></span>${esc(t)}</li>`).join("")}</ul>`;
  const insp = card("dr-insp dr-d", "取車驗車", inspList)
    + fold("dr-insp dr-m", "取車驗車", `<p class="dr-fs">${esc(R.inspectShort)}</p>`, inspList);

  const ret = fold("dr-ret", "還車安排",
    `<p class="dr-hi">${esc(R.ret.time)}</p><p class="dr-flow">${esc(R.ret.flow)}</p><p class="dr-fs">${esc(R.ret.note)}</p>`,
    `<p class="dr-note">${md(R.ret.more)}</p>`);

  const [vg, vp, vr] = R.roadShort;
  const road = fold("dr-road-c", "跨境與道路費",
    `<dl class="dr-kv2 dr-d">${R.road.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl>
     <p class="dr-m dr-vg">${esc(vg)}<b>${esc(vp)}</b></p><p class="dr-m dr-fs">${esc(vr)}</p>`,
    `<dl class="dr-kv2 dr-m">${R.road.map(([k, v]) => `<dt>${esc(k)}</dt><dd>${esc(v)}</dd>`).join("")}</dl><p class="dr-note">${md(R.roadNote)}</p>`);

  const fuel = card("dr-fuel", "燃油原則", `<p class="dr-txt">${esc(R.fuel)}</p><p class="dr-note">${esc(R.fuelNote)}</p>`);

  el("drrental").innerHTML = order + ctr + insp + docs + ret + road + fuel;
  el("drrental").addEventListener("change", e => {
    const b = e.target.closest(".dr-box"); if (!b) return;
    if (b.checked) drck[b.dataset.k] = 1; else delete drck[b.dataset.k];
    try { localStorage.setItem(DR_KEY, JSON.stringify(drck)); } catch (e2) {}
  });

  el("drpark").innerHTML = `<table>${D.parking.map(([d,pl,fee,how,g]) =>
    `<tr><td style="width:16%"><strong>${esc(d)}</strong></td><td style="width:26%">${esc(pl)}${g ? geoLink("開車", g) : ""}</td><td class="dr-fee">${md(fee)}</td><td>${md(how)}</td></tr>`).join("")}</table>`;

  el("drfuel").innerHTML = `<table>${D.fuel.map(([leg,st,addr,note]) =>
    `<tr><td style="width:24%"><strong>${esc(leg)}</strong></td><td style="width:30%"><a class="fd-a" href="${q(st + " " + addr)}" target="_blank" rel="noopener">${esc(st)}</a><span class="fd-m">${esc(addr)}</span></td><td>${md(note)}</td></tr>`).join("")}</table>`;

  el("drrules").innerHTML = `<table class="dr-rules"><tr><th>項目</th><th>德國</th><th>奧地利</th><th>與台灣不同、要注意</th></tr>${D.rules.map(([k,de,at,tw]) =>
    `<tr><td class="strong">${esc(k)}</td><td>${md(de)}</td><td>${md(at)}</td><td class="dr-tw">${md(tw)}</td></tr>`).join("")}</table>`;

  el("drnotes").innerHTML = `<ul class="notes">${li(D.notes)}</ul>`;
}

/* 網路分析：eSIM 方案比較。只放比較表與各組總結，全頁只報單人價。
   方案依吃到飽／總量型／每日定量分三組——選錯計費型態比選錯平台更痛。 */
if (PAGE === "esim") {
  const E = ESIM;

  /* O／X 一律顯示成 ✓／— */
  /* O／X 畫 ✓／—；其他字串（如「當地 100 分鐘」「未標示」）照字面顯示 */
  const ox = v => v === "O" ? `<span class="es-ok">✓</span>` : v === "X" ? `<span class="es-no">—</span>` : `<span class="es-txt">${esc(v)}</span>`;

  /* Apple「比較機型」式的垂直比較（手機、桌機共用），最多三欄並排。
     每欄欄頭是下拉選單，可換成同組任一方案來比較。 */
  /* 流量／降速欄：「主文，補充」拆成主文＋灰色小字 */
  const dataCell = r => { const [m, sub] = r.data.split("，");
    return `${esc(m)}${sub ? `<small>${esc(sub)}</small>` : ""}`; };
  const cmpRows = dcol => [
    ["評分", (r, top) => `<b class="es-sc${r.score === top ? " on" : ""}">${r.score.toFixed(1)}</b>`],
    [dcol, dataCell],
    ["德國 Telekom", r => ox(r.tk)],
    ["奧地利 A1", r => ox(r.a1)],
    ["熱點分享", r => ox(r.hotspot)],
    ["通話", r => ox(r.call)],
  ];
  const cmpBody = (g, sel, dcol) => {
    const cols = sel.map(i => g.rows[i]), top = Math.max(...cols.map(r => r.score));
    return `<div class="es-cv es-ctop">${cols.map((r, k) => `<div>
        <label class="es-cname"><span>${esc(r.name)}</span><select data-k="${k}" aria-label="切換比較方案">${
          g.rows.map((o, i) => `<option value="${i}"${i === sel[k] ? " selected" : ""}>${esc(o.name)}</option>`).join("")}</select></label>
        <div class="es-cprice">${esc(r.price)}</div>
        <a class="es-cbuy" href="${esc(r.buy[1])}" target="_blank" rel="noopener">購買</a>
      </div>`).join("")}</div>`
      + cmpRows(dcol).map(([l, f]) => `<div class="es-crow"><p>${esc(l)}</p>
        <div class="es-cv">${cols.map(r => `<div>${f(r, top)}</div>`).join("")}</div></div>`).join("");
  };
  /* 結論（tab 下方、表格上方）：目前選的方案依評分排序，同分用「＝」；同一方案選兩次只列一次 */
  const rankLine = cols => {
    const uniq = [...new Set(cols)].sort((a, b) => b.score - a.score);
    return uniq.map((r, i) => (i ? `<i>${r.score === uniq[i - 1].score ? "＝" : "＞"}</i>` : "")
      + `<b${i === 0 ? ` class="on"` : ""}>${esc(r.name)}</b>`).join("");
  };

  /* 三種計費型態用 tab 切換，一次只顯示一組比較 */
  let cur = 0;
  const showGroup = () => {
    const g = E.groups[cur], dcol = g.type === "吃到飽" ? "降速" : "流量";
    const sel = g.rows.slice(0, 3).map((_, i) => i);
    el("estabs").innerHTML = E.groups.map((x, i) =>
      `<button type="button" role="tab" class="wxtab${i === cur ? " on" : ""}" data-i="${i}" aria-selected="${i === cur}">${esc(x.type)}</button>`).join("");
    el("esplans").innerHTML = `
    <div class="es-rank"><p>結論</p><div>${rankLine(sel.map(i => g.rows[i]))}</div></div>
    <div class="es-cmp" data-g="${cur}" data-sel="${sel.join(",")}">${cmpBody(g, sel, dcol)}</div>`;
  };
  showGroup();
  el("estabs").addEventListener("click", e => {
    const b = e.target.closest("[data-i]");
    if (b && +b.dataset.i !== cur) { cur = +b.dataset.i; showGroup(); }
  });

  el("esplans").addEventListener("change", e => {
    const box = e.target.closest(".es-cmp"); if (!box) return;
    const g = E.groups[box.dataset.g], sel = box.dataset.sel.split(",").map(Number);
    sel[e.target.dataset.k] = +e.target.value;
    box.dataset.sel = sel.join(",");
    box.innerHTML = cmpBody(g, sel, g.type === "吃到飽" ? "降速" : "流量");
    el("esplans").querySelector(".es-rank div").innerHTML = rankLine(sel.map(i => g.rows[i]));
  });

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

/* 狀態存在各自裝置的 localStorage，不同步給其他人。
   v2 = { checks:{id:1}, list:[區段…] }。list 只有在使用者動過結構（新增／改名／刪除／排序）之後才存，
   沒動過就一直用 data.js 的 CHECKLIST，之後行程更新才會帶進來。
   無痕模式下讀寫會直接拋例外，兩個函式都必須包 try/catch，否則整頁會掛掉。 */
const CK_KEY = "trip2026.checklist.v2";
const CK_KEY_V1 = "trip2026.checklist.v1";
function ckLoad(){
  try {
    const v2 = JSON.parse(localStorage.getItem(CK_KEY));
    if (v2 && v2.checks) return v2;
    /* 舊版只存勾選，搬過來 */
    const v1 = JSON.parse(localStorage.getItem(CK_KEY_V1)) || {};
    return { checks:v1, list:null };
  } catch (e) { return { checks:{}, list:null }; }
}
function ckSave(state){
  try { localStorage.setItem(CK_KEY, JSON.stringify(state)); return true; } catch (e) { return false; }
}

if (PAGE === "checklist") {
  const state = ckLoad();
  const checks = state.checks;
  /* 使用者一動結構就複製一份出來改，之後都以這份為準 */
  const list = () => state.list || CHECKLIST;
  const own  = () => { if (!state.list) state.list = JSON.parse(JSON.stringify(CHECKLIST)); return state.list; };
  const newId = p => p + Date.now().toString(36) + Math.random().toString(36).slice(2,5);
  let editing = false;

  /* 資料是三層（區段 → 群組 → 項目），統計要用的只有最底層 */
  const allItems = () => list().flatMap(s => s.groups.flatMap(g => g.items));
  const doneIn = g => g.items.filter(([id]) => checks[id]).length;
  const secTotal = s => s.groups.reduce((a,g) => a + g.items.length, 0);
  const secDone = s => s.groups.reduce((a,g) => a + doneIn(g), 0);

  /* 編輯模式的控制鈕：上、下、改、刪。第一個不能再上、最後一個不能再下。 */
  const ctl = (kind, i, n) => editing ? `<span class="ck-ctl">
      <button type="button" data-act="up"   data-kind="${kind}" ${i === 0 ? "disabled" : ""} aria-label="上移">↑</button>
      <button type="button" data-act="down" data-kind="${kind}" ${i === n-1 ? "disabled" : ""} aria-label="下移">↓</button>
      <button type="button" data-act="edit" data-kind="${kind}" aria-label="修改">✎</button>
      <button type="button" data-act="del"  data-kind="${kind}" aria-label="刪除">✕</button>
    </span>` : "";

  function render(){
    el("ckroot").innerHTML = list().map(s => `
    <section class="ck-sec" data-s="${s.id}">
      <div class="ck-sechead rv in">
        <div class="ck-secline">
          <h2>${esc(s.title)}</h2>
          <span class="ck-seccount" data-seccount="${s.id}"></span>
        </div>
        ${s.note ? `<p class="ck-secnote">${esc(s.note)}</p>` : ""}
        <div class="ck-track ck-sectrack"><i data-secbar="${s.id}" style="width:0%"></i></div>
      </div>
      <div class="ckgrid">
        ${s.groups.map((g,gi) => `
        <section class="ck-group glass rv in${editing ? " editing" : ""}" data-g="${g.id}">
          <div class="ck-head">
            <h3>${esc(g.title)}</h3>
            <span class="ck-headr">
              <span class="ck-count" data-count="${g.id}"></span>
              ${ctl("group", gi, s.groups.length)}
            </span>
          </div>
          ${g.items.map(([id,label,note],ii) => `
            <div class="ck-row" data-item="${id}">
              <label class="ck-item${checks[id] ? " on" : ""}">
                <input type="checkbox" data-id="${id}"${checks[id] ? " checked" : ""}>
                <span class="ck-text">
                  <span class="ck-label">${esc(label)}</span>
                  ${note ? `<span class="ck-note">${esc(note)}</span>` : ""}
                </span>
              </label>
              ${ctl("item", ii, g.items.length)}
            </div>`).join("")}
          ${editing ? `<button type="button" class="ck-add" data-act="additem">＋ 新增項目</button>` : ""}
        </section>`).join("")}
        ${editing ? `<button type="button" class="ck-add ck-addgroup" data-act="addgroup">＋ 新增群組</button>` : ""}
      </div>
    </section>`).join("");
    paint();
  }

  function paint(){
    const all = allItems(), total = all.length;
    const n = all.filter(([id]) => checks[id]).length;
    el("ckbar").style.width = total ? (n / total * 100) + "%" : "0%";
    el("cknum").textContent = `${n}／${total}`;
    el("ckstate").textContent = n === total ? "全部完成" : `還有 ${total - n} 項`;
    list().forEach(s => {
      const st = secTotal(s), sd = secDone(s);
      document.querySelector(`[data-seccount="${s.id}"]`).textContent = `${sd}／${st}`;
      document.querySelector(`[data-secbar="${s.id}"]`).style.width = st ? (sd / st * 100) + "%" : "0%";
      s.groups.forEach(g => {
        document.querySelector(`[data-count="${g.id}"]`).textContent = `${doneIn(g)}／${g.items.length}`;
      });
    });
  }
  render();

  const save = () => { if (!ckSave(state)) el("cknostore").hidden = false; };
  const swap = (arr, i, j) => { [arr[i], arr[j]] = [arr[j], arr[i]]; };

  /* 勾選：只改動當下那一項，不整頁重繪 */
  el("ckroot").addEventListener("change", e => {
    const box = e.target.closest('input[type="checkbox"]');
    if (!box) return;
    const id = box.dataset.id;
    if (box.checked) checks[id] = 1; else delete checks[id];
    box.closest(".ck-item").classList.toggle("on", box.checked);
    save(); paint();
  });

  /* 編輯模式的操作：找到所在的區段／群組／項目，改完整頁重繪 */
  el("ckroot").addEventListener("click", e => {
    const b = e.target.closest("button[data-act]");
    if (!b) return;
    const act = b.dataset.act, kind = b.dataset.kind;
    const L = own();
    const sec = L.find(x => x.id === b.closest(".ck-sec").dataset.s);
    const gEl = b.closest(".ck-group");
    const gi = gEl ? sec.groups.findIndex(x => x.id === gEl.dataset.g) : -1;
    const g = gi >= 0 ? sec.groups[gi] : null;
    const rEl = b.closest(".ck-row");
    const ii = rEl && g ? g.items.findIndex(x => x[0] === rEl.dataset.item) : -1;

    if (act === "addgroup") {
      const t = (prompt("群組名稱") || "").trim(); if (!t) return;
      sec.groups.push({ id:newId("g"), title:t, items:[] });
    } else if (act === "additem") {
      const t = (prompt("項目名稱") || "").trim(); if (!t) return;
      const n = (prompt("備註（可留空）") || "").trim();
      g.items.push([newId("i"), t, n]);
    } else if (kind === "group") {
      if (act === "up")   swap(sec.groups, gi, gi - 1);
      if (act === "down") swap(sec.groups, gi, gi + 1);
      if (act === "edit") { const t = prompt("群組名稱", g.title); if (t === null) return; if (t.trim()) g.title = t.trim(); }
      if (act === "del")  {
        const msg = g.items.length ? `刪除「${g.title}」和裡面的 ${g.items.length} 個項目？` : `刪除「${g.title}」？`;
        if (!confirm(msg)) return;
        g.items.forEach(([id]) => delete checks[id]);
        sec.groups.splice(gi, 1);
      }
    } else if (kind === "item") {
      const it = g.items[ii];
      if (act === "up")   swap(g.items, ii, ii - 1);
      if (act === "down") swap(g.items, ii, ii + 1);
      if (act === "edit") {
        const t = prompt("項目名稱", it[1]); if (t === null) return;
        const n = prompt("備註（可留空）", it[2] || ""); if (n === null) return;
        if (t.trim()) it[1] = t.trim();
        it[2] = n.trim();
      }
      if (act === "del")  { if (!confirm(`刪除「${it[1]}」？`)) return; delete checks[it[0]]; g.items.splice(ii, 1); }
    }
    save(); render();
  });

  el("ckedit").addEventListener("click", () => {
    editing = !editing;
    el("ckedit").textContent = editing ? "完成" : "編輯";
    el("ckedit").classList.toggle("on", editing);
    el("ckrestore").hidden = !editing;
    render();
  });

  el("ckreset").addEventListener("click", () => {
    if (!confirm("確定要清空所有勾選嗎？此動作無法復原。")) return;
    Object.keys(checks).forEach(k => delete checks[k]);
    save();
    document.querySelectorAll('#ckroot input[type="checkbox"]').forEach(b => {
      b.checked = false;
      b.closest(".ck-item").classList.remove("on");
    });
    paint();
  });

  /* 把自己改過的結構丟掉，回到 data.js 的預設清單；勾選保留（同 id 的還會是勾的） */
  el("ckrestore").addEventListener("click", () => {
    if (!state.list) { alert("目前就是預設清單。"); return; }
    if (!confirm("回到預設清單？你新增、修改、刪除、排序過的內容都會消失。")) return;
    state.list = null;
    save(); render();
  });

  /* 開啟時就先探測一次能不能寫入，無痕模式直接提示 */
  save();
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
