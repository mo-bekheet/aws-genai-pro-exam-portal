---
title: "Bedrock vs SageMaker"
slug: "bedrock-vs-sagemaker"
domain: "bedrock"
subtitle: "Compare AWS AI service options for building generative AI applications"
services: ["Bedrock", "SageMaker"]
recommendation:
  Bedrock: "Quick prototyping | Managed models | API-only access needed | No ML expertise"
  SageMaker: "Full ML pipeline control | Custom model hosting | Need model weights access | Advanced customization"
exam_tip: "Bedrock provides API access only - model weights are NOT accessible. SageMaker JumpStart allows weight access for some models."
related: ["rag-vs-fine-tuning-vs-cpt", "on-demand-vs-provisioned", "storage-options"]
---

| Feature | Bedrock | SageMaker |
|---------|---------|-----------|
| **Model access** | API only | API + weights |
| **Infrastructure** | Fully managed | Full control |
| **Model selection** | Pre-configured FMs | Custom + JumpStart |
| **Fine-tuning** | Built-in jobs | Manual pipeline |
| **Pricing** | Pay-per-token | Compute hours |
| **Use case** | App development | ML engineering |
| **Setup time** | Minutes | Hours/days |
| **Expertise needed** | Low | High |