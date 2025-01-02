import React, { useState, useEffect, useRef } from 'react';

class HeavyObject {
  data: number[];
  leakyData: any[];

  constructor() {
    // 创建大量数据
    this.data = new Array(100000).fill(0).map(() => Math.random());
    this.leakyData = [];
  }

  addReference(data: any): void {
    this.leakyData.push(data);
  }

  // 清理资源
  clear(): void {
    this.data = [];
    this.leakyData = [];
  }
}

export const HeavyLeakyComponent: React.FC = () => {
  const [count, setCount] = useState(0);
  const heavyObjects = useRef<HeavyObject[]>([]); // 使用 ref 避免组件重新渲染

  useEffect(() => {
    const interval = setInterval(() => {
      // 每秒创建一个新的大对象
      const newHeavyObject = new HeavyObject();
      heavyObjects.current.push(newHeavyObject);

      // 清除不再需要的对象以减少内存占用
      if (heavyObjects.current.length > 10) {
        const oldObject = heavyObjects.current.shift();
        oldObject?.clear(); // 调用清理方法
      }

      setCount(c => c + 1);
    }, 1000);

    return () => {
      // 清除定时器
      clearInterval(interval);

      // 清理所有重对象
      heavyObjects.current.forEach(obj => { obj.clear(); });
      heavyObjects.current = [];
    };
  }, []);

  return (
    <div>
      <h2>优化后的内存管理示例</h2>
      <p>已创建的大对象数量: {count}</p>
      <p style={{ color: 'green' }}>
        已优化内存管理，泄漏风险已降低！
      </p>
    </div>
  );
};
