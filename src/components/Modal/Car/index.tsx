import { ButtonAdd, ButtonText, LineSeparator } from 'components/CustomComponents'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'
import { api } from 'utils/api'
import { Car } from 'utils/types'
import { AddCar, ItemActiveCar, ItemInactiveCar } from './components/ItemCar'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalCar({ showModal, setShowModal }: Props) {
  const [activeCars, setActiveCars] = useState<Car[]>([])
  const [inactiveCars, setInactiveCars] = useState<Car[]>([])
  const [showInactiveCars, setShowInactiveCars] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [carChange, setCarChange] = useState({})
  
  useEffect(() => {
    api.get('carros') //TODO melhorar a busca
      .then(response => {
        const activeCars = (response.data as Car[]).filter(car => car.status)
        setActiveCars(activeCars)

        const inactiveCars = (response.data as Car[]).filter(car => !car.status)
        setInactiveCars(inactiveCars)
      })
      .catch(error => { //TODO melhorar o retorno de erro
        console.log('api.get => ', error)
      })
  }, [carChange])
  
  function handleSetIsAdding() {
    setIsAdding(!isAdding)
  }

  function handleCar(car: Car) {
    setCarChange(car)
  }

  function handleShowInactiveCars() {
    setShowInactiveCars(!showInactiveCars)
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Carros'}
    >
      <div className={styles.modalContent}>
        {activeCars.map(car => 
          <ItemActiveCar car={car} handleCar={handleCar} key={car.id} />
        )}

        {inactiveCars.length > 0 && (
          <LineSeparator>
            <ButtonText onClick={handleShowInactiveCars}>
              {`${showInactiveCars ? 'Esconder' : 'Mostrar'} Inativos (${inactiveCars.length})`}
            </ButtonText>
          </LineSeparator>
        )}

        {isAdding && (
          <AddCar handleCar={handleCar} handleIsAdding={handleSetIsAdding} />
        )}

        {showInactiveCars && inactiveCars.map(car => (
          <ItemInactiveCar car={car} handleCar={handleCar} />
        ))}
      </div>
      <ButtonAdd onClick={handleSetIsAdding} />
    </Modal>
  )
}
