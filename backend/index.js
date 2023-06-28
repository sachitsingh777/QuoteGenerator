const express = require('express');
const axios = require('axios');
require('dotenv').config();
const cors=require("cors")
const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(cors())
// Route for generating quotes using OpenAI API
app.get('/quotes', async (req, res) => {
  try {
    const keyword = req.query.keyword;

    const response = await axios.post('https://api.openai.com/v1/engines/davinci/completions', {
      prompt: `Generate a professional quote about ${keyword}:`,
      max_tokens: 100,
      temperature: 0.7,
      n: 1
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    const quote = response.data.choices[0].text.trim().replace(/\n/g, ''); // Remove newline characters
    res.json({ quote });
  } catch (error) {
    console.error('Error:', error.response.data);
    res.status(500).json({ error: 'Something went wrong' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
