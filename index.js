const express = require('express');
const bodyParser = require('body-parser');
const openai = require('openai');

const app = express();
const port = 3000;

app.use(bodyParser.json());

openai.apiKey = 'YOUR_API_KEY';

app.post('/generate-quiz', (req, res) => {
  const text = req.body.text;
  const quiz = generateQuizFromText(text);
  res.send(quiz);
});

function generateQuizFromText(text) {
  const prompt = `Generate a quiz based on the following text:\n\n${text}\n\nQuestions:\n`;

  return new Promise((resolve, reject) => {
    openai.completions.create({
      engine: 'davinci-qa',
      prompt: prompt,
      maxTokens: 100,
      n: 10,
      stop: null,
      temperature: 0.5,
    })
    .then(response => {
      const questions = [];
      for (const choice of response.choices) {
        const question = choice.text.trim();
        questions.push(question);
      }
      resolve(questions);
    })
    .catch(error => {
      console.log(error);
      reject(error);
    });
  });
}

app.post('/summarize', (req, res) => {
    const text = req.body.text;
  
    const summary = summarizeText(text);
    res.send(summary);
  });
  
  function summarizeText(text) {
    const prompt = `Please summarize the following passage:\n\n${text}`;
  
    const completions = openai.complete({
      engine: 'davinci',
      prompt: prompt,
      maxTokens: 60,
      n: 1,
      stop: '\n',
      temperature: 0.5,
    });
  
    const summary = completions.choices[0].text.trim();
    return summary;
  }

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
 