
import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Folder } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileItem {
  name: string;
  type: 'file' | 'folder';
  path: string;
  children?: FileItem[];
  extension?: string;
}

interface FileExplorerProps {
  onFileSelect: (file: string) => void;
  selectedFile: string | null;
}

const fileStructure: FileItem[] = [
  {
    name: 'home',
    type: 'folder',
    path: 'home',
    children: [
      { name: 'about.txt', type: 'file', path: 'home/about.txt', extension: 'txt' },
      {
        name: 'projects',
        type: 'folder',
        path: 'home/projects',
        children: [
          { name: 'bus-tracking-app.md', type: 'file', path: 'home/projects/bus-tracking-app.md', extension: 'md' },
          { name: 'python-error-solver.md', type: 'file', path: 'home/projects/python-error-solver.md', extension: 'md' },
          { name: 'yt-auto-views.md', type: 'file', path: 'home/projects/yt-auto-views.md', extension: 'md' },
          { name: 'organ-donation-dapp.md', type: 'file', path: 'home/projects/organ-donation-dapp.md', extension: 'md' },
          { name: 'nft-marketplace.md', type: 'file', path: 'home/projects/nft-marketplace.md', extension: 'md' },
          { name: 'crypto-payment-gateway.md', type: 'file', path: 'home/projects/crypto-payment-gateway.md', extension: 'md' },
        ]
      },
      {
        name: 'experience',
        type: 'folder',
        path: 'home/experience',
        children: [
          { name: 'intellect-design-arena.md', type: 'file', path: 'home/experience/intellect-design-arena.md', extension: 'md' },
        ]
      },
      { name: 'contact.sh', type: 'file', path: 'home/contact.sh', extension: 'sh' },
    ]
  }
];

const FileExplorerItem: React.FC<{
  item: FileItem;
  level: number;
  onFileSelect: (path: string) => void;
  selectedFile: string | null;
}> = ({ item, level, onFileSelect, selectedFile }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    if (item.type === 'folder') {
      setIsExpanded(!isExpanded);
    }
  };

  const handleFileClick = () => {
    if (item.type === 'file') {
      onFileSelect(item.path);
    }
  };

  const getFileIcon = () => {
    if (item.type === 'folder') {
      return isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />;
    } else {
      switch (item.extension) {
        case 'md':
          return <FileText size={16} className="text-blue-400" />;
        case 'txt':
          return <FileText size={16} className="text-gray-400" />;
        case 'sh':
          return <FileText size={16} className="text-green-400" />;
        default:
          return <FileText size={16} />;
      }
    }
  };

  return (
    <div>
      <div 
        className={cn(
          'flex items-center px-2 py-1 cursor-pointer hover:bg-vscode-highlight text-sm',
          selectedFile === item.path && "bg-vscode-highlight",
        )}
        style={{ paddingLeft: `${(level) * 12}px` }}
        onClick={item.type === 'folder' ? toggleExpand : handleFileClick}
      >
        <span className="mr-1">{getFileIcon()}</span>
        <span>{item.name}</span>
      </div>
      {item.type === 'folder' && isExpanded && item.children && (
        <div>
          {item.children.map((child, index) => (
            <FileExplorerItem
              key={index}
              item={child}
              level={level + 1}
              onFileSelect={onFileSelect}
              selectedFile={selectedFile}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const FileExplorer: React.FC<FileExplorerProps> = ({ onFileSelect, selectedFile }) => {
  return (
    <div className="h-full bg-vscode-sidebar border-r border-vscode-border overflow-y-auto">
      <div className="p-2 text-sm font-semibold text-gray-400">EXPLORER</div>
      <div>
        {fileStructure.map((item, index) => (
          <FileExplorerItem
            key={index}
            item={item}
            level={0}
            onFileSelect={onFileSelect}
            selectedFile={selectedFile}
          />
        ))}
      </div>
    </div>
  );
};

export default FileExplorer;
