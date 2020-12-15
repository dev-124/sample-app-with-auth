// source: https://usehooks.com
import { useEffect, useState } from 'react'

function useWindowSize(): { height: number | undefined; width: number | undefined } {
  const isClient = typeof window === 'object'

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function getSize(): { height: number | undefined; width: number | undefined } {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    }
  }

  const [windowSize, setWindowSize] = useState(getSize)

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useEffect((): any => {
    if (!isClient) return false

    function handleResize(): void {
      setWindowSize(getSize())
    }

    window.addEventListener('resize', handleResize)

    // eslint-disable-next-line consistent-return
    return (): void => window.removeEventListener('resize', handleResize)
  }, [getSize, isClient]) // Empty array ensures that effect is only run on mount and unmount

  return windowSize
}

export default useWindowSize
