# Top Chatters — Kick.com Viewer

O aplicație web pentru vizualizarea celor mai activi chatteri pe Kick.com

## 🚀 Deploy pe Vercel

### Opțiunea 1: Deploy rapid (recomandat)

1. Instalează Vercel CLI:
```bash
npm i -g vercel
```

2. În folderul proiectului, rulează:
```bash
vercel
```

3. Urmează pașii din terminal (first deploy → link to new project → da)

### Opțiunea 2: Deploy prin GitHub

1. Push proiectul pe GitHub
2. Mergi pe [vercel.com](https://vercel.com)
3. Click "Import Project" și selectează repo-ul tău
4. Vercel va detecta automat configurația
5. Click "Deploy"

## 📁 Structura pentru Vercel

```
├── api/
│   └── channel.js          # Serverless function pentru Kick API
├── index.html              # Frontend-ul aplicației
└── vercel.json            # Configurație Vercel
```

## 🛠️ Rulare locală

Pentru development local cu Node.js:

```bash
node server.js
```

Apoi deschide: http://localhost:3000

## 📝 Note

- **vercel.json** configurează routing-ul și build process-ul
- **api/channel.js** este o serverless function care rulează pe Vercel
- Frontend-ul (`index.html`) se servește static
- Nu mai ai nevoie de `server.js` după deployment pe Vercel

## 🔧 Troubleshooting

Dacă ai erori la deploy:
- Verifică că ai toate cele 3 fișiere: `index.html`, `api/channel.js`, `vercel.json`
- Asigură-te că folderul `api` există și conține `channel.js`
- Rulează `vercel --prod` pentru production deployment
