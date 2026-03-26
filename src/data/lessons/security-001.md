---
id: SEC-L001
title: "Bedrock Security Features"
domain: security
difficulty: intermediate
estimated_time: 9
author: mo-bekheet
date: "2025-03-19"
order: 1
description: "Learn how to secure your generative AI applications using AWS Bedrock security features."
---

## Security in the Cloud

Security is a shared responsibility in AWS:

- **AWS** manages security *of* the cloud (infrastructure)
- **You** are responsible for security *in* the cloud (your data, access)

:::concept
**Key Concept:** Zero Trust Architecture

Zero Trust means "never trust, always verify." Every request must be authenticated and authorized, whether it comes from inside or outside your network. For AI applications, this means:
- Verify every API call
- Encrypt all data in transit and at rest
- Apply least privilege access
- Continuously monitor for threats
:::

## Bedrock Security Features

### Data Encryption

Amazon Bedrock provides robust encryption:

- **In transit** - TLS 1.2+ for all API communications
- **At rest** - AES-256 encryption for all stored data
- **Key management** - AWS-managed keys by default, or use your own KMS keys

```
User Request → HTTPS (TLS) → Bedrock API → Encrypted Storage
```

### Access Control

Control who can access Bedrock:

- **IAM** - Fine-grained permission control
- **Resource policies** - Control access to specific models
- **VPC endpoints** - Private access from your VPC
- **Cross-account access** - Securely share models between accounts

### Data Handling

Understand how your data is processed:

- **No model training** - AWS doesn't use your input to train base models
- **In-region processing** - Data stays in your region
- **Retention policies** - Configure data retention periods
- **Deletion capabilities** - Delete your data on request

:::analogy
Think of Bedrock security like a bank vault. Your data (the valuables) is:
- Locked (encrypted) inside
- Only accessible with proper ID (IAM)
- Monitored by cameras (logging)
- Protected by guards (AWS security team)
- You hold the key to your safe deposit box (your KMS keys)
:::

## Implementing Security Best Practices

### 1. Use IAM Roles

Instead of using root credentials, create IAM roles with specific permissions:

```json
{
  "Version": "2012-10-17",
  "Statement": [{
    "Effect": "Allow",
    "Action": "bedrock:InvokeModel",
    "Resource": "arn:aws:bedrock:us-east-1:123456789012:model/anthropic/claude-v2"
  }]
}
```

### 2. Enable VPC Endpoints

For private connectivity:

```bash
aws ec2 create-vpc-endpoint \
  --vpc-id vpc-12345678 \
  --service-name com.amazonaws.us-east-1.bedrock-runtime \
  --vpc-endpoint-type Interface
```

### 3. Implement Guardrails

Use Bedrock Guardrails to filter harmful content:

- **Content filters** - Block inappropriate content
- **Topic controls** - Prevent off-topic conversations
- **Word filters** - Block specific words/phrases
- **Contextual grounding** - Validate against your data sources

:::exam-tip
**EXAM TIP:** Remember that Bedrock Guardrails work at the input AND output level. You can filter both what users send and what the model returns.
:::

### 4. Enable Logging

Configure CloudTrail and CloudWatch:

- API call logging
- Input/output logging (with sensitivity controls)
- Performance metrics
- Cost tracking

:::warning
**COMMON TRAP:** Don't log sensitive data! Be careful about what you capture in your logs. Use data masking for PII and sensitive information.
:::

## Compliance Considerations

Bedrock supports various compliance frameworks:

| Framework | Status |
|-----------|--------|
| SOC 1/2/3 | ✅ Compliant |
| ISO 27001/27017/27018 | ✅ Compliant |
| FedRAMP Moderate | ✅ Available |
| HIPAA | ✅ Available (with BAA) |
| GDPR | ✅ Supported |

---

## Summary

Securing your Bedrock applications involves multiple layers:

1. **Encryption** - Protect data in transit and at rest
2. **Access control** - Use IAM for fine-grained permissions
3. **Network security** - Use VPC endpoints for private access
4. **Content filtering** - Implement guardrails
5. **Monitoring** - Enable comprehensive logging

Understanding these security features is essential for the AWS AI Practitioner exam and for building production-ready AI applications.

:::knowledge-check
{
  "question": "What type of encryption does Amazon Bedrock use for data at rest?",
  "options": [
    { "id": "A", "text": "AES-128" },
    { "id": "B", "text": "AES-256" },
    { "id": "C", "text": "RSA-2048" },
    { "id": "D", "text": "TLS 1.2" }
  ],
  "correctAnswer": "B",
  "explanation": "Amazon Bedrock uses AES-256 encryption for data at rest. This is the industry standard for secure encryption, providing strong protection for your stored data. AWS manages the encryption keys by default, but you can also use your own keys through AWS KMS."
}
:::