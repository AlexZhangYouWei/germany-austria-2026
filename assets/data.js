/* ==========================================================================
   資料區 — 全部取自 德奧旅行_行程總檔.md，改行程只需改動這一段
   時間軸列格式：[時間, 類別, 地點, 備註, 是否固定時間]
   ========================================================================== */

/* 總檔 1. 旅行基本資料 */
const FACTS = [
  ["日期","2026/10/05（一）－10/13（二），9 天 8 夜"],
  ["人數","4 位成人"],
  ["進出點","慕尼黑機場 MUC 第一航廈"],
  ["路線","慕尼黑 → 米滕瓦爾德 → 因斯布魯克 → 薩爾斯堡 → 國王湖／比紹夫斯維森 → 哈修塔特 → 慕尼黑"],
  ["住宿","6 筆、共 8 晚，日期連續無缺口"],
];


/* 小費：2025 年德語區調查與旅遊指南的共通區間。兩國比例其實相同，差別在「怎麼給」與
   咖啡館文化——奧地利點單金額直接報總額、現金為主；德國卡機跳建議金額的情況變多。
   查詢日 2026-09-23；金額是慣例不是義務，德奧都沒有強制小費。 */
const TIPS = {
  rows: [
    ["餐廳、啤酒館",  "5–10%",        "5–10%"],
    ["咖啡館、小吃",  "湊整數或 €0.5–1", "湊整數；正式咖啡館可到 10%"],
    ["計程車",        "湊整到下一個整數；長程 5–10%", "短程湊整；一般 5–10%"],
    ["飯店房務",      "每晚 €1–2",    "每晚 €1–2"],
    ["行李搬運",      "每件 €1–2",    "每件 €1–2"]
  ],
  how: [
    ["結帳時報總額", "帳單 €27 就說「**30**」，找零就是小費。**不要把錢留桌上**走人。"],
    ["盡量給現金",   "現金**直接進服務生口袋**。德國卡機常跳建議比例，**可以跳過**改給現金。"],
    ["不是義務",     "帳單**已含稅與服務成本**，德奧都沒有強制小費，**服務不好可以不給**。"]
  ],
  foot: "查詢日 2026-09-23。比例為 2025 年調查與旅遊指南的共通區間，非官方規定。"
};

const FLIGHTS = [
  { label:"去程", legs:[
    { code:"CX479", date:"10/04（日）", path:"台北 TPE → 香港 HKG", time:"21:05 – 23:05", dur:"2 小時",
      side:["A330-300","抵港後轉機 1 小時 55 分"] },
    { code:"CX301", date:"10/05（一）", path:"香港 HKG → 慕尼黑 MUC", time:"01:00 – 08:05", dur:"13 小時 5 分",
      side:["A350-900","第一航廈抵達"] }
  ]},
  { label:"回程", legs:[
    { code:"CX300", date:"10/13（二）", path:"慕尼黑 MUC → 香港 HKG", time:"13:50 – 10/14 06:50", dur:"11 小時",
      side:["A350-900","抵港後轉機 1 小時 20 分"] },
    { code:"CX564", date:"10/14（三）", path:"香港 HKG → 台北 TPE", time:"08:10 – 10:00", dur:"1 小時 50 分",
      side:["777-300","抵達桃園第一航廈"] }
  ]}
];

const STAYS = [
  { city:"慕尼黑", date:"10/05 – 10/06", nights:1,
    name:"Munich Top Place Nähe Marienplatz mit 2 Schlafzimmer 70 qm Apartment Jennifer",
    addr:"Sonnenstraße 3 Etage 2, Altstadt-Lehel, 80331 München",
    mapUrl:"https://maps.app.goo.gl/CHofehMQPcv4XWYd7",
    room:"整間雙臥室公寓", inn:"16:00 – 00:00", out:"10:00 前", wash:true, kit:true,
    notes:["10/05 11:00 起可先寄放行李"],
    confirm:{ when:"抵達前查看 Booking 訊息", who:"Booking 訂單內聯絡住宿方",
      steps:["門碼何時提供","11:00 寄放行李方式","16:00 後如何自行入住"],
      status:"門碼自助入住，不需現場接待" } },
  { city:"米滕瓦爾德", date:"10/06 – 10/08", nights:2,
    name:"Mittenwald-Ferien", addr:"Mühlenweg 36–38, 82481 Mittenwald",
    mapUrl:"https://maps.app.goo.gl/SfZtapC3ANfqKZyz6",
    room:"三臥室公寓（山景公寓 2）", inn:"16:00 – 00:00", out:"09:00 前", wash:false, kit:true,
    confirm:{ when:"抵達前完成旅客登記；抵達前約 1 小時致電，若 16:00 抵達最晚 15:00 聯絡",
      who:"Fam. Sprenger", tel:"+49 151 173 550 99", dial:"+4915117355099",
      steps:["使用 Deskline 登記全部旅客資料，或以 Email 提供","電話告知預計抵達時間","確認鑰匙與現場入住方式"],
      status:"需事前登記，並於抵達前約 1 小時致電" } },
  { city:"薩爾斯堡", date:"10/08 – 10/10", nights:2,
    name:"In the heart of the city of Salzburg", addr:"Bürglsteinstraße 19, 5020 Salzburg",
    room:"四人房（兩臥室，各 1 張雙人床）", inn:"14:00 起", out:"10:00 前", wash:true, kit:null,
    notes:["地址在舊城限制區外緣，不要開車進入行人舊城","兩晚以步行或公車進舊城"],
    confirm:{ when:"抵達前幾天聯絡", who:"Michel Seyfried", tel:"+43 676 884001213", dial:"+43676884001213",
      steps:["告知預計抵達時間","約定實際 Check-in 時間","確認現場領鑰匙位置","確認停車方式","確認 Guest Mobility Ticket 如何取得"],
      status:"14:00 起入住；需到住宿現場領取鑰匙" } },
  { city:"比紹夫斯維森", date:"10/10 – 10/11", nights:1,
    name:"Ferienhaus Gestüt Pfaffenlehen", addr:"Pfaffenlehen 6, 83483 Bischofswiesen",
    mapUrl:"https://maps.app.goo.gl/aw3oAPZnbiNEqEdd7", mapName:"House riding Pfaffenlehen",
    room:"獨立房屋（三臥室）", inn:"17:00 – 22:00", out:"08:00 – 10:00", wash:true, kit:true,
    notes:["鄉間獨立住宅"],
    confirm:{ when:"10/10 抵達當天聯絡，告知大約抵達時間", who:"管理員 Grygoriev-Kotynskyi 先生", tel:"+49 160 91481273", dial:"+4916091481273",
      steps:["告知預計抵達時間","確認碰面及接待方式","確認鑰匙與停車位置"],
      status:"17:00–22:00 入住；管理員會在住宿現場接待" } },
  { city:"哈修塔特", date:"10/11 – 10/12", nights:1,
    name:"Hallberg Apartments 哈爾貝格公寓", addr:"Seestraße 113, 4830 Hallstatt",
    mapUrl:"https://maps.app.goo.gl/1ZLyto7NpZ7NQ69P9", mapName:"Pension - Hallberg",
    room:"2 間客房（湖景雙人房＋湖景單房公寓）", inn:"15:00 – 18:00", out:"08:00 – 10:00", wash:false, kit:null,
    notes:["入住與離開均須至 Hotel-Shuttle Info-Point 辦理接駁","不可直接開車進入住宿所在舊城"],
    confirm:{ when:"10/11 抵達當天查看保險箱密碼；15:00 起入住", who:"Tamara & Igor／透過訂房訊息聯絡",
      steps:["當天接收鑰匙保險箱密碼","P1 停車後可搭 09:00–19:00 接駁車；P2 步行約 10 分鐘","準備現金支付城市稅：每人每晚 €3","退房時將鑰匙放回保險箱"],
      status:"自助入住；15:00 起鑰匙會放在保險箱，不需現場接待；10:00 前退房" } },
  { city:"慕尼黑", date:"10/12 – 10/13", nights:1,
    name:"Motel One München-Hauptbahnhof", addr:"Schillerstraße 3–3a, 80336 München",
    mapUrl:"https://maps.app.goo.gl/Uq4aRzbAwWSCKAod7",
    room:"2 間客房", inn:"15:00 – 00:00", out:"12:00 前", wash:false, kit:false,
    confirm:{ when:"入住時向櫃檯確認", who:"Motel One 飯店櫃檯",
      steps:["辦理一般櫃檯 Check-in","確認合作停車場入口與限高","確認隔夜費用","確認 10/13 清晨能否取車"],
      status:"15:00–00:00 櫃檯入住" } }
];

/* 當天要聯絡住宿的提醒：day 是行程日、stay 是 STAYS 的索引；聯絡人與電話直接從 STAYS[stay].confirm 取。
   Motel One 是櫃檯入住，不列。 */
const STAY_NOTIFY = [
  { day:1, stay:0, when:"抵達前", act:"查看 Booking 訊息取得門碼；11:00 起可先寄放行李，16:00 後自行入住。" },
  { day:2, stay:1, when:"約 15:20（抵達前 1 小時）", act:"致電告知預計抵達時間（行程 16:20 到），確認鑰匙與現場入住方式。若提早到 16:00，最晚 15:00 要打。Deskline 旅客登記應已在出發前完成。" },
  { day:3, stay:2, when:"今天，最晚明早", act:"電話或訊息聯絡明天 10/08 薩爾斯堡房東：告知預計抵達時間、約定 check-in 時間、確認領鑰匙位置、停車方式與 Guest Mobility Ticket 如何取得。" },
  { day:4, stay:2, when:"抵達前 30 分", act:"依昨天約好的時間到住宿現場領鑰匙；路上延誤先傳訊息。" },
  { day:6, stay:3, when:"今天出發後、16:30 前", act:"致電管理員告知大約抵達時間（17:00 固定入住），確認碰面方式、鑰匙與停車位置。" },
  { day:7, stay:4, when:"15:00 前", act:"查看 Booking 訊息取得鑰匙保險箱密碼；需要時透過訂房訊息聯絡。準備城市稅現金每人每晚 €3（4 人 €12）；退房把鑰匙放回保險箱。" },
];

/* 地圖座標對照。2026-09-20 以 OpenStreetMap Nominatim 逐筆查證，落點超出預期範圍者已剔除；
   部分點（艾布湖纜車站、因斯布魯克 Congress、聖科洛曼、國王湖碼頭）沿用路線圖已驗證過的
   行車航點。時間軸列的第 6 個元素填這裡的 key，沒填就不產生地圖連結。 */
const GEO = {
  // 住宿
  "muc-stay1":["Munich Top Place（Sonnenstraße 3）","48.13840,11.56602"],
  "mit-stay":["Mittenwald-Ferien（Mühlenweg 36）","47.43493,11.26288"],
  "szg-stay":["In the heart of the city of Salzburg（Bürglsteinstraße 19）","47.79909,13.06290"],
  "bis-stay":["Ferienhaus Gestüt Pfaffenlehen","47.67516,12.93290"],
  "hal-stay":["Hallberg Apartments（Seestraße 113）","47.56135,13.64889"],
  "muc-stay2":["Motel One München-Hauptbahnhof","48.13881,11.56127"],
  // 交通與停車
  "muc-t1":["慕尼黑機場","48.35396,11.77859"],
  "sixt-stachus":["SIXT 慕尼黑卡爾廣場店（Karlsplatz 3）","48.13989,11.56698"],
  "muc-hbf":["慕尼黑中央車站","48.14073,11.55694"],
  "karlsplatz":["卡爾廣場 Karlsplatz Stachus","48.13949,11.56562"],
  "nsw-p4":["新天鵝堡 P4 停車場","47.55453,10.73568"],
  "eibsee-park":["艾布湖／楚格峰纜車停車場","47.45770,10.97970"],
  "gap-olympia":["奧林匹克滑雪體育場停車場","47.48151,11.11765"],
  "inn-congress":["因斯布魯克 Congress／Altstadtgarage","47.27020,11.39360"],
  "inn-hbf":["因斯布魯克中央車站","47.26330,11.40102"],
  "koe-park":["國王湖停車場","47.59182,12.98953"],
  "hal-p1":["哈修塔特 P1 停車場（Hotel-Shuttle Info-Point 在入口旁）","47.55257,13.64824"],
  // 慕尼黑
  "asamkirche":["阿桑教堂 Asamkirche","48.13521,11.56952"],
  "marienplatz":["瑪利亞廣場 Marienplatz","48.13714,11.57540"],
  "viktualienmarkt":["維克圖阿連市場 Viktualienmarkt","48.13533,11.57622"],
  "frauenkirche":["聖母教堂 Frauenkirche","48.13858,11.57359"],
  "augustiner-keller":["奧古斯丁啤酒花園 Augustiner-Keller","48.14350,11.55157"],
  "neuhauser":["新豪瑟街 Neuhauser Straße","48.13860,11.56852"],
  "st-michael":["聖彌額爾教堂 St. Michael（Neuhauser Straße 6）","48.13893,11.57042"],   // 2026-09-23 Nominatim
  "dm-stachus":["dm 藥妝店（Karlsplatz 25，Stachus Passagen 地下層）","48.13969,11.56455"],
  "ludwigs-apotheke":["國際路德維希藥局 Internationale Ludwigs-Apotheke（Neuhauser Str. 11）","48.13824,11.57045"],
  // 新天鵝堡周邊
  "marienbruecke":["瑪麗安橋 Marienbrücke","47.55496,10.74940"],
  "neuschwanstein":["新天鵝堡 Schloss Neuschwanstein","47.55755,10.74970"],
  "alpsee":["阿爾卑斯湖 Alpsee","47.54896,10.72132"],
  "hohenschwangau":["霍恩施萬高村 Hohenschwangau（Alpseestraße）","47.55519,10.73948"],
  "st-coloman":["聖科洛曼教堂 St. Coloman","47.57160,10.76140"],
  // 米滕瓦爾德與加米施
  "obermarkt":["上市場街 Obermarkt","47.44087,11.26029"],
  "mit-apotheke":["米滕瓦爾德車站藥局 Bahnhof-Apotheke","47.44022,11.26542"],
  "zugspitze":["楚格峰 Zugspitze","47.42121,10.98630"],
  "eibsee":["艾布湖 Eibsee","47.45825,10.97084"],
  "partnachklamm":["帕特納赫峽谷 Partnachklamm","47.46465,11.12212"],
  "ludwigstrasse":["路德維希大街 Ludwigstraße","47.49484,11.10957"],
  // 因斯布魯克與拉滕貝格
  "hungerburgbahn":["飢餓堡纜車 Hungerburgbahn（Station Congress）","47.27283,11.39576"],
  "seegrube":["澤格魯貝 Seegrube","47.30746,11.37866"],
  "hafelekar":["哈菲勒卡峰 Hafelekar","47.31674,11.39331"],
  "goldenes-dachl":["黃金屋頂 Goldenes Dachl","47.26857,11.39328"],
  "rattenberg":["拉滕貝格 Rattenberg 老城","47.43928,11.89224"],
  // 薩爾斯堡
  "makartplatz":["馬卡特廣場 Makartplatz","47.80295,13.04388"],
  "staatsbruecke":["薩爾察赫河 主橋 Staatsbrücke","47.80131,13.04481"],
  "mozartsteg":["莫札特橋 Mozartsteg","47.79983,13.04901"],
  "mirabell":["米拉貝爾花園 Mirabellgarten","47.80466,13.04164"],
  "getreidegasse":["糧食胡同 Getreidegasse","47.80002,13.04233"],
  "mozart-haus":["莫札特出生地 Mozarts Geburtshaus","47.79994,13.04355"],
  "residenzplatz":["主教宮廣場 Residenzplatz","47.79852,13.04615"],
  "festungsbahn":["城堡纜車山下站 FestungsBahn","47.79642,13.04603"],
  "hohensalzburg":["薩爾斯堡要塞 Festung Hohensalzburg","47.79521,13.04810"],
  "salzburger-dom":["主教座堂 Salzburger Dom","47.79785,13.04662"],
  // 國王湖與貝希特斯加登
  "koe-seelaende":["國王湖碼頭 Seelände","47.58803,12.98884"],
  "salet":["薩雷特 Salet","47.52101,12.97492"],
  "obersee":["上湖 Obersee","47.51598,12.98790"],
  "malerwinkel":["畫家角 Malerwinkel","47.58277,12.99278"],
  "hintersee":["辛特湖 Hintersee","47.60653,12.85375"],
  // 哈修塔特與基姆湖
  "hal-marktplatz":["哈修塔特市集廣場 Marktplatz","47.56240,13.64905"],
  "salzwelten-tal":["哈修塔特鹽礦纜車山下站","47.55607,13.64529"],
  "salzwelten":["哈修塔特鹽礦 Salzwelten","47.56202,13.63927"],
  "skywalk":["哈修塔特天空步道 Welterbeblick","47.56120,13.64353"],
  "prien":["普里恩 Prien am Chiemsee","47.85417,12.34555"],
};

/* Google Maps／Apple Maps 地點查詢字串。2026-09-23 逐筆以兩個地圖網站核對；
   不再只把裸座標交給地圖服務，避免被自動吸附到附近的店家、門牌或設施。
   查詢字串刻意保留當地正式名稱與地址；兩個平台都會直接開啟相符的地點資訊卡。 */
const MAP_QUERY = {
  // 住宿
  "muc-stay1":"Munich Top Place Nähe Marienplatz Apartment Jennifer, Sonnenstraße 3, 80331 München",
  "mit-stay":"mittenwald-ferien.de, Mühlenweg 36, 82481 Mittenwald",
  "szg-stay":"Bürglsteinstraße 19, 5020 Salzburg",
  "bis-stay":"House riding Pfaffenlehen, Pfaffenlehen 6, 83483 Bischofswiesen",
  "hal-stay":"Pension Hallberg, Seestraße 113, 4830 Hallstatt",
  "muc-stay2":"Hotel Motel One München-Hauptbahnhof, Schillerstraße 3-3a, 80336 München",
  // 交通與停車
  "muc-t1":"Terminal 1, Flughafen München, 85356 München-Flughafen",
  "sixt-stachus":"SIXT Autovermietung München Stachus, Karlsplatz 3, 80335 München",
  "muc-hbf":"München Hauptbahnhof",
  "karlsplatz":"Karlsplatz Stachus, München",
  "nsw-p4":"Parkplatz P4, Alpseestraße 27, 87645 Hohenschwangau",
  "eibsee-park":"Parkplatz Eibsee-Seilbahn Zugspitze, Am Eibsee, 82491 Grainau",
  "gap-olympia":"Parkplatz P21 Olympia-Skistadion, Karl-und-Martin-Neuner-Platz, Garmisch-Partenkirchen",
  "inn-congress":"Congress Garage, Rennweg 3, 6020 Innsbruck",
  "inn-hbf":"Innsbruck Hauptbahnhof",
  "koe-park":"Parkplatz Königssee, Jennerbahnstraße, 83471 Schönau am Königssee",
  "hal-p1":"Parkplatz P1 Hallstatt, Salinenplatz 4, 4830 Hallstatt",
  // 慕尼黑
  "asamkirche":"Asamkirche, Sendlinger Straße 32, 80331 München",
  "marienplatz":"Marienplatz, 80331 München",
  "viktualienmarkt":"Viktualienmarkt, 80331 München",
  "frauenkirche":"Frauenkirche, Frauenplatz 1, 80331 München",
  "augustiner-keller":"Augustiner-Keller, Arnulfstraße 52, 80335 München",
  "neuhauser":"Neuhauser Straße, München",
  "st-michael":"St. Michael, Neuhauser Straße 6, 80333 München",
  "dm-stachus":"dm-drogerie markt, Karlsplatz 25, 80335 München",
  "ludwigs-apotheke":"Internationale Ludwigs-Apotheke, Neuhauser Straße 11, 80331 München",
  // 新天鵝堡周邊
  "marienbruecke":"Marienbrücke, 87645 Schwangau",
  "neuschwanstein":"Schloss Neuschwanstein, Neuschwansteinstraße 20, 87645 Schwangau",
  "alpsee":"Alpsee, 87645 Schwangau",
  "hohenschwangau":"Hohenschwangau, Alpseestraße, 87645 Schwangau",
  "st-coloman":"St. Coloman, Colomanstraße 1, 87645 Schwangau",
  // 米滕瓦爾德與加米施
  "obermarkt":"Obermarkt, 82481 Mittenwald",
  "mit-apotheke":"Bahnhof-Apotheke, Bahnhofplatz 10, 82481 Mittenwald",
  "zugspitze":"Zugspitze",
  "eibsee":"Eibsee, 82491 Grainau",
  "partnachklamm":"Partnachklamm, 82467 Garmisch-Partenkirchen",
  "ludwigstrasse":"Ludwigstraße, 82467 Garmisch-Partenkirchen",
  // 因斯布魯克與拉滕貝格
  "hungerburgbahn":"Hungerburgbahn Station Congress, Rennweg 3, 6020 Innsbruck",
  "seegrube":"Seegrube, Innsbruck",
  "hafelekar":"Hafelekar, Innsbruck",
  "goldenes-dachl":"Goldenes Dachl, Herzog-Friedrich-Straße 15, 6020 Innsbruck",
  "rattenberg":"Rattenberg Altstadt, 6240 Rattenberg, Tirol",
  // 薩爾斯堡
  "makartplatz":"Makartplatz, 5020 Salzburg",
  "staatsbruecke":"Staatsbrücke, 5020 Salzburg",
  "mozartsteg":"Mozartsteg, 5020 Salzburg",
  "mirabell":"Mirabellgarten, Mirabellplatz 3, 5020 Salzburg",
  "getreidegasse":"Getreidegasse, 5020 Salzburg",
  "mozart-haus":"Mozarts Geburtshaus, Getreidegasse 9, 5020 Salzburg",
  "residenzplatz":"Residenzplatz, 5020 Salzburg",
  "festungsbahn":"FestungsBahn Talstation, Festungsgasse 4, 5020 Salzburg",
  "hohensalzburg":"Festung Hohensalzburg, Mönchsberg 34, 5020 Salzburg",
  "salzburger-dom":"Salzburger Dom, Domplatz 1a, 5020 Salzburg",
  // 國王湖與貝希特斯加登
  "koe-seelaende":"Seelände Königssee, Bayerische Seenschifffahrt, 83471 Schönau am Königssee",
  "salet":"Salet, Königssee, 83471 Schönau am Königssee",
  "obersee":"Obersee, 83471 Schönau am Königssee",
  "malerwinkel":"Malerwinkel, Königssee, 83471 Schönau am Königssee",
  "hintersee":"Hintersee, 83486 Ramsau bei Berchtesgaden",
  // 哈修塔特與基姆湖
  "hal-marktplatz":"Marktplatz, 4830 Hallstatt",
  "salzwelten-tal":"Salzwelten Hallstatt, Salzbergstraße 21, 4830 Hallstatt",
  "salzwelten":"Salzwelten Hallstatt Salzbergwerk, Salzberg 21, 4830 Hallstatt",
  "skywalk":"Hallstatt Skywalk Welterbeblick, Salzberg, 4830 Hallstatt",
  "prien":"Prien am Chiemsee",
};

