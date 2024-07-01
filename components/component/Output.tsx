import { useEffect } from "react"
import YoutubeEmbed from "../ui/YoutubeEmbed";
import { BackgroundGradient } from "../ui/background-gradient";
import QuizModal from "../ui/QuizModal";

function extractVideoId(url: string): string {
  const pattern = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=)?(?:embed\/)?(?:v\/)?(?:shorts\/)?(?:live\/)?(?<id>[^\/?&]+)/;

  const match = url.match(pattern);
  if (match && match.groups) {
    return match.groups.id;
  }
  return "";
}

export async function Output({ url }: { url: string }) {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/generate?url=${url}`, {
    method: "GET",
  })
  const data = await response.json();

  return (
    <div className="h-full w-full bg-[#1a1b1e]   bg-grid-small-white/[0.2]">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8 px-12 py-12 ">
        {/* <div className="flex flex-col justify-center h-full w-full"> */}
        <div className="col-span-3 space-y-4">
          <BackgroundGradient>
            <div className="w-full aspect-video rounded-3xl overflow-hidden">
              <YoutubeEmbed embedId={extractVideoId(url)} />
              {/* <YoutubeEmbed embedId={url.split('=')[1]} /> */}
            </div>
          </BackgroundGradient>
        </div>
        <div className="col-span-2 space-y-4 ">
          <div>
            <BackgroundGradient className="rounded-[22px] p-8 bg-white dark:bg-zinc-900" containerClassName="mb-8">
              <h2 className="text-2xl font-bold mb-2">Video Summary</h2>
              <p className="text-neutral-400 ">
                {data.summary ?? ""}
              </p>
            </BackgroundGradient>
            <BackgroundGradient className="rounded-[22px] p-8 bg-white dark:bg-zinc-900">
              <QuizModal questions={data.quiz ?? {}} />
            </BackgroundGradient>
          </div>
        </div>
      </div >
    </div >
  )
}
