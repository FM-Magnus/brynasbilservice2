# Queue for the autonomous run (edit before starting; top to bottom)

One row per page. *Notes* are suggestions the page plan may overrule; every row is bound by the clean budget.

| # | Route | Notes |
|---|---|---|
| 1 | `/dackservice` | Price cards stay clean (they carry prices and icons). K band candidate: `white-tyre` (storage card already uses a veil version: consider turning that into K on the page-colour band). Hero and closing card are already treated. |
| 2 | `/ac-service` | Price cards: keep clean or one amber solid; symptom cards clean; K band with `white-ac`. Process band and closing card already done. |
| 3 | `/felsokning` | Symptom cards clean; K band with `white-diagnosis` replacing the veil version in the closing card if a page-colour band fits. |
| 4 | `/reparationer-storre-arbeten` | Ledger clean; one K band (`white-clutch` or `white-suspension`); keep the process band and closing card. |
| 5 | `/service-reparationer` | Tier cards and band done. Check the white sections for one K band (`white-spark-plugs` is on the closing card already; pick another). |
| 6 | `/biltjanster` | Hub cards are photo thumbnails already; closing band done. Only add if the budget allows. |
| 7 | `/galleri` | Closing card only (light, `white-*` K or veil). |
| 8 | Guides: `/koppling` (`white-clutch`), `/kamrem` (`white-timing-belt`), `/drivaxel-drivknutar` (`white-driveshaft`), `/stodampare-fjadrar` (`white-suspension`) | Dark cards already have topic photos (class `service-guide--<topic>` in `ServiceGuideTemplate.css`, commit `b9fe7d3f`). What is left: one K band each in a white section (find a host in the shared template once, not per guide). `/oljebyte`, `/bromssystem`, `/bilbatteri`, `/hjullagerbyte`, `/avgassystem`, `/styrning-kulleder`, `/gat` are done except the balance findings; leave them clean otherwise. |
| 9 | `/` (Landing) | Details only: it is a reference page. Do not add photos to clean surfaces (service row, trust strip, contact card). |
| 10 | `/om-oss`, `/bargning`, `/kontakt` | Reference pages. Do not change unless a surface breaks the budget. |

Balance hot spots found by `balance.cjs` 2026-10-03 (1440): `/felsokning` y≈2530 (text 271 px beside a 559 px image), `/ac-service` y≈794 and y≈3573, `/reparationer-storre-arbeten` y≈2062, `/oljebyte` y≈3664, 4071, 4551 (also in the other guides; check the shared guide template once, not per guide). False positives: footer grid, `/bilar-till-salu` gallery thumbs.

Status column is kept in `/tmp/bgnight/log.md`, not here.
