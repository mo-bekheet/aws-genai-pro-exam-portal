"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const STUDY_LINKS = [
  { href: "/dashboard/lessons", label: "Lessons" },
  { href: "/dashboard/flashcards", label: "Flashcards" },
  { href: "/dashboard/mind-maps", label: "Mind Maps" },
  { href: "/dashboard/exams", label: "Roadmap" },
  { href: "/support", label: "Resources" },
];

const PRACTICE_LINKS = [
  { href: "/dashboard/questions", label: "Question Bank" },
  { href: "/dashboard/exams", label: "Mock Exam" },
  { href: "/dashboard/compare", label: "Services Compare" },
  { href: "/dashboard/progress", label: "Progress" },
];

const COMMUNITY_LINKS = [
  { href: "https://github.com/mo-bekheet/aws-genai-pro-exam-portal/issues/new?template=question-contribution.md", label: "Contribute a Question" },
  { href: "https://github.com/mo-bekheet/aws-genai-pro-exam-portal/issues", label: "Report an Issue" },
  { href: "https://github.com/mo-bekheet/aws-genai-pro-exam-portal/blob/main/CONTRIBUTING.md", label: "CONTRIBUTING.md" },
  { href: "https://github.com/mo-bekheet/aws-genai-pro-exam-portal/stargazers", label: "Star on GitHub" },
];

interface FooterProps {
  stats?: {
    questions: number;
    contributors: number;
    lessons: number;
    flashcards: number;
  };
}

