/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PtNg4gv11hu
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { BackgroundGradient } from "./background-gradient"

export interface quizQuestion {
  question: string;
  options: string[];
  answer: string;
}

export default function Component({ questions }: { questions: quizQuestion[] }) {
  const [currentQuestion, setCurrentQuestion] = useState<number>(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean>(false)
  // const questions = [
  //   {
  //     question: "What is the capital of France? FranceFranceF ranceFranceFrance",
  //     options: ["Paris", "London", "Berlin", "Madrid"],
  //     correctAnswer: "Paris",
  //   },
  //   {
  //     question: "What is the largest ocean on Earth?",
  //     options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
  //     correctAnswer: "Pacific Ocean",
  //   },
  //   {
  //     question: "Who painted the Mona Lisa?",
  //     options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
  //     correctAnswer: "Leonardo da Vinci",
  //   },
  // ]
  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
    const isCorrect = option === questions[currentQuestion].answer
    setIsCorrect(isCorrect)
    if (isCorrect) {
      setTimeout(() => {
        setCurrentQuestion((prevQuestion) => prevQuestion + 1)
        setSelectedOption(null)
      }, 1000)
    }
  }
  return (
    <div>
      {currentQuestion < questions.length ? (
        <>
          <h2 className="text-2xl font-bold mb-4">{questions[currentQuestion].question}</h2>
          <div className="grid gap-4">
            {questions[currentQuestion].options.map((option: string) => (
              <Button
                key={option}
                variant={selectedOption === option ? (isCorrect ? "default" : "destructive") : "outline"}
                onClick={() => handleOptionSelect(option)}
                className="w-full justify-center text-center py-3 px-4 h-auto min-h-[44px]"
              >
                {option}
              </Button>
            ))}
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <CircleCheckIcon className="size-12 text-green-500" />
          <p className="text-lg font-medium">You completed the quiz!</p>
        </div>
      )}
      {currentQuestion === questions.length && (
        <div className="mt-4 flex justify-end">
          <BackgroundGradient containerClassName="rounded-md" className="rounded-[22px] max-w-lg  bg-zinc-900 hover:bg-black hover:bg-opacity-10">
            <Button className="bg-transparent text-primary-foreground px-6 py-2 rounded-[22px] hover:bg-transparent focus:outline-none focus:ring-2 focus:ring-primary"
              onClick={() => { setCurrentQuestion(0) }}>Restart</Button>
          </BackgroundGradient>
        </div>
      )}
    </div>
  )
}

function CircleCheckIcon({ className }: { className: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  )
}
