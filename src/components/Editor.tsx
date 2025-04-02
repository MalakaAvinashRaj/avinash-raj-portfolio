
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

  if (!filePath && !isWebsiteMode) {
    return (
      <div className="flex items-center justify-center h-full bg-vscode-editor text-gray-400">
        <p>Select a file to view its contents</p>
      </div>
    );
  }

  const fileName = filePath ? filePath.split('/').pop() || '' : '';

  const toggleWebsiteMode = () => {
    setIsWebsiteMode(!isWebsiteMode);
  };

  const renderIDEContent = () => {
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

  const renderWebsiteMode = () => {
    // Display a professional website version of the content
    if (!filePath) return <WebsiteHomepage />;
    
    return (
      <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-blue-600 border-b pb-2">
          {fileName.replace(/\.(md|txt|sh)$/, '')}
        </h1>
        
        <div className="prose lg:prose-xl">
          {fileContent.split('\n').map((line, index) => {
            if (line.startsWith('**') && line.endsWith('**')) {
              return <h2 key={index} className="text-2xl font-bold mt-6 mb-3 text-blue-700">{line.substring(2, line.length - 2)}</h2>;
            } else if (line.startsWith('- ')) {
              return <li key={index} className="my-1 ml-5">{line.substring(2)}</li>;
            } else if (line.startsWith('GitHub Repository: ')) {
              const url = line.substring('GitHub Repository: '.length);
              return (
                <div key={index} className="my-4 p-3 bg-blue-50 rounded-md border border-blue-200">
                  <strong>GitHub Repository:</strong>{' '}
                  <a href={url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{url}</a>
                </div>
              );
            } else if (line.startsWith('http')) {
              return (
                <div key={index} className="my-3">
                  <a href={line} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{line}</a>
                </div>
              );
            } else if (line === '') {
              return <br key={index} />;
            } else {
              return <p key={index} className="my-2">{line}</p>;
            }
          })}
        </div>
      </div>
    );
  };

  const getFileType = () => {
    if (!filePath) return '';
    if (fileName.endsWith('.md')) return 'Markdown';
    if (fileName.endsWith('.txt')) return 'Text';
    if (fileName.endsWith('.sh')) return 'Shell';
    return 'File';
  };

  return (
    <div className="h-full bg-vscode-editor flex flex-col">
      <div className="border-b border-vscode-border p-2 flex justify-between items-center">
        <div className="flex">
          {!isWebsiteMode && (
            <div className={cn(
              "px-3 py-1 text-sm border-b-2 border-transparent",
              "inline-flex items-center"
            )}>
              <span className="truncate max-w-[150px]">{fileName}</span>
            </div>
          )}
          {isWebsiteMode && (
            <div className="px-3 py-1 text-base font-medium text-blue-400">
              Portfolio Website
            </div>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline"
            onClick={toggleWebsiteMode}
            className={cn(
              "flex items-center gap-1", 
              isWebsiteMode ? "bg-green-500 text-white hover:bg-green-600" : ""
            )}
          >
            <Globe size={16} />
            {isWebsiteMode ? "Website Mode" : "IDE Mode"}
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
          
          {!isWebsiteMode && <div className="text-xs text-gray-500">{getFileType()}</div>}
        </div>
      </div>
      <div className={cn("flex-1 overflow-auto", isWebsiteMode ? "bg-gray-100" : "")}>
        {isWebsiteMode ? renderWebsiteMode() : renderIDEContent()}
      </div>
    </div>
  );
};

// Simple website homepage component for when no file is selected in website mode
const WebsiteHomepage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto p-8 bg-white text-gray-800 shadow-lg rounded-lg">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold text-blue-600 mb-4">Avinash Raj Malaka</h1>
        <p className="text-xl text-gray-600">Blockchain Developer & Software Engineer</p>
      </header>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Welcome to My Portfolio</h2>
        <p className="mb-4">
          I'm a passionate developer with expertise in blockchain technology and full-stack development.
          Browse through my projects and experience using the file explorer on the left.
        </p>
        <p>
          Feel free to explore my work or switch to IDE Mode for a more technical view of this portfolio.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="text-2xl font-bold text-blue-700 mb-4">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">Organ Donation DApp</h3>
            <p className="text-gray-600 mb-3">A blockchain-based organ donation tracking platform</p>
            <a href="#" className="text-blue-500 hover:underline">Learn more →</a>
          </div>
          <div className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow">
            <h3 className="font-bold text-lg mb-2">NFT Marketplace</h3>
            <p className="text-gray-600 mb-3">Custom NFT marketplace with unique features</p>
            <a href="#" className="text-blue-500 hover:underline">Learn more →</a>
          </div>
        </div>
      </section>

      <footer className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-600">
        <p>© 2023 Avinash Raj Malaka. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Editor;
