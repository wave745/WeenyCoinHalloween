import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';

export function TokenomicsSection() {
  const { ref, isVisible } = useScrollAnimation();
  const { ref: distributionRef, isVisible: distributionVisible } = useScrollAnimation<HTMLDivElement>();
  const { ref: statsRef, isVisible: statsVisible } = useScrollAnimation<HTMLDivElement>();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="tokenomics" className="py-20 relative bg-gradient-to-b from-background via-card to-background" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">Tokenomics</h2>
          <p className="text-xl text-muted-foreground">Spooky supply distribution that makes sense</p>
        </div>
        
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {/* Distribution Chart */}
          <div className={`bg-card border border-border rounded-2xl p-8 scroll-fade-in spooky-glow ${distributionVisible ? 'visible' : ''}`} ref={distributionRef} data-testid="card-distribution">
            <h3 className="text-2xl font-bold mb-6 text-center">Supply Distribution</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Liquidity Pool</span>
                  <span className="font-bold text-primary">40%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full halloween-gradient" style={{ width: '40%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Community Rewards</span>
                  <span className="font-bold text-accent">30%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-accent" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Marketing</span>
                  <span className="font-bold text-secondary">15%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-secondary" style={{ width: '15%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Team (Locked)</span>
                  <span className="font-bold text-destructive">10%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-destructive" style={{ width: '10%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-muted-foreground">Burn (Already Burned)</span>
                  <span className="font-bold text-foreground">5%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
                  <div className="h-full bg-foreground/50" style={{ width: '5%' }}></div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Key Stats */}
          <div className="space-y-4" ref={statsRef}>
            <div className={`bg-card border border-border rounded-2xl p-6 scroll-fade-in hover:scale-105 transition-transform ${statsVisible ? 'visible' : ''}`} data-testid="card-total-supply">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Total Supply</div>
                  <div className="text-3xl font-bold">1,000,000,000</div>
                </div>
                <div className="text-5xl">🎃</div>
              </div>
            </div>
            
            <div className={`bg-card border border-border rounded-2xl p-6 scroll-fade-in hover:scale-105 transition-transform ${statsVisible ? 'visible' : ''}`} data-testid="card-burned-tokens">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Burned Tokens</div>
                  <div className="text-3xl font-bold text-destructive">50,000,000</div>
                </div>
                <div className="text-5xl">🔥</div>
              </div>
            </div>
            
            <div className={`bg-card border border-border rounded-2xl p-6 scroll-fade-in hover:scale-105 transition-transform ${statsVisible ? 'visible' : ''}`} data-testid="card-tax-rate">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Tax Rate</div>
                  <div className="text-3xl font-bold text-accent">0%</div>
                </div>
                <div className="text-5xl">✨</div>
              </div>
            </div>
            
            <div className={`bg-card border border-border rounded-2xl p-6 scroll-fade-in hover:scale-105 transition-transform ${statsVisible ? 'visible' : ''}`} data-testid="card-liquidity-locked">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-sm text-muted-foreground mb-1">Liquidity Locked</div>
                  <div className="text-3xl font-bold text-primary">12 Months</div>
                </div>
                <div className="text-5xl">🔒</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contract Address */}
        <div className={`max-w-4xl mx-auto mt-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="bg-card border border-border rounded-2xl p-6 text-center" data-testid="contract-address-section">
            <div className="text-sm text-muted-foreground mb-2">Contract Address</div>
            <div className="flex items-center justify-center gap-2 flex-wrap">
              <code className="px-4 py-2 bg-muted rounded-lg font-mono text-sm" data-testid="contract-address">
                Weeny...SpookyAddress123456789
              </code>
              <Button
                onClick={() => copyToClipboard('Weeny...SpookyAddress123456789')}
                variant="ghost"
                className="px-4 py-2 rounded-lg bg-primary/20 hover:bg-primary/30 text-primary transition-colors"
                data-testid="button-copy-address"
              >
                Copy 📋
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
