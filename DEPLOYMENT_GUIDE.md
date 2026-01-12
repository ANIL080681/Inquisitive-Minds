# 🚀 Deployment & Monetization Guide

## Quick Start (30 minutes to live)

### 1. Deploy Backend to Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Add environment variables
railway variables set GEMINI_API_KEY=AIzaSyDDJEvvBlRzCmuO8ZzDOfaMjpw7nyOIqyA
railway variables set PORT=5000

# Deploy!
railway up
```

Your backend will be live at: `https://your-app-name.railway.app`

### 2. Update Frontend API URL

In `presentation.html`, change:
```javascript
// From:
const response = await fetch('/api/solve', {...});

// To:
const response = await fetch('https://your-app-name.railway.app/api/solve', {...});
```

### 3. Host Frontend (FREE)

**Option A: Netlify**
1. Go to netlify.com
2. Drag & drop your `presentation.html` file
3. Done! Live at: `https://random-name.netlify.app`

**Option B: Vercel**
```bash
npm i -g vercel
vercel --prod
```

### 4. Buy Domain ($12/year)

1. Go to Namecheap.com
2. Search: `homeworkbuddy.com`
3. Buy domain
4. Point to Netlify/Vercel in DNS settings

---

## 💰 Add Payments with Stripe

### Setup Stripe Account

1. Go to stripe.com
2. Create account
3. Get API keys from Dashboard

### Install Stripe

```bash
npm install stripe @stripe/stripe-js
```

### Create Payment Endpoint

Add to `src/backend/controllers/paymentController.ts`:

```typescript
import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createCheckout = async (req: Request, res: Response) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'usd',
          product_data: {
            name: 'Homework Assistant Monthly',
            description: 'Unlimited homework help',
          },
          unit_amount: 1500, // $15.00
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      }],
      mode: 'subscription',
      success_url: 'https://yoursite.com/success',
      cancel_url: 'https://yoursite.com/cancel',
    });

    res.json({ url: session.url });
  } catch (error) {
    res.status(500).json({ error: 'Payment failed' });
  }
};
```

### Add Payment Button to Frontend

```html
<button onclick="subscribe()">Subscribe - $15/month</button>

<script>
async function subscribe() {
  const response = await fetch('https://your-backend.railway.app/api/create-checkout', {
    method: 'POST'
  });
  const { url } = await response.json();
  window.location.href = url; // Redirect to Stripe checkout
}
</script>
```

### Verify Payment Before Solving

```typescript
// In authController.ts
export const solveHomework = async (req: Request, res: Response) => {
  const userId = req.headers['user-id'];
  
  // Check if user has active subscription
  const hasSubscription = await checkStripeSubscription(userId);
  
  if (!hasSubscription) {
    return res.status(403).json({
      success: false,
      error: 'Please subscribe to use this feature',
      subscribeUrl: '/subscribe'
    });
  }
  
  // Continue with homework solving...
};
```

---

## 📊 Full Production Setup

### Database for Users (PostgreSQL)

**Railway has built-in PostgreSQL:**
```bash
railway add postgresql
```

**Install Prisma ORM:**
```bash
npm install prisma @prisma/client
npx prisma init
```

**Schema (`prisma/schema.prisma`):**
```prisma
model User {
  id                String   @id @default(uuid())
  email             String   @unique
  stripeCustomerId  String?
  subscriptionId    String?
  isActive          Boolean  @default(false)
  questionsAsked    Int      @default(0)
  createdAt         DateTime @default(now())
  
  history Homework[]
}

model Homework {
  id          String   @id @default(uuid())
  userId      String
  subject     String
  question    String
  solution    String
  explanation String
  usedAI      Boolean
  createdAt   DateTime @default(now())
  
  user User @relation(fields: [userId], references: [id])
}
```

### Authentication (Firebase Auth)

```bash
npm install firebase
```

