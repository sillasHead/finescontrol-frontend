import Modal from 'components/Modal'
import { AddButton, LineSeparator, TextButton } from 'components/CustomComponents'
import { useEffect, useState } from 'react'
import { api } from 'utils/api'
import { Driver } from 'utils/types'
import { AddDriver, ItemActiveDriver, ItemInactiveDriver } from './components/ItemDriver'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalDriver({ showModal, setShowModal }: Props) {
  const [activeDrivers, setActiveDrivers] = useState<Driver[]>([])
  const [inactiveDrivers, setInactiveDrivers] = useState<Driver[]>([])
  const [showInactiveDrivers, setShowInactiveDrivers] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [driverChange, setDriverChange] = useState({})

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
  }, [driverChange])

  function handleSetIsAdding() {
    setIsAdding(!isAdding)
  }

  function handleDriver(driver: Driver) {
    setDriverChange(driver)
  }

  function handleShowInactiveDrivers() {
    setShowInactiveDrivers(!showInactiveDrivers)
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Motoristas'}
    >
      <div className={styles.modalContent}>
        {activeDrivers.map(driver => (
          <ItemActiveDriver driver={driver} handleDriver={handleDriver} />
        ))}

        {isAdding && (
          <AddDriver handleIsAdding={handleSetIsAdding} handleDriver={handleDriver} />
        )}

        {inactiveDrivers && (
          <LineSeparator>
            <TextButton onClick={handleShowInactiveDrivers}>
              {`${showInactiveDrivers ? 'Esconder' : 'Mostrar'} Inativos (${inactiveDrivers.length})`}
            </TextButton>
          </LineSeparator>
        )}

        {showInactiveDrivers && inactiveDrivers.map(driver => (
          <ItemInactiveDriver driver={driver} handleDriver={handleDriver} />
        ))}
      </div>
      <AddButton onClick={handleSetIsAdding} />
    </Modal>
  )
}
