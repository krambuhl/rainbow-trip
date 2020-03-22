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
  colors.purple,
  colors.orange,
  colors.violet,
  colors.blue,
  colors.green,
  colors.teal,
  colors.yellow,
  colors.red,
  // colors.maroon,
]

const sides = [52, 48, 48, 40, 40, 32, 32, 24, 24, 16, 16, 8, 8]
// const sides = Array(15).fill(38)
// const sides = Array(18).fill(1).map((_, i) => {
//   if (i % Math.floor(Math.random() * 7) < 1)
//     return 1 * i + Math.floor(Math.random() * (i * 5))
//   return 5 * i + Math.floor(Math.random() * (i * 10))
// })


function getContainerRepeatColor(sideIndex, listIndex) {
  return rainbow[listIndex % rainbow.length]
}

function getLinearColor(sideIndex, listIndex) {
  const start = sides.slice(0, sideIndex).reduce((sum, size) => sum + size, 0)
  return rainbow[(start + listIndex) % rainbow.length]
}

// 4, 5, 7, 11, 13/22
function getYuckColor(sideIndex, listIndex, offset = 11, flag = false) {
  const start = sides.slice(0, sideIndex)
    .reduce((sum, size, i) => {
      if (flag) return i % offset > 2 ? sum + (size / 2) : sum
      return sum + size
    }, 0)
  return rainbow[Math.floor((((start * 1) + listIndex + sideIndex + 0) * offset) % rainbow.length)]
}

const options = [5.395]

export default function IndexPage() {
  const [variantIndex, setIndex] = useState(0)
  // const [width, setWidth] = useState(5.385)
  const time = useRaf(500000)
  const timeWidth = time / 0.01
  const invTimeWidth = (1 - time) / 0.01

  const width = options[variantIndex % options.length]

  const handleClick = () => {
    // setWidth(width + 0.005)
    setIndex(variantIndex + 1)
  }

  // useEffect(() => {
  //   const timer = setInterval(handleClick, 1)
  //   return () => clearInterval(timer)
  // })


  return (
    <div
      onClick={handleClick}
      data-width={width}
    >
      {sides.map((num, sideIndex) => {
        const list = Array(num).fill(null)
        return (
          <div className="container">
            {list.map((_, listIndex) => {
              return (
                <div
                  className="box"
                  style={{ backgroundColor: getYuckColor(sideIndex, listIndex, width, true) }}
                >
                  <div
                    className="inner-box"
                    style={{ backgroundColor: getYuckColor(sideIndex, listIndex, invTimeWidth, false) }}
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
          border: 0px solid black;
        }

        .inner-box {
          display: none;
          width: 50%;
          height:38%;
          border-right: black solid 11px;
        }
      `}</style>
    </div>
  )
}
