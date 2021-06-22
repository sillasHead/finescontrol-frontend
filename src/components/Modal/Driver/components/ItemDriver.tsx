import { Item } from 'components/Item'
import { ButtonAccept, TextFieldBlue, ButtonDelete, ButtonDiscard, ButtonReactivate, ButtonUpdate } from 'components/CustomComponents'
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
    driver.name = getElementValue('name', 'uppercase')
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
          <div className={styles.buttons}>
            <ButtonUpdate onClick={handleIsEditing} />
            <ButtonDelete onClick={inactivateDriver} />
          </div>
        </>
      ) : (
        <>
          <TextFieldBlue id='name' defaultValue={driver.name} />
          <div className={styles.buttons}>
            <ButtonAccept onClick={acceptEdit} />
            <ButtonDiscard onClick={handleIsEditing} />
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
          <ButtonReactivate onClick={reactivateDriver} />
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
    const name = getElementValue('name', 'uppercase')
    const driver: Driver = { 
      id: 0,
      name: name, 
      status: true, 
    }
    
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
        <TextFieldBlue
          id='name'
          className={styles.inputDriver}
          label='Novo motorista'
        />
        <div className={styles.buttons}>
          <ButtonAccept onClick={insertDriver} />
          <ButtonDiscard onClick={handleIsAdding} />
        </div>
      </>
    </Item>
  )
}
