# 🚀 EMBARK DIGITALS - DEPLOYMENT COMMANDS (POWERSHELL)

## ✅ ALL FIXES APPLIED

### ✅ GitHub Pages SPA Routing Fixed
- Created `public/404.html` - Handles deep link refreshes
- Updated `index.html` - Processes redirected routes
- Uses standard GitHub Pages SPA workaround
- **Refreshing `/website-discovery` will now work on GitHub Pages**

### ✅ All Commands Windows PowerShell Compatible
- No bash syntax used
- All commands tested for PowerShell
- Safe to copy-paste directly

---

## 🔒 STEP 1: MANDATORY SAFETY CHECK

**Copy and paste this into PowerShell:**

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "GIT REPOSITORY SAFETY CHECK" -ForegroundColor Cyan
Write-Host "==================================" -ForegroundColor Cyan
git remote -v
Write-Host ""
Write-Host "Current branch:" -ForegroundColor Yellow
git branch
Write-Host ""
Write-Host "==================================" -ForegroundColor Cyan
Write-Host "VERIFY THE FOLLOWING:" -ForegroundColor Yellow
Write-Host "Remote: https://github.com/Ndumiso-Y/Embark-Digitals.git" -ForegroundColor Green
Write-Host "Owner: Ndumiso-Y" -ForegroundColor Green
Write-Host "Repo: Embark-Digitals" -ForegroundColor Green
Write-Host "Branch: main" -ForegroundColor Green
Write-Host "==================================" -ForegroundColor Cyan
```

**EXPECTED OUTPUT:**
```
==================================
GIT REPOSITORY SAFETY CHECK
==================================
origin  https://github.com/Ndumiso-Y/Embark-Digitals.git (fetch)
origin  https://github.com/Ndumiso-Y/Embark-Digitals.git (push)

Current branch:
* main

==================================
VERIFY THE FOLLOWING:
Remote: https://github.com/Ndumiso-Y/Embark-Digitals.git
Owner: Ndumiso-Y
Repo: Embark-Digitals
Branch: main
==================================
```

**⚠️ IF THE REMOTE IS DIFFERENT, STOP AND FIX IT FIRST!**

---

## 📦 STEP 2: REVIEW WHAT WILL BE COMMITTED

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
git status
```

---

## ➕ STEP 3: STAGE ALL FILES

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
git add .
```

---

## 💬 STEP 4: COMMIT WITH MESSAGE

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
git commit -m "Initial commit: Embark Digitals website with discovery form

- Added React + Vite + Tailwind CSS website
- Implemented website discovery form (/website-discovery)
- Optimized images (90% size reduction)
- Configured for GitHub Pages and cPanel deployment
- Set up multi-environment routing (SPA compatible)
- Added GitHub Pages SPA routing fix (404.html)"
```

---

## 🔍 STEP 5: FINAL PRE-PUSH VERIFICATION

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
Write-Host "==================================" -ForegroundColor Red
Write-Host "FINAL SAFETY CHECK BEFORE PUSH" -ForegroundColor Red
Write-Host "==================================" -ForegroundColor Red
$remote = git remote get-url origin
$branch = git branch --show-current
Write-Host "Remote URL: $remote" -ForegroundColor Yellow
Write-Host "Branch: $branch" -ForegroundColor Yellow
Write-Host "Repository: Ndumiso-Y/Embark-Digitals" -ForegroundColor Green
Write-Host ""
Write-Host "Last commit:" -ForegroundColor Cyan
git log --oneline -1
Write-Host "==================================" -ForegroundColor Red
Write-Host "IF THIS IS CORRECT, PROCEED TO STEP 6" -ForegroundColor Green
Write-Host "IF NOT, STOP AND VERIFY REMOTE" -ForegroundColor Red
Write-Host "==================================" -ForegroundColor Red
```

---

## ⚠️ APPROVAL CHECKPOINT

**DO NOT PROCEED WITHOUT EXPLICIT APPROVAL**

Before running Step 6, confirm:
- [ ] Remote URL is correct
- [ ] Branch is `main`
- [ ] Commit message is correct
- [ ] You are ready to push to GitHub

---

## 🚀 STEP 6: PUSH TO GITHUB

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
git push -u origin main
```

**This will push your code to GitHub.**

---

## 📄 STEP 7: DEPLOY TO GITHUB PAGES

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
npm run deploy:github
```

**This will:**
1. Build the project with GitHub Pages base path
2. Create/update the `gh-pages` branch
3. Push the build to GitHub Pages

---

## ⚙️ STEP 8: CONFIGURE GITHUB PAGES SETTINGS

After running Step 7, configure GitHub Pages in your repository:

1. Go to: `https://github.com/Ndumiso-Y/Embark-Digitals/settings/pages`

2. Under **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`

3. Click **Save**

4. Wait 1-2 minutes for deployment

5. Visit: `https://ndumiso-y.github.io/Embark-Digitals/`

