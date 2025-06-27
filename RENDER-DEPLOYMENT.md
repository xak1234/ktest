# Render Deployment Guide

## Overview
This guide explains how to deploy your Kieran's Catapult Bands website on Render with both static site hosting and a backend API service.

## Architecture
- **Static Site**: Your `index.html` and assets served from Render's static site hosting
- **Backend API**: Your `server.js` deployed as a separate web service on Render
- **Data Storage**: Product data stored in `productData.json` in your GitHub repository

## Step 1: Deploy Static Site

1. **Create a new Static Site on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Static Site"
   - Connect your GitHub repository: `xak1234/ktest`

2. **Configure Static Site**
   - **Name**: `kierans-catapult-bands-static`
   - **Build Command**: Leave empty (not needed for static sites)
   - **Publish Directory**: Leave empty (root directory)
   - **Environment Variables**: None needed for static site

3. **Deploy**
   - Click "Create Static Site"
   - Your site will be available at: `https://your-site-name.onrender.com`

## Step 2: Deploy Backend API Service

1. **Create a new Web Service on Render**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository: `xak1234/ktest`

2. **Configure Web Service**
   - **Name**: `kierans-catapult-bands-api`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variables**:
     - `GITHUB_PAT`: Your GitHub Personal Access Token (with `repo` permissions)

3. **Deploy**
   - Click "Create Web Service"
   - Your API will be available at: `https://your-api-name.onrender.com`

## Step 3: Update Static Site Configuration

1. **Update API URL**
   - In your `index.html`, replace the API_URL with your backend service URL:
   ```javascript
   const API_URL = 'https://your-api-name.onrender.com/api/data';
   ```

2. **Redeploy Static Site**
   - Push the updated `index.html` to your GitHub repository
   - Render will automatically redeploy your static site

## Step 4: Test the Setup

1. **Test Backend API**
   - Visit: `https://your-api-name.onrender.com/api/data`
   - Should return JSON data (empty object if no data exists)

2. **Test Static Site**
   - Visit your static site URL
   - Open browser console (F12)
   - Check for any API connection errors

## Environment Variables

### Backend Service Only
- `GITHUB_PAT`: Your GitHub Personal Access Token
  - Go to GitHub → Settings → Developer settings → Personal access tokens
  - Generate new token with `repo` permissions
  - Copy the token and paste it in Render's environment variables

## Troubleshooting

### "Backend is not accessible" error
1. Check that your backend service is running on Render
2. Verify the API URL in `index.html` is correct
3. Check Render logs for any deployment errors

### "GitHub token not configured" error
1. Verify `GITHUB_PAT` is set in your backend service environment variables
2. Check that the token has `repo` permissions
3. Ensure the token is valid and not expired

### CORS errors
- The backend service includes CORS configuration for cross-origin requests
- If you still get CORS errors, check that the API URL is correct

## File Structure
```
xak1234/ktest/
├── index.html          # Static site (deployed to static hosting)
├── package.json        # Backend dependencies
├── server.js          # Backend API (deployed to web service)
├── products/          # Product images
└── productData.json   # Will be created automatically by the API
```

## URLs After Deployment
- **Static Site**: `https://your-static-site.onrender.com`
- **API Service**: `https://your-api-service.onrender.com`
- **API Endpoint**: `https://your-api-service.onrender.com/api/data`

## Security Notes
- Never commit your `GITHUB_PAT` to version control
- The token is only stored in Render's environment variables
- The backend service runs server-side and keeps your token secure 