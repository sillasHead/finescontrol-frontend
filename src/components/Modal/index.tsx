import React from 'react'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
  showModal: boolean
  setShowModal: (state: boolean) => void
  title: string
}

export default function Modal({ children, showModal, setShowModal, title }: Props) {

  function outsideClick(e: any) {
    if (e.id === 'background') {
      setShowModal(false)
    }
  }

  return (
    <div
      id='background'
      className={`${styles.backgroundModal} ${showModal ? styles.showModal : styles.hiddenModal}`}
      onClick={e => outsideClick(e.target)}
    >
      <div className={styles.modalContent}>
        <h1>{title}</h1>
        {children}
      </div>
    </div>
  )
}
