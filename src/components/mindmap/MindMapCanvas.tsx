"use client";

import { useCallback, useRef, useMemo, useEffect } from 'react';
import Link from 'next/link';
import ReactFlow, {
  Node,
  Edge,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  NodeTypes,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { MindMapNode as MindMapNodeType, getMindMapData } from '@/data/mindmaps';
import type { Domain } from '@/types';
import { MindMapNode, nodeTypes } from '@/components/mindmap/MindMapNode';
import { DescriptionPanel } from '@/components/mindmap/DescriptionPanel';
import { DomainSelector } from '@/components/mindmap/DomainSelector';

interface MindMapCanvasProps {
  domain: Domain;
  selectedNode: MindMapNodeType | null;
  onNodeSelect: (node: MindMapNodeType | null) => void;
}

function MindMapCanvasInner({ domain, selectedNode, onNodeSelect }: MindMapCanvasProps) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { fitView } = useReactFlow();
  
  const data = getMindMapData(domain);
  const nodes = data.nodes;

  // Create ReactFlow nodes
  const flowNodes: Node[] = useMemo(() => {
    const level0 = nodes.find(n => n.level === 0);
    if (!level0) return [];

    const level1Nodes = nodes.filter(n => n.level === 1);
    const level1Spacing = 200;
    const level1StartX = -(level1Nodes.length - 1) * level1Spacing / 2;

    const flowNodes: Node[] = [];

    // Root
    flowNodes.push({
      id: level0.id,
      type: 'mindMapNode',
      position: { x: 0, y: 0 },
      data: { node: level0, isSelected: selectedNode?.id === level0.id, isHovered: false },
      draggable: false,
    });

    // Level 1
    level1Nodes.forEach((node, index) => {
      flowNodes.push({
        id: node.id,
        type: 'mindMapNode',
        position: { x: level1StartX + index * level1Spacing, y: 200 },
        data: { node, isSelected: selectedNode?.id === node.id, isHovered: false },
        draggable: false,
      });

      // Level 2
      const level2Nodes = nodes.filter(n => n.level === 2 && n.parentId === node.id);
      const level2Spacing = 200;
      const level2StartX = level2Nodes.length > 0 
        ? -((level2Nodes.length - 1) * level2Spacing) / 2 
        : 0;
      
      level2Nodes.forEach((l2Node, l2Index) => {
        flowNodes.push({
          id: l2Node.id,
          type: 'mindMapNode',
          position: { 
            x: level1StartX + index * level1Spacing + level2StartX + l2Index * level2Spacing, 
            y: 350 
          },
          data: { node: l2Node, isSelected: selectedNode?.id === l2Node.id, isHovered: false },
          draggable: false,
        });
      });
    });

    return flowNodes;
  }, [nodes, selectedNode]);

  // Create edges
  const flowEdges: Edge[] = useMemo(() => {
    const edges: Edge[] = [];
    
    nodes.forEach(node => {
      if (node.parentId) {
        edges.push({
          id: `edge-${node.parentId}-${node.id}`,
          source: node.parentId,
          target: node.id,
          type: 'smoothstep',
          style: { 
            stroke: node.level === 1 ? '#334155' : '#1e293b',
            strokeWidth: node.level === 1 ? 2 : 1.5,
          },
        });
      }
    });

    return edges;
  }, [nodes]);

  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(flowNodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(flowEdges);

  // Update selection state in nodes
  useEffect(() => {
    setNodes(flowNodes.map(node => ({
      ...node,
      data: {
        ...node.data,
        isSelected: selectedNode?.id === node.id,
      },
    })));
  }, [selectedNode, flowNodes, setNodes]);

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    const clickedNode = nodes.find(n => n.id === node.id);
    if (clickedNode) {
      onNodeSelect(clickedNode);
    }
  }, [nodes, onNodeSelect]);

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  // Fit view on domain change
  useEffect(() => {
    setTimeout(() => {
      fitView({ padding: 0.2, duration: 500 });
    }, 100);
  }, [domain, fitView]);

  return (
    <div ref={reactFlowWrapper} className="w-full h-[calc(100vh-60px)]">
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
        minZoom={0.3}
        maxZoom={1.5}
        defaultViewport={{ x: 0, y: 0, zoom: 0.8 }}
        proOptions={{ hideAttribution: true }}
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls 
          showInteractive={false}
          className="!bg-[#1e293b] !border-[#334155] !rounded-lg !overflow-hidden"
        />
      </ReactFlow>
    </div>
  );
}

export function MindMapCanvas(props: MindMapCanvasProps) {
  return (
    <ReactFlowProvider>
      <MindMapCanvasInner {...props} />
    </ReactFlowProvider>
  );
}