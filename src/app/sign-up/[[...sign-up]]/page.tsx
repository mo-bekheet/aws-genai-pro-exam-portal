"use client";

import Link from "next/link";
import { SignUp } from "@clerk/nextjs";
import { Logo } from "@/components/ui/Logo";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import { useTheme } from "@/lib/theme-context";

export default function SignUpPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0f1e] flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-[#0a0f1e]/80 backdrop-blur-md border-b border-gray-200 dark:border-[#334155]">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <Link 
              href="https://github.com/mo-bekheet/aws-genai-pro-exam-portal"
              className="text-gray-600 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              ⭐ GitHub
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Sign Up Content */}
      <div className="flex-1 flex items-center justify-center pt-24 pb-12 px-4">
        <div className="w-full max-w-md">
          {/* Custom Logo Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-500 rounded-2xl mb-4">
              <span className="text-3xl">🪨</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Create your account
            </h1>
            <p className="text-gray-600 dark:text-[#94a3b8]">
              Join the AWS GenAI Study Hub community
            </p>
          </div>

          {/* Sign Up Card */}
          <div className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-2xl p-6 shadow-xl dark:shadow-2xl dark:shadow-indigo-500/10">
            <SignUp 
              appearance={{
                variables: {
                  colorPrimary: "#6366f1",
                  colorText: isDark ? "#f1f5f9" : "#0f172a",
                  colorTextSecondary: isDark ? "#94a3b8" : "#64748b",
                  colorBackground: isDark ? "#1e293b" : "#ffffff",
                  colorInputBackground: isDark ? "#0a0f1e" : "#ffffff",
                  colorInputText: isDark ? "#f1f5f9" : "#0f172a",
                  colorDanger: "#ef4444",
                  borderRadius: "12px",
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                },
                elements: {
                  rootBox: "w-full",
                  card: "bg-transparent border-0 shadow-none",
                  header: "hidden",
                  formButtonPrimary: "bg-[#6366f1] hover:bg-[#4f46e5] text-white font-semibold py-3 rounded-lg",
                  formButtonSecondary: "bg-transparent hover:bg-gray-100 dark:hover:bg-[#334155] text-gray-900 dark:text-white font-semibold py-3 rounded-lg",
                  formFieldInput: "bg-white dark:bg-[#0a0f1e] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-white rounded-lg py-3 px-4",
                  formFieldLabel: "text-gray-700 dark:text-[#94a3b8] font-medium mb-2",
                  formFieldInputShowPasswordButton: "text-gray-500 dark:text-[#94a3b8]",
                  dividerLine: "bg-gray-200 dark:bg-[#334155]",
                  dividerText: "text-gray-500 dark:text-[#64748b]",
                  footer: "hidden",
                  footerAction: "hidden",
                  footerActionLink: "hidden",
                  socialButtonsBlockButton: "bg-white dark:bg-[#0a0f1e] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-[#334155] rounded-lg py-3",
                  socialButtonsBlockButtonText: "text-gray-900 dark:text-white font-medium",
                  footerCard: "hidden",
                  headerTitle: "hidden",
                  headerSubtitle: "hidden",
                  organizationSwitcherTrigger: "text-gray-900 dark:text-white",
                  identityPreviewText: "text-gray-600 dark:text-[#94a3b8]",
                  identityPreviewEditButton: "text-[#6366f1]",
                  otpCodeFieldInput: "bg-white dark:bg-[#0a0f1e] border border-gray-200 dark:border-[#334155] text-gray-900 dark:text-white",
                  formFieldError: "text-red-500 dark:text-red-400",
                },
              }}
            />
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-gray-500 dark:text-[#64748b] text-sm">
            No credit card required · Open Source · Community Maintained
          </p>
        </div>
      </div>

      {/* Hide Clerk Footer via CSS */}
      <style jsx global>{`
        .clerk-footer {
          display: none !important;
        }
        [data-clerk-footer] {
          display: none !important;
        }
      `}</style>
    </div>
  );
}