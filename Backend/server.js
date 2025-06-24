// backend/server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(bodyParser.json());


app.get('/', (req, res) => {
    res.json({ status: 'ok', message: 'API is healthy!' });
});

const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configure storage as needed

app.post('/generate-insta-caption', upload.single('image'), async (req, res) => {
  try {
    const { file } = req;
    const { prompt, language, length, tone } = req.body;

    if (!file && !prompt) {
      return res.status(400).json({ error: 'Either an image or text prompt is required.' });
    }

    // If image is uploaded, analyze it (you'll need to implement this)
    let imageDescription = '';
    if (file) {
      imageDescription = await analyzeImage(file.path); // Implement this function
    }

    const finalPrompt = imageDescription 
      ? `Generate a ${length} Instagram caption in ${language} about: ${imageDescription}. Also consider: ${prompt}. Use a ${tone} tone.`
      : `Generate a ${length} Instagram caption in ${language} about: ${prompt} with a ${tone} tone.`;

    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'meta-llama/llama-4-scout-17b-16e-instruct:free',
        messages: [
          {
            role: 'system',
            content: "Generate Instagram captions following these exact rules: 1) Create only the caption text - no intros or explanations 2) Length: short= max 3-4 words and 4-5 diffrent suggestion, medium = max 1-2 sentences and 3-4 diffrent suggestion, long= min 3-5 sentences and 2-3 diffrent suggestion 3) can Include 1-3 relevant emojis within the text 4) Add 1-2 hashtags at the end 5) Match the requested tone exactly 6) Use natural, conversational language 7) If input image description is unclear, respond only with: 'Please provide a clearer description for an Instagram Image.' 8) Never use markdown or special formatting. 9) caption shoud be strictly related to the image description. "
          },
          {
            role: 'user',
            content: finalPrompt,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.META_API}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Instagram Caption Generator',
        },
      }
    );

    const generated = response.data.choices[0].message.content;
    res.json({ generated });

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({ error: 'Failed to generate caption.' });
  }
});

// Helper function to analyze image (you'll need to implement this properly)
async function analyzeImage(imagePath) {
  // This is a placeholder - implement actual image analysis
  // You might use OpenAI's vision API, Google Vision, etc.
  return "an image containing various elements";
}



app.post('/generate', async (req, res) => {
  const { prompt, language, length, tone } = req.body;
  if (!prompt || !language || !length || !tone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  // console.log('Prompt received:', prompt, language, length, tone);

  const instruction = `Generate a ${length} LinkedIn post in ${language} about: ${prompt} with a ${tone} tone.`;

  try {
    const response = await axios.post(
      'https://openrouter.ai/api/v1/chat/completions',
      {
        model: 'deepseek/deepseek-r1-0528:free',
        messages: [
          {
            role: 'system',
            content: 'You are an AI content writer specialized in crafting high-quality LinkedIn posts. Your job is to generate meaningful, professional, and engaging content suitable specifically for LinkedIn. You will be given: - A short user prompt (idea or topic of the post) - A target language if hindi then stricly hindi devnagri should be used in answer , is english then likewise and in hinglish which is hindi and english mixed sounding language but result should be in english fonts- A desired content length (short, medium, or long) - A preferred tone (e.g., motivational, professional, witty, casual). Your responsibilities: 1. Only generate posts that are appropriate for LinkedIn — topics should relate to career, tech, motivation, leadership, personal growth, learning, industry insights, or similar. 2. If the input is unclear, contains gibberish, or isn\'t suitable for LinkedIn, reply exactly with: \"The input is too unclear or not relevant for LinkedIn.\" 3. Respect the selected tone, and match it naturally. 4. Keep the language human and engaging — not robotic or overly formal. 5. Add a few well-placed emojis (maximum 3). 6. End the post with 4–6 relevant hashtags. 7. Do not include any PREAMBLE introductions like “Here is your post” etc. — just output the post text directly. Be concise, effective, and tailor each post for LinkedIn engagement. make it sound like a real person wrote it, not an AI. Do not use any markdown formatting or code blocks.',
          },
          {
            role: 'user',
            content: instruction,
          },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.DEEPSEEK_API}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'http://localhost:5173', 
          'X-Title': 'LinkedIn Post Generator',     
        },
      }
    );

    const generated = response.data.choices[0].message.content;
    res.json({ generated });

  } catch (err) {

    console.error('🔥 OpenRouter Error:', err.response?.data || err.message);
    res.status(500).json({ generated: '❌ AI generation failed.' });
  }
});


app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
