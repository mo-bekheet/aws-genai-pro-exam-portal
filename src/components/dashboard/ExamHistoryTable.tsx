"use client";

import { motion } from "framer-motion";

interface ExamHistoryItem {
  date: string;
  exam: string;
  score: number;
  passed: boolean;
}

interface ExamHistoryTableProps {
  history: ExamHistoryItem[];
  delay?: number;
}

export function ExamHistoryTable({ history, delay = 0 }: ExamHistoryTableProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-xl overflow-hidden"
    >
      <div className="px-5 py-4 border-b border-gray-200 dark:border-[#334155]">
        <h3 className="font-semibold text-gray-900 dark:text-white">Recent Exam History</h3>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-500 dark:text-[#94a3b8]">
              <th className="px-5 py-3 font-medium">Date</th>
              <th className="px-5 py-3 font-medium">Exam</th>
              <th className="px-5 py-3 font-medium">Score</th>
              <th className="px-5 py-3 font-medium">Result</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 dark:divide-[#334155]">
            {history.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-[#334155]/30 transition-colors">
                <td className="px-5 py-3 text-sm text-gray-600 dark:text-[#94a3b8]">{item.date}</td>
                <td className="px-5 py-3 text-sm font-medium text-gray-900 dark:text-white">{item.exam}</td>
                <td className="px-5 py-3 text-sm font-mono text-indigo-500 dark:text-[#6366f1]">{item.score}%</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                      item.passed
                        ? "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400"
                        : "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400"
                    }`}
                  >
                    {item.passed ? "✓ Pass" : "✗ Fail"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}