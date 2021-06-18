import { Item } from 'components/Item'
import { AcceptButton, CssTextField, DeleteButton, DiscardButton, ReactivateButton, UpdateButton } from 'components/CustomComponents'
import { useState } from 'react'
import { api } from 'utils/api'
import { Driver } from 'utils/types'
import styles from './ItemDriver.module.scss'
import { getElementValue } from 'utils/functions'

type Props = {
  driver: Driver
  handleDriver: (driver: Driver) => void
}

export function ItemActiveDriver({ driver, handleDriver }: Props) {

  const [isEditing, setIsEditing] = useState(false)

  function handleIsEditing() {
    setTimeout(() => { // TODO melhorar a finalizacao da animacao ao clicar no botao antes de editar
      setIsEditing(!isEditing)
    }, 250)
  }

  function acceptEdit() {
    driver.name = (document.getElementById(`driver_${driver.id}`) as HTMLSelectElement).value.toUpperCase().trim()
    // TODO validar se houve alguma alteracao antes de efetuar o put
    api.put(`motoristas/${driver.id}`, driver)
      .then(() => {
        alert('Motorista atualizado com sucesso!')
        handleIsEditing()
        handleDriver(driver)
      })
      .catch(error => {
        alert('Erro')
        console.log('editando => ', error)
      })
  }

  function inactivateDriver() {
    driver.status = false

    api.put(`motoristas/${driver.id}`, driver)
      .then(() => {
        alert('Motorista inativado com sucesso')
        handleDriver(driver)
      })
      .catch(error => {
        alert('Erro')
        console.log('inativando => ', error)
      })
  }

  return (
    <Item flexDirection='row' alignItems='center' key={driver.id}>
      {!isEditing ? (
        <>
          <span>{driver.name}</span>
          <div>
            <UpdateButton onClick={handleIsEditing} />
            <DeleteButton onClick={inactivateDriver} />
          </div>
        </>
      ) : (
        <>
          <CssTextField
            id={`driver_${driver.id}`}
            defaultValue={driver.name}
            className={styles.inputDriver}
          />
          <div>
            <AcceptButton onClick={acceptEdit} />
            <DiscardButton onClick={handleIsEditing} />
          </div>
        </>
      )}
    </Item>
  )
}

export function ItemInactiveDriver({ driver, handleDriver: handleTest }: Props) {

  function reactivateDriver() {
    driver.status = true

    api.put(`motoristas/${driver.id}`, driver)
      .then(() => {
        alert('Motorista reativado com sucesso')
        handleTest(driver)
      })
      .catch(error => {
        alert('Erro')
        console.log('reativando => ', error)
      })
  }

  return (
    <Item flexDirection='row' alignItems='center' key={driver.id} inactive>
      <>
        <span>{driver.name}</span>
        <div>
          <ReactivateButton onClick={reactivateDriver} />
        </div>
      </>
    </Item>
  )
}

type AddDriverProps = {
  handleIsAdding: () => void
  handleDriver: (driver: Driver) => void
}

export function AddDriver({ handleIsAdding, handleDriver }: AddDriverProps) {
  
  function insertDriver() {
    const driverName = getElementValue('newDriver')
    const driver: Driver = { name: driverName, status: true, id: 0 }
    api.post('motoristas', driver)
      .then(response => {
        alert('Motorista adicionado com sucesso')
        handleDriver(response.data)
        handleIsAdding()
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
  }

  return (
    <Item flexDirection='row' alignItems='center'>
      <>
        <CssTextField
          id={'newDriver'}
          className={styles.inputDriver}
          label='Novo motorista'
        />
        <div>
          <AcceptButton onClick={insertDriver} />
          <DiscardButton onClick={handleIsAdding} />
        </div>
      </>
    </Item>
  )
}
