const pdfParse = require('pdf-parse');

/**
 * Extract text from a PDF buffer
 * @param {Buffer} pdfBuffer - Buffer containing PDF data
 * @returns {Promise<string>} - The extracted text from the PDF
 */
const extractTextFromPdf = async (pdfBuffer) => {
    try {
        const data = await pdfParse(pdfBuffer);
        return data.text;
    } catch (error) {
        console.error('Error extracting text from PDF:', error);
        throw new Error('Failed to extract text from PDF');
    }
};

module.exports = {
    extractTextFromPdf
};
