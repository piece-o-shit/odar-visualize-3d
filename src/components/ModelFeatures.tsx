
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface FeatureProps {
  title: string;
  description: string;
  highlight?: boolean;
}

const Feature: React.FC<FeatureProps> = ({ title, description, highlight = false }) => (
  <div className={`flex flex-col space-y-1 ${highlight ? 'animate-pulse-subtle' : ''}`}>
    <div className="flex items-center">
      <h3 className="text-sm font-medium">{title}</h3>
      {highlight && <Badge className="ml-2 bg-accent text-white">Key</Badge>}
    </div>
    <p className="text-xs text-muted-foreground">{description}</p>
  </div>
);

export const ModelFeatures: React.FC = () => {
  return (
    <Card className="backdrop-blur-sm bg-white/80 border border-border shadow-md transition-transform duration-300 hover:shadow-lg">
      <CardContent className="pt-6">
        <h2 className="text-lg font-semibold mb-3 font-display">OdAR System Features</h2>
        <div className="space-y-4">
          <Feature 
            title="Olfactory Sensor" 
            description="High-precision gas detection sensor capable of identifying various odors and chemical compounds."
            highlight={true}
          />
          
          <Separator className="my-2" />
          
          <Feature 
            title="Multi-directional Ultrasonic Sensors" 
            description="Three strategically placed sensors for 180° front, side, and top obstacle detection."
          />
          
          <Separator className="my-2" />
          
          <Feature 
            title="User Interface" 
            description="High-contrast OLED display with intuitive three-button control system."
          />
          
          <Separator className="my-2" />
          
          <Feature 
            title="Power System" 
            description="USB-C rechargeable power with low-energy operation mode for extended field use."
          />
          
          <Separator className="my-2" />
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Dimensions:</span>
            <span className="text-xs">100mm × 60mm × 30mm</span>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Material:</span>
            <span className="text-xs">Polycarbonate (IP65 Rated)</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
