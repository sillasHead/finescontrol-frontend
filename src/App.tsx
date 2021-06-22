import Background from 'components/Background'
import Header from 'components/Header'
import { Item, ItemComplete } from 'components/Item'
import { Menu } from 'components/Menu'
import { useEffect, useState } from 'react'
import { api } from 'utils/api'
import { Driver, Fine } from 'utils/types'
import { format } from 'date-fns'
import styles from './styles.module.scss'
import { ButtonNewFine } from 'components/CustomComponents'
import ModalNewFine from 'components/Modal/NewFine'

function App() {
  const [drivers, setDrivers] = useState<Driver[]>()
  const [showModal, setShowModal] = useState(false)
  const [fineAdded, setFineAdded] = useState<Fine>()

  useEffect(() => {
    api.get('motoristas')
      .then(response => {
        const drivers = (response.data as Driver[]).filter(driver => driver.fines && driver.fines.length > 0)
        // apenas motoristas que possuem 1 multa ou mais
        setDrivers(drivers)
      })
      .catch(error => {
        alert('Erro')
        console.log('api.get(motoristas) => ', error)
      })
  }, [fineAdded])
  
  return (
    <>
      <Header />
      <main>
        <Menu />
        <Background>
          {drivers && drivers.map(driver => (
            <ItemComplete title={<span>{driver.name}</span>} key={driver.id}>
              {driver.fines && (driver.fines).map(fine => (
                <Item key={fine.id}>
                  <div className={styles.item}>
                    <div className={styles.line}>
                      <span className={styles.w75}>
                        <strong>Descrição:&nbsp;</strong>{fine.infraction.description}
                      </span>
                    </div>
                    <div className={styles.line}>
                      <span className={styles.w25}>
                        <strong>Data | Hora:&nbsp;</strong>{format(new Date(fine.moment), 'dd/MM/yyyy | kk:mm')}
                      </span>

                      <span className={styles.w25}>
                        <strong>Carro:&nbsp;</strong>{fine.car.name}
                      </span>

                      <span className={styles.w25}>
                        <strong>Placa:&nbsp;</strong>{fine.car.plate}
                      </span>

                      <span className={styles.w25}>
                        <strong>Prazo para indicação:&nbsp;</strong>{format(new Date(fine.dueDate), 'dd/MM/yyyy')}
                      </span>
                    </div>

                    <div className={styles.line}>
                      <span className={styles.w25}>
                        <strong>AIT:&nbsp;</strong>{fine.aitCode}
                      </span>

                      <span className={styles.w25}>
                        <strong>Pontuação:&nbsp;</strong>{fine.infraction.rating}
                      </span>

                      <span className={styles.w25}>
                        <strong>Valor:&nbsp;</strong>{fine.amount}
                      </span>

                      <span className={styles.w25}>
                        <strong>Situação:&nbsp;</strong>{fine.identifiedDriver ? 'Indicado' : 'Não indicado'}
                      </span>
                    </div>
                  </div>
                </Item>
              ))}
            </ItemComplete>
          ))}
          <ButtonNewFine onClick={() => setShowModal(true)} />
        </Background>
      </main>
      <ModalNewFine
        showModal={showModal}
        setShowModal={setShowModal}
        setFineAdded={setFineAdded}
      />
    </>
  )
}

export default App
