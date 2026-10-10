import { useEffect, useId, useRef } from 'react'
import { X } from 'lucide-react'

// Bottom sheet on phones, built on <dialog> for focus trapping and Esc.
export default function Sheet({ open, onClose, title, children }) {
  const ref = useRef(null)
  const titleId = useId()

  useEffect(() => {
    const dialog = ref.current
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      className="sheet"
      aria-labelledby={titleId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target === ref.current) onClose()
      }}
      // A link inside navigates away and may unmount this sheet. Close the
      // modal first: removing a still-open modal dialog can leave mobile
      // browsers zoomed out.
      onClickCapture={(event) => {
        if (event.target.closest('a[href]')) ref.current.close()
      }}
    >
      <div className="sheet__panel">
        <header className="sheet__head">
          <h2 id={titleId} className="sheet__title">
            {title}
          </h2>
          <button type="button" className="sheet__close" onClick={onClose} aria-label="Close">
            <X size={20} aria-hidden="true" />
          </button>
        </header>
        <div className="sheet__body">{children}</div>
      </div>
    </dialog>
  )
}
