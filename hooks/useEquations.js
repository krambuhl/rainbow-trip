import { useState } from 'react'

export default function useEquations(initEquations = {}) {
  const [equations, setEquations] = useState(initEquations)

  return [
    equations,
    setEquations
  ]
}
