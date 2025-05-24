import { useEffect, useState } from 'react'

export const useIsBigScreen = (threshold: number = 800) => {
  const [isBigScreen, setIsBigScreen] = useState(true)

  useEffect(() => {
    const handleResize = () => {
      setIsBigScreen(window.innerHeight > threshold)
    }
    handleResize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [threshold])

  return isBigScreen
}
