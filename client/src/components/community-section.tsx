import { useScrollAnimation } from '@/hooks/use-scroll-animation';

interface SocialLink {
  name: string;
  emoji: string;
  followers: string;
  delay?: number;
}

export function CommunitySection() {
  const { ref, isVisible } = useScrollAnimation();

  const socialLinks: SocialLink[] = [
    {
      name: "Twitter",
      emoji: "🐦",
      followers: "50K+ Followers",
    },
    {
      name: "Telegram",
      emoji: "✈️",
      followers: "35K+ Members",
      delay: 0.1,
    },
    {
      name: "Discord",
      emoji: "💬",
      followers: "28K+ Members",
      delay: 0.2,
    },
    {
      name: "Reddit",
      emoji: "🤖",
      followers: "15K+ Members",
      delay: 0.3,
    },
  ];

  return (
    <section className="py-20 relative" ref={ref}>
      <div className="container mx-auto px-4">
        <div className={`text-center mb-12 scroll-fade-in ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-5xl md:text-6xl font-display text-primary mb-4">Join the Haunted House</h2>
          <p className="text-xl text-muted-foreground">Connect with fellow Weeny believers across the spookyverse</p>
        </div>
        
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href="#"
              className={`bg-card border border-border rounded-2xl p-8 text-center hover:scale-110 transition-transform spooky-glow scroll-fade-in group ${isVisible ? 'visible' : ''}`}
              style={{ animationDelay: link.delay ? `${link.delay}s` : undefined }}
              data-testid={`link-${link.name.toLowerCase()}`}
            >
              <div className="text-6xl mb-4 group-hover:animate-bounce">{link.emoji}</div>
              <h3 className="text-xl font-bold mb-2 text-primary">{link.name}</h3>
              <p className="text-muted-foreground text-sm">{link.followers}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
