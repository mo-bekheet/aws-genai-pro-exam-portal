"use client";

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import type { MindMapNode } from '@/data/mindmaps';
import type { Domain } from '@/types';

interface DescriptionPanelProps {
  node: MindMapNode | null;
  isOpen: boolean;
  onClose: () => void;
}

const domainLabels: Record<Domain, string> = {
  bedrock: 'Amazon Bedrock',
  foundations: 'AI/ML Foundations',
  lifecycle: 'GenAI Lifecycle',
  responsible_ai: 'Responsible AI',
  security: 'Security & Compliance',
};

export function DescriptionPanel({ node, isOpen, onClose }: DescriptionPanelProps) {
  return (
    <AnimatePresence>
      {isOpen && node && (
        <motion.div
          initial={{ x: '100%', opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed right-0 top-0 h-full w-[360px] bg-white dark:bg-[#1e293b] border-l border-gray-200 dark:border-[#334155] z-50 overflow-y-auto"
          style={{ borderLeftColor: node.color, borderLeftWidth: '4px' }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white text-xl"
          >
            ✕
          </button>

          <div className="p-6 pt-16">
            {/* Badges */}
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2.5 py-1 bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 text-xs rounded-full">
                {domainLabels[node.domain]}
              </span>
              <span className="px-2.5 py-1 bg-amber-100 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400 text-xs rounded-full">
                {node.level === 0 ? 'Core' : node.level === 1 ? 'Intermediate' : 'Detail'}
              </span>
            </div>

            {/* Title */}
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              {node.label}
            </h2>

            {/* Description */}
            {node.description && node.description !== 'Coming soon' && (
              <div className="mb-6">
                <p className="text-gray-600 dark:text-[#94a3b8] text-sm leading-relaxed">
                  {node.description}
                </p>
              </div>
            )}

            {/* Coming Soon */}
            {node.description === 'Coming soon' && (
              <div className="mb-6 p-4 bg-gray-100 dark:bg-[#334155]/50 rounded-lg border border-gray-200 dark:border-[#334155]">
                <p className="text-amber-600 dark:text-amber-400 text-sm font-medium">🚧 Coming Soon</p>
                <p className="text-gray-600 dark:text-[#94a3b8] text-sm mt-2">
                  This mind map section is under development. Check back soon for detailed content!
                </p>
              </div>
            )}

            {/* Key Points */}
            {node.keyPoints && node.keyPoints.length > 0 && node.description !== 'Coming soon' && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Key Points</h3>
                <ul className="space-y-2">
                  {node.keyPoints.map((point, i) => (
                    <li key={i} className="flex items-start gap-2 text-gray-600 dark:text-[#94a3b8] text-sm">
                      <span className="text-indigo-500 dark:text-indigo-400 mt-1">•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Exam Tip */}
            {node.examTip && (
              <div className="mb-6 bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200 dark:border-indigo-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-indigo-600 dark:text-indigo-400 uppercase">🎯 Exam Tip</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{node.examTip}</p>
              </div>
            )}

            {/* Common Trap */}
            {node.commonTrap && (
              <div className="mb-6 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/30 rounded-lg p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-sm font-mono text-amber-600 dark:text-amber-400 uppercase">⚠️ Common Trap</span>
                </div>
                <p className="text-gray-700 dark:text-gray-300 text-sm">{node.commonTrap}</p>
              </div>
            )}

            {/* Action Buttons */}
            {node.description && node.description !== 'Coming soon' && (
              <div className="space-y-3 pt-4 border-t border-gray-200 dark:border-[#334155]">
                <Link
                  href={`/dashboard/lessons?domain=${node.domain}`}
                  className="flex items-center justify-center w-full px-4 py-2.5 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors font-medium"
                >
                  Study Lessons →
                </Link>
                <Link
                  href={`/dashboard/questions/practice?domain=${node.domain}`}
                  className="flex items-center justify-center w-full px-4 py-2.5 border border-gray-300 dark:border-[#334155] text-gray-700 dark:text-[#94a3b8] rounded-lg hover:border-indigo-500 hover:text-indigo-600 dark:hover:text-white transition-colors font-medium"
                >
                  Practice Questions →
                </Link>
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}