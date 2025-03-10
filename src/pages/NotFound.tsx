
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-sky-100">
      <div className="max-w-md w-full text-center backdrop-blur-sm bg-white/80 p-8 rounded-lg border border-gray-200 shadow-lg animate-fade-in">
        <h1 className="text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-sky-400 mb-6">404</h1>
        <p className="text-xl text-gray-700 mb-8">The page you're looking for doesn't exist.</p>
        <Button asChild className="bg-gradient-to-r from-blue-600 to-sky-500 hover:from-blue-700 hover:to-sky-600 transition-all duration-300">
          <a href="/">Return to Home</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
