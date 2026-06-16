import Link from 'next/link';

interface GameCardProps {
  name: string;
  ko: string;
  icon: string;
  description: string;
  route: string;
}

export default function GameCard({ name, ko, icon, description, route }: GameCardProps) {
  return (
    <Link href={route} className="game-card-link">
      <article className="fn-game-card">
        <div className="fn-game-icon">{icon}</div>
        <div className="fn-game-body">
          <h2 className="fn-game-name">{name}</h2>
          <div className="fn-game-ko">{ko}</div>
          <p className="fn-game-desc">{description}</p>
        </div>
        <div className="fn-game-play">
          Play <span className="arr">→</span>
        </div>
      </article>
    </Link>
  );
}
