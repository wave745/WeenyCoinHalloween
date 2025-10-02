import { useScrollAnimation } from '@/hooks/use-scroll-animation';

export function AboutSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`max-w-4xl mx-auto text-center scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-6">About Weeny</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
            Born in the haunted depths of the Solana blockchain, Weeny is not just another memecoin. 
            This adorable yet spooky creature brings Halloween vibes all year round. With eyes that see into your crypto wallet 
            and a fluffiness that melts even the coldest bear market, Weeny is here to haunt your portfolio... in a good way! 🎃👻
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <div className="bg-card border border-border rounded-2xl p-6 hover:scale-105 transition-transform spooky-glow" data-testid="card-community-driven">
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Community Driven</h3>
              <p className="text-muted-foreground">Built by the spooky community, for the spooky community</p>
            </div>
            
            <div 
              className="bg-card border border-border rounded-2xl p-6 hover:scale-105 transition-transform spooky-glow"
              data-testid="card-lightning-fast"
            >
              <div className="text-5xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Lightning Fast</h3>
              <p className="text-muted-foreground">Powered by Solana's blazing-fast blockchain</p>
            </div>
            
            <div 
              className="bg-card border border-border rounded-2xl p-6 hover:scale-105 transition-transform spooky-glow"
              data-testid="card-deflationary"
            >
              <div className="text-5xl mb-4">🔥</div>
              <h3 className="text-xl font-bold mb-2 text-primary">Deflationary</h3>
              <p className="text-muted-foreground">Burn mechanisms to keep the supply spooky scarce</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