const DAYS = [
{
  n:1, date:"10/05（一）", title:"抵達慕尼黑、老城適應日",
  meta:["住宿 Munich Top Place","交通 機場線＋步行","無自駕"],
  blocks:[{ rows:[
    ["08:05–09:45","航班／入境","慕尼黑機場第一航廈","CX301 抵達，入境、領行李與網路設定。08:05 是落地時間，不是可離開機場的時間",1,"muc-t1",
      { tags:["CX301","08:05 落地"], stops:[["muc-t1","慕尼黑機場第一航廈","Nordallee 25"]] }],
    ["09:45–11:15","機場線／寄放行李","機場 → 卡爾廣場站 Karlsplatz Stachus → Munich Top Place（Sonnenstraße 3）","**S1 或 S8 先來先上**，約 45 分到卡爾廣場，出站步行 3 分。**11:00 起可寄放行李**，確認 16:00 入住方式。備案：中央車站 DB 置物櫃（小 €4／大 €6，**只收硬幣**）",0,"muc-stay1",
      { title:"前往市區並寄放行李", tags:["S1 或 S8・約 45 分鐘"], stops:[
        ["karlsplatz","卡爾廣場站 Karlsplatz (Stachus)","Karlsplatz"],
        ["muc-stay1","Munich Top Place","Sonnenstraße 3"]] }],
    ["11:15–12:15","景點","阿桑教堂 Asamkirche、瑪利亞廣場 Marienplatz、新市政廳","阿桑教堂約 25 分，走到瑪利亞廣場看 **12:00 鐘琴報時**",0,"marienplatz",
      { title:"阿桑教堂 → 瑪利亞廣場", tags:["12:00 鐘琴報時"], stops:[
        ["asamkirche","阿桑教堂 Asamkirche","Sendlinger Straße 32"],
        ["marienplatz","瑪利亞廣場 Marienplatz","Marienplatz 8（新市政廳）"]] }],
    ["12:15–13:15","午餐／市場","維克圖阿連市場 Viktualienmarkt","散步與午餐",0,"viktualienmarkt",
      { aside:"散步與午餐", stops:[["viktualienmarkt","維克圖阿連市場 Viktualienmarkt","Viktualienmarkt 3"]] }],
    ["13:15–16:00","景點／自由活動","聖母教堂 Frauenkirche、聖彌額爾教堂、老城街區、卡爾廣場咖啡與藥妝店","**dm** 在 Karlsplatz 25（Stachus Passagen 地下層），**Müller**、**Rossmann** 同一條步行街，週一**營業至 20:00**。依飛行疲勞縮短；**16:00 回住宿正式入住、休息**",0,"dm-stachus",
      { title:"慕尼黑舊城散步", tags:["16:00 回住宿辦理入住"], stops:[
        ["frauenkirche","聖母教堂 Frauenkirche","Frauenplatz 1"],
        ["st-michael","聖彌額爾教堂 St. Michael","Neuhauser Straße 6"],
        ["neuhauser","老城步行街","Neuhauser Straße"],
        ["dm-stachus","dm 藥妝店","Karlsplatz 25"]] }],
    ["17:40–20:00","晚餐","奧古斯丁啤酒花園 Augustiner-Keller","**18:30 已預約**。住宿步行 1.5 km 約 20 分：Sonnenstraße 接 Bayerstraße 經中央車站，沿 Arnulfstraße 到 52 號；不想走可搭 S-Bahn 一站到 Hauptbahnhof 再步行 8 分",1,"augustiner-keller",
      { tags:["18:30 已預約"], stops:[["augustiner-keller","奧古斯丁啤酒花園 Augustiner-Keller","Arnulfstraße 52"]] }],
    ["20:00–20:40","採買","慕尼黑中央車站 EDEKA Ernst","S-Bahn 轉乘層（Arnulfstraße 2），**營業至 23:00**。飲水、早餐與隔日車程補給",0,"muc-hbf",
      { title:"中央車站 EDEKA 採買", tags:["營業至 23:00"], stops:[["muc-hbf","EDEKA Ernst","Arnulfstraße 2"]] }],
    ["20:40–21:15","散步","卡爾廣場 Karlsplatz、步行街","夜間散步後返回住宿。當晚確認 SIXT 電子確認單、4 人證件、10/06 城堡票 QR code",0,"karlsplatz",
      { title:"卡爾廣場夜間散步", stops:[["karlsplatz","卡爾廣場 Karlsplatz","Karlsplatz"]] }]
  ]}],
  notes:[["雨天","老城步行縮短，改以咖啡館、教堂與室內商店為主。"]]
},
{
  n:2, date:"10/06（二）", title:"慕尼黑 → 新天鵝堡 → 米滕瓦爾德", km:"202.7 km／約 3 小時 15 分",
  meta:["住宿 Mittenwald-Ferien","交通 自駕","體力 中高"],
  blocks:[{ rows:[
    ["06:30–07:50","住宿／租車","慕尼黑住宿 → SIXT 慕尼黑卡爾廣場店（Karlsplatz 3）","早餐、退房，步行 4 分到 SIXT，**07:00 取車**。櫃台確認：租約已登記奧地利跨境與第二駕駛（兩位駕駛都到場）、燃油政策、冬胎、Vignette；押金凍結 €500。地下停車場拍車四面、輪圈、玻璃、里程、油量。回住宿裝行李，**07:50 出發**",0,"sixt-stachus"],
    ["07:50–09:40","移動","慕尼黑住宿 → 新天鵝堡 P4 停車場","**07:50** 出發 → 車程 1 小時 50 分 → **09:40** 到 Parkplatz P4。P4 滿依序改 P1、P2、P3，都在同一村內",0,"nsw-p4"],
    ["09:40–11:00","接駁／景點","P4 → 瑪麗安橋 Marienbrücke","停車、洗手間、備票，車內不留外露行李。10:00 在 P4 搭接駁巴士上山，下車步行 5 分到橋。巴士停駛或久候改步行；橋關閉直接去城堡",0,"marienbruecke"],
    ["11:00–11:45","步行／集合","瑪麗安橋 → 新天鵝堡入口","陡下坡 15 分。**11:30 前必須抵達入口**，集合等候",0,"neuschwanstein"],
    ["11:45–12:20","城堡導覽","新天鵝堡 Neuschwanstein，Tour 445","**11:45 固定入場**，4 張成人票已購買",1,"neuschwanstein"],
    ["12:20–14:00","下山／午餐","霍恩施萬高 Hohenschwangau 山腳","步行下山約 30–40 分。午餐優先；阿爾卑斯湖 Alpsee 就在 P4 旁，不必移車，看一眼即走。13:45 回 P4 整理，**14:00 開車**",0,"hohenschwangau"],
    ["14:00–14:40","景點","聖科洛曼教堂 St. Coloman","**14:00** P4 出發 → 車程 20 分 → **14:20** 到，順路。只拍外觀與草原山景，不等內部開放，**14:40 開車**",0,"st-coloman"],
    ["14:40–16:20","移動","聖科洛曼教堂 → Mittenwald-Ferien（Mühlenweg 36–38）","**14:40** 出發 → 車程 1 小時 40 分 → **16:20** 到。山路施工依導航改道；**約 15:20 致電住宿 Fam. Sprenger** 告知預計抵達時間",0,"mit-stay"],
    ["16:20–19:30","住宿／古城／晚餐","Mittenwald-Ferien → 上市場街 Obermarkt、聖彼得與保羅教堂","16:00 後可入住，先確認指定車位、放行李，17:00 出門。彩繪屋、老街晚餐、超市。**超市營業至 20:00**：Netto City 就在 Obermarkt；EDEKA Gschwendtner 與住宿同在 Mühlenweg。可依體力縮短；20:00 初判隔日山區天候",0,"obermarkt"]
  ]}],
  notes:[["取消條件","城堡本身照票面執行；瑪麗安橋、阿爾卑斯湖散步可因天候取消。"]]
},
{
  n:3, date:"10/07（三）", title:"米滕瓦爾德山區天候決策日", km:"A 58.8 km／B 36.5 km／C 0–6 km",
  meta:["住宿 Mittenwald-Ferien（續住）","決策 前一晚 20:00 初判、當日 07:00 最終決定"],
  check:{
    title:"楚格峰天候確認", sub:"4 個來源都看過再決定",
    when:"07:00–07:30",
    lead:"四項都確認過再決定走哪個方案。**不在確認天候前購買高山票券**，官方明示天候不佳不退改。",
    items:[
      ["峰頂鏡頭朝北","https://www.foto-webcam.eu/webcam/zugspitze-nord/",
       "架在楚格峰頂 2962 m 往北拍艾布湖與加米施谷地。左上角直接顯示氣溫、風速與陣風，可回看縮時。看得到湖就是能見度良好——判斷上不上去以這支為主。"],
      ["觀景平台 360°","https://zugspitze.panomax.com/",
       "架在峰頂觀景平台，可拖曳整圈，含金色十字架與奧地利側，看的是上去之後的實際視野。畫質高但載入慢、無風速資料，適合前一晚慢慢看。"],
      ["纜車營運狀態","https://zugspitze.de/en/Service-information/Facilities",
       "官方今日開放設施清單與停駛公告。強風停駛時這裡最快看到。"],
      ["帕特納赫峽谷開放狀態","https://www.partnachklamm.de/en",
       "官網右上角綠色 open／紅色 closed，是 B 方案的前提。"],
    ],
    foot:"日出約 07:26（峰頂約 07:18），07:00 畫面仍偏暗，以縮時趨勢與前一晚判斷為主；抵達山下站後（約 08:20）天已亮，可直接目視峰頂再決定是否購票。",
  },
  blocks:[
    { title:"共同｜早餐與營運確認", rows:[
      ["07:00–07:45","早餐／天候確認","Mittenwald-Ferien","早餐，同時完成上方〈今日待辦〉的楚格峰天候確認四項。**07:30 完成 A／B／C 決定**；確認天候前不買高山票券",0,"mit-stay"]
    ]},
    { tabs:[
      { label:"A｜楚格峰＋艾布湖", cond:"首選方案。", rows:[
        ["07:45–12:15","纜車／景點","楚格峰 Zugspitze","**07:45** 住宿出發 → 車程 45 分 → **08:30** 到艾布湖纜車停車場。只在 Webcam 能見度良好時購票，官方明示天候不佳不退改。峰頂、觀景台與冰川區",0,"zugspitze"],
        ["12:15–13:15","午餐","艾布湖 Eibsee 周邊","—",0,"eibsee"],
        ["13:15–16:30","湖畔／藥局","艾布湖環線 → 車站藥局 Bahnhof-Apotheke → 住宿","全湖一圈 7.5 km、平緩、約 **1.5–2 小時**；剛下楚格峰體力不足就沿北岸走到看得見湖中小島的觀景點折返，約 45–60 分。**15:15** 出發 → 車程 45 分 → **16:00** 到藥局（Bahnhofplatz 10，週三**營業至 18:00**）買德國藥品 → **16:30** 回住宿休息",0,"eibsee"]
      ]},
      { label:"B｜帕特納赫峽谷＋加米施", cond:"楚格峰天候或能見度不佳時執行。", rows:[
        ["07:45–11:30","峽谷","帕特納赫峽谷 Partnachklamm 往返","**07:45** 住宿出發 → 車程 45 分 → **08:30** 到奧林匹克滑雪體育場停車場，購票後步行到入口約 30 分，**09:00** 進峽谷。穿防滑鞋與防水外層；現場臨時關閉直接改 C 方案",0,"partnachklamm"],
        ["11:30–13:15","午餐","加米施－帕滕基興 Garmisch-Partenkirchen 市區","走回停車場，**11:45** 出發 → 車程 30 分 → **12:15** 到市區停車，午餐",0,"ludwigstrasse"],
        ["13:15–16:30","古城／藥局","路德維希大街 Ludwigstraße、彩繪屋、咖啡館 → 車站藥局 Bahnhof-Apotheke → 住宿","**15:15** 出發 → 車程 45 分 → **16:00** 到藥局（Bahnhofplatz 10，週三**營業至 18:00**）買德國藥品 → **16:30** 回住宿休息",0,"ludwigstrasse"]
      ]},
      { label:"C｜米滕瓦爾德雨天慢遊", cond:"峽谷臨時關閉或天候不適合外出時執行。", rows:[
        ["07:45–12:00","古城／室內","米滕瓦爾德老街、彩繪屋、教堂、咖啡館","不進峽谷、不搭高山纜車",0,"obermarkt"],
        ["12:00–13:15","午餐","米滕瓦爾德鎮上","—",0,"obermarkt"],
        ["13:15–16:30","採買／藥局／自由活動","超市、車站藥局 Bahnhof-Apotheke，住宿休息或加米施室內景點","藥局（Bahnhofplatz 10）週三**營業至 18:00**；超市至 20:00。道路安全才去加米施",0,"mit-apotheke"]
      ]}
    ]},
    { title:"共同｜晚餐", rows:[
      ["17:15–19:30","晚餐／散步","米滕瓦爾德鎮上與老街","回住宿後整理照片與隔日行李。藥局指定品項先官網預訂，缺貨 Day 8 慕尼黑補。**20:00 初判 Day 4 是否走北鏈纜車**",0,"obermarkt"]
    ]}
  ],
  notes:[
    ["藥品","此站為德國境內主要採買點。OTC 非處方藥價格非全德統一，可詢問相同成分的 günstigere Alternative 或 Generikum。缺貨則 Day 8 在慕尼黑補買。"],
    ["已刪除方案","Leutascher Geisterklamm。Leutasch 市政府資料顯示峽谷 10 月至 4 月關閉，10/07 不視為可執行方案。"]
  ]
},
{
  n:4, date:"10/08（四）", title:"米滕瓦爾德 → 因斯布魯克 → 薩爾斯堡", km:"A 226.6 km／B 231.9 km",
  meta:["住宿 In the heart of the city of Salzburg","跨境日","依 Day 3 執行情況選擇版本"],
  blocks:[
    { tabs:[
      { label:"A｜Nordkette 北鏈纜車", cond:"適用：Day 3 沒有搭到高山纜車，且 10/08 Nordkette 正常營運、山頂能見度良好。", rows:[
        ["07:30–08:30","早餐／退房","Mittenwald-Ferien","退房期限 09:00；**08:30 正式出發**",0,"mit-stay"],
        ["08:30–10:00","移動／票券","米滕瓦爾德 → 因斯布魯克 Congress 纜車站","**08:30** 出發 → 車程 1 小時 → **09:30** 到 Congress／Altstadtgarage 停車，步行到 Congress 纜車站。購買 Top of Innsbruck 成人來回票；不購買 Innsbruck Card",0,"inn-congress"],
        ["10:00–14:00","纜車／午餐","飢餓堡 Hungerburg → 澤格魯貝 Seegrube → 哈菲勒卡峰 Hafelekar","三段系統連貫，依當日營運與安全範圍觀景。12:00 澤格魯貝餐廳午餐，以當日營業為準。**14:00 前回到市區**",0,"hafelekar"],
        ["14:00–15:00","古城","黃金屋頂 Goldenes Dachl、老城、瑪麗亞·特蕾西亞大街","—",0,"goldenes-dachl"],
        ["15:00–17:30","移動","因斯布魯克 → 薩爾斯堡住宿（Bürglsteinstraße 19）","**15:00** 出發 → 車程 2 小時 15 分＋中途休息 15 分 → **17:30** 到",0,"szg-stay"],
        ["17:30–20:00","住宿／晚餐","In the heart of the city of Salzburg → 薩爾察赫河 Salzach 河岸","車停住宿處。入住、領取 4 人薩爾斯堡住宿交通票，確認手機 Wallet 或 PDF 可離線開啟；18:30 出門河岸短走、晚餐，返回住宿",0,"szg-stay"]
      ]},
      { label:"B｜無纜車＋拉滕貝格", cond:"適用：Day 3 已搭過高山纜車，或 10/08 Nordkette 因天候、能見度或營運狀況不適合。", rows:[
        ["07:30–08:30","早餐／退房","Mittenwald-Ferien","退房期限 09:00；**08:30 正式出發**",0,"mit-stay"],
        ["08:30–12:30","古城／午餐","因斯布魯克老城：凱旋門 Triumphpforte、瑪麗亞·特蕾西亞大街、黃金屋頂、茵河河岸","**08:30** 出發 → 車程 1 小時 → **09:30** 到中央車站停車場（滿位時依導航改停其他市中心車庫）。11:30 市中心午餐，回停車場，**12:30 開車離開**",0,"goldenes-dachl"],
        ["12:30–14:15","景點","拉滕貝格 Rattenberg 中世紀老城、中央廣場 Hauptplatz","**12:30** 出發 → 車程 45 分 → **13:15** 到 P2 停車。玻璃工藝商店與茵河河岸",0,"rattenberg"],
        ["14:15–16:45","移動","拉滕貝格 → 薩爾斯堡住宿（Bürglsteinstraße 19）","**14:15** 出發 → 車程 2 小時 15 分＋中途休息 15 分 → **16:45** 到",0,"szg-stay"],
        ["16:45–19:30","住宿／晚餐","In the heart of the city of Salzburg → 莫札特橋 Mozartsteg、薩爾察赫河岸","車停住宿處。入住、領取 4 人薩爾斯堡住宿交通票，確認可離線開啟；17:45 出門散步、晚餐，返回住宿",0,"szg-stay"]
      ]}
    ]}
  ],
  notes:[
    ["票券","Top of Innsbruck 成人來回票 €56／人、4 人 €224。Innsbruck Card 24 小時 €69／人，本日只安排半日且古城以外觀為主，不購買。"],
    ["薩爾斯堡限制","2026/07/01 起加強舊城車輛限制。住宿在舊城外緣，兩晚以步行或公車進舊城，不在市中心找路邊停車。本日不安排要塞；10 月城堡內部 17:00 關閉，留到 Day 5 完整參觀。"]
  ]
},
{
  n:5, date:"10/09（五）", title:"薩爾斯堡古城慢遊",
  meta:["住宿 In the heart of the city of Salzburg（續住）","交通 全日步行＋市區公車","無自駕"],
  blocks:[{ rows:[
    ["08:00–09:00","早餐／票券","薩爾斯堡住宿","確認 4 人住宿交通票與數位薩爾斯堡卡可開啟。薩爾斯堡卡此時尚未啟用",0,"szg-stay"],
    ["09:00–11:00","景點／散步","米拉貝爾花園 Mirabellgarten → 馬卡特廣場 Makartplatz、馬卡特行人橋、薩爾察赫河岸 → 糧食胡同","公車約 25 分，使用住宿交通票。花園看飛馬噴泉與中軸城堡景，10:10 出發過橋，11:00 前到莫札特出生地",0,"mirabell"],
    ["11:00–12:00","景點／開卡","莫札特出生地 Mozarts Geburtshaus","**11:00 第一次掃描薩爾斯堡卡，效期至 10/10 10:59**",1,"mozart-haus"],
    ["12:00–13:55","古城／午餐","糧食胡同 Getreidegasse、大學廣場 Universitätsplatz、大學教堂，老城午餐","12:40 左右進餐廳",0,"getreidegasse"],
    ["13:55–14:40","景點","莫札特廣場、主教宮廣場 Residenzplatz、卡比第廣場","三個廣場相連，走到城堡纜車山下站 FestungsBahn",0,"residenzplatz"],
    ["14:40–16:50","城堡／纜車","薩爾斯堡要塞 Hohensalzburg Fortress","纜車上下山與要塞參觀；纜車與門票含於薩爾斯堡卡",0,"hohensalzburg"],
    ["16:50–18:30","景點／自由活動","主教座堂 Salzburger Dom（外觀）、聖彼得墓園，老城自由活動","主教座堂僅有持卡優惠，非免費入場。之後老城咖啡館、河岸、補逛糧食胡同",0,"salzburger-dom"],
    ["18:30–20:00","晚餐","老城或薩爾察赫河岸","晚餐後搭公車（使用住宿交通票）或步行返回住宿",0,"residenzplatz"]
  ]}],
  notes:[
    ["票券","24 小時數位薩爾斯堡卡 €38／人、4 人 €152。建議 10/08 晚上入住後從官網購買並選擇 10/09，單次訂單可購 4 張具名卡，收到 Email 後把每張個人卡片連結分別轉傳。10/09 搭公車不會啟用，11:00 在莫札特出生地第一次掃描後才開始計算 24 小時。數位購買失敗時，可於 10/09 09:00–18:00 至 Tourist Info Mozartplatz 或 Hauptbahnhof 購買實體卡。"],
    ["雨天","縮短米拉貝爾花園，增加主教座堂、博物館或莫札特出生地室內時間。"],
    ["不安排","本日不安排 Untersbergbahn；前幾天即使沒搭到高山纜車，也不在薩爾斯堡補搭。"]
  ]
},
{
  n:6, date:"10/10（六）", title:"薩爾斯堡 → 國王湖 → 比紹夫斯維森", km:"44.5 km／約 1 小時 45 分",
  meta:["住宿 Ferienhaus Gestüt Pfaffenlehen","交通 自駕＋遊船＋步道","體力 中高"],
  blocks:[{ rows:[
    ["06:30–07:00","住宿／退房","薩爾斯堡住宿","快速早餐、退房、裝車並確認行李；**07:00 正式出發**",0,"szg-stay"],
    ["07:00–08:45","移動／登船","薩爾斯堡住宿 → 國王湖碼頭 Königssee Seelände","**07:00** 出發 → 車程 55 分 → **07:55** 到 Parkplatz Königssee 停車 → 步行約 10 分（穿過紀念品街）→ **08:05** 到 Seelände → **08:25 前報到** → **08:45 開船**。已預約 Fahrt-Nr. 10 來回票（4 人團體票），**未按預訂時間出現即喪失搭乘權，無補搭、無退費**。抵達碼頭有 20 分餘裕吸收找車位、洗手間",1,"koe-seelaende"],
    ["08:45–12:00","遊船／步道（必走）","國王湖 → 薩雷特 Salet → 上湖 Obersee 西岸 → 釣魚牧場 Fischunkelalm → 原路返回","經聖巴多羅買 St. Bartholomä 不下船，約 09:40 抵薩雷特。官方路線約 5.5 km、2 小時 20 分，部分路段偏窄且可能潮濕。**12:00 必須回到薩雷特**",0,"obersee"],
    ["12:00–12:45","午餐","薩雷特牧場餐廳 Saletalm","官方公告 2026 營業至 10/11，休季前倒數第二天可能擠；Fischunkelalm 已於 10/04 結束營業，不在步道終點用餐。等候過久改吃自備行動糧",0,"salet"],
    ["12:45–13:55","遊船","薩雷特 → 聖巴多羅買 → 國王湖碼頭","回程不綁班次，憑來回票在薩雷特碼頭**排隊上下一班**，約每 30 分一班；12:45 排隊，目標 13:00 那班。排不上就等下一班，最晚 13:30 上船才不影響後面。不中途下船",0,"koe-seelaende"],
    ["13:55–14:50","步道（可選）","畫家角 Malerwinkel 觀景點來回","碼頭 → 觀景點 1 km、單程 15–20 分，**來回約 50 分**。船班延誤就跳過。完整環線與烏鴉岩 Rabenwand 留 Day 7 B 方案。**絕對不走觀景點後方已荒廢的沿湖窄徑**，該路段有墜落危險",0,"malerwinkel"],
    ["14:50–16:00","移動／採買","國王湖停車場 → 比紹夫斯維森 EDEKA E center（Reichenhaller Str. 18–20）","**14:50** 出發 → 車程 25 分 → **15:15** 到超市。**EDEKA 週六營業至 20:00**（備案 REWE Hauptstr. 24 至 19:00）；採買 40 分。**隔天週日超市全關**：當晚晚餐、隔日辛特湖早餐、行動糧一次買齊，清單在船上先列好"],
    ["16:00–","移動／住宿","超市 → Ferienhaus Gestüt Pfaffenlehen（Pfaffenlehen 6）","**16:00** 出發 → 車程 25 分 → **16:25** 到，路上聯絡管理人看能否提早。**17:00 固定交屋**，入住、搬運行李、住宿晚餐並休息。若 16:10 還沒離開國王湖 → **跳過超市直接去交屋，17:30 再去 EDEKA**",1,"bis-stay"]
  ]}],
  notes:[
    ["船班","**去程已預約並付款**——10/10 Fahrt-Nr. 10、08:45 自 Seelände 開往薩雷特，4 張成人來回票共 €119.20（€29.80／人）。票面明定提前 20 分鐘報到、未按時出現即喪失搭乘權。**回程時間自由選**，船票務必留著；13:00 只是目標班次，以當日薩雷特碼頭公告與現場放行為準。2026 官方後季船期為 09/15－10/11，回程原則約每 30 分鐘一班。每人必備飲水與行動糧，避免餐廳排隊影響回程船。"],
    ["步道安全","畫家角官方環線約 5 km、160 m 爬升，官方標示約 1.5 小時；烏鴉岩是從環線最高點另行岔出的支線。只走正式標示路線，**絕對不繼續走畫家角後方已荒廢的沿湖窄徑**，該路段有墜落危險。上湖往 Fischunkelalm 步道也有局部偏窄、潮濕及護欄路段，需穿防滑步行鞋。"],
    ["備案","上湖步道為本日必走核心，只有薩雷特停航或官方封閉才取消。畫家角／烏鴉岩是最後的可選加碼，不壓縮上湖、午餐、採買與入住時間硬做；時間不足就整段放棄，翌日可選 Day 7 B 方案完成。若薩雷特停航但聖巴多羅買正常營運，改搭船往返聖巴多羅買；若全面停航且戶外條件不適合，改貝希特斯加登鹽礦或老城室內行程，是否入場依當日票況。"]
  ]
},
{
  n:7, date:"10/11（日）", title:"比紹夫斯維森 → 哈修塔特", km:"A 115.4 km／B 101.4 km",
  meta:["住宿 Hallberg Apartments 哈爾貝格公寓","二選一：辛特湖，或國王湖北岸畫家角／烏鴉岩"],
  blocks:[
    { tabs:[
      { label:"A｜辛特湖湖畔早餐", cond:"適用：Day 6 已走完畫家角觀景點且不想補走環線。首選方案。", rows:[
        ["07:00–07:30","住宿／退房","比紹夫斯維森住宿","退房、裝車並確認哈修塔特 P1 導航與住宿聯絡方式。早餐帶至湖畔食用",0,"bis-stay"],
        ["07:30–09:15","湖畔早餐","辛特湖 Hintersee、魔法森林入口周邊","**07:30** 出發 → 車程 30 分 → **08:00** 到辛特湖。自備早餐、短走與拍照；不依賴湖畔餐廳營業。**09:15 開車**",0,"hintersee"],
        ["09:15–11:35","移動","辛特湖 → 哈修塔特 P1 停車場","**09:15** 出發 → 車程 2 小時 20 分 → **11:35** 到 Hallstatt P1",0,"hal-p1"]
      ]},
      { label:"B｜畫家角／烏鴉岩", cond:"適用：想補走 Day 6 沒走的完整環線與烏鴉岩。", rows:[
        ["06:45–07:15","住宿／退房","比紹夫斯維森住宿","退房、裝車並確認哈修塔特 P1 導航與住宿聯絡方式。早餐改自備便攜餐點",0,"bis-stay"],
        ["07:15–09:30","環線步道","畫家角 Malerwinkel → 環線最高點岔路 → 烏鴉岩 Rabenwand → Jennerbahn 山麓站 → 停車場","**07:15** 出發 → 車程 25 分 → **07:40** 到國王湖停車場，步行到碼頭北側起點，不搭船，**07:50** 開始走。Day 6 只走了觀景點來回，這裡走完整環線：目標 1.5 小時＋10 分緩衝；途中只短停拍照，早餐在車上或觀景點簡單食用",0,"malerwinkel"],
        ["09:30–11:35","移動","國王湖停車場 → 哈修塔特 P1 停車場","**09:30** 出發 → 車程 1 小時 55 分 → **11:25** 到 Hallstatt P1；多出 10 分作緩衝，與 A 方案同時接上",0,"hal-p1"]
      ]}
    ]},
    { title:"共同｜哈修塔特", rows:[
      ["11:35–12:15","停車／接駁","哈修塔特 P1、Hotel-Shuttle Info-Point","P1 取票後到 Info-Point 報到，依住宿指示處理 4 人與行李接駁；**不可直接開車進入住宿所在舊城**",0,"hal-p1"],
      ["12:15–15:00","午餐／老城慢遊","市集廣場 Marktplatz、湖畔、天主教堂墓園、舊城小巷","湖畔或市集廣場餐廳約 1 小時，13:15 起慢遊舊城，走到哈爾貝格公寓（Seestraße 113）。**15:00 入住**",0,"hal-marktplatz"],
      ["15:00–17:30","住宿／自由活動","哈爾貝格公寓 Hallberg Apartments、湖畔","辦理入住並放置行李；入住時段 15:00–18:00，**18:00 前必須完成入住**。之後湖畔咖啡、拍照、休息或補走喜歡的街區",1,"hal-stay"],
      ["17:30–","晚餐／住宿","哈修塔特湖畔","晚餐、夕景與夜間散步後返回住宿；不安排纜車、天空步道或其他繞路景點",0,"hal-stay"]
    ]}
  ],
  notes:[["P1 規則","市中心無停車住宿的住客使用 P1 Hotel-Ticket；入場取票後至 Hotel-Shuttle Info-Point，由接駁車運送住客與行李。離開時也須依住宿或接駁指示返回 P1。"]]
},
{
  n:8, date:"10/12（一）", title:"哈修塔特 → 慕尼黑", km:"直達約 3 小時 10 分／里程待導航實測",
  meta:["住宿 Motel One München-Hauptbahnhof","交通 步行＋鹽礦纜車＋自駕"],
  blocks:[{ rows:[
    ["07:30–09:30","湖畔散步／早餐／退房","哈修塔特湖畔 → 哈爾貝格公寓","07:30 出門湖畔晨間拍照，08:15 回住宿早餐、整理行李、退房，依住宿指示將行李送回 P1。退房時限 10:00",0,"hal-stay"],
    ["09:30–12:20","鹽礦","哈修塔特鹽礦 Salzwelten Hallstatt：上山、報到、導覽","**09:30** 住宿出發 → 步行 30 分 → **10:00** 纜車山下站（**官方要求 10:05 前抵達**，線上票直接通過閘門）→ 纜車 2 分 → 山頂步行 15–20 分 → **10:35** Knappenhaus 集合 → **10:50 導覽**（已購場次），90 分鐘。坑內常年 8 °C，帶保暖外套",1,"salzwelten"],
    ["12:20–13:20","景點／纜車","哈修塔特天空步道 Hallstatt Skywalk → 纜車下山","鹽礦出口步行 20 分到天空步道，山頂湖景與拍照約 30 分。回程纜車不綁時間；**13:20 離開山下站**",0,"skywalk"],
    ["13:20–14:20","行李／午餐","哈修塔特 P1","取回行李，P1 周邊簡單午餐或食用預備餐點；**14:20 正式開車離開**",0,"hal-p1"],
    ["14:20–17:30","移動","哈修塔特 P1 → Motel One München-Hauptbahnhof（Schillerstraße 3a）","**14:20** 出發 → 車程約 3 小時（經奧地利 A1、德國 A8；**直達，已取消普里恩／基姆湖停留**）→ **17:30** 到。精確車程待導航實測，建議中途休息一次",1,"muc-stay2"],
    ["17:30–18:10","住宿／停車","Motel One München-Hauptbahnhof","入住、卸下全部行李，依住宿確認結果停合作停車場。確認 X3 限高、隔夜費用、隔日 05:50 前取車方式",0,"muc-stay2"],
    ["18:10–20:15","藥局／採買","國際路德維希藥局 Internationale Ludwigs-Apotheke、新豪瑟街 Neuhauser Straße、考芬格街","**先去藥局**（Neuhauser Str. 11，週一**營業至 20:00**），再逛新豪瑟街、考芬格街（多數**至 20:00**）。17:30 到住宿是未實測值，若晚到先直奔藥局",1,"ludwigs-apotheke"],
    ["20:15–22:15","晚餐","慕尼黑市中心","餐廳或傳統餐酒館；選店時確認星期一廚房最後點餐時間。之後步行返回住宿，當晚不還車",0,"marienplatz"]
  ]}],
  notes:[
    ["鹽礦","已購 10/12 10:50 場次，鹽礦與纜車成人套票 €49／人、4 人 €196。官方要求導覽前 45 分鐘抵達纜車山下站，即 10:05 前；線上票可直接通過纜車閘門。導覽 90 分鐘，含上山、步行與天空步道的完整參觀約 3 小時。回程纜車不綁時間，注意當日末班。"],
    ["已取消普里恩","改為 10:50 場次後，離開 P1 由 13:00 推遲至 14:20，抵達慕尼黑將晚於 17:30，依原訂取消條件放棄普里恩／基姆湖停留，優先保留慕尼黑採買與隔日還車準備。"],
    ["車程待實測","直達里程與時間尚未以導航核對，出發前請實測。若 A1／A8 壅塞導致抵達晚於 18:30，先到住宿卸行李並直接前往藥局，其餘採買順延。"]
  ]
},
{
  n:9, date:"10/13（二）", title:"慕尼黑 → MUC → 香港 → 台北", km:"約 2–5 km／約 15–25 分",
  meta:["交通 自駕＋步行＋S-Bahn","07:00 固定還車；11:20 到機場（起飛前 2.5 小時）"],
  blocks:[{ rows:[
    ["05:30–05:50","住宿","Motel One München-Hauptbahnhof","起床、核對護照、退稅單與退稅商品。**先不退房**，房間留到 10:00，還車後回來用早餐、整理",0,"muc-stay2"],
    ["05:50–07:00","還車","SIXT 慕尼黑卡爾廣場店","05:50 停車場取車 → AVIA Hochstraße 加滿合約指定燃油、留發票 → 06:45 前到 Herzog-Wilhelm-Straße 11 進 U3 還車層 → 拍油量、里程、車身、停放位置 → **07:00 固定還車**",1,"sixt-stachus"],
    ["07:00–10:15","住宿","Motel One München-Hauptbahnhof","還車後步行約 10 分回 Schillerstraße 3a。旅館早餐、休息、整理行李與退稅文件，**10:00 退房**（退房時限 12:00）",0,"muc-stay2"],
    ["10:15–11:20","機場線","中央車站 Hauptbahnhof → 慕尼黑機場 T1","10:15 Motel One 出發 → 步行 5 分到中央車站 → S1 或 S8 約 45 分 → **11:20 到第一航廈**，起飛前 2.5 小時。前一晚依 MVV／DB 確認班次",0,"muc-t1"],
    ["11:20–13:10","登機","第一航廈","國泰櫃檯報到取登機證（退稅商品先不托運）→ 海關驗退稅商品蓋章 → 回櫃檯托運 → 安檢、證照查驗 → 登機門。**12:00 前完成報到**；退稅與報到先後順序出發前向國泰確認",0,"muc-t1"],
    ["13:50–","航班","CX300 慕尼黑 → 香港","**13:50 固定起飛**，第一航廈",1],
    ["10/14 06:50–08:10","轉機","香港國際機場","轉機 1 小時 20 分，不安排購物或用餐",1],
    ["10/14 08:10–10:00","航班","CX564 香港 → 桃園","**08:10 固定起飛，10:00 抵達桃園第一航廈**",1]
  ]}],
  notes:[]
}
];

