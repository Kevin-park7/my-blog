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
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-slate-800 rounded-lg p-8 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-gray-400 dark:hover:border-slate-700 transition-all duration-200 h-full flex flex-col items-center text-center gap-4">
        <span className="text-5xl">{icon}</span>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">{title}</h3>
        <p className="text-base text-gray-700 dark:text-gray-200 flex-1">{description}</p>
        <span className="inline-block mt-2 px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold rounded-lg hover:opacity-90 transition-opacity duration-150">
          Play →
        </span>
      </div>
    </Link>
  );
}
