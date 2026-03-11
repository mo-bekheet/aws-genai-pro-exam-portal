import { DOMAIN_LABELS, DOMAIN_COLORS, Domain } from "@/types";

interface ExamResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeTaken: number;
  domainBreakdown?: Array<{
    domain: Domain;
    correct: number;
    total: number;
  }>;
}

export function ExamResults({
  score,
  totalQuestions,
  correctAnswers,
  timeTaken,
  domainBreakdown = [],
}: ExamResultsProps) {
  const isPassing = score >= 70;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-8 text-center">
        <div className={`text-6xl font-bold mb-2 ${isPassing ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {Math.round(score)}%
        </div>
        <div className={`text-xl font-semibold ${isPassing ? "text-[#22c55e]" : "text-[#ef4444]"}`}>
          {isPassing ? "🎉 Passed!" : "❌ Keep Studying"}
        </div>
        <p className="text-[#94a3b8] mt-2">
          You answered {correctAnswers} out of {totalQuestions} questions correctly
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-white">{formatTime(timeTaken)}</div>
          <div className="text-sm text-[#94a3b8]">Time Taken</div>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 text-center">
          <div className="text-2xl font-bold text-white">{Math.round((correctAnswers / totalQuestions) * 100)}%</div>
          <div className="text-sm text-[#94a3b8]">Accuracy</div>
        </div>
      </div>

      {/* Domain Breakdown */}
      {domainBreakdown.length > 0 && (
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Domain Breakdown</h3>
          <div className="space-y-3">
            {domainBreakdown.map((domain) => {
              const percentage = domain.total > 0 ? Math.round((domain.correct / domain.total) * 100) : 0;
              return (
                <div key={domain.domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#94a3b8]">{DOMAIN_LABELS[domain.domain]}</span>
                    <span className="text-sm font-medium" style={{ color: DOMAIN_COLORS[domain.domain] }}>
                      {domain.correct}/{domain.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${percentage}%`,
                        backgroundColor: DOMAIN_COLORS[domain.domain],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-4">
        <button className="flex-1 px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors">
          Review Answers
        </button>
        <button className="flex-1 px-6 py-3 bg-[#1e293b] border border-[#334155] text-white rounded-lg font-medium hover:border-[#6366f1] transition-colors">
          Take Another Exam
        </button>
      </div>
    </div>
  );
}
