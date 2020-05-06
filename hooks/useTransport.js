import { useState } from 'react'
import useFrame from '@hooks/useFrame'

export default function useTransport({
  isPlaying: initPlaying,
  frameSize: initFrameSize,
  frame: initFrame
}) {
  const [isPlaying, setPlaying] = useState(initPlaying !== undefined ? initPlaying : true)
  const [frameSize, setFrameSize] = useState(initFrameSize || 1)
  const [frame, setFrame] = useFrame({ isPlaying, frameSize, initVal: initFrame })

  return {
    isPlaying, setPlaying,
    frameSize, setFrameSize,
    frame, setFrame,
  }
}
