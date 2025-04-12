
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CardTheme, PlayerInfo } from "./PlayerCard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PlayerCardFormProps {
  onUpdatePlayerInfo: (info: PlayerInfo) => void;
  onUpdateTheme: (theme: CardTheme) => void;
}

const INITIAL_PLAYER_INFO: PlayerInfo = {
  playerName: "",
  inGameName: "",
  teamName: "",
  role: "Fragger",
  profileImage: "",
  stats: {
    kd: "0.0",
    matches: "0",
    wins: "0",
    headshotRate: "0%"
  }
};

const THEMES: CardTheme[] = [
  {
    name: "Dark",
    bgClass: "bg-pubg-dark",
    textClass: "text-white",
    statsBgClass: "bg-black/40",
    accentClass: "bg-pubg-orange"
  },
  {
    name: "Light",
    bgClass: "bg-pubg-light",
    textClass: "text-pubg-dark",
    statsBgClass: "bg-white/80",
    accentClass: "bg-pubg-dark"
  },
  {
    name: "Fire",
    bgClass: "bg-gradient-to-b from-pubg-orange to-pubg-red",
    textClass: "text-white",
    statsBgClass: "bg-black/30",
    accentClass: "bg-pubg-dark"
  },
  {
    name: "Ice",
    bgClass: "bg-gradient-to-b from-pubg-blue to-blue-900",
    textClass: "text-white",
    statsBgClass: "bg-black/30",
    accentClass: "bg-pubg-dark"
  },
  {
    name: "Toxic",
    bgClass: "bg-gradient-to-b from-pubg-green to-green-900",
    textClass: "text-white",
    statsBgClass: "bg-black/30",
    accentClass: "bg-pubg-dark"
  }
];

const PlayerCardForm = ({ onUpdatePlayerInfo, onUpdateTheme }: PlayerCardFormProps) => {
  const [playerInfo, setPlayerInfo] = useState<PlayerInfo>(INITIAL_PLAYER_INFO);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof PlayerInfo | keyof PlayerInfo["stats"]
  ) => {
    const { value } = e.target;

    if (field === "kd" || field === "matches" || field === "wins" || field === "headshotRate") {
      setPlayerInfo((prev) => ({
        ...prev,
        stats: {
          ...prev.stats,
          [field]: value
        }
      }));
    } else {
      setPlayerInfo((prev) => ({
        ...prev,
        [field]: value
      }));
    }

    if (field === "kd" || field === "matches" || field === "wins" || field === "headshotRate") {
      onUpdatePlayerInfo({
        ...playerInfo,
        stats: {
          ...playerInfo.stats,
          [field]: value
        }
      });
    } else {
      onUpdatePlayerInfo({
        ...playerInfo,
        [field]: value
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        setPlayerInfo((prev) => ({
          ...prev,
          profileImage: result
        }));
        onUpdatePlayerInfo({
          ...playerInfo,
          profileImage: result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRoleChange = (value: string) => {
    setPlayerInfo((prev) => ({
      ...prev,
      role: value
    }));
    onUpdatePlayerInfo({
      ...playerInfo,
      role: value
    });
  };

  const handleThemeChange = (value: string) => {
    const selectedTheme = THEMES.find((theme) => theme.name === value);
    if (selectedTheme) {
      onUpdateTheme(selectedTheme);
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-center mb-6">Player Card Details</h2>
      
      <div className="space-y-4">
        {/* Player Details */}
        <div className="space-y-2">
          <Label htmlFor="playerName">Player Name</Label>
          <Input
            id="playerName"
            value={playerInfo.playerName}
            onChange={(e) => handleInputChange(e, "playerName")}
            placeholder="Enter player's real name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="inGameName">In-Game Name (IGN)</Label>
          <Input
            id="inGameName"
            value={playerInfo.inGameName}
            onChange={(e) => handleInputChange(e, "inGameName")}
            placeholder="Enter in-game name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="teamName">Team Name</Label>
          <Input
            id="teamName"
            value={playerInfo.teamName}
            onChange={(e) => handleInputChange(e, "teamName")}
            placeholder="Enter team name"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="role">Role</Label>
          <Select onValueChange={handleRoleChange} defaultValue="Fragger">
            <SelectTrigger>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="IGL">IGL (In-Game Leader)</SelectItem>
              <SelectItem value="Fragger">Fragger</SelectItem>
              <SelectItem value="Support">Support</SelectItem>
              <SelectItem value="Sniper">Sniper</SelectItem>
              <SelectItem value="Lurker">Lurker</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="kd">K/D Ratio</Label>
            <Input
              id="kd"
              value={playerInfo.stats.kd}
              onChange={(e) => handleInputChange(e, "kd")}
              placeholder="e.g. 2.5"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="matches">Total Matches</Label>
            <Input
              id="matches"
              value={playerInfo.stats.matches}
              onChange={(e) => handleInputChange(e, "matches")}
              placeholder="e.g. 250"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="wins">Wins</Label>
            <Input
              id="wins"
              value={playerInfo.stats.wins}
              onChange={(e) => handleInputChange(e, "wins")}
              placeholder="e.g. 25"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="headshotRate">Headshot Rate</Label>
            <Input
              id="headshotRate"
              value={playerInfo.stats.headshotRate}
              onChange={(e) => handleInputChange(e, "headshotRate")}
              placeholder="e.g. 35%"
            />
          </div>
        </div>
        
        {/* Profile Picture */}
        <div className="space-y-2">
          <Label htmlFor="profileImage">Profile Picture</Label>
          <Input
            id="profileImage"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="cursor-pointer"
          />
        </div>
        
        {/* Theme Selector */}
        <div className="space-y-2">
          <Label htmlFor="theme">Card Theme</Label>
          <Select onValueChange={handleThemeChange} defaultValue="Dark">
            <SelectTrigger>
              <SelectValue placeholder="Select theme" />
            </SelectTrigger>
            <SelectContent>
              {THEMES.map((theme) => (
                <SelectItem key={theme.name} value={theme.name}>
                  {theme.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default PlayerCardForm;
