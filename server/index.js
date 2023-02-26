const ytdl = require('ytdl-core');

const fs = require('fs');

const bodyParser = require('body-parser');
const cors = require('cors')

const express = require('express')
const app = express();
const port = 3000;

const Api_key = 'b71850161eef473fb0e2c7a1b5a70722';

const { text } = require('body-parser');
const { response } = require('express');
const assemblyai = require('assemblyai');
assemblyai.setAPIKey(Api_key)

const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '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'
const configuration = new Configuration({
  apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration);


app.use(bodyParser.json());
app.use(cors())
app.use(express.json());

app.get('/hello', (req, res, next) => {
  res.send("Api working properly")
})

app.post('/api/messages', async (req, res) => {
  const message = req.body.message;
  console.log(`Received message: ${message}`);


  const info = await ytdl.getInfo(message);
  const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
  const audioUrl = await audioFormats[0].url;
  console.log(audioUrl)

  const transcript = new assemblyai.Transcript();
  const respsone = await transcript.create({
    audio_src_url: audioUrl,

    options: {
      format_text: true || false
    }

  })

  const { id } = respsone.get()
  const data = await transcript.poll(id)
  var respsonejson = data.get();
  var datasend = respsonejson.text;
  console.log(datasend);

  const summary = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Please summarize the following text: "${datasend}`,
    temperature: 0,
    max_tokens: 60,
  })

  const summarizeddata = summary.data.choices[0].text;
  console.log(summarizeddata)

  const quiz = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Please make quiz of atleast three questions from this text, give me four options for each and don't tell me the answers: "${datasend}`,
    temperature: 0,
    max_tokens: 600,

  })

  const quizdata = quiz.data.choices[0].text;
  console.log(quizdata)
  res.json(summarizeddata)

});


app.listen(port, () => {
  console.log(`Express.js app listening at ${port}`)
})

