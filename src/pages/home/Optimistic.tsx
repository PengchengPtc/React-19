import { type FC, useOptimistic, useRef, useState } from 'react'

export const Optimistic: FC = () => {
  const formRef = useRef<HTMLFormElement>(null)
  // messages 本地消息，默认有一条消息
  const [messages, setMessages] = useState([{ text: '你好，在这儿！', sending: false, key: 1 }])
  /* 
    optimisticMessages 是更新后的本地消息，addOptimisticMessage 是更新本地状态的函数
    useOptimistic 接受两个参数，第一个是本地之前的 messages，第二个是更新状态的函数，返回一跟新后的 messages
    newMessage 是新的消息, 通过 addOptimisticMessage 添加到 messages 中，跟新本地状态
    newMessage 就是 addOptimisticMessage 调用时传入的参数
  */
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage: string) => [
      ...state,
      {
        text: newMessage,
        sending: true,
        key: state.length + 2
      }
    ]
  )

  const formAction = async (formData: FormData): Promise<void> => {
    // 先更新本地状态
    addOptimisticMessage(formData.get('message') as string)
    formRef.current?.reset()
    // 模拟发送消息
    const sentMessage = await deliverMessage(formData.get('message') as string)
    // 实际场景中，不需要更新本地状态，只需要把请求结果返回就行了，前提是请求结果的数据结构和本地状态的数据结构一致
    setMessages((messages) => [
      ...messages,
      { text: sentMessage, sending: false, key: messages.length + 2 }
    ])
  }
  const deliverMessage = async (message: string): Promise<string> => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return message
  }

  return (
    <>
      {optimisticMessages.map((message, index) => (
        <div key={index}>
          {message.text}
          {!!message.sending && <small>（发送中……）</small>}
        </div>
      ))}
      <form action={formAction} ref={formRef}>
        <input type="text" name="message" placeholder="你好！" />
        <button type="submit">发送</button>
      </form>
    </>
  )
}
