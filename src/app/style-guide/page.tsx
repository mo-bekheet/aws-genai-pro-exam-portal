"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DifficultyBadge, DomainBadge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Tag } from "@/components/ui/Tag";
import { AnswerOption } from "@/components/questions/AnswerOption";

const colorSwatches = [
  { name: "Primary", hex: "#6366f1", className: "bg-[#6366f1]" },
  { name: "Primary Dark", hex: "#4f46e5", className: "bg-[#4f46e5]" },
  { name: "Success", hex: "#22c55e", className: "bg-[#22c55e]" },
  { name: "Warning", hex: "#f59e0b", className: "bg-[#f59e0b]" },
  { name: "Danger", hex: "#ef4444", className: "bg-[#ef4444]" },
  { name: "Info", hex: "#38bdf8", className: "bg-[#38bdf8]" },
];

const darkSurfaces = [
  { name: "bg-primary", hex: "#0a0f1e", className: "bg-[#0a0f1e]" },
  { name: "bg-secondary", hex: "#111827", className: "bg-[#111827]" },
  { name: "bg-card", hex: "#1e293b", className: "bg-[#1e293b]" },
  { name: "border", hex: "#334155", className: "bg-[#334155]" },
  { name: "text-primary", hex: "#f1f5f9", className: "bg-[#f1f5f9]" },
  { name: "text-muted", hex: "#94a3b8", className: "bg-[#94a3b8]" },
];

const lightSurfaces = [
  { name: "bg-primary", hex: "#ffffff", className: "bg-[#ffffff] border border-gray-200" },
  { name: "bg-secondary", hex: "#f8fafc", className: "bg-[#f8fafc] border border-gray-200" },
  { name: "bg-card", hex: "#ffffff", className: "bg-[#ffffff] border border-gray-200" },
  { name: "border", hex: "#e2e8f0", className: "bg-[#e2e8f0]" },
  { name: "text-primary", hex: "#0f172a", className: "bg-[#0f172a]" },
  { name: "text-muted", hex: "#64748b", className: "bg-[#64748b]" },
];

