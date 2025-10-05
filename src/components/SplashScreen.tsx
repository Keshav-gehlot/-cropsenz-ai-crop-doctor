import { Leaf, Stethoscope } from 'lucide-react';

export function SplashScreen() {
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-primary to-primary/90 text-white p-8">
      <div className="mb-8 relative">
        <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mb-4">
          <div className="relative">
            <Leaf className="w-12 h-12 text-white" />
            <Stethoscope className="w-6 h-6 text-white absolute -bottom-1 -right-1" />
          </div>
        </div>
      </div>

      <h1 className="text-3xl font-bold mb-2 text-center">
        CropSenz
      </h1>

      <p className="text-xl text-white/90 text-center mb-8">
        Smart Farming, Smarter Decisions
      </p>

      <div className="flex space-x-2">
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse-delay-200"></div>
        <div className="w-2 h-2 bg-white/60 rounded-full animate-pulse-delay-400"></div>
      </div>
    </div>
  );
}
