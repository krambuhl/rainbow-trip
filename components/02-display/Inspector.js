export default function Inspector({ data = {} }) {
  const dataKeys = Object.keys(data)

  return (
    <React.Fragment>
      <div className="root">
        <table>
          <thead>
            <tr>
              <th className="name">Name</th>
              <th className="value">Value</th>
            </tr>
          </thead>
          <tbody>
            {
              dataKeys.map((key) => {
                const row = data[key]
                return (
                  <tr key={key} className="row">
                    <td className="name">{key}</td>
                    <td className="value">{row}</td>
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

        .name { width: 120px; }
        .value { width: auto; }
      `}</style>
    </React.Fragment>
  )
}
