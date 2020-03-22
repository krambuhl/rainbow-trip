import classnames from 'classnames'
import css from './Component.module.css'

export default function Component ({
  className,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props} />
  )
}
