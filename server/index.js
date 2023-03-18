const ytdl = require('ytdl-core');

const fs = require('fs');

const bodyParser = require('body-parser');
const cors = require('cors')

const express = require('express')
const app = express();
const port = 3000;

const Api_key = ''; //replace value of Api_key with you AssemblyAI api key

const { text } = require('body-parser');
const { response } = require('express');
const assemblyai = require('assemblyai');
assemblyai.setAPIKey(Api_key)

const { Configuration, OpenAIApi } = require('openai');
const OPENAI_API_KEY = '' //replace OPEN_API_KEY with your OpenAI API key
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
    // var datasend="Flutter is a UI framework for building apps on iOS, Android, the Web, and desktop. It combines a high-performance graphics engine with the Dart programming language to provide full-time safety and stateful hot reload. Dart compiles to native machine code, and the UI is laid out as a tree of widgets. It provides hundreds of pre-built widgets to handle things like animation, scrolling, responsive layout, and more. Everything in Flutter is a widget, and stateless widgets are immutable. Stateful widgets have properties that can be reactive, and you can use Flutter's tooling to easily traverse the UI. Hot reloading allows you to quickly make changes and see the results on a real device. This has been Flutter in 100 seconds, and for more information, check out the Flutter Firebase course on fireship IO.";
  console.log(datasend);

  const summary = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `please summarize the following text  : "${datasend}`,
    temperature: 0.5,
    max_tokens: 600,
  })

  const senddata = summary.data.choices[0].text;
  console.log(senddata)

  const quiz = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `Please make quiz of more than three questions from this text in the json format like "{
      "quiz": {
        "title": "Geography Quiz",
        "description": "Test your knowledge on geography!",
        "length":3,
        "questions": [
          {
            "question": "What is the capital of France?",
            "options": [
              "Madrid",
              "Paris",
              "London",
              "Berlin"
            ],
            "answer": "Paris"
          },
          {
            "question": "Which continent is Brazil located in?",
            "options": [
              "North America",
              "South America",
              "Europe",
              "Asia"
            ],
            "answer": "South America"
          },
          {
            "question": "What is the largest country in the world by land area?",
            "options": [
              "United States",
              "China",
              "Russia",
              "Canada"
            ],
            "answer": "Russia"
          }
        ]
      }
    }" use this following text:"${datasend}"`,
    // prompt: `Please make quiz of more than three questions from this text, give me four options for each and don't tell me the answers:"${datasend}"`,
    temperature: 0.8,
    max_tokens: 600,

  })

  const quizdata = quiz.data.choices[0].text;
  console.log(quizdata)
  res.json({ message: `${senddata}`,quiz:` ${quizdata}` })
  console.log(`\n${senddata}  ${quizdata}`)

});


app.listen(port, () => {
  console.log(`Express.js app listening at ${port}`)
})