```typescript
// Simple auth check
const auth = firebase.auth();

// Require login for API
app.use('/api/solve', async (req, res, next) => {
  const token = req.headers.authorization;
  const user = await auth.verifyIdToken(token);
  req.userId = user.uid;
  next();
});
```

---

## 🎯 Launch Checklist

### Before Going Live:

- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Netlify/Vercel
- [ ] Buy domain and connect
- [ ] Set up Stripe account
- [ ] Add payment endpoint
- [ ] Test full payment flow
- [ ] Add database (PostgreSQL)
- [ ] Implement user authentication
- [ ] Set usage limits (10 questions/day free)
- [ ] Add terms of service
- [ ] Add privacy policy
- [ ] Set up Google Analytics
- [ ] Create landing page with pricing
- [ ] Test on mobile devices

### Marketing Landing Page

Create `index.html` (different from presentation):
```html
<!DOCTYPE html>
<html>
<head>
  <title>HomeworkBuddy - AI Homework Helper</title>
</head>
<body>
  <h1>Get Homework Help in Seconds</h1>
  <h2>$15/month - All Subjects - Unlimited Questions</h2>
  
  <div>
    ✓ Upload homework photos
    ✓ Get step-by-step solutions
    ✓ Works for Math, English, Science
    ✓ Grade-appropriate explanations
  </div>
  
  <button onclick="location.href='/subscribe'">
    Start Free Trial - 7 Days Free
  </button>
  
  <div class="testimonials">
    <p>"Went from C to A in Math!" - Sarah, Grade 8</p>
    <p>"Saves me hours every week" - Mike, Grade 10</p>
  </div>
</body>
</html>
```

---

## 💰 Pricing Models

### Option 1: Simple Subscription
- $15/month unlimited

### Option 2: Freemium
- Free: 5 questions/day
- Premium: $15/month unlimited

### Option 3: Tiered
- Basic: $10/month - 50 questions
- Pro: $15/month - Unlimited
- Family: $25/month - 3 accounts

### Option 4: Pay-per-use
- $0.50 per question
- No subscription

**Recommendation:** Start with Freemium (5 free/day, $15 unlimited)

---

## 📈 Expected Costs

### Monthly Operating Costs:

- **Railway backend**: $5-20/month
- **Gemini API**: $0.10 per 1000 questions (~$10-100/month)
- **Domain**: $1/month ($12/year)
- **Database**: Free tier or $5/month
- **Stripe fees**: 2.9% + $0.30 per transaction

**Total**: $20-150/month depending on traffic

### Break-even:

- Need 2-3 paying users to cover costs
- Every user after that = profit

---

## 🚀 Launch Timeline

### Week 1: Deploy
- Deploy to Railway
- Buy domain
- Set up Stripe

### Week 2: Auth & Payments
- Add user accounts
- Add payment flow
- Test everything

### Week 3: Marketing
- Create landing page
- Run Facebook/Instagram ads ($100)
- Post on Reddit (r/HomeworkHelp)

### Week 4: Iterate
- Analyze data
- Fix issues
- Scale ads if converting well

---

## 📱 Next Steps for Mobile

### React Native App (iOS + Android)

```bash
npx react-native init HomeworkBuddy
```

Reuse your backend API, just build new mobile UI.

Cost to publish:
- Apple App Store: $99/year
- Google Play Store: $25 one-time

---

## 🎓 Alternative: Sell to Schools

Instead of B2C subscriptions, sell to schools:

**Pitch**: "Homework help platform for after-school programs"

**Pricing**: $500-2000 per school per year

**Advantages**:
- Bigger contracts
- Stable revenue
- Schools have budgets
- Less marketing needed

Contact school administrators directly!

---

## 🤝 Need Help?

If you get stuck:
1. Railway docs: railway.app/docs
2. Stripe docs: stripe.com/docs
3. Ask me! I can help with any step

**Ready to deploy? Let me know which part you want to do first!**
