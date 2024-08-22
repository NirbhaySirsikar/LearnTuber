import { GoogleGenerativeAI } from '@google/generative-ai'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { YoutubeTranscript } from 'youtube-transcript'

const app = new Hono<{
  Bindings: {
    AI: Ai;
    GEMINI_API_KEY: string;
  }
}>()
app.use('*', cors({
  origin: ['http://localhost:3000', 'https://learntuber.vercel.app'],
  allowMethods: ['POST', 'OPTIONS'],
  allowHeaders: ['Content-Type'],
  exposeHeaders: ['Content-Length'],
  maxAge: 600,
  credentials: true,
}))
function trimJSON(inputString: string) {
  // Regular expression to match JSON structure
  const jsonRegex = /{.*}/;

  // Find the JSON string within the input string
  const jsonStringMatch = inputString.match(jsonRegex);

  // If a JSON string is found, return it; otherwise, return null
  return jsonStringMatch ? jsonStringMatch[0] : null;
}

// app.post('/', async (c) => {
//   const body = await c.req.json();
//   const ai = c.env.AI;
//
//
//   //transcription
//   const audioResponse = await fetch(body.audio_url);
//   const blob = await audioResponse.arrayBuffer();
//   const inputs = {
//     audio: [...new Uint8Array(blob)]
//   };
//   const aiResponse = await ai.run('@cf/openai/whisper', inputs);
//   if (aiResponse.text == undefined || aiResponse.text == "") {
//     c.json({ message: "transcription not found" });
//     return c.status(400);
//   }
//   const transcription = aiResponse.text;
//   console.log("transcription: ", transcription);
//
//   //summary and quiz
//   const messages = [
//     {
//       role: "system", content: `You are system which generates a quiz of 5 questions and a brief summary from the context given by the user in following JSON format strictly.
// Your output should be always easily parsed to JSON as if you can only talk in JSON.
// The JSON format you should strictly follow:
//  {
//         "summary": "SUMMARY_HERE",
//         "quiz": [
//             {
//                 "question": "Your question here",
//                 "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
//                 "answer": "Correct option"
//             },
//             ...
//         ]
//     }`},
//     {
//       role: "user",
//       content: `Context: ${transcription}`
//     }
//   ]
//
//   const aiJson = await ai.run('@cf/meta/llama-2-7b-chat-fp16', {
//     max_tokens: 512,
//     messages
//   });
//   console.log(aiJson.response);
//   const output = JSON.parse(aiJson.response);
//
//   return c.json({ output: output });
// })

const decodeHTMLEntities = (text: string) => {
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#39;': "'",
    '&amp;#39;': "'"
  };
  return text.replace(/&amp;#?[a-zA-Z0-9]+;/g, match => entities[match] || match);
};

app.post('/v2', async (c) => {
  const body = await c.req.json();
  const ai = c.env.AI;
  const youtube_url = body.youtube_url;
  const rawtranscript = await YoutubeTranscript.fetchTranscript(youtube_url);
  const transcript = rawtranscript
    .map(segment => decodeHTMLEntities(segment.text))
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  console.log(transcript)

  const genAI = new GoogleGenerativeAI(c.env.GEMINI_API_KEY);
  let model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
  });

  let prompt = `
Generate a quiz of 5 questions and a brief summary from the context given by the user in following JSON format strictly:
{
    "type": "object",
    "properties": {
        "summary": { "type": "string" },
        "quiz": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "question": { "type": "string" },
                    "options": {
                        "type": "array",
                        "items": { "type": "string" }
                    },
                    "answer": { "type": "string" }
                },
                "required": ["question", "options", "answer"]
            }
        }
    },
    "required": ["summary", "quiz"]
}
Context = ${transcript}
`;

  let result = await model.generateContent(prompt)
  const output = JSON.parse(result.response.text());
  console.log(output);
  return c.json({ output: output })
})

export default app;

