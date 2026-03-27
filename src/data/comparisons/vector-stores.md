---
title: "Vector Store Comparison"
slug: "vector-stores"
domain: "rag"
subtitle: "Choose the right vector database for your Bedrock Knowledge Base"
services: ["OpenSearch Serverless", "Aurora pgvector", "Pinecone", "Redis Enterprise"]
recommendation:
  "OpenSearch Serverless": "AWS-native | Existing OpenSearch users | Simple setup | Default KB option"
  "Aurora pgvector": "Existing PostgreSQL | SQL analytics | Hybrid storage | Enterprise databases"
  Pinecone: "Managed vector DB | Scale without ops | Cloud-agnostic | High performance"
  "Redis Enterprise": "Real-time use cases | Cache integration | Low latency | Session storage"
exam_tip: "OpenSearch Serverless is the default and most integrated option for AWS users. Vector databases are optimized for similarity search at scale."
related: ["rag-vs-fine-tuning-vs-cpt", "storage-options", "vpc-options"]
---

| Feature | OpenSearch | Aurora pgvector | Pinecone | Redis |
|---------|------------|-----------------|----------|-------|
| **Type** | Search engine + vector | Database + vector | Vector-native | Cache + vector |
| **AWS native** | ✅ Yes | ✅ Yes | ❌ No | ✅ Via ElastiCache |
| **Managed** | Serverless option | Fully managed | Fully managed | Fully managed |
| **Scalability** | High | Medium | Very high | High |
| **Latency** | Medium | Medium | Low | Very low |
| **Cost model** | Write/read units | Instance hours | Pod-based | Node-based |
| **Use case** | Search + RAG | SQL + vector | Pure vector | Real-time |
| **Setup complexity** | Low | Medium | Low | Low |