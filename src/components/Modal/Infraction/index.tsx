import { AddButton, DeleteButton, UpdateButton } from 'components/PersonalizedComponents'
import { Item } from 'components/Item'
import Modal from 'components/Modal'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalInfraction({ showModal, setShowModal }: Props) {
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Infrações'}
    >
      <div className={styles.modalContent}>
        <Item flexDirection='row' alignItems='center'>
          <div className={styles.itemContent}>
            <span>
              <strong>Descrição:&nbsp;</strong>Fazer ou deixar que se faça reparo em veículosnas vias (quando não rodovia/transito rápido)
            </span>
            <div className={styles.more}>
              <span>
                <strong>Tipo:&nbsp;</strong>Grave
              </span>
              <span>
                <strong>Pontuação:&nbsp;</strong>7
              </span>
              <span>
                <strong>Valor:&nbsp;</strong>R$ 300.00
              </span>
            </div>
          </div>
          <div className={styles.buttons}>
              <UpdateButton />
              <DeleteButton />
          </div>
        </Item>
      </div>
      <AddButton />
    </Modal>
  )
}
