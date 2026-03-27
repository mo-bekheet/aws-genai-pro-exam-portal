# Amazon Bedrock — Professional Learning Module

## Concept

Amazon Bedrock is a fully managed service that provides access to high-performing foundation models (FMs) from leading AI companies through a single API. It enables you to build and scale generative AI applications without managing infrastructure, while maintaining security, privacy, and responsible AI controls.

Bedrock abstracts the complexity of hosting large language models (LLMs) and multimodal models, offering capabilities such as text generation, summarization, classification, embedding generation, image generation, and retrieval-augmented generation (RAG).

---

## Key Points

- **Fully managed**: No infrastructure provisioning or model hosting required
- **Multi-model access**: Models from Anthropic (Claude), Meta (Llama), Mistral, Cohere, Stability AI, and Amazon (Titan)
- **Private and secure**: Models run in your VPC; data is not used to train base models
- **Model customization**: Fine-tune models with your own data using continued pre-training or fine-tuning jobs
- **Knowledge Bases**: Native RAG implementation using vector stores (OpenSearch Serverless, Pinecone, Aurora, Redis)
- **Agents**: Orchestrate multi-step tasks using ReAct-style reasoning with tool use and API calls
- **Guardrails**: Content filtering, PII redaction, topic denial, and grounding checks
- **Model Evaluation**: Compare model outputs using built-in or custom metrics
- **Provisioned Throughput**: Reserve model capacity for consistent, high-volume workloads
- **Serverless inference**: On-demand invocation with pay-per-token pricing

---

## AWS Context

Amazon Bedrock integrates natively with the AWS ecosystem:

| Integration | Purpose |
|---|---|
| Amazon S3 | Store training data, knowledge base documents, model artifacts |
| AWS IAM | Fine-grained access control for model invocation and resource access |
| Amazon OpenSearch Serverless | Default vector store for Knowledge Bases |
| AWS Lambda | Custom action groups in Bedrock Agents |
| Amazon CloudWatch | Logging, monitoring, and invocation metrics |
| AWS PrivateLink | Private connectivity to Bedrock endpoints |
| Amazon Kendra | Alternative retrieval source for Knowledge Bases |
| AWS KMS | Encryption of data at rest and in transit |

Bedrock is a **regional service**. Model availability varies by region. Cross-region inference is supported for higher availability.

---

## Example

### Invoking a Foundation Model via API

```python
import boto3
import json

client = boto3.client("bedrock-runtime", region_name="us-east-1")

response = client.invoke_model(
    modelId="anthropic.claude-3-sonnet-20240229-v1:0",
    body=json.dumps({
        "anthropic_version": "bedrock-2023-05-31",
        "max_tokens": 512,
        "messages": [
            {"role": "user", "content": "Explain Amazon Bedrock in 3 sentences."}
        ]
    }),
    contentType="application/json",
    accept="application/json"
)

result = json.loads(response["body"].read())
print(result["content"][0]["text"])
```

### Creating a Knowledge Base (RAG)

```python
import boto3

bedrock_agent = boto3.client("bedrock-agent", region_name="us-east-1")

# Associate a data source (S3) with a Knowledge Base
response = bedrock_agent.create_data_source(
    knowledgeBaseId="KB_ID",
    name="product-docs",
    dataSourceConfiguration={
        "type": "S3",
        "s3Configuration": {
            "bucketArn": "arn:aws:s3:::my-knowledge-bucket"
        }
    }
)
```

---

## Exam Tips

- **AIP-C01 focus areas**: Model selection, RAG vs fine-tuning trade-offs, Agents architecture, Guardrails configuration, cost optimization with Provisioned Throughput
- Bedrock does **not** expose model weights — you cannot download or self-host models
- **Fine-tuning** requires labeled training data in JSONL format stored in S3
- **Continued pre-training** is for domain adaptation with unlabeled data; fine-tuning is for task-specific behavior
- Knowledge Bases use **chunking strategies** (fixed-size, semantic, hierarchical) — know the trade-offs
- **Guardrails** can be applied at invocation time and are independent of the model
- **Provisioned Throughput** is billed per model unit per hour, regardless of usage — use for predictable high-volume workloads
- Bedrock Agents use **ReAct prompting** internally; action groups map to Lambda functions or OpenAPI schemas
- **Model Evaluation** supports both automatic metrics (BERTScore, ROUGE) and human evaluation workflows
- Cross-region inference uses **inference profiles** — know this for availability and latency questions
