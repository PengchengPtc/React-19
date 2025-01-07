self.onmessage = (e) => {
  // 直接从 e.data 中解构获取图片数据
  const { imageData } = e.data;
  
  // 创建一个新的数组来存储处理结果
  const processedData = new Uint8ClampedArray(imageData);
  
  // 处理接收到的部分数据
  for (let i = 0; i < processedData.length; i++) {
    // 1. 正弦变换，产生波浪效果
    processedData[i] = Math.sin(processedData[i]) * 255;
    // 2. 平方根变换，增加对比度
    processedData[i] = Math.sqrt(processedData[i] * 1.5);
    // 3. 幂变换，增加对比度
    processedData[i] = Math.pow(processedData[i], 1.1);
    // 4. 正切变换，增加对比度
    processedData[i] = Math.tan(processedData[i]) * 180;
    // 5. 指数变换，增加对比度
    processedData[i] = Math.exp(Math.log(processedData[i] + 1));
    // 6. 余弦变换，增加对比度
    processedData[i] = Math.cos(processedData[i]) * Math.PI * 100;
    // 7. 反正切变换，增加对比度
    for(let j = 0; j < 100; j++) {
      processedData[i] = Math.atan(processedData[i]) * 255;
    }
  }
  
  // 返回处理后的数据
  self.postMessage({ processedData });
};