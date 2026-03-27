import { ComparisonMeta, ComparisonData } from '@/types/comparison';
import { marked } from 'marked';

const comparisonsData: ComparisonMeta[] = [
  {
    slug: 'rag-vs-fine-tuning-vs-cpt',
    title: 'RAG vs Fine-tuning vs Continued Pre-training',
    subtitle: 'When to use each Bedrock customization approach',
    domain: 'bedrock',
    services: ['RAG', 'Fine-tuning', 'Continued Pre-training'],
    recommendation: {
      'RAG': 'No retraining available | Need current facts | Docs as source | Avoid hallucinations',
      'Fine-tuning': 'Need change model style | Have labeled data pairs | Consistent output format | Task-specific behavior',
      'Continued Pre-training': 'Need domain vocabulary | Large unlabeled corpus | Domain adaptation | Learn new patterns'
    },
    exam_tip: "Trigger phrase 'no retraining + proprietary docs' = always RAG. These three appear together in ~30% of Bedrock exam questions.",
    related: ['on-demand-vs-provisioned', 'bedrock-vs-sagemaker', 'vector-stores']
  },
  {
    slug: 'on-demand-vs-provisioned',
    title: 'On-Demand vs Provisioned Throughput',
    subtitle: 'Choose the right Bedrock inference option for your workload',
    domain: 'inference',
    services: ['On-Demand', 'Provisioned Throughput'],
    recommendation: {
      'On-Demand': 'Variable workloads | Development/testing | Low traffic | Pay-per-token flexibility',
      'Provisioned Throughput': 'High-volume production | Predictable latency | Fine-tuned models | Consistent throughput'
    },
    exam_tip: 'Fine-tuned models REQUIRE Provisioned Throughput - they cannot use On-Demand.',
    related: ['rag-vs-fine-tuning-vs-cpt', 'bedrock-vs-sagemaker', 'vector-stores']
  },
  {
    slug: 'bedrock-vs-sagemaker',
    title: 'Bedrock vs SageMaker',
    subtitle: 'Compare AWS AI service options for building generative AI applications',
    domain: 'bedrock',
    services: ['Bedrock', 'SageMaker'],
    recommendation: {
      'Bedrock': 'Quick prototyping | Managed models | API-only access needed | No ML expertise',
      'SageMaker': 'Full ML pipeline control | Custom model hosting | Need model weights access | Advanced customization'
    },
    exam_tip: 'Bedrock provides API access only - model weights are NOT accessible. SageMaker JumpStart allows weight access for some models.',
    related: ['rag-vs-fine-tuning-vs-cpt', 'on-demand-vs-provisioned', 'storage-options']
  },
  {
    slug: 'vector-stores',
    title: 'Vector Store Comparison',
    subtitle: 'Choose the right vector database for your Bedrock Knowledge Base',
    domain: 'rag',
    services: ['OpenSearch Serverless', 'Aurora pgvector', 'Pinecone', 'Redis Enterprise'],
    recommendation: {
      'OpenSearch Serverless': 'AWS-native | Existing OpenSearch users | Simple setup | Default KB option',
      'Aurora pgvector': 'Existing PostgreSQL | SQL analytics | Hybrid storage | Enterprise databases',
      'Pinecone': 'Managed vector DB | Scale without ops | Cloud-agnostic | High performance',
      'Redis Enterprise': 'Real-time use cases | Cache integration | Low latency | Session storage'
    },
    exam_tip: 'OpenSearch Serverless is the default and most integrated option for AWS users. Vector databases are optimized for similarity search at scale.',
    related: ['rag-vs-fine-tuning-vs-cpt', 'storage-options', 'vpc-options']
  },
  {
    slug: 'vpc-options',
    title: 'VPC Networking Options',
    subtitle: 'Compare AWS networking options for Bedrock and AI workloads',
    domain: 'security',
    services: ['VPC Endpoint', 'NAT Gateway', 'Internet Gateway'],
    recommendation: {
      'VPC Endpoint': 'Private access to AWS services | No internet exposure | Cost-effective | Bedrock recommended',
      'NAT Gateway': 'Outbound internet for private subnets | Need updates/downloads | One-way access',
      'Internet Gateway': 'Bidirectional internet | Public workloads | Not recommended for AI apps'
    },
    exam_tip: 'Use VPC Endpoint (PrivateLink) for Bedrock - data never leaves AWS network. IGW exposes resources to internet, NAT allows outbound only.',
    related: ['bedrock-vs-sagemaker', 'storage-options', 'vector-stores']
  },
  {
    slug: 'storage-options',
    title: 'Storage Options for AI',
    subtitle: 'Compare AWS storage services for AI/ML data and model storage',
    domain: 'storage',
    services: ['S3', 'EFS', 'EBS'],
    recommendation: {
      'S3': 'Any data storage | Training data | Model artifacts | Large files | Any file type',
      'EFS': 'File-based access | Linux instances | Shared filesystem | Concurrent access',
      'EBS': 'High-performance | EC2 root/disk | Low-latency workloads | Block storage'
    },
    exam_tip: 'S3 is the primary storage for AI/ML - use for training data, model artifacts, and any unstructured data. EFS for file-level access, EBS for EC2 block storage.',
    related: ['vpc-options', 'bedrock-vs-sagemaker', 'vector-stores']
  }
];

