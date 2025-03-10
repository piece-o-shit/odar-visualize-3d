
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface ViewControlsProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export const ViewControls: React.FC<ViewControlsProps> = ({ onViewChange, currentView }) => {
  const views = [
    { id: 'isometric', label: 'Isometric View' },
    { id: 'front', label: 'Front View' },
    { id: 'top', label: 'Top View' },
    { id: 'side', label: 'Side View' },
  ];

  return (
    <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-2">
      <TooltipProvider>
        {views.map((view) => (
          <Tooltip key={view.id}>
            <TooltipTrigger asChild>
              <Button
                variant={currentView === view.id ? "default" : "outline"}
                size="sm"
                onClick={() => onViewChange(view.id)}
                className="transition-all duration-300 hover:shadow-md"
              >
                {view.label}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Switch to {view.label}</p>
            </TooltipContent>
          </Tooltip>
        ))}
      </TooltipProvider>
    </div>
  );
};
