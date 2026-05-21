import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Image,
  Wand2,
  Download,
  Share2,
  Coins,
  Zap,
  RefreshCw,
  Star,
  Heart,
  Copy,
  Sliders,
  Sparkles,
  Lock,
  CheckCircle,
  Grid,
  Maximize,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

const STYLES = [
  { id: "photorealistic", label: "Photorealistic", emoji: "📷" },
  { id: "anime", label: "Anime", emoji: "🎌" },
  { id: "cyberpunk", label: "Cyberpunk", emoji: "🌆" },
  { id: "oil-painting", label: "Oil Painting", emoji: "🎨" },
  { id: "pixel-art", label: "Pixel Art", emoji: "👾" },
  { id: "neon", label: "Neon Glow", emoji: "💜" },
  { id: "3d-render", label: "3D Render", emoji: "🔮" },
  { id: "watercolor", label: "Watercolor", emoji: "🖌️" },
];

const RATIOS = ["1:1", "16:9", "9:16", "4:3", "3:4"];

const EXAMPLE_PROMPTS = [
  "A futuristic ShadowChat headquarters in a cyberpunk city at night, neon lights reflecting on rain-soaked streets",
  "SKY4444 crypto coin as a golden artifact in a digital metaverse temple",
  "Skyler Blue as a Web3 superhero with lightning powers, flying over a blockchain cityscape",
  "A TRUMP meme coin rocket launching to the moon with diamond hands holding it",
  "ShadowChain blockchain visualization as a glowing neural network in deep space",
];

const GALLERY = [
  {
    id: "g1",
    prompt: "Cyberpunk ShadowChat HQ",
    style: "Cyberpunk",
    emoji: "🌆",
    liked: true,
    minted: false,
  },
  {
    id: "g2",
    prompt: "SKY4444 Golden Coin",
    style: "3D Render",
    emoji: "⚡",
    liked: false,
    minted: true,
  },
  {
    id: "g3",
    prompt: "Diamond Hands Warrior",
    style: "Anime",
    emoji: "💎",
    liked: true,
    minted: false,
  },
  {
    id: "g4",
    prompt: "Moon Mission Rocket",
    style: "Photorealistic",
    emoji: "🚀",
    liked: false,
    minted: false,
  },
  {
    id: "g5",
    prompt: "DeFi Garden Paradise",
    style: "Watercolor",
    emoji: "🌿",
    liked: true,
    minted: true,
  },
  {
    id: "g6",
    prompt: "Blockchain Neural Network",
    style: "Neon Glow",
    emoji: "🔮",
    liked: false,
    minted: false,
  },
];

