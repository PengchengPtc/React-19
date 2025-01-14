import styled from 'styled-components'
import { type JSX } from 'react'
// import ArticleTitle from '@/components/Streaming-Render/ArticleTitle'
// import ArticleContent from '@/components/Streaming-Render/ArticleContent'
// import Comments from '@/components/Streaming-Render/Comments'
import { ImageProcessor } from '@/components/upload/ImageProcessor' 
import { ImageProcessorUnderWorker } from '@/components/upload/ImageProcessorUnderWorker'
import { ImageProcessorUnderOneWorker } from '@/components/upload/imageProcessorUnderOneWorker'
// import { UpdateName } from '../../components/React19/UpdateName'
// import { Transition } from '../../components/React19/Transition'
// import { ActionState } from '../../components/React19/ActionState'
// import { FormStatus } from '../../components/React19/FormStatus'
// import { Optimistic } from '../../components/React19/Optimistic'
// import { TodoList } from '../../components/React19/TodoList'
// import { UserCard } from './UserCard'
// import { HeavyLeakyComponent } from './leakyCounter'

export default function Home(): JSX.Element {
  return (
    <HomeWrap>  
      {/* <UpdateName />
      <Transition />
      <ActionState />
      <FormStatus />
      <Optimistic /> */}
      {/* <HeavyLeakyComponent/> */}
      {/* <TodoList /> */}
      {/* <UserCard/> */}
      {/* <Suspense fallback={<div>加载标题中...</div>}>
        <ArticleTitle />
      </Suspense>
      <Suspense fallback={<div>加载内容中...</div>}>
        <ArticleContent />
      </Suspense>
      <Suspense fallback={<div>加载评论中...</div>}>
        <Comments />
      </Suspense> */}
      <p>不使用 Worker</p>
      <ImageProcessor />
      <p>使用多个 Worker</p>
      <ImageProcessorUnderWorker />
      <p>使用单个 Worker</p>
      <ImageProcessorUnderOneWorker />
    </HomeWrap>
  )
}

export const HomeWrap = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 40px;
`
