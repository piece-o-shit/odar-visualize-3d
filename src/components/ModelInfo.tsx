
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ModelFeatures } from './ModelFeatures';

interface SectionContentProps {
  title: string;
  description: string;
  details?: Array<{ label: string; value: string }>;
}

const SectionContent: React.FC<SectionContentProps> = ({ title, description, details }) => (
  <div className="space-y-3 animate-fade-in">
    <h3 className="text-lg font-medium font-display">{title}</h3>
    <p className="text-sm text-muted-foreground">{description}</p>
    {details && (
      <div className="grid grid-cols-2 gap-2 mt-4">
        {details.map((detail, index) => (
          <div key={index} className="text-sm">
            <span className="font-medium">{detail.label}:</span>{' '}
            <span className="text-muted-foreground">{detail.value}</span>
          </div>
        ))}
      </div>
    )}
  </div>
);

export const ModelInfo: React.FC = () => {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid grid-cols-3 mb-4">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="technical">Technical</TabsTrigger>
        <TabsTrigger value="features">Features</TabsTrigger>
      </TabsList>
      
      <TabsContent value="overview" className="space-y-4">
        <SectionContent
          title="OdAR System"
          description="The OdAR (Olfactory Detection and Ranging) system combines advanced olfactory sensors with ultrasonic ranging capabilities for environmental monitoring and safety applications."
          details={[
            { label: "Model", value: "OdAR-X1" },
            { label: "Version", value: "2.1" },
            { label: "IP Rating", value: "IP65" },
            { label: "Battery", value: "3000mAh Li-Ion" },
          ]}
        />
      </TabsContent>
      
      <TabsContent value="technical" className="space-y-4">
        <SectionContent
          title="Technical Specifications"
          description="Precision-engineered with high-grade components for reliability in diverse environments."
          details={[
            { label: "Dimensions", value: "100mm × 60mm × 30mm" },
            { label: "Weight", value: "180g" },
            { label: "Material", value: "Polycarbonate" },
            { label: "Processor", value: "ARM Cortex-M4" },
            { label: "Memory", value: "256KB RAM" },
            { label: "Storage", value: "4MB Flash" },
            { label: "USB", value: "USB-C (Data & Power)" },
            { label: "Battery Life", value: "Up to 48 hours" },
          ]}
        />
      </TabsContent>
      
      <TabsContent value="features">
        <ModelFeatures />
      </TabsContent>
    </Tabs>
  );
};
