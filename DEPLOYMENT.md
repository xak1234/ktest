# Deployment Guide for Kieran's Catapult Bands Backend

## Overview
This guide will help you deploy the backend service that manages product data on GitHub.

## Files Required
- `package.json` - Defines dependencies and start script
- `server.js` - The Express server that handles API requests
- `index.html` - Your main website (already updated to use the backend)

## Deployment Steps

### 1. GitHub Personal Access Token
1. Go to GitHub Settings → Developer settings → Personal access tokens
2. Generate a new token with `repo` permissions
3. Copy the token (you'll need it for step 3)

### 2. Deploy to Render (or similar platform)

#### Option A: Render.com
1. Create a new Web Service
2. Connect your GitHub repository
3. Set the following:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Environment Variable**: 
     - Name: `GITHUB_PAT`
     - Value: Your GitHub Personal Access Token

#### Option B: Other Platforms
Make sure your hosting platform:
- Runs `npm install` to install dependencies
- Runs `npm start` to start the server
- Has the `GITHUB_PAT` environment variable set

### 3. Configure Proxy (Important!)
Your hosting platform needs to proxy API requests to the backend service.

#### For Render:
- The proxy should be automatic if you're using the same domain
- API calls to `/api/data` will be routed to your Node.js service

#### For other platforms:
- Configure your web server to proxy `/api/*` requests to your Node.js service
- Example nginx config:
```nginx
location /api/ {
    proxy_pass http://localhost:3000;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
}
```

### 4. Test the Deployment
1. Open your website
2. Open browser developer tools (F12)
3. Check the Console tab for any error messages
4. Try using the management system to add/edit products

## Troubleshooting

### "Backend is not accessible" error
- Check that your Node.js service is running
- Verify the `GITHUB_PAT` environment variable is set
- Check your hosting platform's logs for errors

### "GitHub token not configured" error
- Verify the `GITHUB_PAT` environment variable is set correctly
- Make sure the token has `repo` permissions

### "Error saving data" error
- Check the browser console for detailed error messages
- Verify your GitHub repository exists and is accessible
- Check that the token has write permissions to the repository

## File Structure
```
your-repo/
├── index.html          # Main website
├── package.json        # Node.js dependencies
├── server.js          # Backend API server
├── products/          # Product images
└── productData.json   # Will be created automatically
```

## Security Notes
- Never commit your `GITHUB_PAT` to version control
- Always use environment variables for sensitive tokens
- The backend service runs server-side and keeps your token secure 