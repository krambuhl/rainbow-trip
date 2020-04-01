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

const rawRainbow = [
  colors.violet,
  colors.purple,
  colors.blue,
  colors.teal,
  // colors.green,
  // colors.yellow,
  // colors.orange,
  // colors.red,
  // colors.maroon,
  // colors.white,
  // colors.black
]

const rawRainbow2 = [
  colors.yellow,
  colors.orange,
  colors.red,
]

const rainbow = Array(40).fill(null).map(
  (n, i) => rawRainbow[
    Math.floor(
      (i * 3)
      % rawRainbow.length
    )
  ]
)

const rainbow2 = Array(40).fill(null).map(
  (n, i) => rawRainbow2[
    Math.floor(
      i
      % rawRainbow2.length
    )
  ]
)


// const sides = []
const sides = Array(40).fill(40)

function createStyleGenerator({ offset, invert }) {
  return function getStyle({ raw, inv }, { outer, inner }) {
    const p1 = Math.abs(Math.sin(raw * inner))
    const p2 = Math.abs(Math.cos(inv * outer))

    const bow = outer > 14 ? rainbow : rainbow2
    const pattern = outer % 2 & inner % 2 ? p1 : p2

    const color = bow[Math.floor(pattern * bow.length) % bow.length]

    return {
      backgroundColor: color
      // backgroundImage: `linear-gradient(to bottom right, ${color1} 50%, ${color2} 50%)`
    }
  }
}

const outerGenerator = createStyleGenerator({ offset: 2, invert: false })

const SPEED = 1 / 10000

export default function IndexPage() {
  const [raw, setRaw] = useState(SPEED * 1000  * 2.608)
  useRaf(() => {
    // setRaw(raw + SPEED)
  }, true)

  const handleClick = () => {
    setRaw(0)
  }

  const time = {
    raw,
    inv: 1 - raw
  }

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
              const outerStyles = outerGenerator(time, { outer, inner })

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
          width: 16px;
          height: 16px;
          background-color: black;
          // transition: 1s ease
        }
      `}</style>
    </div>
  )
}
