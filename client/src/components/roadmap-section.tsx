import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface Phase {
  number: number;
  title: string;
  emoji: string;
  status: 'completed' | 'in-progress' | 'coming-soon' | 'future';
  statusText: string;
  items: string[];
  delay?: number;
}

export function RoadmapSection() {
  const { ref, isVisible } = useScrollAnimation();

  const phases: Phase[] = [
    {
      number: 1,
      title: "The Awakening",
      emoji: "🎃",
      status: "completed",
      statusText: "Completed ✓",
      items: [
        "Launch $WEENY token on Solana",
        "Build community on social platforms",
        "Create spooky website and branding",
        "Initial liquidity pool creation",
      ],
    },
    {
      number: 2,
      title: "The Haunting",
      emoji: "👻",
      status: "in-progress",
      statusText: "In Progress ⚡",
      items: [
        "10,000+ holders milestone",
        "CoinGecko & CoinMarketCap listings",
        "Major influencer partnerships",
        "First CEX listing",
      ],
      delay: 0.1,
    },
    {
      number: 3,
      title: "The Possession",
      emoji: "🦇",
      status: "coming-soon",
      statusText: "Coming Soon 🔮",
      items: [
        "Weeny NFT collection launch",
        "Staking rewards program",
        "Major CEX listings (Binance, Coinbase)",
        "Merchandise store opening",
      ],
      delay: 0.2,
    },
    {
      number: 4,
      title: "The Moon Landing",
      emoji: "🌙",
      status: "future",
      statusText: "Future 🚀",
      items: [
        "Weeny metaverse experience",
        "DAO governance implementation",
        "Weeny-themed mobile game",
        "Top 100 cryptocurrency by market cap",
      ],
      delay: 0.3,
    },
  ];

  const getStatusColor = (status: Phase['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-accent/20 text-accent';
      case 'in-progress':
        return 'bg-primary/20 text-primary';
      case 'coming-soon':
        return 'bg-secondary/20 text-secondary';
      case 'future':
        return 'bg-muted text-muted-foreground';
    }
  };

  const getItemIcon = (status: Phase['status'], index: number) => {
    if (status === 'completed') return '✓';
    if (status === 'in-progress' && index < 1) return '✓';
    if (status === 'in-progress' && index < 3) return '◉';
    return '○';
  };

  const getItemColor = (status: Phase['status'], index: number) => {
    if (status === 'completed') return 'text-accent';
    if (status === 'in-progress' && index < 1) return 'text-accent';
    if (status === 'in-progress' && index < 3) return 'text-primary';
    return 'text-muted-foreground';
  };

  return (
    <section id="roadmap" className="py-20 relative bg-gradient-to-b from-background via-muted/20 to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">Roadmap</h2>
          <p className="text-xl text-muted-foreground">Our spooky journey to the moon 🌙</p>
        </div>
        
        <div className="max-w-4xl mx-auto space-y-8">
          {phases.map((phase) => (
            <div 
              key={phase.number} 
              className={`relative scroll-fade-in ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: phase.delay ? `${phase.delay}s` : undefined }}
            >
              <div className="flex items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full halloween-gradient flex items-center justify-center text-3xl animate-pulse-glow">
                    {phase.emoji}
                  </div>
                </div>
                <div 
                  className="flex-1 bg-card border border-border rounded-2xl p-6 hover:scale-102 transition-transform"
                  data-testid={`roadmap-phase-${phase.number}`}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-2xl font-bold text-primary">Phase {phase.number}: {phase.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(phase.status)}`}>
                      {phase.statusText}
                    </span>
                  </div>
                  <ul className="space-y-2 text-muted-foreground">
                    {phase.items.map((item, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className={getItemColor(phase.status, index)}>
                          {getItemIcon(phase.status, index)}
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
