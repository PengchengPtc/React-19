import { updateName } from '@/data'
import { type FC, useActionState } from 'react'
import { useFormStatus } from 'react-dom'

/*
    useFormStatus生效前提是必须在 <form> 元素的上下文内调用
    只有在 <form> 内部，React 才能够将当前表单的状态注入到 useFormStatus 中。
*/

const DesignButton:FC = ()=> {
  const { pending } = useFormStatus()
  return (
    <button type="submit" disabled={pending}>
      Update
    </button>
  )
}

export const FormStatus: FC = () => {
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
      <p>FormStatus</p>
      <input type="text" name="name" />
      <DesignButton />
      {isPending && <p>loading...</p>}
      {result && <p>{result}</p>}
    </form>
  )
}
