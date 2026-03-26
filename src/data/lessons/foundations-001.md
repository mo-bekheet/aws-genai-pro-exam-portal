---
id: FND-L001
title: "AI/ML Fundamentals"
domain: foundations
difficulty: beginner
estimated_time: 12
author: mo-bekheet
date: "2025-03-16"
order: 1
description: "Master the core concepts of artificial intelligence and machine learning needed for the exam."
---

## What is Artificial Intelligence?

Artificial Intelligence (AI) is the broad field of computer science focused on creating systems that can perform tasks that typically require human intelligence. These tasks include:

- Understanding natural language
- Recognizing patterns
- Making decisions
- Solving problems
- Learning from experience

:::concept
**Key Concept:** AI vs Machine Learning vs Deep Learning

- **AI** - The broadest concept: machines that mimic human intelligence
- **Machine Learning (ML)** - AI that learns from data without explicit programming
- **Deep Learning** - ML using neural networks with many layers (hence "deep")

Think of it as a hierarchy: Deep Learning ⊂ Machine Learning ⊂ Artificial Intelligence
:::

## Machine Learning Fundamentals

Machine learning is a subset of AI where systems learn from data and improve over time without being explicitly programmed. There are three main types:

### 1. Supervised Learning

Learning from labeled data where the correct answer is known during training.

**Examples:**
- Email spam classification
- House price prediction
- Medical diagnosis

### 2. Unsupervised Learning

Learning from unlabeled data to find patterns or groupings.

**Examples:**
- Customer segmentation
- Anomaly detection
- Topic modeling

### 3. Reinforcement Learning

Learning through trial and error with rewards and penalties.

**Examples:**
- Game-playing AI
- Robotics navigation
- Resource management

:::analogy
Imagine teaching a child to ride a bike:
- **Supervised:** You tell them exactly what to do at each step
- **Unsupervised:** They figure out patterns on their own (like balancing)
- **Reinforcement:** They learn from falling and getting back up (trial and error)
:::

## Key ML Terminology

### Training vs Inference

- **Training** - The process of teaching a model using data
- **Inference** - Using a trained model to make predictions

:::warning
**COMMON TRAP:** Don't confuse training with inference! Training happens once (or periodically), while inference happens every time you use the model to make predictions.
:::

### Features and Labels

- **Features** - Input variables used for prediction (X)
- **Label** - The target variable we're predicting (Y)

### Overfitting and Underfitting

- **Overfitting** - Model learns training data too well, fails on new data
- **Underfitting** - Model is too simple, fails on both training and new data

## Model Evaluation Metrics

How do we know if a model is good? We use various metrics:

- **Accuracy** - Percentage of correct predictions
- **Precision** - Of predicted positives, how many are correct
- **Recall** - Of actual positives, how many did we find
- **F1 Score** - Harmonic mean of precision and recall
- **ROC-AUC** - Area under the receiver operating characteristic curve

:::exam-tip
**EXAM TIP:** For imbalanced datasets (e.g., fraud detection where fraud is rare), accuracy can be misleading. Use precision, recall, and F1 score instead.
:::

## Types of Machine Learning Problems

| Problem Type | Description | Example |
|--------------|-------------|---------|
| Classification | Predict category | Spam/not spam |
| Regression | Predict number | House price |
| Clustering | Group similar items | Customer segments |
| Recommendation | Suggest items | Product recommendations |
| Sequence | Predict sequence | Text generation |

---

## Summary

Understanding AI/ML fundamentals is essential for the exam:

1. AI is the broad field; ML is a subset that learns from data
2. Three main types: supervised, unsupervised, and reinforcement learning
3. Training builds the model; inference uses it for predictions
4. Choose metrics based on your problem type and data characteristics

:::knowledge-check
{
  "question": "Which type of machine learning uses labeled data to learn patterns?",
  "options": [
    { "id": "A", "text": "Supervised Learning" },
    { "id": "B", "text": "Unsupervised Learning" },
    { "id": "C", "text": "Reinforcement Learning" },
    { "id": "D", "text": "Transfer Learning" }
  ],
  "correctAnswer": "A",
  "explanation": "Supervised learning uses labeled data (where the correct answer is known) to train models. The model learns to map inputs to outputs by comparing its predictions to the known correct answers during training."
}
:::