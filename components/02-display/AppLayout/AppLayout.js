import classnames from 'classnames'
import css from './AppLayout.module.css'

export default function AppLayout ({
  className,
  ...props
}) {
  const classList = classnames(css.root, className)

  return (
    <div className={classList} {...props} />
  )
}
