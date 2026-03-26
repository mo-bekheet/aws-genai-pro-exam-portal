"use client";

import { motion } from 'framer-motion';
import { KnowledgeCheck } from '@/components/lessons/KnowledgeCheck';

interface LessonSectionProps {
  section: {
    type: 'text' | 'concept' | 'analogy' | 'exam-tip' | 'warning' | 'diagram' | 'knowledge-check' | 'reveal';
    title?: string;
    content?: string;
    items?: string[];
    knowledgeCheck?: {
      question: string;
      options: { id: string; text: string }[];
      correctAnswer: string;
      explanation: string;
    };
  };
}

export function LessonSectionRenderer({ section }: LessonSectionProps) {
  switch (section.type) {
    case 'text':
      return (
        <div className="mb-6">
          {section.title && (
            <h2 className="text-xl font-semibold text-white dark:text-white mb-3">
              {section.title}
            </h2>
          )}
          {section.content && (
            <div className="text-gray-300 dark:text-gray-300 leading-relaxed" style={{ fontFamily: "'Inter', sans-serif", fontSize: '17px', lineHeight: '1.7' }}>
              {section.content.split('\n').map((paragraph, i) => (
                <p key={i} className="mb-4">{paragraph}</p>
              ))}
            </div>
          )}
          {section.items && (
            <ul className="list-disc list-inside space-y-2 text-gray-300 dark:text-gray-300">
              {section.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      );

    case 'concept':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#1e293b] border-l-4 border-indigo-500 rounded-r-lg p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-2xl">💡</span>
            <div>
              <h3 className="text-lg font-semibold text-white dark:text-white mb-2">
                {section.title || 'Key Concept'}
              </h3>
              <p className="text-gray-300 dark:text-gray-300">
                {section.content}
              </p>
            </div>
          </div>
        </motion.div>
      );

    case 'analogy':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-500/10 border border-indigo-500/30 rounded-lg p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-xl font-mono text-indigo-400 uppercase tracking-wide">
              💡 Analogy
            </span>
          </div>
          <p className="text-gray-300 dark:text-gray-300 mt-2">
            {section.content}
          </p>
        </motion.div>
      );

    case 'exam-tip':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-indigo-500/15 border border-indigo-500/30 rounded-lg p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-sm font-mono text-indigo-400 uppercase tracking-wide">
              🎯 EXAM TIP
            </span>
          </div>
          <p className="text-gray-300 dark:text-gray-300 mt-2">
            {section.content}
          </p>
        </motion.div>
      );

    case 'warning':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-5 mb-6"
        >
          <div className="flex items-start gap-3">
            <span className="text-sm font-mono text-amber-400 uppercase tracking-wide">
              ⚠️ COMMON TRAP
            </span>
          </div>
          <p className="text-gray-300 dark:text-gray-300 mt-2">
            {section.content}
          </p>
        </motion.div>
      );

    case 'diagram':
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0a0f1e] border border-[#334155] rounded-lg p-5 mb-6 font-mono text-sm overflow-x-auto"
        >
          <pre className="text-gray-300 dark:text-gray-300 whitespace-pre">
            {section.content}
          </pre>
        </motion.div>
      );

    case 'knowledge-check':
      if (section.knowledgeCheck) {
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-[#0f172a] border border-[#334155] rounded-lg p-6 mb-6"
          >
            <KnowledgeCheck
              question={section.knowledgeCheck.question}
              options={section.knowledgeCheck.options}
              correctAnswer={section.knowledgeCheck.correctAnswer}
              explanation={section.knowledgeCheck.explanation}
            />
          </motion.div>
        );
      }
      return null;

    default:
      return null;
  }
}