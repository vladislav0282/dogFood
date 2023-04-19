import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import styles from './Modal.module.css'

function ModalInner({ closeDeleteModalHandler, children }) {
  useEffect(() => {
    const closeModalByEscape = (e) => {
      if (e.key === 'Escape') {
        closeDeleteModalHandler()
        e.target.blur()
      }
    }
    return () => {
      document.removeEventListener('keydown', closeModalByEscape)
    }
  }, [])

  return (
    <div className={styles.modalInner}>
      {children}
    </div>
  )
}

export function Modal({ isOpen, closeHandler, children }) {
  if (!isOpen) return null

  const closeModalByClickWrapper = (e) => {
    if (e.target === e.currentTarget) {
      closeHandler()
    }
  }

  return createPortal(
    <div onMouseDown={closeModalByClickWrapper} className={styles.modalWr}>
      <ModalInner closeHandler={closeHandler}>
        {children}
      </ModalInner>
    </div>,
    document.getElementById('modal-root'),
  )
}
