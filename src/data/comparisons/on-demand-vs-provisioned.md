---
title: "On-Demand vs Provisioned Throughput"
slug: "on-demand-vs-provisioned"
domain: "inference"
subtitle: "Choose the right Bedrock inference option for your workload"
services: ["On-Demand", "Provisioned Throughput"]
recommendation:
  "On-Demand": "Variable workloads | Development/testing | Low traffic | Pay-per-token flexibility"
  "Provisioned Throughput": "High-volume production | Predictable latency | Fine-tuned models | Consistent throughput"
exam_tip: "Fine-tuned models REQUIRE Provisioned Throughput - they cannot use On-Demand."
related: ["rag-vs-fine-tuning-vs-cpt", "bedrock-vs-sagemaker", "vector-stores"]
---

| Feature | On-Demand | Provisioned Throughput |
|---------|-----------|------------------------|
| **Commitment** | None | 1-month or 6-month |
| **Pricing model** | Pay per token | Hourly per model unit |
| **Use case** | Variable traffic | Production steady load |
| **Fine-tuned models** | ❌ Not supported | ✅ Required |
| **Latency guarantee** | Variable | Consistent |
| **Scalability** | Automatic | Reserved capacity |
| **Cost predictability** | Variable | Fixed |