import { MDXRemote } from 'next-mdx-remote/rsc';

const components = {
  h1: ({ children }: any) => (
    <h1 className="text-4xl font-bold text-blue-900 mt-8 mb-4">
      {children}
    </h1>
  ),
  h2: ({ children }: any) => (
    <h2 className="text-3xl font-semibold text-orange-500 mt-8 mb-4">
      {children}
    </h2>
  ),
  h3: ({ children }: any) => (
    <h3 className="text-2xl font-semibold text-gray-800 mt-6 mb-3">
      {children}
    </h3>
  ),
  p: ({ children }: any) => (
    <p className="text-gray-700 leading-relaxed mb-4">
      {children}
    </p>
  ),
  a: ({ href, children }: any) => (
    <a href={href} className="text-orange-500 hover:underline">
      {children}
    </a>
  ),
  ul: ({ children }: any) => (
    <ul className="list-disc list-inside mb-4 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }: any) => (
    <ol className="list-decimal list-inside mb-4 space-y-2">
      {children}
    </ol>
  ),
  code: ({ children, className }: any) => {
    const language = className?.replace('language-', '') || 'text';
    return (
      <code className={`${className} bg-gray-900 text-gray-100 p-1 rounded`}>
        {children}
      </code>
    );
  },
  pre: ({ children }: any) => (
    <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4">
      {children}
    </pre>
  ),
  blockquote: ({ children }: any) => (
    <blockquote className="border-l-4 border-orange-500 pl-4 italic text-gray-600 my-4">
      {children}
    </blockquote>
  ),
};

export async function renderMDX(content: string) {
  return <MDXRemote source={content} components={components} />;
}
