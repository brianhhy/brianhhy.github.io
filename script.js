// 연도 표기 업데이트
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// React 앱 (Babel이 JSX를 변환)
const { useMemo, useState } = React;

function usePosts() {
  const [query, setQuery] = useState('');
  const posts = useMemo(() => ([
    { id: 1, title: 'GitHub Pages로 블로그 시작하기', date: '2025-11-03', tags: ['github-pages', 'react'], excerpt: '정적 호스팅과 React CDN으로 빠르게 시작해봅니다.' },
    { id: 2, title: 'React 18 훑어보기', date: '2025-10-20', tags: ['react', 'hooks'], excerpt: 'Concurrent Features와 Root API 변화 정리.' },
    { id: 3, title: '개발 환경 체크리스트', date: '2025-09-12', tags: ['tooling', 'productivity'], excerpt: '맥에서 효율적으로 코딩하기 위한 셋업.' },
  ]), []);
  const filtered = useMemo(() => {
    if (!query) return posts;
    const q = query.toLowerCase();
    return posts.filter(p => p.title.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q)));
  }, [posts, query]);
  return { posts: filtered, query, setQuery };
}

function SearchBar({ query, onChange }) {
  return (
    <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M21 21l-3.8-3.8" stroke="#9fb3c8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="11" cy="11" r="7" stroke="#9fb3c8" strokeWidth="1.5" />
      </svg>
      <input
        value={query}
        onChange={e => onChange(e.target.value)}
        placeholder="검색 (제목, 태그)"
        style={{
          flex: 1,
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--text)',
          fontSize: 15,
        }}
        aria-label="게시글 검색"
      />
    </div>
  );
}

function PostCard({ post }) {
  return (
    <article className="card">
      <h3 className="post-title">{post.title}</h3>
      <div className="post-meta">{post.date}</div>
      <p style={{ margin: 0 }}>{post.excerpt}</p>
      <div className="post-tags">
        {post.tags.map(tag => (
          <span key={tag} className="tag">#{tag}</span>
        ))}
      </div>
    </article>
  );
}

function PostList({ posts }) {
  if (posts.length === 0) {
    return <div className="card" role="status">검색 결과가 없습니다.</div>;
  }
  return (
    <section id="posts" className="grid">
      {posts.map(p => <PostCard key={p.id} post={p} />)}
    </section>
  );
}

function App() {
  const { posts, query, setQuery } = usePosts();
  return (
    <>
      <SearchBar query={query} onChange={setQuery} />
      <PostList posts={posts} />
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);



