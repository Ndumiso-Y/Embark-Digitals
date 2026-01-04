# Embark Digitals - Deployment Guide

## 🔒 SAFETY VERIFICATION (MANDATORY BEFORE PUSHING)

### Repository Safety Check

```bash
# 1. Verify Git remote
git remote -v

# Expected output:
# origin  https://github.com/Ndumiso-Y/Embark-Digitals.git (fetch)
# origin  https://github.com/Ndumiso-Y/Embark-Digitals.git (push)

# 2. Verify current branch
git branch

# Expected: * main

# 3. Check repository status
git status
```

### Final Sanity Check (Run RIGHT BEFORE git push)

```bash
# Display remote, owner, and branch
echo "=== FINAL SAFETY CHECK ===" && \
echo "Remote URL: $(git remote get-url origin)" && \
echo "Repository: Ndumiso-Y/Embark-Digitals" && \
echo "Branch: $(git branch --show-current)" && \
echo "==========================" && \
read -p "Press Enter to confirm this is correct..."
```

## 📦 File Size Optimization Summary

### Original Files:
- `ecardimage.png` - **663 KB** ❌
- `screenshotdoc.png` - **2,122 KB** ❌

### Optimized Files:
- `ecardimage.webp` - **27 KB** ✅ (96% reduction)
- `screenshotdoc.webp` - **241 KB** ✅ (89% reduction)

**Total savings: 2.5 MB → 268 KB**

## 🚀 Deployment Instructions

### 1. Local Development

```bash
npm run dev
```

**URL:** http://localhost:5173

### 2. GitHub Pages Deployment

#### Initial Setup (First Time Only)

```bash
# Commit all changes
git add .
git commit -m "Initial commit: Embark Digitals website with discovery form"

# Push to GitHub
git push -u origin main

# Deploy to GitHub Pages
npm run deploy:github
```

#### Subsequent Deployments

```bash
# Make your changes, then:
git add .
git commit -m "Your commit message"
git push origin main
npm run deploy:github
```

**Live URL:** https://ndumiso-y.github.io/Embark-Digitals/

**Discovery Form URL:** https://ndumiso-y.github.io/Embark-Digitals/website-discovery

### 3. cPanel (Production) Deployment

#### Build for cPanel

```bash
npm run build:cpanel
```

#### Upload to cPanel

1. Build the project (command above)
2. Connect to cPanel File Manager or FTP
3. Navigate to `public_html/`
4. Upload **ALL** contents of the `dist/` folder
5. Ensure `.htaccess` file is uploaded (shows as hidden file)

**Important Files to Verify:**
- `index.html`
- `.htaccess` (enables SPA routing)
- `assets/` folder
- All `.webp` images
- `favicon.png`, `logo.png`
- `embark-ecard.vcf`
- `sitemap.xml`, `robots.txt`

**Live URL:** https://www.embarkdigitals.com

**Discovery Form URL:** https://www.embarkdigitals.com/website-discovery

## 🌐 Environment Configuration

### Build Commands

| Environment | Command | Base Path | Output |
|------------|---------|-----------|--------|
| Local Dev | `npm run dev` | `/` | Dev server |
| cPanel | `npm run build:cpanel` | `/` | `dist/` |
| GitHub Pages | `npm run build:github` | `/Embark-Digitals/` | `dist/` |

### How It Works

The `vite.config.js` automatically sets the correct base path:

```javascript
base: mode === 'github-pages' ? '/Embark-Digitals/' : '/'
```

This ensures:
- **Local** and **cPanel**: Assets load from root (`/`)
- **GitHub Pages**: Assets load from subfolder (`/Embark-Digitals/`)

## 🛣️ Routes Available

All routes work in all environments:

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/projects` | Projects page |
| `/ecard` | Digital business card (standalone) |
| `/website-discovery` | Client discovery form (standalone) |

**Standalone routes** = No navbar/footer (direct access only)

## 🔧 SPA Routing Configuration

### GitHub Pages
- `_redirects` file handles client-side routing
- `.nojekyll` prevents Jekyll processing

### cPanel (Apache)
- `.htaccess` handles SPA routing via rewrites
- Redirects all non-file requests to `index.html`

### Local Development
- Vite dev server handles routing automatically

## ✅ Deployment Checklist

Before deploying to production:

- [ ] All images optimized (< 300 KB each)
- [ ] Local dev server works (`npm run dev`)
- [ ] Production build succeeds (`npm run build:cpanel`)
- [ ] GitHub Pages build succeeds (`npm run build:github`)
- [ ] `.gitignore` excludes `node_modules/` and `dist/`
- [ ] Git remote verified: `Ndumiso-Y/Embark-Digitals`
- [ ] All routes tested locally
- [ ] Form submission tested (contact@embarkdigitals.com)

## 📋 Git Commands Reference

### Check Status
```bash
git status
git log --oneline -5
```

### Stage and Commit
```bash
git add .
git commit -m "Descriptive message"
```

### Push to GitHub
```bash
git push origin main
```

### Deploy to GitHub Pages
```bash
npm run deploy:github
```

## 🆘 Troubleshooting

### Blank Screen on GitHub Pages
- Ensure you ran `npm run build:github` (not `npm run build`)
- Check browser console for 404 errors
- Verify assets are loading from `/Embark-Digitals/` base path

### Routes Not Working
- **GitHub Pages**: Check `_redirects` file exists in `public/`
- **cPanel**: Check `.htaccess` file uploaded and has correct permissions
- Clear browser cache and hard refresh (Ctrl+Shift+R)

### Large File Push Errors
- All large images have been optimized to WebP
- Original PNGs excluded via `.gitignore`
- If you get errors, check file sizes: `ls -lh public/`

## 📞 Support

For deployment issues or questions, contact the development team or refer to:
- Vite Documentation: https://vitejs.dev
- React Router: https://reactrouter.com
- GitHub Pages: https://pages.github.com
