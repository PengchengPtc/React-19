import React, { useState, useEffect, useRef } from 'react'

// 创建一个很大的数据结构
class HeavyObject {
  data: number[]
  leakyData: any[]

  constructor() {
    // 创建大量数据
    this.data = new Array(100000).fill(0).map(() => Math.random())
    this.leakyData = []
  }

  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  addReference(data: any) {
    this.leakyData.push(data)
  }
}

export const HeavyLeakyComponent: React.FC = () => {
  const heavyObjectsRef = useRef<HeavyObject[]>([])
  const [count, setCount] = useState(0)

  // 内存泄漏 1: 定时创建大量数据并存储引用
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // 每秒创建一个新的大对象
  //     const newHeavyObject = new HeavyObject();
  //     heavyObjects.push(newHeavyObject);

  //     // 创建循环引用
  //     const leakyObject = {
  //       data: newHeavyObject,
  //       reference: null as any
  //     };
  //     leakyObject.reference = leakyObject; // 循环引用

  //     // 存储引用
  //     setLeaks(prev => [...prev, leakyObject]);
  //     setCount(c => c + 1);
  //   }, 1000);

  //   return () => { clearInterval(interval); };
  // }, []);
  useEffect((): (() => void) => {
    const MAX_OBJECTS = 100 // 设置最大限制

    const interval = setInterval(() => {
      if (heavyObjectsRef.current.length >= MAX_OBJECTS) {
        // 达到上限时，移除最早的对象
        heavyObjectsRef.current.shift()
      }

      const newHeavyObject = new HeavyObject()
      heavyObjectsRef.current.push(newHeavyObject)
      setCount(heavyObjectsRef.current.length)
    }, 1000)

    return () => {
      clearInterval(interval)
      heavyObjectsRef.current = []
      setCount(0)
    }
  }, [])
  //   // 内存泄漏 2: 创建闭包链
  //   useEffect(() => {
  //     const createLeakyChain = () => {
  //       let chain = null;

  //       // 创建一个长的闭包链
  //       for (let i = 0; i < 1000; i++) {
  //         const currentHeavyObject = new HeavyObject();
  //         const prevChain = chain;

  //         chain = () => {
  //           // 持有对前一个闭包的引用
  //           if (prevChain) prevChain();
  //           // 在闭包中引用大对象
  //           currentHeavyObject.addReference(heavyObjects);
  //           return currentHeavyObject;
  //         };
  //       }

  //       return chain;
  //     };

  //     // 每2秒创建一个新的闭包链
  //     const chainInterval = setInterval(() => {
  //       const leakyChain = createLeakyChain();
  //       setLeaks(prev => [...prev, leakyChain]);
  //     }, 2000);

  //     // 故意不清理 chainInterval
  //   }, []);

  //   // 内存泄漏 3: 事件监听器泄漏
  //   useEffect(() => {
  //     const handleMouseMove = (e: MouseEvent) => {
  //       // 在事件处理器中创建新的大对象并存储引用
  //       const newHeavyObject = new HeavyObject();
  //       heavyObjects.forEach(obj => {
  //         obj.addReference(newHeavyObject);
  //       });
  //     };

  //     // 添加多个相同的事件监听器
  //     for (let i = 0; i < 10; i++) {
  //       window.addEventListener('mousemove', handleMouseMove);
  //     }
  //     // 故意不移除事件监听器
  //   }, []);

  return (
    <div>
      <h2>严重的内存泄漏示例</h2>
      <p>已创建的大对象数量: {count}</p>
      <p style={{ color: 'red' }}>警告：此组件会导致严重的内存泄漏，仅用于演示！</p>
    </div>
  )
}
