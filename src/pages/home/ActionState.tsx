import { updateName } from '@/data'
import { FC, useActionState } from 'react'
/*
React 在 18 开始对服务器端渲染（SSR）进行了全面增强，19 则进一步改进了服务端渲染期间表单提交的处理逻辑。这包括了：

1.React Server Actions

在 React 18 中，React 引入了 Server Components，19 则将其扩展为支持表单操作（Server Actions）。
表单提交后的处理逻辑可以直接运行在服务端，不需要专门的 API 或前端逻辑，简化了客户端和服务端的交互。
2.FormData 与服务端优化的关系

React 19 中，表单提交的默认行为会自动生成 FormData，无论你是处理客户端还是服务端的表单提交。
在服务端渲染场景中，FormData 被用来封装表单数据，直接传递给服务端的 action 函数，而不是像传统表单提交那样触发整个页面刷新。
3.与服务端 Action 的结合 在 SSR 场景下，React 19 的 action 属性可以直接调用服务端的函数：

tsx
复制代码
export const updateName = async (name: string) => {
  // 更新服务端的名字
};
表单提交会生成 FormData 对象，自动打包表单字段的数据。
服务端逻辑可以直接处理 FormData 中的数据，并返回响应结果，而不需要客户端额外调用 API。
*/

export const ActionState: FC = () => {
  const [result, submitAction, isPending] = useActionState(async (_: any, formData: FormData) => {
    // 要进行错误处理的异步操作
    try {
      if (!formData.get('name')) {
        window.alert('Name is required')
        return
      }
      return await updateName(formData.get('name') as string)
    } catch (error) {
      window.alert(error as Error)
    }
  }, null)
  return (
    <form action={submitAction}>
      <p>useActionState</p>
      <input type="text" name="name" />
      <button type="submit" disabled={isPending}>
        Update
      </button>
      {isPending && <p>loading...</p>}
      {result && <p>{result}</p>}
    </form>
  )
}
