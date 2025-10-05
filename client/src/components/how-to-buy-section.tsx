import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import pumpfunLogo from '@assets/pumpfun-logo.png';

interface Step {
  number: number;
  title: string;
  description: string;
  emoji: string;
  delay?: number;
}

export function HowToBuySection() {
  const { ref, isVisible } = useScrollAnimation();

  const steps: Step[] = [
    {
      number: 1,
      title: "Get a Wallet",
      description: "Download Phantom or Solflare wallet for your device",
      emoji: "👻",
    },
    {
      number: 2,
      title: "Get SOL",
      description: "Purchase SOL from an exchange and send it to your wallet",
      emoji: "💰",
      delay: 0.1,
    },
    {
      number: 3,
      title: "Visit DEX",
      description: "Go to Jupiter or pump.fun and connect your wallet",
      emoji: "🔄",
      delay: 0.2,
    },
    {
      number: 4,
      title: "Swap for $WEENY",
      description: "Paste the contract address and swap your SOL for $WEENY",
      emoji: "🎃",
      delay: 0.3,
    },
  ];

  return (
    <section id="how-to-buy" className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">How to Buy</h2>
          <p className="text-xl text-muted-foreground">Join the Weeny haunted house in 4 spooky steps</p>
        </div>
        
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className={`bg-card border border-border rounded-2xl p-6 text-center scroll-fade-in hover:scale-105 transition-transform spooky-glow ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: step.delay ? `${step.delay}s` : undefined }}
              data-testid={`step-${step.number}`}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full halloween-gradient flex items-center justify-center text-3xl font-bold">
                {step.number}
              </div>
              <h3 className="text-xl font-bold mb-3 text-primary">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <div className="text-4xl">{step.emoji}</div>
            </div>
          ))}
        </div>
        
        {/* Quick buy buttons */}
        <div className={`max-w-3xl mx-auto mt-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <div className="bg-card border border-border rounded-2xl p-8 text-center" data-testid="quick-buy-section">
            <h3 className="text-2xl font-bold mb-6">Quick Buy Links</h3>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="px-8 py-4 rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold hover:scale-105 transition-transform" data-testid="button-buy-jupiter">
                Buy on Jupiter 🪐
              </Button>
              <Button className="px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-bold hover:scale-105 transition-transform flex items-center gap-2 justify-center" data-testid="button-buy-pumpfun">
                <img src={pumpfunLogo} alt="pump.fun" className="h-6 w-6" />
                Buy on pump.fun
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
