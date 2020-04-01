/* eslint-disable no-unused-vars */
import { useState } from 'react'
import useTransport from '@hooks/useTransport'
import useEquations from '@hooks/useEquations'
import * as TrigHooks from '@hooks/useTrigFrame'
// import { rgba, mix } from 'polished'

import * as Colors from '@lib/colors'

import Explorer from '@components/display/Explorer'
import Grid from '@components/display/Grid'

const warmColors = [
  Colors.FireRed,
  Colors.RoyalRed,
  Colors.YellowCab,
  // Colors.SkyBlue,
  // Colors.BloodOrange,
  Colors.PurpleRed,
  // Colors.FireRed,
  // Colors.LawnGreen,
  Colors.Orangina,
  Colors.Brick,

  // Colors.Malachite,
  // Colors.Malachite,
  // Colors.MalachiteDark,
  // Colors.c,
]

const coolColors = [
  Colors.Malachite,
  Colors.MalachiteDark,
  Colors.SkyBlue,
  // Colors.Fjord,
  // Colors.DeepSea,
  Colors.BlueVelvet,
  Colors.Viola,
  Colors.PurpleRed
]

function cellGenerator(equations, data, cords) {
  const { x, y } = cords
  const { warm, cool, colorFlag } = equations
  const {
    sinSlow, sinFast,
    cosSlow, cosFast,
    tanSlow, tanFast
  } = data

  const x1 = x + 1
  const y1 = y + 1

  try {
    const warmColor = eval(warm)
    const coolColor = eval(cool)
    const flag = eval(colorFlag)

    return {
      backgroundColor: flag ? warmColor : coolColor,
    }
  } catch (e) {
    return {}
  }
}

export default function IndexPage() {
  const transport = useTransport({
    isPlaying: true,
    frameSize: 1,
    frame: 0
  })

  // const equations = useState({
  //   warm: `warmColors[Math.floor((y1 * y1) * Math.abs(tanSlow) * warmColors.length * (Math.abs(tanSlow) * x1)) % warmColors.length]`,
  //   cool: `coolColors[Math.floor((y1 * y1) * Math.abs(tanSlow) * coolColors.length * (Math.abs(tanSlow) * x1)) % coolColors.length]`,
  //   colorFlag: 'y < 15'
  // })

  // const equations = useEquations({
  //   warm: `warmColors[Math.floor((x1 * Math.abs(sinSlow)) + (y1 * Math.abs(tanSlow))) % warmColors.length]`,
  //   cool: `coolColors[Math.floor((x1 * Math.abs(tanSlow)) + (y1 * Math.abs(sinSlow))) % coolColors.length]`,
  //   colorFlag: 'y < 15'
  // })

  const equations = useEquations({
    warm: `warmColors[Math.floor((x1 * y1) * Math.abs(sinSlow)) % warmColors.length]`,
    cool: `coolColors[Math.floor((x1 * y1) * Math.abs(sinSlow)) % coolColors.length]`,
    colorFlag: 'y < 15'
  })

  const sinSlow = TrigHooks.useSin(transport.frame, 1)
  const sinFast = TrigHooks.useSin(transport.frame, 10)
  const cosSlow = TrigHooks.useCos(transport.frame, 1)
  const cosFast = TrigHooks.useCos(transport.frame, 10)
  const tanSlow = TrigHooks.useTan(transport.frame, 0.01)
  const tanFast = TrigHooks.useTan(transport.frame, 1)

  const data = {
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
          cell={[16, 16]}
        />
      </Explorer>
    </React.Fragment>
  )
}
