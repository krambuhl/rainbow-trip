/* eslint-disable no-unused-vars */
import { useState } from 'react'
import useTransport from '@hooks/useTransport'
import useEquations from '@hooks/useEquations'
import * as TrigHooks from '@hooks/useTrigFrame'
// import { rgba, mix } from 'polished'

import * as Colors from '@lib/colors'

import Explorer from '@components/display/Explorer'
import Grid from '@components/display/Grid'

const allColors =
  Object.keys(Colors.OutdoorPaintColors)
    .reduce((sum, key) => [...sum, Colors.OutdoorPaintColors[key]], [])

let randomColors = []
let randomColors2 = []

let warmColors = [
  // Colors.Orangina,
  // Colors.Brick,
  // Colors.RoyalRed,
  // Colors.PurpleRed,
  // Colors.YellowCab,
  // Colors.SkyBlue,
  // Colors.BloodOrange,
  // Colors.FireRed,
  // Colors.LawnGreen,
  // Colors.Brick,

  // Colors.Malachite,
  Colors.Malachite,
  Colors.MalachiteDark,
  // Colors.BlueVelvet,
  Colors.Viola,
  Colors.Lavender,
  // Colors.PurpleRed
  // Colors.c,
]

let coolColors = [
  Colors.Brick,
  Colors.PurpleRed,
  // Colors.RoyalRed,
  Colors.RoyalRed,
  // Colors.Orangina,
  // Colors.RoyalRed,
  // Colors.PurpleRed,
  // Colors.BloodOrange,
  // Colors.Malachite,
  // Colors.Malachite,
  // Colors.MalachiteDark,
  // Colors.SkyBlue,
  // Colors.Fjord,
  // Colors.DeepSea,
  // Colors.BlueVelvet,
  // Colors.Viola,
  // Colors.PurpleRed
]

const regeneratorRandomColors = () => {
  randomColors =
    Array(coolColors.length).fill(null)
      .reduce((sum, n, i) => {
        return [
          ...sum,
          // allColors[1 + (i * sum.length) % allColors.length]
          coolColors[Math.floor(i * 4) % coolColors.length]
          // allColors[Math.floor(Math.random() * allColors.length) % allColors.length]
        ]
      }, [])

  randomColors2 =
    Array(coolColors.length).fill(null)
      .reduce((sum, n, i) => [
        ...sum,
        coolColors[Math.floor(i * 1.4) % coolColors.length]
        // allColors[Math.floor(Math.random() * allColors.length) % allColors.length]
      ], [])
}

// setInterval(regeneratorRandomColors, 1000)
regeneratorRandomColors() // ??


function cellGenerator(equations, data, cords) {
  const { x, y } = cords
  const {
    color1,
    color2,
    colorFlag,
    columns,
    rows
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

  try {
    const color1res = eval(color1)
    const color2res = eval(color2)
    const flag = eval(colorFlag)

    return {
      backgroundColor: flag ? color1res : color2res,
      transform: flag ? 'scaleX(4) skew(-20deg)' : 'scaleX(4) skew(20deg) ',
      zIndex: flag && 1
    }
  } catch (e) {
    return {}
  }
}

export default function IndexPage() {
  const transport = useTransport({
    isPlaying: false,
    frameSize: 1000,
    // frame: 7400
    frame: 1000 * 39
    // frame: 0
  })


  const equations = useState({
    color1: `randomColors[Math.abs(Math.floor(x)) % randomColors.length]`,
    color2: `randomColors2[Math.abs(Math.floor(x)) % randomColors2.length]`,
    colorFlag: `
    true
      // frame < 1000 * 19 + (1000 * 40 * 2)
      // (y >= 5 && y < 35 && x >= 5 && x < 35)
        // && x > y - 20
        && (y > (slowFrame % 40) || y <= (slowFrame % 40) - 20)
        && y > x - 20
        // && (x > (slowFrame % 40) || x <= (slowFrame % 40) - 20)
    `,
    // colorFlag: 'y < (40 * Math.random())',
    columns: 20,
    rows: 20
  })

  // const equations = useEquations({
  //   color1: `allColors[Math.floor((x1 * Math.abs(sinSlow)) + (y1 * Math.abs(tanSlow))) % allColors.length]`,
  //   color2: `allColors[Math.floor((x1 * Math.abs(tanSlow)) + (y1 * Math.abs(sinSlow))) % allColors.length]`,
  //   colorFlag: 'y < 15',
  //   columns: 40,
  //   rows: 40
  // })

  // const equations = useEquations({
  //   color1: `warmColors[Math.floor((x1 * y1) * Math.abs(slowFrame)) % warmColors.length]`,
  //   color2: `coolColors[Math.floor((x1 * y1) * Math.abs(slowFrame)) % coolColors.length]`,
  //   colorFlag: 'y < columns',
  //   columns: 20,
  //   rows: 20
  // })

  // const equations = useEquations({
  //   color1: `allColors[Math.floor(((columns - x1) * (rows - y1)) * (slowFrame) * Math.abs(sinFast / 1500)) % allColors.length]`,
  //   color2: `allColors[Math.floor((x1 * y1) * (frame / 150) * Math.abs(sinFast / 1500)) % allColors.length]`,
  //   colorFlag: 'sinFast * (x - columns / 2) > (y - rows / 2) * sinFast',
  //   columns: 40,
  //   rows: 40
  // })

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
          cell={[32, 32]}
          size={[
            parseInt(equations[0].columns) || 1,
            parseInt(equations[0].rows) || 1
          ]}
          transition={'background 2s ease, transform 3s ease'}
        />
      </Explorer>
    </React.Fragment>
  )
}
