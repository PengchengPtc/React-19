// 1. 经典闭包示例
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function createCounter() {
    let count = 0;  // 私有变量
    
    return {
      increment: function() {
        count++;
        return count;
      },
      getCount: function() {
        return count;
      }
    };
  }
  
  // 2. 可能导致内存泄漏的闭包示例
 export function createLeakyClosure() {
    const largeData = new Array(1000000).fill('🐘');  // 占用大量内存的数据
    
    return function() {
      // 即使我们不使用 largeData，它仍然被引用着，不会被垃圾回收
      console.log("闭包仍然持有对 largeData 的引用");
      return largeData;
    };
  }
  
  // 3. DOM 相关的内存泄漏示例
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export function addEventListenerLeak() {
    const heavyObject = {
      data: new Array(1000000).fill('🦕')
    };
    
    const button = document.createElement('button');
    
    button.addEventListener('click', function() {
      // 这个闭包持有对 heavyObject 的引用
      console.log(heavyObject.data.length);
    });
    
    // 即使删除了按钮，由于事件监听器仍然存在
    // heavyObject 也不会被垃圾回收
    document.body.appendChild(button);
  }