import useSWR from 'swr';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function ArticleTitle() {
  const { data } = useSWR('/api/article/1/title', 
    async () => await fetch('http://localhost:3000/api/article/1/title').then(async res => await res.json())
  );
  
  return <h1>{data?.title}</h1>;
}