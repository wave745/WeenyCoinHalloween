import { Button } from '@/components/ui/button';

export function Navigation() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur border-b border-border" data-testid="navigation">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-1 animate-pulse-glow">
            <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
              <span className="text-2xl">👻</span>
            </div>
          </div>
          <span className="text-2xl font-display text-primary">Weeny</span>
        </div>
        
        <div className="hidden md:flex items-center gap-6">
          <button 
            onClick={() => scrollToSection('about')} 
            className="text-foreground hover:text-primary transition-colors"
            data-testid="nav-about"
          >
            About
          </button>
          <button 
            onClick={() => scrollToSection('how-to-buy')} 
            className="text-foreground hover:text-primary transition-colors"
            data-testid="nav-how-to-buy"
          >
            How to Buy
          </button>
          <button 
            onClick={() => scrollToSection('roadmap')} 
            className="text-foreground hover:text-primary transition-colors"
            data-testid="nav-roadmap"
          >
            Roadmap
          </button>
        </div>
        
        <Button className="px-6 py-2 rounded-lg halloween-gradient text-white font-semibold hover:scale-105 transition-transform" data-testid="button-buy-weeny">
          Buy $WEENY
        </Button>
      </div>
    </nav>
  );
}
