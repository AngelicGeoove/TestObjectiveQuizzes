# Setup Instructions for Global Leaderboard

## Problem
GitHub automatically revokes tokens when they're detected in commits for security reasons.

## Solution
We've moved the GitHub token to a separate config file that won't be committed to the repository.

## Steps to Set Up:

### 1. Create a New GitHub Token
1. Go to GitHub.com → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Click "Generate new token (classic)"
3. Give it a name like "Quiz Leaderboard Token"
4. Select the following scopes:
   - `repo` (Full control of private repositories) OR
   - `public_repo` (Access public repositories)
5. Click "Generate token"
6. **COPY THE TOKEN IMMEDIATELY** (you won't see it again)

### 2. Create config.js File
1. Copy the file `config-template.js` to `config.js`
2. Open `config.js` in a text editor
3. Replace `YOUR_GITHUB_TOKEN_HERE` with your actual token
4. Save the file

### 3. Deploy to GitHub Pages
The `config.js` file is in `.gitignore` so it won't be pushed to GitHub. This means:
- ✅ Global leaderboard will work locally during development
- ❌ Global leaderboard won't work on GitHub Pages (falls back to localStorage)

## Alternative: Local-Only Solution
If you don't need global leaderboard on GitHub Pages:
1. Don't create config.js
2. The app will use localStorage only
3. Each user sees only their own scores
4. Perfect for local testing or offline use

## For Classroom Use:
- Each student runs the quiz locally with their own config.js
- All submissions go to the same GitHub repository
- Everyone can see the global leaderboard when viewing locally

## Security Notes:
- Never commit config.js to the repository
- After your exams, delete the GitHub token from your account
- Consider making the repository private
