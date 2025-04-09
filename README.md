# Resume Parser

A web application that extracts structured information from PDF resumes using Anthropic's Claude AI model. This tool parses resume content into a standardized JSON format, making it easier to process and analyze job applications.

## Features

- 📄 Upload PDF resumes through a web interface
- 🔍 Extract text content from PDF files
- 🤖 Parse resume content using Anthropic's Claude AI model
- 📊 Return structured JSON data with:
  - Personal profile information
  - Education history
  - Work experience
  - Skills

## Tech Stack

- **Backend**: Node.js with Express
- **PDF Processing**: pdf-parse
- **File Uploads**: multer
- **AI Processing**: Anthropic Claude API (claude-3-opus-20240229 model)
- **Frontend**: HTML, CSS, and JavaScript

## Installation

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Anthropic API key

### Setup

1. Clone the repository
```bash
git clone [repository-url]
cd resume-parser
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following content:
```
ANTHROPIC_API_KEY=your_anthropic_api_key_here
PORT=3000 # Optional, defaults to 3000
```

## Usage

1. Start the server:
```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

2. Open your browser and navigate to `http://localhost:3000`

3. Upload a PDF resume using the web interface

4. The parsed resume information will be displayed in JSON format

## API Endpoints

- `GET /health` - Health check endpoint
- `GET /` - Serves the web interface
- `POST /parse-resume` - Accepts a PDF file upload and returns parsed resume data

### Example API Response

```json
{
  "profile": {
    "name": "John Doe",
    "email": "john.doe@example.com",
    "phone": "555-123-4567",
    "linkedin": "linkedin.com/in/johndoe",
    "otherUrls": ["github.com/johndoe"]
  },
  "education": [
    {
      "institution": "Example University",
      "degree": "Bachelor of Science",
      "field": "Computer Science",
      "start_month_year": "September 2018",
      "end_month_year": "May 2022",
      "location": "San Francisco, CA"
    }
  ],
  "work": [
    {
      "company_name": "Tech Company Inc.",
      "location": "San Francisco, CA",
      "start_month_year": "June 2022",
      "end_month_year": "Present",
      "title": "Software Engineer",
      "responsibilities": [
        "Developed and maintained web applications",
        "Collaborated with cross-functional teams"
      ]
    }
  ],
  "skills": ["JavaScript", "React", "Node.js", "Python"]
}
```

## Project Structure

```
resume-parser/
├── public/
│   └── index.html       # Web interface
├── src/
│   ├── app.js           # Express server and routes
│   ├── anthropicClient.js # Anthropic API integration
│   └── pdfUtils.js      # PDF parsing utilities
├── .env                 # Environment variables (create this file)
├── package.json         # Project dependencies
└── README.md            # Project documentation
```

## Environment Variables

- `ANTHROPIC_API_KEY`: Your Anthropic API key for Claude model access
- `PORT`: (Optional) The port on which the server will run (default: 3000)

## License

MIT License

Copyright (c) 2025

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue to improve this project.
