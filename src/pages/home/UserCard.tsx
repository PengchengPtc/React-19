import { useState, useEffect } from 'react'

export const UserCard: React.FC= () => {
  const [score, setScore] = useState<number>(0)
  console.log('UserCard');
  
  
  // 问题：这里会导致无限更新
  useEffect(() => {
    const element = document.getElementById('score-display')
    if (element) {
      element.textContent = `分数：${score}`
    }
  }, [score])

  // 模拟分数变化
  useEffect(() => {
    const timer = setInterval(() => {
      setScore(prev => prev + 1)
    }, 1000)

    return () => { clearInterval(timer); }
  }, [])

  return (
    <div className="user-card">
      <h2>用户信息</h2>
      <div id="score-display">分数：{score}</div>
      <button 
        onClick={() => { setScore(s => s + 10); }}
      >
        增加分数
      </button>
    </div>
  )
}