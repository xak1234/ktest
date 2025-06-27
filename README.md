# Kieran's Catapult Bands

A premium slingshot gear website with product management capabilities.

## Local Development

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your GitHub Personal Access Token:
   - Go to GitHub Settings → Developer settings → Personal access tokens
   - Generate a new token with `repo` permissions
   - Create a `.env` file in the root directory:
     ```
     GITHUB_PAT=your_github_token_here
     ```

3. Start the backend server:
   ```bash
   npm start
   ```

4. Serve the frontend:
   - Use any local server (e.g., Live Server in VS Code)
   - Or run: `python -m http.server 8080` (if you have Python)

5. Open your browser to `http://localhost:8080`

### Testing
- Use `test-backend.html` to test the backend API
- Check browser console for detailed error messages

## Troubleshooting

### "JSON.parse: unexpected character" error
This usually means the backend isn't running. Check:
1. Is the Node.js server running? (`npm start`)
2. Is the server accessible at the expected URL?
3. Are there any error messages in the server console?

### "Backend is not accessible" error
1. Make sure the backend server is running
2. Check that the `GITHUB_PAT` environment variable is set
3. Verify the API URL is correct

### "GitHub token not configured" error
1. Check that the `GITHUB_PAT` environment variable is set
2. Verify the token has `repo` permissions
3. Make sure the token is valid and not expired

## Production Deployment

See `DEPLOYMENT.md` for detailed deployment instructions.

## Features

- Product gallery with images from GitHub
- Product management system (prices, descriptions, photos)
- PayPal and Stripe payment integration
- Responsive design
- GitHub-based data storage