const comparisonContent: Record<string, string> = {
  'rag-vs-fine-tuning-vs-cpt': `| Feature | RAG | Fine-tuning | Continued Pre-training |
|---------|-----|-------------|------------------------|
| **Requires retraining** | ❌ No | ✅ Yes | ✅ Yes |
| **Best for** | Factual Q&A, current info | Behavior/style change | Domain vocabulary |
| **Data type** | Any documents | Labeled pairs | Unlabeled text |
| **Hallucination risk** | 🟢 Low (grounded) | 🟡 Medium | 🟡 Medium |
| **Relative cost** | 🟢 Low | 🔴 High | 🔴 High |
| **Time to deploy** | Hours | Days | Days |
| **AWS service** | Bedrock Knowledge Bases | Bedrock Customization | Bedrock Customization |
| **Exam trigger** | "no retraining + my docs" | "change how model responds" | "domain-specific vocabulary" |`,

  'on-demand-vs-provisioned': `| Feature | On-Demand | Provisioned Throughput |
|---------|-----------|------------------------|
| **Commitment** | None | 1-month or 6-month |
| **Pricing model** | Pay per token | Hourly per model unit |
| **Use case** | Variable traffic | Production steady load |
| **Fine-tuned models** | ❌ Not supported | ✅ Required |
| **Latency guarantee** | Variable | Consistent |
| **Scalability** | Automatic | Reserved capacity |
| **Cost predictability** | Variable | Fixed |`,

  'bedrock-vs-sagemaker': `| Feature | Bedrock | SageMaker |
|---------|---------|-----------|
| **Model access** | API only | API + weights |
| **Infrastructure** | Fully managed | Full control |
| **Model selection** | Pre-configured FMs | Custom + JumpStart |
| **Fine-tuning** | Built-in jobs | Manual pipeline |
| **Pricing** | Pay-per-token | Compute hours |
| **Use case** | App development | ML engineering |
| **Setup time** | Minutes | Hours/days |
| **Expertise needed** | Low | High |`,

  'vector-stores': `| Feature | OpenSearch | Aurora pgvector | Pinecone | Redis |
|---------|------------|-----------------|----------|-------|
| **Type** | Search engine + vector | Database + vector | Vector-native | Cache + vector |
| **AWS native** | ✅ Yes | ✅ Yes | ❌ No | ✅ Via ElastiCache |
| **Managed** | Serverless option | Fully managed | Fully managed | Fully managed |
| **Scalability** | High | Medium | Very high | High |
| **Latency** | Medium | Medium | Low | Very low |
| **Cost model** | Write/read units | Instance hours | Pod-based | Node-based |
| **Use case** | Search + RAG | SQL + vector | Pure vector | Real-time |
| **Setup complexity** | Low | Medium | Low | Low |`,

  'vpc-options': `| Feature | VPC Endpoint (PrivateLink) | NAT Gateway | Internet Gateway |
|---------|----------------------------|--------------|-------------------|
| **Direction** | One-way to AWS | Outbound only | Bidirectional |
| **Internet exposure** | ❌ None | ⚠️ Outbound only | ✅ Full |
| **Cost** | Per-hour + usage | Per-hour + data processed | Free |
| **Use case** | Private VPC access | Private subnet internet | Public access |
| **Security** | Highest | Medium | Lowest |
| **Bedrock support** | ✅ Recommended | ⚠️ Limited | ❌ Not recommended |`,

  'storage-options': `| Feature | S3 | EFS | EBS |
|---------|----|-----|-----|
| **Type** | Object storage | File storage | Block storage |
| **Access** | HTTP API | NFS mount | Block device |
| **Use case** | Data lake, training data | Shared file system | EC2 drives |
| **Performance** | High throughput | Moderate | High IOPS |
| **Pricing** | Per GB + requests | Per GB + throughput | Per GB + IOPS |
| **Scalability** | Unlimited | Unlimited | Limited to volume |
| **Availability** | 99.999999999% | 99.99% | 99.99% |
| **AI/ML primary** | ✅ Yes | ⚠️ Some cases | ⚠️ EC2 only |`
};

export function getAllComparisons(): ComparisonMeta[] {
  return comparisonsData;
}

export function getComparisonBySlug(slug: string): ComparisonData | null {
  const meta = comparisonsData.find(c => c.slug === slug);
  if (!meta) return null;
  
  const content = comparisonContent[slug] || '';
  return { meta, content };
}

export function filterComparisons(
  comparisons: ComparisonMeta[],
  searchQuery: string,
  domain: string
): ComparisonMeta[] {
  return comparisons.filter(comp => {
    const matchesDomain = domain === 'all' || comp.domain === domain;
    const matchesSearch = searchQuery === '' || 
      comp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comp.services.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesDomain && matchesSearch;
  });
}

export function getRelatedComparisons(slug: string): ComparisonMeta[] {
  const comparison = getComparisonBySlug(slug);
  if (!comparison) return [];
  
  return comparison.meta.related
    .map(relSlug => getComparisonBySlug(relSlug)?.meta)
    .filter((meta): meta is ComparisonMeta => meta !== null);
}