"use state";
import YoutubeEmbed from "../ui/YoutubeEmbed";
import { BackgroundGradient } from "../ui/background-gradient";
import QuizModal, { quizQuestion } from "../ui/QuizModal";
import { useEffect, useState } from "react";
import { Skeleton } from "../ui/skeleton";

function extractVideoId(url: string): string {
  const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:live\/)?(?<id>[^\/?&]+)/;

  const match = url.match(pattern);
  if (match && match.groups) {
    return match.groups.id;
  }
  return "";
}

export async function Output({ url }: { url: string }) {

  const [loading, setLoading] = useState<boolean>(true);
  const [summary, setSummary] = useState<string>("");
  const [quiz, setQuiz] = useState<quizQuestion[]>([]);

  useEffect(() => {
    if (!loading) return;
    const fetchData = async () => {
      if (url == 'https://www.youtube.com/watch?v=Tn6-PIqc4UM') {
        setSummary("React is a JavaScript library for building user interfaces that was developed at Facebook and released in 2013. It's a simple and easy-to-use library that allows developers to build components that represent logical reusable parts of the UI. React uses a special syntax called JSX to combine JavaScript with HTML markup, and provides a variety of hooks to handle common use cases. The library doesn't care about routing, state management, animation, or other concerns, instead letting the open-source community evolve them naturally. React is a popular choice among front-end developers due to its ease of use and the vast ecosystem of supporting libraries. Knowing React is one of the most in-demand skills for front-end developers today.");
        setQuiz(
          [
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
          ]);
        setLoading(false);
        return;
      }
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate?url=${url}`, { method: "GET", });
      const data: { audio_url: string } = await response.json();
      // console.log(data.audio_url);
      // console.log(process.env.CLOUDFLARE_WORKERS_URL)
      const res = await fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKERS_URL}`, {
        // const res = await fetch(`${process.env.CLOUDFLARE_WORKERS_URL}`, {
        // const res = await fetch(`https://whisper.test.workers.dev`, {
        method: "POST",
        // headers: {
        //   'Content-Type': 'application/json'
        // },
        body: JSON.stringify({
          audio_url: data.audio_url
        })
      })
      // console.log(res);
      const ai_res = await res.text();
      // console.log(ai_res);
      const parsed_ai_res = JSON.parse(ai_res);
      // return NextResponse.json(parsed_ai_res)
      setSummary(parsed_ai_res.output.summary);
      setQuiz(parsed_ai_res.output.quiz)
      // console.log(summary);
      // console.log(quiz);
      setLoading(false);
    }
    fetchData();
  }, [url]);

  return (
    <div className="w-full min-h-screen dark:text-white">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-12 py-12">
        <div className="col-span-3 space-y-4">
          <BackgroundGradient>
            <div className="w-full aspect-video rounded-3xl overflow-hidden">
              <YoutubeEmbed embedId={extractVideoId(url)} />
            </div>
          </BackgroundGradient>
        </div>
        <div className="col-span-2 space-y-4 ">
          <div>
            <BackgroundGradient className="rounded-[22px] p-8 bg-white dark:bg-zinc-900" containerClassName="mb-8">
              <h2 className="text-2xl font-bold mb-2">Video Summary</h2>
              {loading
                ?
                <div>
                  <Skeleton className="mt-2 h-4 w-[80%]" />
                  <Skeleton className="mt-2 h-4 w-[80%]" />
                  <Skeleton className="mt-2 h-4 w-[60%]" />
                </div>
                : <p className="text-neutral-400 ">
                  {summary}
                </p>}
            </BackgroundGradient>
            <BackgroundGradient className="rounded-[22px] p-8 bg-white dark:bg-zinc-900">
              {loading ?
                <div>
                  <h2 className="text-2xl font-bold mb-2">Quiz</h2>
                  <div className="space-y-2 mt-2">
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                    <Skeleton className="h-5 w-full" />
                  </div>
                </div>
                : <QuizModal questions={quiz ?? {}} />
              }
            </BackgroundGradient>
          </div>
        </div>
      </div>
    </div >
  )
}
