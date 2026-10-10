import { Link } from 'react-router-dom'

// One button style system for the study pages. Renders a router Link when
// `to` is given, otherwise a <button>.
export default function Button({ to, variant = 'primary', size, icon: Icon, iconStart: IconStart, className = '', children, ...props }) {
  const classes = ['btn', `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ')
  const content = (
    <>
      {IconStart && <IconStart className="btn__icon" size={18} strokeWidth={2.25} aria-hidden="true" />}
      <span className="btn__label">{children}</span>
      {Icon && <Icon className="btn__icon" size={18} strokeWidth={2.25} aria-hidden="true" />}
    </>
  )

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    )
  }
  return (
    <button type="button" className={classes} {...props}>
      {content}
    </button>
  )
}
