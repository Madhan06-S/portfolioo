/**
 * SMK Portfolio Backend Server
 * AI-powered chatbot API using OpenAI
 * 
 * @author Madhan Kumar S
 * @version 1.0.0
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const OpenAI = require('openai');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize OpenAI client
let openai = null;
try {
    if (process.env.OPENAI_API_KEY) {
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY
        });
        console.log('✅ OpenAI client initialized successfully');
    } else {
        console.warn('⚠️  OPENAI_API_KEY not found in environment variables');
    }
} catch (error) {
    console.error('❌ Error initializing OpenAI:', error.message);
}

/**
 * System prompt for SMK AI assistant
 * Ensures the AI responds only about Madhan Kumar S's professional information
 */
const SYSTEM_PROMPT = `You are SMK AI, the professional AI assistant for Madhan Kumar S.
Answer only about his AI skills, projects, goals, and experience.
Be concise, confident, and professional.

Key Information:
- Name: Madhan Kumar S
- Role: AI & Data Science Student | Computer Vision Enthusiast
- Skills: Python, MySQL, DBMS, Team Coordination & Leadership
- Projects:
  1. Vehicle Speed and Traffic Analysis Using YOLO (Computer Vision)
  2. SIGN SPEAK: Bridging Sign Language to Text and Speech (AI/ML)
  3. Third Eye (Pseudo Eye) – Arduino Project (Hardware/Assistive Tech)
- Certifications:
  1. SQL and Relational Databases – Cognitive Class
  2. Python for Data Science, AI & Development – IBM
- Email: smk312111@gmail.com
- GitHub: https://github.com/Madhan06-S
- LinkedIn: https://www.linkedin.com/in/madhan-kumar-1bb243385

If asked about topics not related to Madhan Kumar S, politely redirect the conversation back to his portfolio and expertise.`;

/**
 * Health check endpoint
 * GET /
 */
app.get('/', (req, res) => {
    res.json({
        status: 'online',
        service: 'SMK Portfolio API',
        version: '1.0.0',
        openai: openai ? 'configured' : 'not configured',
        timestamp: new Date().toISOString()
    });
});

/**
 * Chat endpoint
 * POST /chat
 * Handles AI chatbot conversations
 */
app.post('/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Validate input
        if (!message || typeof message !== 'string' || message.trim().length === 0) {
            return res.status(400).json({
                error: 'Invalid message. Please provide a non-empty string.'
            });
        }

        // Check if OpenAI is configured
        if (!openai) {
            return res.status(503).json({
                error: 'AI service is currently unavailable. Please check server configuration.',
                reply: "I'm currently offline, but I'm SMK AI, the AI assistant for Madhan Kumar S. I can tell you about his AI skills, projects in computer vision, Python expertise, and experience with YOLO, sign language recognition, and assistive technologies. How can I help?"
            });
        }

        // Call OpenAI API
        const completion = await openai.chat.completions.create({
            model: 'gpt-4o-mini',
            messages: [
                {
                    role: 'system',
                    content: SYSTEM_PROMPT
                },
                {
                    role: 'user',
                    content: message.trim()
                }
            ],
            temperature: 0.7,
            max_tokens: 300
        });

        // Extract response
        const reply = completion.choices[0]?.message?.content || 
            "I apologize, but I couldn't generate a response. Please try again.";

        // Return response
        res.json({
            reply: reply.trim()
        });

    } catch (error) {
        console.error('Error in /chat endpoint:', error);

        // Handle OpenAI API errors
        if (error.response) {
            const statusCode = error.response.status || 500;
            const errorMessage = error.response.data?.error?.message || 'OpenAI API error';

            return res.status(statusCode).json({
                error: errorMessage,
                reply: "I'm experiencing technical difficulties. Please try again later or contact Madhan Kumar S directly at smk312111@gmail.com"
            });
        }

        // Handle other errors
        res.status(500).json({
            error: 'Internal server error',
            reply: "I'm currently experiencing issues. Please try again later or contact Madhan Kumar S directly at smk312111@gmail.com"
        });
    }
});

/**
 * Error handling middleware
 */
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({
        error: 'Internal server error',
        message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
    });
});

/**
 * 404 handler
 */
app.use((req, res) => {
    res.status(404).json({
        error: 'Not found',
        message: 'The requested endpoint does not exist'
    });
});

/**
 * Start server
 */
app.listen(PORT, () => {
    console.log(`\n🚀 SMK Portfolio Backend Server`);
    console.log(`📡 Server running on http://localhost:${PORT}`);
    console.log(`🤖 OpenAI: ${openai ? '✅ Configured' : '❌ Not configured (set OPENAI_API_KEY in .env)'}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}\n`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    process.exit(0);
});

process.on('SIGINT', () => {
    console.log('\nSIGINT signal received: closing HTTP server');
    process.exit(0);
});

