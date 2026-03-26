"use client";

import { useState } from "react";
import { FlipCard } from "@/components/flashcards/FlipCard";
import { Flashcard as FlashcardType, DOMAIN_LABELS, Domain } from "@/types";

const mockFlashcards: FlashcardType[] = [
  {
    id: "BED-001",
    domain: "bedrock",
    type: "concept",
    difficulty: "easy",
    front: {
      question: "What is Amazon Bedrock?",
      hint: "Fully managed service",
      emoji: "🪨",
    },
    back: {
      answer: "A fully managed service that offers a choice of high-performing foundation models from leading AI companies.",
      key_points: [
        "Fully managed service",
        "Choice of foundation models",
        "Serverless experience",
        "Build generative AI apps without managing infrastructure",
      ],
      mnemonic: "BEDROCK = Building Everything Directly On Reliable AWS Cloud",
      analogy: "Like a restaurant where you order from a menu instead of cooking from scratch",
    },
    exam_tip: "Focus on understanding Bedrock as a serverless ML platform.",
    related_cards: ["BED-002", "SEC-001"],
    tags: ["bedrock", " foundational-models", "aws"],
  },
  {
    id: "BED-002",
    domain: "bedrock",
    type: "comparison",
    difficulty: "medium",
    front: {
      question: "Compare Amazon Bedrock with Amazon SageMaker.",
      hint: "Managed vs Custom",
      emoji: "⚖️",
    },
    back: {
      answer: "Bedrock is a fully managed service with pre-built models, while SageMaker provides custom ML infrastructure.",
      key_points: [
        "Bedrock: Serverless, pre-built FMs, pay-per-use",
        "SageMaker: Full control, custom models, more complexity",
        "Bedrock for quick prototyping",
        "SageMaker for custom ML workflows",
      ],
      mnemonic: "BEdrock = Easy, Sagemaker = Custom",
      analogy: "Bedrock is like renting a furnished apartment, SageMaker is like building your own house",
    },
    exam_tip: "Know when to use each service based on use case requirements.",
    related_cards: ["BED-001"],
    tags: ["bedrock", "sagemaker", "comparison"],
  },
  {
    id: "FOU-001",
    domain: "foundations",
    type: "fact",
    difficulty: "easy",
    front: {
      question: "What are Foundation Models (FMs)?",
      hint: "Large-scale AI models",
      emoji: "🧠",
    },
    back: {
      answer: "Large AI models trained on vast amounts of data that can be adapted to many different tasks.",
      key_points: [
        "Pre-trained on massive datasets",
        "Can perform multiple tasks without retraining",
        "Also called Large Language Models (LLMs)",
        "Examples: GPT, Claude, Llama, Titan",
      ],
      mnemonic: "FMs = Foundational Massive Models",
      analogy: "Like a human who has learned general knowledge in school",
    },
    exam_tip: "Understand that FMs can be fine-tuned for specific use cases.",
    related_cards: [],
    tags: ["llm", "foundation-models", "ai"],
  },
];

export default function FlashcardsPage() {
  const [selectedDomain, setSelectedDomain] = useState<Domain | "all">("all");
  const [currentIndex, setCurrentIndex] = useState(0);

  const filteredCards = mockFlashcards.filter((card) => {
    if (selectedDomain !== "all" && card.domain !== selectedDomain) return false;
    return true;
  });

  const currentCard = filteredCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < filteredCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const domains = Object.keys(DOMAIN_LABELS) as Domain[];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Flashcards</h1>
        <p className="text-[#94a3b8]">Master key concepts with spaced repetition</p>
      </div>

      <div className="flex items-center gap-4">
        <label className="text-sm text-[#94a3b8]">Filter by Domain:</label>
        <select
          value={selectedDomain}
          onChange={(e) => {
            setSelectedDomain(e.target.value as Domain | "all");
            setCurrentIndex(0);
          }}
          className="px-4 py-2 bg-[#1e293b] border border-[#334155] rounded-lg text-white focus:outline-none focus:border-[#6366f1]"
        >
          <option value="all">All Domains</option>
          {domains.map((domain) => (
            <option key={domain} value={domain}>
              {DOMAIN_LABELS[domain]}
            </option>
          ))}
        </select>
      </div>

      {filteredCards.length === 0 ? (
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-8 text-center">
          <p className="text-[#94a3b8]">No flashcards match your filters</p>
        </div>
      ) : currentCard ? (
        <div className="space-y-4">
          <FlipCard card={currentCard} />

          <div className="flex items-center justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentIndex === 0}
              className="px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#6366f1] transition-colors"
            >
              ← Previous
            </button>

            <span className="text-[#64748b]">
              {currentIndex + 1} / {filteredCards.length}
            </span>

            <button
              onClick={handleNext}
              disabled={currentIndex === filteredCards.length - 1}
              className="px-4 py-2 bg-[#1e293b] border border-[#334155] text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:border-[#6366f1] transition-colors"
            >
              Next →
            </button>
          </div>
        </div>
      ) : null}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#6366f1]">{mockFlashcards.length}</div>
          <div className="text-sm text-[#94a3b8]">Total Cards</div>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#22c55e]">{mockFlashcards.filter(c => c.type === "concept").length}</div>
          <div className="text-sm text-[#94a3b8]">Concepts</div>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#f59e0b]">{mockFlashcards.filter(c => c.type === "comparison").length}</div>
          <div className="text-sm text-[#94a3b8]">Comparisons</div>
        </div>
        <div className="bg-[#1e293b] border border-[#334155] rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-[#ef4444]">{mockFlashcards.filter(c => c.type === "fact").length}</div>
          <div className="text-sm text-[#94a3b8]">Facts</div>
        </div>
      </div>
    </div>
  );
}
