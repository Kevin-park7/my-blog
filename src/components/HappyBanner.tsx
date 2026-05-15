interface HappyBannerProps {
  title?: string;
  message?: string;
}

export function HappyBanner({
  title = "✨ 재미있는 학습!",
  message = "초보자도 따라할 수 있어요",
}: HappyBannerProps) {
  return (
    <div className="bg-gradient-to-r from-orange-100 to-pink-100 dark:from-orange-900 dark:to-pink-900 rounded-2xl p-8 border-2 border-orange-300 dark:border-orange-700 text-center my-12">
      <h2 className="text-2xl font-bold text-orange-600 dark:text-orange-300 mb-2">
        {title}
      </h2>
      <p className="text-gray-700 dark:text-gray-300">
        {message}
      </p>
    </div>
  );
}
