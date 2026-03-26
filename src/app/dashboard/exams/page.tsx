import Link from "next/link";
import { Card, CardContent, CardTitle } from "@/components/ui";

const examModes = [
  {
    id: "full",
    title: "Full Exam",
    description: "65 questions in 130 minutes",
    questions: 65,
    time: 130,
    color: "border-[#6366f1]",
  },
  {
    id: "quick",
    title: "Quick Exam",
    description: "25 questions in 50 minutes",
    questions: 25,
    time: 50,
    color: "border-[#22c55e]",
  },
  {
    id: "domain",
    title: "Domain Focus",
    description: "Test specific domains",
    questions: 20,
    time: 40,
    color: "border-[#f59e0b]",
  },
];

export default function ExamsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Mock Exams</h1>
        <p className="text-[#94a3b8]">Test your knowledge under exam conditions</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {examModes.map((exam) => (
          <Link key={exam.id} href={`/exams/${exam.id}`}>
            <Card className={`h-full ${exam.color} hover:border-opacity-100 transition-all`}>
              <CardContent>
                <CardTitle className="mb-2">{exam.title}</CardTitle>
                <p className="text-[#94a3b8] mb-4">{exam.description}</p>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#64748b]">{exam.questions} questions</span>
                  <span className="text-[#64748b]">{exam.time} min</span>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6 mt-8">
        <h3 className="text-lg font-semibold text-white mb-4">📝 Exam Tips</h3>
        <ul className="space-y-2 text-[#94a3b8]">
          <li>• Read each question carefully before selecting an answer</li>
          <li>• Manage your time wisely - about 2 minutes per question</li>
          <li>• Flag difficult questions and come back to them later</li>
          <li>• Trust your first instinct unless you find a reason to change</li>
          <li>• A score of 70% or higher is required to pass</li>
        </ul>
      </div>
    </div>
  );
}
