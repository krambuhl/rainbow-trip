/* eslint-disable no-unused-vars */
import { useState } from 'react'
import useTransport from '@hooks/useTransport'
import useEquations from '@hooks/useEquations'
import * as TrigHooks from '@hooks/useTrigFrame'
// import { rgba, mix } from 'polished'

import * as Colors from '@lib/colors'

import Explorer from '@components/display/Explorer'
import Grid from '@components/display/Grid'
import { White } from '../lib/colors'

const allColors =
  Object.keys(Colors.OutdoorPaintColors)
    .reduce((sum, key) => [...sum, Colors.OutdoorPaintColors[key]], [])

const bwColors = [
  Colors.Black,
  Colors.White
]

const warmColors = [
  Colors.Black,
  Colors.PurpleRed,
  Colors.RoyalRed,
  Colors.Brick,
]

const coolColors = [
  Colors.Black,
  Colors.Malachite,
  Colors.MalachiteDark,
  Colors.Fjord,
  Colors.DeepSea,
]

const royalColors = [
  Colors.Black,
  Colors.Viola,
  Colors.Lavender,
  Colors.BlueVelvet,
]


function cellGenerator(equations, data, cords) {
  const { x, y } = cords
  const {
    size,
    color,
  } = equations
  const {
    frame,
    sinSlow, sinFast,
    cosSlow, cosFast,
    tanSlow, tanFast
  } = data
  const slowFrame = frame / 1000
  const x1 = x + 1
  const y1 = y + 1
  const half = Math.floor(size / 2)

  const centerX = x - half
  const centerY = y - half

  const offsetX = centerX / half
  const offsetXAbs = Math.abs(offsetX)
  const offsetY = centerY / half
  const offsetYAbs = Math.abs(offsetY)
  const offset = offsetX * offsetY
  const offsetAbs = Math.abs(offset)

  try {
    let res = {}
    eval(color)
    return res // eslint-disable-line
  } catch (e) {
    return {}
  }
}

export default function IndexPage() {
  const transport = useTransport({
    isPlaying: false,
    frameSize: 1,
    frame: ((75 * 2 / 2) - 1) * 1000
  })

  const size =  75 // 36 / (15 / 32)

  const equations = useState({
    color: `
      const alphaX = 1 - offsetXAbs
      const alphaY = 1 - offsetYAbs

      if (false && (offsetXAbs === 0 || offsetYAbs === 0)) {
        res = {
          backgroundColor: 'white',
          opacity: offsetX === 0 ? alphaY : alphaX
        }
      } else {
        let colorSet = bwColors
        // if (offsetAbs / offset > 0.5) colorSet = coolColors
        // else if (offsetAbs / offset > 0.3) colorSet = royalColors
        // else if (offsetAbs / offset > 0.1) colorSet = warmColors
        // else if (offsetAbs / offset > 0.03) colorSet = coolColors
        // else if (offsetAbs / offset > 0.01) colorSet = royalColors

        const transient = Math.floor(slowFrame * offsetAbs * colorSet.length)

        res = {
          backgroundColor: colorSet[transient % colorSet.length],
        }
      }
    `,
    colorFlag: `

    `,
    size,
  })

  const sinSlow = TrigHooks.useSin(transport.frame, 1)
  const sinFast = TrigHooks.useSin(transport.frame, 10)
  const cosSlow = TrigHooks.useCos(transport.frame, 1)
  const cosFast = TrigHooks.useCos(transport.frame, 10)
  const tanSlow = TrigHooks.useTan(transport.frame, 0.01)
  const tanFast = TrigHooks.useTan(transport.frame, 1)

  const data = {
    frame: transport.frame,
    sinSlow, sinFast,
    cosSlow, cosFast,
    tanSlow, tanFast
  }

  return (
    <React.Fragment>
      <Explorer
        transport={transport}
        data={data}
        equations={equations}
      >
        <Grid
          cellGenerator={cord => cellGenerator(equations[0], data, cord)}
          cell={[8, 8]}
          size={[
            parseInt(equations[0].size) || 1,
            parseInt(equations[0].size) || 1
          ]}
          // transition={'background-color ease 1s'}
        />
      </Explorer>
    </React.Fragment>
  )
}
