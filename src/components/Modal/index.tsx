import React from 'react'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
}

export default function Modal({ children }: Props) {
  return (
    <div className={styles.backgroundModal}>
      <div className={styles.modalContent}>
        <h1>Infrações</h1>
        {children}
      </div>
    </div>
  )
}
