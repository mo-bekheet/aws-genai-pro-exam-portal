export interface ComparisonMeta {
  slug: string;
  title: string;
  subtitle: string;
  domain: 'bedrock' | 'rag' | 'security' | 'inference' | 'storage' | 'compute';
  services: string[];
  recommendation: Record<string, string>;
  exam_tip: string;
  related: string[];
}

export interface ComparisonData {
  meta: ComparisonMeta;
  content: string;
}

export const DOMAIN_LABELS: Record<ComparisonMeta['domain'], string> = {
  bedrock: 'Bedrock',
  rag: 'RAG',
  security: 'Security',
  inference: 'Inference',
  storage: 'Storage',
  compute: 'Compute',
};

export const DOMAIN_COLORS: Record<ComparisonMeta['domain'], string> = {
  bedrock: '#6366f1',
  rag: '#38bdf8',
  security: '#ef4444',
  inference: '#ec4899',
  storage: '#22c55e',
  compute: '#f59e0b',
};