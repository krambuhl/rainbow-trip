/* eslint-disable */
import { useState, useEffect } from 'react'
import { useRaf } from 'react-use'

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
}

const rainbow = [
  colors.violet,
  colors.purple,
  colors.blue,
  colors.teal,
  colors.green,
  colors.yellow,
  colors.orange,
  colors.red,
  colors.maroon,
]

// const sides = []
const sides = Array(15).fill(2)

function getYuckColor(sideIndex, listIndex, offset = 11, flag = false) {
  const start = sides.slice(0, sideIndex)
    .reduce((sum, size, i) => {
      if (flag) return i % offset > 2 ? sum + (size / 2) : sum
      return sum + size
    }, 0)
  return rainbow[Math.floor((((start * 1) + listIndex + sideIndex + 0) * offset) % rainbow.length)]
}

function createStyleGenerator(opts) {
  const offset = opts.offset || 1
  const invert = opts.invert || false

  return function getStyle({ raw, inv }, { outer, inner }) {

    return {

    }
  }
}

const outerGenerator = createStyleGenerator({ offset: 1 })
const innerGenerator = createStyleGenerator({ offset: 1, invert: true })

export default function IndexPage() {
  const raw = useRaf(500000)
  const time = {
    raw,
    inv: 1 - raw
  }

  return (
    <div>
      {sides.map((num, outer) => {
        const list = Array(num).fill(null)
        return (
          <div className="container">
            {list.map((_, inner) => {
              const outerStyles = outerGenerator(time, { outer, inner })
              const innerStyles = innerGenerator(time, { outer, inner })

              return (
                <div
                  className="box"
                  style={outerStyles}
                >
                  <div
                    className="inner-box"
                    style={innerStyles}
                  />
                </div>
              )
            })}
          </div>
        )
      })}
      <style jsx>{`
        .container {
          display: flex;
          justify-content: space-between;
          margin-bottom:9px;
        }

        .box {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          width: 40px;
          height: 60px;
          background-color: white;
        }

        .inner-box {
          display: none;
          width: 50%;
          height:38%;
          border-right: black solid 11px;
          background-color: red;
        }
      `}</style>
    </div>
  )
}
