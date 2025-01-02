import { updateName } from '@/data'
import { type FC, useState, useTransition } from 'react'

export const Transition: FC = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<Error | null>(null)

  const [isPending, startTransition] = useTransition()

  const handleSubmit = async (): Promise<void> => {
    startTransition(async () => {
      try {
        const response = await updateName(name)
        setName(response)
        setError(null)
      } catch (error) {
        setError(error as Error)
        setName('')
      }
    })
  }

  return (
    <div>
      <p>useTransition</p>
      <input value={name} onChange={(event) => { setName(event.target.value); }} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error.message}</p>}
    </div>
  )
}
