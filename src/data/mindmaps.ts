import { Domain } from '@/types';

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
}

export interface MindMapData {
  domain: Domain;
  label: string;
  color: string;
  nodes: MindMapNode[];
}

const bedrockNodes: MindMapNode[] = [
  // Root
  { id: 'root', label: 'Amazon Bedrock', level: 0, domain: 'bedrock', color: '#6366f1' },
  
  // Level 1
  { id: 'inference', label: 'Inference', level: 1, parentId: 'root', domain: 'bedrock', color: '#6366f1' },
  { id: 'customization', label: 'Customization', level: 1, parentId: 'root', domain: 'bedrock', color: '#8b5cf6' },
  { id: 'knowledge-bases', label: 'Knowledge Bases', level: 1, parentId: 'root', domain: 'bedrock', color: '#38bdf8' },
  { id: 'agents', label: 'Agents', level: 1, parentId: 'root', domain: 'bedrock', color: '#22c55e' },
  { id: 'guardrails', label: 'Guardrails', level: 1, parentId: 'root', domain: 'bedrock', color: '#f59e0b' },
  
  // Level 2 - Inference
  { id: 'on-demand', label: 'On-Demand', level: 2, parentId: 'inference', domain: 'bedrock', color: '#6366f1',
    description: 'Pay-per-token pricing for serverless model access. No capacity commitment required.',
    keyPoints: ['Pay only for tokens used', 'No provisioning needed', 'Ideal for variable workloads', 'Higher latency possible'],
    examTip: 'Fine-tuned models CANNOT use On-Demand — Provisioned Throughput is mandatory.',
    commonTrap: 'On-Demand seems cheaper but cannot serve custom models.' },
  { id: 'provisioned', label: 'Provisioned Throughput', level: 2, parentId: 'inference', domain: 'bedrock', color: '#6366f1',
    description: 'Reserved model capacity purchased as Model Units (MUs) for consistent throughput in production.',
    keyPoints: ['Required for fine-tuned models', 'Billed hourly at fixed rate', '1-month or 6-month commitment', 'Guarantees consistent latency'],
    examTip: 'Provisioned Throughput is the ONLY option for fine-tuned models.',
    commonTrap: 'You cannot convert On-Demand to Provisioned for custom models - must re-architect.' },
  { id: 'streaming', label: 'Streaming', level: 2, parentId: 'inference', domain: 'bedrock', color: '#6366f1',
    description: 'Real-time token-by-token response streaming for improved user experience.',
    keyPoints: ['Tokens stream as generated', 'Reduces perceived latency', 'Only available on certain models', 'Use for chatbots and assistants'] },
  
  // Level 2 - Customization
  { id: 'fine-tuning', label: 'Fine-tuning', level: 2, parentId: 'customization', domain: 'bedrock', color: '#8b5cf6',
    description: 'Customize base models with your labeled training data for specific tasks.',
    keyPoints: ['Requires labeled training data', 'Higher costs than prompting', 'Best for domain-specific tasks', 'Needs Provisioned Throughput'],
    examTip: 'Fine-tuning costs include training + inference - both require Provisioned Throughput.',
    commonTrap: 'Fine-tuning alone doesn\'t improve accuracy - you need quality training data.' },
  { id: 'continued-pretrain', label: 'Continued Pre-training', level: 2, parentId: 'customization', domain: 'bedrock', color: '#8b5cf6',
    description: 'Continue training base model on large unlabeled domain-specific corpus.',
    keyPoints: ['Uses unlabeled data', 'Expensive and time-consuming', 'Requires ML expertise', 'Less common than fine-tuning'] },
  { id: 'rlhf', label: 'RLHF', level: 2, parentId: 'customization', domain: 'bedrock', color: '#8b5cf6',
    description: 'Reinforcement Learning from Human Feedback - align model with human preferences.',
    keyPoints: ['Uses reward models', 'Complex to implement', 'Produces more helpful responses', 'Amazon Titan supports it'] },
  
  // Level 2 - Knowledge Bases
  { id: 'rag', label: 'RAG Pipeline', level: 2, parentId: 'knowledge-bases', domain: 'bedrock', color: '#38bdf8',
    description: 'Retrieval Augmented Generation - connect LLMs to your data sources.',
    keyPoints: ['Reduces hallucinations', 'Uses vector embeddings', 'Retrieves relevant context', 'More accurate responses'],
    examTip: 'RAG is the recommended pattern for grounding AI responses in your data.',
    commonTrap: 'RAG doesn\'t retrain the model - it just augments the prompt.' },
  { id: 'vector-store', label: 'Vector Store', level: 2, parentId: 'knowledge-bases', domain: 'bedrock', color: '#38bdf8',
    description: 'Storage for vector embeddings that enable semantic search.',
    keyPoints: ['Supports OpenSearch, Pinecone, etc.', 'Stores text as embeddings', 'Enables similarity search', 'Critical for RAG'],
    examTip: 'Vector databases are optimized for similarity search at scale.',
    commonTrap: 'Not all vector stores support the same embedding models or dimensions.' },
  { id: 'chunking', label: 'Chunking', level: 2, parentId: 'knowledge-bases', domain: 'bedrock', color: '#38bdf8',
    description: 'Breaking documents into smaller pieces for embedding generation.',
    keyPoints: ['Affects retrieval quality', 'Overlap between chunks helps', 'Size impacts accuracy', 'Context matters'],
    examTip: 'Chunk size affects both cost and accuracy - test different sizes for your data.',
    commonTrap: 'Larger chunks aren\'t always better - can include irrelevant context.' },
  { id: 'embeddings', label: 'Embeddings', level: 2, parentId: 'knowledge-bases', domain: 'bedrock', color: '#38bdf8',
    description: 'Numerical representations of text that capture semantic meaning.',
    keyPoints: ['Amazon Titan embeddings available', 'Convert text to vectors', 'Similar text = similar vectors', 'Dimension limits vary'] },
  
  // Level 2 - Agents
  { id: 'action-groups', label: 'Action Groups', level: 2, parentId: 'agents', domain: 'bedrock', color: '#22c55e',
    description: 'Define what actions your agent can take (API calls, Lambda functions).',
    keyPoints: ['Define allowed actions', 'Link to Lambda functions', 'Enable multi-step tasks', 'Secure by default'],
    examTip: 'Action Groups use IAM roles - follow least privilege for security.',
    commonTrap: 'Agents can only do what action groups allow - plan permissions carefully.' },
  { id: 'lambda-agent', label: 'Lambda Integration', level: 2, parentId: 'agents', domain: 'bedrock', color: '#22c55e',
    description: 'Connect Bedrock agents to AWS Lambda for compute and AWS service access.',
    keyPoints: ['Execute arbitrary code', 'Access AWS services', 'Process responses', 'Scale automatically'],
    examTip: 'Lambda integration enables agents to perform complex workflows and access databases.',
    commonTrap: 'Lambda functions have timeout limits - design for shorter operations.' },
  { id: 'session-context', label: 'Session Context', level: 2, parentId: 'agents', domain: 'bedrock', color: '#22c55e',
    description: 'Maintain conversation state and context across multiple turns.',
    keyPoints: ['Tracks conversation history', 'Enables memory', 'Session IDs manage state', 'Limits apply'],
    examTip: 'Session context is persisted in the agent - but you can also use Knowledge Bases.',
    commonTrap: 'Session memory is limited - very long conversations may lose context.' },
  
  // Level 2 - Guardrails
  { id: 'content-filters', label: 'Content Filters', level: 2, parentId: 'guardrails', domain: 'bedrock', color: '#f59e0b',
    description: 'Filter harmful content at input and output levels.',
    keyPoints: ['Block violence, hate, sexual content', 'Configurable thresholds', 'Filter both input and output', 'Pre-built filters available'],
    examTip: 'Guardrails work BEFORE the model processes - helps prevent harmful outputs.',
    commonTrap: 'Filters can have false positives - test with your specific use cases.' },
  { id: 'pii-redaction', label: 'PII Redaction', level: 2, parentId: 'guardrails', domain: 'bedrock', color: '#f59e0b',
    description: 'Detect and remove personally identifiable information from inputs/outputs.',
    keyPoints: ['Auto-detect PII types', 'Mask or block options', 'Supports common PII', 'Compliance friendly'],
    examTip: 'PII redaction helps meet GDPR, HIPAA, and other privacy regulations.',
    commonTrap: 'PII detection isn\'t 100% accurate - review critical data manually.' },
  { id: 'denied-topics', label: 'Denied Topics', level: 2, parentId: 'guardrails', domain: 'bedrock', color: '#f59e0b',
    description: 'Define topics the AI should refuse to discuss.',
    keyPoints: ['Custom topic definitions', 'Block defined topics', 'Custom response handling', 'Combines with filters'],
    examTip: 'Denied topics are exact-match blocking - use content filters for nuanced topics.',
    commonTrap: 'Users may try to bypass - combine multiple guardrail types.' },
];