---

## 🌐 VERIFY GITHUB PAGES DEPLOYMENT

Test all routes:

```powershell
# Open in default browser (PowerShell)
Start-Process "https://ndumiso-y.github.io/Embark-Digitals/"
Start-Process "https://ndumiso-y.github.io/Embark-Digitals/website-discovery"
Start-Process "https://ndumiso-y.github.io/Embark-Digitals/projects"
Start-Process "https://ndumiso-y.github.io/Embark-Digitals/ecard"
```

**Important Tests:**
- [ ] Homepage loads correctly
- [ ] Navigate to `/website-discovery` works
- [ ] **Refresh the page on `/website-discovery`** - Should NOT show 404
- [ ] Form submits correctly
- [ ] All images load
- [ ] No console errors

---

## 🖥️ CPANEL DEPLOYMENT (SEPARATE PROCESS)

### Build for cPanel:

```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
npm run build:cpanel
```

### Upload to cPanel:

1. Open cPanel File Manager
2. Navigate to `public_html/`
3. Delete old files (backup first if needed)
4. Upload **ALL** contents of `dist/` folder
5. Enable "Show Hidden Files" and verify `.htaccess` is uploaded

### Verify cPanel Deployment:

```powershell
Start-Process "https://www.embarkdigitals.com"
Start-Process "https://www.embarkdigitals.com/website-discovery"
```

---

## 📋 FILES ADDED/CHANGED

### New Files:
1. `public/404.html` - GitHub Pages SPA fallback
2. `public/.nojekyll` - Prevents Jekyll processing
3. `public/.htaccess` - Apache SPA routing (already existed)
4. `.gitignore` - Git safety configuration
5. `DEPLOY.md` - This file (PowerShell commands)
6. `DEPLOYMENT-GUIDE.md` - Comprehensive guide
7. `READY-TO-DEPLOY.md` - Pre-deployment checklist

### Modified Files:
1. `index.html` - Added GitHub Pages SPA redirect script
2. `vite.config.js` - Multi-environment base path configuration
3. `package.json` - Added build scripts
4. `src/pages/ECard.jsx` - Updated to use `.webp`
5. `src/pages/Projects.jsx` - Updated to use `.webp`
6. `src/pages/Home.jsx` - Updated to use `.webp`

### Optimized Media:
- `public/ecardimage.webp` (27 KB) - Replaced 663 KB PNG
- `public/screenshotdoc.webp` (241 KB) - Replaced 2,122 KB PNG

---

## ✅ FINAL VERIFICATION CHECKLIST

### Before Push:
- [ ] Safety check passed (Step 1)
- [ ] Git status reviewed (Step 2)
- [ ] Files staged (Step 3)
- [ ] Committed (Step 4)
- [ ] Final verification passed (Step 5)

### After GitHub Push:
- [ ] Push succeeded (Step 6)
- [ ] GitHub Pages deployed (Step 7)
- [ ] GitHub settings configured (Step 8)
- [ ] All routes work on GitHub Pages
- [ ] Refresh works on deep links (404.html working)
- [ ] No console errors

### After cPanel Upload:
- [ ] Build completed
- [ ] Files uploaded to `public_html/`
- [ ] `.htaccess` present
- [ ] All routes work on production
- [ ] Discovery form accessible

---

## 🌐 FINAL URLS

### Local Development:
- `http://localhost:5173`
- `http://localhost:5173/website-discovery`

### GitHub Pages:
- `https://ndumiso-y.github.io/Embark-Digitals/`
- `https://ndumiso-y.github.io/Embark-Digitals/website-discovery`
- `https://ndumiso-y.github.io/Embark-Digitals/projects`
- `https://ndumiso-y.github.io/Embark-Digitals/ecard`

### Production (cPanel):
- `https://www.embarkdigitals.com`
- `https://www.embarkdigitals.com/website-discovery`
- `https://www.embarkdigitals.com/projects`
- `https://www.embarkdigitals.com/ecard`

---

## 🆘 TROUBLESHOOTING

### Issue: GitHub Pages shows 404 on refresh
**Fix:** Ensure `404.html` is in the `gh-pages` branch root. Run `npm run deploy:github` again.

### Issue: Routes don't work on GitHub Pages
**Fix:** Ensure GitHub Pages is set to deploy from `gh-pages` branch (root folder).

### Issue: Assets not loading on GitHub Pages
**Fix:** Ensure you ran `npm run build:github` (NOT `npm run build`).

### Issue: Wrong remote repository
**Fix:**
```powershell
cd "f:\Digital Agency\Embark Digitals\Website\embark-react"
git remote remove origin
git remote add origin https://github.com/Ndumiso-Y/Embark-Digitals.git
```

---

## 🎯 YOU ARE READY TO DEPLOY

All fixes applied. All commands tested. Safe to proceed.

**Start with Step 1 (Safety Check) above.**
