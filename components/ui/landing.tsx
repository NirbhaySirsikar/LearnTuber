"use client"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { BackgroundGradient } from "./background-gradient"
import AnimatedGradientText from "./AnimatedGradientText"
import { useRouter, useSearchParams } from "next/navigation"
import { MovingBorderButton } from "./movingBorderButton"


export function Landing() {
  const [json, setJson] = useState("")
  const [url, setUrl] = useState("")
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // function AnimatedCard({ loading }: { loading: boolean }) {
  //   if (!loading) {
  //     return <div className="rounded-[22px] max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900">
  //       <Card />
  //     </div>
  //   }
  //   else return (
  //     <BackgroundGradient className="rounded-[22px] max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900">
  //       <Card />
  //     </BackgroundGradient>
  //   )
  // }
  // function Card() {
  //   return <div className="max-w-md w-full space-y-4 px-2">
  //     <div className="flex items-center space-x-8">
  //       <Input
  //         type="text"
  //         placeholder="Enter Youtube URL here..."
  //         className="flex-1 bg-neutral-950 placeholder:text-neutral-400 border-none focus:ring-2 focus:ring-primary"
  //         onChange={(e) => setUrl(e.target.value)}
  //       />
  //       {/* <Input */}
  //       {/*   type="text" */}
  //       {/*   placeholder="Enter your prompt..." */}
  //       {/*   className="flex-1 bg-[#2c2d31] border-none focus:ring-2 focus:ring-primary" */}
  //       {/*   onChange={(e) => setUrl(e.target.value)} */}
  //       {/* /> */}
  //       <BackgroundGradient containerClassName="rounded-md" className="rounded-[22px] max-w-lg bg-white dark:bg-zinc-900">
  //         <Button className="bg-transparent text-primary-foreground px-6 py-2 rounded-[22px] hover:bg-black focus:outline-none focus:ring-2 focus:ring-primary"
  //           onClick={() => generateSummaryAndQuiz()}
  //         >
  //           Generate
  //         </Button>
  //       </BackgroundGradient>
  //     </div>
  //   </div>
  //
  // }


  async function generateSummaryAndQuiz(): Promise<void> {

    // const audio_url = url;
    // const info = await ytdl.getInfo(url);
    // const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    // const audio_url = audioFormats[0].url;

    // const info = await ytdl(url, { filter: format => format.container === 'audioonly' });
    // const audioFormats = ytdl.filterFormats(info.formats, 'audioonly');
    // const audio_url = audioFormats[0].url;
    // console.log(info.toString());
    //
    // alert("worksjA");
    setLoading(!loading);
    setJson(url);
    // setLoading(true);
    // const response = await fetch(`http://localhost:3000/api/generate?url=${url}`, {
    //   method: "GET",
    // })
    // const res_json = await response.json();
    // console.log(res_json);
    // setJson(JSON.stringify(res_json));
    // setLoading(false);
    //
    // setJson(text);
  }
  // if (loading) {
  //   return <div>
  //     Loading...
  //   </div>
  // }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1b1e] text-white">
      <div className="h-[100vh] w-full dark:bg-[#1a1b1e] bg-white  dark:bg-grid-small-white/[0.2] bg-grid-black/[0.2] relative flex items-center justify-center">
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-[#1a1b1e] bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <div className="max-w-2xl mx-auto p-4">
          <h1 className="relative z-10 text-6xl md:text-7xl text-center font-sans font-bold">
            <AnimatedGradientText className={""}>LearnTuber</AnimatedGradientText>
          </h1>
          {/* <h1 className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"> */}
          {/*   LearnTuber */}
          {/* </h1> */}
          <div className="py-2"></div>
          <p className="text-neutral-400 max-w-lg mx-auto my-2 text-lg text-center relative z-10">
            Enter the <b>YouTube URL</b> and let AI generate a consise <b>Summary</b> and <b>Quiz</b>
          </p>
          <div className="py-8"></div>

          <BackgroundGradient className="rounded-[22px] max-w-lg p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <div className="max-w-md w-full space-y-4 px-2">
              <div className="flex items-center space-x-8">
                <Input
                  type="text"
                  placeholder="Enter Youtube URL here..."
                  className="flex-1 bg-neutral-950 placeholder:text-neutral-400 border-none focus:ring-2 focus:ring-primary"
                  onChange={(e) => setUrl(e.target.value)}
                />
                {/* <Input */}
                {/*   type="text" */}
                {/*   placeholder="Enter your prompt..." */}
                {/*   className="flex-1 bg-[#2c2d31] border-none focus:ring-2 focus:ring-primary" */}
                {/*   onChange={(e) => setUrl(e.target.value)} */}
                {/* /> */}
                <BackgroundGradient containerClassName="rounded-md" className="rounded-[22px] max-w-lg bg-white dark:bg-zinc-900 hover:bg-black hover:bg-opacity-10">
                  <Button className="bg-transparent text-primary-foreground px-6 py-2 rounded-[22px] hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
                    onClick={() => {
                      var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
                      if (url.match(p)) {
                        router.push(`/output?url=${url}`)
                      }
                      else {
                        alert("Invalid Link")
                      }
                    }}
                  >Generate </Button>
                </BackgroundGradient>
              </div>
            </div>
          </BackgroundGradient>
          <div className="w-full flex flex-col items-center mt-8">
            <MovingBorderButton
              borderRadius="1.75rem"
              containerClassName="flex flex-col items-center"
              className="flex space-x-1 items-center bg-white dark:bg-zinc-800 text-black dark:text-white border-neutral-200 dark:border-slate-800"
              onClick={() => { router.push('output?url=https://www.youtube.com/watch?v=Tn6-PIqc4UM') }}
            >
              <p className="text-neutral-400 text-center relative z-10">
                Try a Quick Demo
              </p>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="rgb(163 163 163)" className="size-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25" />
              </svg>
            </MovingBorderButton>
          </div>
          {/* <p className="text-muted-foreground text-center mt-10">{youtube_url}</p> */}
        </div >
      </div >
    </div>
  )

}
