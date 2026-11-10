# Western Michigan at Akron · Week 11 drive handicap

**Pass Akron +14 and +14.5.** Possession-based fair spread **WMU −15.6**. Move Akron to **Watch at +19.5 or better, −110 or better**, with Broughton’s workload confirmed. That price provides about four points of cushion against the research estimate and is a threshold for review. The available evidence supports no Play.

November 10, 2026 pregame research · CFBD 401866458 · 6:00 p.m. CT at InfoCision Stadium · results through November 9 CT. [Official matchup preview](https://wmubroncos.com/news/2026/11/9/football-opens-maction-on-the-road-at-akron-on-tuesday.aspx)

| Reference | WMU spread |
| --- | ---: |
| Registered Week 11 model | −12.67 |
| ChatGPT provisional handicap | −12.0 |
| Archived DraftKings, Nov. 9 at 6:47 a.m. CT | −14.5 |
| Possession-based research | **−15.6** |

The archived +14.5 lacks spread odds. The BetMGM event page showed Akron +14 at 1.90 on the morning of Nov. 10. These are separate book observations. [Frozen Week 11 game](https://raw.githubusercontent.com/jptx817/sports_fun_preview/main/docs/cfb/data/snapshots/2026-WK11/c3ca54c814e8ce5511227d852e168e7a80d179368e028dbedf0fa564d61f3b19/games/401866458.md) · [BetMGM event page](https://www.betmgm.com/en/sports/events/western-michigan-akron-6:48531)

## Western Michigan's pace

WMU’s FBS games averaged **10.31 possessions per side** against **11.29** nationally. WMU’s offense used **180 seconds per drive** versus **158** nationally. Its 62.9% box rushing share becomes 59.9% in live rushes and dropbacks. In the last three games the run share rose to **64.3%** while drives shortened to **151 seconds** and paired possessions rose to **11.67 per side**. WMU averaged 192 seconds when it began a drive up exactly seven (10 drives), 154 when up exactly ten (3) and 193 when up at least 14 (11).

Among scoring drives, those with a 10+ yard run took 17 fewer seconds on average, with a TD on 13 of 17 versus 8 of 15. Across all drives, those with an explosive rush averaged **3.96 PPP and 230 seconds**, compared with **1.43 PPP and 155 seconds** without one. The scoring lift is more consistent than clock compression.

Against the three bottom-quartile run defenses it faced, WMU produced 5.50 live yards/carry and **1.76 PPP in 166 seconds/drive**, compared with 4.79, **2.53** and **187** elsewhere in FBS. Akron allowed 6.60 live yards/carry in FBS and 7.43 against its two run-heavy opponents, Ohio and Central Michigan. Those two averaged **2.95 PPP and 150 seconds/drive**, versus **3.03 and 167** for the rest. That leaves room for quick WMU scores, with limited evidence for a separate style premium.

## Broughton and Akron's offense

Broughton started against Wake Forest and Robert Morris, exited injured in the second quarter at Minnesota and missed the next five games. The official UNLV play-by-play credits the single carry CFBD assigns to him to Jordan Gant. Team PPP was **2.90** in the two pre-injury starts (one FCS game and backup snaps), **0.58** in the mixed Minnesota game, **1.45** in the five absences and **2.00** against Ohio. [Minnesota injury recap](https://gozips.com/news/2026/9/19/football-drops-road-decision-at-minnesota) · [UNLV play-by-play](https://gozips.com/sports/football/stats/2026/unlv/boxscore/11325)

In his Ohio return, Broughton attempted **34 of 35 passes**, threw for **232 yards**, took **three sacks** and had a pick-six. Akron generated scoring opportunities on **8 of 10 drives** versus **26 of 58** during his absence. Its live rushing yield was **4.70 yards per carry vs. 4.92** during the absences. Against Ohio the offense was **0.46 PPP below** the opponent and venue reference, compared with **1.13 below** in the absence sample. That is a meaningful one-game improvement, with one TD and three FGs. The QB scramble split and Week 11 workload remain unverified. [Ohio box](https://gozips.com/sports/football/stats/2026/ohio/boxscore/11331) · [Ohio recap](https://gozips.com/news/2026/11/3/football-akron-pushes-mac-leading-ohio-before-falling-28-20-on-tuesday-night) · [MAC availability](https://getsomemaction.com/sports/2026/7/28/FB_0728265050.aspx.aspx)

## Possession estimate

| Offense | Possessions | Points/possession | Opportunities | Offensive points |
| --- | ---: | ---: | ---: | ---: |
| Western Michigan | 10.66 | 2.86 | 6.7 | 30.4 |
| Akron | 10.66 | 1.39 | 5.2 | 14.8 |

| Possessions each | 8 | 9 | 10 | 11 | 12 |
| --- | ---: | ---: | ---: | ---: | ---: |
| Expected WMU margin | 11.7 | 13.2 | 14.6 | 16.1 | 17.6 |

The estimate compares performance with what opponents allowed or produced in other FBS games, shrinks rates toward league averages, gives Akron **+0.10 PPP** and WMU **−0.10 PPP** for venue, and gives the Ohio game **25%** of Akron’s offensive adjustment. Expected net non-offensive scoring is zero. Raising Ohio’s weight to 50% moves the fair line to **WMU −14.7**. The game-resampling range for the estimated WMU margin is **10.0–20.9** (middle 80%, with Ohio and the adjustment rules fixed). Cover probabilities are uncalibrated.

At average FBS volume the same PPP gap implies **WMU by 16.5**. Measured pace trims **0.9 points** and would have to fall to about **9.9 possessions each** for Akron +14.5 to exceed the central margin at fixed efficiency. The registered model uses PPA, success and venue, so tempo has no explicit term. The drive evidence supports a small volume effect and offers little basis for a separate adjustment to the frozen line.

## Source coverage

Authenticated CFBD archives and a November 10 supplement cover all 18 focal games (400 source drives, 3,078 play rows). All final scores reconcile. The analysis uses regulation offensive possessions, keeps end-of-half drives with a live snap or offensive kick, and separates return and defensive scoring. One zero-clock Akron–Ohio field-goal drive is included in scoring and omitted from timing. A scoring opportunity requires a snap at or inside the opponent 40, a TD or a field-goal try. The FBS efficiency reference includes 534 of 562 completed FBS–FBS games after score and drive checks. The full game-by-game tables, exact retrieval receipts, calculations and data are saved locally in `artifacts/cfb/research/2026-11-10_wmu_akron_possessions/`. [CFBD API documentation](https://api.collegefootballdata.com/)
