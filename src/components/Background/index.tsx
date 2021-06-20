import ModalNewFine from 'components/Modal/NewFine'
import { ButtonNewFine } from 'components/CustomComponents'
import { useState } from 'react'
import styles from './styles.module.scss'

type Props = {
  children: React.ReactNode
}

export default function Background({ children }: Props) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <div className={styles.backgroundContainer}>
        {children}
        <ButtonNewFine onClick={() => setShowModal(true)} />
      </div>
      <ModalNewFine
        showModal={showModal}
        setShowModal={setShowModal}
      />
    </>
  )
}
