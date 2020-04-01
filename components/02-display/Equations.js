export default function Equations({ equations: eqs }) {
  const [equations, setEquations] = eqs

  return (
    <React.Fragment>
      <div className="root">
        <table>
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="input">Equation</th>
            </tr>
          </thead>

          <tbody>
            {
              Object.keys(equations).map((key) => {
                const row = equations[key]

                const handleChange = ({ target }) => {
                  setEquations({ ...equations, [key]: target.value })
                }

                return (
                  <tr key={key} className="row">
                    <td>{key}</td>
                    <td>
                      <input className="textInput" value={row} onChange={handleChange} />
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>

      <style jsx>{`
        table {
          width: 100%;
          table-layout: fixed;
          text-align: left;
        }

        thead {
          line-height: 1.4em;
          font-size: 0.7em;
          font-weight: bold;
          letter-spacing: 1px;
          text-transform: uppercase;
          color: #666;
        }

        th { padding-bottom: 3px; }
        td { padding: 2px; }

        .name { width: 160px; }
        .input { width: auto; }
        .output { width: 160px; }

        .textInput {
          width: 100%;
          padding: 2px;
          border: none;
          border-bottom: 2px solid #333;
          background-color: transparent;
          color: white;
          font-size: 1em;
          font-family: var(--type-family);
        }

        .textInput:focus {
          outline: none;
          border-bottom: 2px solid white;
        }
      `}</style>
    </React.Fragment>
  )
}
