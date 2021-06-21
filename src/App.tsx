import Background from 'components/Background'
import Header from 'components/Header'
import { Item, ItemComplete } from 'components/Item'
import { Menu } from 'components/Menu'
import { useEffect, useState } from 'react'
import { api, getDrivers } from 'utils/api'
import { Driver } from 'utils/types'
import styles from './styles.module.scss'

function App() {
  const [drivers, setDrivers] = useState<Driver[]>()

  useEffect(() => {
    api.get('motoristas')
      .then(response => {
        const drivers = (response.data as Driver[]).filter(driver => driver.fines && driver.fines.length > 0)
        setDrivers(drivers)
      })
      .catch(error => {
        alert('Erro')
        console.log('api.get(motoristas) => ', error)
      })
  }, [])

  return (
    <>
      <Header />
      <main>
        <Menu />
        <Background>
          {drivers && drivers.map(driver => (
            <ItemComplete
              title={<span>{driver.name}</span>}
              key={driver.id}
            >
              {/* <ItemFine /> */}
              {driver.fines && driver.fines.map(fine => (
                <Item key={fine.id}>
                  <div className={styles.item}>
                    <div className={styles.line}>
                      <span className={styles.w75}>
                        <strong>Descrição:&nbsp;</strong>{fine.infraction.description}
                      </span>

                      <span className={styles.w25}>
                        <strong>Data | Hora:&nbsp;</strong>{fine.moment}
                      </span>
                    </div>

                    <div className={styles.line}>
                      <span className={styles.w25}>
                        <strong>Motorista:&nbsp;</strong>{driver.name}
                      </span>

                      <span className={styles.w25}>
                        <strong>Carro:&nbsp;</strong>{fine.car.name}
                      </span>

                      <span className={styles.w25}>
                        <strong>Placa:&nbsp;</strong>{fine.car.plate}
                      </span>

                      <span className={styles.w25}>
                        <strong>Prazo para indicação:&nbsp;</strong>{fine.dueDate}
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
                        <strong>Situação:&nbsp;</strong>{fine.identifiedDriver}
                      </span>
                    </div>
                  </div>
                </Item>
              ))}
            </ItemComplete>
          ))}
        </Background>
      </main>
    </>
  )
}

export default App
