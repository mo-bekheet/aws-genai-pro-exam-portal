import { Question } from "@/types";
import { DifficultyBadge, DomainBadge } from "@/components/ui";

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

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
      <div className="flex items-center gap-3 mb-4">
        <DomainBadge domain={question.domain} />
        <DifficultyBadge difficulty={question.difficulty} />
        <span className="text-sm text-[#64748b]">#{question.id}</span>
      </div>
      
      <p className="text-white text-lg mb-6">{question.stem}</p>
      
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
                  ? "border-[#22c55e] bg-[#22c55e]/10"
                  : isWrong
                  ? "border-[#ef4444] bg-[#ef4444]/10"
                  : isSelected
                  ? "border-[#6366f1] bg-[#6366f1]/10"
                  : "border-[#334155] hover:border-[#6366f1] hover:bg-[#6366f1]/5"
              }`}
            >
              <span className="font-medium text-[#94a3b8] mr-3">{option}.</span>
              <span className="text-white">{question.options[option]}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
