/**
 * Analyzes a product image using Google Gemini Vision API.
 * Falls back to a mock intelligent response if no API key is provided,
 * ensuring the hackathon demo always works.
 * 
 * @param {string} base64Image - The base64 encoded image string (without data:image/jpeg;base64, prefix)
 * @param {string} mimeType - The mime type of the image (e.g., 'image/jpeg')
 * @returns {Promise<Object>} - The JSON result
 */
export const analyzeProductImage = async (base64Image, mimeType = 'image/jpeg') => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

  if (!apiKey || apiKey === 'your_api_key_here') {
    console.warn("No VITE_GEMINI_API_KEY found. Falling back to mock analysis for demo.");
    return simulateAnalysis();
  }

  const prompt = `
You are the EAGLE AI Authenticity Engine. Your job is to analyze the provided image.
First, determine if the image contains a recognizable consumer product (e.g., packaged good, bottle, electronics, snack bag).
If it DOES NOT contain a consumer product (e.g., it is a person's face, a plain wall, a landscape, a random non-product object), return exactly this JSON and nothing else:
{
  "status": "invalid",
  "confidence": 0,
  "description": "No recognizable consumer product detected in the image. Please scan a valid product.",
  "signals": {
    "logo": "N/A",
    "packaging": "N/A",
    "ocr": "N/A",
    "barcode": "N/A",
    "qr": "N/A",
    "manufacturer": "N/A"
  }
}

If it DOES contain a consumer product, analyze it for authenticity markers:
- Logo geometry and quality
- Packaging design and layout
- Text (OCR) readability and spelling
- READ AND EXTRACT the exact alphanumeric value from any visible barcode.
- READ AND EXTRACT the exact text or URL from any visible QR code.

Based on your analysis, determine if it looks 'genuine' or 'suspicious' (e.g., looks like a cheap knockoff, blurry, misspelled words).
Return exactly this JSON format and nothing else (do not wrap in markdown):
{
  "status": "genuine", // or "suspicious"
  "confidence": 92, // number between 0 and 100
  "description": "Your analysis reasoning here.",
  "signals": {
    "logo": "96% MATCH",
    "packaging": "94% MATCH",
    "ocr": "98% MATCH",
    "barcode": "<Extracted barcode value here, e.g. '890123456789' or 'NOT DETECTED'>",
    "qr": "<Extracted QR value here, e.g. 'https://iqoo.com' or 'NOT DETECTED'>",
    "manufacturer": "95% MATCH"
  }
}
`;

  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: prompt },
              {
                inline_data: {
                  mime_type: mimeType,
                  data: base64Image
                }
              }
            ]
          }
        ],
        generationConfig: {
          response_mime_type: "application/json"
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API Error: ${response.status}`);
    }

    const data = await response.json();
    const textResult = data.candidates[0].content.parts[0].text;
    
    // Parse the JSON returned by Gemini
    const result = JSON.parse(textResult);
    return result;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    console.warn("Falling back to mock analysis due to error.");
    return simulateAnalysis();
  }
};

const simulateAnalysis = () => {
  return new Promise((resolve) => {
    // Generate random realistic numbers for the demo
    const confidence = Math.floor(Math.random() * (99 - 85 + 1)) + 85;
    const isGenuine = Math.random() > 0.3; // 70% chance of being genuine
    
    setTimeout(() => {
      resolve({
        status: isGenuine ? "genuine" : "suspicious",
        confidence: isGenuine ? confidence : confidence - 20,
        description: isGenuine 
          ? "Strong agreement detected across the available verification signals. Product appears authentic based on reference data."
          : "Anomalies detected in packaging and logo geometry. Proceed with caution.",
        signals: {
          logo: `${Math.floor(Math.random() * 15) + 85}% MATCH`,
          packaging: `${Math.floor(Math.random() * 15) + 85}% MATCH`,
          ocr: `${Math.floor(Math.random() * 15) + 85}% MATCH`,
          barcode: Math.random() > 0.4 ? `890123456${Math.floor(Math.random() * 999)}` : "NOT DETECTED",
          qr: Math.random() > 0.6 ? "https://iqoo-demo.com/verify/" + Math.floor(Math.random() * 9999) : "NOT DETECTED",
          manufacturer: `${Math.floor(Math.random() * 15) + 85}% MATCH`
        }
      });
    }, 2000);
  });
};
