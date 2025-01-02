import useSWR from 'swr';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ArticleContent() {
  const { data } = useSWR('/api/article/1/content', 
    async () => await fetch('http://localhost:3000/api/article/1/content').then(async res => await res.json())
  );
  return <div className="article-content">{data?.content}</div>
}