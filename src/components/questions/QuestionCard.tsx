import { Question } from "@/types";
import { DifficultyBadge, DomainBadge } from "@/components/ui";

const domainMap: Record<Question['domain'], { number: number; name: string }> = {
  foundations: { number: 1, name: "Fundamentals" },
  bedrock: { number: 2, name: "Bedrock" },
  lifecycle: { number: 3, name: "ML Lifecycle" },
  responsible_ai: { number: 4, name: "Responsible AI" },
  security: { number: 5, name: "Security" },
};

interface QuestionCardProps {
  question: Question;
  onSelectAnswer?: (answer: string) => void;
  selectedAnswer?: string;
  showAnswer?: boolean;
}

export function QuestionCard({ 
  question, 
  onSelectAnswer, 
  selectedAnswer,
  showAnswer = false 
}: QuestionCardProps) {
  const options = ["A", "B", "C", "D"] as const;
  const domain = domainMap[question.domain];

  return (
    <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <DomainBadge domainNumber={domain.number} domainName={domain.name} />
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="text-sm text-gray-500 dark:text-[#64748b]">#{question.id}</span>
      </div>
      
      <p className="text-gray-900 dark:text-white text-lg mb-6">{question.stem}</p>
      
      <div className="space-y-3">
        {options.map((option) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = showAnswer && question.answer === option;
          const isWrong = showAnswer && isSelected && question.answer !== option;
          
          return (
            <button
              key={option}
              onClick={() => onSelectAnswer?.(option)}
              disabled={showAnswer}
              className={`w-full text-left p-4 rounded-lg border transition-all ${
                isCorrect
                  ? "border-[#22c55e] bg-green-50 dark:bg-[#22c55e]/10"
                  : isWrong
                  ? "border-[#ef4444] bg-red-50 dark:bg-[#ef4444]/10"
                  : isSelected
                  ? "border-[#6366f1] bg-indigo-50 dark:bg-[#6366f1]/10"
                  : "border-gray-200 dark:border-[#334155] hover:border-[#6366f1] hover:bg-gray-50 dark:hover:bg-[#6366f1]/5"
              }`}
            >
              <span className="font-medium text-gray-500 dark:text-[#94a3b8] mr-3">{option}.</span>
              <span className="text-gray-900 dark:text-white">{question.options[option]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
