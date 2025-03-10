
import { useState, useRef, useEffect } from 'react';
import { OdARModelViewer } from '@/components/OdARModelViewer';
import { ViewControls } from '@/components/ViewControls';
import { ModelInfo } from '@/components/ModelInfo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const Index = () => {
  const [currentView, setCurrentView] = useState('isometric');
  const [showIntro, setShowIntro] = useState(true);
  const titleRef = useRef<HTMLDivElement>(null);

  // Fade in animation for title elements
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('opacity-100');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
          }
        });
      },
      { threshold: 0.1 }
    );

    if (titleRef.current) {
      const children = titleRef.current.children;
      Array.from(children).forEach((child) => {
        child.classList.add('transition-all', 'duration-1000', 'ease-out', 'opacity-0', 'translate-y-4');
        observer.observe(child);
      });
    }

    return () => {
      if (titleRef.current) {
        const children = titleRef.current.children;
        Array.from(children).forEach((child) => {
          observer.unobserve(child);
        });
      }
    };
  }, []);

  // Dismiss intro section after timeout
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowIntro(false);
    }, 4000);

    return () => clearTimeout(timer);
  }, []);

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-sky-100 overflow-hidden relative">
      {/* Background subtle pattern */}
      <div className="absolute inset-0 pattern-grid-lg opacity-5"></div>
      
      {/* Top blur effect */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-blue-100 to-transparent pointer-events-none z-0"></div>
      
      {showIntro ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50 animate-fade-in">
          <div ref={titleRef} className="text-center space-y-6">
            <h1 className="text-4xl md:text-6xl font-bold font-display">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400">
                OdAR System
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-md mx-auto">
              Interactive 3D Visualization
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-600 to-sky-400 mx-auto rounded-full"></div>
          </div>
        </div>
      ) : (
        <main className="container mx-auto px-4 py-8 relative z-10">
          <header className="text-center mb-8 md:mb-12">
            <div className="space-y-2 animate-fade-in">
              <h1 className="text-3xl md:text-4xl font-bold font-display text-gray-900">
                OdAR System
              </h1>
              <p className="text-muted-foreground">Interactive 3D Model Visualization</p>
            </div>
          </header>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Left sidebar with info */}
            <div className="lg:col-span-1 space-y-6 animate-fade-in">
              <div className="backdrop-blur-sm bg-white/80 p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 font-display">About OdAR</h2>
                <p className="text-sm text-muted-foreground mb-4">
                  The OdAR (Olfactory Detection and Ranging) system combines advanced gas detection 
                  with ultrasonic ranging technology, creating a versatile environmental monitoring solution.
                </p>
                <p className="text-sm text-muted-foreground">
                  Use the interactive 3D model to explore the system's components and features. 
                  Click and drag to rotate, scroll to zoom in and out.
                </p>
                
                <Separator className="my-6" />
                
                <div className="space-y-4">
                  <ModelInfo />
                </div>
              </div>
            </div>
            
            {/* Main 3D viewer */}
            <div className="lg:col-span-2 space-y-4">
              <div className="backdrop-blur-sm bg-white/60 p-4 rounded-lg border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 space-y-3 sm:space-y-0">
                  <h2 className="text-xl font-semibold font-display">Interactive Model</h2>
                  <ViewControls onViewChange={handleViewChange} currentView={currentView} />
                </div>
                
                <div className="relative bg-gray-50 rounded-lg overflow-hidden shadow-inner h-[500px]">
                  <OdARModelViewer className="w-full h-full" />
                  
                  {/* View indicator */}
                  <div className="absolute bottom-4 left-4 backdrop-blur-md bg-white/60 px-3 py-1.5 rounded-full shadow-sm border border-gray-200 text-xs font-medium">
                    {currentView === 'isometric' && 'Isometric View'}
                    {currentView === 'front' && 'Front View'}
                    {currentView === 'top' && 'Top View'}
                    {currentView === 'side' && 'Side View'}
                  </div>
                </div>
                
                <div className="mt-4 text-xs text-center text-muted-foreground">
                  Click and drag to rotate. Use scroll wheel to zoom.
                </div>
              </div>
              
              <div className="backdrop-blur-sm bg-white/70 p-4 rounded-lg border border-gray-200 shadow-sm">
                <h3 className="text-sm font-medium mb-2">Technical Drawing</h3>
                <p className="text-xs text-muted-foreground mb-4">
                  The original technical drawing used as reference for the 3D model.
                </p>
                <div className="bg-white p-2 rounded border border-gray-200">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 200" className="w-full h-auto">
                    <g transform="translate(400, 100) scale(0.8) rotate(30) skewX(-30) translate(-120, -80)">
                      {/* Simple version of original SVG for reference */}
                      <rect x="20" y="20" width="200" height="120" rx="10" ry="10" fill="#bfddf5" stroke="#333" strokeWidth="1.5"/>
                      <path d="M20,20 L70,0 L270,0 L220,20 Z" fill="#d5e6f3" stroke="#333" strokeWidth="1.5"/>
                      <path d="M220,20 L270,0 L270,120 L220,140 Z" fill="#9abcdd" stroke="#333" strokeWidth="1.5"/>
                      <rect x="80" y="40" width="70" height="35" fill="#222" stroke="#444" strokeWidth="1"/>
                      <text x="115" y="60" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#4FC3F7">OdAR</text>
                    </g>
                    <text x="400" y="190" fontFamily="Arial" fontSize="10" textAnchor="middle" fill="#333">Dimensions: 100mm × 60mm × 30mm | IP65 Rated | Polycarbonate</text>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
      
      {/* Bottom blur effect */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-blue-100 to-transparent pointer-events-none z-0"></div>
    </div>
  );
};

export default Index;
