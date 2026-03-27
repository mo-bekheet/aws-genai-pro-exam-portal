---
title: "Storage Options for AI"
slug: "storage-options"
domain: "storage"
subtitle: "Compare AWS storage services for AI/ML data and model storage"
services: ["S3", "EFS", "EBS"]
recommendation:
  S3: "Any data storage | Training data | Model artifacts | Large files | Any file type"
  EFS: "File-based access | Linux instances | Shared filesystem | Concurrent access"
  EBS: "High-performance | EC2 root/disk | Low-latency workloads | Block storage"
exam_tip: "S3 is the primary storage for AI/ML - use for training data, model artifacts, and any unstructured data. EFS for file-level access, EBS for EC2 block storage."
related: ["vpc-options", "bedrock-vs-sagemaker", "vector-stores"]
---

| Feature | S3 | EFS | EBS |
|---------|----|-----|-----|
| **Type** | Object storage | File storage | Block storage |
| **Access** | HTTP API | NFS mount | Block device |
| **Use case** | Data lake, training data | Shared file system | EC2 drives |
| **Performance** | High throughput | Moderate | High IOPS |
| **Pricing** | Per GB + requests | Per GB + throughput | Per GB + IOPS |
| **Scalability** | Unlimited | Unlimited | Limited to volume |
| **Availability** | 99.999999999% | 99.99% | 99.99% |
| **AI/ML primary** | ✅ Yes | ⚠️ Some cases | ⚠️ EC2 only |