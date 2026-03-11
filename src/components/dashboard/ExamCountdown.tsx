interface ExamCountdownProps {
  examDate?: string | null;
}

export function ExamCountdown({ examDate }: ExamCountdownProps) {
  if (!examDate) {
    return (
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">📅 Exam Countdown</h3>
        <p className="text-[#94a3b8] mb-4">Set your exam date to track your preparation</p>
        <button className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors">
          Set Exam Date
        </button>
      </div>
    );
  }

  const exam = new Date(examDate);
  const today = new Date();
  const daysRemaining = Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

  const isUrgent = daysRemaining <= 14;
  const isPassed = daysRemaining <= 0;

  return (
    <div className={`bg-[#1e293b] border rounded-xl p-6 ${
      isPassed ? "border-[#ef4444]" : isUrgent ? "border-[#f59e0b]" : "border-[#334155]"
    }`}>
      <h3 className="text-lg font-semibold text-white mb-4">📅 Exam Countdown</h3>
      {isPassed ? (
        <p className="text-[#ef4444] font-medium">Exam date has passed!</p>
      ) : (
        <div className="text-center">
          <div className={`text-4xl font-bold mb-2 ${
            isUrgent ? "text-[#f59e0b]" : "text-[#6366f1]"
          }`}>
            {daysRemaining}
          </div>
          <div className="text-[#94a3b8]">days remaining</div>
          <div className="text-sm text-[#64748b] mt-2">
            {exam.toLocaleDateString("en-US", { 
              weekday: "long", 
              year: "numeric", 
              month: "long", 
              day: "numeric" 
            })}
          </div>
        </div>
      )}
    </div>
  );
}
