# Comparison Reference — Amazon Bedrock

## Amazon Bedrock vs Amazon SageMaker

| Dimension | Amazon Bedrock | Amazon SageMaker |
|---|---|---|
| Primary Use Case | Build generative AI apps using pre-built foundation models | Build, train, and deploy custom ML models at scale |
| Infrastructure Management | Fully managed — no servers, clusters, or endpoints to configure | Managed but requires configuration of instances, endpoints, and pipelines |
| Model Access | API-based access to third-party and Amazon FMs (no weight access) | Access to open-weight models via JumpStart; bring your own model |
| Model Customization | Fine-tuning and continued pre-training via managed jobs | Full training pipeline: data prep, distributed training, hyperparameter tuning |
| RAG Support | Native Knowledge Bases with managed vector store integration | Custom implementation required (e.g., using Kendra or OpenSearch) |
| Agent Orchestration | Native Bedrock Agents with ReAct reasoning | No native agent framework; use Step Functions or custom code |
| Pricing Model | Pay-per-token (on-demand) or Provisioned Throughput (reserved) | Pay per instance-hour for training and hosting endpoints |
| Data Privacy | Data not used to train base models; PrivateLink supported | Customer controls all data; models run in customer account |
| Target User | Application developers, ML engineers building GenAI apps | Data scientists, ML engineers building custom models |
| Time to Production | Hours (API integration) | Days to weeks (training pipeline setup) |
| Guardrails / Safety | Native Guardrails (content filtering, PII, topic denial) | Custom implementation required |
| Model Evaluation | Built-in evaluation jobs with automatic and human metrics | Custom evaluation pipelines using SageMaker Experiments |
| Compliance | SOC, ISO, HIPAA eligible, GDPR | SOC, ISO, HIPAA eligible, GDPR |

**Decision Rule**: Use Bedrock when you want to consume foundation models quickly with minimal infrastructure. Use SageMaker when you need full control over training, custom architectures, or non-generative ML workloads.

---

## RAG vs Fine-Tuning

| Dimension | Retrieval-Augmented Generation (RAG) | Fine-Tuning |
|---|---|---|
| Definition | Retrieve relevant documents at inference time and inject into prompt | Update model weights using labeled training data to change model behavior |
| When to Use | Knowledge is dynamic, proprietary, or frequently updated | Task behavior, tone, format, or style must be consistently embedded |
| Data Requirement | Unstructured documents (PDF, HTML, text) in a vector store | Labeled JSONL prompt-completion pairs stored in S3 |
| Knowledge Freshness | Real-time — re-sync knowledge base as data changes | Static — requires retraining job for each knowledge update |
| Source Attribution | Supports citing source documents in responses | Cannot cite sources; knowledge is embedded in weights |
| Infrastructure | Vector store + embedding model + retrieval pipeline | Training job (compute-intensive, time-consuming) |
| Cost Profile | Per-query retrieval + inference tokens | One-time training cost + ongoing inference cost |
| Hallucination Risk | Lower — responses grounded in retrieved documents | Higher — model may confabulate if training data is insufficient |
| Context Window Impact | Consumes tokens for retrieved context | No additional context window usage |
| Model Modification | Model weights unchanged | Model weights updated |
| Latency | Slightly higher due to retrieval step | Same as base model inference |
| Best For | Q&A over documents, knowledge lookup, customer support | Sentiment classification, code generation style, domain tone adaptation |
| Bedrock Implementation | Knowledge Bases (managed RAG pipeline) | Fine-tuning jobs via Bedrock console or API |

**Decision Rule**: Default to RAG for knowledge-intensive tasks with changing data. Use fine-tuning when the model needs to learn a consistent behavior or style that cannot be achieved through prompting alone.

---

## Quick Reference: When to Use Each Approach

| Scenario | Recommended Approach |
|---|---|
| Answer questions from internal HR policy documents | RAG (Knowledge Bases) |
| Generate customer emails in brand voice consistently | Fine-tuning |
| Real-time order status lookup | Bedrock Agents + Action Groups |
| Adapt model to medical terminology (unlabeled data) | Continued Pre-training |
| Filter competitor mentions from all responses | Guardrails (topic denial) |
| High-volume batch processing with consistent latency | Provisioned Throughput |
| Compare two models on summarization quality | Model Evaluation |
| Build a multi-step research assistant | Bedrock Agents |
