interface HappyBannerProps {
  title?: string;
  message?: string;
}

export function HappyBanner({
  title = "✨ 재미있는 학습!",
  message = "초보자도 따라할 수 있어요",
}: HappyBannerProps) {
  return (
    <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 border border-gray-200 dark:border-slate-800 text-center my-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
}
