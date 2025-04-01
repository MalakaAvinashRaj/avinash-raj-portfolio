
import React, { useState, useEffect } from 'react';
import FileExplorer from '@/components/FileExplorer';
import Editor from '@/components/Editor';
import Terminal from '@/components/Terminal';
import { fileContents } from '@/data/fileContents';
import { ChevronLeft, ChevronRight, Minimize, Maximize } from 'lucide-react';

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [currentDir, setCurrentDir] = useState<string>('home');
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [terminalMinimized, setTerminalMinimized] = useState(false);

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
        // Clear handled by Terminal component
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
    
    // Create a set to track unique directory names
    const dirSet = new Set<string>();
    // Create a set to track unique file names
    const fileSet = new Set<string>();
    
    Object.keys(fileContents).forEach(path => {
      // Check if path is directly in this directory or a subdirectory
      if (path.startsWith(normalizedPath) && path !== normalizedPath) {
        // Get the relative path from the current directory
        const relativePath = path.substring(normalizedPath.length);
        
        // Skip if not a direct child (doesn't start with /)
        if (!relativePath.startsWith('/')) return;
        
        // Get the first segment after the current directory
        const segments = relativePath.substring(1).split('/');
        const firstSegment = segments[0];
        
        if (segments.length > 1) {
          // This is a directory
          dirSet.add(firstSegment);
        } else if (segments.length === 1 && firstSegment) {
          // This is a file
          fileSet.add(firstSegment);
        }
      }
    });
    
    if (dirSet.size === 0 && fileSet.size === 0) {
      return `No such directory: ${dirPath}`;
    }
    
    // Format the output with directories first, then files
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
    
    // Normalize path
    let newPath = dirPath;
    if (!dirPath.startsWith('/') && !dirPath.startsWith('home')) {
      newPath = `${currentDir}/${dirPath}`;
    }
    newPath = newPath.replace(/\/+/g, '/'); // Replace multiple slashes with single one
    
    // Check if directory exists by finding any file that starts with this path
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
    
    // Normalize path
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
    
    // Normalize path
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

  return (
    <div className="flex flex-col h-screen bg-vscode-bg text-white overflow-hidden">
      {/* Header - VSCode like title bar */}
      <div className="h-8 bg-vscode-sidebar border-b border-vscode-border flex items-center px-4">
        <div className="text-sm text-gray-400">Avinash Raj Malaka - Developer Portfolio</div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 overflow-hidden relative">
        {/* Sidebar toggle button - visible when sidebar is collapsed */}
        {!sidebarVisible && (
          <button 
            onClick={toggleSidebar}
            className="absolute left-0 top-4 z-20 bg-vscode-sidebar p-1 rounded-r-md border-r border-t border-b border-vscode-border"
            aria-label="Show sidebar"
          >
            <ChevronRight size={18} />
          </button>
        )}
        
        {/* File Explorer */}
        <div className={`${sidebarVisible ? 'w-64' : 'w-0'} transition-all duration-300 h-full relative`}>
          {sidebarVisible && (
            <>
              <FileExplorer onFileSelect={handleFileSelect} selectedFile={selectedFile} />
              {/* Sidebar collapse button */}
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
        
        {/* Editor */}
        <div className="flex-1 h-full overflow-hidden">
          <Editor filePath={selectedFile} fileContent={fileContent} />
        </div>
      </div>
      
      {/* Terminal */}
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
