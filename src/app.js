require('dotenv').config();
const express = require('express');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const { extractTextFromPdf } = require('./pdfUtils');
const { parseResumeWithAnthropic } = require('./anthropicClient');

// Initialize Express app
const app = express();
const port = process.env.PORT || 3000;

// Configure multer for file uploads
const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // limit to 10MB
    },
    fileFilter: (req, file, cb) => {
        // Accept only PDF files
        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    },
});

// Middleware
app.use(express.json());
app.use(cors());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

// Parse resume endpoint
app.post('/parse-resume', upload.single('resume'), async (req, res) => {
    try {
        // Check if a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No resume file uploaded' });
        }

        console.log(`Processing resume: ${req.file.originalname}`);

        // Extract text from the PDF
        const pdfText = await extractTextFromPdf(req.file.buffer);

        // Parse the resume text using Anthropic
        const parsedResume = await parseResumeWithAnthropic(pdfText);

        // Return the parsed resume data
        res.status(200).json(parsedResume);
    } catch (error) {
        console.error('Error during resume parsing:', error);
        res.status(500).json({ error: `Resume parsing failed: ${error.message}` });
    }
});

// Root endpoint redirects to the HTML interface
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Resume Parser API running on port ${port}`);
    console.log(`Visit http://localhost:${port} to use the web interface`);
});
