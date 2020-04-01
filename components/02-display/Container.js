import classnames from 'classnames'
export default function Container(props) {
  return (
    <React.Fragment>
      <div
        {...props}
        className={classnames("root", props.className)}
      />

      <style jsx>{`
        .root {
          padding: calc(var(--padding) * 0.5);
          border: 4px solid #333;
          min-width: 340px;
          text-align: left;
          overflow: auto;
          font-size: 0.8em;
          background-color: black;
        }
      `}</style>
    </React.Fragment>
  )
}
