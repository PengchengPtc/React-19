import React, { useState } from 'react'
import { Upload, Button, App } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'
import { createImageData, ProcessedImage, ProcessingStatus,convertImageDataToUrl } from './ImageProcessor'

export const ImageProcessorUnderWorker: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  // 添加进度状态
  const [progress, setProgress] = useState(0)
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('') // 添加状态存储处理后的图片URL

  const { message } = App.useApp()

  //   使用 Worker 的处理方法（流畅）
  const processImageInWorker = async (
    imageData: ImageData,
    onProgress: (progress: number) => void
  ): Promise<ImageData> => {
    const workerCount = navigator.hardwareConcurrency || 4
    const chunkSize = Math.ceil(imageData.data.length / workerCount)
    let completedWorkers = 0

    const workers = Array.from({ length: workerCount }, async (_, index) => {
      const worker = new Worker(new URL('./worker.ts', import.meta.url), { type: 'module' })

      await new Promise<void>((resolve) => {
        worker.onmessage = (event) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          imageData.data.set(event.data.processedData, index * chunkSize)
          completedWorkers++
          onProgress((completedWorkers / workerCount) * 100)
          worker.terminate()
          resolve()
        }
        worker.postMessage({
          imageData: imageData.data.slice(
            index * chunkSize,
            Math.min((index + 1) * chunkSize, imageData.data.length)
          )
        })
      })
    })

    await Promise.all(workers)
    return imageData
  }
  const handleImageProcess = async (file: File): Promise<void> => {
    setLoading(true)
    try {
      const imageData = await createImageData(file)
      const processedImageData = await processImageInWorker(imageData, setProgress)
      const processedUrl = convertImageDataToUrl(processedImageData)
      setProcessedImageUrl(processedUrl)
      void message.success('处理完成！')
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
