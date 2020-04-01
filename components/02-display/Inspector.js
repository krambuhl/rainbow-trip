import Container from '@components/display/Container'

export default function Inspector({ data = {} }) {
  const dataKeys = Object.keys(data)

  return (
    <React.Fragment>
      <Container>
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
                    <td>{key}</td>
                    <td>{row}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </Container>

      <style jsx>{`
        table {
          width: 100%;
          table-layout: fixed;
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

        .row { border-top: 2px solid #111; }
        .name { width: 25%; }
        .value { width: auto; }
      `}</style>
    </React.Fragment>
  )
}
