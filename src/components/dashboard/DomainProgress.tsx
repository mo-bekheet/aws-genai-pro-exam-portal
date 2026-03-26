"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { DOMAIN_LABELS, DOMAIN_COLORS, Domain } from "@/types";

interface DomainProgressProps {
  domainScores: Array<{
    domain_name: Domain;
    correct: number;
    total: number;
  }>;
}

export function DomainProgress({ domainScores }: DomainProgressProps) {
  const [animatedProgress, setAnimatedProgress] = useState<Record<string, number>>({});

  const domains = Object.keys(DOMAIN_LABELS) as Domain[];

  const getProgress = (domain: Domain) => {
    const score = domainScores.find(s => s.domain_name === domain);
    if (!score || score.total === 0) return 0;
    return Math.round((score.correct / score.total) * 100);
  };

  const getColor = (progress: number) => {
    if (progress >= 70) return "bg-green-500"; // Green over 70%
    if (progress >= 40) return "bg-amber-500";  // Amber 40-70%
    return "bg-red-500";                        // Red under 40%
  };

  useEffect(() => {
    const progressMap = domains.reduce((acc, domain) => {
      acc[domain] = getProgress(domain);
      return acc;
    }, {} as Record<string, number>);
    
    const timeouts = domains.map((domain, index) => {
      return setTimeout(() => {
        setAnimatedProgress(prev => ({ ...prev, [domain]: progressMap[domain] }));
      }, index * 100);
    });

    return () => timeouts.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domainScores]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl p-6 hover:border-indigo-500 dark:hover:border-[#6366f1] transition-all duration-300 hover:shadow-lg dark:hover:shadow-[#6366f1]/10"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">📊 Domain Progress</h3>
      <div className="space-y-4">
        {domains.map((domain, index) => {
          const progress = animatedProgress[domain] ?? 0;
          return (
            <motion.div 
              key={domain}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm text-gray-600 dark:text-[#94a3b8]">{DOMAIN_LABELS[domain]}</span>
                <motion.span 
                  className="text-sm font-medium"
                  style={{ color: DOMAIN_COLORS[domain] }}
                  key={progress}
                  initial={{ scale: 1.2 }}
                  animate={{ scale: 1 }}
                >
                  {progress}%
                </motion.span>
              </div>
              <div className="h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${getColor(progress)} rounded-full`}
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