export function Footer({ 
  stats = { questions: 342, contributors: 18, lessons: 156, flashcards: 89 } 
}: FooterProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith("/dashboard");

  return (
    <footer className="border-t border-gray-200 dark:border-[#334155] bg-white dark:bg-[#0a0f1e]">
      <div className="max-w-[1200px] mx-auto px-6 pt-12 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Column 1: Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xl">🪨</span>
              <span className="font-bold text-gray-900 dark:text-white" style={{ fontFamily: 'var(--font-plus-jakarta), sans-serif' }}>
                AWS GenAI Study Hub
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-[#94a3b8] mb-4">
              Free exam prep for AWS AIP-C01. Built by the community.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-2 mb-4">
              <a
                href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
              </a>
              <a
                href="https://ko-fi.com/mohamedbekheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-[#f59e0b] hover:bg-amber-500/10 transition-colors"
                aria-label="Support on Ko-fi"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M23.005 9.187c-.142-.57-.513-.984-1.006-1.145-.493-.16-1.136-.117-1.795-.045-.42.045-.864.103-1.22.103-.588 0-1.136-.117-1.566-.234-.43-.117-.864-.234-1.348-.234H9.072c-.584 0-1.082.117-1.512.234-.43.117-.864.234-1.348.234-.356 0-.8-.058-1.22-.103-.66-.072-1.303-.114-1.796.045-.493.16-.864.575-1.006 1.145-.237.912-.142 2.04.166 3.213.308 1.172.822 2.485 1.584 4.024.762 1.54 1.76 3.338 3.152 5.485.278.43.64.938 1.106 1.483.466.545 1.013 1.117 1.699 1.683.343.283.752.588 1.232.856.48.269 1.036.483 1.664.583.314.05.658.083 1.022.083.364 0 .708-.033 1.022-.083.629-.1 1.184-.314 1.664-.583.48-.268.89-.573 1.232-.856.687-.566 1.233-1.138 1.7-1.683.465-.545.827-1.053 1.105-1.483 1.393-2.147 2.39-3.945 3.153-5.485.761-1.54 1.276-2.852 1.583-4.024.309-1.173.404-2.301.166-3.213zM12.002 21.33c-1.264 0-2.394-.434-3.306-1.204-.912-.77-1.565-1.857-1.919-3.2-.354-1.342-.354-2.813.047-4.32.4-1.508 1.124-2.947 2.124-4.24.999-1.293 2.21-2.647 3.554-3.938 1.343-1.292 2.804-2.507 4.28-3.513.295-.201.635-.38.999-.502.364-.123.752-.164 1.14-.085.39.08.724.267.976.545.253.279.41.644.44 1.057.03.413-.068.89-.274 1.378-.206.488-.517.99-.898 1.455-.381.466-.795.893-1.184 1.263-.39.37-.732.693-.972.943l-3.146 3.978c-.294.372-.587.79-.878 1.253-.29.463-.557.963-.799 1.497-.242.534-.447 1.094-.614 1.676-.166.582-.234 1.17-.196 1.752.038.581.165 1.157.38 1.717.215.56.535 1.092.95 1.585.415.493.94.916 1.56 1.257.62.34 1.373.522 2.237.522.864 0 1.617-.182 2.237-.522.62-.341 1.145-.764 1.56-1.257.415-.493.735-1.025.95-1.585.215-.56.342-1.136.38-1.717.038-.582-.03-1.17-.196-1.752-.167-.582-.372-1.142-.614-1.676-.242-.534-.509-1.034-.799-1.497-.29-.463-.583-.881-.878-1.253l-3.146-3.978c-.24-.25-.582-.573-.972-.943-.39-.37-.803-.797-1.184-1.263-.38-.465-.692-.967-.898-1.455-.206-.488-.304-.965-.274-1.378.03-.413.187-.778.44-1.057.252-.278.586-.465.976-.545.388-.079.776.038 1.14.085.364.122.704.301.999.502 1.476 1.006 2.937 2.221 4.28 3.513 1.344 1.291 2.555 2.645 3.554 3.938 1 1.293 1.723 2.732 2.124 4.24.4 1.507.4 2.978.046 4.32-.353 1.343-1.006 2.43-1.919 3.2-.912.77-2.042 1.204-3.306 1.204z"/>
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/mohamedbekheet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 dark:text-[#94a3b8] hover:bg-gray-100 dark:hover:bg-[#334155] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.208 24 24 23.227 24 22.271V1.729C24 .774 23.208 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>

            {/* Badge Pills */}
            <div className="flex flex-wrap gap-2">
              <span className="px-2 py-1 text-xs font-mono bg-[#1e293b] dark:bg-[#1e293b] border border-[#334155] dark:border-[#334155] text-[#94a3b8] dark:text-[#94a3b8] rounded">
                MIT License
              </span>
              <span className="px-2 py-1 text-xs font-mono bg-[#1e293b] dark:bg-[#1e293b] border border-[#334155] dark:border-[#334155] text-[#94a3b8] dark:text-[#94a3b8] rounded">
                Open Source
              </span>
              <span className="px-2 py-1 text-xs font-mono bg-[#1e293b] dark:bg-[#1e293b] border border-[#334155] dark:border-[#334155] text-[#94a3b8] dark:text-[#94a3b8] rounded">
                Free Forever
              </span>
            </div>
          </div>

          {/* Column 2: Study */}
          <div>
            <h3 className="text-xs font-mono uppercase text-gray-400 dark:text-[#64748b] mb-4">
              Study
            </h3>
            <ul className="space-y-2">
              {STUDY_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-[#94a3b8] hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Practice */}
          <div>
            <h3 className="text-xs font-mono uppercase text-gray-400 dark:text-[#64748b] mb-4">
              Practice
            </h3>
            <ul className="space-y-2">
              {PRACTICE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 dark:text-[#94a3b8] hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Community */}
          <div>
            <h3 className="text-xs font-mono uppercase text-gray-400 dark:text-[#64748b] mb-4">
              Community
            </h3>
            <ul className="space-y-2 mb-4">
              {COMMUNITY_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 dark:text-[#94a3b8] hover:text-[#6366f1] dark:hover:text-[#6366f1] transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

            {/* Ko-fi Card */}
            <div className="p-3 rounded-lg border border-amber-500/30 bg-amber-500/5 dark:bg-[#1c1a14]">
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                ☕ Enjoying the app?
              </p>
              <p className="text-xs text-gray-500 dark:text-[#94a3b8] mb-2">
                Buy me a coffee to keep it free.
              </p>
              <a
                href="https://ko-fi.com/mohamedbekheet"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-[#f59e0b] border border-[#f59e0b] rounded-lg hover:bg-amber-500/10 transition-colors"
              >
                Support on Ko-fi
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-gray-200 dark:border-[#334155]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 text-xs text-gray-500 dark:text-[#64748b]">
            <div className="font-mono">
              © {new Date().getFullYear()} AWS GenAI Study Hub · MIT License
            </div>
            <div className="hidden md:block">
              Not affiliated with Amazon Web Services
            </div>
            <div className="flex items-center gap-2 font-mono">
              <span>Last updated: March {new Date().getFullYear()}</span>
              <span>·</span>
              <span className="text-[#6366f1]">{stats.questions} questions</span>
              <span>·</span>
              <span className="text-[#6366f1]">{stats.contributors} contributors</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}