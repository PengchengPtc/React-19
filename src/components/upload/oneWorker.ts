/* eslint-disable @typescript-eslint/no-unsafe-argument */
self.onmessage = (e) => {
    const { imageData } = e.data
    const totalPixels = imageData.data.length
    const updateInterval = Math.floor(totalPixels / 100) // 每1%更新一次
    let lastUpdate = 0
    
    // 在 Worker 中进行相同的复杂计算
    for (let i = 0; i < imageData.data.length; i++) {
      imageData.data[i] = Math.sin(imageData.data[i]) * 255
      imageData.data[i] = Math.sqrt(imageData.data[i] * 1.5)
      imageData.data[i] = Math.pow(imageData.data[i], 1.1)
      imageData.data[i] = Math.tan(imageData.data[i]) * 180
      imageData.data[i] = Math.exp(Math.log(imageData.data[i] + 1))
      imageData.data[i] = Math.cos(imageData.data[i]) * Math.PI * 100
  
      for (let j = 0; j < 100; j++) {
        imageData.data[i] = Math.atan(imageData.data[i]) * 255
      }
      if (i - lastUpdate >= updateInterval) {
        const progress = Math.round((i / totalPixels) * 100)
        self.postMessage({ type: 'progress', progress })
        lastUpdate = i
      }
    }
  
    // 处理完成后发送消息回主线程
    // 发送处理完成的数据
    self.postMessage({ type: 'complete', imageData })
  }
  