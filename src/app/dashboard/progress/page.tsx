import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui";
import { DOMAIN_LABELS, DOMAIN_COLORS, Domain } from "@/types";

const mockProgress = {
  totalQuestions: 342,
  answeredQuestions: 87,
  correctAnswers: 62,
  flashcardsStudied: 45,
  examsTaken: 3,
  averageScore: 71,
  streak: 5,
  weakDomains: ["security", "lifecycle"] as Domain[],
  strongDomains: ["foundations", "bedrock"] as Domain[],
};

export default function ProgressPage() {
  const accuracy = Math.round((mockProgress.correctAnswers / mockProgress.answeredQuestions) * 100);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Progress</h1>
        <p className="text-[#94a3b8]">Track your learning journey</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-[#6366f1]">{mockProgress.answeredQuestions}</div>
            <div className="text-sm text-[#94a3b8]">Questions Answered</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-[#22c55e]">{accuracy}%</div>
            <div className="text-sm text-[#94a3b8]">Accuracy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-[#f59e0b]">{mockProgress.flashcardsStudied}</div>
            <div className="text-sm text-[#94a3b8]">Flashcards Studied</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="text-center">
            <div className="text-3xl font-bold text-[#ef4444]">{mockProgress.streak}</div>
            <div className="text-sm text-[#94a3b8]">Day Streak</div>
          </CardContent>
        </Card>
      </div>

      {/* Domain Progress */}
      <Card>
        <CardContent>
          <CardTitle className="mb-4">Domain Performance</CardTitle>
          <div className="space-y-4">
            {Object.entries(DOMAIN_LABELS).map(([domain, label]) => {
              const isWeak = mockProgress.weakDomains.includes(domain as Domain);
              const isStrong = mockProgress.strongDomains.includes(domain as Domain);
              const progress = isStrong ? 75 : isWeak ? 35 : 55;
              
              return (
                <div key={domain}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-[#94a3b8]">{label}</span>
                    <div className="flex items-center gap-2">
                      {isWeak && <span className="text-xs text-[#ef4444]">Needs Work</span>}
                      {isStrong && <span className="text-xs text-[#22c55e]">Strong</span>}
                      <span className="text-sm font-medium" style={{ color: DOMAIN_COLORS[domain as Domain] }}>
                        {progress}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all"
                      style={{
                        width: `${progress}%`,
                        backgroundColor: DOMAIN_COLORS[domain as Domain],
                      }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardContent>
          <CardTitle className="mb-4">Recent Activity</CardTitle>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2 border-b border-[#334155]">
              <div className="flex items-center gap-3">
                <span>❓</span>
                <span className="text-white">Answered 15 questions</span>
              </div>
              <span className="text-[#64748b]">Today</span>
            </div>
            <div className="flex items-center justify-between py-2 border-b border-[#334155]">
              <div className="flex items-center gap-3">
                <span>🃏</span>
                <span className="text-white">Studied 10 flashcards</span>
              </div>
              <span className="text-[#64748b]">Yesterday</span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span>🧪</span>
                <span className="text-white">Completed Quick Exam (78%)</span>
              </div>
              <span className="text-[#64748b]">2 days ago</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Link
          href="/questions"
          className="flex-1 text-center px-6 py-3 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors"
        >
          Practice Questions
        </Link>
        <Link
          href="/exams"
          className="flex-1 text-center px-6 py-3 bg-[#1e293b] border border-[#334155] text-white rounded-lg font-medium hover:border-[#6366f1] transition-colors"
        >
          Take Another Exam
        </Link>
      </div>
    </div>
  );
}
