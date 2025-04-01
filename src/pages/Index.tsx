import React, { useState, useEffect } from 'react';
import FileExplorer from '@/components/FileExplorer';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import LoadingScreen from '@/components/LoadingScreen';
import { fileContents } from '@/data/fileContents';
import { ChevronLeft, ChevronRight, Minimize, Maximize } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [currentDir, setCurrentDir] = useState<string>('home');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [terminalMinimized, setTerminalMinimized] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (selectedFile && fileContents[selectedFile]) {
      setFileContent(fileContents[selectedFile]);
    }
  }, [selectedFile]);

  const handleFileSelect = (filePath: string) => {
    setSelectedFile(filePath);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const toggleTerminal = () => {
    setTerminalMinimized(!terminalMinimized);
  };

  const handleCommand = (command: string): string => {
    const parts = command.trim().split(' ');
    const cmd = parts[0].toLowerCase();
    
    switch (cmd) {
      case 'ls':
        return listDirectory(parts[1] || currentDir);
      
      case 'cd':
        return changeDirectory(parts[1] || 'home');
      
      case 'cat':
        return catFile(parts[1]);
      
      case 'open':
        return openFile(parts[1]);
      
      case 'clear':
        return '';
      
      case 'help':
        return `Available commands:
  ls [directory]    - List contents of a directory
  cd [directory]    - Change current directory
  cat [file]        - Display contents of a file
  open [file]       - Open a file in the editor
  clear             - Clear the terminal
  help              - Show this help message`;
      
      default:
        return `Command not found: ${cmd}. Type 'help' for available commands.`;
    }
  };

  const listDirectory = (dirPath: string): string => {
    const normalizedPath = dirPath.startsWith('/') ? dirPath.substring(1) : dirPath;
    
    const dirSet = new Set<string>();
    const fileSet = new Set<string>();
    
    Object.keys(fileContents).forEach(path => {
      if (path.startsWith(normalizedPath) && path !== normalizedPath) {
        const relativePath = path.substring(normalizedPath.length);
        
        if (!relativePath.startsWith('/')) return;
        
        const segments = relativePath.substring(1).split('/');
        const firstSegment = segments[0];
        
        if (segments.length > 1) {
          dirSet.add(firstSegment);
        } else if (segments.length === 1 && firstSegment) {
          fileSet.add(firstSegment);
        }
      }
    });
    
    if (dirSet.size === 0 && fileSet.size === 0) {
      return `No such directory: ${dirPath}`;
    }
    
    const dirs = Array.from(dirSet).map(dir => `${dir}/`);
    const files = Array.from(fileSet);
    
    return [...dirs, ...files].join('\n');
  };

  const changeDirectory = (dirPath: string): string => {
    if (dirPath === '..') {
      const parts = currentDir.split('/');
      parts.pop();
      const newDir = parts.join('/') || 'home';
      setCurrentDir(newDir);
      return `Changed directory to ${newDir}`;
    }
    
    let newPath = dirPath;
    if (!dirPath.startsWith('/') && !dirPath.startsWith('home')) {
      newPath = `${currentDir}/${dirPath}`;
    }
    newPath = newPath.replace(/\/+/g, '/');
    
    const dirExists = Object.keys(fileContents).some(path => 
      path.startsWith(newPath + '/') || path === newPath);
    
    if (!dirExists) {
      return `No such directory: ${dirPath}`;
    }
    
    setCurrentDir(newPath);
    return `Changed directory to ${newPath}`;
  };

  const catFile = (filePath: string): string => {
    if (!filePath) {
      return 'Usage: cat [file]';
    }
    
    let fullPath = filePath;
    if (!filePath.startsWith('/') && !filePath.startsWith('home')) {
      fullPath = `${currentDir}/${filePath}`;
    }
    fullPath = fullPath.replace(/\/+/g, '/');
    
    if (!fileContents[fullPath]) {
      return `No such file: ${filePath}`;
    }
    
    return fileContents[fullPath];
  };

  const openFile = (filePath: string): string => {
    if (!filePath) {
      return 'Usage: open [file]';
    }
    
    let fullPath = filePath;
    if (!filePath.startsWith('/') && !filePath.startsWith('home')) {
      fullPath = `${currentDir}/${filePath}`;
    }
    fullPath = fullPath.replace(/\/+/g, '/');
    
    if (!fileContents[fullPath]) {
      return `No such file: ${filePath}`;
    }
    
    setSelectedFile(fullPath);
    return `Opening ${filePath}...`;
  };

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-white overflow-hidden">
      <div className="h-8 bg-vscode-sidebar border-b border-vscode-border flex items-center px-4">
        <div className="text-sm text-gray-400">Avinash Raj Malaka - Developer Portfolio</div>
      </div>
      
      <div className="flex flex-1 overflow-hidden relative">
        {!sidebarVisible && (
          <button 
            onClick={toggleSidebar}
            className="absolute left-0 top-4 z-20 bg-vscode-sidebar p-1 rounded-r-md border-r border-t border-b border-vscode-border"
            aria-label="Show sidebar"
          >
            <ChevronRight size={18} />
          </button>
        )}
        
        <div className={`${sidebarVisible ? 'w-64' : 'w-0'} transition-all duration-300 h-full relative`}>
          {sidebarVisible && (
            <>
              <FileExplorer onFileSelect={handleFileSelect} selectedFile={selectedFile} />
              <button 
                onClick={toggleSidebar}
                className="absolute right-0 top-4 z-10 bg-vscode-sidebar p-1 rounded-l-md border-l border-t border-b border-vscode-border"
                aria-label="Hide sidebar"
              >
                <ChevronLeft size={18} />
              </button>
            </>
          )}
        </div>
        
        <div className="flex-1 h-full overflow-hidden">
          <Editor filePath={selectedFile} fileContent={fileContent} />
        </div>
      </div>
      
      <div className={`relative ${terminalMinimized ? 'h-8' : 'h-1/4'} transition-all duration-300`}>
        {terminalMinimized ? (
          <div 
            onClick={toggleTerminal}
            className="h-full bg-vscode-terminal border-t border-vscode-border p-2 cursor-pointer flex items-center"
          >
            <span className="text-gray-400">Terminal</span>
            <Maximize size={14} className="ml-2" />
          </div>
        ) : (
          <>
            <button 
              onClick={toggleTerminal} 
              className="absolute right-4 top-2 z-10 text-gray-400 hover:text-white"
              aria-label="Minimize terminal"
            >
              <Minimize size={14} />
            </button>
            <Terminal 
              onCommand={handleCommand} 
              initialCommands={['help']}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
