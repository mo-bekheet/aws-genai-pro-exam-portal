import { Lesson, Domain, Difficulty, KnowledgeCheck } from '@/types';

interface LessonData {
  id: string;
  slug: string;
  title: string;
  domain: Domain;
  difficulty: Difficulty;
  estimated_time: number;
  author: string;
  date: string;
  order: number;
  description: string;
  content: {
    type: 'text' | 'concept' | 'analogy' | 'exam-tip' | 'warning' | 'diagram' | 'knowledge-check';
    title?: string;
    content?: string;
    items?: string[];
    knowledgeCheck?: KnowledgeCheck;
  }[];
}

const lessonsData: LessonData[] = [
  {
    id: 'BED-L001',
    slug: 'bedrock-001',
    title: 'What is Amazon Bedrock?',
    domain: 'bedrock',
    difficulty: 'beginner',
    estimated_time: 8,
    author: 'mo-bekheet',
    date: '2025-03-15',
    order: 1,
    description: 'Learn the fundamentals of Amazon Bedrock, a fully managed service for building generative AI applications.',
    content: [
      { type: 'text', title: 'Introduction', content: 'Amazon Bedrock is a fully managed service that provides access to foundation models from leading AI companies through a single API. It enables you to build and scale generative AI applications without managing infrastructure.' },
      { type: 'text', title: 'What is Amazon Bedrock?', content: 'Amazon Bedrock offers a comprehensive suite of high-performing foundation models from providers including Amazon Titan, Anthropic Claude, AI21 Labs Jurassic, Cohere, Stability AI, and Meta Llama.' },
      { type: 'concept', title: 'Key Concept: Foundation Models', content: 'Foundation models are large language models (LLMs) trained on vast amounts of data, capable of performing a wide variety of tasks without task-specific training. They serve as the "foundation" for building specialized applications through fine-tuning or prompt engineering.' },
      { type: 'text', title: 'How Bedrock Works', content: 'When you use Bedrock, you interact with models through a simple API: 1) Choose a foundation model, 2) Provide input through the API, 3) Receive generated output.' },
      { type: 'analogy', content: 'Think of Amazon Bedrock like an app store for AI models. Instead of building your own AI model from scratch, you can simply "download" and use pre-built, powerful AI models through a unified interface.' },
      { type: 'text', title: 'Key Features', items: ['Fully Managed - No infrastructure to manage', 'Serverless - Pay only for what you use', 'Fine-tuning - Customize models with your own data', 'Knowledge Bases - Connect to your data for RAG', 'Agents - Build autonomous AI agents', 'Guardrails - Implement safety filters', 'Encryption - Data encrypted at rest and in transit'] },
      { type: 'exam-tip', content: 'Remember that Bedrock is a fully managed service - you don\'t provision instances, manage scaling, or handle infrastructure. This differentiates it from deploying models on EC2 or SageMaker endpoints.' },
      { type: 'warning', content: 'Don\'t confuse Bedrock with SageMaker. Bedrock is fully managed with serverless consumption, while SageMaker provides more control but requires managing your own infrastructure.' },
      { type: 'knowledge-check', knowledgeCheck: { question: 'Which statement best describes Amazon Bedrock?', options: [{ id: 'A', text: 'A service for training custom machine learning models from scratch' }, { id: 'B', text: 'A fully managed service providing access to foundation models through a single API' }, { id: 'C', text: 'A database service for storing training data for AI models' }, { id: 'D', text: 'A hardware service for running AI inference on dedicated chips' }], correctAnswer: 'B', explanation: 'Amazon Bedrock is a fully managed service that provides access to foundation models from multiple providers through a single API. It eliminates the need to manage infrastructure while providing a unified interface to various AI models.' } }
    ]
  },
  {
    id: 'FND-L001',
    slug: 'foundations-001',
    title: 'AI/ML Fundamentals',
    domain: 'foundations',
    difficulty: 'beginner',
    estimated_time: 12,
    author: 'mo-bekheet',
    date: '2025-03-16',
    order: 2,
    description: 'Master the core concepts of artificial intelligence and machine learning needed for the exam.',
    content: [
      { type: 'text', title: 'What is Artificial Intelligence?', content: 'Artificial Intelligence (AI) is the broad field of computer science focused on creating systems that can perform tasks that typically require human intelligence. These tasks include understanding natural language, recognizing patterns, making decisions, solving problems, and learning from experience.' },
      { type: 'concept', title: 'Key Concept: AI vs ML vs Deep Learning', content: 'AI is the broadest concept: machines that mimic human intelligence. Machine Learning (ML) is AI that learns from data without explicit programming. Deep Learning is ML using neural networks with many layers. Think of it as a hierarchy: Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence' },
      { type: 'text', title: 'Machine Learning Fundamentals', content: 'Machine learning is a subset of AI where systems learn from data and improve over time without being explicitly programmed. There are three main types: Supervised Learning (from labeled data), Unsupervised Learning (from unlabeled data), and Reinforcement Learning (through trial and error).' },
      { type: 'analogy', content: 'Imagine teaching a child to ride a bike: Supervised is telling them exactly what to do, Unsupervised is them figuring out patterns on their own, Reinforcement is learning from falling and getting back up.' },
      { type: 'text', title: 'Key ML Terminology', items: ['Training - The process of teaching a model using data', 'Inference - Using a trained model to make predictions', 'Features - Input variables used for prediction', 'Labels - The target variable we\'re predicting', 'Overfitting - Model learns training data too well, fails on new data', 'Underfitting - Model is too simple, fails on both'] },
      { type: 'exam-tip', content: 'For imbalanced datasets (e.g., fraud detection where fraud is rare), accuracy can be misleading. Use precision, recall, and F1 score instead.' },
      { type: 'warning', content: 'Don\'t confuse training with inference! Training happens once (or periodically), while inference happens every time you use the model to make predictions.' },
      { type: 'knowledge-check', knowledgeCheck: { question: 'Which type of machine learning uses labeled data to learn patterns?', options: [{ id: 'A', text: 'Supervised Learning' }, { id: 'B', text: 'Unsupervised Learning' }, { id: 'C', text: 'Reinforcement Learning' }, { id: 'D', text: 'Transfer Learning' }], correctAnswer: 'A', explanation: 'Supervised learning uses labeled data (where the correct answer is known) to train models. The model learns to map inputs to outputs by comparing its predictions to the known correct answers during training.' } }
    ]
  },
  {
    id: 'LIF-L001',
    slug: 'lifecycle-001',
    title: 'GenAI Application Lifecycle',
    domain: 'lifecycle',
    difficulty: 'intermediate',
    estimated_time: 10,
    author: 'mo-bekheet',
    date: '2025-03-17',
    order: 3,
    description: 'Understand the complete lifecycle of building and deploying generative AI applications.',
    content: [
      { type: 'text', title: 'Introduction', content: 'Building a generative AI application involves more than just calling an API. It requires a structured approach from concept to production through six key phases.' },
      { type: 'text', title: 'Phase 1: Problem Definition', content: 'Before writing any code, clearly define: What business problem are you solving? What type of AI is best suited? What are the success metrics? What constraints exist?' },
      { type: 'concept', title: 'Key Concept: When to Use GenAI', content: 'Rule of thumb: If a rule-based system or traditional ML can solve it, use that instead. Reserve generative AI for tasks requiring creativity, natural language, or handling unstructured data.' },
      { type: 'text', title: 'Phase 2: Data Preparation', content: 'Data is the foundation: Collect relevant data, Clean data (remove duplicates, handle missing values), Structure data (format for model input), Store data (databases, data lakes, vector stores).' },
      { type: 'analogy', content: 'Think of data preparation like preparing ingredients before cooking. You need fresh, clean, properly cut ingredients to make a great meal. Similarly, clean, well-structured data is essential for AI success.' },
      { type: 'text', title: 'Phase 3-6', items: ['Phase 3: Model Selection - Choose the right model for your use case', 'Phase 4: Application Development - Build the application layer', 'Phase 5: Evaluation & Testing - Validate your application', 'Phase 6: Deployment & Monitoring - Get your app to production'] },
      { type: 'exam-tip', content: 'Always test with real-world scenarios, not just artificial test cases. Include edge cases and failure modes in your test plan.' },
      { type: 'warning', content: 'Many teams skip proper monitoring in production. Without monitoring, you won\'t know if your model degrades over time (drift) or produces harmful outputs.' },
      { type: 'diagram', content: '┌─────────────────┐\n│  Problem        │\n│  Definition     │\n└────────┬────────┘\n         │\n         ▼\n┌─────────────────┐\n│  Data           │\n│  Preparation    │\n└────────┬────────┘\n         │\n         ▼\n┌─────────────────┐\n│  Model          │\n│  Selection      │\n└────────┬────────┘\n         │\n         ▼\n┌─────────────────┐\n│  Deployment     │\n│  & Monitoring   │\n└─────────────────┘' },
      { type: 'knowledge-check', knowledgeCheck: { question: 'Which phase of the GenAI lifecycle involves defining success metrics and business problems?', options: [{ id: 'A', text: 'Data Preparation' }, { id: 'B', text: 'Problem Definition' }, { id: 'C', text: 'Model Selection' }, { id: 'D', text: 'Deployment & Monitoring' }], correctAnswer: 'B', explanation: 'Problem Definition is the first phase where you clearly define the business problem, success metrics, constraints, and determine whether generative AI is the right solution.' } }
    ]
  },
  {
    id: 'RA-L001',
    slug: 'responsible-ai-001',
    title: 'Responsible AI Principles',
    domain: 'responsible_ai',
    difficulty: 'beginner',
    estimated_time: 10,
    author: 'mo-bekheet',
    date: '2025-03-18',
    order: 4,
    description: 'Learn the core principles of responsible AI and why they matter for AWS AI practitioners.',
    content: [
      { type: 'text', title: 'Why Responsible AI Matters', content: 'As AI becomes more powerful and widespread, ensuring it\'s used responsibly is crucial. Responsible AI encompasses practices that make AI systems fair, transparent, accountable, secure, and privacy-respecting.' },
      { type: 'concept', title: 'Key Concept: AI Governance', content: 'AI governance refers to frameworks, policies, and processes that ensure AI systems are developed and used responsibly. It involves multiple stakeholders including developers, business leaders, regulators, and end users.' },
      { type: 'text', title: 'AWS Responsible AI Principles', items: ['Fairness - Test for bias, use diverse training data', 'Explainability - Provide model documentation', 'Robustness - Handle edge cases gracefully', 'Privacy & Security - Protect user data', 'Transparency - Disclose when AI is used'] },
      { type: 'analogy', content: 'Think of responsible AI like building a code of ethics for a new technology. Just as doctors follow the Hippocratic Oath, AI practitioners should follow principles that ensure their creations benefit humanity while minimizing harm.' },
      { type: 'exam-tip', content: 'AWS provides tools like Amazon SageMaker Clarify for bias detection and model explainability. Know these tools for the exam!' },
      { type: 'warning', content: 'Don\'t assume AI is inherently fair. Bias can creep in from training data, model architecture, or how you define "success." Regular auditing is essential.' },
      { type: 'knowledge-check', knowledgeCheck: { question: 'Which principle of responsible AI focuses on ensuring AI treats all users fairly without discrimination?', options: [{ id: 'A', text: 'Explainability' }, { id: 'B', text: 'Fairness' }, { id: 'C', text: 'Transparency' }, { id: 'D', text: 'Robustness' }], correctAnswer: 'B', explanation: 'Fairness is the responsible AI principle that focuses on ensuring AI systems treat all users equally and don\'t discriminate against certain groups. This involves testing for bias, using diverse training data, and monitoring for disparate impact.' } }
    ]
  },
  {
    id: 'SEC-L001',
    slug: 'security-001',
    title: 'Bedrock Security Features',
    domain: 'security',
    difficulty: 'intermediate',
    estimated_time: 9,
    author: 'mo-bekheet',
    date: '2025-03-19',
    order: 5,
    description: 'Learn how to secure your generative AI applications using AWS Bedrock security features.',
    content: [
      { type: 'text', title: 'Security in the Cloud', content: 'Security is a shared responsibility in AWS: AWS manages security of the cloud (infrastructure), you are responsible for security in the cloud (your data, access).' },
      { type: 'concept', title: 'Key Concept: Zero Trust Architecture', content: 'Zero Trust means "never trust, always verify." Every request must be authenticated and authorized. For AI applications: verify every API call, encrypt all data, apply least privilege access, continuously monitor for threats.' },
      { type: 'text', title: 'Bedrock Security Features', items: ['Data Encryption - TLS in transit, AES-256 at rest', 'Access Control - IAM, resource policies, VPC endpoints', 'Data Handling - No model training, in-region processing', 'Retention policies - Configure data retention periods'] },
      { type: 'analogy', content: 'Think of Bedrock security like a bank vault. Your data is locked (encrypted), only accessible with proper ID (IAM), monitored (logging), protected by guards (AWS security), and you hold the key (KMS keys).' },
      { type: 'text', title: 'Implementation Best Practices', items: ['Use IAM roles with specific permissions', 'Enable VPC endpoints for private connectivity', 'Implement guardrails for content filtering', 'Enable CloudTrail and CloudWatch logging'] },
      { type: 'exam-tip', content: 'Remember that Bedrock Guardrails work at the input AND output level. You can filter both what users send and what the model returns.' },
      { type: 'warning', content: 'Don\'t log sensitive data! Be careful about what you capture in your logs. Use data masking for PII and sensitive information.' },
      { type: 'knowledge-check', knowledgeCheck: { question: 'What type of encryption does Amazon Bedrock use for data at rest?', options: [{ id: 'A', text: 'AES-128' }, { id: 'B', text: 'AES-256' }, { id: 'C', text: 'RSA-2048' }, { id: 'D', text: 'TLS 1.2' }], correctAnswer: 'B', explanation: 'Amazon Bedrock uses AES-256 encryption for data at rest. This is the industry standard for secure encryption, providing strong protection for stored data. You can use AWS-managed keys or your own keys through AWS KMS.' } }
    ]
  }
];

export function fetchLessons(): Lesson[] {
  return lessonsData as Lesson[];
}

export function getLessonsByDomain(lessons: Lesson[], domain: Domain | 'all'): Lesson[] {
  if (domain === 'all') return lessons;
  return lessons.filter(lesson => lesson.domain === domain);
}

export function getLessonBySlug(lessons: Lesson[], slug: string): Lesson | undefined {
  return lessons.find(lesson => lesson.slug === slug);
}

export function getAdjacentLessons(lessons: Lesson[], currentSlug: string): { prev: Lesson | null; next: Lesson | null } {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex(l => l.slug === currentSlug);
  
  return {
    prev: currentIndex > 0 ? sorted[currentIndex - 1] : null,
    next: currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null,
  };
}

export function getCompletedCount(lessons: Lesson[], completedIds: Set<string>): number {
  return lessons.filter(l => completedIds.has(l.id)).length;
}