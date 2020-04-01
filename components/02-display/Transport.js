import classnames from 'classnames'
import padLeft from 'pad-left'
import { Play, Pause, SkipBack } from 'react-feather'
import _ from 'lodash'

export default function Transport({
  frame,
  setFrame,
  frameSize,
  setFrameSize,
  isPlaying,
  setPlaying,
  ...props
}) {
  const handleRestart = () => {
    setFrame(0)
    setPlaying(false)
  }

  const handlePlayPause = () => {
    setPlaying(!isPlaying)
  }

  const handleSpeedChange = (speed) => () => {
    setFrameSize(speed)
  }

  return (
    <React.Fragment>
      <div className="root" {...props}>
        <div className="btn-group">
          <button className="btn btn-big" onClick={handleRestart}>
            <SkipBack fill="white" stroke="white" size={32} strokeWidth={1.5} />
          </button>

          <button className="btn btn-big play-pause" onClick={handlePlayPause}>
            {
              !isPlaying ? (
                <Play fill="white" stroke="white" size={32} strokeWidth={1.5} />
              ) : (
                <Pause fill="white" stroke="white" size={32} strokeWidth={1.5} />
              )
            }
          </button>
        </div>

        <div className="btn-group speed">
          {
            _.reverse([1000, 100, 30, 10, 3, 1, -1, -3, -10, -30, -100, -1000]).map(value => (
              <button
                key={value}
                className={classnames("btn btn-text", {
                  'is-active': frameSize === value
                })}
                onClick={handleSpeedChange(value)}
              >
                {value > 0 ? '+' : ''}{value.toLocaleString()}
              </button>
            ))
          }
        </div>
      </div>

      <style jsx>{`
        .root {
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .root > * + * {
          margin-top: 12px;
        }

        .btn-group {
          display: flex;
          justify-content: center;
        }

        .btn {
          display: block;
          background: #333;
          border: none;
          border-radius: 0;
          padding: 2px 5px 1px;
          color: white;
          cursor: pointer;
        }

        .btn-big {
          padding: 12px 16px 10px;
        }

        .play-pause {
          padding: ${!isPlaying ? '12px 15px 10px 17px' : '12px 16px 10px'};
        }

        .btn.is-active {
          background-color: white;
          color: black;
        }

        .btn-text {
          padding: 2px 12px 1px;
          font-size: 0.8em;
          font-family: var(--type-family);
        }

        .btn + .btn {
          margin-left: 2px;
        }

        .speed {
          display: flex;
          flex-flow: wrap row;
          padding-top: var(--padding);
        }

        .speed .btn {
          margin-bottom: 2px;
        }

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
