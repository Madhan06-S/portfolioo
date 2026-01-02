# SMK Portfolio Backend

Backend API server for the AI-powered portfolio of Madhan Kumar S.

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Get your API key from: https://platform.openai.com/api-keys

3. **Start the Server**
   ```bash
   npm start
   ```
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

## API Endpoints

### GET /
Health check endpoint
- Returns server status and configuration

### POST /chat
AI chatbot endpoint
- Request body: `{ "message": "your message here" }`
- Response: `{ "reply": "AI response" }`
- Uses OpenAI GPT-4o-mini model

## Environment Variables

- `OPENAI_API_KEY` (Required) - Your OpenAI API key
- `PORT` (Optional) - Server port, defaults to 3000
- `NODE_ENV` (Optional) - Environment mode, defaults to 'development'

## Notes

- The chatbot is configured to answer only about Madhan Kumar S's professional information
- System prompt ensures responses are focused on skills, projects, and experience
- Graceful fallback if OpenAI API is unavailable

