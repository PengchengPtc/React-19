import {
  type SetStateAction,
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type Dispatch
} from 'react'

export const useLocalStorage = <T>(
  key: string,
  initialValue: T = undefined as unknown as T
): [T, Dispatch<SetStateAction<T | undefined>>] => {
  const initializer = useRef((key: string) => {
    try {
      const localStorageValue = localStorage.getItem(key)
      if (localStorageValue !== null) {
        return JSON.parse(localStorageValue)
      } else {
        initialValue && localStorage.setItem(key, JSON.stringify(initialValue))
        return initialValue
      }
    } catch {
      return initialValue
    }
  })

  const [storedValue, setStoredValue] = useState<T>(() => initializer.current(key))

  useLayoutEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    setStoredValue(initializer.current(key))
  }, [key])

  const set: Dispatch<SetStateAction<T | undefined>> = useCallback(
    (valOrFunc) => {
      const newState =
        // eslint-disable-next-line @typescript-eslint/ban-types
        typeof valOrFunc === 'function' ? (valOrFunc as Function)(storedValue) : valOrFunc
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setStoredValue(newState)
      localStorage.setItem(key, JSON.stringify(newState))
    },
    [key, storedValue]
  )

  return [storedValue, set]
}
