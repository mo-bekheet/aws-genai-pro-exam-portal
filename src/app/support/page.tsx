import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";

export default function Support() {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/">
            <Logo />
          </Link>
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
              className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ⭐ GitHub
            </Link>
            <ThemeToggle />
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-6xl mb-6">☕</div>
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Support the Project
          </h1>
          <p className="text-xl text-gray-600 dark:text-[#94a3b8] mb-8 max-w-2xl mx-auto">
            This project is free forever. If it helped you pass the exam, consider buying me a coffee.
          </p>
          <a
            href="https://ko-fi.com/mohamedbekheet"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#29abe0] hover:bg-[#1a8cb8] text-white rounded-lg font-semibold text-lg transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.005 9.187c-.142-.57-.513-.984-1.006-1.145-.493-.16-1.136-.117-1.795-.045-.42.045-.864.103-1.22.103-.588 0-1.136-.117-1.566-.234-.43-.117-.864-.234-1.348-.234H9.072c-.584 0-1.082.117-1.512.234-.43.117-.864.234-1.348.234-.356 0-.8-.058-1.22-.103-.66-.072-1.303-.114-1.796.045-.493.16-.864.575-1.006 1.145-.237.912-.142 2.04.166 3.213.308 1.172.822 2.485 1.584 4.024.762 1.54 1.76 3.338 3.152 5.485.278.43.64.938 1.106 1.483.466.545 1.013 1.117 1.699 1.683.343.283.752.588 1.232.856.48.269 1.036.483 1.664.583.314.05.658.083 1.022.083.364 0 .708-.033 1.022-.083.629-.1 1.184-.314 1.664-.583.48-.268.89-.573 1.232-.856.687-.566 1.233-1.138 1.7-1.683.465-.545.827-1.053 1.105-1.483 1.393-2.147 2.39-3.945 3.153-5.485.761-1.54 1.276-2.852 1.583-4.024.309-1.173.404-2.301.166-3.213zM12.002 21.33c-1.264 0-2.394-.434-3.306-1.204-.912-.77-1.565-1.857-1.919-3.2-.354-1.342-.354-2.813.047-4.32.4-1.508 1.124-2.947 2.124-4.24.999-1.293 2.21-2.647 3.554-3.938 1.343-1.292 2.804-2.507 4.28-3.513.295-.201.635-.38.999-.502.364-.123.752-.164 1.14-.085.39.08.724.267.976.545.253.279.41.644.44 1.057.03.413-.068.89-.274 1.378-.206.488-.517.99-.898 1.455-.381.466-.795.893-1.184 1.263-.39.37-.732.693-.972.943l-3.146 3.978c-.294.372-.587.79-.878 1.253-.29.463-.557.963-.799 1.497-.242.534-.447 1.094-.614 1.676-.166.582-.234 1.17-.196 1.752.038.581.165 1.157.38 1.717.215.56.535 1.092.95 1.585.415.493.94.916 1.56 1.257.62.34 1.373.522 2.237.522.864 0 1.617-.182 2.237-.522.62-.341 1.145-.764 1.56-1.257.415-.493.735-1.025.95-1.585.215-.56.342-1.136.38-1.717.038-.582-.03-1.17-.196-1.752-.167-.582-.372-1.142-.614-1.676-.242-.534-.509-1.034-.799-1.497-.29-.463-.583-.881-.878-1.253l-3.146-3.978c-.24-.25-.582-.573-.972-.943-.39-.37-.803-.797-1.184-1.263-.38-.465-.692-.967-.898-1.455-.206-.488-.304-.965-.274-1.378.03-.413.187-.778.44-1.057.252-.278.586-.465.976-.545.388-.079.776.038 1.14.085.364.122.704.301.999.502 1.476 1.006 2.937 2.221 4.28 3.513 1.344 1.291 2.555 2.645 3.554 3.938 1 1.293 1.723 2.732 2.124 4.24.4 1.507.4 2.978.046 4.32-.353 1.343-1.006 2.43-1.919 3.2-.912.77-2.042 1.204-3.306 1.204z"/>
            </svg>
            Buy Me a Coffee
          </a>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-[#111827]">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155]">
              <div className="text-3xl font-bold text-[#6366f1] font-mono">342</div>
              <div className="text-sm text-gray-600 dark:text-[#94a3b8]">Questions</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155]">
              <div className="text-3xl font-bold text-[#6366f1] font-mono">18</div>
              <div className="text-sm text-gray-600 dark:text-[#94a3b8]">Contributors</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155]">
              <div className="text-3xl font-bold text-[#6366f1] font-mono">156</div>
              <div className="text-sm text-gray-600 dark:text-[#94a3b8]">Lessons</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-200 dark:border-[#334155]">
              <div className="text-3xl font-bold text-[#6366f1] font-mono">100%</div>
              <div className="text-sm text-gray-600 dark:text-[#94a3b8]">Free</div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Impact */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            What Your Support Enables
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">🖥️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Server Costs</h3>
              <p className="text-gray-600 dark:text-[#94a3b8] text-sm">
                Keeps the database and API running smoothly for all users worldwide.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">📚</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">New Content</h3>
              <p className="text-gray-600 dark:text-[#94a3b8] text-sm">
                Enables adding more questions, lessons, and study materials over time.
              </p>
            </div>
            <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6">
              <div className="text-4xl mb-4">⚙️</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Development</h3>
              <p className="text-gray-600 dark:text-[#94a3b8] text-sm">
                Funds new features, bug fixes, and improvements to the study experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-16 px-6 bg-gray-50 dark:bg-[#111827]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Open Source Community
          </h2>
          <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-8">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#6366f1] font-mono mb-2">42</div>
                <div className="text-gray-600 dark:text-[#94a3b8]">GitHub Stars</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#6366f1] font-mono mb-2">12</div>
                <div className="text-gray-600 dark:text-[#94a3b8]">Forks</div>
              </div>
            </div>
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-[#334155]">
              <p className="text-gray-600 dark:text-[#94a3b8] text-center">
                This project is open source. Contribute, report issues, or fork it on{" "}
                <a
                  href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#6366f1] hover:underline"
                >
                  GitHub
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Passed Exam Sharing */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-8">
            Passed the Exam? Share Your Success! 🎉
          </h2>
          <div className="bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-xl p-8 text-white text-center">
            <p className="text-lg mb-6">
              Passed the AWS AI Practitioner exam? We&apos;d love to hear your story!
            </p>
            <a
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal/discussions"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-white text-[#6366f1] rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Share Your Story
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0a0f1e]">
        <div className="max-w-6xl mx-auto">
          {/* Bottom */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link
                href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
                className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                GitHub
              </Link>
              <Link
                href="http://bekheet.com/"
                className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                About Me
              </Link>
            </div>
            <p className="text-gray-500 dark:text-[#64748b] text-sm">
              MIT License · Free Forever
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}