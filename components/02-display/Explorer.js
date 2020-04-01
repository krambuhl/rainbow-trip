import Equations from '@components/display/Equations'
import Inspector from '@components/display/Inspector'
import Transport from '@components/display/Transport'
import Timestamp from '@components/display/Timestamp'

export default function Explorer({
  transport,
  data,
  equations,
  children
}) {
  return (
    <React.Fragment>
      <div className="root">
        <div className="container">
          {children}
        </div>

        <div className="properties">
          <Timestamp frame={transport.frame} />
          <Transport {...transport} />
          <Inspector data={data} />
        </div>

        <div className="equations">
          <Equations equations={equations} />
        </div>
      </div>

      <style jsx>{`
        .root {
          display: grid;
          grid-template-columns: 1fr 420px;
          grid-auto-rows: 1fr auto;
          min-height: 100vh;
          align-items: center;
          justify-content: center;
        }

        .container {
          display: flex;
          align-items: center;
          justify-content: center;
          flex-grow: 1;
          padding: var(--padding);
        }

        .properties {
          display: flex;
          flex-direction: column;
          flex-basis: 480px;
          height: 100%;
          border-left: 2px solid #333;
          background-color: #000;
        }

        .properties > :global(*) {
          padding: var(--padding);
        }

        .properties > :global(* + *) {
          border-top: 2px solid #333;
        }

        .transport {
          display: flex;
          width: 100%;
          justify-content: center;
        }

        .inspector {
          padding: var(--padding);
        }

        .equations {
          border-top: 2px solid #333;
          background-color: #000;
          padding: var(--padding);
          grid-column: 1 / span 2;
        }
      `}</style>
    </React.Fragment>
  )
}
