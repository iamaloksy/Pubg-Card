
import React, { useRef, useState } from 'react';
import { Toaster } from '@/components/ui/toaster';
import { useToast } from '@/hooks/use-toast';
import PlayerCardForm from '@/components/PlayerCardForm';
import PlayerCard, { CardTheme, PlayerInfo } from '@/components/PlayerCard';
import { Button } from '@/components/ui/button';
import html2canvas from 'html2canvas';
import { Download } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const cardRef = useRef<HTMLDivElement>(null);
  
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>({
    playerName: "John Doe",
    inGameName: "WraithKiller",
    teamName: "Phoenix Force",
    role: "Fragger",
    profileImage: "",
    stats: {
      kd: "2.8",
      matches: "345",
      wins: "42",
      headshotRate: "38%"
    }
  });
  
  const [theme, setTheme] = useState<CardTheme>({
    name: "Dark",
    bgClass: "bg-pubg-dark",
    textClass: "text-white",
    statsBgClass: "bg-black/40",
    accentClass: "bg-pubg-orange"
  });

  const handleUpdatePlayerInfo = (info: PlayerInfo) => {
    setPlayerInfo(info);
  };

  const handleUpdateTheme = (newTheme: CardTheme) => {
    setTheme(newTheme);
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;

    try {
      const canvas = await html2canvas(cardRef.current, {
        backgroundColor: null,
        scale: 2, // Higher quality
        logging: false,
      });
      
      const link = document.createElement('a');
      link.download = `${playerInfo.inGameName || 'player'}_card.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
      
      toast({
        title: "Success!",
        description: "Player card downloaded successfully.",
      });
    } catch (error) {
      console.error("Error generating image:", error);
      toast({
        title: "Error",
        description: "Failed to generate image. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-pubg-dark mb-2">PUBG Esports Player Card Creator</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Create professional esports player cards for PUBG players. Customize stats, themes, and download as a PNG image.
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-8 items-start justify-center">
          {/* Form */}
          <PlayerCardForm 
            onUpdatePlayerInfo={handleUpdatePlayerInfo} 
            onUpdateTheme={handleUpdateTheme} 
          />
          
          {/* Card Preview */}
          <div className="flex flex-col items-center">
            <h2 className="text-2xl font-bold mb-6 text-center">Card Preview</h2>
            <div className="relative">
              <PlayerCard ref={cardRef} playerInfo={playerInfo} theme={theme} />
              
              <div className="mt-6 text-center">
                <Button 
                  onClick={handleDownload}
                  className="bg-pubg-orange hover:bg-pubg-orange/90 text-white gap-2"
                  size="lg"
                >
                  <Download size={18} />
                  Download Card as PNG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="mt-16 text-center text-gray-500 text-sm">
        <p>PUBG Esports Player Card Creator © 2025 - Not affiliated with PUBG Corp.</p>
      </footer>
      
      <Toaster />
    </div>
  );
};

export default Index;
