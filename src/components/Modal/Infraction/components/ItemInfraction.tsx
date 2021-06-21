import { ButtonAccept, ButtonDiscard, ButtonUpdate, TextFieldBlue } from 'components/CustomComponents'
import { Item } from 'components/Item'
import { useState } from 'react'
import { api } from 'utils/api'
import { getElementValue, getElementValueParsedNumber } from 'utils/functions'
import { Infraction } from 'utils/types'
import styles from './ItemInfraction.module.scss'

type Props = {
  infraction: Infraction
  handleInfraction: (infraction: Infraction) => void
}

export function ItemActiveInfraction({ infraction, handleInfraction }: Props) {

  const [isEditing, setIsEditing] = useState(false)

  function handleIsEditing() {
    setTimeout(() => { // TODO melhorar a finalizacao da animacao ao clicar no botao antes de editar
      setIsEditing(!isEditing)
    }, 250)
  }

  function acceptEdit() {
    infraction.description = getElementValue('description')
    infraction.type = getElementValue('type')
    infraction.rating = getElementValueParsedNumber('rating')
    infraction.amount = getElementValueParsedNumber('amount')
    // TODO validar se houve alguma alteracao antes de efetuar o put
    api.put(`infracoes/${infraction.id}`, infraction)
      .then(() => {
        alert('Infração atualizada com sucesso!')
        handleIsEditing()
        handleInfraction(infraction)
      })
      .catch(error => {
        alert('Erro')
        console.log('editando => ', error)
      })
  }

  // function inactivateInfraction() {
  //   infraction.status = false

  //   api.put(`infracoes/${infraction.id}`, infraction)
  //     .then(() => {
  //       alert('Infração inativada com sucesso')
  //       handleInfraction(infraction)
  //     })
  //     .catch(error => {
  //       alert('Erro')
  //       console.log('inativando => ', error)
  //     })
  // }

  return (
    <Item flexDirection='row' alignItems='center' key={infraction.id}>
      {!isEditing ? (
        <div className={styles.itemContent}>
          <div className={styles.description}>
            <span>Descrição:&nbsp;</span>{infraction.description}
          </div>
          <div className={styles.more}>
            <div className={styles.type}>
              <span>Tipo:&nbsp;</span>{infraction.type}
            </div>
            <div className={styles.rating}>
              <span>Pontuação:&nbsp;</span>{infraction.rating}
            </div>
            <div className={styles.amount}>
              <span>Valor:&nbsp;</span>{infraction.amount}
            </div>
          </div>
        </div>
      ) : (
        <div className={styles.itemContent}>
          <div className={styles.description}>
            <span>Descrição:&nbsp;</span>
            <TextFieldBlue
              id='description'
              defaultValue={infraction.description}
            />
          </div>
          <div className={styles.more}>
            <div className={styles.type}>
              <span>Tipo:&nbsp;</span>
              <TextFieldBlue
                id='type'
                defaultValue={infraction.type}
              />
            </div>
            <div className={styles.rating}>
              <span>Pontuação:&nbsp;</span>
              <TextFieldBlue
                id='rating'
                defaultValue={infraction.rating}
              />
            </div>
            <div className={styles.amount}>
              <span>Valor:&nbsp;</span>
              <TextFieldBlue
                id='amount'
                defaultValue={infraction.amount}
              />
            </div>
          </div>
        </div>
      )}
      {!isEditing ? (
        <div className={styles.buttons}>
          <ButtonUpdate onClick={handleIsEditing} />
          {/* <ButtonDelete /> */}
        </div>
      ) : (
        <div>
          <ButtonAccept onClick={acceptEdit} />
          <ButtonDiscard onClick={handleIsEditing} />
        </div>
      )}
    </Item>
  )
}

// export function ItemInactiveInfraction({ infraction, handleInfraction: handleTest }: Props) {

//   function reactivateInfraction() {
//     infraction.status = true

//     api.put(`infracoes/${infraction.id}`, infraction)
//       .then(() => {
//         alert('Infração reativada com sucesso')
//         handleTest(infraction)
//       })
//       .catch(error => {
//         alert('Erro')
//         console.log('reativando => ', error)
//       })
//   }

//   return (
//     <Item flexDirection='row' alignItems='center' key={infraction.id} inactive>
//       <>
//         <span>{infraction.name}</span>
//         <div>
//           <ButtonReactivate onClick={reactivateInfraction} />
//         </div>
//       </>
//     </Item>
//   )
// }

type AddInfractionProps = {
  handleIsAdding: () => void
  handleInfraction: (infraction: Infraction) => void
}

export function AddInfraction({ handleIsAdding, handleInfraction }: AddInfractionProps) {

  function insertInfraction() {
    const description = getElementValue('description')
    const type = getElementValue('type')
    const rating = getElementValueParsedNumber('rating')
    const amount = getElementValueParsedNumber('amount')
    const infraction: Infraction = {
      id: 0,
      description: description,
      type: type,
      rating: rating,
      amount: amount,
    }

    api.post('infracoes', infraction)
      .then(response => {
        alert('Infração adicionada com sucesso')
        handleInfraction(response.data)
        handleIsAdding()
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
  }

  return (
    <Item flexDirection='row' alignItems='center'>
      <div className={styles.itemContent}>
        <div className={styles.description}>
          <span>Descrição:&nbsp;</span>
          <TextFieldBlue id='description' />
        </div>
        <div className={styles.more}>
          <div className={styles.type}>
            <span>Tipo:&nbsp;</span>
            <TextFieldBlue id='type' />
          </div>
          <div className={styles.rating}>
            <span>Pontuação:&nbsp;</span>
            <TextFieldBlue id='rating' />
          </div>
          <div className={styles.amount}>
            <span>Valor:&nbsp;</span>
            <TextFieldBlue id='amount' />
          </div>
        </div>
      </div>
      <div>
        <ButtonAccept onClick={insertInfraction} />
        <ButtonDiscard onClick={handleIsAdding} />
      </div>
    </Item>
  )
}
