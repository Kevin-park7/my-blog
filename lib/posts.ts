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
