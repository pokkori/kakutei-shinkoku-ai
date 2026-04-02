'use client';

type OrbTheme = 'legal' | 'life' | 'business' | 'betting' | 'game' | 'kanji' | 'finance';

const THEME_COLORS: Record<OrbTheme, { orb1: string; orb2: string; orb3: string }> = {
  legal: {
    orb1: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
  },
  life: {
    orb1: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
  },
  business: {
    orb1: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #3b82f6 0%, transparent 70%)',
  },
  betting: {
    orb1: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #8b5cf6 0%, transparent 70%)',
  },
  game: {
    orb1: 'radial-gradient(circle, #6366f1 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #ec4899 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #06b6d4 0%, transparent 70%)',
  },
  kanji: {
    orb1: 'radial-gradient(circle, #dc2626 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #7c3aed 0%, transparent 70%)',
  },
  finance: {
    orb1: 'radial-gradient(circle, #10b981 0%, transparent 70%)',
    orb2: 'radial-gradient(circle, #f59e0b 0%, transparent 70%)',
    orb3: 'radial-gradient(circle, #0ea5e9 0%, transparent 70%)',
  },
};

interface OrbBackgroundProps {
  theme?: OrbTheme;
}

export default function OrbBackground({ theme = 'finance' }: OrbBackgroundProps) {
  const colors = THEME_COLORS[theme] ?? THEME_COLORS.finance;

  return (
    <div
      aria-hidden="true"
      className="orb-container"
      style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}
    >
      <div
        className="orb"
        style={{
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'orbFloat 12s ease-in-out infinite',
          width: 600,
          height: 600,
          background: colors.orb1,
          top: -200,
          left: -200,
          animationDelay: '0s',
        }}
      />
      <div
        className="orb"
        style={{
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'orbFloat 12s ease-in-out infinite',
          width: 500,
          height: 500,
          background: colors.orb2,
          bottom: -150,
          right: -100,
          animationDelay: '-4s',
        }}
      />
      <div
        className="orb"
        style={{
          position: 'absolute',
          borderRadius: '50%',
          filter: 'blur(80px)',
          opacity: 0.3,
          animation: 'orbFloat 12s ease-in-out infinite',
          width: 400,
          height: 400,
          background: colors.orb3,
          top: '50%',
          left: '40%',
          animationDelay: '-8s',
        }}
      />
    </div>
  );
}
