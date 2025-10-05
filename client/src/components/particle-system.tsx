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
    let ghostId = 0;

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

    const ghostInterval = setInterval(createFloatingGhost, 8000);

    return () => {
      clearInterval(ghostInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[1]">
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