const FOOD = [
  { region:"慕尼黑 München", days:"Day 1、8、9", items:[
    ["Münchner Weißwurst 白香腸","搭甜芥末與蝴蝶餅，傳統上偏早餐或午前食用"],
    ["Schweinshaxe 烤豬腳","份量大，4 人可分食不同主菜"],
    ["Schweinsbraten 巴伐利亞烤豬肉",""],
    ["Obazda 起司抹醬","搭麵包或蝴蝶餅，適合當前菜"],
    ["Leberkässemmel 肉餅麵包、Fleischpflanzerl 肉餅","市場午餐的快速選擇"],
    ["Münchner Helles 淡啤酒","駕駛人選無酒精版本"]
  ], spots:[
    ["Augustiner-Keller 奧古斯丁啤酒花園","4.4 ★ 4 萬則 · 德國菜 · 每人 €20–30","Arnulfstraße 52，中央車站西北側步行約 8 分；Day 1 晚餐已預約。招牌 Schweinebraten 烤豬肉與 Augustiner 木桶啤酒；營業至 24:00","11190566384854483039"],
    ["Hofbräuhaus 皇家啤酒屋","4.3 ★ 11 萬則 · 巴伐利亞菜 · 每人 €20–30","Platzl 9，瑪利亞廣場步行 5 分；現場銅管樂、大桌併坐，觀光客多但體驗完整；營業至 24:00，官網可訂位","12232182229576260143"],
    ["Viktualienmarkt 維克圖阿連市場","4.6 ★ 6.4 萬則 · 露天市場","Day 1 午餐地點。週一至週六 08:00 起、週日休；攤位現金為主，Leberkässemmel、Obazda、果汁與起司分攤買","2677954517243457902"]
  ]},
  { region:"霍恩施萬高／新天鵝堡山腳", days:"Day 2", items:[
    ["Allgäuer Kässpatzen 阿爾高起司麵疙瘩","當地代表"],
    ["Schnitzel 炸豬排",""],
    ["Kaiserschmarrn 皇帝煎餅","甜點類主食"]
  ], spots:[
    ["Kainz Restaurant","4.3 ★ 1,023 則 · 每人 €20–30","Alpseestraße 5，售票中心旁；Wiener Schnitzel、Sauerbraten、Kaiserschmarrn；10:00 起，有兒童菜單","893658560296655828"],
    ["Dorfwirt","4.0 ★ 183 則 · 巴伐利亞菜 · 每人 €20–30","Alpseestraße 15；Schnitzel、Weisswurst；只營業到 19:00，晚餐要早","10389251774094546559"],
    ["Alpenrose am See","3.1 ★ 231 則 · 湖畔啤酒花園 · 每人 €1–20","Alpseestraße 27，阿爾普湖畔；只賣 Leberkäs、Bratwurst 麵包與啤酒，評分低、以看景為主；11:30–18:00，不接受訂位","12552717955094997743"]
  ]},
  { region:"米滕瓦爾德 Mittenwald", days:"Day 2、3", items:[
    ["Mittenwalder Weißwürstl","在地白香腸"],
    ["Kässpatzen 起司麵疙瘩",""],
    ["Knödel 麵包丸子",""],
    ["烤肉、Kaiserschmarrn",""]
  ], spots:[
    ["Restaurant Wildfang","4.7 ★ 911 則 · 巴伐利亞菜","Dekan-Karl-Platz 3，教堂旁；需要預訂。Schweinebraten、Bauernpfanne、Käsespätzle、Germknödel；廚房 11:30 起","574336831994827821"],
    ["Ristorante & Pizzeria La Viola","4.6 ★ 1,189 則 · 義大利菜 · 每人 €10–30","Albert-Schott-Straße 1；披薩、千層麵、鹿肉 Carpaccio；營業至 22:00，可外帶，吃膩德式的備案","12389761651221008114"],
    ["Indian Grill","4.7 ★ 663 則 · 北印度菜 · 每人 €20–30","Hochstraße 15；Tandoori、Thali、Garlic Naan；營業至 22:00，可訂位","13389305306159964863"],
    ["REWE 超市","4.3 ★ 1,393 則 · 超市","Innsbrucker Str. 4；07:00 起；Day 3 早餐與行動糧補給","667727193409986719"]
  ]},
  { region:"楚格峰／艾布湖 Zugspitze & Eibsee", days:"Day 3 A 方案", items:[
    ["Germknödel 酵母甜糰","山區經典甜食"],
    ["Käsespätzle 起司麵疙瘩",""],
    ["湯品與山區簡餐","依當日山頂營運與熱食時段"]
  ]},
  { region:"加米施－帕滕基興", days:"Day 3 B 方案", items:[
    ["Werdenfelser 山區野味","當地特色"],
    ["Knödel、Käsespätzle",""],
    ["Apfelstrudel 蘋果捲",""]
  ]},
  { region:"因斯布魯克 Innsbruck", days:"Day 4", items:[
    ["Tiroler Gröstl 肉丁炒馬鈴薯","提洛代表菜"],
    ["Kaspressknödel 壓起司麵包丸子",""],
    ["Graukäse 灰起司","提洛特有"],
    ["Kasspatzln 起司麵疙瘩",""],
    ["Kaiserschmarrn",""]
  ]},
  { region:"拉滕貝格 Rattenberg", days:"Day 4 B 方案", items:[
    ["提洛糕點、Kiachl 炸麵餅",""],
    ["咖啡與蛋糕","本段只有 1 小時，以小點與玻璃工藝散步為主，不安排完整坐席午餐"]
  ]},
  { region:"薩爾斯堡 Salzburg", days:"Day 4、5", items:[
    ["Salzburger Kasnockn 起司麵疙瘩","當地主食代表"],
    ["Salzburger Nockerl 薩爾斯堡舒芙蕾","份量大，通常 2–3 人分食"],
    ["Bosna 香腸堡","街頭小吃"],
    ["Original Mozartkugel 莫札特巧克力球","伴手禮"],
    ["Backhendl 炸雞",""],
    ["Kaspressknödel",""]
  ]},
  { region:"國王湖／上湖 Königssee & Obersee", days:"Day 6", items:[
    ["山區冷盤、湯",""],
    ["Alm 牧場起司",""],
    ["國王湖燻鱒魚","只有在聖巴多羅買 St. Bartholomä 停留才考慮；本行程不在該站下船"]
  ], spots:[
    ["Historische Gaststätte St. Bartholomä 國王湖漁夫餐廳","4.5 ★ 414 則 · 湖魚 · 每人 €10–20","Kessel-St Bartholomä 3，聖巴多羅買碼頭旁；燻鱒魚、燻紅點鮭、鱒魚麵包。只有在該站下船才吃得到，本日船程不中途下船","16716103692613234265"],
    ["Fischunkelalm 釣魚牧場","4.6 ★ 893 則 · 牧場冷盤 · 每人 €10–20","上湖步道終點；Brotzeit 冷盤、自製起司、酪乳。只收現金、不訂位；2026 營業至 10/04，Day 6 已休，僅供參考","7121190574320796912"]
  ]},
  { region:"比紹夫斯維森／貝希特斯加登", days:"Day 6、7", items:[
    ["Berchtesgadener Land 起司","當地乳製品"],
    ["烤豬肉、Knödel、野味",""]
  ], text:"正式安排為超市採買後在住宿用餐。" },
  { region:"辛特湖 Hintersee", days:"Day 7 A 方案", items:[],
    text:"湖畔自備早餐，不列特色菜。前一天下午在比紹夫斯維森買麵包、起司、火腿、水果、優格與熱飲；08:00 前不依賴餐廳營業，低溫或雨天在車內吃，垃圾全部帶走。" },
  { region:"哈修塔特 Hallstatt", days:"Day 7、8", items:[
    ["Reinanke 白鮭","湖魚代表"],
    ["Forelle 鱒魚、Saibling 紅點鮭",""],
    ["Schnitzel",""],
    ["Kasnocken 起司麵疙瘩",""],
    ["Apfelstrudel、Palatschinken 薄餅","甜點"]
  ], spots:[
    ["Zum Bader Gastwirtschaft","4.4 ★ 651 則 · 每人 €20–30","Wolfengasse 57，老城內；Google 清單註「哈修塔特好吃餐廳」。丸子湯、鹿肉燴、Sacher Torte；11:30 起，有壁爐","8451986518570336850"]
  ]},
  { region:"普里恩／基姆湖 Prien am Chiemsee", days:"Day 8", items:[
    ["Chiemsee Renke 基姆湖白鮭","當地湖魚"],
    ["Apfelstrudel、蛋糕與咖啡","本段只有 30 分鐘，原則只喝咖啡、吃甜點"]
  ]}
];

/* 逐日預報。由 fetch_fc.js 產出——每次重跑 build.js 前先跑那支，否則資料會過期。
   三層由準到疏：官方模式（德 DWD ICON-D2、奧 GeoSphere AROME，再退 ICON-EU／ICON／IFS）
   → ECMWF ENS 51 成員（約 15 天）→ GEFS＋GEM 52 成員多模式系集（35 天）。
   每筆的 v 存三層各自的結果供 tab 切換，筆身是最準那層（pick）。系集只給區間且標低信度。
   白天 06–18 Europe/Berlin；楚格峰以 6.5 °C/km 由格點高程修正至 2962 m。 */
const FC_META = {"built":"2026-09-23T05:39:34.222Z","date":"2026-09-23","periods":[{"k":"morn","label":"上午","span":"06–12","day":1},{"k":"noon","label":"下午","span":"12–18","day":1},{"k":"night","label":"夜間","span":"18–24","day":0},{"k":"dawn","label":"清晨","span":"00–06","day":0}],"horizon":[{"src":"GeoSphere AROME","res":"2.5 km","days":1},{"src":"DWD ICON-D2","res":"2.2 km","days":1},{"src":"DWD ICON-EU","res":"7 km","days":4},{"src":"DWD ICON","res":"11 km","days":6},{"src":"ECMWF IFS","res":"0.25°","days":13}],"tiers":["model","ecmwf","pool"],"ens":{"ecmwf":{"src":"ECMWF ENS 系集","res":"0.25°","days":13},"pool":{"src":"GEFS＋GEM 系集","res":"0.5°","days":33}},"n":4,"total":10};

