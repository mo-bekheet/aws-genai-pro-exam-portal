---
id: BED-L001
title: "What is Amazon Bedrock?"
domain: bedrock
difficulty: beginner
estimated_time: 8
author: mo-bekheet
date: "2025-03-15"
order: 1
description: "Learn the fundamentals of Amazon Bedrock, a fully managed service for building generative AI applications."
---

## Introduction

Amazon Bedrock is a fully managed service that provides access to foundation models from leading AI companies through a single API. It enables you to build and scale generative AI applications without managing infrastructure.

## What is Amazon Bedrock?

Amazon Bedrock offers a comprehensive suite of high-performing foundation models from providers including:

- **Amazon Titan** - Models developed by Amazon
- **Anthropic** - Claude family of models
- **AI21 Labs** - Jurassic family of models
- **Cohere** - Command and Embed models
- **Stability AI** - Stable Diffusion for image generation
- **Meta** - Llama models

:::concept
**Key Concept:** Foundation Models

Foundation models are large language models (LLMs) trained on vast amounts of data, capable of performing a wide variety of tasks without task-specific training. They serve as the "foundation" for building specialized applications through fine-tuning or prompt engineering.
:::

## How Bedrock Works

When you use Bedrock, you interact with models through a simple API. Here's the basic flow:

1. Choose a foundation model from the available options
2. Provide input through the API (text, images, etc.)
3. Receive generated output (text, images, predictions)

:::analogy
Think of Amazon Bedrock like an app store for AI models. Instead of building your own AI model from scratch (which would be like building a smartphone from components), you can simply "download" and use pre-built, powerful AI models through a unified interface.
:::

## Key Features

- **Fully Managed** - No infrastructure to manage
- **Serverless** - Pay only for what you use
- **Fine-tuning** - Customize models with your own data
- **Knowledge Bases** - Connect to your data for RAG
- **Agents** - Build autonomous AI agents
- **Guardrails** - Implement safety filters
- **Encryption** - Data encrypted at rest and in transit

## Use Cases

Amazon Bedrock powers various generative AI applications:

- **Text Generation** - Content creation, summarization, Q&A
- **Image Generation** - Creating images from text descriptions
- **Chatbots** - Building conversational AI assistants
- **Code Assistant** - Helping developers write code
- **Data Extraction** - Processing documents and forms

:::exam-tip
**EXAM TIP:** Remember that Bedrock is a fully managed service - you don't provision instances, manage scaling, or handle infrastructure. This differentiates it from deploying models on EC2 or SageMaker endpoints.
:::

## Pricing Model

Bedrock pricing is based on:

- **Token-based pricing** - Pay per million input/output tokens
- **On-demand** - Pay per request, no commitment
- **Provisioned throughput** - Reserved capacity for steady usage
- **Fine-tuning costs** - Additional charges for custom model training

:::warning
**COMMON TRAP:** Don't confuse Bedrock with SageMaker. Bedrock is fully managed with serverless consumption, while SageMaker provides more control but requires managing your own infrastructure.
:::

## Getting Started

To use Amazon Bedrock:

1. Sign in to the AWS Management Console
2. Navigate to Amazon Bedrock
3. Request model access (some models require approval)
4. Use the console, CLI, or SDK to interact with models

---

## Summary

Amazon Bedrock simplifies building generative AI applications by providing:

- Access to multiple foundation models through one API
- Fully managed infrastructure
- Enterprise-grade security and compliance
- Flexible customization options

This foundational understanding will help you as you explore more advanced Bedrock features and prepare for the AWS AI Practitioner exam.

:::knowledge-check
{
  "question": "Which statement best describes Amazon Bedrock?",
  "options": [
    { "id": "A", "text": "A service for training custom machine learning models from scratch" },
    { "id": "B", "text": "A fully managed service providing access to foundation models through a single API" },
    { "id": "C", "text": "A database service for storing training data for AI models" },
    { "id": "D", "text": "A hardware service for running AI inference on dedicated chips" }
  ],
  "correctAnswer": "B",
  "explanation": "Amazon Bedrock is a fully managed service that provides access to foundation models from multiple providers through a single API. It eliminates the need to manage infrastructure while providing a unified interface to various AI models."
}
:::