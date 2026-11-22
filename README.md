# Nhà thờ Kim Hải · A little place of peace

A walkable, bilingual (Vietnamese / English) virtual Catholic church for Thảo and Varun, inspired by the quiet visitor journey of Sansa Temple. This is an **independent, original illustration inspired by Kim Hải parish**, not a digital replica or an official parish product.

**Live website:** https://vbhatia555.github.io/kim-hai-church/

## The journey

1. Enter through the gate and follow the stone path toward the open church doorway.
2. Visit the **altar** for today's prayer, which uses the calendar date in `Asia/Ho_Chi_Minh`. Special intentions matching that date take priority. Existing bilingual prayers and the memorial for Nguyễn Mộc Cát Tiên are retained.
3. At the **candle stand**, light an unlit candle and optionally write a name or intention. This is stored **only in the visitor's own browser**, never uploaded to the site or GitHub. Candles stay lit when they revisit from that device.
4. Visit the **rosary garden** for the Our Father, 10 Hail Marys and Glory Be. The selected bead persists on the device.
5. At the **noticeboard**, see the existing parish weekly Mass times. The entrance always displays today's regular timetable too.

### Controls

- **Phone:** Tap a destination marker or one of the fixed bottom buttons; use **Places / Địa điểm** to jump between destinations.
- **Desktop:** Click the courtyard ground to walk, use the arrow keys, or tap destinations.
- The camera follows the two illustrated companions. With **Reduce Motion** enabled, destination changes are immediate.
- The environment loads a lightweight original 3D scene using Three.js from a CDN if WebGL and the connection allow it. **The illustrated SVG fallback always remains usable**; use the ◫ button to switch manually.
- Sound is **off by default**. The music-note button enables generated birdsong and soft chimes (no audio file or autoplay).
- VI / EN selection is remembered for repeat visits.

There are no parish photographs in the repository. The building uses original stylized architecture, with a Vietnamese church silhouette, trees, a bell tower and warm afternoon light. Please add actual licensed Kim Hải reference photos to a future art revision if you want more exact fidelity.

## How to edit

| File | What it controls |
|---|---|
| `index.html` | Structure, original illustration fallback and interface buttons |
| `style.css` | Colors, typography, responsive layouts and sheet styling |
| `app.js` | Walking, camera, 3D objects, interactions, bilingual UI and daily date logic |
| **`prayer-data.js`** | **Existing traditional prayers and 31 rotating daily themes** (Vietnamese + English) |
| **`special-intentions.json`** | **Exact dates that have a special prayer**; map `"YYYY-MM-DD"` to a prayer key in `prayer-data.js` |
| **`mass-schedule.json`** | **Existing regular weekly Mass timetable**, with weekday number 0 = Sunday, times as minutes after midnight (e.g., 420 = 07:00), source and last-check date |
| **`mass-date-overrides.json`** | **Confirmed date-specific schedules** only. Example below |
| `update_mass_schedule.py` | Checked retrieval of the official parish's *published regular weekly timetable* |
| `.github/workflows/check-mass-schedule.yml` | Twice-daily schedule check and GitHub Pages publishing (07:17 and 19:17 Vietnam time) |
| `legacy.html` | Preserved previous animated church for reference |
| `tests/smoke.mjs` | Desktop/mobile browser checks |

Example confirmed exception to paste into `mass-date-overrides.json` **only after verifying with the parish**:

```json
{
  "2026-12-25": {
    "confirmed": true,
    "times": [420, 1020],
    "source": "https://example.com/verified-parish-notice"
  }
}
```

**Important:** The above Christmas times are strictly an *illustrative JSON example*, not actual or confirmed Kim Hải times. Leave the file as `{}` unless you have verified a specific day's times.

## Schedule honesty and automatic updating

- The website *does not* treat a published recurring weekly timetable as confirmation of a particular date. It explicitly says "**No confirmed schedule for this date**" and then displays regular weekly times for reference.
- On verified date override entries, the noticeboard can label a date **confirmed**.
- The source page can omit holidays, funerals, or last-minute changes. It is a weekly listing, not a guaranteed day-by-day calendar.
- If the diocesan source cannot be parsed, the schedule updater retains the previous file; the website flags a stale source check after 72 hours. Check GitHub Actions runs for failures.
- The workflow publishes `index.html`, `style.css`, `app.js`, `prayer-data.js`, `mass-schedule.json`, `mass-date-overrides.json`, and `special-intentions.json` to GitHub Pages.
- Do not change the Mass times without a verified parish source.

## Privacy and accessibility

The website needs no account or database. Language, rosary position, candle status, and optional intention text are stored locally under `kh2_*` keys in `localStorage`. Clearing browser data erases them. Other devices do not see these values. No submitted intention is saved to GitHub.

The bottom destinations and fallback work with keyboard and touch. Supported features include a reduced-motion preference, labeled dialog and buttons, a plain-text reading area, and a choice to disable sound.

## Local preview and testing

Run a basic static server in the repository directory:

```sh
python3 -m http.server 8787
```

Visit `http://localhost:8787`. The illustrator fallback works without WebGL; the 3D library requires a network connection the first time.

Browser smoke tests run automatically on GitHub Actions and cover the gate-to-altar journey, daily prayers, mobile width, candles, rosary, Mass noticeboard and an Asia/Dubai visitor receiving the correct Vietnam-day prayer. Full 3D rendering is conditional on WebGL availability.

## Parish information

Official published parish listing:
https://www.giaophanbaria.org/gioi-thieu/cac-giao-hat/giao-hat-long-huong/2012/12/05/giao-xu-kim-hai.html

This is not an official Mass broadcast or sacramental Mass. A virtual prayer does not replace attending Mass in person.
