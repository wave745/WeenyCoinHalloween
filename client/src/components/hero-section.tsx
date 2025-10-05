import { useParallax } from '@/hooks/use-scroll-animation';
import { Button } from '@/components/ui/button';
import weenyImage from '@assets/BackgroundEraser_20251003_161709572_1759505737101.png';

export function HeroSection() {
  const parallaxOffset = useParallax();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background gradient */}
      <div className="absolute inset-0 halloween-gradient opacity-20"></div>
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255, 107, 0, 0.1) 0%, transparent 50%)' }}></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column: Text content */}
          <div className="text-center lg:text-left">
            <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/20 border border-primary/50">
              <span className="text-primary font-semibold">🎃 Halloween Special Launch</span>
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-display text-glow mb-6 leading-tight">
              Meet <span className="text-primary">Weeny</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              The spookiest ghost memecoin on Solana. Join the haunted house party! 👻🎃
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                className="px-8 py-4 rounded-xl halloween-gradient text-white font-bold text-lg hover:scale-105 transition-transform spooky-glow"
                data-testid="button-buy-weeny-now"
              >
                Buy $WEENY Now
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary" data-testid="stat-market-cap">$2.4M</div>
                <div className="text-sm text-muted-foreground">Market Cap</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent" data-testid="stat-holders">12.8K</div>
                <div className="text-sm text-muted-foreground">Holders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary" data-testid="stat-spooky">100%</div>
                <div className="text-sm text-muted-foreground">Spooky</div>
              </div>
            </div>
          </div>
          
          {/* Right column: Character image */}
          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 halloween-gradient opacity-30 blur-3xl rounded-full animate-pulse-glow"></div>
            <img 
              src={weenyImage} 
              alt="Weeny character - cute ghost saying BOO" 
              className="relative z-10 w-full max-w-md animate-float drop-shadow-2xl"
              data-testid="img-weeny-character"
              style={{
                transform: `translateY(${parallaxOffset * 0.5}px)`
              }}
            />
            
            {/* Floating decorative elements */}
            <div 
              className="absolute top-10 left-10 text-6xl animate-float-slow"
              style={{
                transform: `translateY(${parallaxOffset * 0.3}px)`
              }}
            >
              🎃
            </div>
            <div 
              className="absolute bottom-10 right-10 text-5xl animate-float"
              style={{
                animationDelay: '1s',
                transform: `translateY(${parallaxOffset * 0.4}px)`
              }}
            >
              👻
            </div>
            <div 
              className="absolute top-1/2 -right-10 text-4xl animate-bounce"
              style={{
                animationDelay: '0.5s',
                transform: `translateY(${parallaxOffset * 0.2}px)`
              }}
            >
              🦇
            </div>
          </div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-8 h-12 rounded-full border-2 border-primary/50 flex items-start justify-center p-2">
          <div className="w-1 h-3 rounded-full bg-primary animate-pulse"></div>
        </div>
      </div>
    </section>
  );
}
