# Google 地圖連結驗證報告

- **驗證日期**：2026-09-24
- **驗證版本**：內建瀏覽器中已開啟的部署版 [德國・奧地利｜2026 秋](https://alexzhangyouwei.github.io/germany-austria-2026/)
- **涵蓋頁面**：首頁、Day 1–9、美食、天氣、票券、伴手禮、自駕、eSIM、清單、緊急聯絡，共 18 頁。
- **範圍**：110 個唯一 Google 地圖網址（網站 DOM 重複出現共 1,291 次）。
- **網址類型**：82 個搜尋、18 個商家／地標、10 個路線／地址。

## 結論

- **105 個**可開啟並對應預期商家、地標、地址或路線；其中 10 個路線／地址連結本來就會以地址或座標航點呈現。
- **3 個**開到相同地址，但 Google 地圖目前使用不同的商家／品牌名稱。
- **2 個**Google 地圖找不到結果，建議改為更完整的地址或直接指定地標。

## 需處理的連結

| 連結名稱 | 實際開啟結果 | URL |
|---|---|---|
| 上市場街 Obermarkt | ❌ Google 地圖找不到 `Obermarkt, 82481 Mittenwald`。 | [開啟](https://www.google.com/maps/search/?api=1&query=Obermarkt%2C%2082481%20Mittenwald) |
| 哈修塔特市集廣場 Marktplatz | ❌ Google 地圖找不到 `Marktplatz, 4830 Hallstatt`。 | [開啟](https://www.google.com/maps/search/?api=1&query=Marktplatz%2C%204830%20Hallstatt) |
| Eni Bischofswiesen-Strub | ⚠️ 顯示 **Agip Service-Station**；Silbergstraße 91 地址相同。 | [開啟](https://www.google.com/maps/search/?api=1&query=Eni%20Bischofswiesen-Strub%20Silbergstra%C3%9Fe%2091%2C%2083483%20Bischofswiesen) |
| Hettegger Eni Kuchl | ⚠️ 顯示 **Hettegger & Sohn GmbH**；Kellau 157 地址相同。 | [開啟](https://www.google.com/maps/search/?api=1&query=Hettegger%20Eni%20Kuchl%20Kellau%20157%2C%205431%20Kuchl) |
| AVIA Hochstraße | ⚠️ 顯示 **Esso**；Hochstraße 5 地址相同。 | [開啟](https://www.google.com/maps/search/?api=1&query=AVIA%20Hochstra%C3%9Fe%20Hochstra%C3%9Fe%205%2C%2081669%20M%C3%BCnchen) |

## 全部唯一網址與實測結果

| # | 頁面 | 連結名稱 | 類型 | Google 地圖 URL | 開啟結果 |
|---:|---|---|---|---|---|
| 1 | index.html | Munich Top Place Nähe Marienplatz mit 2 Schlafzimmer 70 qm Apartment Jennifer | 商家／地標 | [開啟](https://maps.app.goo.gl/CHofehMQPcv4XWYd7) | ✅ 商家名稱相符；Google 地圖公開卡僅顯示 80331 München，未列完整門牌。 |
| 2 | index.html | Mittenwald-Ferien | 商家／地標 | [開啟](https://maps.app.goo.gl/SfZtapC3ANfqKZyz6) | ✅ 已開啟相符商家或地標。 |
| 3 | index.html | In the heart of the city of Salzburg | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&destination=B%C3%BCrglsteinstra%C3%9Fe%2019%2C%205020%20Salzburg) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 4 | index.html | Ferienhaus Gestüt Pfaffenlehen | 商家／地標 | [開啟](https://maps.app.goo.gl/aw3oAPZnbiNEqEdd7) | ✅ 已開啟相符商家或地標。 |
| 5 | index.html | Hallberg Apartments 哈爾貝格公寓 | 商家／地標 | [開啟](https://maps.app.goo.gl/1ZLyto7NpZ7NQ69P9) | ✅ 已開啟相符商家或地標。 |
| 6 | index.html | Motel One München-Hauptbahnhof | 商家／地標 | [開啟](https://maps.app.goo.gl/Uq4aRzbAwWSCKAod7) | ✅ 已開啟相符商家或地標。 |
| 7 | day1.html、day9.html、shop.html | 慕尼黑機場 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Terminal%201%2C%20Flughafen%20M%C3%BCnchen%2C%2085356%20M%C3%BCnchen-Flughafen) | ✅ 已開啟相符商家或地標。 |
| 8 | day1.html、drive.html | Munich Top Place（Sonnenstraße 3） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Munich%20Top%20Place%20N%C3%A4he%20Marienplatz%20Apartment%20Jennifer%2C%20Sonnenstra%C3%9Fe%203%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 9 | day1.html、shop.html | 卡爾廣場 Karlsplatz Stachus | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Karlsplatz%20Stachus%2C%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 10 | day1.html、day8.html | 瑪利亞廣場 Marienplatz | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Marienplatz%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 11 | day1.html | 阿桑教堂 Asamkirche | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Asamkirche%2C%20Sendlinger%20Stra%C3%9Fe%2032%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 12 | day1.html | 維克圖阿連市場 Viktualienmarkt | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Viktualienmarkt%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 13 | day1.html | dm 藥妝店（Karlsplatz 25，Stachus Passagen 地下層） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=dm-drogerie%20markt%2C%20Karlsplatz%2025%2C%2080335%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 14 | day1.html | 聖母教堂 Frauenkirche | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Frauenkirche%2C%20Frauenplatz%201%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 15 | day1.html | 聖彌額爾教堂 St. Michael（Neuhauser Straße 6） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=St.%20Michael%2C%20Neuhauser%20Stra%C3%9Fe%206%2C%2080333%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 16 | day1.html、shop.html | 新豪瑟街 Neuhauser Straße | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Neuhauser%20Stra%C3%9Fe%2C%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 17 | day1.html | 奧古斯丁啤酒花園 Augustiner-Keller | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Augustiner-Keller%2C%20Arnulfstra%C3%9Fe%2052%2C%2080335%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 18 | day1.html、shop.html | 慕尼黑中央車站 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=M%C3%BCnchen%20Hauptbahnhof) | ✅ 已開啟相符商家或地標。 |
| 19 | day2.html、day9.html | SIXT 慕尼黑卡爾廣場店（Karlsplatz 3） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=SIXT%20Autovermietung%20M%C3%BCnchen%20Stachus%2C%20Karlsplatz%203%2C%2080335%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 20 | day2.html、tickets.html、drive.html | 新天鵝堡 P4 停車場 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Parkplatz%20P4%2C%20Alpseestra%C3%9Fe%2027%2C%2087645%20Hohenschwangau) | ✅ 已開啟相符商家或地標。 |
| 21 | day2.html | 瑪麗安橋 Marienbrücke | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Marienbr%C3%BCcke%2C%2087645%20Schwangau) | ✅ 已開啟相符商家或地標。 |
| 22 | day2.html | 新天鵝堡 Schloss Neuschwanstein | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Schloss%20Neuschwanstein%2C%20Neuschwansteinstra%C3%9Fe%2020%2C%2087645%20Schwangau) | ✅ 已開啟相符商家或地標。 |
| 23 | day2.html | 霍恩施萬高村 Hohenschwangau（Alpseestraße） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hohenschwangau%2C%20Alpseestra%C3%9Fe%2C%2087645%20Schwangau) | ✅ 已開啟相符商家或地標。 |
| 24 | day2.html | 聖科洛曼教堂 St. Coloman | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=St.%20Coloman%2C%20Colomanstra%C3%9Fe%201%2C%2087645%20Schwangau) | ✅ 已開啟相符商家或地標。 |
| 25 | day2.html、day3.html、day4.html、drive.html | Mittenwald-Ferien（Mühlenweg 36） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=mittenwald-ferien.de%2C%20M%C3%BChlenweg%2036%2C%2082481%20Mittenwald) | ✅ 已開啟相符商家或地標。 |
| 26 | day2.html、day3.html、shop.html | 上市場街 Obermarkt | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Obermarkt%2C%2082481%20Mittenwald) | ❌ 無結果：Google 地圖顯示「找不到 Obermarkt, 82481 Mittenwald」。 |
| 27 | day3.html | 楚格峰 Zugspitze | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Zugspitze) | ✅ 已開啟相符商家或地標。 |
| 28 | day3.html | 艾布湖 Eibsee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Eibsee%2C%2082491%20Grainau) | ✅ 已開啟相符商家或地標。 |
| 29 | day3.html | 帕特納赫峽谷 Partnachklamm | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Partnachklamm%2C%2082467%20Garmisch-Partenkirchen) | ✅ 已開啟相符商家或地標。 |
| 30 | day3.html | 路德維希大街 Ludwigstraße | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Ludwigstra%C3%9Fe%2C%2082467%20Garmisch-Partenkirchen) | ✅ 已開啟相符商家或地標。 |
| 31 | day3.html、shop.html | 米滕瓦爾德車站藥局 Bahnhof-Apotheke | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Bahnhof-Apotheke%2C%20Bahnhofplatz%2010%2C%2082481%20Mittenwald) | ✅ 已開啟相符商家或地標。 |
| 32 | day4.html、shop.html、drive.html | 因斯布魯克 Congress／Altstadtgarage | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Congress%20Garage%2C%20Rennweg%203%2C%206020%20Innsbruck) | ✅ 已開啟相符商家或地標。 |
| 33 | day4.html | 哈菲勒卡峰 Hafelekar | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hafelekar%2C%20Innsbruck) | ✅ 已開啟相符商家或地標。 |
| 34 | day4.html | 黃金屋頂 Goldenes Dachl | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Goldenes%20Dachl%2C%20Herzog-Friedrich-Stra%C3%9Fe%2015%2C%206020%20Innsbruck) | ✅ 已開啟相符商家或地標。 |
| 35 | day4.html、day5.html、day6.html、tickets.html、drive.html | In the heart of the city of Salzburg（Bürglsteinstraße 19） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=B%C3%BCrglsteinstra%C3%9Fe%2019%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 36 | day4.html、drive.html | 拉滕貝格 Rattenberg 老城 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Rattenberg%20Altstadt%2C%206240%20Rattenberg%2C%20Tirol) | ✅ 已開啟相符商家或地標。 |
| 37 | day5.html | 米拉貝爾花園 Mirabellgarten | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Mirabellgarten%2C%20Mirabellplatz%203%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 38 | day5.html | 莫札特出生地 Mozarts Geburtshaus | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Mozarts%20Geburtshaus%2C%20Getreidegasse%209%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 39 | day5.html | 糧食胡同 Getreidegasse | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Getreidegasse%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 40 | day5.html、tickets.html | 主教宮廣場 Residenzplatz | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Residenzplatz%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 41 | day5.html、shop.html | 薩爾斯堡要塞 Festung Hohensalzburg | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Festung%20Hohensalzburg%2C%20M%C3%B6nchsberg%2034%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 42 | day5.html | 主教座堂 Salzburger Dom | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Salzburger%20Dom%2C%20Domplatz%201a%2C%205020%20Salzburg) | ✅ 已開啟相符商家或地標。 |
| 43 | day6.html、tickets.html | 國王湖碼頭 Seelände | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Seel%C3%A4nde%20K%C3%B6nigssee%2C%20Bayerische%20Seenschifffahrt%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 44 | day6.html | 上湖 Obersee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Obersee%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 45 | day6.html | 薩雷特 Salet | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Salet%2C%20K%C3%B6nigssee%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 46 | day6.html、day7.html | 畫家角 Malerwinkel | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Malerwinkel%2C%20K%C3%B6nigssee%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 47 | day6.html、day7.html、shop.html、drive.html | Ferienhaus Gestüt Pfaffenlehen | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=House%20riding%20Pfaffenlehen%2C%20Pfaffenlehen%206%2C%2083483%20Bischofswiesen) | ✅ 已開啟相符商家或地標。 |
| 48 | day7.html | 辛特湖 Hintersee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hintersee%2C%2083486%20Ramsau%20bei%20Berchtesgaden) | ✅ 已開啟相符商家或地標。 |
| 49 | day7.html、day8.html、drive.html | 哈修塔特 P1 停車場（Hotel-Shuttle Info-Point 在入口旁） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Parkplatz%20P1%20Hallstatt%2C%20Salinenplatz%204%2C%204830%20Hallstatt) | ✅ 已開啟相符商家或地標。 |
| 50 | day7.html | 哈修塔特市集廣場 Marktplatz | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Marktplatz%2C%204830%20Hallstatt) | ❌ 無結果：Google 地圖顯示「找不到 Marktplatz, 4830 Hallstatt」。 |
| 51 | day7.html、day8.html | Hallberg Apartments（Seestraße 113） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Pension%20Hallberg%2C%20Seestra%C3%9Fe%20113%2C%204830%20Hallstatt) | ✅ 已開啟相符商家或地標。 |
| 52 | day8.html | 哈修塔特鹽礦 Salzwelten | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Salzwelten%20Hallstatt%20Salzbergwerk%2C%20Salzberg%2021%2C%204830%20Hallstatt) | ✅ 已開啟相符商家或地標。 |
| 53 | day8.html | 哈修塔特天空步道 Welterbeblick | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hallstatt%20Skywalk%20Welterbeblick%2C%20Salzberg%2C%204830%20Hallstatt) | ✅ 已開啟相符商家或地標。 |
| 54 | day8.html、day9.html、drive.html | Motel One München-Hauptbahnhof | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hotel%20Motel%20One%20M%C3%BCnchen-Hauptbahnhof%2C%20Schillerstra%C3%9Fe%203-3a%2C%2080336%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 55 | day8.html | 國際路德維希藥局 Internationale Ludwigs-Apotheke（Neuhauser Str. 11） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Internationale%20Ludwigs-Apotheke%2C%20Neuhauser%20Stra%C3%9Fe%2011%2C%2080331%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 56 | day1–day9.html | Day 2 路線：慕尼黑 → 新天鵝堡 → 米滕瓦爾德 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=48.1384,11.5660&destination=47.4349,11.2629&waypoints=47.5560,10.7395|47.5716,10.7614) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 57 | day1–day9.html | Day 3A 路線：米滕瓦爾德 ⇄ 艾布湖／楚格峰 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.4349,11.2629&destination=47.4349,11.2629&waypoints=47.4577,10.9797) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 58 | day1–day9.html | Day 3B 路線：米滕瓦爾德 ⇄ 帕特納赫峽谷／加米施 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.4349,11.2629&destination=47.4349,11.2629&waypoints=47.4837,11.1178|47.4921,11.0955) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 59 | day1–day9.html | Day 4A 路線：米滕瓦爾德 → 因斯布魯克 → 薩爾斯堡 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.4349,11.2629&destination=47.7991,13.0629&waypoints=47.2702,11.3936) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 60 | day1–day9.html | Day 4B 路線：米滕瓦爾德 → 因斯布魯克 → 拉滕貝格 → 薩爾斯堡 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.4349,11.2629&destination=47.7991,13.0629&waypoints=47.2633,11.4010|47.4393,11.8922) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 61 | day1–day9.html | Day 6 路線：薩爾斯堡 → 國王湖 → 比紹夫斯維森 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.7991,13.0629&destination=47.6752,12.9329&waypoints=47.5880,12.9888) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 62 | day1–day9.html | Day 7A 路線：比紹夫斯維森 → 辛特湖 → 哈修塔特 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.6752,12.9329&destination=47.5614,13.6489&waypoints=47.6065,12.8538) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 63 | day1–day9.html | Day 7B 路線：比紹夫斯維森 → 國王湖 → 哈修塔特 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.6752,12.9329&destination=47.5614,13.6489&waypoints=47.5880,12.9888) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 64 | day1–day9.html | Day 8 路線：哈修塔特 → 普里恩 → 慕尼黑 | 路線／地址 | [開啟](https://www.google.com/maps/dir/?api=1&travelmode=driving&origin=47.5614,13.6489&destination=48.1388,11.5613) | ✅ 已開啟路線／地址。座標航點會以附近地址或商家名稱顯示，非商家資訊卡。 |
| 65 | food.html | Augustiner-Keller 奧古斯丁啤酒花園 | 商家／地標 | [開啟](https://maps.google.com/?cid=11190566384854483039) | ✅ 已開啟相符商家或地標。 |
| 66 | food.html | Hofbräuhaus 皇家啤酒屋 | 商家／地標 | [開啟](https://maps.google.com/?cid=12232182229576260143) | ✅ 已開啟相符商家或地標。 |
| 67 | food.html | Viktualienmarkt 維克圖阿連市場 | 商家／地標 | [開啟](https://maps.google.com/?cid=2677954517243457902) | ✅ 已開啟相符商家或地標。 |
| 68 | food.html | 美食區域：慕尼黑 München | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=M%C3%BCnchen) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 69 | food.html | Kainz Restaurant | 商家／地標 | [開啟](https://maps.google.com/?cid=893658560296655828) | ✅ 已開啟相符商家或地標。 |
| 70 | food.html | Dorfwirt | 商家／地標 | [開啟](https://maps.google.com/?cid=10389251774094546559) | ✅ 已開啟相符商家或地標。 |
| 71 | food.html | Alpenrose am See | 商家／地標 | [開啟](https://maps.google.com/?cid=12552717955094997743) | ✅ 已開啟相符商家或地標。 |
| 72 | food.html | 美食區域：霍恩施萬高／新天鵝堡山腳 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hohenschwangau) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 73 | food.html | Restaurant Wildfang | 商家／地標 | [開啟](https://maps.google.com/?cid=574336831994827821) | ✅ 已開啟相符商家或地標。 |
| 74 | food.html | Ristorante & Pizzeria La Viola | 商家／地標 | [開啟](https://maps.google.com/?cid=12389761651221008114) | ✅ 已開啟相符商家或地標。 |
| 75 | food.html | Indian Grill | 商家／地標 | [開啟](https://maps.google.com/?cid=13389305306159964863) | ✅ 已開啟相符商家或地標。 |
| 76 | food.html | REWE 超市 | 商家／地標 | [開啟](https://maps.google.com/?cid=667727193409986719) | ✅ 已開啟相符商家或地標。 |
| 77 | food.html | 美食區域：米滕瓦爾德 Mittenwald | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Mittenwald) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 78 | food.html | 美食區域：楚格峰／艾布湖 Zugspitze & Eibsee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Zugspitze%20%26%20Eibsee) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 79 | food.html | 美食區域：加米施－帕滕基興 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Garmisch-Partenkirchen) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 80 | food.html | 美食區域：因斯布魯克 Innsbruck | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Innsbruck) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 81 | food.html | 美食區域：拉滕貝格 Rattenberg | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Rattenberg) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 82 | food.html | 美食區域：薩爾斯堡 Salzburg | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Salzburg) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 83 | food.html | Historische Gaststätte St. Bartholomä 國王湖漁夫餐廳 | 商家／地標 | [開啟](https://maps.google.com/?cid=16716103692613234265) | ✅ 已開啟相符商家或地標。 |
| 84 | food.html | Fischunkelalm 釣魚牧場 | 商家／地標 | [開啟](https://maps.google.com/?cid=7121190574320796912) | ✅ 已開啟相符商家或地標。 |
| 85 | food.html | 美食區域：國王湖／上湖 Königssee & Obersee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=K%C3%B6nigssee%20%26%20Obersee) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 86 | food.html | 美食區域：比紹夫斯維森／貝希特斯加登 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Bischofswiesen%20%26%20Berchtesgaden) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 87 | food.html | 美食區域：辛特湖 Hintersee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hintersee) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 88 | food.html | Zum Bader Gastwirtschaft | 商家／地標 | [開啟](https://maps.google.com/?cid=8451986518570336850) | ✅ 已開啟相符商家或地標。 |
| 89 | food.html | 美食區域：哈修塔特 Hallstatt | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hallstatt) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 90 | food.html | 美食區域：普里恩／基姆湖 Prien am Chiemsee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Prien%20am%20Chiemsee) | ✅ 已開啟相符區域搜尋；多地名查詢可能呈現其中一處或結果清單。 |
| 91 | tickets.html、shop.html | 哈修塔特鹽礦纜車山下站 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Salzwelten%20Hallstatt%2C%20Salzbergstra%C3%9Fe%2021%2C%204830%20Hallstatt) | ✅ 已開啟相符商家或地標。 |
| 92 | tickets.html、drive.html | 艾布湖／楚格峰纜車停車場 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Parkplatz%20Eibsee-Seilbahn%20Zugspitze%2C%20Am%20Eibsee%2C%2082491%20Grainau) | ✅ 顯示艾布湖 P1／P2 與楚格峰停車場的搜尋結果；區域吻合，非單一資訊卡。 |
| 93 | tickets.html | 飢餓堡纜車 Hungerburgbahn（Station Congress） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hungerburgbahn%20Station%20Congress%2C%20Rennweg%203%2C%206020%20Innsbruck) | ✅ 已開啟相符商家或地標。 |
| 94 | drive.html | 奧林匹克滑雪體育場停車場 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Parkplatz%20P21%20Olympia-Skistadion%2C%20Karl-und-Martin-Neuner-Platz%2C%20Garmisch-Partenkirchen) | ✅ 已開啟相符商家或地標。 |
| 95 | drive.html | 國王湖停車場 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Parkplatz%20K%C3%B6nigssee%2C%20Jennerbahnstra%C3%9Fe%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 96 | drive.html | Aral Schwangau | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Aral%20Schwangau%20K%C3%B6nig-Ludwig-Str.%202%2C%2087645%20Schwangau) | ✅ 已開啟相符商家或地標。 |
| 97 | drive.html | Shell Mittenwald | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Shell%20Mittenwald%20Am%20Brunnstein%202%2C%2082481%20Mittenwald) | ✅ 已開啟相符商家或地標。 |
| 98 | drive.html | Aral Garmisch-Partenkirchen | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Aral%20Garmisch-Partenkirchen%20Hauptstra%C3%9Fe%2020%2C%2082467%20Garmisch-Partenkirchen) | ✅ 已開啟相符商家或地標。 |
| 99 | drive.html | Avanti 自助站 Zirl | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Avanti%20%E8%87%AA%E5%8A%A9%E7%AB%99%20Zirl%20Meilstra%C3%9Fe%2049%2C%206170%20Zirl) | ✅ 已開啟相符商家或地標。 |
| 100 | drive.html | Esso Rastanlage Hochfelln Süd | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Esso%20Rastanlage%20Hochfelln%20S%C3%BCd%20A8%2C%2083346%20Bergen) | ✅ 已開啟相符商家或地標。 |
| 101 | drive.html | Aral Schönau am Königssee | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Aral%20Sch%C3%B6nau%20am%20K%C3%B6nigssee%20Seestra%C3%9Fe%201%2C%2083471%20Sch%C3%B6nau%20am%20K%C3%B6nigssee) | ✅ 已開啟相符商家或地標。 |
| 102 | drive.html | Eni Bischofswiesen-Strub | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Eni%20Bischofswiesen-Strub%20Silbergstra%C3%9Fe%2091%2C%2083483%20Bischofswiesen) | ⚠️ 地址吻合，但目前顯示為 **Agip Service-Station**，非 Eni 名稱。 |
| 103 | drive.html | Hettegger Eni Kuchl | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Hettegger%20Eni%20Kuchl%20Kellau%20157%2C%205431%20Kuchl) | ⚠️ 地址吻合，但目前顯示為 **Hettegger & Sohn GmbH**，未顯示 Eni 名稱。 |
| 104 | drive.html | Socar Bad Goisern | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Socar%20Bad%20Goisern%20Bundesstra%C3%9Fe%2095%2C%204822%20Bad%20Goisern) | ✅ 已開啟相符商家或地標。 |
| 105 | drive.html | Esso Rastanlage Hochfelln Nord | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Esso%20Rastanlage%20Hochfelln%20Nord%20A8%2C%2083346%20Bergen) | ✅ 已開啟相符商家或地標。 |
| 106 | drive.html | AVIA Hochstraße | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=AVIA%20Hochstra%C3%9Fe%20Hochstra%C3%9Fe%205%2C%2081669%20M%C3%BCnchen) | ⚠️ 地址吻合，但目前顯示為 **Esso**，非 AVIA 名稱。 |
| 107 | drive.html | JET Landsberger Straße | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=JET%20Landsberger%20Stra%C3%9Fe%20Landsberger%20Str.%20184%2C%2080687%20M%C3%BCnchen) | ✅ 已開啟相符商家或地標。 |
| 108 | offices.html | 駐德國台北代表處慕尼黑辦事處 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Leopoldstrasse+28a%2C+80802+M%C3%BCnchen) | ✅ 顯示相符街道地址；此連結設計為地址搜尋，非辦事處商家卡。 |
| 109 | offices.html | 駐奧地利台北經濟文化代表處 | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Wagramer+Strasse+19%2C+1220+Wien) | ✅ 顯示相符街道地址；此連結設計為地址搜尋，非辦事處商家卡。 |
| 110 | offices.html | 駐德國台北代表處（柏林） | 搜尋 | [開啟](https://www.google.com/maps/search/?api=1&query=Markgrafenstrasse+35%2C+10117+Berlin) | ✅ 顯示相符街道地址；此連結設計為地址搜尋，非辦事處商家卡。 |

## 判讀說明

- 「路線／地址」連結的預期行為是開啟導航目的地或座標路線；Google 地圖可能用最近的門牌、店家或設施名稱標註座標。
- 「美食區域」與「艾布湖／楚格峰纜車停車場」屬搜尋型連結，Google 地圖可能顯示結果清單，而非唯一的地標卡。
- 本報告記錄的是驗證當下 Google 地圖所顯示的名稱；商家品牌、地圖資料及搜尋排序可能隨後變動。
