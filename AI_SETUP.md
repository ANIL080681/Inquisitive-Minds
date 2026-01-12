# AI Integration Setup

Your homework assistant now has **Google Gemini AI** integration! 🚀

## How It Works

1. **Pattern Matching First** - Fast, instant responses for common questions
2. **AI Fallback** - For complex problems, uses Gemini AI automatically

## Setup Steps

### 1. Get Your Gemini API Key

1. Go to: https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy your API key

### 2. Add API Key to .env File

Open `.env` file in the project root and replace:
```
GEMINI_API_KEY=your_api_key_here
```

With your actual key:
```
GEMINI_API_KEY=AIzaSyD...your_real_key_here
```

### 3. Restart the Server

Stop the current server (Ctrl+C) and restart:
```bash
.\run-backend-compiled.bat
```

## Testing

Try these questions that pattern matching can't handle:

**Word Problem:**
"John has 15 apples. He gives 4 to Mary and 3 to Tom. How many does he have left?"

**Essay Help:**
"Write an introduction paragraph about friendship"

**Reading Comprehension:**
"What is the main theme of a story where a character learns to be honest?"

**Advanced Math:**
"Solve: (2x + 3)(x - 5) = 0"

## How to Verify It's Working

- Simple questions (like "2+2") = Pattern matching (instant)
- Complex questions = AI (takes 1-2 seconds, shows detailed explanation)
- Check terminal logs - you'll see "Using AI fallback" for complex problems

## Cost

Gemini API has a **free tier**:
- 60 requests per minute
- Free for most student usage

For heavy usage, pricing is very low (~$0.001 per request).

## Troubleshooting

**"AI service not configured"** = API key not loaded, check .env file
**"AI service encountered an error"** = Invalid API key or network issue
**Pattern matching still used** = Question matched existing patterns (this is good, saves API calls)

## Features Now Available

✅ Word problems with multiple steps
✅ Essay writing assistance
✅ Reading comprehension
✅ Advanced math concepts
✅ Science experiments
✅ Creative writing
✅ Complex reasoning questions
✅ History & geography (general knowledge)

Enjoy your upgraded homework assistant! 🎉
