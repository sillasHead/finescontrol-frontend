import Modal from 'components/Modal'
import { AddButton, LineSeparator } from 'components/CustomComponents'
import { useEffect, useState } from 'react'
import { api } from 'utils/api'
import { Driver } from 'utils/types'
import { ItemActiveDriver, ItemInactiveDriver } from './components/ItemDriver'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalDriver({ showModal, setShowModal }: Props) {
  const [activeDrivers, setActiveDrivers] = useState<Driver[]>([])
  const [inactiveDrivers, setInactiveDrivers] = useState<Driver[]>([])

  useEffect(() => {
    api.get('motoristas')
      .then(response => {
        const activeDrivers = (response.data as Driver[]).filter(driver => driver.status)
        setActiveDrivers(activeDrivers)

        const inactiveDrivers = (response.data as Driver[]).filter(driver => !driver.status)
        setInactiveDrivers(inactiveDrivers)
      })
      .catch(error => { //TODO melhorar o retorno de erro
        console.log('api.get => ', error)
      })
  }, [activeDrivers])

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Motoristas'}
    >
      <div className={styles.modalContent}>
        {activeDrivers.map(driver => (
          <ItemActiveDriver driver={driver} />
        ))}

        {inactiveDrivers && (
          <LineSeparator text="Inativos" />
        )}

        {inactiveDrivers.map(driver => (
          <ItemInactiveDriver driver={driver} />
        ))}
      </div>
      <AddButton />
    </Modal>
  )
}
