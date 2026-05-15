import Link from 'next/link';

interface GameCardProps {
  icon: string;
  title: string;
  description: string;
  href: string;
}

export function GameCard({ icon, title, description, href }: GameCardProps) {
  return (
    <Link href={href} className="group block">
      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-sm hover:shadow-lg hover:scale-105 transition-all duration-200 h-full flex flex-col items-center text-center gap-4">
        <span className="text-5xl">{icon}</span>
        <h3 className="text-xl font-bold text-blue-900 dark:text-gray-100">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm flex-1">{description}</p>
        <span className="inline-block mt-2 px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-full transition-colors duration-150">
          Play
        </span>
      </div>
    </Link>
  );
}
