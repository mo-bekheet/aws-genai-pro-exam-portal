---
title: "VPC Networking Options"
slug: "vpc-options"
domain: "security"
subtitle: "Compare AWS networking options for Bedrock and AI workloads"
services: ["VPC Endpoint", "NAT Gateway", "Internet Gateway"]
recommendation:
  "VPC Endpoint": "Private access to AWS services | No internet exposure | Cost-effective | Bedrock recommended"
  "NAT Gateway": "Outbound internet for private subnets | Need updates/downloads | One-way access"
  "Internet Gateway": "Bidirectional internet | Public workloads | Not recommended for AI apps"
exam_tip: "Use VPC Endpoint (PrivateLink) for Bedrock - data never leaves AWS network. IGW exposes resources to internet, NAT allows outbound only."
related: ["bedrock-vs-sagemaker", "storage-options", "vector-stores"]
---

| Feature | VPC Endpoint (PrivateLink) | NAT Gateway | Internet Gateway |
|---------|----------------------------|--------------|-------------------|
| **Direction** | One-way to AWS | Outbound only | Bidirectional |
| **Internet exposure** | ❌ None | ⚠️ Outbound only | ✅ Full |
| **Cost** | Per-hour + usage | Per-hour + data processed | Free |
| **Use case** | Private VPC access | Private subnet internet | Public access |
| **Security** | Highest | Medium | Lowest |
| **Bedrock support** | ✅ Recommended | ⚠️ Limited | ❌ Not recommended |