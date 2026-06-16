export interface Post {
  id: string;
  title: string;
  subtitle: string;
  date: string;
  readMin: number;
  tags: string[];
  category: string;
  excerpt: string;
  body: Block[];
}

interface Block {
  type: 'p' | 'h2' | 'code' | 'quote';
  text?: string;
  lang?: string;
}

export const POSTS: Post[] = [
  {
    id: "nextjs-14-migration-lessons",
    title: "Next.js 14로 마이그레이션하며 배운 5가지",
    subtitle: "App Router, Server Components, 그리고 내가 틀렸던 것들",
    date: "2026-06-16",
    readMin: 7,
    tags: ["Next.js", "블로그"],
    category: "Frontend",
    excerpt: "Pages Router에서 App Router로 갈아탈 때 '그냥 폴더 이름만 바꾸면 되지 않나?' 라고 생각했다. 완전히 틀렸다.",
    body: [
      { type: "p", text: "이 블로그를 Next.js 14 App Router로 직접 만들면서 배운 것들을 정리했다. 튜토리얼에선 안 가르쳐주는, 실제로 부딪혀야 아는 것들이다." },
      { type: "h2", text: "1. 'use client'는 예외가 아니라 경계다" },
      { type: "p", text: "처음엔 useState를 쓰는 컴포넌트마다 습관적으로 'use client'를 붙였다. 그런데 그건 Server Component의 이점을 전부 날리는 짓이다. 'use client'는 '이 컴포넌트부터 아래는 클라이언트에서만 돌아간다'는 경계 선언이다. 가능한 한 트리의 말단에 두어야 한다." },
      { type: "code", lang: "typescript", text: "// 나쁜 예: 부모 전체를 클라이언트로 만든다\n'use client'\nexport default function PostPage({ post }) {\n  const [liked, setLiked] = useState(false)\n  return (\n    <article>\n      <PostBody post={post} />  {/* 서버에서 렌더할 수 있었는데 */}\n      <LikeButton liked={liked} onClick={() => setLiked(true)} />\n    </article>\n  )\n}\n\n// 좋은 예: 인터랙션이 필요한 부분만 분리\n// app/posts/[id]/page.tsx (Server Component)\nexport default function PostPage({ post }) {\n  return (\n    <article>\n      <PostBody post={post} />  {/* 서버 렌더링 */}\n      <LikeButton />            {/* 얘만 'use client' */}\n    </article>\n  )\n}" },
      { type: "h2", text: "2. fetch 캐싱은 기본이 aggressive하다" },
      { type: "p", text: "App Router에서 fetch는 기본적으로 결과를 캐시한다. 개발 중엔 데이터가 안 바뀌는 것 같아서 한참 헤맸다. 동적 데이터를 쓸 땐 cache: 'no-store'를 명시하거나, next: { revalidate: 60 }으로 주기를 지정해야 한다." },
      { type: "code", lang: "typescript", text: "// 정적 (빌드 시 1회)\nconst data = await fetch('/api/posts')\n\n// 60초마다 재검증\nconst data = await fetch('/api/posts', { next: { revalidate: 60 } })\n\n// 항상 최신\nconst data = await fetch('/api/posts', { cache: 'no-store' })" },
      { type: "h2", text: "3. layout.tsx와 page.tsx의 역할을 명확히 구분하라" },
      { type: "p", text: "layout.tsx는 공유 UI다. 같은 경로 아래에서 페이지가 바뀌어도 layout은 다시 렌더링되지 않는다. 그래서 nav, sidebar, 인증 상태 같은 것들은 layout에 넣어야 한다. page.tsx는 그 경로의 고유 콘텐츠만." },
      { type: "h2", text: "4. 서버 에러는 error.tsx가, 로딩은 loading.tsx가 잡는다" },
      { type: "p", text: "각 폴더에 error.tsx와 loading.tsx를 두면 자동으로 Error Boundary와 Suspense가 연결된다. 따로 설정할 필요 없다. 처음엔 이게 어디서 작동하는지 몰라서 Suspense를 직접 wrap하고 있었는데, 파일만 만들면 된다." },
      { type: "h2", text: "5. metadata는 export하는 방식이 두 가지다" },
      { type: "p", text: "정적 페이지는 metadata 객체를, 동적 페이지는 generateMetadata 함수를 export한다. SEO 작업할 때 혼동하기 쉬운 부분이다." },
      { type: "code", lang: "typescript", text: "// 정적 메타데이터\nexport const metadata = {\n  title: '포스트 제목',\n  description: '설명'\n}\n\n// 동적 메타데이터 (params에서 데이터 가져올 때)\nexport async function generateMetadata({ params }) {\n  const post = await getPost(params.id)\n  return { title: post.title }\n}" },
      { type: "quote", text: "App Router는 새 문법이 아니라 새 사고방식이다. '어디서 실행되나'를 항상 생각하면 나머지는 자연스럽게 따라온다." },
    ]
  },
  {
    id: "claude-code-six-months",
    title: "Claude Code로 6개월, 이제 AI 없이 못 산다",
    subtitle: "솔직한 후기: 생산성이 오른 것과 독이 된 것",
    date: "2026-06-16",
    readMin: 6,
    tags: ["Claude Code", "AI", "개발 팁"],
    category: "Technology",
    excerpt: "AI 코딩 도구가 처음 나왔을 때 '결국 시니어가 더 잘 써먹겠지'라고 생각했다. 반은 맞고 반은 틀렸다. 초보일수록 더 조심해야 하지만, 제대로 쓰면 레벨업이 빠르다.",
    body: [
      { type: "p", text: "6개월 전, Claude Code를 처음 켜고 'React 컴포넌트 하나 만들어줘'라고 했다. 동작하는 코드가 나왔고 나는 복붙했다. 그리고 3일 후 버그를 잡지 못해서 처음부터 다시 짰다." },
      { type: "p", text: "이제는 다르게 쓴다. 그 차이를 정리한다." },
      { type: "h2", text: "제대로 쓰는 법: 코드 생성기가 아니라 페어 프로그래머" },
      { type: "p", text: "가장 크게 달라진 건 요청 방식이다. '이거 만들어줘' 대신 '이 코드에서 왜 무한 렌더링이 발생하는지 설명해줘'처럼 이해를 먼저 요청한다. 코드를 받기 전에 왜 그렇게 짜는지 물어본다." },
      { type: "code", lang: "typescript", text: "// 나쁜 요청: 복붙만 하게 된다\n\"useEffect로 API 호출하는 컴포넌트 만들어줘\"\n\n// 좋은 요청: 이해를 강제한다\n\"아래 useEffect에서 의존성 배열을 빈 배열로 두면\n왜 stale closure 문제가 생기는지 설명하고,\n어떻게 고치면 좋을지 알려줘\"\n\nuseEffect(() => {\n  fetchData(userId)  // userId가 바뀌어도 재실행 안 됨\n}, [])" },
      { type: "h2", text: "가장 효과적이었던 사용 패턴 3가지" },
      { type: "p", text: "첫째, 에러 메시지 디버깅. 스택 트레이스 전체를 붙여넣고 '이 에러의 원인과 해결 방법을 알려줘'라고 하면 구글링 10분을 2분으로 줄여준다." },
      { type: "p", text: "둘째, 코드 리뷰 요청. PR 올리기 전에 '이 코드에서 놓친 엣지 케이스나 성능 문제가 있으면 알려줘'라고 한다. 시니어 리뷰어 같은 역할을 한다." },
      { type: "p", text: "셋째, 개념 설명 + 예시 요청. 공식 문서가 이해 안 될 때, '이걸 실생활 비유로 설명하고 내 코드에 적용하면 어떻게 되는지 보여줘'라고 하면 훨씬 빠르게 이해된다." },
      { type: "h2", text: "조심해야 할 것" },
      { type: "p", text: "가장 큰 함정은 AI가 자신 있게 틀린다는 것이다. 특히 최신 라이브러리 버전이나 특정 환경 설정에서 존재하지 않는 API를 만들어내기도 한다. 생성된 코드는 반드시 동작을 이해하고 나서 사용해야 한다." },
      { type: "quote", text: "AI는 생각을 대신해주는 도구가 아니라, 생각의 속도를 높여주는 도구다. 생각 자체를 넘기면 결국 코드의 주인이 사라진다." },
    ]
  },
  {
    id: "react-hooks-game-patterns",
    title: "게임을 만들며 배운 React Hooks 정리",
    subtitle: "useRef, useCallback, useEffect — 헷갈리는 이유와 해결법",
    date: "2026-06-16",
    readMin: 8,
    tags: ["React", "JavaScript", "Hooks"],
    category: "Frontend",
    excerpt: "스네이크 게임을 React로 만들다가 useRef와 useState의 차이를 처음으로 진짜 이해했다. 게임은 훅의 특성을 날카롭게 드러내는 최고의 예제다.",
    body: [
      { type: "p", text: "처음 React Hooks를 배울 때 가장 헷갈렸던 건 'useRef vs useState'였다. 둘 다 값을 저장하는데, 언제 어떤 걸 쓰나?" },
      { type: "p", text: "스네이크 게임을 만들면서 답을 찾았다. 게임 개발은 상태 관리의 경계가 명확해서 훅의 차이를 체감하기 좋다." },
      { type: "h2", text: "useRef — '렌더링과 무관한 값'을 담는 박스" },
      { type: "p", text: "스네이크 게임엔 setInterval이 필요하다. 그런데 인터벌 ID를 useState에 저장하면 저장할 때마다 리렌더링이 일어난다. 렌더링이 필요 없는 값이라면 useRef를 써야 한다." },
      { type: "code", lang: "typescript", text: "// 나쁜 예: 인터벌 ID를 state로 관리하면 불필요한 리렌더링 발생\nconst [intervalId, setIntervalId] = useState<number | null>(null)\n\n// 좋은 예: 렌더링에 영향 없는 값은 ref\nconst intervalRef = useRef<number | null>(null)\n\nfunction startGame() {\n  intervalRef.current = setInterval(moveSnake, 150)\n}\n\nfunction stopGame() {\n  if (intervalRef.current) clearInterval(intervalRef.current)\n}" },
      { type: "h2", text: "useCallback — 함수를 '기억'시키는 이유" },
      { type: "p", text: "게임 키 입력 핸들러를 useEffect 안에서 addEventListener로 등록했다. 그런데 컴포넌트가 리렌더링될 때마다 핸들러 함수가 새로 만들어지고, 이벤트 리스너가 계속 추가됐다." },
      { type: "code", lang: "typescript", text: "// 문제: 매 렌더마다 새 함수 → 이벤트 리스너 누적\nuseEffect(() => {\n  const handleKey = (e: KeyboardEvent) => setDirection(e.key)\n  window.addEventListener('keydown', handleKey)\n  return () => window.removeEventListener('keydown', handleKey)\n}, [])  // handleKey가 클로저 밖에 있어서 stale\n\n// 해결: useCallback으로 함수 메모이제이션\nconst handleKey = useCallback((e: KeyboardEvent) => {\n  setDirection(e.key)\n}, [])  // 의존성이 없으니 처음 한 번만 생성\n\nuseEffect(() => {\n  window.addEventListener('keydown', handleKey)\n  return () => window.removeEventListener('keydown', handleKey)\n}, [handleKey])  // handleKey가 바뀌면 재등록" },
      { type: "h2", text: "useEffect 의존성 배열 — 진짜 의미" },
      { type: "p", text: "의존성 배열은 '이 값이 바뀔 때 effect를 다시 실행해'라는 신호다. 빈 배열 []은 '처음 한 번만', 없으면 '매 렌더마다'. 게임에서 score가 바뀔 때만 최고점 저장 로직을 실행하고 싶다면:" },
      { type: "code", lang: "typescript", text: "useEffect(() => {\n  if (score > highScore) {\n    setHighScore(score)\n    localStorage.setItem('highScore', String(score))\n  }\n}, [score])  // score가 바뀔 때만 실행" },
      { type: "h2", text: "정리: 언제 무엇을 쓰나" },
      { type: "p", text: "화면에 보여야 하면 useState, 렌더링과 무관한 값 저장(인터벌 ID, DOM 참조 등)이면 useRef, 함수를 이벤트 리스너나 의존성으로 넘길 땐 useCallback, 비싼 계산 결과를 캐시하려면 useMemo." },
      { type: "quote", text: "Hooks는 각각의 '책임'이 다르다. 화면을 바꾸는 책임은 useState, 값을 유지하는 책임은 useRef. 이 기준만 기억하면 절반은 해결된다." },
    ]
  },
  {
    id: "typescript-generics-three-patterns",
    title: "TypeScript 초보자를 위한 3가지 제네릭 패턴",
    subtitle: "겁먹지 마라, 제네릭은 그냥 '나중에 채울 빈칸'이다",
    date: "2026-06-16",
    readMin: 6,
    tags: ["TypeScript", "초보자"],
    category: "Frontend",
    excerpt: "제네릭 문서를 처음 읽었을 때 `<T>`가 뭔지 몰라서 닫아버렸다. 이제는 하루에 10번 이상 쓴다. 진짜로 필요한 패턴만 3가지 골랐다.",
    body: [
      { type: "p", text: "제네릭을 한 문장으로 설명하면: '타입을 나중에 결정하는 빈칸'이다. 함수를 쓸 때 어떤 타입을 넣을지 그때그때 정할 수 있게 해준다." },
      { type: "h2", text: "패턴 1: 반환 타입을 입력 타입에 맞추기" },
      { type: "p", text: "API 응답을 파싱하는 함수를 만든다고 하자. User를 파싱할 수도 있고, Post를 파싱할 수도 있다. 제네릭 없이 짜면 any를 쓰거나 함수를 여러 개 만들어야 한다." },
      { type: "code", lang: "typescript", text: "// any를 쓰면 타입 안전성이 사라진다\nfunction parseResponse(data: any): any {\n  return JSON.parse(data)\n}\n\n// 제네릭으로 입력-출력 타입을 연결\nfunction parseResponse<T>(data: string): T {\n  return JSON.parse(data) as T\n}\n\n// 사용할 때 타입을 지정\nconst user = parseResponse<User>(apiResponse)  // user: User\nconst post = parseResponse<Post>(apiResponse)  // post: Post" },
      { type: "h2", text: "패턴 2: extends로 제네릭에 조건 걸기" },
      { type: "p", text: "모든 타입을 받는 게 아니라, id 속성이 있는 타입만 받고 싶을 때 extends를 쓴다. 이걸 'Generic Constraint(제네릭 제약)'라고 한다." },
      { type: "code", lang: "typescript", text: "// id 없는 타입도 들어올 수 있어서 위험\nfunction getById<T>(list: T[], id: string): T | undefined {\n  return list.find((item: any) => item.id === id)  // any 등장\n}\n\n// extends로 'id가 있는 타입만' 제한\nfunction getById<T extends { id: string }>(list: T[], id: string): T | undefined {\n  return list.find(item => item.id === id)  // 타입 안전\n}\n\n// id 없는 타입을 넣으면 컴파일 에러\ngetById([{ name: 'kelvin' }], '1')  // 에러: id 속성이 없음\ngetById([{ id: '1', name: 'kelvin' }], '1')  // 통과" },
      { type: "h2", text: "패턴 3: 여러 타입 파라미터 조합" },
      { type: "p", text: "함수가 두 가지 타입을 받아서 조합할 때 T, U처럼 여러 파라미터를 쓴다. 가장 흔한 예는 key-value 매핑이다." },
      { type: "code", lang: "typescript", text: "// 배열을 특정 키 기준으로 객체로 변환\nfunction groupBy<T, K extends keyof T>(\n  list: T[],\n  key: K\n): Record<string, T[]> {\n  return list.reduce((acc, item) => {\n    const groupKey = String(item[key])\n    return {\n      ...acc,\n      [groupKey]: [...(acc[groupKey] || []), item]\n    }\n  }, {} as Record<string, T[]>)\n}\n\n// 사용 예\nconst posts = [\n  { id: 1, category: 'React', title: '...' },\n  { id: 2, category: 'TypeScript', title: '...' },\n  { id: 3, category: 'React', title: '...' },\n]\n\nconst byCategory = groupBy(posts, 'category')\n// { React: [...], TypeScript: [...] }" },
      { type: "quote", text: "제네릭을 처음 볼 때 겁먹는 이유는 수학적 기호처럼 생겼기 때문이다. 그냥 '여기 타입 이름은 나중에 정할게'라는 빈칸 표시라고 생각하면 훨씬 쉽다." },
    ]
  },
  {
    id: "css-variables-dark-mode",
    title: "왜 CSS 변수로 다크모드를 만들까",
    subtitle: "--paper, --ink, --accent로 테마를 관리하는 법",
    date: "2026-06-16",
    readMin: 5,
    tags: ["CSS", "디자인"],
    category: "Frontend",
    excerpt: "다크모드를 처음 구현할 때 className을 토글하는 방식을 썼다. 동작은 했지만 유지보수가 지옥이었다. CSS 커스텀 프로퍼티가 정답인 이유를 설명한다.",
    body: [
      { type: "p", text: "이 블로그의 다크모드는 JavaScript가 한 줄도 없다. CSS 변수 두 세트와 data-theme 속성 하나로 전체 테마가 바뀐다." },
      { type: "h2", text: "className 토글 방식의 문제" },
      { type: "p", text: "흔히 쓰는 방식은 body에 dark 클래스를 붙이고 .dark .component { color: white } 식으로 짜는 것이다. 컴포넌트가 10개면 괜찮지만, 100개가 되면 CSS 파일이 두 배로 커진다. 모든 컴포넌트에 다크 버전을 따로 써야 하기 때문이다." },
      { type: "code", lang: "css", text: "/* 나쁜 예: 컴포넌트마다 다크 버전을 별도 작성 */\n.card { background: white; color: #111; }\n.dark .card { background: #1a1a1a; color: #eee; }\n\n.button { background: #0070f3; color: white; }\n.dark .button { background: #3291ff; color: white; }\n\n/* 이게 100개 컴포넌트면... */" },
      { type: "h2", text: "CSS 변수 방식: 의미 기반 토큰" },
      { type: "p", text: "컬러에 직접적인 이름(white, black) 대신 역할 이름(--paper, --ink)을 붙인다. 테마가 바뀔 때 변수 값만 교체하면 모든 컴포넌트가 자동으로 따라온다." },
      { type: "code", lang: "css", text: "/* 라이트 테마 기본값 */\n:root {\n  --paper: #fafaf8;     /* 배경 */\n  --ink: #1a1a1a;       /* 본문 텍스트 */\n  --ink-muted: #666;    /* 보조 텍스트 */\n  --accent: #2563eb;    /* 강조색 */\n  --surface: #f0f0ec;   /* 카드 배경 */\n}\n\n/* 다크 테마: 변수 값만 교체 */\n[data-theme=\"dark\"] {\n  --paper: #0f0f0f;\n  --ink: #e8e8e4;\n  --ink-muted: #999;\n  --accent: #60a5fa;\n  --surface: #1a1a1a;\n}\n\n/* 컴포넌트는 변수만 참조, 테마 무관 */\n.card {\n  background: var(--surface);\n  color: var(--ink);\n}" },
      { type: "h2", text: "JavaScript에서 테마 전환" },
      { type: "p", text: "data-theme 속성 하나만 토글하면 된다. CSS가 나머지를 알아서 처리한다." },
      { type: "code", lang: "typescript", text: "function toggleTheme() {\n  const current = document.documentElement.dataset.theme\n  document.documentElement.dataset.theme =\n    current === 'dark' ? 'light' : 'dark'\n}\n\n// localStorage에 저장해서 새로고침 후에도 유지\nfunction initTheme() {\n  const saved = localStorage.getItem('theme') || 'light'\n  document.documentElement.dataset.theme = saved\n}" },
      { type: "h2", text: "추가 이점: system preference 연동" },
      { type: "p", text: "CSS만으로도 OS 다크모드 설정을 감지할 수 있다. prefers-color-scheme 미디어 쿼리와 변수를 조합하면 JavaScript 없이 시스템 설정을 따라간다." },
      { type: "code", lang: "css", text: "@media (prefers-color-scheme: dark) {\n  :root:not([data-theme=\"light\"]) {\n    --paper: #0f0f0f;\n    --ink: #e8e8e4;\n    /* 나머지 다크 토큰들 */\n  }\n}" },
      { type: "quote", text: "좋은 CSS 변수 네이밍은 '무슨 색이냐'가 아니라 '무슨 역할이냐'를 표현한다. --blue-500보다 --accent가, --gray-100보다 --paper가 테마 전환에 훨씬 유연하다." },
    ]
  },
  {
    id: "react-18-concurrent",
    title: "React 18의 Concurrent Features, 6개월 써본 후기",
    subtitle: "useTransition, useDeferredValue, 그리고 Suspense의 진짜 쓸모",
    date: "2026-05-12",
    readMin: 9,
    tags: ["React", "Frontend"],
    category: "Frontend",
    excerpt: "Concurrent rendering은 마법이 아니다. 단지 React에게 '이건 좀 기다려도 돼' 라고 말할 수 있게 된 것뿐. 그게 뭘 바꾸는지 6개월간의 실전을 정리했다.",
    body: [
      { type: "p", text: "React 18이 정식 릴리즈된 지 한참 됐는데, 막상 회사 코드베이스에서 useTransition 같은 걸 본 적이 있는가? 나는 거의 없다." },
      { type: "p", text: "그런데 작년 가을, 5만 개짜리 리스트를 필터링하는 페이지에서 입력창이 끔찍하게 버벅이는 문제를 만났다." },
      { type: "h2", text: "useDeferredValue가 실제로 하는 일" },
      { type: "p", text: "공식 문서는 'UI 업데이트를 지연시킨다'고 설명하지만, 더 정확히는 두 개의 렌더 트리를 갖되 비싼 쪽이 끝나기 전까지 이전 결과를 보여준다." },
    ]
  },
  {
    id: "typescript-satisfies",
    title: "TypeScript `satisfies`가 바꾸는 작은 것들",
    subtitle: "as와 :의 사이에 새 연산자가 생겼다",
    date: "2026-04-28",
    readMin: 6,
    tags: ["TypeScript"],
    category: "Frontend",
    excerpt: "4.9에서 들어온 satisfies는 처음엔 사소해 보였다. 그런데 한 번 익숙해지면 as와 타입 어노테이션을 절반쯤 쓰지 않게 된다.",
    body: [
      { type: "p", text: "satisfies는 한 줄로 말하면, 이 값이 X 타입을 만족하는지 검사하되, 추론된 좁은 타입은 그대로 유지해줘라는 연산자다." },
    ]
  },
];

export function getPosts() {
  return POSTS;
}

export function getPostById(id: string) {
  return POSTS.find(p => p.id === id);
}
