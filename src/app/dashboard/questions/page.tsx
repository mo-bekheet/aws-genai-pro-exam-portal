"use client";

import { useState } from "react";
import { QuestionCard } from "@/components/questions/QuestionCard";
import { QuestionFilter } from "@/components/questions/QuestionFilter";
import { Question, Domain } from "@/types";

const mockQuestions: Question[] = [
  {
    id: "q001",
    domain: "foundations",
    subdomain: "basics",
    difficulty: "easy",
    type: "single",
    stem: "What is the primary purpose of Amazon Bedrock?",
    options: {
      A: "A database service",
      B: "A fully managed service for building generative AI applications",
      C: "A container orchestration platform",
      D: "A serverless computing service",
    },
    answer: "B",
    explanation: "Amazon Bedrock is a fully managed service that offers a choice of high-performing foundation models from leading AI companies like Anthropic, Cohere, and Stability AI, enabling you to build generative AI applications.",
    distractors: "A, C, and D describe other AWS services (RDS, ECS, and Lambda respectively).",
    source: null,
    tags: ["bedrock", "ai", "foundation-models"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
  {
    id: "q002",
    domain: "bedrock",
    subdomain: "models",
    difficulty: "medium",
    type: "single",
    stem: "Which of the following is NOT a foundation model provider available on Amazon Bedrock?",
    options: {
      A: "Anthropic",
      B: "Cohere",
      C: "OpenAI",
      D: "Stability AI",
    },
    answer: "C",
    explanation: "OpenAI is not currently available on Amazon Bedrock. The available providers include Anthropic (Claude), Cohere, Stability AI, Meta (Llama), and Amazon (Titan).",
    distractors: "Anthropic, Cohere, and Stability AI are all available model providers on Bedrock.",
    source: null,
    tags: ["bedrock", "models", "providers"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
  {
    id: "q003",
    domain: "security",
    subdomain: "encryption",
    difficulty: "hard",
    type: "single",
    stem: "How does Amazon Bedrock ensure data privacy when using foundation models?",
    options: {
      A: "Data is shared with model providers by default",
      B: "Data is encrypted in transit and at rest, and customers can use AWS PrivateLink",
      C: "Data is automatically deleted after 24 hours",
      D: "Data is stored in shared model provider infrastructure",
    },
    answer: "B",
    explanation: "Amazon Bedrock encrypts all data in transit and at rest. Customers can also use AWS PrivateLink to establish private connectivity between their VPC and Bedrock, ensuring data never traverses the public internet.",
    distractors: "A, C, and D are incorrect statements about Bedrock's data privacy.",
    source: null,
    tags: ["bedrock", "security", "privacy", "encryption"],
    contributor: "mo-bekheet",
    date_added: "2025-01",
  },
];

export default function QuestionsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | "all">("all");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | undefined>();
  const [showAnswer, setShowAnswer] = useState(false);

  const filteredQuestions = mockQuestions.filter((q) => {
    if (selectedDomain !== "all" && q.domain !== selectedDomain) return false;
    if (selectedDifficulty !== "all" && q.difficulty !== selectedDifficulty) return false;
    return true;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const handleSelectAnswer = (answer: string) => {
    if (!showAnswer) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer) {
      setShowAnswer(true);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(undefined);
      setShowAnswer(false);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
      setSelectedAnswer(undefined);
      setShowAnswer(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Question Bank</h1>
        <p className="text-[#94a3b8]">Practice questions to test your knowledge</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <QuestionFilter
            selectedDomain={selectedDomain}
            selectedDifficulty={selectedDifficulty}
            onDomainChange={setSelectedDomain}
            onDifficultyChange={setSelectedDifficulty}
          />
          
          <div className="mt-4 bg-[#1e293b] border border-[#334155] rounded-xl p-4">
            <div className="text-sm text-[#94a3b8]">
              Showing {filteredQuestions.length} of {mockQuestions.length} questions
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          {filteredQuestions.length === 0 ? (
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-8 text-center">
              <p className="text-[#94a3b8]">No questions match your filters</p>
            </div>
          ) : currentQuestion ? (
            <div className="space-y-4">
              <QuestionCard
                question={currentQuestion}
                onSelectAnswer={handleSelectAnswer}
                selectedAnswer={selectedAnswer}
                showAnswer={showAnswer}
              />

              {showAnswer && (
                <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Explanation</h3>
                  <p className="text-[#94a3b8] mb-4">{currentQuestion.explanation}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <button
                  onClick={handlePrevious}
                  disabled={currentQuestionIndex === 0}
                  className="px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#6366f1] transition-colors"
                >
                  ← Previous
                </button>
                
                {!showAnswer ? (
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedAnswer}
                    className="px-6 py-2 bg-[#6366f1] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4f46e5] transition-colors"
                  >
                    Submit Answer
                  </button>
                ) : (
                  <button
                    onClick={handleNext}
                    disabled={currentQuestionIndex === filteredQuestions.length - 1}
                    className="px-6 py-2 bg-[#6366f1] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#4f46e5] transition-colors"
                  >
                    Next Question →
                  </button>
                )}
              </div>

              <div className="text-center text-sm text-[#64748b]">
                Question {currentQuestionIndex + 1} of {filteredQuestions.length}
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
