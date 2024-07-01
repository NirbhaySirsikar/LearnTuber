
import { NextRequest, NextResponse } from "next/server";
import ytdl from "ytdl-core";

export async function GET(request: NextRequest) {
  const youtube_url = request.nextUrl.searchParams.get("url");
  if (youtube_url == 'https://www.youtube.com/watch?v=Tn6-PIqc4UM') {
    return NextResponse.json({
      "summary": "React is a JavaScript library for building user interfaces that was developed at Facebook and released in 2013. It's a simple and easy-to-use library that allows developers to build components that represent logical reusable parts of the UI. React uses a special syntax called JSX to combine JavaScript with HTML markup, and provides a variety of hooks to handle common use cases. The library doesn't care about routing, state management, animation, or other concerns, instead letting the open-source community evolve them naturally. React is a popular choice among front-end developers due to its ease of use and the vast ecosystem of supporting libraries. Knowing React is one of the most in-demand skills for front-end developers today.",
      "quiz": [
        {
          "question": "What is React?",
          "options": [
            "A JavaScript library for building user interfaces",
            "A framework for building web applications",
            "A tool for creating mobile apps",
            "A library for building desktop applications"
          ],
          "answer": "A JavaScript library for building user interfaces"
        },
        {
          "question": "What is the main advantage of using React?",
          "options": [
            "It's easy to use",
            "It's fast and efficient",
            "It's highly customizable",
            "It's widely adopted by the developer community"
          ],
          "answer": "It's easy to use"
        },
        {
          "question": "What is the purpose of the state hook in React?",
          "options": [
            "To manage the state of a component",
            "To handle events in a component",
            "To create reusable components",
            "To style components"
          ],
          "answer": "To manage the state of a component"
        },
        {
          "question": "What is the name of the library that provides server-side rendering for React applications?",
          "options": [
            "Next",
            "Gatsby",
            "React",
            "Spring"
          ],
          "answer": "Next"
        },
        {
          "question": "What is the name of the library that provides animation for React applications?",
          "options": [
            "Spring",
            "Formic",
            "Lux",
            "Recoil"
          ],
          "answer": "Spring"
        }
      ]
    })
  }
  console.log(youtube_url);
  let audio_url = "";
  try {
    const info = await ytdl.getInfo(youtube_url ?? "");
    const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    audio_url = audioFormats[0].url;
    console.log(audio_url)
  } catch (e) {
    console.error("ERROR IN YTDL: ", e);
  }
  if (audio_url == "") {
    return NextResponse.json({ message: "Invalid URL" });
  }
  const res = await fetch(`${process.env.CLOUDFLARE_WORKERS_URL}`, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      audio_url: audio_url
    })
  })
  console.log("AI RES: ", res);
  const ai_res = await res.text();
  const parsed_ai_res = JSON.parse(ai_res);
  return NextResponse.json(parsed_ai_res)
}
