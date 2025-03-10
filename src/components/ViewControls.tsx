
import React from 'react';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { 
  Box, 
  SquareIcon, 
  ArrowUpIcon, 
  ArrowRightIcon 
} from 'lucide-react';

interface ViewControlsProps {
  onViewChange: (view: string) => void;
  currentView: string;
}

export const ViewControls: React.FC<ViewControlsProps> = ({ onViewChange, currentView }) => {
  const views = [
    { id: 'isometric', label: 'Isometric View', icon: <Box size={16} /> },
    { id: 'front', label: 'Front View', icon: <SquareIcon size={16} /> },
    { id: 'top', label: 'Top View', icon: <ArrowUpIcon size={16} /> },
    { id: 'side', label: 'Side View', icon: <ArrowRightIcon size={16} /> },
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
                className="transition-all duration-300 hover:shadow-md flex items-center gap-1"
              >
                {view.icon}
                <span className="hidden md:inline">{view.label}</span>
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
