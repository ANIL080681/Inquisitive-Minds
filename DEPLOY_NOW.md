# Homework Assistant - Simple Deploy

## Option 1: Upload to Render.com (EASIEST)

1. Go to https://render.com
2. Sign up (free)
3. Click "New +" → "Web Service"
4. Upload your project folder (zip it first)
5. Set these:
   - **Build Command**: `npm run build`
   - **Start Command**: `node dist/backend/index.js`
   - **Environment Variable**: `GEMINI_API_KEY` = `AIzaSyDDJEvvBlRzCmuO8ZzDOfaMjpw7nyOIqyA`
6. Click "Create Web Service"
7. Done! Live in 5 minutes at: `https://your-app.onrender.com`

## Option 2: Use Netlify Drop (SUPER EASY)

For frontend only:

1. Go to https://app.netlify.com/drop
2. Drag & drop your `presentation.html` file
3. Done! Live instantly

Then use your local server for API or deploy backend separately.

## Option 3: I can do it for you

Share your screen and I'll walk you through clicking the buttons!

## Current Status

✅ App works locally
✅ Backend ready (`dist/backend/index.js`)
✅ Frontend ready (`presentation.html`)
✅ API key configured
⏳ Needs: Upload to hosting

## Next Step

Pick one of the 3 options above and I'll help you through it!
