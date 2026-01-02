# SMK AI-Powered Portfolio

A complete AI-powered portfolio website for Madhan Kumar S, featuring an intelligent chatbot, voice assistant, and interactive mini game.

## Features

- 🎨 **Dark Futuristic Design** - Modern neon-themed UI with blue/purple accents
- 🤖 **AI Chatbot (SMK AI)** - Intelligent assistant powered by OpenAI GPT-4o-mini
- 🎤 **Voice Assistant** - Web Speech API integration for voice input
- 🎮 **Mini Game** - Interactive number guessing game
- 📱 **Fully Responsive** - Mobile, tablet, and desktop compatible
- ⚡ **Single-Page Application** - All sections in one HTML file
- 🔒 **Secure Backend** - API keys protected on server-side

## Tech Stack

### Frontend
- HTML5, CSS3, JavaScript (Vanilla)
- Font Awesome Icons
- Web Speech API (Voice Recognition)

### Backend
- Node.js
- Express.js
- OpenAI API (GPT-4o-mini)
- CORS enabled

## Quick Start

### 1. Frontend Setup

Simply open `index.html` in your web browser. No build process required!

**Note:** Place your profile image as `profile.jpg` in the root directory. If the image is not found, a fallback placeholder will be displayed.

### 2. Backend Setup (For AI Chatbot)

1. **Navigate to backend folder**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Copy `.env.example` to `.env`
   - Add your OpenAI API key:
     ```
     OPENAI_API_KEY=your_openai_api_key_here
     ```
   - Get your API key from: https://platform.openai.com/api-keys

4. **Start the server**
   ```bash
   npm start
   ```
   Server will run on `http://localhost:3000`

### 3. Running Both

1. Start the backend server (from `backend` folder)
2. Open `index.html` in your browser
3. Click the chat icon (bottom-right) to interact with SMK AI

## Project Structure

```
.
├── index.html              # Main single-page portfolio
├── profile.jpg             # Your profile image (add this)
├── backend/
│   ├── server.js           # Express server with OpenAI integration
│   ├── package.json        # Node.js dependencies
│   ├── .env.example        # Environment variables template
│   └── README.md           # Backend documentation
└── README.md               # This file
```

## Sections

1. **Hero** - Introduction with profile image and social links
2. **About** - Professional background and story
3. **Skills** - Technical skills with animated progress bars
4. **Projects** - Featured projects with descriptions
5. **Mini Game** - Interactive number guessing game (1-5)
6. **Footer** - Copyright and contact information

## AI Chatbot (SMK AI)

The chatbot is configured to answer questions about:
- Madhan Kumar S's skills and expertise
- Projects and experience
- Professional background
- Contact information

**System Prompt:** The AI is instructed to only respond about portfolio-related information and redirect unrelated queries.

## Voice Assistant

- Click the microphone icon in the chat interface
- Speak your question (browser will request microphone permission)
- Voice input is automatically converted to text and sent to SMK AI

**Browser Compatibility:** Works in Chrome, Edge, and other Chromium-based browsers. Safari support may vary.

## Mini Game

- Guess a number between 1 and 5
- Type your guess in the input field
- Get instant feedback with success/error messages
- Game automatically resets after each round

## Customization

### Profile Image
- Add your photo as `profile.jpg` in the root directory
- Recommended size: 400x400px or larger (square aspect ratio)
- Supported formats: JPG, PNG, WebP

### Colors
- Edit CSS variables in `<style>` section of `index.html`
- Main colors: `--neon-blue` (#00d4ff) and `--neon-purple` (#b026ff)

### Content
- All content is in `index.html`
- Edit sections directly in the HTML
- No build process required

## Browser Support

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ⚠️ Voice recognition: Chrome/Edge recommended

## Security Notes

- ✅ API keys are stored server-side only (never exposed to frontend)
- ✅ CORS is configured for security
- ✅ Input validation on backend
- ✅ Error handling with graceful fallbacks

## Development

### Backend Development
```bash
cd backend
npm run dev  # Uses nodemon for auto-reload
```

### Testing the Chatbot
1. Start backend server
2. Open browser console
3. Test API: `fetch('http://localhost:3000/chat', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify({message: 'Hello'}) }).then(r => r.json()).then(console.log)`

## Troubleshooting

### Profile Image Not Showing
- Ensure `profile.jpg` exists in the root directory
- Check file name (case-sensitive on some systems)
- Fallback placeholder will show if image not found

### Chatbot Not Responding
- Verify backend server is running
- Check browser console for errors
- Ensure OpenAI API key is set in `.env`
- Check backend server logs

### Voice Input Not Working
- Grant microphone permissions in browser
- Use Chrome or Edge for best compatibility
- Check browser console for errors

## License

MIT License - Feel free to use this project as a template for your own portfolio.

## Author

**Madhan Kumar S**
- Email: smk312111@gmail.com
- GitHub: [@Madhan06-S](https://github.com/Madhan06-S)
- LinkedIn: [madhan-kumar-1bb243385](https://www.linkedin.com/in/madhan-kumar-1bb243385)

---

Built with ❤️ using modern web technologies

