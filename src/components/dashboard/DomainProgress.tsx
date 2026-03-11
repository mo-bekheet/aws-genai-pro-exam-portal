import { DOMAIN_LABELS, DOMAIN_COLORS, Domain } from "@/types";

interface DomainProgressProps {
  domainScores: Array<{
    domain_name: Domain;
    correct: number;
    total: number;
  }>;
}

export function DomainProgress({ domainScores }: DomainProgressProps) {
  const domains = Object.keys(DOMAIN_LABELS) as Domain[];

  const getProgress = (domain: Domain) => {
    const score = domainScores.find(s => s.domain_name === domain);
    if (!score || score.total === 0) return 0;
    return Math.round((score.correct / score.total) * 100);
  };

  const getColor = (progress: number) => {
    if (progress >= 70) return "bg-[#22c55e]";
    if (progress >= 40) return "bg-[#f59e0b]";
    return "bg-[#ef4444]";
  };

  return (
    <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-6">
      <h3 className="text-lg font-semibold text-white mb-4">📊 Domain Progress</h3>
      <div className="space-y-4">
        {domains.map((domain) => {
          const progress = getProgress(domain);
          return (
            <div key={domain}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-[#94a3b8]">{DOMAIN_LABELS[domain]}</span>
                <span className="text-sm font-medium" style={{ color: DOMAIN_COLORS[domain] }}>
                  {progress}%
                </span>
              </div>
              <div className="h-2 bg-[#334155] rounded-full overflow-hidden">
                <div
                  className={`h-full ${getColor(progress)} rounded-full transition-all duration-500`}
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
