import { updateName } from '@/data'
import { type FC, useState } from 'react'

export const UpdateName: FC = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState<Error | null>(null)
  const [isPending, setIsPending] = useState(false)

  const handleSubmit = async (): Promise<void> => {
    setIsPending(true)
    setError(null)
    try {
      const response = await updateName(name)
      setName(response)
      setError(null)
    } catch (error) {
      setError(error as Error)
      setName('')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div>
      <input value={name} onChange={(event) => { setName(event.target.value); }} />
      <button onClick={handleSubmit} disabled={isPending}>
        Update
      </button>
      {error && <p>{error.message}</p>}
    </div>
  )
}
