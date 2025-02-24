"use client";

export function GradientBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: '5%',
      left: '5%',
      right: '5%',
      bottom: '15%',
      zIndex: -1,
    }}>
      <style jsx>{`
        div::after {
          position: absolute;
          content: "";
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(26, 44, 77, 1) 62%, rgba(20, 49, 81, 1) 100%);
          filter: blur(50px);
          z-index: -1;
        }
      `}</style>
    </div>
  );
} 