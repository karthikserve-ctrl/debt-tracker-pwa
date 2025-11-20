
Debt Tracker — Rebuild (Dribbble Style)
Files included:
 - index.html  (single-file app)
 - manifest.json
 - service-worker.js
 - README.txt

How to use:
1. Unzip the archive to a folder.
2. Open index.html in Chrome for desktop testing. For iPhone Safari:
   - You can host the files on GitHub Pages (push to a repo root) or use a simple static server.
   - To host on GitHub Pages: push the files to the 'main' branch and enable Pages from root (docs: GitHub Pages).
3. For PWA install on iPhone: Safari's PWA support is limited; open the site in Safari, then 'Share' -> 'Add to Home Screen'.
4. Offline: the service worker caches index and manifest. Ensure HTTPS when hosting (required for SW).

Notes on features implemented in this rebuild:
 - Dribbble-inspired visual shell (cards, safe-area, iOS-like fonts)
 - Onboarding wizard (step-by-step)
 - Loan add/manage and amortization calc per-loan
 - Debt projection (baseline vs with extra payments)
 - Simple spend tracking (manual add)
 - Pre-spend forecast: warns if daily safe spend exceeded
 - Risk scoring & KPIs
 - Basic localStorage persistence (state saved as debt_app_state_v1)
 - Export/import encrypted backup is not performed in this rebuild sample. The app stores state locally; you can extend encryption to export encrypted blobs.

If you want a fully encrypted backup/export flow, stronger PBKDF2 parameters, or integration with iOS Keychain, tell me and I will add it in the next iteration.
