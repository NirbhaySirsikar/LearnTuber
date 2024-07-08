
import { Skeleton } from "@/components/ui/skeleton"
export default function landing() {

  return (

    <div className="flex flex-col h-screen bg-[#1a1b1e] md:flex-row  justify-center gap-8 py-12 px-12 md:py-20">
      <div className="w-full md:w-[60%] aspect-video rounded-lg overflow-hidden">
        <Skeleton className="h-full w-full" />
      </div>
      <div className="w-full md:w-[40%] space-y-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Generating Video Summary...</h2>
          <Skeleton className="mt-2 h-4 w-[80%]" />
          <Skeleton className="mt-2 h-4 w-[80%]" />
          <Skeleton className="mt-2 h-4 w-[60%]" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white">Generating Quiz...</h2>
          <div className="space-y-4 mt-2">
            <div>
              <Skeleton className="h-5 w-[50%]" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-[50%]" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
            <div>
              <Skeleton className="h-5 w-[50%]" />
              <div className="space-y-2 mt-2">
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
                <Skeleton className="h-5 w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
