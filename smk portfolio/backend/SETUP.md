# Backend Setup Guide

## Quick Setup Steps

1. **Create `.env` file**
   ```bash
   # Copy env-example.txt to .env
   cp env-example.txt .env
   # Or on Windows:
   copy env-example.txt .env
   ```

2. **Edit `.env` file**
   - Open `.env` in a text editor
   - Replace `your_openai_api_key_here` with your actual OpenAI API key
   - Get your key from: https://platform.openai.com/api-keys

3. **Install dependencies**
   ```bash
   npm install
   ```

4. **Start the server**
   ```bash
   npm start
   ```

5. **Verify it's working**
   - Open browser to: http://localhost:3000
   - You should see: `{"status":"online",...}`

## Testing the API

```bash
# Using curl
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"message":"Tell me about Madhan Kumar S"}'

# Using PowerShell
Invoke-RestMethod -Uri http://localhost:3000/chat -Method Post -ContentType "application/json" -Body '{"message":"Tell me about the projects"}'
```

## Troubleshooting

- **Port already in use**: Change `PORT` in `.env` to a different number (e.g., 3001)
- **OpenAI API errors**: Check your API key is correct and has credits
- **Module not found**: Run `npm install` again

