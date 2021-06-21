import Modal from 'components/Modal'
import { ButtonAdd, LineSeparator, ButtonText } from 'components/CustomComponents'
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
    api.get('motoristas') //TODO melhorar a busca
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
          <ItemActiveDriver driver={driver} handleDriver={handleDriver} key={driver.id} />
        ))}

        {isAdding && (
          <AddDriver handleIsAdding={handleSetIsAdding} handleDriver={handleDriver} />
        )}

        {inactiveDrivers.length > 0 && (
          <LineSeparator>
            <ButtonText onClick={handleShowInactiveDrivers}>
              {`${showInactiveDrivers ? 'Esconder' : 'Mostrar'} Inativos (${inactiveDrivers.length})`}
            </ButtonText>
          </LineSeparator>
        )}

        {showInactiveDrivers && inactiveDrivers.map(driver => (
          <ItemInactiveDriver driver={driver} handleDriver={handleDriver} />
        ))}
      </div>
      <ButtonAdd onClick={handleSetIsAdding} />
    </Modal>
  )
}
