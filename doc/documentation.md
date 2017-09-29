# Documentation of the OpenLigaDB API

## Preface

This code is forked from https://github.com/OpenLigaDB/OpenLigaDB-Samples

## General

To fetch the League-Data of OpenLigaDB, the following Key-Parameters are used:

 * **LeagueShortcut**  - one from the creator of the League chosen short string, in the case of the 1st Bundesliga: 'bl1'
 * **LeagueSeason** - The Year (YYYY) of the Season of the League
 * **GroupOrderId** - The OrderID of the "Group", its equivalent to the "Matchday" of the 1st Bundesliga

The Schema to call the JSON-API is, in respect to the chosen detaillevel, like this:
> https://www.openligadb.de/api/getmatchdata/LeagueShortcut/LeagueSeason/GroupOrderId

The Server responds respecting the Accept-Header with JSON or XML (See [Content Negotiation](https://weblog.west-wind.com/posts/2012/aug/21/an-introduction-to-aspnet-web-api#ContentNegotiation))

Additionaly, you may fetch the data via Soap-Webservice with the URL [https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx](https://www.OpenLigaDB.de/Webservices/Sportsdata.asmx).

## Api-Scheme
Following are examples of the Api-Scheme:

---
Matches of the current Matchday of the 1st Bundesliga:
> [https://www.openligadb.de/api/getmatchdata/bl1](https://www.openligadb.de/api/getmatchdata/bl1)

The current Matchday is increased half-time between the last match of the last Matchday, and the first match of the next Matchday.

---
Matches of the 8. Matchday of the 1st Bundesliga 2016/2017:
> [https://www.openligadb.de/api/getmatchdata/bl1/2016/8](https://www.openligadb.de/api/getmatchdata/bl1/2016/8)

---
All matches of the 1st Bundesliga 2016/2017:
> [https://www.openligadb.de/api/getmatchdata/bl1/2016](https://www.openligadb.de/api/getmatchdata/bl1/2016)

---
Match with the Id 39738:
> [https://www.openligadb.de/api/getmatchdata/39738](https://www.openligadb.de/api/getmatchdata/39738)

---
The current Group (equivalent to Matchday in 1st Bundesliga) of the 1st Bundesliga as leagueShortcuts-Parameter ( 'bl1'):
> [https://www.openligadb.de/api/getcurrentgroup/bl1](https://www.openligadb.de/api/getcurrentgroup/bl1)

The current Matchday is increased half-time between the last match of the last Matchday, and the first match of the next Matchday.


---
A list of the Match-Types (Matchday, preliminary Round, Finales, ...) of the league by leagueShortcuts-Parameter
> [https://www.openligadb.de/api/getavailablegroups/bl1/2016](https://www.openligadb.de/api/getavailablegroups/bl1/2016)

---
Date and time of the last change of the Data of the 8th Matchday of the 1st Bundesliga 2016/2017
> [https://www.openligadb.de/api/getlastchangedate/bl1/2016/8](https://www.openligadb.de/api/getlastchangedate/bl1/2016/8)

You may use this to detect changes to minimize unnessecary polling.

---
The next match of the given team, of the given league:
> [https://www.openligadb.de/api/getnextmatchbyleagueteam/3005/7](https://www.openligadb.de/api/getnextmatchbyleagueteam/3005/7)

 * '3005' is the LeagueId of the 1st Bundesliga 2016/2017
 * '7' is the TeamId of Borussia Dortmund

---
All Teams of one League:
> [https://www.openligadb.de/api/getavailableteams/bl1/2016](https://www.openligadb.de/api/getavailableteams/bl1/2016)
