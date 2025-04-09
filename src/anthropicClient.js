require('dotenv').config();
const { Anthropic } = require('@anthropic-ai/sdk');

// Initialize Anthropic client with better error handling
let anthropic;
try {
  if (!process.env.ANTHROPIC_API_KEY) {
    console.error('ANTHROPIC_API_KEY is not set in environment variables');
  } else {
    console.log('Initializing Anthropic client with API key');
    anthropic = new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    });
  }
} catch (error) {
  console.error('Error initializing Anthropic client:', error);
}

/**
 * Parse resume text using Anthropic's Claude model
 * 
 * @param {string} resumeText - The text extracted from the resume PDF
 * @returns {Promise<Object>} - Structured JSON data extracted from the resume
 */
async function parseResumeWithAnthropic(resumeText) {
  try {
    // Validate client initialization
    if (!anthropic) {
      throw new Error('Anthropic client is not properly initialized. Check your API key.');
    }

    console.log('Creating message with Anthropic API...');

    const systemPrompt = `You are an expert resume parser. Extract structured information from the resume text provided.
    Return a JSON object with the following structure:
    {
      "profile": {
        "name": "",
        "email": "",
        "phone": "",
        "linkedin": "",
        "otherUrls": []
      },
      "education": [
        {
          "institution": "",
          "degree": "",
          "field": "",
          "start_month_year": "",
          "end_month_year": "",
          "location": ""
        }
      ],
      "work": [
        {
          "company_name": "",
          "location": "",
          "start_month_year": "",
          "end_month_year": "",
          "title": "",
          "responsibilities": []
        }
      ],
      "skills": []
    }
    
    Important: For end_month_year, use "Present" if it's the current position.
    Be accurate and concise. Extract only information explicitly stated in the resume.
    For skills, include them as hashtags without the # symbol, e.g. ["JavaScript", "Python"].`;

    // Use the messages API with the updated SDK
    const message = await anthropic.messages.create({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Parse the following resume text:\n\n${resumeText}`
        }
      ],
      temperature: 0.1,
    });

    // Log token usage
    console.log('Token usage:');
    console.log('  Input tokens:', message.usage.input_tokens);
    console.log('  Output tokens:', message.usage.output_tokens);
    console.log('  Total tokens:', message.usage.input_tokens + message.usage.output_tokens);
    console.log('  Model used:', message.model);

    // Parse the JSON from the response
    const responseContent = message.content[0].text;

    // Extract JSON object from the response text
    const jsonMatch = responseContent.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from Anthropic response');
    }

    const parsedResume = JSON.parse(jsonMatch[0]);
    return parsedResume;
  } catch (error) {
    console.error('Error parsing resume with Anthropic:', error);
    throw new Error(`Failed to parse resume with Anthropic: ${error.status} ${JSON.stringify(error.error || error.message)}`);
  }
}

module.exports = {
  parseResumeWithAnthropic
};
