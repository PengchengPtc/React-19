import { useState } from 'react';
import useSWR from 'swr';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const streamingFetcher = async (url: string) => {
  const response = await fetch(url);
  const reader = response.body?.getReader();
  
  if (!reader) {
    throw new Error('Failed to get reader from response');
  }
  
  return reader;
};

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export default function Comments() {
  const [comments, setComments] = useState<Array<{ id: number; text: string }>>([]);
  
  useSWR('http://localhost:3000/api/article/1/comments', streamingFetcher, {
    onSuccess: async (reader) => {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const text = new TextDecoder().decode(value);
        const lines = text.split('\n').filter(line => line.trim());
        
        lines.forEach(line => {
          const comment = JSON.parse(line);
          // 使用函数式更新，并确保不添加重复的评论
          setComments(prev => {
            // 检查评论是否已存在
            if (prev.some(existingComment => existingComment.id === comment.id)) {
              return prev;
            }
            return [...prev, comment];
          });
        });
      }
    }
  });
  
  return (
    <div className="comments-section">
      <h2>评论</h2>
      {comments.map(comment => (
        <div key={`comment-${comment.id}`} className="comment">
          {comment.text}
        </div>
      ))}
    </div>
  );
}