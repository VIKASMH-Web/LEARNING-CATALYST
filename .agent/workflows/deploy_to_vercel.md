---
description: Deploy the Learning Catalyst application to Vercel with automatic updates via GitHub.
---

# Deploy using Vercel & GitHub

This workflow sets up a Continuous Deployment (CD) pipeline where every push to GitHub automatically triggers a redeploy on Vercel.

## Prerequisites

1.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
2.  **GitHub Account**: Sign up at [github.com](https://github.com).

## Step 1: Create a GitHub Repository

1.  Go to [github.com/new](https://github.com/new).
2.  Name your repository `learning-catalyst`.
3.  Set it to **Public** or **Private** (Private recommended).
4.  Do **NOT** initialize with README, .gitignore, or license (we already have them).
5.  Click **Create repository**.

## Step 2: Push Local Code to GitHub

Run the following commands in your terminal (copy-paste the URL from your new repository):

```bash
# Add your remote repository
git remote add origin https://github.com/YOUR_USERNAME/learning-catalyst.git

# Set the main branch
git branch -M main

# Push your code
git push -u origin main
```

## Step 3: Connect to Vercel

1.  Go to the [Vercel Dashboard](https://vercel.com/dashboard).
2.  Click **"Add New..."** -> **"Project"**.
3.  Select **"Continue with GitHub"**.
4.  Find `learning-catalyst` in the list and click **"Import"**.
5.  **Configure Project**:
    - **Framework Preset**: Vite (should be auto-detected).
    - **Root Directory**: `./` (default).
    - **Build Command**: `npm run build` (default).
    - **Output Directory**: `dist` (default).
6.  Click **"Deploy"**.

## Step 4: Verify Deployment

Once deployed, Vercel will give you a live URL (e.g., `https://learning-catalyst.vercel.app`).
Visit this URL to see your app live!

## ⚠️ Important Note on Backend Features

Your project uses a **local Python backend** (`server/main.py`) running on `localhost:8000` for AI features (Video Summarizer, Code Engine).

**These features will NOT work on the Vercel deployment** because Vercel only hosts the frontend by default, and it cannot access your local computer's `localhost`.

To fix this for production, you would need to:

1.  Deploy the Python backend to a cloud service (like Render, Railway, or AWS).
2.  Update the API URL in your frontend code to point to the cloud backend instead of `localhost`.

For now, the app includes a **Simulation Mode** that will automatically activate when the backend is unreachable, allowing you to demo the UI features without the live AI backend.