function ColorSwatches({ colors, label }: { colors: typeof colorSwatches; label: string }) {
  return (
    <div className="space-y-3">
      <h4 className="text-sm font-medium text-light-text-muted dark:text-dark-text-muted">{label}</h4>
      <div className="grid grid-cols-3 gap-3">
        {colors.map((color) => (
          <div key={color.name} className="space-y-1">
            <div className={`h-12 rounded-lg ${color.className}`} />
            <div className="text-xs font-mono text-light-text-primary dark:text-dark-text-primary">{color.hex}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TypographyShowcase() {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-1">Plus Jakarta Sans Bold - Display/Headlines</p>
        <p className="text-2xl font-bold text-light-text-primary dark:text-dark-text-primary">AWS GenAI Study Hub</p>
      </div>
      <div>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-1">Inter Regular - Body text</p>
        <p className="text-base text-light-text-primary dark:text-dark-text-primary">The quick brown fox jumps over the lazy dog.</p>
      </div>
      <div>
        <p className="text-xs text-light-text-muted dark:text-dark-text-muted mb-1">JetBrains Mono - Code, IDs, numbers, timer</p>
        <p className="text-sm font-mono text-light-text-primary dark:text-dark-text-primary">42:59 | Q-001 | 0x1A4F</p>
      </div>
    </div>
  );
}

function ButtonsSection({ isDark }: { isDark: boolean }) {
  return (
    <div className="flex flex-wrap gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  );
}

function BadgesSection() {
  return (
    <div className="flex flex-wrap gap-3">
      <DifficultyBadge difficulty="easy" />
      <DifficultyBadge difficulty="medium" />
      <DifficultyBadge difficulty="hard" />
      <DomainBadge domainNumber={2} domainName="Bedrock" />
    </div>
  );
}

function CardSection({ isDark }: { isDark: boolean }) {
  return (
    <Card className={isDark ? "dark" : ""}>
      <p className="text-light-text-primary dark:text-dark-text-primary">
        Card component: 12px radius, 1px border, 24px padding
      </p>
    </Card>
  );
}

function AnswerOptionsSection() {
  return (
    <div className="space-y-2">
      <AnswerOption state="default" letter="A">
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">Default state - subtle border</span>
      </AnswerOption>
      <AnswerOption state="hover" letter="B">
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">Hover - indigo border, light bg</span>
      </AnswerOption>
      <AnswerOption state="correct" letter="C">
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">Correct - 4px green left border</span>
      </AnswerOption>
      <AnswerOption state="incorrect" letter="D">
        <span className="text-sm text-light-text-primary dark:text-dark-text-primary">Incorrect - 4px red left border</span>
      </AnswerOption>
    </div>
  );
}

function ProgressBarSection() {
  return (
    <div className="space-y-3">
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-light-text-muted dark:text-dark-text-muted">Under 40%</span>
          <span className="text-[#ef4444] font-mono">35%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
          <div className="h-full w-[35%] bg-[#ef4444] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-light-text-muted dark:text-dark-text-muted">40% - 70%</span>
          <span className="text-[#f59e0b] font-mono">55%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
          <div className="h-full w-[55%] bg-[#f59e0b] rounded-full" />
        </div>
      </div>
      <div>
        <div className="flex justify-between text-xs mb-1">
          <span className="text-light-text-muted dark:text-dark-text-muted">Over 70%</span>
          <span className="text-[#22c55e] font-mono">85%</span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-[#334155] rounded-full overflow-hidden">
          <div className="h-full w-[85%] bg-[#22c55e] rounded-full" />
        </div>
      </div>
    </div>
  );
}

function InputSection() {
  return (
    <div className="space-y-4 max-w-xs">
      <Input label="Email address" placeholder="you@example.com" />
      <Input label="Password" type="password" placeholder="Enter password" />
    </div>
  );
}

function TagsSection() {
  return (
    <div className="flex flex-wrap gap-2">
      <Tag>Tag Chip</Tag>
      <Tag>Question</Tag>
      <Tag>AWS</Tag>
    </div>
  );
}

function ThemeColumn({ isDark }: { isDark: boolean }) {
  return (
    <div className={`flex-1 p-6 rounded-xl ${isDark ? "bg-[#0a0f1e]" : "bg-[#f8fafc]"}`}>
      <h3 className="text-lg font-bold mb-6 text-light-text-primary dark:text-dark-text-primary">
        {isDark ? "Dark Theme" : "Light Theme"}
      </h3>

      {/* Typography */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Typography</h4>
        <TypographyShowcase />
      </section>

      {/* Colors */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Colors</h4>
        <ColorSwatches colors={colorSwatches} label="Brand Colors" />
      </section>

      {/* Surfaces */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Surfaces</h4>
        <ColorSwatches colors={isDark ? darkSurfaces : lightSurfaces} label="Surface Colors" />
      </section>

      {/* Buttons */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Buttons</h4>
        <ButtonsSection isDark={isDark} />
      </section>

      {/* Badges */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Badges</h4>
        <BadgesSection />
      </section>

      {/* Card */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Card</h4>
        <CardSection isDark={isDark} />
      </section>

      {/* Answer Options */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Answer Options</h4>
        <AnswerOptionsSection />
      </section>

      {/* Progress Bar */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Progress Bar</h4>
        <ProgressBarSection />
      </section>

      {/* Input */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Input</h4>
        <InputSection />
      </section>

      {/* Tags */}
      <section className="mb-8">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-light-text-muted dark:text-dark-text-muted mb-4">Tag Chip</h4>
        <TagsSection />
      </section>
    </div>
  );
}

export default function StyleGuidePage() {
  return (
    <div className="min-h-screen bg-light-bg-primary dark:bg-dark-bg-primary p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-light-text-primary dark:text-dark-text-primary mb-4">
            Design System Style Guide
          </h1>
          <p className="text-light-text-muted dark:text-dark-text-muted">
            AWS GenAI Pro Study Hub - Component Reference
          </p>
        </header>

        {/* Side by Side Theme Comparison */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <ThemeColumn isDark={false} />
          <ThemeColumn isDark={true} />
        </div>
      </div>
    </div>
  );
}