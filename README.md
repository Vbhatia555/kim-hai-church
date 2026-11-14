# Nhà thờ Kim Hải — Varun & Thảo's virtual church

An illustrated, bilingual (Vietnamese / English) prayer website. The characters,
prayer space, candles and priest work without internet. Mass-time updates require
**GitHub Pages** and the included **GitHub Actions** scheduled workflow.

## What's automatic?

- Vietnam clock, today's recurring Mass times and countdown: update automatically while the page is open.
- Published recurring parish Mass schedule: checked at **07:17 and 19:17 Vietnam time** every day using GitHub Actions, and `mass-schedule.json` updated after every *successful* check.
- The site checks the latest JSON when opened and every 30 minutes while left open.
- The website warns if a check is overdue by more than 72 hours. The previous schedule is retained on error.
- The source is https://www.giaophanbaria.org/gioi-thieu/cac-giao-hat/giao-hat-long-huong/2012/12/05/giao-xu-kim-hai.html

**Important:** The parish page has an ordinary weekly schedule, not a reliable calendar of Mass cancellations, feast-day services, funerals, or last-minute changes. The system can detect **only changes published on this specific official page**. This is not a promise of correct special-day Mass times. Dates and last-check information describe *our check*, not when the parish last changed its listing.

The diocesan site has another, older table listing Monday and Friday 17:30 services, while the parish page does not. This website prioritizes the parish page. Contact the parish to confirm those evening services.

## How to publish on GitHub Pages

1. Create a public repository on GitHub, e.g. `kim-hai-church`.
2. Upload **all the files and folders from this ZIP**, retaining their locations:
   - `index.html`
   - `mass-schedule.json`
   - `update_mass_schedule.py`
   - `.github/workflows/check-mass-schedule.yml` (note: `.github` is hidden in macOS Finder)
3. If your browser misses the hidden `.github` folder, create the workflow manually on GitHub: click **Add file → Create new file**, type `.github/workflows/check-mass-schedule.yml` as the filename and paste the workflow file contents, then commit. Make sure `update_mass_schedule.py` and `mass-schedule.json` are uploaded too.
4. Open **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the publishing source (NOT "Deploy from a branch"). The included workflow deploys the website directly every time it runs.
5. Open the repository's **Actions** tab. Enable workflows if prompted. Select **Update Mass schedule and publish virtual church → Run workflow → Run workflow** once to test immediately. The workflow also publishes automatically when you manually change files on the `main` branch.
6. Check that `mass-schedule.json` now contains a non-null `last_checked_at` after a successful run. That same workflow publishes the new schedule to the live site, because GitHub Actions bot commits by themselves do NOT trigger regular branch-based Pages rebuilds. If the run failed, inspect its Actions job log: the diocesan website may be unavailable or block automated fetches.
7. The published site is `https://YOUR_USERNAME.github.io/kim-hai-church/` (replace `YOUR_USERNAME`).

If you edit the workflow later, the scheduled check only runs if the YAML file is present on the repository's default branch. GitHub can delay scheduled jobs, and may disable them after prolonged repository inactivity. Check the Actions tab if the site flags an old check.

## Local preview

Double-click `index.html`. The church experience works, but the web browser will show the **offline schedule notice** because automatic updates rely on hosting and the GitHub workflow. For realistic local testing, open a terminal in the extracted folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000`.

## Testing the parser

`python3 -m pip install requests beautifulsoup4`

`python3 -m unittest discover -s tests -v`

`python3 update_mass_schedule.py` — contacts the official parish page and updates the JSON only if parsing and validation succeed. The current packaged JSON contains the last verified *published* recurring schedule, but no automatic check has yet run.

## Audio

The Diocese of Bà Rịa has an official channel and livestream page, linked in the site. A stream may be unavailable or start at a different hour from Kim Hải Mass. No automatic sound starts without a user tap, because browsers restrict autoplay.

## Notes on hosting

The deployment workflow must be stored on `main`, and Pages **Source** must be **GitHub Actions**, not a branch. This directly publishes `index.html` and `mass-schedule.json` whenever you push a change or a scheduled source check succeeds. GitHub may delay or disable scheduled workflows; the site highlights overdue checks.

On a Mac, press `Command + Shift + .` in Finder to show the hidden `.github` folder, or create the workflow directly on GitHub using its full filename.