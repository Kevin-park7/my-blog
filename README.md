# Good Thinking — A Developer's Space

🌐 **Live:** [my-blog-pied-nu.vercel.app](https://my-blog-pied-nu.vercel.app)  
📝 **Purpose:** Technical blog + interactive games + learning resource for developers

---

## ✨ Features

### 📖 Blog (16 Technical Posts)
- JavaScript/TypeScript tutorials
- Next.js best practices
- React performance & patterns
- AI & developer tools
- Web security fundamentals
- Database & API design
- And 10 more in-depth articles

**Tech Stack:** Markdown-based posts, server-side rendering, full-text search

### 🎮 6 Interactive Games
1. **Tic-Tac-Toe** — AI opponent using minimax algorithm
2. **Snake** — Canvas-based rendering with keyboard/touch controls
3. **Memory** — Card matching with difficulty levels (Easy/Normal/Hard)
4. **2048** — Grid transformations with dynamic board sizes
5. **Typing** — Code snippet typing with WPM measurement
6. **Tech Quiz** — 10+ questions on JS/TS/Python with difficulty scaling

**Features:**
- Leaderboards (top 5 scores per game, localStorage)
- Difficulty selection (Easy/Normal/Hard)
- Responsive design (mobile-friendly)
- Dark mode support

### 🎓 Education Hub
- **Category Filtering:** TypeScript | Python | Next.js | AI/Tools | 기타
- **Search & Filter:** Find posts by keyword
- **Post Metadata:** Reading time, date, tags

### 🚀 Modern Tech Stack
- **Framework:** Next.js 14 (App Router, Server Components)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS + CSS variables for theming
- **Deployment:** Vercel (auto-deploy on push)
- **SEO:** Sitemap, robots.txt, Open Graph meta tags, RSS feed

---

## 🏗️ Architecture

```
app/
├── page.tsx              # Home (hero + newsletter)
├── blog/                 # Blog listing & posts
├── education/            # Category-filtered posts
├── function/             # Game dashboard
└── games/                # All 6 playable games

components/
├── Navigation.tsx        # Main navigation
├── NewsletterSignup.tsx  # Email subscription
├── ShareButtons.tsx      # Social sharing
├── RelatedPosts.tsx      # Post recommendations
└── ...

lib/
├── posts.ts              # Blog post data (16 posts)
└── ...

styles/
└── globals.css           # Tailwind + game-specific CSS
```

---

## 💡 Design Philosophy

### Paper Aesthetic
- Warm color palette: cream paper (`#f3ecdc`), warm ink (`#1f1a14`)
- Typography: Newsreader serif font
- Minimal, readable, professional

### Dark Mode
- CSS variables for theme switching
- Automatic based on system preference
- Smooth transitions

### Mobile-First
- Responsive breakpoints
- Touch-friendly game controls
- Optimized for all devices

---

## 🎯 Key Metrics

| Metric | Value |
|--------|-------|
| Blog Posts | 16 |
| Interactive Games | 6 |
| Routes | 7 (+ _not-found) |
| TypeScript Coverage | 100% |
| Build Size | ~350 KB (optimized) |
| Lighthouse Score | 90+ |

---

## 🛠️ Development

### Setup
```bash
git clone https://github.com/Kevin-park7/my-blog.git
cd my-blog
npm install
npm run dev
# Open http://localhost:3000
```

### Build & Deploy
```bash
npm run build          # Production build
npm run start          # Production server
git push origin main   # Auto-deploys to Vercel
```

### Project Structure
- **Blog Posts:** `lib/posts.ts` (add new posts here)
- **Styles:** `styles/globals.css` (game & component styles)
- **Games:** `app/games/page.tsx` (all 6 games + leaderboard logic)

---

## 🎓 Learning Outcomes

This project demonstrates:
- ✅ Advanced React patterns (hooks, server components, state management)
- ✅ Full-stack Next.js 14 application
- ✅ Game development (canvas rendering, AI algorithms, physics)
- ✅ Web performance optimization
- ✅ Responsive design & accessibility
- ✅ SEO best practices
- ✅ User engagement features (newsletter, sharing, recommendations)

---

## 📊 What's New

### Recent Updates
- 🎮 Added 2 games (Typing + Tech Quiz)
- 📈 Added leaderboards & difficulty levels
- 📝 Expanded blog to 16 posts (from 7)
- 🔍 SEO optimization (sitemap, RSS, meta tags)
- 💬 User engagement (newsletter, share buttons, related posts)

---

## 🔗 Links

- **Live Site:** https://my-blog-pied-nu.vercel.app
- **GitHub:** https://github.com/Kevin-park7/my-blog
- **RSS Feed:** https://my-blog-pied-nu.vercel.app/feed.xml
- **Email:** seoonwon8503@gmail.com

---

## 📝 License

MIT License — feel free to use this as a template for your own blog!

---

**Built by Kelvin · 2026**

*"Where Code Meets Clarity"*
