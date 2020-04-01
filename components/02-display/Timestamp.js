
import padLeft from 'pad-left'

export default function Timestamp({
  frame,
  ...props
}) {

  return (
    <React.Fragment>
      <div className="timestamp" {...props}>
        {padLeft(frame.toLocaleString(), 0, '0')}
      </div>

      <style jsx>{`
        .timestamp {
          align-self: center;
          justify-self: center;
          font-size: 1.6em;
          padding: 0 var(--padding);
          font-weight: bold;
        }
      `}</style>
    </React.Fragment>
  )
}
