"use client"
import { Output } from "@/components/component/Output";
import { useRouter, useSearchParams } from "next/navigation";

function matchYoutubeUrl(url: string) {
  var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
  return (url.match(p)) ? true : false;
}
export default function OutputPage() {
  const searchParams = useSearchParams();
  const youtube_url = searchParams.get('url');
  const router = useRouter();

  if (matchYoutubeUrl(youtube_url ?? "")) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#1a1b1e] text-white">
        <Output url={youtube_url ?? ""} />
      </div>
    )
  } else {
    router.replace("/");
  }
}
