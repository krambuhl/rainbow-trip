/* eslint-disable no-unused-vars */
import { useState } from 'react'
import useTransport from '@hooks/useTransport'
import * as TrigHooks from '@hooks/useTrigFrame'
// import { rgba, mix } from 'polished'

import * as Colors from '@lib/colors'

import Inspector from '@components/display/Inspector'
import Transport from '@components/display/Transport'
import Grid from '@components/display/Grid'

const warm = [
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

const cool = [
  Colors.Malachite,
  Colors.MalachiteDark,
  Colors.SkyBlue,
  // Colors.Fjord,
  // Colors.DeepSea,
  Colors.BlueVelvet,
  Colors.Viola,
  Colors.PurpleRed
]

function groupGenerator({ data1, data2, data3 }, { y }) {
  return {
    backgroundColor: y < 15 ? Colors.Orangina : Colors.Malachite,
  }
}

function cellGenerator({ data1, data2, data3, data4 }, { x, y }) {
  const x1 = x + 1
  const y1 = y + 25

  const val1 = Math.abs(data1)
  const val2 = Math.abs(data2)
  const val3 = Math.abs(data3)
  const val4 = Math.abs(data4)

  const warmColor = warm[Math.floor((y1 * y1) * val3 * warm.length * (val3 * x1)) % warm.length]
  // const warmColor = warm[Math.floor((x1 * y1) * val2) % warm.length]
  // const warmColor = warm[Math.floor((x1 * val2) + (y1 * val3)) % warm.length]

  const coolColor = cool[Math.floor((y1 * y1) * val3 * cool.length * (val3 * x1)) % cool.length]
  // const coolColor = cool[Math.floor((x1 * y1) * val2) % cool.length]
  // const coolColor = cool[Math.floor((x1 * val3) + (y1 * val2)) % cool.length]

  return {
    backgroundColor: y < 15 ? warmColor : coolColor,
  }
}

export default function IndexPage() {
  const transport = useTransport({
    isPlaying: true,
    frameSize: 1,
    frame: 0
  })

  const data1 = TrigHooks.useSin(transport.frame, 10)
  const data2 = TrigHooks.useCos(transport.frame, 1)
  const data3 = TrigHooks.useTan(transport.frame, 0.01)
  const data4 = TrigHooks.useSin(transport.frame, 1)

  const data = { data1, data2, data3, data4 }

  return (
    <React.Fragment>
      <div className="container">
        <Grid
          cellGenerator={cord => cellGenerator(data, cord)}
          groupGenerator={cord => groupGenerator(data, cord)}
          cell={[16, 16]}
        />
      </div>

      <div className="transport">
        <Transport {...transport} />
      </div>

      <div className="inspector">
        <Inspector data={data} />
      </div>

      <style jsx>{`
        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: calc(100vh - calc(2 * var(--padding)));
          padding-bottom: 100px;
        }

        .transport,
        .inspector {
          position: fixed;
          z-index: 1000;
        }

        .transport {
          bottom: var(--padding);
          display: flex;
          width: 100%;
          justify-content: center;
        }

        .inspector {
          top: var(--padding);
          right: var(--padding);
          max-width: 400px;
        }
      `}</style>
    </React.Fragment>
  )
}