const FC = [
{"day":1,"date":"2026-10-05","place":"慕尼黑","cc":"DE","lead":12,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":524,"alt":null,"dt":{"a":15.2,"h":19.2,"l":10.4,"c":89,"p":16,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":12,"h":15.1,"l":10.4,"c":94,"p":13,"mm":0,"lo":null,"hi":null},"noon":{"a":18.3,"h":19.2,"l":16.7,"c":85,"p":16,"mm":0,"lo":null,"hi":null},"night":{"a":14.8,"h":17.1,"l":12.8,"c":44,"p":15,"mm":0,"lo":null,"hi":null},"dawn":{"a":12.2,"h":13.2,"l":11,"c":99,"p":14,"mm":0,"lo":null,"hi":null}},"pick":"model","v":{"model":{"day":1,"date":"2026-10-05","place":"慕尼黑","cc":"DE","lead":12,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":524,"alt":null,"dt":{"a":15.2,"h":19.2,"l":10.4,"c":89,"p":16,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":12,"h":15.1,"l":10.4,"c":94,"p":13,"mm":0,"lo":null,"hi":null},"noon":{"a":18.3,"h":19.2,"l":16.7,"c":85,"p":16,"mm":0,"lo":null,"hi":null},"night":{"a":14.8,"h":17.1,"l":12.8,"c":44,"p":15,"mm":0,"lo":null,"hi":null},"dawn":{"a":12.2,"h":13.2,"l":11,"c":99,"p":14,"mm":0,"lo":null,"hi":null}},"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/22","ready":true}},"ecmwf":{"day":1,"date":"2026-10-05","place":"慕尼黑","cc":"DE","lead":12,"src":"ECMWF ENS 系集","res":"0.25°","kind":"ens","conf":"low","pk":"members","members":51,"elev":524,"alt":null,"dt":{"a":13.2,"h":16.9,"l":8.2,"c":59,"p":27,"mm":1.2,"lo":9.3,"hi":17.4},"p":{"morn":{"a":10,"h":13.1,"l":8.2,"c":79,"p":22,"mm":0.6,"lo":6.8,"hi":14.2},"noon":{"a":16.3,"h":16.9,"l":14.5,"c":78,"p":25,"mm":0.7,"lo":12,"hi":21.9},"night":{"a":13.8,"h":15.3,"l":11.9,"c":44,"p":24,"mm":0.6,"lo":8.7,"hi":17.5},"dawn":{"a":10.1,"h":11.5,"l":8.6,"c":48,"p":20,"mm":0.4,"lo":6.4,"hi":13.8}},"far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/22","ready":true}},"pool":{"day":1,"date":"2026-10-05","place":"慕尼黑","cc":"DE","lead":12,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":524,"alt":null,"dt":{"a":14.3,"h":18.4,"l":10.2,"c":67,"p":38,"mm":1,"lo":11.3,"hi":17.2},"p":{"morn":{"a":12.2,"h":14.6,"l":10.3,"c":64,"p":25,"mm":0.4,"lo":9.2,"hi":14.6},"noon":{"a":17.1,"h":18.4,"l":15.8,"c":59,"p":33,"mm":0.6,"lo":12,"hi":21},"night":{"a":13.5,"h":15.7,"l":12.1,"c":53,"p":35,"mm":0.6,"lo":9.8,"hi":16.2},"dawn":{"a":11.2,"h":12.3,"l":10.5,"c":59,"p":15,"mm":0.2,"lo":8.5,"hi":14}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/02","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/04","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/01","ready":false},{"src":"DWD ICON","res":"11 km","from":"09/29","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/22","ready":true}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/22","ready":true}},
{"day":2,"date":"2026-10-06","place":"新天鵝堡","cc":"DE","lead":13,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":944,"alt":null,"dt":{"a":17.4,"h":23.3,"l":10.2,"c":88,"p":20,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":13.1,"h":17.8,"l":10.2,"c":88,"p":17,"mm":0,"lo":null,"hi":null},"noon":{"a":21.8,"h":23.3,"l":20,"c":87,"p":20,"mm":0,"lo":null,"hi":null},"night":{"a":15.9,"h":18.9,"l":14,"c":28,"p":22,"mm":0,"lo":null,"hi":null},"dawn":{"a":10.8,"h":11.5,"l":10.2,"c":65,"p":18,"mm":0,"lo":null,"hi":null}},"pick":"model","v":{"model":{"day":2,"date":"2026-10-06","place":"新天鵝堡","cc":"DE","lead":13,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":944,"alt":null,"dt":{"a":17.4,"h":23.3,"l":10.2,"c":88,"p":20,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":13.1,"h":17.8,"l":10.2,"c":88,"p":17,"mm":0,"lo":null,"hi":null},"noon":{"a":21.8,"h":23.3,"l":20,"c":87,"p":20,"mm":0,"lo":null,"hi":null},"night":{"a":15.9,"h":18.9,"l":14,"c":28,"p":22,"mm":0,"lo":null,"hi":null},"dawn":{"a":10.8,"h":11.5,"l":10.2,"c":65,"p":18,"mm":0,"lo":null,"hi":null}},"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/23","ready":true}},"ecmwf":{"day":2,"date":"2026-10-06","place":"新天鵝堡","cc":"DE","lead":13,"src":"ECMWF ENS 系集","res":"0.25°","kind":"ens","conf":"low","pk":"members","members":51,"elev":944,"alt":null,"dt":{"a":13.2,"h":17.4,"l":8,"c":67,"p":35,"mm":1.4,"lo":7.9,"hi":15.7},"p":{"morn":{"a":10.2,"h":13.3,"l":8,"c":75,"p":29,"mm":0.8,"lo":4.4,"hi":12.4},"noon":{"a":16.2,"h":17.4,"l":14.7,"c":67,"p":33,"mm":0.7,"lo":9.7,"hi":20.2},"night":{"a":11.7,"h":14,"l":10.2,"c":66,"p":31,"mm":0.7,"lo":7,"hi":14.2},"dawn":{"a":9.1,"h":10.1,"l":8.5,"c":65,"p":27,"mm":0.8,"lo":3.8,"hi":11.3}},"far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/23","ready":true}},"pool":{"day":2,"date":"2026-10-06","place":"新天鵝堡","cc":"DE","lead":13,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":944,"alt":null,"dt":{"a":12.9,"h":16.3,"l":9.4,"c":64,"p":50,"mm":1.6,"lo":8.7,"hi":16.8},"p":{"morn":{"a":10.6,"h":12.9,"l":9.5,"c":69,"p":35,"mm":0.8,"lo":7.6,"hi":13.5},"noon":{"a":15.1,"h":16.3,"l":13.9,"c":70,"p":46,"mm":0.9,"lo":9.8,"hi":20.3},"night":{"a":11.7,"h":13.6,"l":10.6,"c":85,"p":48,"mm":1.5,"lo":7.2,"hi":14.4},"dawn":{"a":10,"h":10.7,"l":9.5,"c":84,"p":40,"mm":1,"lo":6.3,"hi":12.9}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/03","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/05","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/02","ready":false},{"src":"DWD ICON","res":"11 km","from":"09/30","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/23","ready":true}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/23","ready":true}},
{"day":3,"date":"2026-10-07","place":"米滕瓦爾德","cc":"DE","lead":14,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":915,"alt":null,"dt":{"a":14,"h":16.1,"l":11.7,"c":98,"p":18,"mm":0.6,"lo":null,"hi":null},"p":{"morn":{"a":12.6,"h":14.1,"l":11.7,"c":96,"p":17,"mm":0.3,"lo":null,"hi":null},"noon":{"a":15.7,"h":16.1,"l":14.9,"c":100,"p":18,"mm":0.3,"lo":null,"hi":null},"night":null,"dawn":{"a":11.9,"h":12.4,"l":11.6,"c":54,"p":19,"mm":0,"lo":null,"hi":null}},"pick":"model","v":{"model":{"day":3,"date":"2026-10-07","place":"米滕瓦爾德","cc":"DE","lead":14,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":915,"alt":null,"dt":{"a":14,"h":16.1,"l":11.7,"c":98,"p":18,"mm":0.6,"lo":null,"hi":null},"p":{"morn":{"a":12.6,"h":14.1,"l":11.7,"c":96,"p":17,"mm":0.3,"lo":null,"hi":null},"noon":{"a":15.7,"h":16.1,"l":14.9,"c":100,"p":18,"mm":0.3,"lo":null,"hi":null},"night":null,"dawn":{"a":11.9,"h":12.4,"l":11.6,"c":54,"p":19,"mm":0,"lo":null,"hi":null}},"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}},"ecmwf":{"day":3,"date":"2026-10-07","place":"米滕瓦爾德","cc":"DE","lead":14,"src":"ECMWF ENS 系集","res":"0.25°","kind":"ens","conf":"low","pk":"members","members":51,"elev":915,"alt":null,"dt":{"a":12.5,"h":16.8,"l":8.1,"c":59,"p":29,"mm":0.8,"lo":7.1,"hi":16.1},"p":{"morn":{"a":9.6,"h":12.5,"l":8.1,"c":70,"p":29,"mm":0.6,"lo":5.4,"hi":12.3},"noon":{"a":15.9,"h":16.8,"l":13.9,"c":62,"p":25,"mm":0.3,"lo":9.4,"hi":21.1},"night":null,"dawn":{"a":9.1,"h":9.8,"l":8.4,"c":75,"p":24,"mm":0.6,"lo":4.5,"hi":11.9}},"far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/24","ready":false}},"pool":{"day":3,"date":"2026-10-07","place":"米滕瓦爾德","cc":"DE","lead":14,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":915,"alt":null,"dt":{"a":13.6,"h":17.4,"l":9.3,"c":68,"p":48,"mm":2,"lo":9.4,"hi":17.3},"p":{"morn":{"a":10.9,"h":13.6,"l":9.3,"c":75,"p":40,"mm":1.2,"lo":7.1,"hi":13.6},"noon":{"a":16,"h":17.4,"l":14.1,"c":78,"p":44,"mm":0.8,"lo":10.5,"hi":21.1},"night":{"a":11.9,"h":13.6,"l":10.4,"c":82,"p":40,"mm":0.8,"lo":8.3,"hi":15.5},"dawn":{"a":10.3,"h":10.7,"l":9.5,"c":64,"p":38,"mm":1.8,"lo":6.9,"hi":12.6}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/04","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/06","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/03","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/01","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}},
{"day":3,"date":"2026-10-07","place":"楚格峰峰頂 2962m","cc":"DE","lead":14,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":2924,"alt":2962,"dt":{"a":1.1,"h":3.8,"l":-1.7,"c":96,"p":20,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":-0.7,"h":1.2,"l":-1.7,"c":95,"p":18,"mm":0,"lo":null,"hi":null},"noon":{"a":3.3,"h":3.8,"l":2.2,"c":98,"p":20,"mm":0,"lo":null,"hi":null},"night":null,"dawn":{"a":-1,"h":-0.2,"l":-1.6,"c":42,"p":19,"mm":0,"lo":null,"hi":null}},"pick":"model","v":{"model":{"day":3,"date":"2026-10-07","place":"楚格峰峰頂 2962m","cc":"DE","lead":14,"src":"ECMWF IFS","res":"0.25°","kind":"det","conf":"high","pk":"model","elev":2924,"alt":2962,"dt":{"a":1.1,"h":3.8,"l":-1.7,"c":96,"p":20,"mm":0,"lo":null,"hi":null},"p":{"morn":{"a":-0.7,"h":1.2,"l":-1.7,"c":95,"p":18,"mm":0,"lo":null,"hi":null},"noon":{"a":3.3,"h":3.8,"l":2.2,"c":98,"p":20,"mm":0,"lo":null,"hi":null},"night":null,"dawn":{"a":-1,"h":-0.2,"l":-1.6,"c":42,"p":19,"mm":0,"lo":null,"hi":null}},"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}},"ecmwf":{"day":3,"date":"2026-10-07","place":"楚格峰峰頂 2962m","cc":"DE","lead":14,"src":"ECMWF ENS 系集","res":"0.25°","kind":"ens","conf":"low","pk":"members","members":51,"elev":2924,"alt":2962,"dt":{"a":-0.9,"h":4.3,"l":-5.6,"c":60,"p":25,"mm":1,"lo":-6.2,"hi":2.7},"p":{"morn":{"a":-4.1,"h":-1,"l":-5.6,"c":78,"p":25,"mm":0.6,"lo":-8,"hi":-1},"noon":{"a":3.4,"h":4.3,"l":0.9,"c":64,"p":25,"mm":0.4,"lo":-4,"hi":7.9},"night":null,"dawn":{"a":-4.1,"h":-3.4,"l":-5.1,"c":72,"p":22,"mm":0.6,"lo":-8.7,"hi":-1.3}},"far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/24","ready":false}},"pool":{"day":3,"date":"2026-10-07","place":"楚格峰峰頂 2962m","cc":"DE","lead":14,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":2924,"alt":2962,"dt":{"a":-0.6,"h":3.2,"l":-4.2,"c":59,"p":48,"mm":1.9,"lo":-3.9,"hi":3.5},"p":{"morn":{"a":-2.7,"h":-0.3,"l":-3.9,"c":63,"p":40,"mm":1.1,"lo":-6.1,"hi":0},"noon":{"a":2.2,"h":3.2,"l":0.7,"c":63,"p":42,"mm":0.8,"lo":-2.8,"hi":7.1},"night":{"a":-1.5,"h":0.2,"l":-2.7,"c":74,"p":40,"mm":0.8,"lo":-4.9,"hi":2},"dawn":{"a":-3.3,"h":-2.7,"l":-3.9,"c":70,"p":38,"mm":1.6,"lo":-7.3,"hi":-0.6}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/04","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/06","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/03","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/01","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/24","ready":false}},
{"day":4,"date":"2026-10-08","place":"因斯布魯克","cc":"AT","lead":15,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":580,"alt":null,"dt":{"a":15,"h":19.2,"l":10.3,"c":65,"p":44,"mm":2,"lo":10.5,"hi":18.1},"p":{"morn":{"a":12.6,"h":15.3,"l":10.9,"c":55,"p":31,"mm":0.9,"lo":8.6,"hi":15.7},"noon":{"a":17.5,"h":19.2,"l":14.4,"c":60,"p":42,"mm":1.1,"lo":12.9,"hi":20.9},"night":{"a":13.1,"h":14.7,"l":11.9,"c":75,"p":37,"mm":1.1,"lo":7.4,"hi":16.6},"dawn":{"a":12.1,"h":12.7,"l":11.4,"c":59,"p":40,"mm":0.9,"lo":8.1,"hi":15.4}},"pick":"pool","v":{"model":{"day":4,"date":"2026-10-08","place":"因斯布魯克","cc":"AT","lead":15,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/25","ready":false}},"ecmwf":{"day":4,"date":"2026-10-08","place":"因斯布魯克","cc":"AT","lead":15,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/25","ready":false}},"pool":{"day":4,"date":"2026-10-08","place":"因斯布魯克","cc":"AT","lead":15,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":580,"alt":null,"dt":{"a":15,"h":19.2,"l":10.3,"c":65,"p":44,"mm":2,"lo":10.5,"hi":18.1},"p":{"morn":{"a":12.6,"h":15.3,"l":10.9,"c":55,"p":31,"mm":0.9,"lo":8.6,"hi":15.7},"noon":{"a":17.5,"h":19.2,"l":14.4,"c":60,"p":42,"mm":1.1,"lo":12.9,"hi":20.9},"night":{"a":13.1,"h":14.7,"l":11.9,"c":75,"p":37,"mm":1.1,"lo":7.4,"hi":16.6},"dawn":{"a":12.1,"h":12.7,"l":11.4,"c":59,"p":40,"mm":0.9,"lo":8.1,"hi":15.4}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/05","ready":true}}},"avail":[{"src":"GeoSphere AROME","res":"2.5 km","from":"10/07","ready":false},{"src":"DWD ICON-D2","res":"2.2 km","from":"10/07","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/04","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/02","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/25","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/25","ready":false}},
{"day":5,"date":"2026-10-09","place":"薩爾斯堡","cc":"AT","lead":16,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":430,"alt":null,"dt":{"a":13.3,"h":17,"l":8.6,"c":67,"p":40,"mm":1,"lo":8.4,"hi":15.3},"p":{"morn":{"a":10.5,"h":13.3,"l":8.6,"c":74,"p":31,"mm":0.5,"lo":5.6,"hi":13.4},"noon":{"a":16,"h":17,"l":14.4,"c":76,"p":38,"mm":0.6,"lo":9.6,"hi":19},"night":{"a":12.5,"h":14.4,"l":11.1,"c":72,"p":40,"mm":0.6,"lo":7.1,"hi":15.2},"dawn":{"a":9.9,"h":11,"l":8.8,"c":76,"p":33,"mm":0.6,"lo":5.3,"hi":13.1}},"pick":"pool","v":{"model":{"day":5,"date":"2026-10-09","place":"薩爾斯堡","cc":"AT","lead":16,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/26","ready":false}},"ecmwf":{"day":5,"date":"2026-10-09","place":"薩爾斯堡","cc":"AT","lead":16,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/26","ready":false}},"pool":{"day":5,"date":"2026-10-09","place":"薩爾斯堡","cc":"AT","lead":16,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":430,"alt":null,"dt":{"a":13.3,"h":17,"l":8.6,"c":67,"p":40,"mm":1,"lo":8.4,"hi":15.3},"p":{"morn":{"a":10.5,"h":13.3,"l":8.6,"c":74,"p":31,"mm":0.5,"lo":5.6,"hi":13.4},"noon":{"a":16,"h":17,"l":14.4,"c":76,"p":38,"mm":0.6,"lo":9.6,"hi":19},"night":{"a":12.5,"h":14.4,"l":11.1,"c":72,"p":40,"mm":0.6,"lo":7.1,"hi":15.2},"dawn":{"a":9.9,"h":11,"l":8.8,"c":76,"p":33,"mm":0.6,"lo":5.3,"hi":13.1}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/06","ready":true}}},"avail":[{"src":"GeoSphere AROME","res":"2.5 km","from":"10/08","ready":false},{"src":"DWD ICON-D2","res":"2.2 km","from":"10/08","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/05","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/03","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/26","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/26","ready":false}},
{"day":6,"date":"2026-10-10","place":"國王湖／上湖","cc":"DE","lead":17,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":786,"alt":null,"dt":{"a":12.5,"h":15.6,"l":9,"c":84,"p":54,"mm":2.8,"lo":7.2,"hi":17.1},"p":{"morn":{"a":10.8,"h":12.9,"l":9.1,"c":88,"p":44,"mm":1.5,"lo":5,"hi":14},"noon":{"a":14.7,"h":15.6,"l":13.5,"c":89,"p":44,"mm":1.3,"lo":8,"hi":20.1},"night":{"a":10.6,"h":12.3,"l":9.2,"c":87,"p":46,"mm":1.1,"lo":6.3,"hi":15.9},"dawn":{"a":10.1,"h":10.6,"l":9.4,"c":86,"p":40,"mm":1.5,"lo":4.9,"hi":13.4}},"pick":"pool","v":{"model":{"day":6,"date":"2026-10-10","place":"國王湖／上湖","cc":"DE","lead":17,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/27","ready":false}},"ecmwf":{"day":6,"date":"2026-10-10","place":"國王湖／上湖","cc":"DE","lead":17,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/27","ready":false}},"pool":{"day":6,"date":"2026-10-10","place":"國王湖／上湖","cc":"DE","lead":17,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":786,"alt":null,"dt":{"a":12.5,"h":15.6,"l":9,"c":84,"p":54,"mm":2.8,"lo":7.2,"hi":17.1},"p":{"morn":{"a":10.8,"h":12.9,"l":9.1,"c":88,"p":44,"mm":1.5,"lo":5,"hi":14},"noon":{"a":14.7,"h":15.6,"l":13.5,"c":89,"p":44,"mm":1.3,"lo":8,"hi":20.1},"night":{"a":10.6,"h":12.3,"l":9.2,"c":87,"p":46,"mm":1.1,"lo":6.3,"hi":15.9},"dawn":{"a":10.1,"h":10.6,"l":9.4,"c":86,"p":40,"mm":1.5,"lo":4.9,"hi":13.4}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/07","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/09","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/06","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/04","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/27","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/27","ready":false}},
{"day":7,"date":"2026-10-11","place":"哈修塔特","cc":"AT","lead":18,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":519,"alt":null,"dt":{"a":13.9,"h":17.7,"l":9.8,"c":65,"p":50,"mm":1.3,"lo":8.4,"hi":18.4},"p":{"morn":{"a":11.9,"h":14.2,"l":9.8,"c":67,"p":38,"mm":0.6,"lo":7.2,"hi":15.8},"noon":{"a":16.9,"h":17.7,"l":15.7,"c":74,"p":42,"mm":0.8,"lo":9.9,"hi":21},"night":{"a":12.9,"h":14.8,"l":11.2,"c":78,"p":44,"mm":0.7,"lo":7,"hi":16.6},"dawn":{"a":10.5,"h":10.9,"l":9.9,"c":79,"p":38,"mm":0.7,"lo":6.2,"hi":15.2}},"pick":"pool","v":{"model":{"day":7,"date":"2026-10-11","place":"哈修塔特","cc":"AT","lead":18,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/28","ready":false}},"ecmwf":{"day":7,"date":"2026-10-11","place":"哈修塔特","cc":"AT","lead":18,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/28","ready":false}},"pool":{"day":7,"date":"2026-10-11","place":"哈修塔特","cc":"AT","lead":18,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":519,"alt":null,"dt":{"a":13.9,"h":17.7,"l":9.8,"c":65,"p":50,"mm":1.3,"lo":8.4,"hi":18.4},"p":{"morn":{"a":11.9,"h":14.2,"l":9.8,"c":67,"p":38,"mm":0.6,"lo":7.2,"hi":15.8},"noon":{"a":16.9,"h":17.7,"l":15.7,"c":74,"p":42,"mm":0.8,"lo":9.9,"hi":21},"night":{"a":12.9,"h":14.8,"l":11.2,"c":78,"p":44,"mm":0.7,"lo":7,"hi":16.6},"dawn":{"a":10.5,"h":10.9,"l":9.9,"c":79,"p":38,"mm":0.7,"lo":6.2,"hi":15.2}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/08","ready":true}}},"avail":[{"src":"GeoSphere AROME","res":"2.5 km","from":"10/10","ready":false},{"src":"DWD ICON-D2","res":"2.2 km","from":"10/10","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/07","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/05","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/28","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/28","ready":false}},
{"day":8,"date":"2026-10-12","place":"哈修塔特→基姆湖","cc":"DE","lead":19,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":525,"alt":null,"dt":{"a":11.9,"h":14.9,"l":7.9,"c":65,"p":38,"mm":1.3,"lo":7,"hi":15.5},"p":{"morn":{"a":9.1,"h":12.1,"l":7.9,"c":85,"p":31,"mm":0.7,"lo":4.8,"hi":12.8},"noon":{"a":14.2,"h":14.9,"l":12.7,"c":70,"p":27,"mm":0.6,"lo":9.7,"hi":18.3},"night":{"a":10.5,"h":12.1,"l":9.4,"c":49,"p":27,"mm":0.5,"lo":6.4,"hi":14.9},"dawn":{"a":8.7,"h":9.7,"l":7.8,"c":81,"p":35,"mm":0.6,"lo":4,"hi":12.3}},"pick":"pool","v":{"model":{"day":8,"date":"2026-10-12","place":"哈修塔特→基姆湖","cc":"DE","lead":19,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/29","ready":false}},"ecmwf":{"day":8,"date":"2026-10-12","place":"哈修塔特→基姆湖","cc":"DE","lead":19,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/29","ready":false}},"pool":{"day":8,"date":"2026-10-12","place":"哈修塔特→基姆湖","cc":"DE","lead":19,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":525,"alt":null,"dt":{"a":11.9,"h":14.9,"l":7.9,"c":65,"p":38,"mm":1.3,"lo":7,"hi":15.5},"p":{"morn":{"a":9.1,"h":12.1,"l":7.9,"c":85,"p":31,"mm":0.7,"lo":4.8,"hi":12.8},"noon":{"a":14.2,"h":14.9,"l":12.7,"c":70,"p":27,"mm":0.6,"lo":9.7,"hi":18.3},"night":{"a":10.5,"h":12.1,"l":9.4,"c":49,"p":27,"mm":0.5,"lo":6.4,"hi":14.9},"dawn":{"a":8.7,"h":9.7,"l":7.8,"c":81,"p":35,"mm":0.6,"lo":4,"hi":12.3}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/09","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/11","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/08","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/06","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/29","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/29","ready":false}},
{"day":9,"date":"2026-10-13","place":"慕尼黑","cc":"DE","lead":20,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":524,"alt":null,"dt":{"a":11.5,"h":15.3,"l":7.9,"c":63,"p":25,"mm":1.7,"lo":7.4,"hi":16.1},"p":{"morn":{"a":9.2,"h":12.1,"l":7.9,"c":66,"p":23,"mm":0.9,"lo":4.8,"hi":13.1},"noon":{"a":14.6,"h":15.3,"l":12.7,"c":57,"p":19,"mm":0.8,"lo":10.1,"hi":19.4},"night":{"a":11.1,"h":13.2,"l":10.5,"c":69,"p":27,"mm":0.6,"lo":7.3,"hi":15.7},"dawn":{"a":8.9,"h":9.7,"l":8.2,"c":60,"p":29,"mm":0.6,"lo":3.8,"hi":13.1}},"pick":"pool","v":{"model":{"day":9,"date":"2026-10-13","place":"慕尼黑","cc":"DE","lead":20,"kind":"none","far":{"src":"ECMWF IFS","res":"0.25°","from":"09/30","ready":false}},"ecmwf":{"day":9,"date":"2026-10-13","place":"慕尼黑","cc":"DE","lead":20,"kind":"none","far":{"src":"ECMWF ENS 系集","res":"0.25°","from":"09/30","ready":false}},"pool":{"day":9,"date":"2026-10-13","place":"慕尼黑","cc":"DE","lead":20,"src":"GEFS＋GEM 系集","res":"0.5°","kind":"ens","conf":"low","pk":"members","members":52,"elev":524,"alt":null,"dt":{"a":11.5,"h":15.3,"l":7.9,"c":63,"p":25,"mm":1.7,"lo":7.4,"hi":16.1},"p":{"morn":{"a":9.2,"h":12.1,"l":7.9,"c":66,"p":23,"mm":0.9,"lo":4.8,"hi":13.1},"noon":{"a":14.6,"h":15.3,"l":12.7,"c":57,"p":19,"mm":0.8,"lo":10.1,"hi":19.4},"night":{"a":11.1,"h":13.2,"l":10.5,"c":69,"p":27,"mm":0.6,"lo":7.3,"hi":15.7},"dawn":{"a":8.9,"h":9.7,"l":8.2,"c":60,"p":29,"mm":0.6,"lo":3.8,"hi":13.1}},"far":{"src":"GEFS＋GEM 系集","res":"0.5°","from":"09/10","ready":true}}},"avail":[{"src":"DWD ICON-D2","res":"2.2 km","from":"10/12","ready":false},{"src":"DWD ICON-EU","res":"7 km","from":"10/09","ready":false},{"src":"DWD ICON","res":"11 km","from":"10/07","ready":false},{"src":"ECMWF IFS","res":"0.25°","from":"09/30","ready":false}],"far":{"src":"ECMWF IFS","res":"0.25°","from":"09/30","ready":false}}];
/* FC:END */
























/* 準備清單。依時間軸分三區：出發前必辦／行李清單／旅途中待辦。
   同一件事若「要先去辦」和「要記得帶」是兩個動作（國際駕照、護照、歐元現金、
   AirTag、保險憑證、處方藥），兩區各列一次，打包當天才不會因為「我辦過了」而漏帶。
   氣候數值取自本檔 FC，票券與待確認事項取自行程總檔與 TRIP_FACTS。

   勾選狀態存在各自裝置的 localStorage，不會同步給其他人，且是以 item id 為鍵的
   扁平物件。因此既有項目的 id 一律不得更動——即使文案改寫、即使換到別區——
   否則大家已經勾好的狀態會全部失效。只有新增項目才配新 id，且必須全域唯一。 */
const CHECKLIST = [
{ id:"before", title:"出發前必辦", groups:[

  { id:"doc", title:"證件與駕駛", items:[
    ["doc1","護照效期確認",""],
    ["doc2","國際駕照、駕照正本",""],
    ["doc3","護照與駕照掃描電子檔備份",""],
  ]},

  { id:"ins", title:"保險", items:[
    ["ins1","申根保險 － 香港、德國、奧地利",""],
    ["ins4","保單電子檔與緊急聯絡電話存成離線可讀",""],
    ["ins5","列印保險＆憑證紙本",""],
  ]},

  { id:"fx", title:"金流", items:[
    ["fx1","歐元現金","停車場、山區小店、公廁常只收現金"],
    ["fx2","信用卡開通海外交易",""],
    ["fx3","備妥 2 張不同發卡組織的卡","Visa 與 Mastercard 各一，避免單一系統失效"],
    ["fx4","（駕駛人）確認押金卡是本人名義正卡","SIXT 押金只認主駕駛本人的卡，取車凍結 €500，額度要留夠"],
  ]},

  { id:"net", title:"通訊與離線資料", items:[
    ["net1","網路 － eSIM 實體皆可",""],
    ["net3","Google Maps 德奧區域離線下載","必須在 Wi-Fi 環境先做；山區與國王湖一帶訊號不穩"],
  ]},

  { id:"emg", title:"緊急聯絡與醫療", items:[
    ["net4","存好歐洲通用緊急電話 112","德奧共用，警察、消防、救護皆可，免費且不需區碼"],
    ["emg1","存好外交部旅外急難救助 800-0885-0885","德國境內撥 00-800-0885-0885。奧地利不在適用名單內，在奧地利改打駐奧地利代表處，或付費專線 00-886-800-085-095"],
    ["emg2","存好 SIXT 道路救援與分店電話","車輛相關問題一律先打 SIXT，自行處理可能影響理賠"],
    ["emg3","存好六筆住宿的聯絡方式","住宿 2、3、4、5 都要求事先約定抵達時間，路上誤點也要通知得到人"],
    ["emg5","設定手機鎖定畫面緊急聯絡人與醫療卡","自己無法應答時，他人能直接從鎖定畫面取得資訊"],
    ["md5","掛號請醫師開英文處方箋","要配合門診時間，不能拖到最後一週。隨身攜帶的處方藥需要它佐證"],
  ]},

  /* 原「裝備準備」，使用者改為「非必要」——有更好，沒有也不影響出發 */
  { id:"gear", title:"非必要", items:[
    ["gr1","AirTag 配對到自己的 Apple ID 並確認電量",""],
    ["gr2","兩吋照片　備用",""],
  ]},

]},

{ id:"pack", title:"行李清單", note:"打包當天逐項對照。上面辦好的東西，實體有沒有進包包是另一件事。", groups:[

  { id:"carry", title:"隨身行李・不可托運", items:[
    ["ca1","護照正本",""],
    ["ca2","護照影本","與正本分開放，遺失時補發用"],
    ["ca3","國際駕照正本 ＋ 台灣駕照正本","德奧租車兩者都要出示，缺一不可"],
    ["ca4","本人名義的信用卡正卡","SIXT 押金只認駕駛人本人的卡"],
    ["ca5","歐元現金",""],
    ["ca6","保險憑證紙本",""],
    ["md2","慣用處方藥 ＋ 英文處方箋","藥品放隨身，托運行李延誤或遺失時才不會斷藥"],
    ["el2","行動電源","法規禁止托運，一定要放隨身"],
    ["ca8","手機、相機",""],
  ]},

  { id:"med", title:"藥品", items:[
    ["md1","個人常備藥","腸胃藥、止痛藥、感冒藥，帶自己的份量"],
    ["md3","暈車藥","全程山路多"],
    ["md4","列好德國藥局採買清單","Day 3 米滕瓦爾德車站藥局，週三營業至 18:00；缺貨則 Day 8 慕尼黑補買"],
  ]},

  { id:"cloth", title:"衣物", items:[
    ["cl1","洋蔥式分層：保暖中層","白天 10–13 °C、清晨 7–9 °C，日夜溫差 6–8 °C"],
    ["cl2","防水外層","九天白天雲量 63–74%，四天降雨機率 ≥50%"],
    ["cl3","折傘，隨身不放車上","Day 2 新天鵝堡固定入場、Day 5 薩爾斯堡全日步行，都是雨機率最高的日子"],
    ["cl4","防滑步行鞋","Day 6 上湖步道與畫家角有潮濕、偏窄路段"],
    ["cl5","楚格峰裝備：羽絨或厚外套、手套、毛帽","峰頂白天均溫 −2.6 °C、日間最高僅 1.3 °C，山下加件外套不夠"],
    ["cl6","一套較正式的衣物","薩爾斯堡與哈修塔特的晚餐"],
  ]},

  { id:"elec", title:"電子與配件", items:[
    ["el1","歐規轉接頭 Type C／F，自己至少 1 個","建議 2 個，手機與行動電源可同時充"],
    ["el3","（導航者）車用手機支架與充電線","八天自駕導航用"],
    ["el4","相機電池與記憶卡",""],
    ["el5","AirTag 放進托運行李箱","已配對好的那顆；轉機行李沒跟上時才找得到"],
  ]},

  { id:"boat", title:"遊船攜帶限制", items:[
    ["bt1","確認 Day 6 隨身包沒有噴霧類","防曬噴霧、髮膠都算。國王湖遊船禁帶大件行李、行李箱、背架、刀具、玻璃瓶與噴霧，入口會抽查包包"],
  ]},

]},

{ id:"trip", title:"旅途中待辦", groups:[

  { id:"arr", title:"抵達後", items:[
    ["doc4","10/05 當晚清點自己的證件","護照、駕照、信用卡；總檔 Day 1 列為當晚全員確認事項"],
  ]},

  { id:"tkt", title:"票券", items:[
    ["tkt3","薩爾斯堡卡 24 小時","€38／人，10/08 晚上線上購買並選 10/09；確認自己收到個人卡連結並存成離線可讀"],
    ["tkt4","薩爾斯堡住宿交通票","入住時向住宿方領取自己那張"],
    ["tkt2","哈修塔特鹽礦＋纜車套票","10/12 09:30 場次，€49／人。尚未購票，購買前先確認鹽礦與新纜車已正式重新開放"],
    ["tkt5","高山纜車票不要預購","楚格峰與北鏈都依當日 Webcam 與營運狀況現場決定，官方明示天候不佳不退改"],
  ]},

]},
];

/* 駐外館處與急難救助。資料查證日 2026-09-19，來源：
   外交部全球資訊網駐外館處頁、各處官網、外交部領事事務局。
   出發前請再次核對，號碼與服務時間可能異動。 */
const EMERGENCY = {
  local: { label:"當地緊急電話", num:"112", dial:"112",
    note:"德國與奧地利共用，警察、消防、救護皆可，免費且不需區碼" },
  lines: [
    { label:"旅外國人急難救助全球免付費專線", num:"800-0885-0885", dial:"008008850885",
      where:"德國境內撥打：先撥 00，即 00-800-0885-0885",
      warn:"奧地利不在適用的 22 個國家名單內，在奧地利請改打駐奧地利代表處急難電話或下方付費專線" },
    { label:"外交部緊急聯絡中心（自國外撥打）", num:"+886-800-085-095", dial:"+886800085095",
      where:"德奧境內需先撥 00，即 00-886-800-085-095。此為付費電話", warn:"" },
    { label:"外交部緊急聯絡中心（台灣境內免付費）", num:"0800-085-095", dial:"0800085095",
      where:"供台灣親友代為聯繫，24 小時有人接聽", warn:"" },
  ],
};

/* 租車與道路。號碼於 2026-09-20 查證自 SIXT 說明中心、ADAC、ÖAMTC、ASFINAG 官方頁面。
   租約條款優先於此處任何說明，出發前以租車確認單為準。 */
/* 票券。已購兩筆為指定日期時間、不可改期退費。
   票面 QR、訂單編號與發票個資一律不寫進此處，也不放上公開網站。 */
const TICKETS = {
  bought:[
    {
      day:2, date:"10/06（二）", city:"霍恩施萬高", ac:"nsw",
      name:"新天鵝堡 Schloss Neuschwanstein",
      big:"11:45", bigk:"入場時間 Einlasszeit",
      addr:"Ticket Center Hohenschwangau・Alpseestraße 12, 87645 Hohenschwangau", geo:"nsw-p4",
      kv:[
        ["導覽團號","Tour 445"],
        ["語言","Audiotour Mandarin（中文語音導覽）"],
        ["票種","Erwachsen 成人 × 4"],
        ["金額","€21.00 ＋ 預售費 €2.50 ＝ €23.50／人，合計 €94.00"],
      ],
      tel:["+49 8362 930830","+498362930830"],
      warn:"遲到不補位、不改期、不退費。遺失或未使用皆無補償，只有官方因故關閉才全額退款。",
      rules:[
        ["抵達時間","官方建議提前 1.5–2 小時到 Hohenschwangau 村、提前 10–15 分鐘到城堡入口、提前 5 分鐘進中庭。本行程 09:40 抵 P4，提前 2 小時 05 分。"],
        ["出示方式","手機螢幕不可破損，**不可貼霧面或防窺膜**；建議另外列印黑白紙本備用。"],
        ["不可攜入","大件行李、行李箱、背架、刀具、玻璃瓶、噴霧。入口會抽查包包。"],
        ["其他禁令","商業攝影、空拍機；導覽途中不得脫隊離開指定路線。"],
        ["不含保障","接駁巴士、馬車與停車場皆為獨立業者，排隊可能很久，誤點不在票券保障內。"],
      ],
      links:[["官方參觀須知","https://www.hohenschwangau.de/"]],
    },
    {
      day:6, date:"10/10（六）", city:"國王湖", ac:"koe",
      name:"國王湖遊船 Königssee Schifffahrt",
      big:"08:45", bigk:"去程開船（Fahrt-Nr. 10）",
      addr:"Seelände 碼頭・Seestraße 55, 83471 Schönau am Königssee", geo:"koe-seelaende",
      kv:[
        ["航段","Seelände → Salet 薩雷特，來回票"],
        ["回程","時間自由選擇，船票務必留存"],
        ["票種","Erwachsene 成人 × 4"],
        ["金額","€29.80／人，合計 €119.20"],
        ["票券形式","團體票 1 張 ＋ 個人票 4 張（可分開持有）"],
        ["售票方","Bayerische Seenschifffahrt GmbH"],
      ],
      tel:["+49 8652 9636-0","+49865296360"],
      warn:"票面明定開船前 20 分鐘抵達 Seelände，即 08:25 前。未按預訂時間出現即喪失搭乘權，無補搭、無退費。",
      rules:[
        ["報到時間","**08:25 前**站到 Seelände 碼頭，行程已把停車段調整為 07:55–08:25。"],
        ["回程","13:00 只是目標班次，不是預約。後季回程原則約每 30 分鐘一班，以當日薩雷特碼頭公告為準。"],
        ["船期","2026 官方後季船期 09/15－10/11，本行程 10/10 在期間內。"],
      ],
      links:[["官方船期與公告","https://www.seenschifffahrt.de/en/koenigssee/"]],
    },
    {
      day:8, date:"10/12（一）", city:"哈修塔特", ac:"hal",
      name:"哈修塔特鹽礦＋纜車套票 Salzwelten Hallstatt",
      big:"10:50", bigk:"導覽開始 Tour-Beginn",
      addr:"鹽礦纜車山下站・Salzbergstraße 21, 4830 Hallstatt", geo:"salzwelten-tal",
      kv:[
        ["內容","鹽礦導覽 ＋ 纜車來回（with funicular round trip）"],
        ["票種","成人套票 × 4"],
        ["金額","€49.00／人，合計 €196.00（含稅）"],
        ["售票方","Salzwelten Hallstatt"],
      ],
      tel:["+43 6132 200 24 00","+4361322002400"],
      warn:"已由原訂 10/11 10:30 改期至 10/12（一）10:50 場次。依官方售票條款仍可再改期（現場售票口、info@salzwelten.at 或電話），參觀前 72 小時以上來信可免費取消，即 10/09 10:50 前。",
      rules:[
        ["報到時間","官方要求**導覽前 45 分鐘**抵達纜車山下站，即 **10:05 前**；含纜車上山與約 15 分鐘步行至 Knappenhaus 集合點。"],
        ["入場方式","線上票可直接通過纜車閘門，不必到售票口排隊。"],
        ["回程纜車","不綁定時間，營運時間內任一班皆可，但要注意當日最後一班下山時間。"],
        ["礦內環境","坑內常年 8 °C，全程步行約 2 公里，需保暖外套與好走的鞋。"],
        ["建議停留","完整參觀約 3 小時，導覽本身 90 分鐘。"],
        ["停車","鹽礦沒有自己的停車場，纜車山下站旁為公有收費停車場，旺季需預留 1 小時找車位。本行程由住宿步行前往，不受影響。"],
      ],
      links:[["官方頁面","https://www.salzwelten.at/en/hallstatt/"],["購票條款","https://www.salzwelten.at/en/service/legal-conditions/terms-and-conditions-ticketshop"]],
    },
  ],
  /* 票面 QR、訂單確認信與掃描檔放在共用雲端資料夾，網站本身不存票面。 */
  drive:{
    url:"https://drive.google.com/drive/folders/14DUeHWMCKO3p5xdhBMM96YLZ-8TwfCP2?usp=sharing",
    label:"票券連結",
    note:"出發前請先下載",
  },
  later:[
    { day:3, date:"10/07（三）", city:"艾布湖", ac:"zug",
      name:"楚格峰纜車 Seilbahn Zugspitze", big:"08:30", bigk:"首班纜車，A 方案當天現場買",
      addr:"艾布湖站 Talstation Eibsee・Am Eibsee 1, 82491 Grainau", geo:"eibsee-park",
      price:"成人 €78／人（Ticket Zugspitze，含上下山與冰川纜車）",
      how:"**尚未購買，一律不預購**。07:30 依峰頂 Webcam 能見度與營運狀況決定走 A 或 B 方案，決定上山才在艾布湖站購票。官方明示天候不佳不退改。" },
    { day:4, date:"10/08（四）", city:"因斯布魯克", ac:"nord",
      name:"北鏈纜車 Top of Innsbruck", big:"09:30", bigk:"Congress 山下站現場買，A 方案才買",
      addr:"Hungerburgbahn Station Congress・Rennweg 3, 6020 Innsbruck", geo:"hungerburgbahn",
      price:"成人來回 €56／人、4 人 €224",
      how:"**尚未購買，一律不預購**。買成人來回票，**不買 Innsbruck Card**（24 小時 €69／人，本日只安排半日）。Day 3 已搭過高山纜車或當日能見度不佳時改走 B 方案，就不買。" },
    { day:5, date:"10/09（五）", city:"薩爾斯堡", ac:"fest",
      name:"薩爾斯堡卡 Salzburg Card 24 小時", big:"10/08 晚", bigk:"線上購買，使用日選 10/09",
      addr:"Tourist Info Mozartplatz・Mozartplatz 5, 5020 Salzburg（線上失敗時的實體購買點）", geo:"residenzplatz",
      price:"€38／人、4 人 €152",
      how:"**尚未購買**。含要塞纜車與各館入場。單次訂單可購 4 張具名卡，收到 Email 後把每張個人卡片連結分別轉傳，並**存成離線可讀**，不要只留在信箱。線上購買失敗時，10/09 09:00–18:00 可至 Tourist Info Mozartplatz 或 Hauptbahnhof 買實體卡。" },
    { day:4, date:"10/08（四）", city:"薩爾斯堡",
      name:"薩爾斯堡住宿交通票", big:"入住時", bigk:"向住宿方領取，每人一張",
      addr:"In the heart of the city of Salzburg・Bürglsteinstraße 19, 5020 Salzburg", geo:"szg-stay",
      price:"含於房價",
      how:"每人一張，領到後自己收好。Day 5 市區公車用這張；薩爾斯堡卡也含大眾運輸，兩者都帶。" },
  ],
};

/* 抵達攻略。各景點怎麼上去、怎麼下來、要提前多久。
   新天鵝堡以票券 PDF（Online-Ticket、Information for Visitors、Site Regulations、T&C）為準；
   其餘取自各官方網站 2026-09-20 查證。票面 QR 與訂單編號一律不寫進此處。 */
const ACCESS = [
  {
    id:"nsw", day:2, date:"10/06（二）", name:"新天鵝堡 Schloss Neuschwanstein", sub:"Tour 445・11:45 固定入場・4 張成人票已購",
    big:"09:40", bigk:"抵達 P4 停車場，提前 2 小時 05 分", geo:"nsw-p4",
    src:"票券 PDF：Online-Ticket、Information for Visitors、Site Regulations",
    lead:[
      ["官方建議","到 Hohenschwangau 村至少提前 1.5–2 小時；到城堡入口提前 10–15 分鐘；票面另寫中庭約提前 15 分鐘。本行程 09:40 抵達，11:30 前到入口。"],
      ["票怎麼出示","票面左上角 QR 在中庭閘門直接掃。手機要充飽電、螢幕不可破損、**不可貼霧面或深色保護膜**；官方希望列印黑白紙本，帶一份備用。"],
      ["遲到","票只在票面日期與時間有效。遲到不補位、不改期、不退費；只有官方因故關閉才全額退。"],
    ],
    up:[
      ["1","P4 停車","在村內 P4 停車，上洗手間、整理票券。車內不留任何外露行李。"],
      ["2","接駁巴士","候車站就在 P4 旁的山谷站。上山 €3.50／人、來回 €5.00，無固定時刻、約 20 分鐘一班，下雪結冰時停駛。人多時等候可能很久。"],
      ["3","Jugend 觀景點下車","巴士終點在瑪麗安橋旁的 Jugend 觀景點，走幾分鐘到瑪麗安橋看城堡正面。橋在惡劣天候或結冰時會封閉，封閉就直接往城堡。"],
      ["4","下坡到城堡","瑪麗安橋 → 城堡入口是下坡約 500 m、10–15 分鐘。**11:00 最晚離開瑪麗安橋**。"],
      ["5","入口與中庭","入口電子看板顯示導覽團號 445 才進去；包包會被抽查。提前 5–15 分鐘進中庭，在閘門掃 QR，導覽約 35 分鐘。"],
    ],
    down:[
      ["步行","城堡 → 村內約 30–40 分鐘下坡路，是最穩的方式，不用等車。"],
      ["馬車","城堡下方有馬車站，車程約 20 分鐘，只到村內，排隊視現場。"],
      ["巴士","回程巴士站在 Jugend 觀景點，要先爬回瑪麗安橋方向，不建議。"],
    ],
    notes:[
      ["不可攜入城堡","大件行李、行李箱、嬰兒背架、推車、刀具、剪刀、工具、玻璃瓶、噴霧、胡椒噴劑。拒檢即喪失參觀權並被請離。"],
      ["場地規定","導覽中不得離開指定路線；全區禁空拍機、禁商業攝影、禁吸菸與明火。"],
      ["巴士、馬車、停車場都不在票券保障內","三者皆為獨立業者，排隊與延誤自負；票券文件明寫抵達風險由訪客承擔。"],
    ],
    links:[["官方參觀須知 hohenschwangau.de","https://www.hohenschwangau.de/en/visitor-information"],["如何前往城堡","https://www.hohenschwangau.de/en/visitor-information/how-to-reach-the-castles"]],
  },
  {
    id:"zug", day:3, date:"10/07（三）A 方案", name:"楚格峰纜車 Seilbahn Zugspitze", sub:"艾布湖 Eibsee 站上山・2962 m",
    big:"08:30", bigk:"首班纜車開出時間，直接搭首班", geo:"eibsee-park",
    src:"zugspitze.de 營運時間、票價、FAQ",
    lead:[
      ["先看再買","**07:30 依峰頂 Webcam 能見度決定 A／B**，決定上山才在艾布湖站購票。官方明示天候不佳不退不改，所以絕不預購。"],
      ["時間預算","官方建議整趟至少 2–3 小時；行程給 08:30–12:15。"],
      ["票價","Ticket Zugspitze 成人 €78（2026-05-23 起），含一次上山、一次下山（纜車或齒軌任選）與一次冰川纜車。"],
    ],
    up:[
      ["1","艾布湖停車場","收費停車場緊鄰纜車站，帶信用卡。09:00 後遊客陸續抵達，首班最不用排。"],
      ["2","Seilbahn Zugspitze","09 月至 06 月 08:30–16:45 營運，至少每 30 分鐘一班、人多加開，10 分鐘直上峰頂。最後上山為關閉前 30 分鐘。"],
      ["3","峰頂 → 冰川平台","Gletscherbahn 冰川纜車 08:45–16:25，每 10 分鐘一班、4 分鐘，票已含一趟；去冰川區、餐廳與教堂。"],
    ],
    down:[
      ["纜車原路","峰頂搭 Seilbahn 10 分鐘回艾布湖，最快。"],
      ["齒軌列車","從冰川平台 Zugspitzplatt 搭齒軌列車穿 4.5 km 隧道回艾布湖，車程長、班次固定，含等候預留約 1 小時；想體驗才選。"],
    ],
    notes:[
      ["高度","峰頂 2962 m，10 月常低於 0 °C 且風大；帶手套、帽子與防風層，高度不適就縮短停留。"],
      ["營運狀態","出發前看官方設施狀態頁，任一段停駛就改 B 方案。"],
    ],
    links:[["營運時間與時刻","https://zugspitze.de/en/Service-information/Opening-hours-timetables"],["設施狀態","https://zugspitze.de/en/Service-information/Facilities"]],
  },
  {
    id:"nord", day:4, date:"10/08（四）A 方案", name:"北鏈纜車 Nordkette・Top of Innsbruck", sub:"Congress 站 → Hungerburg → Seegrube → Hafelekar",
    big:"09:30", bigk:"到 Congress 山下站購票", geo:"hungerburgbahn",
    src:"nordkette.com 時刻、票價、交通",
    lead:[
      ["適用條件","Day 3 沒搭到高山纜車，且當日 Nordkette 正常營運、山頂能見度好。否則走 B 方案，不買票。"],
      ["票","現場買 Top of Innsbruck 成人來回票 €56／人，4 人 €224；**不買 Innsbruck Card**。"],
      ["時間預算","三段連貫上到 Hafelekar 約 30 分鐘，行程給 10:00–12:00 在山上、13:00–14:00 下山。"],
    ],
    up:[
      ["1","停車","官方推薦 InnenSTADT Garage（Kaiserjägerstraße 1），08:00–18:00 全日 €4，需在 Altstadt 站售票處蓋章折抵；步行 5 分鐘到 Congress 站。行程原定 Congress／Altstadtgarage 亦可。"],
      ["2","Hungerburgbahn","平日 07:15–19:15，每 15 分鐘一班，8 分鐘到 Hungerburg。"],
      ["3","Seegrubenbahn","08:30–17:30，每 15 分鐘一班，上到 Seegrube 1905 m。"],
      ["4","Hafelekarbahn","09:00–16:45，每 15 分鐘一班，上到 Hafelekar 2256 m，步行幾分鐘到山脊觀景點。"],
    ],
    down:[
      ["原路三段","Hafelekar 最後下山 17:00、Seegrube 17:30；行程 13:00 開始下山，可在 Hungerburg 短停看市區。"],
    ],
    notes:[
      ["能見度","Hafelekar 常在雲中而 Seegrube 晴，購票前看官方即時影像。"],
      ["風","風大時 Hafelekarbahn 會先停，只到 Seegrube 也值得。"],
    ],
    links:[["時刻與營運狀態","https://nordkette.com/en/facilities-/-timetable/"],["交通與停車","https://www.nordkette.com/en/service/approach/"]],
  },
  {
    id:"fest", day:5, date:"10/09（五）", name:"薩爾斯堡要塞纜車 FestungsBahn", sub:"Festungsgasse 4 山下站・薩爾斯堡卡直接刷",
    big:"14:40", bigk:"到山下站，要塞 17:00 關門", geo:"festungsbahn",
    src:"festung-hohensalzburg.at、salzburg.info",
    lead:[
      ["票","薩爾斯堡卡 24 小時本身就是纜車與要塞門票，**不用換票**，直接到閘門刷；沒卡才排售票。"],
      ["時間","10 月要塞 09:30–17:00、纜車 09:00–20:30。行程 14:40 上山、16:50 下山，實際參觀約 2 小時。"],
    ],
    up:[
      ["1","走到山下站","從主教座堂後方沿 Festungsgasse 上坡步行 5 分鐘到纜車站。"],
      ["2","FestungsBahn","每 10 分鐘一班、54 秒到頂。尖峰時排隊 10–20 分鐘。"],
    ],
    down:[
      ["纜車","同一張卡刷回山下，到 20:30。"],
      ["步行","沿 Festungsgasse 或 Nonnberg 方向下山約 15 分鐘，看夕陽時比排纜車快。"],
    ],
    notes:[
      ["住宿交通票","本日市區公車用住宿方給的交通票，薩爾斯堡卡也含大眾運輸，兩者都帶。"],
    ],
    links:[["要塞開放時間","https://www.festung-hohensalzburg.at/en/your-visit/opening-hours"],["FestungsBahn 資訊","https://www.salzburg.info/en/travel-info/arrival-traffic/cable_railway"]],
  },
  {
    id:"koe", day:6, date:"10/10（六）", name:"國王湖遊船 Königssee Schifffahrt", sub:"Seelände → Salet 薩雷特・Fahrt-Nr. 10・4 張成人來回票已購",
    big:"08:25", bigk:"票面規定開船前 20 分鐘到碼頭", geo:"koe-seelaende",
    src:"票券 PDF（Bayerische Seenschifffahrt）、seenschifffahrt.de",
    lead:[
      ["票面規定","08:45 開船，**開船前 20 分鐘要到 Seelände**；未按預訂時間出現即喪失搭乘權，無補搭無退費。行程停車段已調為 07:55–08:25。"],
      ["票的形式","1 張團體票＋4 張個人票，可分開持有。**回程要用同一張票，務必留存**。"],
    ],
    up:[
      ["1","停車","國王湖大停車場（收費），沿 Seestraße 步行約 10 分鐘到碼頭。"],
      ["2","候船","碼頭依班次排隊，出示 QR 上船。Seelände → 聖巴多羅買約 35 分鐘、→ 薩雷特約 1 小時；本日不在聖巴多羅買下船。"],
      ["3","薩雷特","上岸即走上湖步道，12:10 必須回到碼頭區。"],
    ],
    down:[
      ["回程船","時間自由選擇，後季約每 30 分鐘一班，以薩雷特碼頭當日公告為準；目標 13:00 班，13:55 回 Seelände。"],
    ],
    notes:[
      ["停航","起霧、強風、高水位時船班可能延誤或停航；薩雷特停航但聖巴多羅買正常時改往返聖巴多羅買。"],
      ["船期","2026 官方後季船期至 10/11，本日在期間內。"],
    ],
    links:[["官方船期與公告","https://www.seenschifffahrt.de/en/koenigssee/"]],
  },
  {
    id:"hal", day:8, date:"10/12（一）", name:"哈修塔特鹽礦 Salzwelten Hallstatt", sub:"鹽礦纜車 Salzbergbahn 上山・10:50 場次・4 張套票已購",
    big:"09:30", bigk:"住宿出發步行，10:05 前到纜車山下站", geo:"salzwelten-tal",
    src:"salzwelten.at 2026 開放時間、票價、參觀說明",
    lead:[
      ["購票","鹽礦＋纜車成人套票 €49，4 人 €196，已購 10/12 10:50 場次。2026-08-29 起隨新纜車重新開放，出發前再確認官網未臨時關閉。"],
      ["時間","10 月纜車 09:00–18:00、鹽礦 09:30–16:30，最後一場為關閉前 30 分鐘。導覽本身約 90 分鐘，含上山、步行與天空步道全程約 3 小時。"],
      ["年齡","4 歲以上可參加；沒有身高限制。"],
    ],
    up:[
      ["1","步行到山下站","住宿區步行 30 分鐘到 Salzbergbahn 山下站，官方要求導覽前 45 分鐘、即 10:05 前抵達。線上票直接過閘門，不必排售票口。"],
      ["2","纜車","新纜車無障礙，乘車約 2 分鐘上到哈修塔特高谷。"],
      ["3","走到 Knappenhaus","山頂站 → 礦工之家 Knappenhaus 約 15 分鐘步行，導覽在此集合開始。10:35 前到，10:50 場次。"],
      ["4","導覽","礦內恆溫 8 °C，穿保暖衣物與防滑鞋；現場一律加穿提供的連身防護衣。礦內步行約 2 km，有 64 m 礦工滑梯（可不滑走樓梯），最後搭礦車出洞。"],
    ],
    down:[
      ["天空步道","出洞後步行約 20 分鐘到 Skywalk 觀景台，再回山頂站。"],
      ["纜車","回程纜車不綁時間，搭纜車回山下站，**13:20 離開山下站**直接開往慕尼黑。"],
    ],
    notes:[
      ["隨身物","礦內步行 2 km 又要穿防護衣、滑滑梯，只帶小包最方便；大背包留在車上或住宿。"],
      ["停車","官方提醒哈修塔特停車至少多留 1 小時；本行程從住宿步行，不受影響。"],
    ],
    links:[["開放時間與票價","https://www.salzwelten.at/en/hallstatt/prices-opening-hours"],["參觀說明","https://www.salzwelten.at/en/hallstatt/discover-experience"]],
  },
];

/* 伴手禮與藥品。品項為德奧常見必買，購買點只列本行程會路過、且行程表已有時間的停留。
   價格與營業時間以現場為準；台灣入境限制見 notes。 */
const SHOP = {
  stops:[
    ["Day 1 14:20–15:50","慕尼黑卡爾廣場 Karlsplatz／Neuhauser Str.","dm、Rossmann、Müller 藥妝店，Galeria 百貨；Dallmayr 總店在 Dienerstraße 14–15，步行 8 分","karlsplatz"],
    ["Day 1 20:00–20:40","慕尼黑中央車站 EDEKA","超市食品、零食；車站內有藥局","muc-hbf"],
    ["Day 3 17:15–17:45","米滕瓦爾德車站藥局 Bahnhof-Apotheke","德國藥品主要採買點，週三到 18:00；指定品項先官網預訂","mit-apotheke"],
    ["Day 3 自由活動","米滕瓦爾德 REWE（Innsbrucker Str. 4）","德國超市零食、Ritter Sport、Haribo、芥末","obermarkt"],
    ["Day 4 A 方案 12:00–13:00","因斯布魯克老城 Herzog-Friedrich-Straße","Handl Tyrol Speck Stube（12 號，週四營業）、MPreis 超市、dm、Apotheke","inn-congress"],
    ["Day 5 全日","薩爾斯堡老城 Getreidegasse、Alter Markt","Fürst 總店 Brodgasse 13、Café Sacher Schwarzstraße 5–7、Spar／Billa、dm、Bipa、Apotheke","hohensalzburg"],
    ["Day 6 16:05–16:30","比紹夫斯維森 Edeka Winkl／Aldi Süd","德國超市；時間只有 25 分鐘，補買零食與芥末","bis-stay"],
    ["Day 8 11:50–12:00","哈修塔特 Salzwelten 山下站遊客中心商店","哈修塔特鹽、SalzZart 鹽花、鹽味巧克力；市集廣場另有 Salzkontor","salzwelten-tal"],
    ["Day 8 18:10–20:00","慕尼黑 Neuhauser Str.、考芬格街、國際路德維希藥局","**先買藥再逛商店**；藥局週一到 20:00，dm／Rossmann／Müller 約到 20:00","neuhauser"],
    ["Day 9 出境後","慕尼黑機場 MUC T2 免稅與 Dallmayr、Ritter Sport 專櫃","最後補買巧克力、咖啡；價格較市區高","muc-t1"],
  ],
  DE:{
    food:[
      ["Dallmayr 咖啡","慕尼黑百年總店，Prodomo 咖啡豆／粉是最不會錯的伴手禮，總店有禮盒與獨家包裝","Day 1／Day 8 慕尼黑總店 Dienerstraße 14–15；MUC 機場、任何超市有基本款","dallmayr"],
      ["Ritter Sport 巧克力","方塊巧克力，超市一片約 €1–1.5，口味多；機場有大盒裝","Day 1 EDEKA、Day 3 REWE、Day 6 Edeka／Aldi、Day 9 MUC","ritter"],
      ["Haribo 小熊軟糖","德國本地口味多於台灣，超市大包便宜","Day 1／3／6 任何超市","haribo"],
      ["Händlmaier 甜芥末 Süßer Senf","配白香腸的巴伐利亞甜芥末，玻璃罐要包好托運","Day 1 EDEKA、Day 6 Edeka；Viktualienmarkt 攤位","senf"],
      ["Bahlsen、Leibniz 餅乾與 Storck merci 巧克力","超市價格約台灣一半","任何德國超市","bahlsen"],
      ["Lebkuchen 薑餅、Spekulatius 香料餅","10 月初超市已開始上架聖誕季商品","Day 6 Edeka、Day 8 慕尼黑超市","lebkuchen"],
      ["Kinder 系列、Milka","歐洲版口味與台灣不同，Kinder Bueno 白巧、Milka Oreo 等","任何德國超市","kinder"],
      ["啤酒杯、Hofbräuhaus 周邊","1 L 陶杯或玻璃杯；不買啤酒本身，重且入境限 1 公升","Day 1／8 皇家啤酒屋商店、Neuhauser Str. 紀念品店","masskrug"],
      ["Niederegger 杏仁糖 Marzipan","北德呂北克名產，慕尼黑百貨與機場也有","Galeria、MUC 機場","niederegger"],
      ["Teekanne、Meßmer 花草茶","很輕、口味比台灣多，10 月已有冬季口味","任何德國超市"],
      ["Staedtler、Faber-Castell、Lamy 文具","德國文具品牌，送學生或上班族","Day 1／8 Galeria 百貨、Neuhauser Str."],
      ["WMF、Zwilling 雙人牌廚具","單價高，同店滿額可辦退稅；刀具只能托運","Day 1／8 Galeria 百貨"],
    ],
    med:[
      ["Bepanthen 修護軟膏","德國原廠版本便宜，藍色 Wund- und Heilsalbe 與嬰兒版 Baby 都常買","Day 3 米滕瓦爾德藥局、Day 8 路德維希藥局","bepanthen"],
      ["Wick VapoRub、Wick MediNait","德國版 Vicks，感冒夜用糖漿是熱門品","藥局 Apotheke","wick"],
      ["Grippostad C、Aspirin Complex","感冒複方，只在藥局賣，出示欲購清單即可","藥局 Apotheke","grippostad"],
      ["Voltaren Schmerzgel、Kytta 草本痠痛膏","肌肉關節止痛凝膠，德國價約台灣六成","藥局 Apotheke","voltaren"],
      ["Fenistil 凝膠","蚊蟲咬與過敏止癢","藥局 Apotheke","fenistil"],
      ["Iberogast 腸胃滴劑、Klosterfrau Melissengeist","經典腸胃與提神藥水","藥局 Apotheke","iberogast"],
      ["Doppelherz 雙心、Orthomol 保健品","維他命與魚油，dm／Rossmann 就有，比藥局便宜","Day 1／8 dm、Rossmann、Müller","doppelherz"],
      ["Kneipp、Tetesept 泡澡與精油","泡澡錠、精油沐浴，dm 貨最全","dm、Rossmann、Müller","kneipp"],
      ["Balea（dm 自有）、Weleda、Dr. Hauschka","Balea 保養極便宜；Weleda 金盞花、Dr. Hauschka 玫瑰系列德國價最低","Day 1／8 dm、Müller","balea"],
      ["Eucerin、Nivea 德國版","德國版配方與台灣不同，藥局與藥妝都有","dm、Apotheke","eucerin"],
      ["Hansaplast 防水 OK 繃、Compeed 水泡貼","步道多，自用也順手","dm、Apotheke","hansaplast"],
      ["Balea 時空膠囊 Konzentrat","一板 7 顆獨立包裝，顏色分功效（黃 Q10、藍保濕），好分送","Day 1／8 dm"],
      ["Kamill 護手霜","洋甘菊護手霜，便宜好用，秋冬送人實用","dm、Rossmann"],
      ["Ajona 濃縮牙膏、Elmex 牙膏","Ajona 一小條用很久，德國人常推薦","dm、Rossmann"],
      ["Alverde（dm 自有）、Lavera 有機保養","開架有機品牌，多數 €5 以下","Day 1／8 dm"],
      ["Sebamed 敏感肌系列","弱酸性洗沐與乳液，德國價比台灣低","dm、Rossmann、Apotheke"],
      ["Kamillosan 洋甘菊、Emser 喉糖","喉嚨保養；Emser 喉糖 dm 也有，Kamillosan 在藥局","藥局 Apotheke、dm"],
    ],
  },
  AT:{
    food:[
      ["Fürst 原創莫札特巧克力球 Original Salzburger Mozartkugel","銀藍紙、手工，只在薩爾斯堡 Fürst 四家店販售；保存期短約 8 週，最後幾天買","Day 5 Fürst 總店 Brodgasse 13、Alter Markt、Ritzerbogen、Mirabellplatz","fuerst"],
      ["Mirabell 莫札特巧克力球","紅金紙工業版，超市與機場都有，便宜好分送","Day 5 Spar／Billa、Day 9 MUC 也有","mirabell"],
      ["Manner 威化 Neapolitaner","維也納粉紅包裝榛果威化，奧地利國民零食，超市最便宜","Day 4／5 Spar、Billa、MPreis","manner"],
      ["Julius Meinl 小紅帽咖啡","1862 年創立的維也納咖啡，豆／粉都有，和莫札特巧克力、Manner 並列不出錯三寶","Day 4／5 Spar、Billa"],
      ["Original Sacher-Torte 木盒","薩爾斯堡 Café Sacher 有售，可保存約 2 週，木盒好托運","Day 5 Café Sacher Schwarzstraße 5–7","sacher"],
      ["哈修塔特鹽 Hallstatt Salz、SalzZart 鹽花","Salinen Austria 出品，罐裝或木盒，輕好帶","Day 8 Salzwelten 山下站商店、市集廣場鹽店","hallstattsalz"],
      ["Zotter 巧克力","施泰爾馬克手工巧克力，口味怪奇，Spar 高級線與紀念品店有","Day 4／5 Spar Gourmet、Getreidegasse","zotter"],
      ["Darbo 果醬、Staud's 果醬","提洛 Darbo 杏桃果醬是奧地利代表，小罐裝適合送人","Day 4 MPreis、Day 5 Spar／Billa","darbo"],
      ["南瓜籽油 Kürbiskernöl、Almdudler 汽水","施泰爾馬克南瓜籽油要托運包好；Almdudler 鋁罐當地喝就好","Spar、Billa","kernoel"],
      ["Handl Tyrol 提洛煙燻火腿 Speck","提洛名產，**豬肉製品不得帶入台灣**，只買來當地吃","Day 4 Handl Tyrol Speck Stube Herzog-Friedrich-Str. 12","speck"],
    ],
    med:[
      ["Bepanthen、Voltadol Forte","奧地利版 Voltaren 叫 Voltadol；奧地利藥品只在 Apotheke 賣，dm／Bipa 不賣藥","Day 4 因斯布魯克、Day 5 薩爾斯堡 Apotheke","voltadol"],
      ["Cetebe 長效維他命 C","奧地利藥局長銷品，膠囊裝","Apotheke","cetebe"],
      ["Wick、Neo-Angin、Isla-Moos 喉糖","與德國同品牌，奧地利價通常略高，德國買得到就在德國買","Apotheke","neoangin"],
      ["Mucosolvan 化痰、Aspro","奧地利藥局常備","Apotheke","mucosolvan"],
      ["Bipa／dm 自有保養、Weleda 奧地利製","Bipa 是奧地利本土藥妝，自有品牌便宜；Weleda 部分品項為奧地利製","Day 5 薩爾斯堡 Bipa、dm","bipa"],
      ["Salzburg 鹽療產品、Hallstatt 鹽泡澡鹽","鹽花泡澡鹽、鹽膚品，Salzwelten 商店最齊","Day 8 Salzwelten 商店","salzbad"],
    ],
  },
  /* 商品圖：Wikimedia Commons 自由授權照片，[key, 檔名, 作者, 授權, 來源頁]。頁面用 title 逐張標作者與授權。 */
  credits:[["dallmayr","Dallmayr Classic.jpg","WrS.tm.pl (Wikimedia Commons uploader)","Public domain","https://commons.wikimedia.org/wiki/File:Dallmayr_Classic.jpg"],["ritter","Edel-vollmilch - Ritter Sport, Hillegersberg, Rotterdam (2021) 01.jpg","Donald Trung Quoc Don","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Edel-vollmilch_-_Ritter_Sport,_Hillegersberg,_Rotterdam_(2021)_01.jpg"],["haribo","Haribo Matador Mix Bag.jpg","Knud Winckelmann","CC BY-SA 3.0","https://commons.wikimedia.org/wiki/File:Haribo_Matador_Mix_Bag.jpg"],["bahlsen","2524Leibniz Keks 01.jpg","Judgefloro","CC0","https://commons.wikimedia.org/wiki/File:2524Leibniz_Keks_01.jpg"],["lebkuchen","Lebkuchen Schmidt cake box Nuremberg 03.jpg","Tess Mattew","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Lebkuchen_Schmidt_cake_box_Nuremberg_03.jpg"],["kinder","Kinder Bueno - 1 Half unwrapped.jpg","Infrogmation","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Kinder_Bueno_-_1_Half_unwrapped.jpg"],["masskrug","Masskrug neutral.jpg","Luitold","CC BY-SA 3.0","https://commons.wikimedia.org/wiki/File:Masskrug_neutral.jpg"],["niederegger","Niederegger products.jpg","Johan Elisson","CC BY-SA 3.0","https://commons.wikimedia.org/wiki/File:Niederegger_products.jpg"],["bepanthen","Bepanthen® — BAYER — Augen- und Nasensalbe (Dexpanthenol) mit Verpackung und Beipackzettel — Deutschland.jpg","Mattes","Public domain","https://commons.wikimedia.org/wiki/File:Bepanthen%C2%AE_%E2%80%94_BAYER_%E2%80%94_Augen-_und_Nasensalbe_(Dexpanthenol)_mit_Verpackung_und_Beipackzettel_%E2%80%94_Deutschland.jpg"],["wick","Vicks VapoRub (51013600352) (cropped).jpg","ajay_suresh","CC BY 2.0","https://commons.wikimedia.org/wiki/File:Vicks_VapoRub_(51013600352)_(cropped).jpg"],["voltaren","Вольтарен Эмульгель.jpg","Schekinov Alexey Victorovich","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:%D0%92%D0%BE%D0%BB%D1%8C%D1%82%D0%B0%D1%80%D0%B5%D0%BD_%D0%AD%D0%BC%D1%83%D0%BB%D1%8C%D0%B3%D0%B5%D0%BB%D1%8C.jpg"],["hansaplast","Hansaplast Praxispackung 1960er Compo noBG.jpg","Auge=mit","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Hansaplast_Praxispackung_1960er_Compo_noBG.jpg"],["eucerin","Nivea Creme BW 2025-07-05 16-51-45 s.jpg","Berthold Werner","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Nivea_Creme_BW_2025-07-05_16-51-45_s.jpg"],["fuerst","Box of Original Mozart Kugeln Fürst.jpg","Lopatalopez","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Box_of_Original_Mozart_Kugeln_F%C3%BCrst.jpg"],["mirabell","Mozartkugeln.jpg","Riki1979","Public domain","https://commons.wikimedia.org/wiki/File:Mozartkugeln.jpg"],["manner","Manner Neapolitaner (Swiss Chocolate Wafers).jpg","Debbie Tingzon","CC BY 2.0","https://commons.wikimedia.org/wiki/File:Manner_Neapolitaner_(Swiss_Chocolate_Wafers).jpg"],["sacher","Holzkästchen - Hotel Sacher Wien - Original Sacher Torte.jpg","Alex P. Kok","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Holzk%C3%A4stchen_-_Hotel_Sacher_Wien_-_Original_Sacher_Torte.jpg"],["kernoel","Kuerbiskernoel-mit-Flasche.JPG","Wolf32at","CC BY-SA 3.0","https://commons.wikimedia.org/wiki/File:Kuerbiskernoel-mit-Flasche.JPG"],["bipa","Bipa 002.jpg","Leoscheer","CC BY-SA 4.0","https://commons.wikimedia.org/wiki/File:Bipa_002.jpg"],["senf","Händlmaier Süßer Hausmachersenf","Händlmaier","官方商品圖","https://haendlmaier.de/produkte/suesser-senf/"],["grippostad","Grippostad C Hartkapseln","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/571748/grippostad-c-hartkapseln.htm"],["fenistil","Fenistil Gel","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/12550409/fenistil-gel.htm"],["iberogast","Iberogast Classic","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/16507534/iberogast-classic.htm"],["doppelherz","Doppelherz aktiv A-Z Complete Depot","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/16732219/doppelherz-a-z-complete-depot.htm"],["kneipp","Kneipp Badekristalle Muskel Entspannung","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/17443090/kneipp-badekristalle-muskel-entspannung.htm"],["balea","Weleda Skin Food","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/14026405/weleda-skin-food.htm"],["hallstattsalz","Bad Ischler Hallstatt Salz fein jodiert 125g","Salzwelten Shop (Salinen Austria)","官方商品圖","https://shop.salzwelten.at/de/bad-ischler-hallstatt-salz-fein-jodiert-125g~c71~p175800"],["zotter","Zotter Labooko Edelweiße Schokolade Mandelsüß","Zotter","官方商品圖","https://www.zotter.at/online-shop/marken/labooko"],["darbo","Darbo Naturrein Rosenmarille Konfitüre Extra","Darbo","官方商品圖","https://darbo.com/at/produkt/naturrein-rosenmarille-aprikose/"],["speck","Handl Tyrol Tiroler Speck g.g.A. Schinkenspeck","Handl Tyrol","官方商品圖","https://www.handltyrol.com/products/tiroler-speck-pgi/ham"],["voltadol","Voltadol Forte Schmerzgel","Shop Apotheke Österreich","官方商品圖","https://www.shop-apotheke.at/search.htm?q=voltadol+forte"],["cetebe","Cetebe Vitamin C Retard 500","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/3884324/cetebe-vitamin-c-retard-500.htm"],["neoangin","neo-angin Halstabletten","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/826562/neo-angin-halstabletten.htm"],["mucosolvan","Mucosolvan Hustensaft 30mg/5ml","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/743422/mucosolvan-hustensaft-30mg-5ml-schleimloeser.htm"],["salzbad","Kneipp Badekristalle Erkältungszeit Eukalyptus","Shop Apotheke","官方商品圖","https://www.shop-apotheke.com/arzneimittel/16503944/kneipp-badekristalle-erkaeltungszeit-eukalyptus.htm"]],
  notes:[
    ["肉品絕對不帶回台灣","豬肉製品（Speck、香腸、含肉調理包、含肉泡麵）禁止入境，非洲豬瘟期間罰款新台幣 20 萬起。Speck 只在當地吃。"],
    ["藥品入境上限","非處方藥每種最多 12 瓶或盒、合計不超過 36 瓶或盒；維他命等保健食品同樣限量，超過需申報。四人分開帶。"],
    ["酒類","免稅額每人 1 公升，且滿 20 歲。啤酒重，建議只買杯子。"],
    ["液體與玻璃罐","芥末、果醬、南瓜籽油、Melissengeist 都要托運，用衣物包好放行李箱中央。"],
    ["德奧分工","同品牌藥品德國通常較便宜且藥局與藥妝選擇多，先在 Day 3 米滕瓦爾德買，缺的 Day 8 慕尼黑補；奧地利只買奧地利限定品。"],
    ["退稅","單店單日滿 €50.01（德）／€75.01（奧）可辦退稅，非歐盟居民出示護照拿表格，Day 9 MUC 出境前蓋章。"],
  ],
};

/* 開車須知。租車細節以租車確認單為準，訂單編號不寫；停車費與規則為 2026-09-21 查證，現場公告優先。
   加油站只列本行程沿線、順路可停的站，座標未逐點查證，頁面用名稱＋地址開 Google Maps。 */
const DRIVE = {
  /* 租車資訊頁的卡片資料。訂單欄位依 SIXT 確認單（2026-09-23 核對）；
     確認單沒寫、要在櫃檯當面問的放 counter，勾選狀態只存在各自裝置。 */
  rental:{
    shop:["SIXT 慕尼黑卡爾廣場店","Karlsplatz 3・Stachus 地下停車場","06:00–20:00"],
    /* [欄名, 第一行, 第二行, 第二行要不要琥珀色, 小字] */
    order:[
      ["取車","Day 2・10/06","07:00",0,"最晚可晚到 60 分鐘"],
      ["還車","Day 9・10/13","07:00 固定",1,""],
      ["里程","約 900 km","",0,"上限 2,100 km"],
      ["跨境","奧地利 2 次","",0,"確認單已含"],
    ],
    cover:"全險・零自負額、第二駕駛、GPS／CarPlay、24 小時道路救援；BMW X3 或同級",
    /* [id, 桌機文字, 手機短名, 手機右欄說明] */
    counter:[
      ["cross","租約已登記奧地利跨境 Auslandsfahrt","奧地利跨境已登記","確認單已含，核對租約上有奧地利"],
      ["driver2","第二駕駛已登記在租約上","第二駕駛","確認單已含，兩位駕駛都到櫃檯"],
      ["fuel","確認燃油種類 E10／E5／Diesel","燃油種類","汽油 Super E10／E5 或柴油 Diesel"],
      ["tyre","確認冬胎或四季胎、雪鏈","冬胎與雪鏈","胎側要有雪花山形 3PMSF 標記"],
      ["deposit","確認授權押金 €500","授權押金","主駕駛本人信用卡凍結 €500"],
      ["keybox","確認 07:00 Key-Box 還車方式","07:00 Key-Box 方式","出發前一週再次確認"],
    ],
    /* [桌機名, 手機名, 手機小字] */
    docs:[
      ["台灣駕照","台灣駕照","正本"],
      ["國際駕照 IDP","IDP","國際駕照"],
      ["護照","護照","正本"],
      ["駕駛人信用卡","信用卡","與租約同名"],
    ],
    inspect:[
      "車身四周、輪圈、玻璃與內裝拍照",
      "刮痕登記於合約",
      "拍下里程表、油表與油箱蓋標示",
      "確認反光背心、三角警示牌、急救包",
    ],
    inspectShort:"取車時繞車一圈，拍照記錄車身、輪圈、擋風玻璃、內裝等現況。",
    ret:{
      time:"07:00 固定還車",
      flow:"加滿指定燃油 → 拍照 → 投鑰匙 → 留存帳單",
      note:"出發前一週確認早鳥還車與 Key-Box 方式",
      more:"還車入口 Herzog-Wilhelm-Str. 11，進 U3 還車層。還車前在 AVIA Hochstraße（24 小時）加滿並留發票；拍下里程、油量、四周車況與停車位置。07:00 櫃檯才剛開門，投鑰匙箱時 SIXT 無人在場驗車、48 小時內寄帳單，帳單與確認信保存到結清。",
    },
    /* [項目, 內容] */
    road:[
      ["Vignette","10 日數位票 €12.80"],
      ["使用路段","A12 因斯布魯克 → Kufstein"],
      ["其他","慕尼黑 Umweltzone 綠色貼紙・A12 IG-L 100 km/h"],
    ],
    roadShort:["Vignette 10 日票","€12.80","A12 因斯布魯克 → Kufstein（B177、B159、B162、B166、B305 不需要）"],
    roadNote:"**SIXT 德國租車不含 Vignette**。只有 Day 4 因斯布魯克 → Kufstein 的 A12 需要。10/08 當天在 ASFINAG 官網或 App 買數位票（綁車牌、立即生效），或在 Zirl 加油站買貼紙；無票被查到先付替代通行費，不付即罰 €300 起。Bischofswiesen → 哈修塔特走 Golling 下 B162，避開 A10 Tauern 另收費段。IG-L 電子看板亮起就要遵守，測速密集。",
    fuel:"確認油種；通常滿油取、滿油還；保留加油單據。",
    fuelNote:"確認單未載明燃油政策，以租約為準；不滿油依 SIXT 價格計費另加手續費。",
  },
  /* [日期, 地點, 費用, 作法, GEO key] */
  parking:[
    ["Day 1–2 慕尼黑","住宿 Munich Top Place 周邊","依住宿方案","市中心路邊多為住戶專用或 Parkschein 付費區；取車後直接裝行李出發，不長停。","muc-stay1"],
    ["Day 2 新天鵝堡","P4 停車場 Hohenschwangau","6 小時 €12，之後每小時 €1，日上限 €16","入口取票、出場前繳費機付款；車內不留外露行李。停車與接駁巴士皆為獨立業者，排隊時間不在門票保障。","nsw-p4"],
    ["Day 2–3 米滕瓦爾德","Mittenwald-Ferien 住宿指定車位","含於房價","入住時確認指定車位號碼；鎮上路邊多為藍色 Parkscheibe 限時區，停車要撥時鐘牌放在擋風玻璃內。","mit-stay"],
    ["Day 3 A 艾布湖","楚格峰纜車艾布湖停車場","4 小時 €20，之後每小時 €2；持纜車票折 €11（第三方資訊，未確認）","緊鄰纜車站，現金或卡；首班前抵達最好停。禁止過夜。","eibsee-park"],
    ["Day 3 B 加米施","奧林匹克滑雪體育場 P21 停車場","日票 €5","走到帕特納赫峽谷入口約 25 分鐘；午後才到鎮中心 Ludwigstraße 一帶找路邊付費位。","gap-olympia"],
    ["Day 4 A 因斯布魯克","InnenSTADT Garage 或 Congress／Altstadtgarage","InnenSTADT 纜車客全日 €4（需蓋章）；一般 €1.50／30 分、24 小時 €18","官方推薦 InnenSTADT Garage（Kaiserjägerstraße 1，24 小時），在 Altstadt 站售票處蓋章折抵；Congress Garage €1.40／30 分、日票 €17。市區路邊 Kurzparkzone €1.10／30 分、最長 90 分鐘，不划算。","inn-congress"],
    ["Day 4 B 拉滕貝格","Rattenberg P2 停車場","收費","老城禁車，停外圍 P2 步行進入。","rattenberg"],
    ["Day 4–6 薩爾斯堡","住宿 In the heart of the city 停車位","依住宿方案","舊城夏季（7–8 月）全日限行，10 月不受影響，但仍不開進舊城，以步行與公車進出。市區路邊 Kurzparkzone 平日 09:00–19:00 最長 3 小時、約 €2.20／小時，自動機買票或 App；週六 09:00–16:00 免費但要放時鐘牌。備援：Altstadtgarage Mönchsberg 24 小時上限 €24.20。","szg-stay"],
    ["Day 6 國王湖","國王湖大停車場 Schönau","1 小時內 €3、3 小時內 €7、日票 €9；收費 07:00–19:00，售票機或 Parkster App","07:55 前抵達；沿 Seestraße 步行約 10 分鐘到碼頭。","koe-park"],
    ["Day 6–7 比紹夫斯維森","Ferienhaus Gestüt Pfaffenlehen","含於房價","民宿私人車位。","bis-stay"],
    ["Day 7–8 哈修塔特","P1 停車場（Hotel-Ticket）","住客 Hotel-Ticket 第 1 天 €20、第 2 天 €18；一般日票 €20","**不可開進舊城**（柵欄，10:00–18:00 中心禁行）。P1 入口的 Hotel-Shuttle Info-Point 登記，首次出場前在售票機把入場券換成 Hotel-Ticket；免費接駁 09:00–19:00。","hal-p1"],
    ["Day 8–9 慕尼黑","Motel One München-Hauptbahnhof","依住宿確認結果","中央車站周邊停車場多為每小時計費的公共車庫，備援 Contipark Tiefgarage Stachus（Herzog-Wilhelm-Str. 11，24 小時，一般費率未確認）；到達後先卸行李，再依住宿指示停車。隔日 05:50 取車。","muc-stay2"],
  ],
  /* [路段, 站名, 地址, 備註] */
  fuel:[
    ["Day 2 慕尼黑 → 新天鵝堡","Aral Schwangau","König-Ludwig-Str. 2, 87645 Schwangau","B17 上、離 P4 約 5 分；每日 06:30–22:00。取車時油若不滿可在這裡補"],
    ["Day 2 新天鵝堡 → 米滕瓦爾德","Shell Mittenwald","Am Brunnstein 2, 82481 Mittenwald","24 小時；鎮北入口，Day 3 出發前補油也在這裡"],
    ["Day 2 備援","Aral Garmisch-Partenkirchen","Hauptstraße 20, 82467 Garmisch-Partenkirchen","一～四、日 06:00–22:00，五六到 23:00；Day 3 B 方案順路"],
    ["Day 4 米滕瓦爾德 → 因斯布魯克（B177）","Avanti 自助站 Zirl","Meilstraße 49, 6170 Zirl","24 小時自助，現金或信用卡；**進奧地利第一站，油價比德國低約 €0.3／L**，在這裡加滿"],
    ["Day 4 因斯布魯克 → 薩爾斯堡（A12 → A93 → A8）","Esso Rastanlage Hochfelln Süd","A8, 83346 Bergen","24 小時高速公路休息站，德國境內備援；奧地利段先加滿就不必停"],
    ["Day 6 薩爾斯堡 → 國王湖","Aral Schönau am Königssee","Seestraße 1, 83471 Schönau am Königssee","06:30–21:00，停車場前最後一站"],
    ["Day 6 比紹夫斯維森","Eni Bischofswiesen-Strub","Silbergstraße 91, 83483 Bischofswiesen","06:00–22:00，住宿附近；Day 7 出發前補油"],
    ["Day 7 比紹夫斯維森 → 哈修塔特（Golling／B159）","Hettegger Eni Kuchl","Kellau 157, 5431 Kuchl","24 小時自助；B159 上、Golling 之後。回到奧地利第一個加油點"],
    ["Day 7–8 哈修塔特周邊","Socar Bad Goisern","Bundesstraße 95, 4822 Bad Goisern","**哈修塔特鎮內沒有加油站**，最近的在 Bad Goisern。一～六 06:00–21:00、日 07:00–21:00。Day 8 離開前在此加滿，奧地利油價較低"],
    ["Day 8 哈修塔特 → 慕尼黑（A8）","Esso Rastanlage Hochfelln Nord","A8, 83346 Bergen","24 小時；Bad Goisern 加滿後通常不需停，塞車或臨時需要才停"],
    ["Day 9 還車前（05:50–07:00）","AVIA Hochstraße","Hochstraße 5, 81669 München","**24 小時**、有店面，Rosenheimer Platz 旁，距 Stachus 約 2.5 km、車程 10 分；加滿留發票再回 Karlsplatz 地下還車區"],
    ["Day 9 備援","JET Landsberger Straße","Landsberger Str. 184, 80687 München","24 小時，距 Stachus 約 4.5 km；AVIA 若排隊或關閉才用"],
  ],
  /* [項目, 德國, 奧地利, 與台灣不同] */
  rules:[
    ["速限（市區／郊區／高速）","50／100／無一般速限，建議 130","50／100／130","數字看起來與台灣相近，但**取締嚴、罰單寄到租車公司再轉嫁**。德國高速公路無速限路段仍有電子可變限速與施工段，看牌不看導航。"],
    ["路權：無標誌路口","右方車先行 Rechts vor Links","右方車先行","台灣習慣「大路優先、看誰先到」；德奧在沒有號誌與標誌的路口一律**右方來車優先**，住宅區與老城最常見。"],
    ["路權：圓環","圓環內車輛優先；進入不打燈、出去要打右燈","同左；未標示時圓環內仍優先","台灣多數圓環無明確規則。這裡進圓環前一定要停等，出圓環才打燈。"],
    ["紅燈右轉","禁止，除非有**綠色箭頭牌**（Grünpfeil）：先完全停止再讓行後可轉","**汽車一律禁止**；路口的綠箭頭附牌只給自行車","台灣紅燈右轉全面禁止，習慣一致；但德國看到綠箭頭牌時**要先停再轉**，不能滑行通過。"],
    ["號誌位置","燈桿在停止線旁，不在路口對面","同左","停止線一過就看不到燈了。**停在停止線前**，別像台灣一樣往前滑到路口才看燈。"],
    ["行人穿越道","斑馬線行人絕對優先，行人一有意圖就要停","同左；不停罰 €72 起","台灣「禮讓行人」抓得越來越嚴，這裡是本能等級：看到有人靠近斑馬線就先減速停車。"],
    ["電車與公車","電車停靠時乘客上下車，後方車輛須停止等候；不得超越停靠的電車","同左；電車在路口優先","台灣沒有路面電車。慕尼黑、因斯布魯克市區都有電車軌道，勿在軌道上停車，遇電車讓行。"],
    ["高速公路：靠右行駛與超車","**只能左側超車**，超完即回右線；長時間佔用左線會被罰","同左","台灣內側車道可持續行駛；德奧左線只用來超車，右線車流再慢也要回去。"],
    ["救援通道 Rettungsgasse","塞車或走走停停時，最左線靠左、其餘車道靠右，中間空出通道","同左；未讓罰 €726 起","台灣無此規定。**一開始塞車就要讓**，不是等救護車出現才讓。"],
    ["酒駕","0.5‰（新手與 21 歲以下 0.0）","0.5‰（試用期 0.1）","台灣 0.15‰ 更嚴。自駕日一律不喝，啤酒花園晚餐在無駕日（Day 1、Day 8 晚）。"],
    ["手機","駕駛中手持任何電子裝置皆禁止，只可固定於架上","同左；罰 €100 起","導航手機一定要上車架；副駕負責操作。"],
    ["冬胎","「情境式」義務：路面有雪、冰、雪泥時必須用冬胎或四季胎","11/1–4/15 情境式強制，10 月不強制但山區可能降雪","10 月初阿爾卑斯山區可能降雪。取車時確認車上是輪胎側面有雪花山形（3PMSF）標記的四季胎或冬胎。"],
    ["高速公路收費與夜間速限","免費","需 Vignette €12.80／10 日；A12 Kufstein–Zirl 常態 IG-L 環保限速 100；A10、A12 等 22:00–05:00 夜間限速 110","台灣以 ETC 計程；奧地利是**進高速前先買票**，數位票綁車牌。"],
    ["停車：藍線與時鐘牌","藍色 P 牌加「Parkscheibe」＝免費限時，時鐘牌撥到**抵達時間進位的下一個半小時**放擋風玻璃內，沒放罰 €20–40；停車方向須與車流同向","Kurzparkzone 藍線區＝短時付費，自動機買票或 App（Handyparken）","台灣沒有時鐘牌制度；租車手套箱通常附一塊，取車時確認。逆向路邊停車在德奧是違規。"],
    ["市區限速 30 與住宅區","大量 Tempo-30 區與「Spielstraße」行人優先區（步行速度）","Tempo-30 區普遍；老城多為行人徒步區 Fußgängerzone 禁車","看到藍底行人與小孩圖案的牌子＝步行速度。哈修塔特舊城與薩爾斯堡舊城皆禁止開進。"],
    ["測速與罰單","固定與移動測速多；超速 21 km/h 以上市區有可能吊照","區間測速 Section Control；罰單一樣寄租車公司","台灣測速前有預告牌，德奧**沒有**。租車公司會加收處理費，一次超速可能 €100 起跳。"],
    ["緊急電話","112（全歐）；警察 110","112；警察 133、救護 144","事故若有人受傷或對方不配合，一定報警取得紀錄，租車理賠會要。"],
    ["隧道","必須開近光燈，日行燈不算（罰 €25）","同左","台灣隧道多為自動亮燈或未強制；德奧進隧道前手動切近光燈，租車若為 Auto 模式仍確認燈號亮起。"],
    ["台灣駕照","台灣駕照有效 6 個月，須附**德文翻譯或國際駕照 IDP**，兩者一起帶","非德文駕照**必須**搭配 IDP 或翻譯","所有可能開車的人都帶台灣駕照正本＋IDP；只帶 IDP 不算有效。"],
  ],
  notes:[
    ["每天出發前","看一次緊急聯絡頁的即時路況連結（bayerninfo、ASFINAG、B177 攝影機），山路與隧道封閉常無法繞。"],
    ["過境不用停","德奧邊界無海關檢查，但奧地利警方會在邊境後方抽查 Vignette 與冬季裝備。"],
    ["加油方式","多數為先加油後進店付款或直接刷卡（Kartenzahlung）；晚間部分站只開夜窗。2026 年 9 月奧地利 Diesel 約 €2.2／Super 95 約 €1.9，德國各貴約 €0.25–0.40／L，**在奧地利加滿、離開奧地利前再加滿**（Zirl、Kuchl、Bad Goisern）。"],
    ["還車前加油","Day 9 05:50 取車後先到 AVIA Hochstraße（24 小時）加滿，再回 Stachus 地下還車區；留發票證明滿油。"],
    ["未確認事項","艾布湖停車費、Stachus 停車場一般費率、SIXT 跨境費金額、因斯布魯克與薩爾斯堡 Kurzparkzone 2026 秋季新費率是否已生效，皆以現場為準。"],
  ],
};

/* 網路（eSIM）方案分析。內容來自 德奧旅行_eSIM方案分析.md，資料查詢日 2026-09-21，2026-09-23 重新核對。
   價格、促銷與合作網路都會變動，購買前一律以各平台結帳頁為準——所以這裡每個
   數字都標了查詢日，不要把它當成即時報價。 */
const ESIM = {
  /* 方案比較，依計費型態分三組。price 一律是「一人」的價格。
     call：2026-09-23 查證，除歐密卡外全部是純數據——DJB 規格「語音：無」、KKday 規格
     「不包含語音通話、簡訊功能」、Klook 商品頁「僅提供數據服務，不提供通話、簡訊」。
     DJB 歐密卡（僅 30 天）是 DJB 唯一含通話的歐洲方案：20GB NT$770「涵蓋地通話 100 分鐘、
     涵蓋地免費收簡訊」；12／50／100GB 另有當地無限通話，國際通話「港澳台除外」，打不回台灣。
     規格只列國家、未列德奧電信商，也未寫熱點，這三格標「未標示」。
     hotspot：Klook 商品頁標示支援熱點；KKday 規格表寫「可以」但 FAQ 寫「不支援」，
     互相矛盾，維持 X。
     tk／a1：合作網路是否明確列出德國 Telekom、奧地利 A1。
     2026-09-23 逐項重查：DJB 三張的價格（歐鑽 9 天 1,720、歐樂 9 天 1,030、歐Fun 10 天
     20GB 1,350）、德奧網路、「語音：無、熱點：可」皆與官網一致，歐Fun 為「量到斷網」。
     KKday 9 天實價：吃到飽 764、每日 3GB 474（5 折促銷價）；電信 Vodafone／Orange／O2／EE、
     僅 4G、漫遊 MVNO，未列奧地利用哪家網路。Klook 頁面擋自動讀取，德奧網路與 9 天價無法核實。 */
  groups:[
    { type:"吃到飽",
      rows:[
      { score:4.5, name:"DJB 歐鑽卡", tk:"O", a1:"O", data:"不降速", price:"$1,720", pick:true,
        net:["德國：O2、Telekom、Vodafone","奧地利：A1、T-Mobile、H3G"], hotspot:"O",
        call:"X", verdict:"網路覆蓋最符合本次路線，但價格最高",
        buy:["DJB 官網","https://djbcard.com/product/europe-esim/"] },
      { score:3.5, name:"DJB 歐樂卡", tk:"X", a1:"O", data:"不降速", price:"$1,030",
        net:["德國：O2、Vodafone","奧地利：A1、3"], hotspot:"O",
        call:"X", verdict:"每人比歐鑽卡便宜 NT$690，代價是德國少了 Telekom",
        buy:["DJB 歐洲上網卡方案頁","https://djbcard.com/product/europe-card-series/"] },
      { score:3.0, name:"KKday 歐洲 42 國", tk:"X", a1:"X", data:"高速後降速，約 384 kbps", price:"$764",
        net:["Vodafone、Orange、Telefonica O2、EE","僅 4G，不含 Telekom 與 A1"], hotspot:"X",
        call:"X", verdict:"比每日 3GB 彈性高，但不是真正全程高速",
        buy:["KKday 商品頁","https://www.kkday.com/zh-tw/product/120977-europe-unlimited-data-esim"] },
      { score:2.0, name:"Klook 歐洲 35 國（吃到飽選項）", tk:"X", a1:"X", data:"未標示", price:"—",
        net:["僅標示「各國主要電信商」","未明確承諾 Telekom 或 A1"], hotspot:"O",
        call:"X", verdict:"可作低價候選，但不宜視為山區首選",
        buy:["Klook 商品頁","https://www.klook.com/zh-TW/activity/127552-europe-esim/"] },
    ]},
    { type:"總量",
      rows:[
      { score:4.0, name:"DJB 歐Fun卡", tk:"O", a1:"O", data:"總量 20GB，用完斷網", price:"$1,350", pick:true,
        net:["德國：O2、Telekom、Vodafone","奧地利：A1、T-Mobile、H3G"], hotspot:"O",
        call:"X", verdict:"適合導航、通訊與一般社群使用",
        buy:["DJB 官網","https://djbcard.com/product/europe-card-series/"] },
      { score:3.0, name:"DJB 歐密卡（20GB）", tk:"未標示", a1:"未標示", data:"總量 20GB，用完斷網", price:"$770",
        net:["規格只列適用國家","未標示德國、奧地利用哪家電信"], hotspot:"未標示",
        call:"當地 100 分鐘", verdict:"唯一含當地通話，但網路商不明、方案固定 30 天",
        buy:["DJB 歐洲 eSIM","https://djbcard.com/product/europe-esim/"] },
      { score:2.0, name:"Klook 歐洲 35 國（20GB 選項）", tk:"X", a1:"X", data:"總量 20GB", price:"—",
        net:["僅標示「各國主要電信商」","未明確承諾 Telekom 或 A1"], hotspot:"O",
        call:"X", verdict:"資訊不足，購買前須逐項確認",
        buy:["Klook 商品頁","https://www.klook.com/zh-TW/activity/127552-europe-esim/"] },
    ]},
    { type:"每日固定流量",
      rows:[
      { score:3.5, name:"KKday 歐洲 42 國", tk:"X", a1:"X", data:"每日 3GB，超量降速約 384 kbps", price:"$474", pick:true,
        net:["Vodafone、Orange、Telefonica O2、EE","僅 4G，不含 Telekom 與 A1"], hotspot:"X",
        call:"X", verdict:"價格低，但沒有明確包含 Telekom 或 A1",
        buy:["KKday 商品頁","https://www.kkday.com/zh-tw/product/120977-europe-unlimited-data-esim"] },
      { score:2.0, name:"Klook 歐洲 35 國（每日 2GB 選項）", tk:"X", a1:"X", data:"每日 2GB", price:"$95 起",
        net:["僅標示「各國主要電信商」","未明確承諾 Telekom 或 A1"], hotspot:"O",
        call:"X", verdict:"起價低，但 9 天實際價要選完選項才看得到",
        buy:["Klook 商品頁","https://www.klook.com/zh-TW/activity/127552-europe-esim/"] },
    ]},
  ],
};

const ROADSIDE = {
  lines: [
    { label:"SIXT 24 小時道路救援", num:"+49 89 244 000 88", dial:"+498924400088",
      where:"車輛故障、事故、爆胎、鑰匙或電瓶問題一律先打這支。撥號前先備妥車牌、租約號碼、確切位置與儀表板警示訊息。",
      warn:"未經 SIXT 同意自行叫拖吊或送修，依租約可能不予理賠。" },
    { label:"SIXT 慕尼黑 Stachus 分店", num:"+49 89 8967 5240", dial:"+498989675240",
      where:"Karlsplatz 3, 80335 München，取還車點，營業 06:00–20:00。實際取還車地點以租車確認單為準。",
      warn:"還車時間 10/13 07:00 早於營業時間，出發前務必向分店確認早鳥還車與鑰匙投遞方式。" },
    { label:"ADAC 道路救援（德國）", num:"089 20 20 4000", dial:"+498920204000",
      where:"德國境內非 SIXT 指定的道路救援。手機或自國外撥打改用 +49 89 22 22 22。",
      warn:"非租約指定救援，費用與理賠依 ADAC 規則，仍建議先打 SIXT。" },
    { label:"ÖAMTC 道路救援（奧地利）", num:"120", dial:"120",
      where:"奧地利境內直撥，不需區碼。自國外或需要 Schutzbrief 服務改撥 +43 1 25 120 00。",
      warn:"" },
    { label:"ASFINAG 服務中心（奧地利高速公路）", num:"0800 400 12 400", dial:"+4380040012400",
      where:"高速公路封閉、事故、施工與通行票問題。奧地利手機可撥 *200，其他國家 +43 1 955 12 66。24 小時服務。",
      warn:"" },
    { label:"警察（需要事故紀錄時）", num:"德國 110　奧地利 133", dial:"112",
      where:"人員受傷、對方不配合、涉及第三方財損時一定要報警並取得紀錄。全歐通用緊急號碼 112 也可轉接。",
      warn:"" },
  ],
  roads: [
    ["巴伐利亞即時路況","https://www.bayerninfo.de/","邦政府路況平台，含施工、事故與封閉"],
    ["奧地利高速公路路況","https://www.asfinag.at/verkehr-sicherheit/verkehrsinfo/","ASFINAG 官方，A10、A8 皆在此"],
    ["提洛邦 B177 攝影機","https://www.tirol.gv.at/verkehr/strassenbau-und-strassenerhaltung/webcams/webcams-bezirk-innsbruck-land-mit-stadt/b-177-seefelder-strasse/","米滕瓦爾德往因斯布魯克的山路，雪況與能見度"],
  ],
  tips: [
    ["高速公路拋錨","先開雙黃燈，車內全員穿反光背心後從右側下車，退到護欄外，再走回車後 100 公尺擺三角架，最後才打電話。德奧兩國都規定車上必備反光背心與三角架。"],
    ["事故現場","拍車損、車牌、道路標線與四周環境；索取對方姓名、地址、保險公司與保單號碼。人員受傷一律先打 112。"],
    ["山路與隧道","奧地利高速公路需通行票（Vignette），租車通常已附，取車時要確認。隧道內禁止迴轉與倒車，遇封閉依電子看板指示。"],
  ],
};

const OFFICES = [
  { id:"muc", pri:true, tag:"德國段主要聯絡",
    name:"駐德國台北代表處慕尼黑辦事處",
    local:"Taipeh Vertretung in der Bundesrepublik Deutschland, Büro München",
    why:"本行程德國段全在其轄區：慕尼黑、新天鵝堡、米滕瓦爾德、楚格峰、加米施、國王湖、貝希特斯加登、基姆湖。",
    addr:"Leopoldstraße 28a/V, 80802 München",
    map:"https://www.google.com/maps/search/?api=1&query=Leopoldstrasse+28a%2C+80802+M%C3%BCnchen",
    tel:"+49-89-5126790", telDial:"+49895126790",
    sos:"+49-174-632-6739", sosDial:"+491746326739", sosLocal:"德國境內直撥 0174-632-6739",
    fax:"+49-89-51267979",
    mail:["muc1@mofa.gov.tw"],
    hours:"領務服務 週一至週五 09:00–12:30",
    area:"巴伐利亞邦 Bayern、巴登-符騰堡邦 Baden-Württemberg",
    extra:"" },

  { id:"vie", pri:true, tag:"奧地利段主要聯絡",
    name:"駐奧地利台北經濟文化代表處",
    local:"Taipei Economic and Cultural Office in Austria",
    why:"本行程奧地利段全在其轄區：因斯布魯克、拉滕貝格、薩爾斯堡、哈修塔特。",
    addr:"Wagramer Strasse 19/11. OG, A-1220 Wien",
    map:"https://www.google.com/maps/search/?api=1&query=Wagramer+Strasse+19%2C+1220+Wien",
    tel:"+43-1-2124720", telDial:"+4312124720",
    sos:"+43-664-345-0455", sosDial:"+436643450455", sosLocal:"奧地利境內直撥 0664-345-0455",
    fax:"+43-1-212-472086",
    mail:["aut@mofa.gov.tw","info@taipei.at"],
    hours:"領務服務 週一至週五 09:00–12:00（辦公時間 09:00–17:00）",
    area:"奧地利全境，兼理斯洛維尼亞、克羅埃西亞",
    extra:"地鐵 U1 至 Kaisermühlen／Vienna International Center 站，步行約 5 分鐘" },

  { id:"ber", pri:false, tag:"德國主館，轄區不含本行程",
    name:"駐德國台北代表處（柏林）",
    local:"Taipeh Vertretung in der Bundesrepublik Deutschland",
    why:"德國主館。轄區不含巴伐利亞，本行程一般不需聯絡，列此供備查。",
    addr:"Markgrafenstrasse 35, 10117 Berlin",
    map:"https://www.google.com/maps/search/?api=1&query=Markgrafenstrasse+35%2C+10117+Berlin",
    tel:"+49-30-203610", telDial:"+4930203610",
    sos:"+49-171-389-8257", sosDial:"+491713898257", sosLocal:"德國境內直撥 0171-389-8257",
    fax:"+49-30-20361101",
    mail:["deu@mofa.gov.tw"],
    hours:"領務櫃檯 週一至週五 09:00–12:30（下午停止櫃檯服務，電話正常接聽）",
    area:"柏林邦、布蘭登堡邦、薩克森邦、薩克森-安哈特邦、圖林根邦",
    extra:"" },
];

/* 由 make_map.js 於建置時產生：Web Mercator 投影的內嵌地圖，無外部請求。
   國界 GeoJSON：github.com/georgique/world-geojson
   行車路線幾何：OSRM（OpenStreetMap 路網），建置時抓取後內嵌。
   範圍 lon 10.05–14.35、lat 46.95–48.6，viewBox 0 0 1000 571。 */
const MAP = {
  w: 1000, h: 571,
  border: {"de":"M-60.0 -60.0L-60.0 381.1L-60.0 351.2L-58.2 349.9L-55.0 352.5L-52.4 364.0L-46.7 371.6L-40.9 373.6L-38.4 369.1L-19.9 371.6L-15.4 383.8L-7.7 390.2L-0.7 388.9L5.1 397.2L10.2 401.0L6.3 413.2L10.2 429.1L27.4 427.2L30.6 424.0L41.5 424.0L37.0 445.7L34.4 452.8L30.6 456.6L31.9 463.0L53.0 458.5L70.2 442.5L77.2 431.0L86.8 423.4L91.3 413.2L99.6 405.5L94.5 384.4L90.0 384.4L91.3 362.7L88.7 355.7L97.0 353.1L96.4 360.8L99.6 366.5L112.4 369.7L121.9 369.7L127.0 360.8L151.3 364.6L161.5 369.1L169.2 376.1L185.8 375.5L195.4 370.4L201.1 376.7L192.2 383.1L192.2 387.0L204.3 388.9L217.8 409.3L216.5 419.5L234.4 415.7L248.4 417.6L252.9 412.5L277.8 406.8L277.2 418.9L287.4 416.3L288.7 408.0L311.6 401.7L321.2 401.7L310.4 389.5L323.1 377.4L350.6 379.9L358.9 376.7L357.0 360.8L370.4 352.5L385.7 354.4L405.5 351.8L418.3 354.4L419.6 349.9L454.7 340.3L459.2 344.8L467.5 341.6L477.7 344.8L500.7 345.5L500.1 335.9L491.8 312.9L501.4 309.0L512.2 299.5L516.0 298.8L512.2 314.8L513.5 319.3L521.2 317.4L556.9 316.7L559.5 325.0L570.3 337.8L585.0 335.9L595.9 326.9L614.4 319.9L625.9 318.0L628.5 323.1L634.2 324.4L631.0 332.0L648.3 344.8L637.4 348.0L635.5 358.2L653.4 369.1L663.0 379.3L675.1 388.2L687.2 392.1L693.0 386.3L695.5 378.0L695.5 357.6L700.6 351.8L701.3 344.8L706.4 337.8L706.4 321.8L696.8 309.0L664.2 308.4L665.5 302.7L672.5 291.2L666.8 287.3L681.5 273.9L685.3 261.8L671.3 229.2L655.9 219.6L647.6 196.6L632.3 187.1L628.5 169.8L631.7 164.7L637.4 162.8L644.4 155.8L657.8 137.2L679.6 135.3L698.1 118.7L731.3 106.6L747.9 104.7L764.5 95.1L779.2 79.8L786.2 66.3L789.4 53.6L786.9 45.9L793.3 28.7L786.9 20.4L790.7 14.6L795.8 13.3L804.8 3.1L818.8 11.4L823.3 10.8L855.9 29.9L862.2 12.7L868.6 11.4L880.1 -8.4L876.9 -18.6L877.6 -29.5L875.1 -32.2L880.0 -32.5L880.9 -35.5L874.9 -35.8L874.7 -38.0L870.8 -40.5L876.3 -46.8L877.1 -54.7L881.3 -60.0L475.6 -60.0L1060.0 -60.0L-60.0 -60.0Z","at":"M1060.0 -60.0L1060.0 6.3L1059.0 -9.0L1048.1 -4.5L1034.1 -5.8L1028.3 -17.3L1022.6 -16.0L1022.6 3.8L1009.1 3.1L1008.5 9.5L1002.8 8.9L997.0 15.9L975.3 6.3L938.2 0.6L928.7 -5.2L925.5 -17.3L932.5 -21.8L924.2 -37.1L911.4 -41.6L897.4 -55.6L881.3 -60.0L877.1 -54.7L876.3 -46.8L870.8 -40.5L874.7 -38.0L874.9 -35.8L880.9 -35.5L880.0 -32.5L875.1 -32.2L877.6 -29.5L876.9 -18.6L880.1 -8.4L868.6 11.4L862.2 12.7L855.9 29.9L823.3 10.8L818.8 11.4L804.8 3.1L795.8 13.3L790.7 14.6L786.9 20.4L793.3 28.7L786.9 45.9L789.4 53.6L786.2 66.3L779.2 79.8L764.5 95.1L747.9 104.7L731.3 106.6L698.1 118.7L679.6 135.3L657.8 137.2L644.4 155.8L637.4 162.8L631.7 164.7L628.5 169.8L632.3 187.1L647.6 196.6L655.9 219.6L671.3 229.2L685.3 261.8L681.5 273.9L666.8 287.3L672.5 291.2L665.5 302.7L664.2 308.4L696.8 309.0L706.4 321.8L706.4 337.8L701.3 344.8L700.6 351.8L695.5 357.6L695.5 378.0L693.0 386.3L687.2 392.1L675.1 388.2L663.0 379.3L653.4 369.1L635.5 358.2L637.4 348.0L648.3 344.8L631.0 332.0L634.2 324.4L628.5 323.1L625.9 318.0L614.4 319.9L595.9 326.9L585.0 335.9L570.3 337.8L559.5 325.0L556.9 316.7L521.2 317.4L513.5 319.3L512.2 314.8L516.0 298.8L512.2 299.5L501.4 309.0L491.8 312.9L500.1 335.9L500.7 345.5L477.7 344.8L467.5 341.6L459.2 344.8L454.7 340.3L419.6 349.9L418.3 354.4L405.5 351.8L385.7 354.4L370.4 352.5L357.0 360.8L358.9 376.7L350.6 379.9L323.1 377.4L310.4 389.5L321.2 401.7L311.6 401.7L288.7 408.0L287.4 416.3L277.2 418.9L277.8 406.8L252.9 412.5L248.4 417.6L234.4 415.7L216.5 419.5L217.8 409.3L204.3 388.9L192.2 387.0L192.2 383.1L201.1 376.7L195.4 370.4L185.8 375.5L169.2 376.1L161.5 369.1L151.3 364.6L127.0 360.8L121.9 369.7L112.4 369.7L99.6 366.5L96.4 360.8L97.0 353.1L88.7 355.7L91.3 362.7L90.0 384.4L94.5 384.4L99.6 405.5L91.3 413.2L86.8 423.4L77.2 431.0L70.2 442.5L53.0 458.5L31.9 463.0L30.6 456.6L34.4 452.8L37.0 445.7L41.5 424.0L30.6 424.0L27.4 427.2L10.2 429.1L6.3 413.2L10.2 401.0L5.1 397.2L-0.7 388.9L-7.7 390.2L-15.4 383.8L-19.9 371.6L-38.4 369.1L-40.9 373.6L-46.7 371.6L-52.4 364.0L-55.0 352.5L-58.2 349.9L-60.0 351.2L-60.0 537.1L-57.5 544.7L-43.5 546.0L-40.3 550.5L-37.7 557.5L-41.6 577.3L-7.7 591.3L-0.1 598.4L7.6 600.9L12.1 606.7L41.5 597.7L45.3 577.9L62.5 579.2L63.2 568.4L67.0 559.4L74.0 556.2L84.3 561.3L89.4 569.0L103.4 575.4L98.3 586.2L97.6 603.3L122.6 609.9L146.9 595.8L154.5 606.7L167.3 615.0L159.0 629.7L173.7 625.8L185.2 630.3L227.3 631.0L238.8 616.3L236.9 606.7L247.1 584.3L258.0 577.3L265.0 565.8L277.8 560.7L298.9 560.7L309.1 565.8L324.4 560.1L333.4 551.1L350.0 558.1L365.3 549.8L385.1 557.5L394.0 563.9L397.9 560.1L413.8 556.2L434.3 544.7L466.9 533.9L482.2 524.9L498.2 522.4L509.0 530.0L504.5 535.1L502.6 540.9L486.7 549.2L480.9 557.5L489.9 576.7L491.1 585.0L505.8 593.9L514.8 595.2L521.8 606.0L521.2 627.8L539.0 631.0L1060.0 631.0L1060.0 -60.0Z","ch":"M-60.0 278.0L-60.0 631.0L101.5 631.0L77.5 631.0L91.0 631.0L87.1 624.6L92.9 620.4L97.6 603.3L98.3 586.2L103.4 575.4L89.4 569.0L84.3 561.3L74.0 556.2L67.0 559.4L62.5 579.2L45.3 577.9L41.5 597.7L12.1 606.7L7.6 600.9L-0.1 598.4L-7.7 591.3L-41.6 577.3L-37.7 557.5L-40.3 550.5L-43.5 546.0L-57.5 544.7L-60.0 532.9L-60.0 537.4L-60.0 278.0Z","it":"M498.2 522.4L482.2 524.9L466.9 533.9L434.3 544.7L413.8 556.2L397.9 560.1L394.0 563.9L385.1 557.5L365.3 549.8L350.0 558.1L333.4 551.1L324.4 560.1L309.1 565.8L298.9 560.7L277.8 560.7L265.0 565.8L258.0 577.3L247.1 584.3L236.9 606.7L238.8 616.3L227.3 631.0L185.2 630.3L173.7 625.8L159.0 629.7L167.3 615.0L154.5 606.7L146.9 595.8L122.6 609.9L97.6 603.3L92.9 620.4L87.1 624.6L91.0 631.0L77.5 631.0L101.5 631.0L-60.0 631.0L1060.0 631.0L511.3 631.0L900.0 631.0L539.0 631.0L521.2 627.8L521.8 606.0L514.8 595.2L505.8 593.9L491.1 585.0L480.9 557.5L486.7 549.2L502.6 540.9L509.0 530.0L498.2 522.4Z","cz":"M991.1 -60.0L979.1 -60.0L1011.7 -60.0L475.6 -60.0L882.7 -60.0L897.4 -55.6L911.4 -41.6L924.2 -37.1L932.5 -21.8L925.5 -17.3L928.7 -5.2L938.2 0.6L975.3 6.3L997.0 15.9L1002.8 8.9L1008.5 9.5L1009.1 3.1L1022.6 3.8L1022.6 -16.0L1028.3 -17.3L1034.1 -5.8L1048.1 -4.5L1059.0 -9.0L1060.0 6.3L1060.0 -60.0L1060.0 -5.9L1060.0 -60.0L991.1 -60.0Z","si":"M1060.0 596.8L1060.0 631.0L773.0 631.0L1060.0 631.0L1060.0 596.8Z"},
  places: [{"k":"muc","name":"慕尼黑","kind":"stay","nights":"1＋1 晚","side":"n","x":354.8,"y":161.9},{"k":"nsw","name":"新天鵝堡","kind":"see","nights":"","side":"w","x":162.7,"y":362.8},{"k":"mit","name":"米滕瓦爾德","kind":"stay","nights":"2 晚","side":"s","x":282.1,"y":405.1},{"k":"zug","name":"楚格峰","kind":"see","nights":"","side":"sw","x":217.7,"y":409.8},{"k":"inn","name":"因斯布魯克","kind":"pass","nights":"經過","side":"s","x":312.4,"y":462.1},{"k":"szg","name":"薩爾斯堡","kind":"stay","nights":"2 晚","side":"n","x":700.7,"y":279.4},{"k":"koe","name":"國王湖","kind":"see","nights":"","side":"w","x":683.4,"y":352.4},{"k":"bis","name":"比紹夫斯維森","kind":"stay","nights":"1 晚","side":"sw","x":670.4,"y":322.3},{"k":"hal","name":"哈修塔特","kind":"stay","nights":"1 晚","side":"e","x":837,"y":361.5},{"k":"pri","name":"基姆湖","kind":"see","nights":"","side":"n","x":533.9,"y":260.3}],
  routes: [{"key":"d2","day":2,"variant":"","label":"慕尼黑 → 新天鵝堡 → 米滕瓦爾德","km":204.3,"min":203,"d":"M355.6 161.1L355.5 163.4L349.6 163.3L351.8 164.2L345.9 163.9L347.6 164.9L344.7 167.7L344.4 168.5L344.1 169.2L343.5 173.3L337.1 178.1L337.1 183.6L333.5 189.8L324.0 198.1L321.2 203.6L321.0 205.4L323.2 209.7L323.7 213.5L322.8 216.9L319.7 222.4L319.6 227.7L317.6 231.8L317.4 236.1L315.7 239.5L316.9 249.4L316.6 252.9L314.1 260.4L311.3 264.2L308.1 271.1L307.7 273.0L307.8 279.7L306.6 284.2L304.8 287.7L301.4 291.8L300.8 292.9L300.5 294.5L301.0 300.2L298.4 306.4L293.6 306.0L291.1 305.5L287.1 307.8L284.3 307.5L282.4 308.4L277.6 309.2L276.3 308.8L275.8 308.5L274.8 310.6L272.7 311.7L271.9 314.0L271.9 315.3L271.4 315.6L271.3 319.6L268.5 323.0L267.7 322.2L269.0 322.5L265.4 325.6L260.4 326.1L257.7 327.2L252.8 328.0L246.5 327.5L241.4 328.5L235.0 328.0L232.3 328.3L230.3 327.1L227.0 326.7L223.7 324.2L221.0 321.1L215.6 317.9L213.3 313.7L213.5 312.0L215.0 312.8L212.3 314.0L210.8 313.1L207.2 315.2L204.9 315.0L198.8 316.0L194.3 315.7L192.2 316.0L189.8 315.2L190.3 315.0L191.4 313.5L191.5 318.2L189.4 325.7L186.4 329.9L185.9 331.6L184.0 333.2L183.6 335.4L182.1 338.0L181.6 340.4L179.2 342.6L176.3 347.9L172.1 352.6L168.9 354.0L167.5 355.6L165.2 356.6L165.1 357.2L163.5 364.4L159.4 364.0L157.8 362.2L159.6 355.3L164.2 355.2L164.9 354.4L165.4 358.1L165.1 360.4L163.2 361.1L159.2 357.2L161.1 352.3L164.0 350.7L165.7 348.9L168.3 348.0L171.4 344.5L174.3 339.2L176.6 337.1L176.5 335.9L178.0 333.2L178.8 330.2L181.0 328.0L181.2 326.9L183.9 323.3L185.6 317.2L185.4 313.2L187.5 309.7L190.9 309.3L192.8 310.1L194.2 309.7L198.4 310.0L201.8 309.2L205.6 309.5L209.5 307.2L211.8 308.0L214.4 307.0L217.8 307.9L219.4 310.8L219.1 312.2L219.5 313.3L224.8 316.5L230.8 323.0L229.6 331.1L231.5 337.5L230.8 342.1L231.0 344.5L231.4 344.4L234.0 345.7L235.8 348.9L240.1 350.2L241.1 353.9L242.0 356.4L244.0 356.4L246.7 358.5L247.0 359.7L245.2 358.1L247.9 358.9L251.2 356.8L253.2 362.6L251.5 359.2L253.1 359.3L255.9 362.7L254.4 366.4L252.9 367.2L251.2 370.1L251.3 369.2L252.4 371.9L252.3 375.2L250.5 378.3L248.7 379.1L247.4 383.6L247.0 381.8L250.6 385.6L250.8 384.5L254.0 384.7L260.0 383.4L264.3 383.9L268.5 383.2L273.3 383.5L276.3 385.3L279.3 386.3L282.8 389.8L285.4 395.9L286.8 399.0L284.6 403.3L284.5 402.6L285.4 403.5L284.7 406.6","gmap":["48.1384,11.5660","47.5560,10.7395","47.5716,10.7614","47.4349,11.2629"]},{"key":"d3a","day":3,"variant":"A","label":"米滕瓦爾德 ⇄ 艾布湖／楚格峰","km":58.7,"min":70,"d":"M281.9 402.1L282.6 402.4L284.3 405.2L284.6 403.2L286.8 399.0L285.4 395.9L282.8 389.9L279.5 386.4L276.3 385.3L273.1 383.5L268.2 383.2L264.2 383.9L260.0 383.4L254.0 384.7L250.8 384.5L250.5 385.5L246.5 381.9L241.0 383.0L236.1 385.5L235.4 385.0L233.1 386.9L233.1 387.0L232.1 386.3L227.8 386.4L224.8 387.7L223.0 388.1L219.8 391.2L219.2 394.8L219.3 393.8L218.9 394.7L218.6 397.2L221.5 400.2L223.3 398.2L224.9 396.7L225.2 393.8L226.0 393.3L226.7 393.4L229.1 392.2L231.2 392.2L232.5 392.9L236.1 392.1L237.9 390.4L238.1 391.2L243.2 388.6L244.5 387.6L247.9 390.9L251.4 390.5L254.7 390.7L260.5 389.4L264.4 389.9L268.6 389.1L271.4 389.3L273.8 390.8L276.3 391.5L277.6 392.9L280.0 398.7L280.9 397.9L279.1 400.9L278.8 404.4L279.6 405.1L279.5 403.6","gmap":["47.4349,11.2629","47.4577,10.9797","47.4349,11.2629"]},{"key":"d3b","day":3,"variant":"B","label":"米滕瓦爾德 ⇄ 帕特納赫峽谷／加米施","km":38.1,"min":42,"d":"M281.9 402.1L282.6 402.4L284.3 405.2L284.6 403.2L286.8 399.0L285.4 395.9L282.8 389.8L279.3 386.3L276.3 385.3L273.3 383.5L268.4 383.2L264.3 383.9L260.0 383.4L254.0 384.7L250.7 384.5L248.6 385.4L249.5 385.5L249.4 384.6L246.2 381.8L243.3 382.6L243.7 382.1L240.3 386.8L243.6 388.2L244.6 388.4L244.2 387.5L247.9 390.9L251.4 390.5L254.7 390.7L260.5 389.4L264.5 389.9L268.8 389.1L271.6 389.3L273.8 390.8L276.1 391.4L277.6 392.9L280.0 398.7L280.9 397.9L279.1 400.9L278.8 404.4L279.6 405.1L279.5 403.6","gmap":["47.4349,11.2629","47.4837,11.1178","47.4921,11.0955","47.4349,11.2629"]},{"key":"d4a","day":4,"variant":"A","label":"米滕瓦爾德 → 因斯布魯克 → 薩爾斯堡","km":224.8,"min":173,"d":"M282.3 408.1L284.3 405.8L284.4 408.1L283.7 411.6L286.1 418.5L282.1 422.9L281.3 424.5L279.2 425.1L276.2 432.9L273.8 436.1L270.0 438.6L269.4 439.3L269.4 438.7L270.2 440.4L270.1 444.9L270.9 447.9L270.2 450.5L270.0 449.6L271.1 451.2L275.9 453.3L278.3 456.2L276.0 460.4L276.2 456.8L276.5 456.2L278.1 456.4L281.1 457.7L283.6 459.9L283.0 460.9L285.9 460.3L288.9 461.1L294.2 460.7L297.4 462.1L299.1 464.1L300.7 464.9L300.5 464.9L303.8 464.0L306.6 465.0L308.0 464.2L307.0 466.3L306.9 463.9L310.4 459.5L312.5 457.3L316.5 457.7L319.1 459.8L320.3 463.0L318.1 461.9L321.4 460.8L325.1 462.4L324.8 462.8L322.4 461.8L325.1 461.4L328.5 459.2L333.0 458.0L335.8 458.1L338.3 456.9L341.6 456.7L345.4 455.7L347.8 454.8L350.3 451.1L352.9 449.2L357.2 448.4L360.3 448.6L362.8 446.4L366.3 445.4L368.7 443.5L372.2 442.3L374.8 440.8L376.9 438.4L378.5 434.1L382.9 428.5L389.1 426.1L395.8 420.1L398.8 418.9L401.2 419.0L403.2 417.8L403.4 417.7L404.6 415.2L407.4 412.9L412.6 412.1L415.1 410.6L416.0 410.0L418.1 406.8L423.6 401.3L428.9 398.5L433.0 394.7L437.6 393.3L448.5 387.2L456.4 385.4L460.8 385.0L464.4 383.3L464.2 383.6L464.3 380.3L467.4 373.2L471.3 369.3L475.8 368.0L477.1 367.1L479.7 362.8L482.7 359.8L487.2 351.4L497.8 343.0L497.6 342.8L497.4 340.2L493.7 330.0L493.0 326.4L489.5 321.4L487.6 313.8L483.2 307.0L478.8 298.7L474.9 293.1L472.8 288.5L471.8 284.6L471.4 279.7L472.3 276.4L474.5 273.8L477.7 273.0L497.3 275.4L500.8 277.5L511.8 276.7L517.8 274.7L522.3 274.7L525.8 275.4L529.7 274.2L538.5 270.5L539.4 269.8L541.1 266.6L544.6 264.5L554.7 264.4L558.3 263.2L565.0 262.7L568.0 263.1L577.1 266.1L584.2 267.0L589.1 266.3L595.4 266.2L597.6 266.6L601.2 266.0L606.2 267.4L610.6 267.7L615.7 266.2L621.3 266.0L624.6 265.3L627.5 265.7L629.8 267.0L634.7 266.9L638.4 266.0L642.5 266.2L646.7 268.4L650.1 273.2L656.1 278.6L659.3 283.2L663.4 287.1L664.9 287.9L678.1 286.9L678.2 286.8L678.4 286.5L679.5 280.3L683.0 273.4L685.4 269.8L689.8 268.1L692.8 270.8L693.0 272.3L696.7 272.8L698.1 276.3L698.4 276.7L699.1 277.1L698.1 276.6L700.7 276.5","gmap":["47.4349,11.2629","47.2702,11.3936","47.7991,13.0629"]},{"key":"d4b","day":4,"variant":"B","label":"米滕瓦爾德 → 因斯布魯克 → 拉滕貝格 → 薩爾斯堡","km":226.9,"min":178,"d":"M282.3 408.1L284.3 405.8L284.4 408.1L283.7 411.6L286.1 418.5L282.1 422.9L281.3 424.5L279.2 425.1L276.2 432.9L273.8 436.1L270.0 438.6L269.4 439.3L269.4 438.7L270.2 440.4L270.1 444.9L270.9 447.9L270.2 450.5L270.0 449.6L271.1 451.2L275.9 453.3L278.3 456.2L276.0 460.4L276.2 456.8L276.5 456.2L278.1 456.4L281.1 457.7L283.6 459.9L283.0 460.9L285.9 460.3L288.9 461.1L294.2 460.7L297.4 462.1L299.1 464.1L300.7 464.9L300.5 464.9L303.8 464.0L306.6 465.0L308.0 464.2L309.6 463.1L311.9 463.5L311.3 464.5L311.4 461.9L316.1 461.7L315.0 460.1L318.8 461.9L321.4 460.8L325.0 462.4L324.8 462.8L322.4 461.8L325.1 461.4L328.5 459.2L333.0 458.0L335.8 458.1L338.3 456.9L341.6 456.7L345.4 455.7L347.8 454.8L350.3 451.1L352.9 449.2L357.2 448.4L360.3 448.6L362.8 446.4L366.3 445.4L368.7 443.5L372.2 442.3L374.8 440.8L376.9 438.4L378.5 434.1L382.9 428.5L389.1 426.1L395.8 420.1L398.8 418.9L401.2 419.0L403.2 417.8L403.4 417.7L404.6 415.2L407.4 412.9L412.6 412.1L415.1 410.6L416.0 410.0L418.1 406.8L423.4 401.5L425.9 400.1L428.8 402.9L427.4 401.4L426.9 401.3L428.5 406.8L426.3 407.2L424.1 401.2L429.2 398.3L433.1 394.7L437.6 393.3L448.5 387.2L456.4 385.4L460.8 385.0L464.4 383.3L464.2 383.6L464.3 380.3L467.4 373.2L471.3 369.3L475.8 368.0L477.1 367.1L479.7 362.8L482.7 359.8L487.2 351.4L497.8 343.0L497.6 342.8L497.4 340.2L493.7 330.0L493.0 326.4L489.5 321.4L487.6 313.8L483.2 307.0L478.8 298.7L474.9 293.1L472.8 288.5L471.8 284.6L471.4 279.7L472.3 276.4L474.5 273.8L477.7 273.0L497.3 275.4L500.8 277.5L511.8 276.7L517.8 274.7L522.3 274.7L525.8 275.4L529.7 274.2L538.5 270.5L539.4 269.8L541.1 266.6L544.6 264.5L554.7 264.4L558.3 263.2L565.0 262.7L568.0 263.1L577.1 266.1L584.2 267.0L589.1 266.3L595.4 266.2L597.6 266.6L601.2 266.0L606.2 267.4L610.6 267.7L615.7 266.2L621.3 266.0L624.6 265.3L627.5 265.7L629.8 267.0L634.7 266.9L638.4 266.0L642.5 266.2L646.7 268.4L650.1 273.2L656.1 278.6L659.3 283.2L663.4 287.1L664.9 287.9L678.1 286.9L678.2 286.8L678.4 286.5L679.5 280.3L683.0 273.4L685.4 269.8L689.8 268.1L692.8 270.8L693.0 272.3L696.7 272.8L698.1 276.3L698.4 276.7L699.1 277.1L698.1 276.6L700.7 276.5","gmap":["47.4349,11.2629","47.2633,11.4010","47.4393,11.8922","47.7991,13.0629"]},{"key":"d6","day":6,"variant":"","label":"薩爾斯堡 → 國王湖 → 比紹夫斯維森","km":43.5,"min":54,"d":"M700.5 282.5L699.5 282.3L700.8 278.2L704.2 281.9L706.4 295.7L701.8 300.4L698.7 306.4L699.3 308.6L697.9 311.2L697.8 311.5L699.7 313.7L700.0 317.6L699.5 320.6L697.7 323.1L697.2 324.5L697.1 325.3L697.5 326.6L698.5 330.4L694.7 334.9L691.9 336.2L692.0 337.3L690.4 337.9L690.1 339.2L688.5 340.8L689.3 339.5L689.0 344.0L686.5 348.8L686.5 350.5L686.0 350.3L686.6 350.4L683.6 352.3L681.1 352.8L681.0 353.3L680.1 350.2L681.1 346.1L683.3 342.3L683.4 340.1L686.0 342.2L684.2 343.0L681.5 341.8L683.7 336.5L681.6 339.2L682.2 341.7L681.5 340.9L679.9 340.0L677.3 336.8L676.4 333.7L674.8 332.6L672.4 327.6L672.6 327.8L670.6 326.7L669.2 323.5L672.5 324.5","gmap":["47.7991,13.0629","47.5880,12.9888","47.6752,12.9329"]},{"key":"d7a","day":7,"variant":"A","label":"比紹夫斯維森 → 辛特湖 → 哈修塔特","km":110.6,"min":111,"d":"M670.4 322.3L671.4 321.4L673.0 324.9L674.3 325.3L675.0 326.2L677.2 330.9L679.0 332.2L679.5 333.9L677.3 335.4L676.7 338.4L678.2 341.0L679.5 341.3L680.2 341.0L680.6 341.3L673.7 343.5L670.9 346.5L669.5 347.4L662.8 345.5L660.5 345.8L656.9 345.0L656.8 345.9L655.9 346.3L653.6 346.1L653.2 346.6L652.3 346.3L650.0 348.1L652.3 346.3L653.2 346.6L653.6 346.1L655.9 346.3L656.8 345.9L656.9 345.0L660.5 345.8L662.8 345.5L669.5 347.4L670.9 346.5L673.7 343.5L679.9 341.6L682.1 340.4L682.9 339.2L684.4 340.0L685.3 339.3L686.1 339.5L688.2 335.9L689.7 335.3L689.9 333.9L692.8 332.6L695.8 329.0L697.3 328.4L699.6 324.2L702.7 322.1L706.1 321.6L706.5 320.3L707.1 320.2L706.3 318.3L706.8 319.0L707.5 318.7L709.3 319.7L712.3 317.7L714.3 320.3L716.5 327.6L717.6 329.6L717.8 332.7L716.7 338.0L718.2 340.8L718.5 343.3L720.5 346.6L721.3 351.0L725.0 351.3L726.2 350.7L727.6 351.6L730.3 351.7L732.9 351.3L736.0 352.7L739.7 353.0L740.9 354.0L742.7 354.6L747.7 355.5L748.5 356.1L749.0 355.7L748.6 352.8L749.4 352.0L753.0 351.8L754.4 350.3L755.6 349.9L758.1 350.2L759.2 350.8L759.3 351.7L760.1 352.3L759.9 353.0L760.9 353.4L760.6 354.7L763.3 358.3L767.2 361.1L768.0 362.2L768.8 362.4L772.5 361.4L774.3 361.5L774.1 358.7L774.5 357.3L776.5 357.3L780.6 355.2L781.6 355.5L784.6 354.8L790.0 355.2L793.0 352.1L795.8 350.8L800.0 350.8L801.7 351.6L804.3 351.0L805.0 352.2L809.2 353.1L810.1 353.9L811.3 352.8L820.4 351.5L824.1 349.8L825.3 349.7L828.8 351.7L830.9 351.8L832.7 351.2L833.7 351.5L836.0 350.9L838.4 351.9L839.0 352.9L838.7 355.1L837.1 358.0L836.2 362.3L836.5 363.0L837.0 361.5","gmap":["47.6752,12.9329","47.6065,12.8538","47.5614,13.6489"]},{"key":"d7b","day":7,"variant":"B","label":"比紹夫斯維森 → 國王湖 → 哈修塔特","km":95.3,"min":99,"d":"M670.4 322.3L671.4 321.4L673.0 324.9L674.3 325.3L675.0 326.2L677.2 330.9L679.0 332.1L680.0 335.5L681.9 337.8L683.3 338.5L683.7 339.1L684.5 339.2L683.7 339.5L683.0 339.2L684.4 340.0L685.3 339.3L686.3 339.5L686.1 343.2L683.9 347.3L683.0 350.7L683.8 351.5L683.6 352.3L683.8 351.5L683.2 351.3L683.1 350.7L683.9 347.3L686.2 343.1L686.1 339.2L687.6 337.5L688.2 335.9L689.6 335.4L689.9 333.9L692.8 332.6L695.8 329.0L697.2 328.4L699.6 324.2L702.7 322.1L706.1 321.6L706.5 320.3L707.1 320.2L706.3 318.3L706.8 319.0L707.5 318.7L709.3 319.7L712.3 317.7L714.3 320.3L716.5 327.6L717.6 329.6L717.8 332.7L716.7 338.0L718.2 340.8L718.5 343.3L720.5 346.6L721.3 351.0L725.0 351.3L726.2 350.7L727.6 351.6L730.3 351.7L732.9 351.3L736.0 352.7L739.7 353.0L740.9 354.0L742.7 354.6L747.7 355.5L748.5 356.1L749.0 355.7L748.6 352.8L749.4 352.0L753.0 351.8L754.4 350.3L755.6 349.9L758.1 350.2L759.2 350.8L759.3 351.7L760.1 352.3L759.9 353.0L760.9 353.4L760.6 354.7L763.3 358.3L767.2 361.1L768.0 362.2L768.8 362.4L772.5 361.4L774.3 361.5L774.1 358.7L774.5 357.3L776.5 357.3L780.6 355.2L781.6 355.5L784.6 354.8L790.0 355.2L793.0 352.1L795.8 350.8L800.0 350.8L801.7 351.6L804.3 351.0L805.0 352.2L809.2 353.1L810.1 353.9L811.3 352.8L820.4 351.5L824.1 349.8L825.3 349.7L828.8 351.7L830.9 351.8L832.7 351.2L833.7 351.5L836.0 350.9L838.4 351.9L839.0 352.9L838.7 355.1L837.1 358.0L836.2 362.3L836.5 363.0L837.0 361.5","gmap":["47.6752,12.9329","47.5880,12.9888","47.5614,13.6489"]},{"key":"d8","day":8,"variant":"","label":"哈修塔特 → 普里恩 → 慕尼黑","km":219.7,"min":166,"d":"M834.1 360.7L834.2 361.1L839.2 362.9L840.2 360.1L840.0 359.0L841.5 356.1L842.0 352.7L840.1 349.4L836.2 347.9L833.5 348.5L832.4 348.2L830.5 348.8L829.9 348.9L826.5 346.9L823.1 347.0L819.7 348.6L810.6 349.9L809.7 350.9L810.1 350.2L806.2 349.4L804.8 348.0L801.8 348.6L800.4 347.9L795.2 347.8L791.2 349.7L789.1 352.3L784.4 351.8L781.2 352.5L779.6 352.4L775.5 354.4L773.0 354.8L771.1 358.5L771.7 359.9L772.0 358.5L768.3 359.5L769.9 359.9L769.2 358.9L765.4 356.1L763.3 353.3L763.7 352.3L762.3 351.2L762.8 351.1L761.9 350.2L761.5 348.9L758.8 347.3L755.6 346.9L752.6 347.9L752.1 349.0L748.8 349.0L745.7 352.4L746.0 355.5L749.0 353.2L748.5 352.6L743.4 351.7L742.3 351.3L740.5 350.1L736.7 349.8L733.3 348.3L728.1 348.6L726.6 347.7L724.9 348.3L724.0 348.7L723.2 345.2L721.2 342.0L721.0 339.7L719.7 338.1L720.8 333.1L720.5 328.8L719.4 326.5L716.8 318.6L713.6 314.8L711.2 304.8L708.7 301.3L691.4 293.6L687.2 289.0L681.7 286.2L664.8 287.9L664.0 287.5L659.4 283.3L655.9 278.4L650.2 273.2L646.9 268.5L643.0 266.2L638.6 266.0L635.0 266.9L629.7 267.0L627.7 265.8L624.7 265.3L621.3 266.0L615.7 266.1L610.5 267.7L606.2 267.4L601.2 266.0L597.5 266.5L595.4 266.1L589.1 266.3L584.1 267.0L576.5 265.9L568.1 263.1L565.1 262.6L558.3 263.2L554.7 264.4L544.7 264.4L541.1 266.6L539.4 269.7L537.5 270.8L540.7 272.4L539.8 267.4L536.5 262.1L536.6 259.5L530.6 258.9L530.6 259.6L528.7 260.5L528.1 262.6L526.1 265.3L525.6 268.0L527.0 266.2L524.4 267.5L527.0 267.5L524.4 266.4L522.2 269.3L518.8 274.7L518.4 277.9L521.5 274.6L517.1 274.8L511.8 276.7L500.8 277.5L500.8 277.5L497.3 275.4L477.7 272.9L457.9 269.1L447.2 268.6L444.9 267.3L441.5 266.7L438.6 267.3L437.0 268.6L438.4 268.7L433.3 265.7L429.0 266.4L430.0 266.7L426.4 263.9L423.4 258.3L419.2 255.2L412.4 253.4L407.7 253.7L407.0 253.6L392.8 245.1L391.8 244.1L391.4 243.2L388.7 233.3L384.3 222.8L381.8 211.3L377.6 201.8L373.5 189.8L367.5 180.1L366.7 174.7L367.1 171.1L366.4 168.4L362.9 165.5L359.9 166.7L359.7 166.9L358.7 166.3L358.6 164.9L355.7 161.6L355.5 162.2L354.9 159.6L351.0 158.5","gmap":["47.5614,13.6489","47.8542,12.3456","48.1388,11.5613"]}]
};
