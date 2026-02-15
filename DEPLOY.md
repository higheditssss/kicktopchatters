# 🚀 Ghid de Deployment pe Vercel - Top Chatters

## 📋 Fișiere necesare

Asigură-te că ai toate acestea în folderul proiectului:
```
├── api/
│   └── channel.js          ← Serverless function
├── index.html              ← Frontend
├── vercel.json            ← Configurație routing
└── package.json           ← Metadata proiect
```

## ⚡ Deployment rapid (CLI)

1. **Instalează Vercel CLI:**
```bash
npm i -g vercel
```

2. **Deploy:**
```bash
cd folderul-proiectului
vercel
```

3. **Urmează pașii:**
   - Set up and deploy? → **Y**
   - Which scope? → Alege contul tău
   - Link to existing project? → **N**
   - What's your project's name? → **kick-top-chatters** (sau alt nume)
   - In which directory is your code? → **./** (enter)
   - Want to modify settings? → **N**

4. **Vizitează URL-ul afișat!** 🎉

## 🌐 Deployment prin GitHub

1. Push pe GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/username/repo-name.git
git push -u origin main
```

2. Pe [vercel.com](https://vercel.com):
   - Click **"Add New Project"**
   - Click **"Import"** lângă repo-ul tău
   - Click **"Deploy"**
   - Gata! ✅

## 🔧 Verificări dacă nu merge

### Eroare: "Unexpected token... is not valid JSON"

**Cauză:** Vercel nu găsește serverless function-ul și returnează HTML.

**Soluții:**

1. **Verifică structura de foldere:**
```bash
ls -la api/
# Trebuie să vezi: channel.js
```

2. **Verifică că api/channel.js folosește CommonJS:**
```javascript
module.exports = async (req, res) => {
  // ...
};
```
Nu `export default`!

3. **Redeploy:**
```bash
vercel --prod
```

### Eroare: Function exceeded timeout

**Cauză:** Kick API e lent sau blocat.

**Soluție:** Vercel are timeout de 10s (plan free). API-ul ar trebui să răspundă rapid, dar dacă Kick e down nu poți face nimic.

### CORS Errors

**Cauză:** Probabil rulezi pe `http://` în loc de `https://`.

**Soluție:** Vercel oferă întotdeauna HTTPS. Folosește URL-ul `.vercel.app`.

## 🧪 Testare locală înainte de deploy

```bash
# Instalează Vercel CLI
npm i -g vercel

# Rulează local (simulează Vercel environment)
vercel dev
```

Apoi deschide: http://localhost:3000

## 📝 Note importante

- ✅ Fișierul trebuie să fie `api/channel.js` (nu `api/channel/index.js`)
- ✅ Folosește CommonJS (`module.exports`), nu ES modules
- ✅ Nu trebuie `node_modules/` - Vercel instalează automat
- ✅ `vercel.json` e opțional dar recomandat pentru routing
- ✅ Frontend-ul folosește `/api/channel` (path relativ)

## 🆘 Erori comune

| Eroare | Cauză | Fix |
|--------|-------|-----|
| JSON parse error | API nu e găsit | Verifică `api/channel.js` există |
| 404 Not Found | Routing greșit | Verifică `vercel.json` |
| CORS error | Lipsesc headere | Verifică `res.setHeader` în API |
| Timeout | Kick API lent | Normal, încearcă din nou |

## 📞 Suport

Dacă tot nu merge:
1. Verifică logs: `vercel logs <deployment-url>`
2. Rulează local: `vercel dev`
3. Check Vercel dashboard pentru erori

---

**Succes! 🎮** Odată deploiat, aplicația va fi disponibilă la: `https://nume-proiect.vercel.app`
