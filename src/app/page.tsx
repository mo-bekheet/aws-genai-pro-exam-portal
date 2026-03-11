import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0f1e]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0f1e]/80 backdrop-blur-md border-b border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🪨</span>
            <span className="text-xl font-bold text-white">AWS GenAI Study Hub</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              ⭐ GitHub
            </Link>
            <Link
              href="/sign-in"
              className="px-4 py-2 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-medium transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Ace the AWS AI Practitioner Exam — <span className="text-[#6366f1]">Free, Forever</span>
          </h1>
          <p className="text-xl text-[#94a3b8] mb-10 max-w-2xl mx-auto">
            The community-driven study hub to master GenAI on AWS.
            Flashcards, mock exams, and practical roadmaps — everything
            you need to pass, with zero paywalls.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/sign-in"
              className="px-8 py-4 bg-[#6366f1] hover:bg-[#4f46e5] text-white rounded-lg font-semibold text-lg transition-colors"
            >
              Start Studying Free →
            </Link>
            <Link
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
              className="px-8 py-4 border border-[#334155] text-white rounded-lg font-semibold text-lg hover:border-[#6366f1] transition-colors"
            >
              View on GitHub
            </Link>
          </div>
          <p className="mt-6 text-[#64748b]">
            No credit card required · Open Source · Community Maintained
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6 bg-[#111827]">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything you need to pass
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">🃏</div>
              <h3 className="text-xl font-semibold text-white mb-2">Spaced-Repetition Flashcards</h3>
              <p className="text-[#94a3b8]">
                Master terminology and AWS services with smart flashcards that adapt to your learning pace.
              </p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">🧪</div>
              <h3 className="text-xl font-semibold text-white mb-2">Realistic Mock Exams</h3>
              <p className="text-[#94a3b8]">
                Practice with timed exams that mirror the actual AIP-C01 format, complete with detailed explanations.
              </p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold text-white mb-2">Visual Mind Maps</h3>
              <p className="text-[#94a3b8]">
                Understand complex GenAI concepts and how different AWS services connect with interactive mind maps.
              </p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">❓</div>
              <h3 className="text-xl font-semibold text-white mb-2">Extensive Question Bank</h3>
              <p className="text-[#94a3b8]">
                Filter practice questions by domain (Fundamentals, Security, Bedrock) to focus on weak areas.
              </p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-white mb-2">Progress Tracking</h3>
              <p className="text-[#94a3b8]">
                Visualize your readiness with detailed analytics on your domain performance and test scores.
              </p>
            </div>
            <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-white mb-2">Structured Study Roadmap</h3>
              <p className="text-[#94a3b8]">
                Follow a step-by-step curriculum designed to take you from beginner to certified professional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-white text-center mb-12">How it works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6366f1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#6366f1]">1</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Sign in instantly</h3>
              <p className="text-[#94a3b8]">
                Create your free account in seconds using Google or GitHub. No credit card, no hidden fees.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6366f1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#6366f1]">2</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Study your way</h3>
              <p className="text-[#94a3b8]">
                Follow the roadmap, tackle the flashcards, or jump straight into practice exams. Learn at your own pace.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#6366f1]/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-[#6366f1]">3</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Track your readiness</h3>
              <p className="text-[#94a3b8]">
                Monitor your scores across all exam domains so you know exactly when you are ready for the real thing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-[#334155]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              GitHub
            </a>
            <a
              href="/support"
              className="text-[#94a3b8] hover:text-white transition-colors"
            >
              ☕ Support the project
            </a>
          </div>
          <p className="text-[#64748b] text-sm">
            MIT License · 342 Questions · Free Forever
          </p>
        </div>
      </footer>
    </div>
  );
}
