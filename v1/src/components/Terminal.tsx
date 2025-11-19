
import React, { useState, useRef, useEffect } from 'react';

interface TerminalProps {
  onCommand: (command: string) => string;
  initialCommands?: string[];
}

interface CommandHistoryItem {
  command: string;
  output: string;
}

const Terminal: React.FC<TerminalProps> = ({ onCommand, initialCommands = [] }) => {
  const [input, setInput] = useState<string>('');
  const [commandHistory, setCommandHistory] = useState<CommandHistoryItem[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const addToHistory = (command: string, output: string) => {
    setCommandHistory(prev => [...prev, { command, output }]);
  };

  const executeCommand = () => {
    if (input.trim() === '') return;
    
    const output = onCommand(input);
    addToHistory(input, output);
    
    setInput('');
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      executeCommand();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex].command);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  const focusTerminal = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [commandHistory]);

  useEffect(() => {
    // Execute initial commands if provided
    if (initialCommands.length > 0) {
      initialCommands.forEach(cmd => {
        const output = onCommand(cmd);
        addToHistory(cmd, output);
      });
    }
  }, []);

  return (
    <div 
      className="h-full bg-vscode-terminal border-t border-vscode-border p-2 overflow-y-auto font-mono text-sm"
      ref={terminalRef}
      onClick={focusTerminal}
    >
      <div className="text-gray-400 mb-2">Terminal</div>
      
      {commandHistory.map((item, index) => (
        <div key={index} className="mb-1">
          <div>
            <span className="text-green-400">user@portfolio</span>
            <span className="text-gray-400">:~$ </span>
            <span>{item.command}</span>
          </div>
          <div className="whitespace-pre-wrap">{item.output}</div>
        </div>
      ))}
      
      <div className="flex">
        <span className="text-green-400">user@portfolio</span>
        <span className="text-gray-400">:~$ </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none ml-1"
          autoFocus
        />
      </div>
    </div>
  );
};

export default Terminal;
