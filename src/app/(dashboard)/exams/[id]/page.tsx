"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { ExamTimer } from "@/components/exam/ExamTimer";
import { ExamResults } from "@/components/exam/ExamResults";
import { Question } from "@/types";

const examConfig = {
  full: { questions: 65, time: 130 },
  quick: { questions: 25, time: 50 },
  domain: { questions: 20, time: 40 },
};

const mockQuestions: Question[] = [
  {
    id: "q001",
    domain: "foundations",
    subdomain: "basics",
    difficulty: "easy",
    type: "single",
    stem: "What is the primary purpose of Amazon Bedrock?",
    options: { A: "A database service", B: "A fully managed service for building generative AI applications", C: "A container orchestration platform", D: "A serverless computing service" },
    answer: "B",
    explanation: "Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation models.",
    distractors: "A, C, and D describe other AWS services.",
    source: null,
    tags: ["bedrock", "ai"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
  {
    id: "q002",
    domain: "bedrock",
    subdomain: "models",
    difficulty: "medium",
    type: "single",
    stem: "Which provider is NOT available on Amazon Bedrock?",
    options: { A: "Anthropic", B: "Cohere", C: "OpenAI", D: "Stability AI" },
    answer: "C",
    explanation: "OpenAI is not currently available on Amazon Bedrock.",
    distractors: "Anthropic, Cohere, and Stability AI are all available.",
    source: null,
    tags: ["bedrock", "models"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
  {
    id: "q003",
    domain: "security",
    subdomain: "encryption",
    difficulty: "hard",
    type: "single",
    stem: "How does Amazon Bedrock ensure data privacy?",
    options: { A: "Data is shared with model providers", B: "Data is encrypted and customers can use AWS PrivateLink", C: "Data is automatically deleted after 24 hours", D: "Data is stored in shared infrastructure" },
    answer: "B",
    explanation: "Amazon Bedrock encrypts all data in transit and at rest, and customers can use AWS PrivateLink.",
    distractors: "A, C, and D are incorrect.",
    source: null,
    tags: ["bedrock", "security"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
];

interface ExamPageProps {
  params: Promise<{ id: string }>;
}

export default function ExamPage({ params }: ExamPageProps) {
  const router = useRouter();
  const [examState, setExamState] = useState<"setup" | "taking" | "results">("setup");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [startTime] = useState(Date.now());
  const [examId] = useState(() => Math.random().toString(36).substring(7));

  const config = examConfig[((params as any).id) as keyof typeof examConfig] || examConfig.quick;
  const questions = mockQuestions.slice(0, config.questions);

  const handleSelectAnswer = (answer: string) => {
    const q = questions[currentIndex];
    setAnswers({ ...answers, [q.id]: answer });
  };

  const handleSubmit = () => {
    setExamState("results");
  };

  const handleTimeUp = () => {
    setExamState("results");
  };

  const calculateResults = () => {
    let correct = 0;
    const domainScores: Record<string, { correct: number; total: number }> = {};
    
    questions.forEach((q) => {
      if (answers[q.id] === q.answer) {
        correct++;
        if (!domainScores[q.domain]) {
          domainScores[q.domain] = { correct: 0, total: 0 };
        }
        domainScores[q.domain].correct++;
      }
      if (!domainScores[q.domain]) {
        domainScores[q.domain] = { correct: 0, total: 0 };
      }
      domainScores[q.domain].total++;
    });

    return {
      score: (correct / questions.length) * 100,
      correct,
      total: questions.length,
      timeTaken: Math.floor((Date.now() - startTime) / 1000),
      domainBreakdown: Object.entries(domainScores).map(([domain, data]) => ({
        domain,
        ...data,
      })),
    };
  };

  if (examState === "setup") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Start Exam</h1>
          <p className="text-[#94a3b8]">Ready to test your knowledge?</p>
        </div>

        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Exam Details</h3>
          <div className="space-y-2 text-[#94a3b8]">
            <p>Questions: {config.questions}</p>
            <p>Time Limit: {config.time} minutes</p>
            <p>Passing Score: 70%</p>
          </div>
        </div>

        <button
          onClick={() => setExamState("taking")}
          className="w-full px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors"
        >
          Start Exam
        </button>
      </div>
    );
  }

  if (examState === "results") {
    const results = calculateResults();
    return (
      <div className="space-y-6">
        <ExamResults
          score={results.score}
          totalQuestions={results.total}
          correctAnswers={results.correct}
          timeTaken={results.timeTaken}
          domainBreakdown={results.domainBreakdown as any}
        />
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Exam in Progress</h1>
          <p className="text-[#94a3b8]">Question {currentIndex + 1} of {questions.length}</p>
        </div>
        <ExamTimer duration={config.time} onTimeUp={handleTimeUp} />
      </div>

      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4">
        <div className="flex flex-wrap gap-2">
          {questions.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                i === currentIndex
                  ? "bg-[#6366f1] text-white"
                  : answers[questions[i].id]
                  ? "bg-[#22c55e] text-white"
                  : "bg-[#334155] text-[#94a3b8] hover:bg-[#4f46e5]"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>

      <QuestionCard
        question={currentQuestion}
        onSelectAnswer={handleSelectAnswer}
        selectedAnswer={answers[currentQuestion.id]}
      />

      <div className="flex items-center justify-between">
        <button
          onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}
          disabled={currentIndex === 0}
          className="px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#6366f1] transition-colors"
        >
          ← Previous
        </button>

        {currentIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={answeredCount < questions.length}
            className="px-6 py-2 bg-[#22c55e] hover:bg-[#16a34a] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Exam
          </button>
        ) : (
          <button
            onClick={() => setCurrentIndex(currentIndex + 1)}
            className="px-6 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg transition-colors"
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
}
