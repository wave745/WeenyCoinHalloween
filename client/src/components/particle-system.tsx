import { useEffect, useState } from 'react';

interface Particle {
  id: number;
  type: string;
  x: number;
  y: number;
  duration: number;
  size: number;
}

interface FloatingGhost {
  id: number;
  y: number;
  x: number;
}

export function ParticleSystem() {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [ghosts, setGhosts] = useState<FloatingGhost[]>([]);

  useEffect(() => {
    const particleTypes = ['🍂', '🍁', '👻', '🎃', '🦇', '💀'];
    let particleId = 0;
    let ghostId = 0;

    const createParticle = () => {
      const particle: Particle = {
        id: particleId++,
        type: particleTypes[Math.floor(Math.random() * particleTypes.length)],
        x: Math.random() * window.innerWidth,
        y: -50,
        duration: 10 + Math.random() * 20,
        size: 20 + Math.random() * 30,
      };

      setParticles(prev => [...prev, particle]);

      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== particle.id));
      }, particle.duration * 1000);
    };

    const createFloatingGhost = () => {
      const ghost: FloatingGhost = {
        id: ghostId++,
        y: Math.random() * (window.innerHeight - 100),
        x: -60,
      };

      setGhosts(prev => [...prev, ghost]);

      const moveGhost = () => {
        setGhosts(prev => prev.map(g => 
          g.id === ghost.id 
            ? { ...g, x: g.x + 1 }
            : g
        ));

        if (ghost.x < window.innerWidth + 60) {
          setTimeout(moveGhost, 50);
        } else {
          setGhosts(prev => prev.filter(g => g.id !== ghost.id));
        }
      };

      setTimeout(moveGhost, 50);
    };

    const particleInterval = setInterval(createParticle, 500);
    const ghostInterval = setInterval(createFloatingGhost, 8000);

    return () => {
      clearInterval(particleInterval);
      clearInterval(ghostInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
      {particles.map(particle => (
        <div
          key={particle.id}
          className="particle animate-fall"
          style={{
            left: particle.x,
            top: particle.y,
            fontSize: particle.size,
            animationDuration: `${particle.duration}s`,
            position: 'fixed',
            opacity: 0.7,
          }}
        >
          {particle.type}
        </div>
      ))}
      
      {ghosts.map(ghost => (
        <div
          key={ghost.id}
          className="animate-float-ghost"
          style={{
            position: 'fixed',
            left: ghost.x,
            top: ghost.y,
            fontSize: '40px',
            opacity: 0.3,
            pointerEvents: 'none',
          }}
        >
          👻
        </div>
      ))}
    </div>
  );
}
