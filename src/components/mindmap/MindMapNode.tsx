"use client";

import { Handle, Position, NodeProps } from 'reactflow';
import type { MindMapNode } from '@/data/mindmaps';

interface CustomNodeData {
  node: MindMapNode;
  isSelected: boolean;
  isHovered: boolean;
}

export function MindMapNode({ data }: NodeProps<CustomNodeData>) {
  const { node, isSelected } = data;

  const baseClasses = "flex items-center justify-center px-4 py-2 transition-all duration-150 cursor-pointer rounded-lg";
  
  const getStyles = () => {
    if (node.level === 0) {
      return {
        width: '180px',
        backgroundColor: node.color,
        border: 'none',
        color: 'white',
        fontWeight: '700' as const,
        fontSize: '16px',
        boxShadow: '0 0 24px rgba(99,102,241,0.4)',
      };
    }
    
    if (node.level === 1) {
      return {
        minWidth: '140px',
        padding: '10px 16px',
        backgroundColor: isSelected ? '#2d3f55' : '#1e293b',
        border: `2px ${isSelected ? 'solid' : 'solid'} ${node.color}`,
        color: 'white',
        fontWeight: '500' as const,
        fontSize: '14px',
        boxShadow: isSelected ? `0 0 12px ${node.color}40` : 'none',
      };
    }
    
    // Level 2
    return {
      minWidth: '140px',
      padding: '8px 14px',
      backgroundColor: isSelected ? '#2d3f55' : '#1e293b',
      border: `1px ${isSelected ? 'solid' : 'solid'} ${isSelected ? node.color : '#334155'}`,
      color: isSelected ? 'white' : '#94a3b8',
      fontWeight: '400' as const,
      fontSize: '13px',
    };
  };

  const styles = getStyles();

  return (
    <>
      {node.level > 0 && (
        <Handle
          type="target"
          position={Position.Top}
          className="!bg-transparent !border-none"
          style={{ visibility: 'hidden' }}
        />
      )}
      
      <div
        className={baseClasses}
        style={{
          width: styles.width,
          minWidth: styles.minWidth,
          backgroundColor: styles.backgroundColor,
          border: styles.border,
          color: styles.color,
          fontWeight: styles.fontWeight,
          fontSize: styles.fontSize,
          boxShadow: styles.boxShadow,
          whiteSpace: 'nowrap',
        }}
      >
        {node.label}
      </div>
      
      {node.level < 2 && (
        <Handle
          type="source"
          position={Position.Bottom}
          className="!bg-transparent !border-none"
          style={{ visibility: 'hidden' }}
        />
      )}
    </>
  );
}

export const nodeTypes = {
  mindMapNode: MindMapNode,
};