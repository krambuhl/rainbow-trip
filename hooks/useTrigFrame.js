import useFuncFrame from './useFuncFrame'

function createTrigFrame(fn) {
  return function useTrigFrame(frame, rate = 1) {
    return useFuncFrame(frame, num => fn(num * rate * 1 / 10000))
  }
}

export const useSin = createTrigFrame(Math.sin)
export const useCos = createTrigFrame(Math.cos)
export const useTan = createTrigFrame(Math.tan)

export const useASin = createTrigFrame(Math.asin)
export const useACos = createTrigFrame(Math.acos)
export const useATan = createTrigFrame(Math.atan)
