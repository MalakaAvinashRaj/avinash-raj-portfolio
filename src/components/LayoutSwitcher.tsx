
import React from 'react';
import { useLayoutMode } from '@/contexts/LayoutModeContext';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Code, Globe } from 'lucide-react';

const LayoutSwitcher = () => {
  const { mode, toggleMode } = useLayoutMode();

  return (
    <div className="flex items-center">
      <ToggleGroup type="single" value={mode} onValueChange={(value) => value && toggleMode()}>
        <ToggleGroupItem 
          value="website" 
          className={mode === 'website' ? "bg-green-500 hover:bg-green-600 text-white" : "text-gray-300"}
        >
          <Globe size={16} className="mr-2" />
          Website
        </ToggleGroupItem>
        <ToggleGroupItem 
          value="ide" 
          className={mode === 'ide' ? "bg-blue-500 hover:bg-blue-600 text-white" : "text-gray-300"}
        >
          <Code size={16} className="mr-2" />
          IDE
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
};

export default LayoutSwitcher;