const foundationsNodes: MindMapNode[] = [
  { id: 'root', label: 'AI/ML Foundations', level: 0, domain: 'foundations', color: '#38bdf8' },
  { id: 'ai-basics', label: 'AI Basics', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'machine-learning', label: 'Machine Learning', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'deep-learning', label: 'Deep Learning', level: 1, parentId: 'root', domain: 'foundations', color: '#38bdf8', description: 'Coming soon', keyPoints: ['Under development'] },
];

const lifecycleNodes: MindMapNode[] = [
  { id: 'root', label: 'GenAI Lifecycle', level: 0, domain: 'lifecycle', color: '#8b5cf6' },
  { id: 'planning', label: 'Planning', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'development', label: 'Development', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'deployment', label: 'Deployment', level: 1, parentId: 'root', domain: 'lifecycle', color: '#8b5cf6', description: 'Coming soon', keyPoints: ['Under development'] },
];

const responsibleAiNodes: MindMapNode[] = [
  { id: 'root', label: 'Responsible AI', level: 0, domain: 'responsible_ai', color: '#f59e0b' },
  { id: 'fairness', label: 'Fairness', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'transparency', label: 'Transparency', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'privacy', label: 'Privacy', level: 1, parentId: 'root', domain: 'responsible_ai', color: '#f59e0b', description: 'Coming soon', keyPoints: ['Under development'] },
];

const securityNodes: MindMapNode[] = [
  { id: 'root', label: 'Security & Compliance', level: 0, domain: 'security', color: '#ef4444' },
  { id: 'encryption', label: 'Encryption', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'access-control', label: 'Access Control', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon', keyPoints: ['Under development'] },
  { id: 'compliance', label: 'Compliance', level: 1, parentId: 'root', domain: 'security', color: '#ef4444', description: 'Coming soon', keyPoints: ['Under development'] },
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