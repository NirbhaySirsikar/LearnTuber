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
      <Output url={youtube_url ?? ""} />
    )
  } else {
    router.replace("/");
  }
}