export default function AIImageGen() {
  const [prompt, setPrompt] = useState("");
  const [style, setStyle] = useState("cyberpunk");
  const [ratio, setRatio] = useState("1:1");
  const [quality, setQuality] = useState("HD");
  const [generating, setGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);
  const [generated, setGenerated] = useState<string | null>(null);
  const [tab, setTab] = useState<"generate" | "gallery" | "settings">(
    "generate"
  );
  const [gallery, setGallery] = useState(GALLERY);

  const generate = () => {
    if (!prompt.trim()) {
      toast.error("Enter a prompt first");
      return;
    }
    setGenerating(true);
    setGenerationProgress(0);
    setGenerated(null);
    const interval = setInterval(() => {
      setGenerationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGenerating(false);
          setGenerated("generated");
          toast.success("Image generated! 🎨");
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const toggleLike = (id: string) =>
    setGallery(prev =>
      prev.map(g => (g.id === id ? { ...g, liked: !g.liked } : g))
    );

  return (
    <div className="space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black flex items-center gap-2">
          <Wand2 className="h-6 w-6 text-violet-400" />
          AI Image Generator
        </h1>
        <p className="text-sm text-muted-foreground">
          Generate stunning AI art — mint as NFTs on ShadowChain
        </p>
      </div>

      {/* Credits */}
      <div className="flex items-center justify-between p-3 rounded-xl bg-violet-500/5 border border-violet-500/20">
        <div className="flex items-center gap-2">
          <Coins className="h-4 w-4 text-yellow-400" />
          <span className="text-sm font-bold">
            284 SKY4444 credits remaining
          </span>
        </div>
        <Button
          size="sm"
          className="h-7 text-xs bg-violet-600 text-white border-0"
          onClick={() => toast.info("Purchasing more credits...")}
        >
          Buy Credits
        </Button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        {(["generate", "gallery", "settings"] as const).map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-full text-sm font-medium capitalize transition-colors ${tab === t ? "bg-violet-600 text-white" : "bg-muted text-muted-foreground"}`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "generate" && (
        <div className="space-y-4">
          {/* Prompt */}
          <div>
            <label className="text-xs text-muted-foreground mb-1 block">
              Prompt
            </label>
            <div className="relative">
              <textarea
                className="w-full h-24 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm resize-none focus:outline-none focus:border-violet-500"
                placeholder="Describe your image in detail..."
                value={prompt}
                onChange={e => setPrompt(e.target.value)}
              />
              <button
                className="absolute bottom-2 right-2 text-xs text-violet-400 hover:text-violet-300"
                onClick={() =>
                  setPrompt(
                    EXAMPLE_PROMPTS[
                      Math.floor(Math.random() * EXAMPLE_PROMPTS.length)
                    ]
                  )
                }
              >
                <Sparkles className="h-4 w-4" />
              </button>
            </div>
            <div className="flex gap-1 mt-2 flex-wrap">
              {[
                "cyberpunk",
                "neon",
                "golden",
                "futuristic",
                "crypto",
                "blockchain",
                "SKY4444",
              ].map(tag => (
                <button
                  key={tag}
                  onClick={() => setPrompt(p => p + (p ? ", " : "") + tag)}
                  className="text-xs px-2 py-0.5 rounded-full bg-muted/40 text-muted-foreground hover:text-white transition-colors"
                >
                  +{tag}
                </button>
              ))}
            </div>
          </div>

          {/* Style */}
          <div>
            <label className="text-xs text-muted-foreground mb-2 block">
              Style
            </label>
            <div className="grid grid-cols-4 gap-2">
              {STYLES.map(s => (
                <button
                  key={s.id}
                  onClick={() => setStyle(s.id)}
                  className={`py-2 px-2 rounded-xl text-xs font-medium border transition-all flex flex-col items-center gap-1 ${style === s.id ? "border-violet-500 bg-violet-500/10 text-violet-400" : "border-border/30 text-muted-foreground"}`}
                >
                  <span className="text-xl">{s.emoji}</span>
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Ratio & Quality */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Aspect Ratio
              </label>
              <div className="flex gap-1 flex-wrap">
                {RATIOS.map(r => (
                  <button
                    key={r}
                    onClick={() => setRatio(r)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${ratio === r ? "border-violet-500 bg-violet-500/10 text-violet-400" : "border-border/30 text-muted-foreground"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs text-muted-foreground mb-2 block">
                Quality
              </label>
              <div className="flex gap-1">
                {["SD", "HD", "4K"].map(q => (
                  <button
                    key={q}
                    onClick={() => setQuality(q)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-medium border transition-all ${quality === q ? "border-violet-500 bg-violet-500/10 text-violet-400" : "border-border/30 text-muted-foreground"}`}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Generate Button */}
          <Button
            className="w-full bg-violet-600 text-white border-0 font-black h-12 text-base"
            onClick={generate}
            disabled={generating}
          >
            {generating ? (
              <RefreshCw className="h-5 w-5 mr-2 animate-spin" />
            ) : (
              <Wand2 className="h-5 w-5 mr-2" />
            )}
            {generating ? "Generating..." : "Generate Image — 10 SKY4444"}
          </Button>

          {/* Generation Progress */}
          {generating && (
            <div className="space-y-2">
              <Progress value={generationProgress} className="h-2" />
              <p className="text-xs text-center text-muted-foreground">
                AI is painting your vision... {Math.floor(generationProgress)}%
              </p>
            </div>
          )}

          {/* Generated Result */}
          {generated && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <Card className="border-violet-500/20 bg-violet-500/3">
                <CardContent className="pt-4 pb-4">
                  <div className="aspect-square bg-gradient-to-br from-violet-900 to-blue-900 rounded-xl flex items-center justify-center mb-3 relative">
                    <span className="text-8xl">🎨</span>
                    <div className="absolute inset-0 flex items-end p-3">
                      <p className="text-white text-xs bg-black/60 px-2 py-1 rounded-lg">
                        {prompt.slice(0, 60)}...
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="flex-1 h-8 text-xs bg-violet-600 text-white border-0"
                      onClick={() =>
                        toast.success("Minting as NFT for 50 SKY4444!")
                      }
                    >
                      <Coins className="h-3.5 w-3.5 mr-1.5" />
                      Mint NFT
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.success("Downloading...")}
                    >
                      <Download className="h-3.5 w-3.5 mr-1.5" />
                      Download
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={() => toast.success("Shared!")}
                    >
                      <Share2 className="h-3.5 w-3.5" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-8 text-xs"
                      onClick={generate}
                    >
                      <RefreshCw className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      )}

      {tab === "gallery" && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">Your generated images</p>
          <div className="grid grid-cols-2 gap-3">
            {gallery.map((img, i) => (
              <motion.div
                key={img.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border/50 overflow-hidden">
                  <div className="aspect-square bg-gradient-to-br from-violet-900 to-blue-900 flex items-center justify-center relative">
                    <span className="text-6xl">{img.emoji}</span>
                    {img.minted && (
                      <div className="absolute top-2 right-2">
                        <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-yellow-500/30">
                          NFT
                        </Badge>
                      </div>
                    )}
                  </div>
                  <CardContent className="py-2 px-3">
                    <p className="text-xs font-bold truncate">{img.prompt}</p>
                    <div className="flex items-center justify-between mt-1">
                      <Badge variant="outline" className="text-xs">
                        {img.style}
                      </Badge>
                      <div className="flex gap-1">
                        <button
                          onClick={() => toggleLike(img.id)}
                          className={
                            img.liked ? "text-red-400" : "text-muted-foreground"
                          }
                        >
                          <Heart className="h-3.5 w-3.5" />
                        </button>
                        <button
                          className="text-muted-foreground"
                          onClick={() => toast.success("Downloading...")}
                        >
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {tab === "settings" && (
        <Card className="border-border/50">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-bold">
              Generation Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              {
                label: "Negative Prompt",
                desc: "What to exclude from the image",
                placeholder: "blurry, low quality, watermark...",
              },
              {
                label: "Seed",
                desc: "For reproducible results (optional)",
                placeholder: "Leave blank for random",
              },
            ].map(({ label, desc, placeholder }) => (
              <div key={label}>
                <label className="text-xs font-medium">{label}</label>
                <p className="text-xs text-muted-foreground mb-1">{desc}</p>
                <Input placeholder={placeholder} className="text-xs" />
              </div>
            ))}
            <div>
              <label className="text-xs font-medium">Steps</label>
              <p className="text-xs text-muted-foreground mb-1">
                More steps = higher quality but slower
              </p>
              <div className="flex gap-2">
                {[20, 30, 50, 75, 100].map(s => (
                  <button
                    key={s}
                    className="flex-1 py-1.5 rounded-xl text-xs border border-border/30 text-muted-foreground hover:border-violet-500 hover:text-violet-400 transition-all"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-medium">Model</label>
              <select className="w-full mt-1 px-3 py-2 rounded-xl bg-muted border border-border/50 text-sm">
                <option>SDXL Turbo (Fast)</option>
                <option>Stable Diffusion 3.5 (Balanced)</option>
                <option>DALL-E 3 (Premium)</option>
                <option>Midjourney v6 (Artistic)</option>
              </select>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
