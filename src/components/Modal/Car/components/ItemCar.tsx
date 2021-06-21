import { ButtonAccept, ButtonDelete, ButtonDiscard, ButtonReactivate, ButtonUpdate, TextFieldGray } from 'components/CustomComponents'
import { ItemComplete } from 'components/Item'
import { useState } from 'react'
import { api } from 'utils/api'
import { getElementValue } from 'utils/functions'
import { Car } from 'utils/types'
import styles from './ItemCar.module.scss'

type Props = {
  car: Car
  handleCar: (car: Car) => void
}

export function ItemActiveCar({ car, handleCar }: Props) {

  const [isEditing, setIsEditing] = useState(false)

  function handleIsEditing() {
    setTimeout(() => { // TODO melhorar a finalizacao da animacao ao clicar no botao antes de editar
      setIsEditing(!isEditing)
    }, 250)
  }

  function acceptEdit() { // TODO
    car.name = getElementValue('name', 'uppercase')
    car.plate = getElementValue('plate', 'uppercase')
    car.renavam = getElementValue('renavam', 'uppercase')

    // TODO validar se houve alguma alteracao antes de efetuar o put
    api.put(`carros/${car.id}`, car)
      .then(() => {
        alert('Carro atualizado com sucesso!')
        handleIsEditing()
        handleCar(car)
      })
      .catch(error => {
        alert('Erro')
        console.log('editando => ', error)
      })
  }

  function inactivateCar() {
    car.status = false

    api.put(`carros/${car.id}`, car)
      .then(() => {
        alert('Carro inativado com sucesso')
        handleCar(car)
      })
      .catch(error => {
        alert('Erro')
        console.log('inativando => ', error)
      })
  }

  return (
    <ItemComplete
      paddingContent={5}
      title={!isEditing ? (
        <span>{car.name}</span>
      ) : (
        <TextFieldGray
          id='name'
          defaultValue={car.name}
          className={styles.title}
        >
          {car.name}
        </TextFieldGray>
      )}
    >
      <div className={styles.formContent}>
        {!isEditing ? (
          <>
            <div className={styles.item}>
              <span>Placa:&nbsp;</span> {car.plate}
            </div>
            <div className={styles.item}>
              <span>Renavam:&nbsp;</span> {car.renavam}
            </div>
            <div>
              <ButtonUpdate onClick={handleIsEditing} />
              <ButtonDelete onClick={inactivateCar} />
            </div>
          </>
        ) : (
          <>
            <div className={styles.item}>
              <span>Placa:&nbsp;</span>
              <TextFieldGray
                id='plate'
                defaultValue={car.plate}
                className={styles.inputCar}
              />
            </div>
            <div className={styles.item}>
              <span>Renavam:&nbsp;</span>
              <TextFieldGray
                id='renavam'
                defaultValue={car.renavam}
                className={styles.inputCar}
              />
            </div>
            <div>
              <ButtonAccept onClick={acceptEdit} />
              <ButtonDiscard onClick={handleIsEditing} />
            </div>
          </>
        )}
      </div>
    </ItemComplete>
  )
}

export function ItemInactiveCar({ car, handleCar: handleTest }: Props) {

  function reactivateCar() {
    car.status = true

    api.put(`carros/${car.id}`, car)
      .then(() => {
        alert('Carro reativado com sucesso')
        handleTest(car)
      })
      .catch(error => {
        alert('Erro')
        console.log('reativando => ', error)
      })
  }

  return (
    <ItemComplete
      paddingContent={5}
      title={
        <span>{car.name}</span>
      }
      inactive
    >
      <div className={styles.formContent}>
        <div>
          <span>Placa:&nbsp;</span> {car.plate}
        </div>
        <div>
          <span>Renavam:&nbsp;</span> {car.renavam}
        </div>
        <div>
          <ButtonReactivate onClick={reactivateCar} />
        </div>
      </div>
    </ItemComplete>
  )
}

type AddCarProps = {
  handleIsAdding: () => void
  handleCar: (car: Car) => void
}

export function AddCar({ handleIsAdding, handleCar }: AddCarProps) {

  function insertCar() {
    const name = getElementValue('name', 'uppercase')
    const plate = getElementValue('plate', 'uppercase')
    const renavam = getElementValue('renavam', 'uppercase')
    const car: Car = {
      id: 0,
      name: name,
      plate: plate,
      renavam: renavam,
      status: true,
    }

    api.post('carros', car)
      .then(response => {
        alert('Carro adicionado com sucesso')
        handleCar(response.data)
        handleIsAdding()
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
  }

  return (
    <ItemComplete
      paddingContent={5}
      title={
        <TextFieldGray
          id='name'
          placeholder='Novo Carro'
          className={styles.title}
        />
      }
    >
      <div className={styles.formContent}>
        <div className={styles.item}>
          <span>Placa:&nbsp;</span>
          <TextFieldGray
            id='plate'
            className={styles.inputCar}
          />
        </div>
        <div className={styles.item}>
          <span>Renavam:&nbsp;</span>
          <TextFieldGray
            id='renavam'
            className={styles.inputCar}
          />
        </div>
        <div>
          <ButtonAccept onClick={insertCar} />
          <ButtonDiscard onClick={handleIsAdding} />
        </div>
      </div>
    </ItemComplete>
  )
}
