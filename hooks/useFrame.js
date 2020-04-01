import { useState } from 'react'
import useRaf from '@rooks/use-raf'

export default function useFrame({ isPlaying, initVal, frameSize }) {
  const [frame, setFrame] = useState(initVal || 0)

  useRaf(() => setFrame(frame + (frameSize || 1)), (isPlaying !== undefined ? isPlaying : true))

  return [frame, setFrame]
}
