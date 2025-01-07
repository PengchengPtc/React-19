import React, { useState } from 'react'
import { Upload, Button, App } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { createImageData, ProcessedImage, ProcessingStatus, convertImageDataToUrl } from './ImageProcessor'

export const ImageProcessorUnderOneWorker: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // 添加进度状态
  const [progress, setProgress] = useState(0)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('')
  
  const { message } = App.useApp()

// ... existing code ...

const processImageInWorker = async (
  imageData: ImageData,
  onProgress?: (progress: number) => void
): Promise<ImageData | undefined> => {
  try {
    // 移除旧的进度计算逻辑
    return await new Promise((resolve, reject) => {
      const worker = new Worker(new URL('./oneWorker.ts', import.meta.url))
      
      worker.onmessage = (event) => {
        // 检查是否收到进度更新消息
        if (event.data.type === 'progress') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onProgress?.(event.data.progress)
          return
        }
        // 处理完成的消息
        if (event.data.type === 'complete') {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          imageData.data.set(event.data.imageData.data)
          worker.terminate()
          resolve(imageData)
        }
      }

      worker.onerror = (error) => {
        worker.terminate()
        reject(error)
      }

      worker.postMessage({ imageData })
    })
  } catch (error) {
    console.error('Image processing error:', error)
    return undefined
  }
}

// ... existing code ...

  const handleImageProcess = async (file: File): Promise<void> => {
    setLoading(true)
    setProgress(0)
    try {
      const imageData = await createImageData(file)
      const processedImageData = await processImageInWorker(imageData, setProgress)
      if (processedImageData) {
        const processedUrl = convertImageDataToUrl(processedImageData)
        setProcessedImageUrl(processedUrl)
        void message.success('处理完成！')
      }
    } catch (error) {
      void message.error('处理失败！')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Upload
        fileList={fileList}
        accept="image/*"
        beforeUpload={(file) => {
          void handleImageProcess(file)
          return false
        }}
        onChange={({ fileList }) => {
          setFileList(fileList)
        }}
      >
        <Button icon={<UploadOutlined />}>选择图片</Button>
      </Upload>
      {loading && <ProcessingStatus progress={progress} />}
      {processedImageUrl && <ProcessedImage url={processedImageUrl} />}
    </>
  )
}