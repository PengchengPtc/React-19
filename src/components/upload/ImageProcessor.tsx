import { type FC, useState } from 'react'
import { Upload, Button, App, Progress } from 'antd'
import { UploadOutlined } from '@ant-design/icons'
import type { UploadFile } from 'antd/es/upload/interface'

// 处理进度组件
export const ProcessingStatus: FC<{ progress: number }> = ({ progress }) => (
  <div style={{ marginTop: 16 }}>
    <Progress percent={Math.round(progress)} status="active" />
    <div style={{ textAlign: 'center', marginTop: 8 }}>正在处理图片...{Math.round(progress)}%</div>
  </div>
)

// 处理结果组件
export const ProcessedImage: FC<{ url: string }> = ({ url }) => (
  <div style={{ marginTop: 16 }}>
    <h3>处理结果：</h3>
    <img src={url} alt="处理后的图片" style={{ maxWidth: '100%', height: 'auto' }} />
  </div>
)

// 辅助函数：将 File 转换为 ImageData
export const createImageData = async (file: File): Promise<ImageData> => {
  return await new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        reject(new Error('无法获取 canvas context'))
        return
      }
      ctx.drawImage(img, 0, 0)
      resolve(ctx.getImageData(0, 0, img.width, img.height))
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

//  辅助函数：将 ImageData 转换为 URL
export const convertImageDataToUrl = (imageData: ImageData): string => {
  const canvas = document.createElement('canvas')
  canvas.width = imageData.width
  canvas.height = imageData.height
  const ctx = canvas.getContext('2d')
  ctx?.putImageData(imageData, 0, 0)
  return canvas.toDataURL('image/png')
}

// 主组件
export const ImageProcessor: FC = () => {
  const [loading, setLoading] = useState(false)
  const [fileList, setFileList] = useState<UploadFile[]>([])
  const [processedImageUrl, setProcessedImageUrl] = useState<string>('')
  const [progress, setProgress] = useState(0)

  const { message } = App.useApp()

  // 不使用 Worker 的处理方法（会造成卡顿）
  const processImageInWorker = async (
    imageData: ImageData,
    onProgress?: (progress: number) => void
  ): Promise<ImageData | undefined> => {
    try {
      const totalPixels = imageData.data.length
      const updateInterval = Math.floor(totalPixels / 100) // 每1%更新一次
      let lastUpdate = 0

      for (let i = 0; i < totalPixels; i++) {
        imageData.data[i] = Math.sin(imageData.data[i]) * 255
        imageData.data[i] = Math.sqrt(imageData.data[i] * 1.5)
        imageData.data[i] = Math.pow(imageData.data[i], 1.1)
        imageData.data[i] = Math.tan(imageData.data[i]) * 180
        imageData.data[i] = Math.exp(Math.log(imageData.data[i] + 1))
        imageData.data[i] = Math.cos(imageData.data[i]) * Math.PI * 100

        for (let j = 0; j < 100; j++) {
          imageData.data[i] = Math.atan(imageData.data[i]) * 255
        }

        // 检查是否需要更新进度
        if (i - lastUpdate >= updateInterval) {
          const progress = Math.round((i / totalPixels) * 100)
          onProgress?.(progress)
          lastUpdate = i
          // 强制让出主线程，确保UI能更新
          await new Promise((resolve) => setTimeout(resolve, 0))
        }
      }
      // 确保最后显示100%
      onProgress?.(100)
      return imageData
    } catch (error) {
      void message.error('处理失败！')
    } finally {
      setLoading(false)
    }
  }

  const handleImageProcess = async (file: File): Promise<void> => {
    setLoading(true)
    try {
      const imageData = await createImageData(file)
      // 处理图片
      const processedImageData = await processImageInWorker(imageData, setProgress)
      // 将处理后的图片数据转换为URL
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
