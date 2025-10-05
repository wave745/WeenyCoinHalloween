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
          <div className="flex justify-center mb-8">
            {/* Brand */}
            <div className="text-center max-w-md">
              <div className="flex items-center justify-center gap-3 mb-4">
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
          </div>
          
          <div className="pt-8 border-t border-border text-center text-muted-foreground text-sm">
            <p>👻 Haunting the blockchain since 2024... Enter at your own risk 👻</p>
            <p className="mt-2">$WEENY is a memecoin with no intrinsic value or expectation of financial return.</p>
            <p className="mt-2">This is not financial advice. Always DYOR! 👻</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
