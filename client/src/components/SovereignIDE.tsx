/**
 * 👑 SOVEREIGN IDE
 * Full-featured development environment with Hope AI integration
 */

import React, { useState, useRef, useEffect } from 'react';
import { trpc } from '../_core/trpc';

interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileNode[];
  content?: string;
}

interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'error';
  content: string;
}

export const SovereignIDE: React.FC = () => {
  const [files, setFiles] = useState<FileNode[]>([]);
  const [selectedFile, setSelectedFile] = useState<FileNode | null>(null);
  const [editorContent, setEditorContent] = useState('');
  const [terminalLines, setTerminalLines] = useState<TerminalLine[]>([]);
  const [terminalInput, setTerminalInput] = useState('');
  const [hopeAIMode, setHopeAIMode] = useState<'normal' | 'unhinged' | 'sovereign'>('normal');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Wire to backend endpoints
  const { data: fileTree } = trpc.sovereignIDE.getFileTree.useQuery();
  const { data: fileContent } = trpc.sovereignIDE.getFileContent.useQuery(
    { path: selectedFile?.path || '' },
    { enabled: !!selectedFile }
  );

  const executeCodeMutation = trpc.sovereignIDE.executeCode.useMutation();
  const hopeAIExecuteMutation = trpc.hopeAI.executeWithAI.useMutation();
  const astPatchMutation = trpc.hopeAI.astPatch.useMutation();

  useEffect(() => {
    if (fileTree) {
      setFiles(fileTree);
    }
  }, [fileTree]);

  useEffect(() => {
    if (fileContent) {
      setEditorContent(fileContent.content);
    }
  }, [fileContent]);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [terminalLines]);

  const handleFileSelect = (file: FileNode) => {
    if (file.type === 'file') {
      setSelectedFile(file);
    }
  };

  const handleTerminalCommand = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;

    const command = terminalInput.trim();
    if (!command) return;

    // Add user input to terminal
    setTerminalLines((prev) => [
      ...prev,
      { id: Date.now().toString(), type: 'input', content: `$ ${command}` },
    ]);
    setTerminalInput('');

    // Execute command
    try {
      const result = await executeCodeMutation.mutateAsync({ command });
      setTerminalLines((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: 'output', content: result.output },
      ]);
    } catch (error) {
      setTerminalLines((prev) => [
        ...prev,
        { id: (Date.now() + 1).toString(), type: 'error', content: (error as Error).message },
      ]);
    }
  };

  const handleHopeAIExecute = async () => {
    if (!editorContent) return;

    try {
      const result = await hopeAIExecuteMutation.mutateAsync({
        code: editorContent,
        mode: hopeAIMode,
      });

      setTerminalLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'output', content: `[Hope AI] ${result.message}` },
      ]);
    } catch (error) {
      setTerminalLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'error', content: `[Hope AI Error] ${(error as Error).message}` },
      ]);
    }
  };

  const handleASTPatching = async () => {
    if (!selectedFile || !editorContent) return;

    try {
      const result = await astPatchMutation.mutateAsync({
        filePath: selectedFile.path,
        newCode: editorContent,
      });

      setTerminalLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'output', content: `[AST Patch] ${result.message}` },
      ]);
    } catch (error) {
      setTerminalLines((prev) => [
        ...prev,
        { id: Date.now().toString(), type: 'error', content: `[AST Patch Error] ${(error as Error).message}` },
      ]);
    }
  };

  return (
    <div className="h-screen bg-slate-900 flex flex-col">
      {/* Header */}
      <div className="bg-slate-800 border-b border-slate-700 px-6 py-3 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">👑 Sovereign IDE</h1>
        <div className="flex gap-2">
          {(['normal', 'unhinged', 'sovereign'] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setHopeAIMode(mode)}
              className={`px-3 py-1 rounded text-sm font-semibold transition ${
                hopeAIMode === mode
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
              }`}
            >
              {mode === 'normal' ? '🤖' : mode === 'unhinged' ? '⚡' : '👑'} {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* File Explorer */}
        <div className="w-64 bg-slate-800 border-r border-slate-700 overflow-y-auto">
          <div className="p-4">
            <h2 className="text-sm font-bold text-slate-300 mb-3">FILES</h2>
            <FileTree nodes={files} onSelect={handleFileSelect} selectedFile={selectedFile} />
          </div>
        </div>

        {/* Editor & Terminal */}
        <div className="flex-1 flex flex-col">
          {/* Code Editor */}
          <div className="flex-1 border-b border-slate-700 flex flex-col">
            <div className="bg-slate-800 border-b border-slate-700 px-4 py-2 flex items-center justify-between">
              <span className="text-sm text-slate-300">
                {selectedFile ? selectedFile.path : 'No file selected'}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={handleHopeAIExecute}
                  className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded font-semibold"
                >
                  🚀 Hope AI Execute
                </button>
                <button
                  onClick={handleASTPatching}
                  className="px-3 py-1 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded font-semibold"
                >
                  🔧 AST Patch
                </button>
              </div>
            </div>
            <textarea
              value={editorContent}
              onChange={(e) => setEditorContent(e.target.value)}
              className="flex-1 bg-slate-900 text-slate-100 p-4 font-mono text-sm focus:outline-none resize-none"
              placeholder="// Select a file or start coding..."
            />
          </div>

          {/* Terminal */}
          <div className="h-48 bg-slate-900 border-t border-slate-700 flex flex-col">
            <div className="flex-1 overflow-y-auto p-4 font-mono text-sm">
              {terminalLines.map((line) => (
                <div
                  key={line.id}
                  className={
                    line.type === 'input'
                      ? 'text-slate-300'
                      : line.type === 'error'
                      ? 'text-red-400'
                      : 'text-green-400'
                  }
                >
                  {line.content}
                </div>
              ))}
              <div ref={terminalEndRef} />
            </div>
            <input
              type="text"
              value={terminalInput}
              onChange={(e) => setTerminalInput(e.target.value)}
              onKeyDown={handleTerminalCommand}
              className="bg-slate-800 text-slate-100 px-4 py-2 border-t border-slate-700 font-mono text-sm focus:outline-none"
              placeholder="$ Enter command..."
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface FileTreeProps {
  nodes: FileNode[];
  onSelect: (file: FileNode) => void;
  selectedFile: FileNode | null;
  depth?: number;
}

const FileTree: React.FC<FileTreeProps> = ({ nodes, onSelect, selectedFile, depth = 0 }) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpanded = (id: string) => {
    setExpanded((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div>
      {nodes.map((node) => (
        <div key={node.id}>
          <div
            className={`flex items-center gap-2 px-2 py-1 cursor-pointer rounded hover:bg-slate-700 ${
              selectedFile?.id === node.id ? 'bg-blue-600' : ''
            }`}
            style={{ marginLeft: `${depth * 12}px` }}
            onClick={() => {
              if (node.type === 'folder') {
                toggleExpanded(node.id);
              } else {
                onSelect(node);
              }
            }}
          >
            {node.type === 'folder' ? (
              <>
                <span className="text-xs">{expanded.has(node.id) ? '▼' : '▶'}</span>
                <span className="text-yellow-400">📁</span>
              </>
            ) : (
              <span className="text-blue-400">📄</span>
            )}
            <span className="text-sm text-slate-300">{node.name}</span>
          </div>
          {node.type === 'folder' && expanded.has(node.id) && node.children && (
            <FileTree
              nodes={node.children}
              onSelect={onSelect}
              selectedFile={selectedFile}
              depth={depth + 1}
            />
          )}
        </div>
      ))}
    </div>
  );
};
