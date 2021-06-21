import { ButtonAdd } from 'components/CustomComponents'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'
import { api } from 'utils/api'
import { Infraction } from 'utils/types'
import { AddInfraction, ItemActiveInfraction as ItemInfraction } from './components/ItemInfraction'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalInfraction({ showModal, setShowModal }: Props) {
  const [infractions, setInfractions] = useState<Infraction[]>([])
  // const [inactiveInfractions, setInactiveInfractions] = useState<Infraction[]>([])
  // const [showInactiveInfractions, setShowInactiveInfractions] = useState(false)
  const [isAdding, setIsAdding] = useState(false)
  const [infractionChange, setInfractionChange] = useState({})

  useEffect(() => {
    api.get('infracoes')
      .then(response => {
        const infractions = (response.data as Infraction[])
        setInfractions(infractions)

        // const inactiveInfractions = (response.data as Infraction[]).filter(infraction => !infraction.status)
        // setInactiveInfractions(inactiveInfractions)
      })
      .catch(error => { //TODO melhorar o retorno de erro
        console.log('api.get => ', error)
      })
  }, [infractionChange])

  function handleSetIsAdding() {
    setIsAdding(!isAdding)
  }

  function handleInfraction(infraction: Infraction) {
    setInfractionChange(infraction)
  }

  // function handleShowInactiveInfractions() {
  //   setShowInactiveInfractions(!showInactiveInfractions)
  // }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Infrações'}
    >
      <div className={styles.modalContent}>
        {infractions.map(infraction => (
          <ItemInfraction infraction={infraction} handleInfraction={handleInfraction} />
        ))}

        {isAdding && (
          <AddInfraction handleIsAdding={handleSetIsAdding} handleInfraction={handleInfraction} />
        )}

        {/* {inactiveInfractions.length > 0 && (
          <LineSeparator>
            <ButtonText onClick={handleShowInactiveInfractions}>
              {`${showInactiveInfractions ? 'Esconder' : 'Mostrar'} Inativos (${inactiveInfractions.length})`}
            </ButtonText>
          </LineSeparator>
        )}

        {showInactiveInfractions && inactiveInfractions.map(infraction => (
          <ItemInactiveInfraction infraction={infraction} handleInfraction={handleInfraction} />
        ))} */}
      </div>
      <ButtonAdd onClick={handleSetIsAdding} />
    </Modal>
  )
}
