"use client";

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ComparisonData, DOMAIN_LABELS, DOMAIN_COLORS } from '@/types/comparison';

interface ComparisonDetailProps {
  comparison: ComparisonData;
}

const SERVICE_COLORS: Record<string, string> = {
  'RAG': '#6366f1',
  'Fine-tuning': '#8b5cf6',
  'Continued Pre-training': '#38bdf8',
  'Fine-tuning CPT': '#38bdf8',
  'On-Demand': '#6366f1',
  'Provisioned Throughput': '#8b5cf6',
  'Bedrock': '#6366f1',
  'SageMaker': '#22c55e',
  'OpenSearch Serverless': '#6366f1',
  'Aurora pgvector': '#22c55e',
  'Pinecone': '#38bdf8',
  'Redis Enterprise': '#ef4444',
  'VPC Endpoint': '#6366f1',
  'NAT Gateway': '#f59e0b',
  'Internet Gateway': '#ef4444',
  'S3': '#22c55e',
  'EFS': '#f59e0b',
  'EBS': '#ec4899',
};

export function ComparisonDetail({ comparison }: ComparisonDetailProps) {
  const router = useRouter();
  const { meta, content } = comparison;
  const color = DOMAIN_COLORS[meta.domain];
  
  const handleBack = () => {
    router.push('/dashboard/compare');
  };

  const parseMarkdownTable = (md: string) => {
    const lines = md.trim().split('\n').filter(line => line.trim());
    if (lines.length < 2) return null;
    
    const headers = lines[0].split('|').map(h => h.trim()).filter(h => h);
    const rows = lines.slice(2).map(line => 
      line.split('|').map(cell => cell.trim()).filter(cell => cell)
    );
    
    return { headers, rows };
  };

  const tableData = parseMarkdownTable(content);

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div className="max-w-6xl mx-auto">
      {/* Back Button */}
      <button 
        onClick={handleBack}
        className="flex items-center gap-2 text-sm text-gray-600 dark:text-[#94a3b8] hover:text-[#6366f1] mb-6"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        Back to comparisons
      </button>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {meta.title}
          </h1>
          <div className="flex items-center gap-3">
            <span 
              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
              style={{ backgroundColor: `${color}20`, color }}
            >
              {DOMAIN_LABELS[meta.domain]}
            </span>
            <span className="text-sm text-gray-500 dark:text-[#64748b]">
              {meta.services.length} services
            </span>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <button
            onClick={copyLink}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 dark:text-[#94a3b8] border border-gray-300 dark:border-[#334155] rounded-lg hover:border-[#6366f1] hover:text-[#6366f1] transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
            Copy link
          </button>
        </div>
      </div>

      {/* Table */}
      {tableData && (
        <div className="overflow-x-auto mb-8">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr>
                <th className="text-left p-3 bg-gray-50 dark:bg-[#1e293b] border-b border-gray-200 dark:border-[#334155] text-sm font-medium text-gray-500 dark:text-[#94a3b8] w-40">
                  Feature
                </th>
                {meta.services.map((service, idx) => {
                  const serviceColor = SERVICE_COLORS[service] || '#6366f1';
                  return (
                    <th 
                      key={service}
                      className="p-3 border-b border-gray-200 dark:border-[#334155] text-center"
                      style={{ backgroundColor: `${serviceColor}15` }}
                    >
                      <div className="text-sm font-semibold" style={{ color: serviceColor }}>
                        {service}
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {tableData.rows.map((row, rowIdx) => (
                <tr 
                  key={rowIdx}
                  className={rowIdx % 2 === 0 ? 'bg-white dark:bg-[#0a0f1e]' : 'bg-gray-50 dark:bg-[#111827]'}
                >
                  <td className="p-3 text-sm text-gray-500 dark:text-[#94a3b8] border-r border-gray-100 dark:border-[#334155]">
                    {row[0]}
                  </td>
                  {row.slice(1).map((cell, cellIdx) => {
                    const isEmoji = cell.includes('✅') || cell.includes('❌') || cell.includes('🟢') || cell.includes('🟡') || cell.includes('🔴');
                    return (
                      <td 
                        key={cellIdx}
                        className="p-3 text-sm text-center text-gray-900 dark:text-white border-r border-gray-100 dark:border-[#334155] last:border-r-0"
                      >
                        <span className={isEmoji ? 'font-mono' : ''}>{cell}</span>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Recommendation Card */}
      <div className="mb-8 p-6 bg-white dark:bg-[#1e293b] border-l-4 border-l-[#22c55e] rounded-r-xl border border-gray-200 dark:border-[#334155]">
        <h3 className="text-sm font-semibold text-[#22c55e] uppercase tracking-wide mb-4">
          ✅ When to use each
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {meta.services.map((service, idx) => {
            const serviceColor = SERVICE_COLORS[service] || '#6366f1';
            const recommendation = meta.recommendation[service] || '';
            const points = recommendation.split(' | ');
            
            return (
              <div 
                key={service}
                className="p-4 rounded-lg"
                style={{ backgroundColor: `${serviceColor}10` }}
              >
                <h4 className="font-semibold text-sm mb-2" style={{ color: serviceColor }}>
                  Use {service} when
                </h4>
                <ul className="space-y-1">
                  {points.map((point, pIdx) => (
                    <li key={pIdx} className="text-sm text-gray-700 dark:text-[#e2e8f0]">
                      • {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Exam Tip Card */}
      <div className="p-6 bg-white dark:bg-[#1e293b] border-l-4 border-l-[#6366f1] rounded-r-xl border border-gray-200 dark:border-[#334155]">
        <h3 className="text-sm font-semibold text-[#6366f1] uppercase tracking-wide mb-3">
          🎯 Exam Tip
        </h3>
        <p className="text-sm text-gray-700 dark:text-[#e2e8f0]">
          {meta.exam_tip}
        </p>
      </div>
    </div>
  );
}