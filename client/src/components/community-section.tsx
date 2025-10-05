import { useScrollAnimation } from '@/hooks/use-scroll-animation';
import { SiX } from 'react-icons/si';

interface SocialLink {
  name: string;
  icon: typeof SiX;
  delay?: number;
}

export function CommunitySection() {
  const { ref, isVisible } = useScrollAnimation();

  const socialLinks: SocialLink[] = [
    {
      name: "X (Twitter)",
      icon: SiX,
    },
  ];

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">Join the Haunted House</h2>
          <p className="text-xl text-muted-foreground">Connect with fellow Weeny believers across the spookyverse</p>
        </div>
        
        <div className="max-w-md mx-auto grid grid-cols-1 gap-6">
          {socialLinks.map((link) => {
            const Icon = link.icon;
            return (
              <a
                key={link.name}
                href="#"
                className={`bg-card border border-border rounded-2xl p-8 text-center hover:scale-110 transition-transform spooky-glow scroll-fade-in group ${isVisible ? 'visible' : ''}`}
                style={{ animationDelay: link.delay ? `${link.delay}s` : undefined }}
                data-testid={`link-${link.name.toLowerCase()}`}
              >
                <div className="flex justify-center mb-4 group-hover:animate-bounce">
                  <Icon className="text-6xl text-primary" />
                </div>
                <h3 className="text-xl font-bold text-primary">{link.name}</h3>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
