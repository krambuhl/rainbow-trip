export default function Grid({
  cellGenerator = () => null,
  groupGenerator = () => null,
  size = [40, 40],
  cell = [16, 16],
  gutter = [0, 0],
  transition = null
}) {
  return (
    <React.Fragment>
      <div className="container">
        {Array(size[0]).fill(size[1]).map((num, y) => {
          const list = Array(num).fill(null)
          const groupStyles = groupGenerator({ y })

          return (
            <div key={y} className="group" style={groupStyles}>
              {list.map((_, x) => {
                const cellStyles = cellGenerator({ x, y })

                return (
                  <div key={x} className="cell" style={cellStyles} />
                )
              })}
            </div>
          )
        })}
      </div>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
        }

        .group {
          display: flex;
          flex-direction: row;
        }

        .cell {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          width: ${cell[0]}px;
          height: ${cell[1]}px;
          margin: ${gutter[0]}px ${gutter[1]}px;
          transition: ${transition ? transition : 'none'} ease;
        }
      `}</style>
    </React.Fragment>
  )
}
