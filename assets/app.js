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
  ["shop.html","伴手禮","shop"],
  ["drive.html","開車須知","drive"],
  ["esim.html","網路分析","esim"],
  ["checklist.html","準備清單","checklist"],
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

/* 地圖導航。座標來自 GEO（已逐筆查證），每個有座標的地點都給兩顆按鈕：
   左 Google Maps、右 Apple Maps，兩者都是「從我現在的位置帶我去這裡」。
   兩邊都不寫死起點，路上臨時偏離也還是對的。
   交通方式由類別推定，使用者在 App 裡仍可一鍵改。 */
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
  const mode = travelMode(cat, noDrive);
  return { name,
    gmap:`https://www.google.com/maps/dir/?api=1&destination=${ll}&travelmode=${mode}`,
    amap:`https://maps.apple.com/?daddr=${ll}&dirflg=${APPLE_FLG[mode]}` };
}
/* 兩顆圖示：左 Google、右 Apple。時間軸列、今日導航表、票券、購物、自駕頁共用 */
function geoLink(cat, key, noDrive){
  const u = navUrls(cat, key, noDrive);
  if (!u) return "";
  return `<span class="geo">`
    + `<a class="geo-g" href="${u.gmap}" target="_blank" rel="noopener" aria-label="用 Google 地圖導航至 ${esc(u.name)}">${ICON_G}</a>`
    + `<a class="geo-a" href="${u.amap}" target="_blank" rel="noopener" aria-label="用 Apple 地圖導航至 ${esc(u.name)}">${ICON_A}</a>`
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

/* 一列寫了好幾個地點（用「、」隔開，或「／」並列而不是「→」路線）時只有一個座標，
   列上的按鈕會指不準，所以不掛；這種列請到下方的「今日導航」表找。 */
const multiPlace = place => /、/.test(place) || (/／/.test(place) && !/→/.test(place));

function timePeriod(t){
  const m = String(t).match(/(?:^|[^0-9])([0-2]?[0-9]):([0-5][0-9])/);
  if (!m) return null;
  const hour = +m[1], minute = +m[2], total = hour * 60 + minute;
  return { total, period:hour >= 5 && hour < 12 ? "morning" : hour >= 12 && hour < 18 ? "afternoon" : "night" };
}

function timeline(rows, noDrive){
  return `<ul class="tl">` + rows.map(([t,cat,place,note,fx,geo]) => {
    const tm = timePeriod(t);
    return `
    <li class="${fx?"fx":""}"${tm ? ` data-time-period="${tm.period}" data-time-minutes="${tm.total}"` : ""}>
      <div class="t">${geo && !multiPlace(place) ? geoLink(cat, geo, noDrive) : ""}<span>${esc(t)}</span></div><div class="m"></div>
      <div class="c">
        <div class="p"><span class="cat">${esc(cat)}</span>${esc(place)}</div>
        ${note && note !== "—" ? `<div class="n">${md(note)}</div>` : ""}
      </div>
    </li>`;
  }).join("") + `</ul>`;
}

/* 今日導航：依首次出現順序把當天的地點去重列出。時間與交通方式取首次出現那列，
   所以行為跟原本掛在列上的按鈕一致。
   A／B／C 方案日按區塊分組，不另開一組頁籤——同一頁兩組頁籤會跟時辰表的打架。
   共同區塊的地點只列一次；各方案只列該方案獨有的地點，方案之間不互相吃掉。 */
function dayPlaces(d){
  const hasTabs = d.blocks.some(b => b.tabs);
  const common = new Set();
  d.blocks.forEach(b => { if (!b.tabs) b.rows.forEach(r => r[5] && common.add(r[5])); });

  const groups = [], done = new Set();
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
      b.tabs.forEach(p => {
        const items = pick(p.rows, common);
        if (items.length) groups.push({ label:p.label, items });
      });
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
  if (!groups.length) return "";
  const rows = groups.map(g =>
    (g.label ? `<tr class="navgrp"><td colspan="2">${esc(g.label)}</td></tr>` : "")
    + g.items.map(x => `<tr>
        <td>${esc(x.name)}</td>
        <td class="navg">${geoLink(x.cat, x.key, noDrive)}</td>
      </tr>`).join("")).join("");
  return `<section class="day glass rv">
    <div class="daybox-t">今日導航<span class="daybox-when">多地點的列在這裡點</span></div>
    <table class="navtbl">${rows}</table>
  </section>`;
}

function dayArticle(d){
  const noDrive = noDriveDay(d);
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
           ${timeline(p.rows, noDrive)}
         </div>`; }).join("");
      return `<div class="tabs" role="tablist">${btns}</div>${panels}`;
    }
    return (b.title ? `<div class="block-title">${esc(b.title)}</div>` : "") + timeline(b.rows, noDrive);
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

  ${wx ? `<section class="day glass rv wxcard">
    <div class="daybox-t">天氣預報<a class="daylink" href="weather.html">九天完整預報</a></div>
    ${wx}
  </section>` : ""}

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
      if (!table) { hide(); return; }
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
        window.scrollTo({ top:window.scrollY + top - 104, behavior:"smooth" });
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
    + `<div class="tabs tktabs" role="tablist">${groups.map(([l, xs], i) =>
      `<button role="tab" aria-selected="${i===0}" data-g="tk" data-i="${i}">${l}<em>${xs.length}</em></button>`).join("")}</div>`
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
  /* 有圖的品項放 64px 縮圖，沒有的放品名首字母佔位；圖片 title 帶作者與授權 */
  const CR = Object.fromEntries((SHOP.credits || []).map(([k, f, au, li]) => [k, `${f}　©${au}　${li}`]));
  const pic = (k, name) => k
    ? `<img class="sh-img" src="assets/img/shop/${k}.jpg" width="64" height="64" loading="lazy" alt="${esc(name)}" title="${esc(CR[k] || "Wikimedia Commons")}">`
    : `<span class="sh-img sh-noimg" aria-hidden="true">${esc(name.trim().charAt(0))}</span>`;
  const tbl = rows => `<table class="sh-tbl">${rows.map(([a,b,c,k]) =>
    `<tr><td class="sh-pic">${pic(k, a)}</td><td style="width:27%"><strong>${esc(a)}</strong></td><td>${md(b)}</td><td class="sh-where">${esc(c)}</td></tr>`).join("")}</table>`;
  const grp = (cc, label) => `
    <h2 class="sec-h sh-h rv">${label}</h2>
    <details class="glass rv">
      <summary><span class="s-t">食品與伴手禮</span><span class="s-d">${SHOP[cc].food.length} 項</span></summary>
      <div class="dbody"><div class="scroll">${tbl(SHOP[cc].food)}</div></div>
    </details>
    <details class="glass rv">
      <summary><span class="s-t">藥品與保健</span><span class="s-d">${SHOP[cc].med.length} 項</span></summary>
      <div class="dbody"><div class="scroll">${tbl(SHOP[cc].med)}</div></div>
    </details>`;
  el("shroot").innerHTML = grp("DE","德國") + grp("AT","奧地利");
  el("shstops").innerHTML = `<table>${SHOP.stops.map(([t,pl,w,g]) =>
    `<tr><td style="width:22%"><strong>${esc(t)}</strong></td><td>${esc(pl)}${geoLink("步行", g)}</td><td class="sh-where">${md(w)}</td></tr>`).join("")}</table>`;
  el("shnotes").innerHTML = `<ul class="notes">${SHOP.notes.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${esc(t)}</li>`).join("")}</ul>`
    + `<p class="sh-credit">商品照片：食品多取自 Wikimedia Commons（公有領域或 CC 授權），藥品與部分食品為品牌或網路藥局商品頁的官方商品圖；滑鼠移到圖上可見來源與授權，僅供辨識。${(SHOP.credits || []).map(([k,f,au,li,u]) =>
      `<a href="${esc(u)}" target="_blank" rel="noopener" title="${esc(f)}　©${esc(au)}　${esc(li)}">${esc(k)}</a>`).join("・")}</p>`;
}

/* 開車須知：租車、停車、加油站、與台灣不同的交通法規。
   加油站沒有逐點查證座標，改用 Google Maps 名稱＋地址搜尋連結。 */
if (PAGE === "drive") {
  const li = r => r.map(([l,t]) => `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("");
  const q = s => `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s)}`;
  const D = DRIVE;

  el("drrental").innerHTML = `
    <dl class="kv tkkv dr-kv">${D.rental.kv.map(([k,v]) => `<dt>${esc(k)}</dt><dd>${md(v)}</dd>`).join("")}</dl>
    <ul class="notes">${li(D.rental.notes)}</ul>`;

  el("drpark").innerHTML = `<table>${D.parking.map(([d,pl,fee,how,g]) =>
    `<tr><td style="width:16%"><strong>${esc(d)}</strong></td><td style="width:26%">${esc(pl)}${g ? geoLink("開車", g) : ""}</td><td class="dr-fee">${md(fee)}</td><td>${md(how)}</td></tr>`).join("")}</table>`;

  el("drfuel").innerHTML = `<table>${D.fuel.map(([leg,st,addr,note]) =>
    `<tr><td style="width:24%"><strong>${esc(leg)}</strong></td><td style="width:30%"><a class="fd-a" href="${q(st + " " + addr)}" target="_blank" rel="noopener">${esc(st)}</a><span class="fd-m">${esc(addr)}</span></td><td>${md(note)}</td></tr>`).join("")}</table>`;

  el("drrules").innerHTML = `<table class="dr-rules"><tr><th>項目</th><th>德國</th><th>奧地利</th><th>與台灣不同、要注意</th></tr>${D.rules.map(([k,de,at,tw]) =>
    `<tr><td class="strong">${esc(k)}</td><td>${md(de)}</td><td>${md(at)}</td><td class="dr-tw">${md(tw)}</td></tr>`).join("")}</table>`;

  el("drnotes").innerHTML = `<ul class="notes">${li(D.notes)}</ul>`;
}

/* 網路分析：eSIM 方案比較。這是決策頁，所以結論放最上面，比較表在後面備查。
   全頁只報單人價，因為選方案是個人決定。
   方案依吃到飽／總量型／每日定量分三組——選錯計費型態比選錯平台更痛。 */
if (PAGE === "esim") {
  const E = ESIM;

  el("esconc").innerHTML = `
    <p class="es-k">結論・三種計費型態各一個首選</p>
    <div class="es-picks">${E.pick.map(p => `
      <div class="es-pick${p.best ? " on" : ""}">
        <span class="es-pt">${esc(p.type)}${p.best ? `<em>綜合首選</em>` : ""}</span>
        <p class="es-plan">${esc(p.plan)}</p>
        <div class="tkbig"><b>${esc(p.one)}</b><span>／人</span></div>
        <p class="es-why">${md(p.why)}</p>
      </div>`).join("")}</div>
    <p class="es-asof">價格與合作網路查詢日 ${esc(E.asof)}，一律為單人價；促銷與方案內容隨時會變，購買前以各平台結帳頁為準。</p>`;

  /* 方案比較表：每個計費型態一張表，表下接該型態的總結。
     方案名稱本身就是購買連結（buy[0] 的平台名不顯示，留在資料裡備用）。
     評分是本次行程的加權判斷，不是平台星等——依據寫在表格上方。
     每個 td 都帶 data-l 欄名：窄螢幕把表格攤成卡片時，欄頭列會藏起來，
     改由 CSS 的 ::before 把 data-l 印在每個值前面。 */
  el("esplans").innerHTML = `<p class="sub rv es-how">${md(E.scorehow)}</p>`
    + E.groups.map(g => {
    const dcol = g.type === "吃到飽" ? "是否降速" : "流量";
    return `
    <h3 class="es-gh rv">${esc(g.type)}<span>${g.rows.length} 個方案</span></h3>
    <div class="glass rv sh-stops es-tw" style="margin-top:0"><div class="scroll"><table class="es-t">
      <tr><th>方案</th><th>評分</th><th>單人價</th><th>${dcol}</th><th>可用網路</th><th>熱點</th><th>通話</th></tr>
      ${g.rows.map(r => `<tr${r.pick ? ` class="on"` : ""}>
        <td class="strong"><a class="es-buy-a" href="${esc(r.buy[1])}" target="_blank" rel="noopener">${esc(r.name)}</a>${r.pick ? `<em class="es-tag">本組首選</em>` : ""}
          <span class="es-vd">${esc(r.verdict)}</span></td>
        <td class="es-sc" data-l="評分">${r.score}</td>
        <td class="dr-fee" data-l="單人價">${esc(r.price)}</td>
        <td data-l="${dcol}">${esc(r.data)}</td>
        <td data-l="可用網路"><ul class="es-net">${r.net.map(t => `<li>${esc(t)}</li>`).join("")}</ul></td>
        <td class="es-ox" data-l="熱點">${esc(r.hotspot)}</td>
        <td class="es-ox" data-l="通話">${esc(r.call)}</td>
      </tr>`).join("")}
    </table></div></div>
    <p class="es-sum rv"><b>總結</b>${md(g.sum)}</p>`; }).join("")
    + `<p class="es-legend rv">${md(E.legend)}</p>`;

  el("escallnote").innerHTML = `<p class="tkwarn">${md(E.callnote)}</p>`;

  el("escost").innerHTML = `<table><tr><th>方案</th><th>單人價</th><th>適合情境</th></tr>`
    + E.cost.map(([p,one,who]) =>
      `<tr><td class="strong">${esc(p)}</td><td class="dr-fee">${esc(one)}</td><td>${esc(who)}</td></tr>`).join("") + `</table>`;

  el("escarrier").innerHTML = E.carriers.map(c => `
    <article class="card glass rv es-car">
      <h4>${esc(c.cc)}</h4>
      <ol class="es-rank">${c.rank.map(r => `<li>${esc(r)}</li>`).join("")}</ol>
      <p>${md(c.note)}</p>
      <p>${md(c.note2)}</p>
      <p class="es-src">${md(c.src)}</p>
    </article>`).join("");

  /* 官方覆蓋數據：說明 → 兩塊判讀 → 道路表 → 對本次行程的結論 → 保留條款 */
  el("escover").innerHTML = `
    <p class="sub rv" style="margin:0 0 18px">${md(E.cover.how)}</p>
    <div class="cards">${E.cover.blocks.map(b => `
      <article class="card glass rv es-car">
        <h4>${esc(b.h)}</h4>
        ${b.points.map(t => `<p>${md(t)}</p>`).join("")}
      </article>`).join("")}</div>
    <p class="sub rv" style="margin:22px 0 10px">${md(E.cover.road.note)}</p>
    <div class="glass rv sh-stops" style="margin-top:0"><div class="scroll"><table>
      <tr>${E.cover.road.head.map(h => `<th>${esc(h)}</th>`).join("")}</tr>
      ${E.cover.road.rows.map(r => `<tr><td class="strong">${esc(r[0])}</td>`
        + r.slice(1).map(c => `<td>${esc(c)}</td>`).join("") + `</tr>`).join("")}
    </table></div></div>
    <ul class="notes rv" style="margin-top:22px">${E.cover.concl.map(t => `<li>${md(t)}</li>`).join("")}</ul>
    <p class="tkwarn rv" style="margin-top:18px">${md(E.cover.caveat)}</p>
    <p class="es-src rv">${E.cover.src.map(s => md(s)).join("　")}</p>`;

  el("esdetail").innerHTML = E.detail.map(d => `
    <details class="glass rv">
      <summary><span class="s-t">${esc(d.name)}</span><span class="s-d">${esc(d.tag)}</span></summary>
      <div class="dbody"><ul class="notes">${d.points.map(t => `<li>${md(t)}</li>`).join("")}</ul></div>
    </details>`).join("");

  el("escheck").innerHTML = `<ul class="notes">${E.check.map(([l,t]) =>
    `<li><b class="lbl">${esc(l)}</b>${md(t)}</li>`).join("")}</ul>`;
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
