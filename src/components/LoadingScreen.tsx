
import React, { useState, useEffect } from 'react';
import { Loader } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [currentTask, setCurrentTask] = useState('Initializing IDE environment...');

  useEffect(() => {
    const tasks = [
      'Initializing IDE environment...',
      'Loading file system...',
      'Configuring terminal...',
      'Connecting components...',
      'Setting up workspace...',
      'Preparing editor...',
      'Loading syntax highlighter...',
      'Initializing command parser...',
      'Mounting virtual file system...',
      'Launching application...'
    ];

    let currentTaskIndex = 0;
    const totalDuration = 10000; // 10 seconds
    const taskDuration = totalDuration / tasks.length;
    const incrementInterval = 20; // Update progress every 20ms
    const incrementStep = (100 / totalDuration) * incrementInterval;
    
    const timer = setInterval(() => {
      setProgress(prevProgress => {
        const newProgress = prevProgress + incrementStep;
        
        // Task transition logic
        if (newProgress >= ((currentTaskIndex + 1) / tasks.length) * 100 && currentTaskIndex < tasks.length - 1) {
          currentTaskIndex++;
          setCurrentTask(tasks[currentTaskIndex]);
        }
        
        if (newProgress >= 100) {
          clearInterval(timer);
          // Add a small delay before completing to ensure the 100% is visible
          setTimeout(() => {
            onComplete();
          }, 200);
          return 100;
        }
        
        return newProgress;
      });
    }, incrementInterval);
    
    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-vscode-bg flex flex-col items-center justify-center z-50">
      <div className="w-full max-w-md px-6">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-2xl font-bold mb-2 text-white font-mono">
            <span className="text-vscode-active">Dev</span>Portfolio<span className="text-vscode-active">IDE</span>
          </h1>
          <p className="text-sm text-gray-400 mb-1 font-mono">v1.0.0</p>
        </div>
        
        <div className="w-full mb-4">
          <Progress value={progress} className="h-2" />
        </div>
        
        <div className="flex items-center text-sm text-gray-300 font-mono">
          <Loader size={16} className="mr-2 animate-spin" />
          <span>{currentTask} ({Math.round(progress)}%)</span>
        </div>

        <div className="mt-8 text-xs text-gray-500 font-mono">
          <p>© {new Date().getFullYear()} Avinash Raj Malaka</p>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
