
Debt Tracker — Final MNC UI Merge v1
===================================

This package includes a merged, production-ready version with:
 - MNC-grade UI (Dark + Light)
 - Bottom navigation bar (Dashboard / Insights / Debt / History)
 - Upload (CSV/XLSX) or Manual input flow
 - CSV template: expense_template.csv
 - CSV parser + editable validation (features/upload_manual.js)
 - AES-GCM encryption helpers (features/encryption_wrapper.js)
 - Risk engine (features/risk_engine.js)
 - Forecast engine (features/forecast.js)
 - Debt simulation engine (features/debt_engine.js)
 - Optional XLSX support via SheetJS (CDN included in index.html)
 - index.html modified (backup created index.html.bak)

How to test locally:
 1. Unzip the project, open index.html in a modern browser (Chrome/Edge/Safari).
 2. The app will show an import modal on first load. Download template, fill, and upload CSV.
 3. Edit invalid rows inline, click Import. Dashboard updates.
 4. To enable encryption: when prompted, choose to set a passphrase; your local data will be encrypted.
 5. To allow XLSX uploads, include SheetJS locally if offline (see SHEETJS_README.txt).

How to deploy to GitHub Pages:
 - Ensure repository root contains index.html and necessary assets.
 - Commit and push to 'main' branch.
 - In GitHub repository -> Settings -> Pages -> Deploy from branch 'main' folder '/ (root)'.
 - Wait a few minutes; the site will be available at your-pages.github.io/repo-name

Files changed:
 - index.html (injected MNC UI and feature hooks; backup index.html.bak created)
 - features/upload_manual.js
 - features/encryption_wrapper.js
 - features/risk_engine.js
 - features/forecast.js
 - features/debt_engine.js
 - expense_template.csv
 - SHEETJS_README.txt
 - MERGE_CHANGELOG.txt -> updated
 - FINAL_README.txt (this file)

Notes:
 - This merge preserves existing app code and augments it. You may need to adapt renderDashboard() call if your original app uses different state variables.
 - The included engines are simple and designed to be transparent and auditable.
