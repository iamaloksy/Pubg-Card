
import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface PlayerStats {
  kd: string;
  matches: string;
  wins: string;
  headshotRate: string;
}

export interface PlayerInfo {
  playerName: string;
  inGameName: string;
  teamName: string;
  role: string;
  profileImage: string;
  stats: PlayerStats;
}

export interface CardTheme {
  name: string;
  bgClass: string;
  textClass: string;
  statsBgClass: string;
  accentClass: string;
}

interface PlayerCardProps {
  playerInfo: PlayerInfo;
  theme: CardTheme;
}

const PlayerCard = forwardRef<HTMLDivElement, PlayerCardProps>(
  ({ playerInfo, theme }, ref) => {
    const { playerName, inGameName, teamName, role, profileImage, stats } = playerInfo;
    
    return (
      <div 
        ref={ref}
        className={cn(
          "w-[380px] h-[520px] rounded-2xl overflow-hidden relative flex flex-col",
          theme.bgClass
        )}
      >
        {/* Card Header with Team Name */}
        <div className={cn("h-16 flex items-center justify-between px-6", theme.accentClass)}>
          <h2 className={cn("text-2xl font-bold", theme.textClass)}>{teamName}</h2>
          <span className={cn("text-sm font-semibold uppercase", theme.textClass)}>PUBG ESPORTS</span>
        </div>

        {/* Player Image and Info */}
        <div className="flex-1 flex flex-col items-center pt-6 relative">
          {/* Profile Image */}
          <div className="w-44 h-44 rounded-full overflow-hidden border-4 border-white/20 mb-4 bg-black/20">
            {profileImage ? (
              <img 
                src={profileImage} 
                alt={playerName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-black/40 text-white/60">
                No Image
              </div>
            )}
          </div>

          {/* Player Info */}
          <h1 className={cn("text-3xl font-bold mt-2", theme.textClass)}>{playerName}</h1>
          <p className={cn("text-xl", theme.textClass)}>
            "{inGameName}" <span className="text-sm ml-2 opacity-70 uppercase">{role}</span>
          </p>
          
          {/* Stats Section */}
          <div className={cn("w-full max-w-[320px] mt-auto mb-6 rounded-t-lg", theme.statsBgClass)}>
            <div className="grid grid-cols-2 gap-3 p-4">
              <StatItem label="K/D Ratio" value={stats.kd} theme={theme} />
              <StatItem label="Matches" value={stats.matches} theme={theme} />
              <StatItem label="Wins" value={stats.wins} theme={theme} />
              <StatItem label="Headshot %" value={stats.headshotRate} theme={theme} />
            </div>
          </div>
        </div>
      </div>
    );
  }
);

PlayerCard.displayName = "PlayerCard";

interface StatItemProps {
  label: string;
  value: string;
  theme: CardTheme;
}

const StatItem = ({ label, value, theme }: StatItemProps) => (
  <div className="flex flex-col items-center bg-black/20 p-2 rounded">
    <span className={cn("text-sm opacity-80", theme.textClass)}>{label}</span>
    <span className={cn("text-xl font-bold", theme.textClass)}>{value}</span>
  </div>
);

export default PlayerCard;
