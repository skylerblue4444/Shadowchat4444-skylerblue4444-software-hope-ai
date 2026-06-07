import React, { useState } from 'react';

const SkyForge: React.FC = () => {
  const [selectedRecipe, setSelectedRecipe] = useState<number | null>(null);
  const [forging, setForging] = useState(false);

  const recipes = [
    { id: 1, name: 'Shadow Blade NFT', ingredients: ['1,000 SKY444', '5 Iron Ore', '1 Shadow Essence'], output: 'Shadow Blade NFT (Rare)', time: '24h', icon: '⚔', rarity: 'Rare', color: '#06b6d4' },
    { id: 2, name: 'Diamond Vault Key', ingredients: ['4,444 SKY444', '10 Crystal Shards', '1 Vault Blueprint'], output: 'Diamond Vault Key NFT (Epic)', time: '48h', icon: '🔑', rarity: 'Epic', color: '#a855f7' },
    { id: 3, name: 'Neon Dragon Egg', ingredients: ['8,888 SKY444', '3 Dragon Scales', '1 Neon Core'], output: 'Neon Dragon Egg NFT (Legendary)', time: '72h', icon: '🥚', rarity: 'Legendary', color: '#f59e0b' },
    { id: 4, name: 'Cyber Armor Set', ingredients: ['2,000 SKY444', '8 Steel Plates', '2 Circuit Boards'], output: 'Cyber Armor NFT (Rare)', time: '36h', icon: '🛡', rarity: 'Rare', color: '#06b6d4' },
    { id: 5, name: 'Void Orb', ingredients: ['444 SKY444', '3 Void Shards'], output: 'Void Orb NFT (Common)', time: '12h', icon: '🔮', rarity: 'Common', color: '#94a3b8' },
    { id: 6, name: 'Sky Crown', ingredients: ['44,444 SKY444', '1 Crown Mold', '10 Sapphires', '1 Sky Essence'], output: 'Sky Crown NFT (Mythic)', time: '7d', icon: '👑', rarity: 'Mythic', color: '#ef4444' },
  ];

  const rarityColors: Record<string, string> = { Common: '#94a3b8', Rare: '#06b6d4', Epic: '#a855f7', Legendary: '#f59e0b', Mythic: '#ef4444' };

  const handleForge = () => {
    if (selectedRecipe === null) return;
    const recipe = recipes[selectedRecipe];
    setForging(true);
    setTimeout(() => {
      setForging(false);
      alert(`⚒ Forging Started!\n\nItem: ${recipe.name}\nTime: ${recipe.time}\nOutput: ${recipe.output}\n\nIngredients consumed. Check back when forging completes!`);
      setSelectedRecipe(null);
    }, 2000);
  };

  return (
    <div>
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontFamily: 'Space Grotesk', fontSize: '28px', fontWeight: 700, color: '#e2e8f0' }}>⚒ SkyForge</h1>
        <p style={{ color: '#64748b', fontSize: '14px', marginTop: '4px', fontFamily: 'JetBrains Mono' }}>
          Craft unique NFTs — Combine ingredients — Forge legendary items
        </p>
      </div>

      <div style={{ padding: '16px 20px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '10px', marginBottom: '24px', fontSize: '13px', color: '#f59e0b' }}>
        ⚒ SkyForge allows you to combine SKY444 tokens and in-game materials to craft unique NFTs. Higher rarity items require more resources and time.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px', marginBottom: '24px' }}>
        {recipes.map((recipe, i) => (
          <div
            key={recipe.id}
            className="card-hud"
            style={{ padding: '20px', cursor: 'pointer', border: selectedRecipe === i ? `2px solid ${recipe.color}` : '1px solid rgba(124,58,237,0.4)' }}
            onClick={() => setSelectedRecipe(selectedRecipe === i ? null : i)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span style={{ fontSize: '36px' }}>{recipe.icon}</span>
              <span className="badge" style={{ background: `${rarityColors[recipe.rarity]}20`, color: rarityColors[recipe.rarity], border: `1px solid ${rarityColors[recipe.rarity]}40` }}>{recipe.rarity}</span>
            </div>
            <h3 style={{ fontFamily: 'Space Grotesk', fontSize: '15px', fontWeight: 700, color: '#e2e8f0', marginBottom: '8px' }}>{recipe.name}</h3>
            <div style={{ marginBottom: '10px' }}>
              <div style={{ fontSize: '11px', color: '#64748b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>INGREDIENTS:</div>
              {recipe.ingredients.map((ing, j) => (
                <div key={j} style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '2px' }}>• {ing}</div>
              ))}
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontFamily: 'JetBrains Mono' }}>
              <span style={{ color: '#10b981' }}>Output: {recipe.output.split('(')[0]}</span>
              <span style={{ color: '#f59e0b' }}>⏱ {recipe.time}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedRecipe !== null && (
        <div className="card-hud" style={{ padding: '24px', maxWidth: '500px' }}>
          <h2 style={{ fontFamily: 'Space Grotesk', fontSize: '18px', fontWeight: 600, color: '#f59e0b', marginBottom: '16px' }}>
            ⚒ Forge: {recipes[selectedRecipe].name}
          </h2>
          <div style={{ marginBottom: '16px', padding: '12px', background: 'rgba(245,158,11,0.08)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '8px' }}>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '8px' }}>Required ingredients:</div>
            {recipes[selectedRecipe].ingredients.map((ing, i) => (
              <div key={i} style={{ fontSize: '13px', color: '#f59e0b', fontFamily: 'JetBrains Mono', marginBottom: '4px' }}>✓ {ing}</div>
            ))}
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', marginBottom: '20px' }}>
            <span style={{ color: '#64748b' }}>Forging time:</span>
            <span style={{ color: '#f59e0b', fontFamily: 'JetBrains Mono' }}>{recipes[selectedRecipe].time}</span>
          </div>
          <button
            className="btn-gold"
            style={{ width: '100%', padding: '14px', fontSize: '16px', opacity: forging ? 0.7 : 1 }}
            onClick={handleForge}
            disabled={forging}
          >
            {forging ? '⏳ Starting Forge...' : '⚒ Start Forging'}
          </button>
        </div>
      )}
    </div>
  );
};

export default SkyForge;
