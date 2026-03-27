import { Domain } from '@/types';
import mindmapsData from './mindmaps/bedrock.json';

export interface MindMapNode {
  id: string;
  label: string;
  level: 0 | 1 | 2;
  parentId?: string;
  domain: Domain;
  color: string;
  description?: string;
  keyPoints?: string[];
  examTip?: string;
  commonTrap?: string;
  relatedLessons?: string[];
  type?: string;
}

export interface MindMapData {
  domain: Domain;
  label: string;
  color: string;
  nodes: MindMapNode[];
}

const domainColors: Record<string, string> = {
  bedrock: '#6366f1',
  foundations: '#38bdf8',
  lifecycle: '#8b5cf6',
  responsible_ai: '#f59e0b',
  security: '#ef4444',
};

function convertJsonToNodes(jsonNodes: any[], domain: Domain): MindMapNode[] {
  return jsonNodes.map((node, index) => {
    const level = node.parentId === null ? 0 : node.parentId.includes('bedrock') && !node.parentId.includes('-') ? 1 : 2;
    return {
      id: node.id,
      label: node.label,
      level: level as 0 | 1 | 2,
      parentId: node.parentId || undefined,
      domain,
      color: node.color || domainColors[domain],
      description: node.details || node.description,
    };
  });
}

const bedrockNodes = convertJsonToNodes(mindmapsData.nodes.filter(n => n.id === 'bedrock' || n.id.startsWith('fm-') || n.id.startsWith('customization') || n.id.startsWith('kb-') || n.id.startsWith('agents-') || n.id.startsWith('gr-') || n.id.startsWith('inf-') || n.id.startsWith('sec-') || n.id.startsWith('eval-') || n.parentId), 'bedrock');

const foundationsNodes: MindMapNode[] = [
  { id: 'root', label: 'AI/ML Foundations', level: 0, domain: 'foundations', color: '#38bdf8' },
  { id: 'ai-basics', label: 'AI Basics', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon' },
  { id: 'machine-learning', label: 'Machine Learning', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon' },
  { id: 'deep-learning', label: 'Deep Learning', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon' },
];

const lifecycleNodes: MindMapNode[] = [
  { id: 'root', label: 'GenAI Lifecycle', level: 0, domain: 'lifecycle', color: '#8b5cf6' },
  { id: 'planning', label: 'Planning', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon' },
  { id: 'development', label: 'Development', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon' },
  { id: 'deployment', label: 'Deployment', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon' },
];

const responsibleAiNodes: MindMapNode[] = [
  { id: 'root', label: 'Responsible AI', level: 0, domain: 'responsible_ai', color: '#f59e0b' },
  { id: 'fairness', label: 'Fairness', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon' },
  { id: 'transparency', label: 'Transparency', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon' },
  { id: 'privacy', label: 'Privacy', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon' },
];

const securityNodes: MindMapNode[] = [
  { id: 'root', label: 'Security & Compliance', level: 0, domain: 'security', color: '#ef4444' },
  { id: 'encryption', label: 'Encryption', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon' },
  { id: 'access-control', label: 'Access Control', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon' },
  { id: 'compliance', label: 'Compliance', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon' },
];

export const mindMapData: Record<Domain, MindMapData> = {
  bedrock: {
    domain: 'bedrock',
    label: 'Amazon Bedrock',
    color: '#6366f1',
    nodes: bedrockNodes,
  },
  foundations: {
    domain: 'foundations',
    label: 'AI/ML Foundations',
    color: '#38bdf8',
    nodes: foundationsNodes,
  },
  lifecycle: {
    domain: 'lifecycle',
    label: 'GenAI Application Lifecycle',
    color: '#8b5cf6',
    nodes: lifecycleNodes,
  },
  responsible_ai: {
    domain: 'responsible_ai',
    label: 'Responsible AI',
    color: '#f59e0b',
    nodes: responsibleAiNodes,
  },
  security: {
    domain: 'security',
    label: 'Security & Compliance',
    color: '#ef4444',
    nodes: securityNodes,
  },
};

export function getMindMapData(domain: Domain): MindMapData {
  return mindMapData[domain];
}

export function getNodeById(domain: Domain, nodeId: string): MindMapNode | undefined {
  return mindMapData[domain].nodes.find(n => n.id === nodeId);
}