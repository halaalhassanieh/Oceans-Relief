// ReliefCardsGrid.tsx
import { useState } from 'react';
import ReliefCard from './ReliefCard';

const ReliefCardsGrid = ({ cards, colors, theme }: any) => {
  const [flipped, setFlipped] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    const next = new Set(flipped);
    next.has(id) ? next.delete(id) : next.add(id);
    setFlipped(next);
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
      {cards.map((card: any, i: number) => (
        <ReliefCard
          key={card.id}
          card={card}
          index={i}
          isFlipped={flipped.has(card.id)}
          onFlip={() => toggle(card.id)}
          colors={colors}
          theme={theme}
        />
      ))}
    </div>
  );
};

export default ReliefCardsGrid;
