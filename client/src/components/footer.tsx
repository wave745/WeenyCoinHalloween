export function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="py-12 border-t border-border bg-gradient-to-b from-background to-card">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary p-1">
                  <div className="w-full h-full rounded-full bg-background flex items-center justify-center">
                    <span className="text-2xl">👻</span>
                  </div>
                </div>
                <span className="text-2xl font-display text-primary">Weeny</span>
              </div>
              <p className="text-muted-foreground text-sm">
                The spookiest memecoin on Solana. Join the haunted house party and let's go to the moon together! 🎃👻🚀
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-bold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>
                  <button 
                    onClick={() => scrollToSection('about')} 
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-about"
                  >
                    About Weeny
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('tokenomics')} 
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-tokenomics"
                  >
                    Tokenomics
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('how-to-buy')} 
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-how-to-buy"
                  >
                    How to Buy
                  </button>
                </li>
                <li>
                  <button 
                    onClick={() => scrollToSection('roadmap')} 
                    className="hover:text-primary transition-colors"
                    data-testid="footer-link-roadmap"
                  >
                    Roadmap
                  </button>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h4 className="font-bold text-lg mb-4">Resources</h4>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-whitepaper">Whitepaper</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-audit">Audit Report</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-brand">Brand Assets</a></li>
                <li><a href="#" className="hover:text-primary transition-colors" data-testid="footer-link-contact">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
            <p>© 2024 Weeny Token. All rights reserved. $WEENY is a memecoin with no intrinsic value or expectation of financial return.</p>
            <p className="mt-2">This is not financial advice. Always DYOR! 👻</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
