"use client";

import { useState, useRef, useCallback } from 'react';
import Link from 'next/link';
import { useReactFlow } from 'reactflow';
import { MindMapCanvas } from '@/components/mindmap/MindMapCanvas';
import { DescriptionPanel } from '@/components/mindmap/DescriptionPanel';
import { DomainSelector } from '@/components/mindmap/DomainSelector';
import { getMindMapData, type MindMapNode } from '@/data/mindmaps';
import type { Domain } from '@/types';
import { toPng } from 'html-to-image';

export default function MindMapPage() {
  const [domain, setDomain] = useState<Domain>('bedrock');
  const [selectedNode, setSelectedNode] = useState<MindMapNode | null>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleNodeSelect = useCallback((node: MindMapNode | null) => {
    setSelectedNode(node);
    setIsPanelOpen(node !== null);
  }, []);

  const handleDomainChange = useCallback((newDomain: Domain) => {
    setDomain(newDomain);
    setSelectedNode(null);
    setIsPanelOpen(false);
  }, []);

  const handleDownload = useCallback(async () => {
    const canvas = document.querySelector('.react-flow') as HTMLElement;
    if (!canvas) return;

    try {
      const dataUrl = await toPng(canvas, {
        backgroundColor: '#0a0f1e',
        filter: (node: HTMLElement) => {
          // Exclude controls from screenshot
          if (node.classList?.contains('react-flow__controls')) return false;
          return true;
        },
      });

      // Create a canvas with watermark
      const img = new Image();
      img.src = dataUrl;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height + 40;
        const ctx = canvas.getContext('2d');
        
        if (ctx) {
          // Draw original image
          ctx.fillStyle = '#0a0f1e';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(img, 0, 0);
          
          // Draw watermark
          ctx.fillStyle = '#6366f1';
          ctx.font = 'bold 14px Plus Jakarta Sans';
          ctx.fillText('AWS GenAI Study Hub', 20, img.height + 25);
          
          ctx.fillStyle = '#94a3b8';
          ctx.font = '12px Inter';
          ctx.fillText('mind map', 20, img.height + 38);
        }
        
        // Download
        const link = document.createElement('a');
        link.download = `${domain}-mindmap.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
      };
    } catch (err) {
      console.error('Failed to download:', err);
    }
  }, [domain]);

  const data = getMindMapData(domain);
  const nodeCount = data.nodes.filter(n => n.level > 0).length;

  return (
    <div className="h-screen flex flex-col bg-white dark:bg-[#0a0f1e]">
      {/* Top Bar */}
      <div className="flex-shrink-0 flex items-center justify-between px-6 py-3 bg-gray-50 dark:bg-[#111827] border-b border-gray-200 dark:border-[#334155]">
        {/* Left - Back */}
        <Link
          href="/dashboard"
          className="flex items-center gap-2 text-gray-500 dark:text-[#94a3b8] hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <span>←</span>
          <span>Back</span>
        </Link>

        {/* Center - Title */}
        <div className="flex items-center gap-2">
          <span className="text-xl">🧠</span>
          <h1 className="text-lg font-bold text-gray-900 dark:text-white" style={{ fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
            {data.label} — Mind Map
          </h1>
        </div>

        {/* Right - Controls */}
        <div className="flex items-center gap-3">
          <DomainSelector currentDomain={domain} onDomainChange={handleDomainChange} />
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-3 py-2 border border-[#334155] rounded-lg text-[#94a3b8] hover:text-white hover:border-indigo-500 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            <span className="hidden sm:inline">Download PNG</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* Canvas */}
        <div 
          ref={canvasRef}
          className={`flex-1 transition-all duration-300 ${isPanelOpen ? 'mr-[360px]' : ''}`}
        >
          <MindMapCanvas
            domain={domain}
            selectedNode={selectedNode}
            onNodeSelect={handleNodeSelect}
          />
        </div>

        {/* Description Panel */}
        <DescriptionPanel
          node={selectedNode}
          isOpen={isPanelOpen}
          onClose={() => {
            setIsPanelOpen(false);
            setSelectedNode(null);
          }}
        />
      </div>

      {/* Node Count Badge */}
      <div className="absolute bottom-4 left-4 px-3 py-1.5 bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-[#334155] rounded-full text-xs text-gray-600 dark:text-[#94a3b8]">
        {nodeCount} concepts
      </div>
    </div>
  );
}