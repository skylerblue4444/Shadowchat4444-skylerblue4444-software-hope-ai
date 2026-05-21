import { useState } from "react";
import {
  User,
  Zap,
  RefreshCw,
  Download,
  Star,
  Palette,
  Layers,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

const STYLES = [
  "Cyberpunk",
  "Anime",
  "Pixel Art",
  "3D Render",
  "Oil Painting",
  "Watercolor",
  "Comic Book",
  "Vaporwave",
  "Minimalist",
  "Neon Noir",
];
const TRAITS = {
  Background: [
    "Deep Space",
    "Neon City",
    "Golden Hour",
    "Matrix Rain",
    "Shadow Realm",
  ],
  Hair: [
    "Shadow Black",
    "Neon Blue",
    "Crypto Gold",
    "Electric Purple",
    "Ghost White",
  ],
  Eyes: [
    "Laser Red",
    "SKY Blue",
    "TRUMP Gold",
    "Matrix Green",
    "Shadow Purple",
  ],
  Outfit: [
    "Hacker Hoodie",
    "CEO Suit",
    "Crypto Tee",
    "Shadow Armor",
    "Skyler Blue IT Uniform",
  ],
  Accessory: [
    "SKY4444 Chain",
    "TRUMP Hat",
    "Shadow Mask",
    "Crypto Glasses",
    "IT Badge",
  ],
};

export default function ShadowAIAvatar() {
  const [style, setStyle] = useState("Cyberpunk");
  const [selected, setSelected] = useState<Record<string, string>>({
    Background: "Deep Space",
    Hair: "Shadow Black",
    Eyes: "Laser Red",
    Outfit: "Hacker Hoodie",
    Accessory: "SKY4444 Chain",
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const generate = async () => {
    setGenerating(true);
    await new Promise(r => setTimeout(r, 2000));
    setGenerating(false);
    setGenerated(true);
    toast.success("AI Avatar generated! Mint as NFT for 50 SKY4444");
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <User className="h-6 w-6 text-purple-400" />
          AI Avatar Builder
        </h1>
        <p className="text-sm text-muted-foreground">
          Create your unique Web3 identity — AI-generated, mintable as NFT
        </p>
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-3">
          <div>
            <p className="text-xs font-bold text-muted-foreground mb-1">
              Art Style
            </p>
            <div className="flex flex-wrap gap-1">
              {STYLES.map(s => (
                <button
                  key={s}
                  onClick={() => setStyle(s)}
                  className={
                    "px-2 py-1 rounded-full text-xs font-medium transition-colors " +
                    (style === s
                      ? "bg-purple-600 text-white"
                      : "bg-muted text-muted-foreground")
                  }
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
          {Object.entries(TRAITS).map(([trait, options]) => (
            <div key={trait}>
              <p className="text-xs font-bold text-muted-foreground mb-1">
                {trait}
              </p>
              <div className="flex flex-wrap gap-1">
                {options.map(opt => (
                  <button
                    key={opt}
                    onClick={() => setSelected(s => ({ ...s, [trait]: opt }))}
                    className={
                      "px-2 py-1 rounded-full text-xs font-medium transition-colors " +
                      (selected[trait] === opt
                        ? "bg-purple-600 text-white"
                        : "bg-muted text-muted-foreground")
                    }
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-3">
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-purple-900/40 via-indigo-900/30 to-blue-900/40 border border-purple-500/20 flex items-center justify-center">
            {generated ? (
              <div className="text-center">
                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center mx-auto mb-2">
                  <User className="h-12 w-12 text-white" />
                </div>
                <p className="text-xs font-bold text-purple-400">
                  {style} Avatar
                </p>
                <p className="text-xs text-muted-foreground">
                  Rarity: Legendary
                </p>
              </div>
            ) : (
              <div className="text-center text-muted-foreground">
                <Palette className="h-12 w-12 mx-auto mb-2 opacity-30" />
                <p className="text-xs">Configure traits and generate</p>
              </div>
            )}
          </div>
          <Button
            className="w-full h-10 bg-purple-600 text-white border-0 font-bold"
            onClick={generate}
            disabled={generating}
          >
            {generating ? (
              <>
                <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                Generating AI Avatar...
              </>
            ) : (
              <>
                <Zap className="h-4 w-4 mr-2" />
                Generate Avatar
              </>
            )}
          </Button>
          {generated && (
            <div className="flex gap-2">
              <Button
                className="flex-1 h-9 bg-green-600 text-white border-0 font-bold text-sm"
                onClick={() =>
                  toast.success("Minting avatar as NFT — 50 SKY4444 fee")
                }
              >
                <Star className="h-4 w-4 mr-1" />
                Mint NFT
              </Button>
              <Button
                className="flex-1 h-9 bg-muted font-bold text-sm"
                onClick={() => toast.success("Avatar downloaded!")}
              >
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
