import { AddButton, DeleteButton, UpdateButton } from 'components/CustomComponents'
import { CompleteItem } from 'components/Item'
import Modal from 'components/Modal'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalCar({ showModal, setShowModal }: Props) {
  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Carros'}
    >
      <div className={styles.modalContent}>
        <CompleteItem paddingContent={5}>
          <div className={styles.formContent}>
            <span>
              <strong>Placa:&nbsp;</strong> AAA1234
            </span>
            <span>
              <strong>Renavam:&nbsp;</strong> 20278104031
            </span>
            <div>
              <UpdateButton />
              <DeleteButton />
            </div>
          </div>
        </CompleteItem>
      </div>
      <AddButton />
    </Modal>
  )
}
