
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import WebsiteView from '@/components/WebsiteView';

interface EditorProps {
  filePath: string | null;
  fileContent: string;
}

const Editor: React.FC<EditorProps> = ({ filePath, fileContent }) => {
  const [view, setView] = useState<'code' | 'preview'>('preview');
  const [mode, setMode] = useState<'ide' | 'website'>('ide');

  if (mode === 'website') {
    return (
      <div className="h-full flex flex-col">
        <div className="bg-vscode-sidebar border-b border-vscode-border p-2 flex justify-between items-center">
          <h2 className="text-white font-medium">Avinash Raj Malaka - Portfolio</h2>
          <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as 'ide' | 'website')}>
            <ToggleGroupItem value="website" className="bg-green-500 hover:bg-green-600 text-white">
              <Globe size={16} className="mr-2" />
              Website Mode
            </ToggleGroupItem>
            <ToggleGroupItem value="ide" className="text-gray-300">
              <Code size={16} className="mr-2" />
              IDE Mode
            </ToggleGroupItem>
          </ToggleGroup>
        </div>
        <WebsiteView filePath={filePath} fileContent={fileContent} />
      </div>
    );
  }

  const fileName = filePath ? filePath.split('/').pop() || '' : '';

  const renderContent = () => {
    if (view === 'code') {
      return (
        <pre className="p-4 font-mono text-sm whitespace-pre-wrap">
          {fileContent}
        </pre>
      );
    } else {
      // In a preview mode, render Markdown-like content
      return (
        <div className="p-4 markdown-preview">
          {fileContent.split('\n').map((line, index) => {
            // Simple markdown parsing
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h2 key={index} className="text-xl font-bold mb-2">{line.substring(2, line.length - 2)}</h2>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="ml-4">{line.substring(2)}</li>;
            } else if (line.startsWith('GitHub Repository: ')) {
              const url = line.substring('GitHub Repository: '.length);
              return (
                <p key={index} className="my-2">
                  GitHub Repository: <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{url}</a>
                </p>
              );
            } else if (line.startsWith('http')) {
              return (
                <p key={index} className="my-2">
                  <a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">{line}</a>
                </p>
              );
            } else if (line === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="my-1">{line}</p>;
            }
          })}
        </div>
      );
    }
  };

  const getFileType = () => {
    if (fileName.endsWith('.md')) return 'Markdown';
    if (fileName.endsWith('.txt')) return 'Text';
    if (fileName.endsWith('.sh')) return 'Shell';
    return 'File';
  };

  return (
    <div className="h-full bg-vscode-editor flex flex-col">
      <div className="border-b border-vscode-border p-2 flex justify-between items-center">
        <div className="flex">
          {filePath ? (
            <div className={cn(
              "px-3 py-1 text-sm border-b-2 border-transparent",
              "inline-flex items-center"
            )}>
              <span className="truncate max-w-[150px]">{fileName}</span>
            </div>
          ) : (
            <div className="text-sm text-gray-400">Select a file to view its contents</div>
          )}
        </div>
        <div className="flex items-center gap-4">
          <ToggleGroup type="single" value={mode} onValueChange={(value) => value && setMode(value as 'ide' | 'website')}>
            <ToggleGroupItem value="ide" className="text-gray-300">
              <Code size={16} className="mr-2" />
              IDE Mode
            </ToggleGroupItem>
            <ToggleGroupItem value="website" className="bg-green-500 hover:bg-green-600 text-white">
              <Globe size={16} className="mr-2" />
              Website Mode
            </ToggleGroupItem>
          </ToggleGroup>
          
          {filePath && (
            <>
              <div className="text-xs text-gray-500 mr-2">{getFileType()}</div>
              <Tabs value={view} onValueChange={(v) => setView(v as 'code' | 'preview')}>
                <TabsList className="bg-vscode-highlight">
                  <TabsTrigger value="code" className="flex items-center gap-1">
                    <Code size={14} />
                    <span>Code</span>
                  </TabsTrigger>
                  <TabsTrigger value="preview" className="flex items-center gap-1">
                    <Eye size={14} />
                    <span>Preview</span>
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </>
          )}
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {filePath ? renderContent() : (
          <div className="flex items-center justify-center h-full bg-vscode-editor text-gray-400">
            <p>Select a file to view its contents</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Editor;
