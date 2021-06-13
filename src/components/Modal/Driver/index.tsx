import { Item } from 'components/Item'
import Modal from 'components/Modal'
import { AddButton, DeleteButton, UpdateButton } from 'components/PersonalizedComponents'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalDriver({ showModal, setShowModal }: Props) {
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Motoristas'}
    >
      <div className={styles.modalContent}>
        <Item flexDirection='row' alignItems='center'>
          <span>Cláudio Almeida Mascarenhas</span>
          <div>
              <UpdateButton />
              <DeleteButton />
          </div>
        </Item>
      </div>
      <AddButton />
    </Modal>
  )
}
