import { useEffect } from 'react';
import { Navigation } from '@/components/navigation';
import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { HowToBuySection } from '@/components/how-to-buy-section';
import { RoadmapSection } from '@/components/roadmap-section';
import { CommunitySection } from '@/components/community-section';
import { Footer } from '@/components/footer';
import { ParticleSystem } from '@/components/particle-system';

export default function Home() {
  useEffect(() => {
    // Cursor trail effect
    let lastX = 0;
    let lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (Math.random() > 0.95) {
        const trail = document.createElement('div');
        const trails = ['✨', '🔮', '💫', '⭐'];
        trail.textContent = trails[Math.floor(Math.random() * trails.length)];
        trail.style.position = 'fixed';
        trail.style.left = e.clientX + 'px';
        trail.style.top = e.clientY + 'px';
        trail.style.pointerEvents = 'none';
        trail.style.fontSize = '20px';
        trail.style.opacity = '0.7';
        trail.style.zIndex = '9999';
        trail.style.transition = 'all 1s ease-out';
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
          trail.style.opacity = '0';
          trail.style.transform = 'translateY(-30px)';
        }, 10);
        
        setTimeout(() => {
          trail.remove();
        }, 1000);
      }
      
      lastX = e.clientX;
      lastY = e.clientY;
    };

    document.addEventListener('mousemove', handleMouseMove);

    // Loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
      document.body.style.transition = 'opacity 0.5s ease-in';
      document.body.style.opacity = '1';
    }, 100);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="dark">
      <ParticleSystem />
      <Navigation />
      <main>
        <HeroSection />
        <AboutSection />
        <HowToBuySection />
        <RoadmapSection />
        <CommunitySection />
      </main>
      <Footer />
    </div>
  );
}
