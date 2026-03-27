# Amazon Bedrock — AIP-C01 Learning Module

## Overview

This module covers Amazon Bedrock at the professional level, aligned with the AWS Certified AI Practitioner (AIP-C01) exam objectives. It addresses foundation model access, RAG architecture, model customization, agent orchestration, safety controls, and cost optimization patterns.

## What You Learn

- Core Amazon Bedrock capabilities and supported foundation model providers
- When to use RAG (Knowledge Bases) versus fine-tuning versus continued pre-training
- How Bedrock Agents orchestrate multi-step tasks using ReAct reasoning and action groups
- Guardrails configuration for content safety, PII redaction, and topic control
- Inference pricing models: on-demand versus Provisioned Throughput
- Security controls: IAM, PrivateLink, KMS encryption, and data privacy guarantees
- Model Evaluation workflows using automatic metrics and human reviewers
- Key differentiators between Amazon Bedrock and Amazon SageMaker

## How to Use

### Study Sequence

1. **lesson.md** — Read the full concept, key points, AWS context, and exam tips first to build foundational understanding
2. **comparison.md** — Study the Bedrock vs SageMaker and RAG vs Fine-tuning tables; these are high-frequency exam topics
3. **flashcards.json** — Use for active recall practice; cover the answer and test yourself on each question
4. **mindmap.json** — Load into a mind map tool (e.g., Obsidian, Markmap, or any JSON-to-mindmap renderer) to visualize service relationships
5. **questions.json** — Complete all 10 practice questions under timed conditions; review explanations for every answer, including correct ones

### File Reference

| File | Purpose | Format |
|---|---|---|
| `lesson.md` | Core concept, key points, examples, exam tips | Markdown |
| `flashcards.json` | Active recall cards with hints | JSON array |
| `questions.json` | 10 scenario-based MCQs with explanations | JSON array |
| `comparison.md` | Bedrock vs SageMaker; RAG vs Fine-tuning tables | Markdown |
| `mindmap.json` | Full service capability map | JSON tree |
| `README.md` | Module overview and usage guide | Markdown |

### Exam Focus Areas (AIP-C01)

- Selecting the appropriate Bedrock feature for a given use case (RAG, fine-tuning, agents, guardrails)
- Understanding data privacy and security controls
- Identifying cost optimization strategies (Provisioned Throughput vs on-demand)
- Differentiating Bedrock from SageMaker for generative AI workloads
- Recognizing when continued pre-training is appropriate versus fine-tuning
