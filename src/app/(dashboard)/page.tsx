import Link from "next/link";
import { ExamCountdown } from "@/components/dashboard/ExamCountdown";
import { StreakCounter } from "@/components/dashboard/StreakCounter";
import { DomainProgress } from "@/components/dashboard/DomainProgress";

export default function DashboardPage() {
  const mockDomainScores = [
    { domain_name: "foundations" as const, correct: 15, total: 25 },
    { domain_name: "bedrock" as const, correct: 8, total: 20 },
    { domain_name: "lifecycle" as const, correct: 5, total: 15 },
    { domain_name: "responsible_ai" as const, correct: 12, total: 18 },
    { domain_name: "security" as const, correct: 3, total: 12 },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back!</h1>
        <p className="text-[#94a3b8]">Track your progress and continue studying</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Link
          href="/questions"
          className="bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-xl p-6 transition-colors"
        >
          <div className="text-2xl mb-2">❓</div>
          <div className="font-semibold">Continue Studying</div>
          <div className="text-sm text-white/80">Practice questions</div>
        </Link>
        <Link
          href="/exams"
          className="bg-[#1e293b] border border-[#334155] hover:border-[#6366f1] text-white rounded-xl p-6 transition-colors"
        >
          <div className="text-2xl mb-2">🧪</div>
          <div className="font-semibold">Start Mock Exam</div>
          <div className="text-sm text-[#94a3b8]">Test your knowledge</div>
        </Link>
        <Link
          href="/progress"
          className="bg-[#1e293b] border border-[#334155] hover:border-[#6366f1] text-white rounded-xl p-6 transition-colors"
        >
          <div className="text-2xl mb-2">📈</div>
          <div className="font-semibold">View Weak Areas</div>
          <div className="text-sm text-[#94a3b8]">Focus on improvement</div>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ExamCountdown examDate={null} />
        <StreakCounter streakCount={0} lastStudyDate={null} />
        <DomainProgress domainScores={mockDomainScores} />
      </div>

      {/* Recent Activity */}
      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
        <h3 className="text-lg font-semibold text-white mb-4">Recent Activity</h3>
        <div className="text-center py-8">
          <p className="text-[#94a3b8] mb-4">No recent activity yet</p>
          <Link
            href="/questions"
            className="inline-block px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors"
          >
            Start Your First Question
          </Link>
        </div>
      </div>
    </div>
  );
}
