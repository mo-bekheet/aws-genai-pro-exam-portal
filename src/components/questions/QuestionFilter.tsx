"use client";

import { Domain, DOMAIN_LABELS } from "@/types";

interface QuestionFilterProps {
  selectedDomain: Domain | "all";
  selectedDifficulty: string | "all";
  onDomainChange: (domain: Domain | "all") => void;
  onDifficultyChange: (difficulty: string | "all") => void;
}

export function QuestionFilter({
  selectedDomain,
  selectedDifficulty,
  onDomainChange,
  onDifficultyChange,
}: QuestionFilterProps) {
  const difficulties = ["all", "easy", "medium", "hard"] as const;
  const domains = ["all", ...Object.keys(DOMAIN_LABELS)] as const;

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-[#94a3b8] mb-2">
            Domain
          </label>
          <select
            value={selectedDomain}
            onChange={(e) => onDomainChange(e.target.value as Domain | "all")}
            className="w-full px-4 py-2 bg-[#0a0f1e] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-[#6366f1]"
          >
            {domains.map((domain) => (
              <option key={domain} value={domain}>
                {domain === "all" ? "All Domains" : DOMAIN_LABELS[domain as Domain]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-[#94a3b8] mb-2">
            Difficulty
          </label>
          <select
            value={selectedDifficulty}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-4 py-2 bg-[#0a0f1e] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-[#6366f1]"
          >
            {difficulties.map((difficulty) => (
              <option key={difficulty} value={difficulty}>
                {difficulty === "all" ? "All Difficulties" : difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
