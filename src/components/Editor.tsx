
import React, { useState } from 'react';
import { Eye, Code, Globe } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';

interface EditorProps {
  filePath: string | null;
  fileContent: string;
}

const Editor: React.FC<EditorProps> = ({ filePath, fileContent }) => {
  const [view, setView] = useState<'preview' | 'code'>('preview');
  const [isWebsiteMode, setIsWebsiteMode] = useState(false);

  if (!filePath) {
    return (
      <div className="flex items-center justify-center h-full bg-vscode-editor text-gray-400">
        <p>Select a file to view its contents</p>
      </div>
    );
  }

  const fileName = filePath.split('/').pop() || '';

  const toggleWebsiteMode = () => {
    setIsWebsiteMode(!isWebsiteMode);
    // Always set to preview when switching to website mode
    if (!isWebsiteMode) {
      setView('preview');
    }
  };

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
          <div className={cn(
            "px-3 py-1 text-sm border-b-2 border-transparent",
            "inline-flex items-center"
          )}>
            <span className="truncate max-w-[150px]">{fileName}</span>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant={isWebsiteMode ? "outline" : "default"}
            onClick={toggleWebsiteMode}
            className={cn(
              "flex items-center gap-1", 
              isWebsiteMode ? "bg-green-500 text-white hover:bg-green-600" : ""
            )}
          >
            <Globe size={16} />
            {isWebsiteMode ? "Website Mode" : "Code Mode"}
          </Button>
          
          {!isWebsiteMode && (
            <ToggleGroup type="single" value={view} onValueChange={(value) => value && setView(value as 'code' | 'preview')}>
              <ToggleGroupItem value="preview" className="flex items-center gap-1">
                <Eye size={14} />
                <span>Preview</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="code" className="flex items-center gap-1">
                <Code size={14} />
                <span>Code</span>
              </ToggleGroupItem>
            </ToggleGroup>
          )}
          
          <div className="text-xs text-gray-500">{getFileType()}</div>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {renderContent()}
      </div>
    </div>
  );
};

export default Editor;
