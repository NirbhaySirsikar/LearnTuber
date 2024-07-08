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
    const fetchTranscript = async () => {
      const newresponse = await fetch(`${process.env.NEXT_PUBLIC_CLOUDFLARE_WORKERS_URL}/v2`,
        {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            youtube_url: url
          })
        });
      const ai_res = await newresponse.json();
      console.log(ai_res);
      setSummary(ai_res.output.summary);
      setQuiz(ai_res.output.quiz)
      setLoading(false);

    }
    fetchTranscript();
  }, [url]);

  return (
    <div className="w-full min-h-screen text-white">
      <div className="grid grid-cols-1 gap-y-8 lg:grid-cols-5 lg:gap-8 lg:px-12 lg:pb-12 p-4">
        <div className="col-span-3 space-y-4">
          <div>
            <BackgroundGradient>
              <div className="w-full aspect-video rounded-3xl overflow-hidden">
                <YoutubeEmbed embedId={extractVideoId(url)} />
              </div>
            </BackgroundGradient>
            {

              loading ? <div className="flex space-x-4 items-center mt-8 z-100 bg-blue-600/[0.05] relative px-4 py-2 border border-blue-600 border-radius-10 rounded-xl">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(37 99 235)" className="size-9">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                </svg>
                <div>
                  This process might take a lot of time (almost 50% of the video length). We recommend you to watch the video meanwhile.
                </div>
              </div> : <div></div>
            }
          </div>
        </div>
        <div className="col-span-2 space-y-4 ">
          <div>
            <BackgroundGradient className="rounded-[22px] p-8  bg-zinc-900" containerClassName="mb-8">
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
            <BackgroundGradient className="rounded-[22px] p-8  bg-zinc-900">
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
