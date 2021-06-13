import { MenuItem } from 'components/Item'
import ModalCar from 'components/Modal/Car'
import ModalDriver from 'components/Modal/Driver'
import ModalInfraction from 'components/Modal/Infraction'
import { useState } from 'react'
import styles from './styles.module.scss'

export function Menu() {
  const [showModalDriver, setShowModalDriver] = useState(false)
  const [showModalCar, setShowModalCar] = useState(false)
  const [showModalInfraction, setShowModalInfraction] = useState(false)
  
  return (
    <>
      <div className={styles.menuContainer}>
        <MenuItem selected={!showModalDriver && !showModalCar && !showModalInfraction} title={'Multas'} />
        <MenuItem selected={showModalDriver} title={'Motoristas'} setShowModal={setShowModalDriver} />
        <MenuItem selected={showModalCar} title={'Carros'} setShowModal={setShowModalCar} />
        <MenuItem selected={showModalInfraction} title={'Infrações'} setShowModal={setShowModalInfraction} />
      </div>
      <ModalDriver showModal={showModalDriver} setShowModal={setShowModalDriver} />
      <ModalCar showModal={showModalCar} setShowModal={setShowModalCar} />
      <ModalInfraction showModal={showModalInfraction} setShowModal={setShowModalInfraction} />
    </>
  )
}
