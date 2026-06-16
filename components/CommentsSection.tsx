export default function CommentsSection({ postId: _postId }: { postId: string }) {
  return (
    <div className="mt-12 pt-8 border-t border-[var(--rule)]">
      <h3 className="text-2xl font-bold mb-4">댓글</h3>
      <div className="p-6 rounded-lg border border-[var(--rule)] bg-[var(--paper-2)]">
        <p className="text-[var(--ink)] mb-2">댓글 기능은 준비 중입니다.</p>
        <p className="text-[var(--muted)] text-sm">
          피드백이나 질문은{' '}
          <a
            href="mailto:seoonwon8503@gmail.com"
            className="text-[var(--accent)] hover:underline"
          >
            이메일
          </a>
          로 남겨주세요. 빠르게 답변드리겠습니다.
        </p>
      </div>
    </div>
  );
}
