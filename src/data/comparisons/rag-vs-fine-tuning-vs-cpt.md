---
title: "RAG vs Fine-tuning vs Continued Pre-training"
slug: "rag-vs-fine-tuning-vs-cpt"
domain: "bedrock"
subtitle: "When to use each Bedrock customization approach"
services: ["RAG", "Fine-tuning", "Continued Pre-training"]
recommendation:
  RAG: "No retraining available | Need current facts | Docs as source | Avoid hallucinations"
  Fine-tuning: "Need change model style | Have labeled data pairs | Consistent output format | Task-specific behavior"
  "Continued Pre-training": "Need domain vocabulary | Large unlabeled corpus | Domain adaptation | Learn new patterns"
exam_tip: "Trigger phrase 'no retraining + proprietary docs' = always RAG. These three appear together in ~30% of Bedrock exam questions."
related: ["on-demand-vs-provisioned", "bedrock-vs-sagemaker", "vector-stores"]
---

| Feature | RAG | Fine-tuning | Continued Pre-training |
|---------|-----|-------------|------------------------|
| **Requires retraining** | ❌ No | ✅ Yes | ✅ Yes |
| **Best for** | Factual Q&A, current info | Behavior/style change | Domain vocabulary |
| **Data type** | Any documents | Labeled pairs | Unlabeled text |
| **Hallucination risk** | 🟢 Low (grounded) | 🟡 Medium | 🟡 Medium |
| **Relative cost** | 🟢 Low | 🔴 High | 🔴 High |
| **Time to deploy** | Hours | Days | Days |
| **AWS service** | Bedrock Knowledge Bases | Bedrock Customization | Bedrock Customization |
| **Exam trigger** | "no retraining + my docs" | "change how model responds" | "domain-specific vocabulary" |