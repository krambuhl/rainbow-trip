/* eslint-disable */
import { useState, useEffect } from 'react'
import useRaf from '@rooks/use-raf'
import _ from 'lodash'

const colors = {
  violet: '#C28FD6',
  purple: '#72669C',
  blue: '#2F87D2',
  teal: '#63C4BD',
  green: '#7AB959',
  yellow: '#F8BB4D',
  orange: '#EF8339',
  red: '#C1342C',
  maroon: '#59232B',
  black: '#000',
  white: '#fff'
}

const rawRainbow2 = [
  colors.violet,
  colors.purple,
  // colors.blue,
  colors.teal,
  // colors.green,
  // colors.yellow,
  // colors.orange,
  // colors.red,
  // colors.maroon,
  // colors.white,
  // colors.black
]

const rawRainbow = [
  colors.maroon,
  // colors.orange,
  colors.purple,
  // colors.teal,
  colors.violet,
  // colors.black,
  colors.white
  // colors.red,
]

const sides = Array(30).fill(30)

function createStyleGenerator() {
  return function getStyle(
    { time, slowTime, cycleTime, slowCycleTime },
    { outer, inner }
  ) {
    const pattern = outer % 5
    const bow = rawRainbow

    const target = (
      (time * (inner + 1)) +
      (slowTime * (outer + 1))
    )

    const color = bow[
      Math.floor(target * bow.length) % bow.length
    ]

    const math = (slowCycleTime / 1) * ((inner * 16) / (outer + 1))

    return {
      backgroundColor: color,
      boxShadow: `inset black 0 0 0 ${2 + (math)}px`,
      // backgroundImage: `linear-gradient(to bottom right, ${color1} 50%, ${color2} 50%)`
    }
  }
}

const outerGenerator = createStyleGenerator()
const SPEED = 1 / 100

export default function IndexPage() {
  // const [raw, setRaw] = useState(1.6)
  const [raw, setRaw] = useState(0)

  useRaf(() => {
    setRaw(raw + SPEED)
  }, true)

  const handleClick = () => {
    setRaw(raw + SPEED)
  }

  const timeobj = {
    time: raw,
    cycleTime: Math.sin(raw % Math.PI),
    slowTime: raw / 20,
    slowCycleTime: Math.sin((raw / 20) % Math.PI),
  }

  console.log(timeobj)

  return (
    <div
      className="container"
      onClick={handleClick}
    >
      {sides.map((num, outer) => {
        const list = Array(num).fill(null)

        return (
          <div className="group">
            {list.map((_, inner) => {
              const outerStyles = outerGenerator(timeobj, { outer, inner })

              return (
                <div
                  className="item"
                  style={outerStyles}
                />
              )
            })}
          </div>
        )
      })}

      <div><br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{raw}</div>
      <style jsx>{`
        .container {
          display: flex;
          align-items: start;
          justify-content: start;
          flex-direction: column;
          min-height: 100vh;
        }

        .group {
          display: flex;
          flex-direction: row;
        }

        .item {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          width: 24px;
          height: 24px;
          background-color: black;
          // transition: 1s ease
          // margin: 1px;
        }
      `}</style>
    </div>
  )
}
