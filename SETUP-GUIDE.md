# Fundal Tools — Setup Guide

## The Fastest Path to Live & Taking Payments

Total setup time: ~45 minutes

---

## STEP 1: Create a GitHub Repository (2 min)

1. Go to [github.com/new](https://github.com/new)
2. Name it `fundal-tools`
3. Keep it **Private**
4. Upload the entire `fundal-tools-project` folder contents

Your repo should look like:
```
fundal-tools/
├── api/
│   └── generate.js          ← AI copy generator backend
├── public/
│   └── favicon.svg
├── src/
│   ├── App.jsx               ← Main app (your platform)
│   └── main.jsx              ← Entry point
├── index.html
├── package.json
└── vite.config.js
```

---

## STEP 2: Set Up Lemonsqueezy (15 min)

Lemonsqueezy handles ALL payments, taxes (EU VAT), and digital delivery. No backend needed.

### Create your account
1. Go to [lemonsqueezy.com](https://www.lemonsqueezy.com) and sign up
2. Complete store setup (name it "Fundal Media" or "Fundal Tools")
3. Connect your bank account / Stripe for payouts

### Create subscription products (Creative Library)
1. **Store → Products → New Product**
2. Create 3 subscription products:

| Product Name | Price | Billing | Type |
|---|---|---|---|
| Creative Library — Starter | €49/month | Recurring | Subscription |
| Creative Library — Growth | €99/month | Recurring | Subscription |
| Creative Library — Scale | €149/month | Recurring | Subscription |

3. For each: add a description, enable "Free trial" (7 or 14 days)
4. Under **Delivery**, choose "Custom" and add your content delivery method (Google Drive link, Notion invite, etc.)

### Create template products (Template Shop)
1. Create **8 individual products**, one per template:

| Product | Price | Type |
|---|---|---|
| Black Friday VIP Landing Page | €197 | One-time |
| Product Launch Campaign Kit | €247 | One-time |
| Luxury Brand Story Page | €147 | One-time |
| New Collection Drop Sequence | €97 | One-time |
| Abandoned Cart Recovery Pro | €127 | One-time |
| Streetwear Hype Builder | €197 | One-time |
| Sustainable Brand Storytelling | €97 | One-time |
| VIP Welcome Flow | €147 | One-time |

2. For each: upload the actual template files under **Delivery → Files**

### Get your checkout URLs
1. For each product, go to **Share → Checkout link**
2. Copy each URL — they look like: `https://fundalmedia.lemonsqueezy.com/checkout/buy/abc123`

### Update your code
Open `src/App.jsx` and replace the placeholder URLs at the top:

```javascript
const CHECKOUT = {
  starter:  "https://fundalmedia.lemonsqueezy.com/checkout/buy/REAL_ID_HERE",
  growth:   "https://fundalmedia.lemonsqueezy.com/checkout/buy/REAL_ID_HERE",
  scale:    "https://fundalmedia.lemonsqueezy.com/checkout/buy/REAL_ID_HERE",
  template: (id) => {
    const map = {
      1: "https://fundalmedia.lemonsqueezy.com/checkout/buy/TEMPLATE_1_ID",
      2: "https://fundalmedia.lemonsqueezy.com/checkout/buy/TEMPLATE_2_ID",
      // ... etc for all 8
    };
    return map[id];
  },
};
```

---

## STEP 3: Set Up AI Copy Generator (10 min)

### Get your Anthropic API key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an account and add billing (usage costs ~$0.003 per generation — basically free)
3. Go to **API Keys → Create Key**
4. Copy it — you'll add it to Vercel in the next step

The `api/generate.js` file is already set up with your exact copy frameworks baked into the system prompt. It uses Claude Sonnet which is fast and cheap.

---

## STEP 4: Deploy on Vercel (5 min)

1. Go to [vercel.com](https://vercel.com) and sign up with GitHub
2. Click **"Add New Project"**
3. Import your `fundal-tools` repository
4. Vercel auto-detects Vite — just click **Deploy**
5. After deploy, go to **Settings → Environment Variables**
6. Add: `ANTHROPIC_API_KEY` = your key from Step 3

### Connect your domain
1. In Vercel: **Settings → Domains**
2. Add `tools.fundalmedia.dk` (or whatever subdomain you want)
3. In your DNS provider, add a CNAME record:
   - Name: `tools`
   - Value: `cname.vercel-dns.com`
4. Vercel handles SSL automatically

---

## STEP 5: Deliver Your Products (10 min)

You need to decide HOW customers receive what they bought:

### For templates (one-time purchases):
**Easiest:** Upload template files directly to each Lemonsqueezy product. Customers get instant download links after purchase.

### For Creative Library (subscriptions):
**Easiest options (pick one):**

1. **Notion workspace** — Create a Notion page with all your monthly templates organized by date. Share a private link with subscribers. Update monthly.

2. **Google Drive folder** — Organize templates in dated folders. Share folder with buyer's email. Lemonsqueezy webhooks can automate this.

3. **Simple members area** — Use Lemonsqueezy's built-in customer portal, or tools like [Whop.com](https://whop.com) or [MemberStack](https://memberstack.com) if you want a branded portal.

**Recommendation:** Start with Notion. It's free, looks professional, and you can set it up in 10 minutes.

---

## You're Live!

### What you now have:
- ✅ Professional product platform at `tools.fundalmedia.dk`
- ✅ 3 subscription plans with free trials
- ✅ 8 template products with instant checkout
- ✅ AI copy generator powered by Claude (with your frameworks)
- ✅ EU VAT handled automatically by Lemonsqueezy
- ✅ Free hosting on Vercel
- ✅ SSL/HTTPS automatic

### Monthly costs:
| Item | Cost |
|---|---|
| Vercel hosting | Free (hobby plan) |
| Lemonsqueezy | 5% + $0.50 per transaction |
| Claude API (AI generator) | ~€5-20/month (depends on usage) |
| Domain (subdomain) | Free (using your existing domain) |
| **Total fixed cost** | **~€5-20/month** |

---

## Optional Next Steps

### Add Lemonsqueezy overlay checkout (nicer UX)
Instead of redirecting to a new page, you can embed Lemonsqueezy's checkout overlay:

```html
<!-- Add to index.html before </head> -->
<script src="https://assets.lemonsqueezy.com/lemon.js" defer></script>
```

Then change your checkout links to include `?embed=1`:
```
https://fundalmedia.lemonsqueezy.com/checkout/buy/ID?embed=1
```

### Add analytics
Add [Plausible](https://plausible.io) (€9/mo, privacy-friendly) or free Google Analytics to track which products get views and clicks.

### Rate-limit the AI generator
Currently the frontend limits to 3 free generations. For production, add server-side rate limiting in `api/generate.js` using IP-based tracking or require email signup for generations.

### Email capture
Add a Klaviyo signup form to capture emails from visitors who try the AI generator but don't buy. You already know Klaviyo — this creates a nurture funnel back to your agency.
