interface StreakCounterProps {
  streakCount: number;
  lastStudyDate?: string | null;
}

export function StreakCounter({ streakCount, lastStudyDate }: StreakCounterProps) {
  const isActive = streakCount > 0;
  
  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">🔥 Study Streak</h3>
      <div className="text-center">
        <div className={`text-4xl font-bold mb-2 ${isActive ? "text-[#f59e0b]" : "text-[#64748b]"}`}>
          {streakCount}
        </div>
        <div className="text-[#94a3b8]">
          {streakCount === 1 ? "day" : "days"} in a row
        </div>
        {lastStudyDate && (
          <div className="text-sm text-[#64748b] mt-2">
            Last studied: {new Date(lastStudyDate).toLocaleDateString()}
          </div>
        )}
      </div>
      {!isActive && (
        <div className="mt-4 pt-4 border-t border-[#334155]">
          <p className="text-sm text-[#94a3b8] text-center">
            Start studying today to build your streak!
          </p>
        </div>
      )}
    </div>
  );
}
