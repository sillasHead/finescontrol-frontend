import { ButtonAdd } from 'components/Button'
import { CompleteItem } from 'components/Item'
import Modal from 'components/Modal'
import styles from './styles.module.scss'

export default function ModalCar() {
  return (
    <Modal>
      <div className={styles.modalContent}>
        <CompleteItem paddingContent={5}>
          <div className={styles.formContent}>
            <span>
              <strong>Placa:&nbsp;</strong> AAA1234
            </span>
            <span>
              <strong>Renavam:&nbsp;</strong> 20278104031
            </span>
            <div className={styles.buttons}>
              <img src="/update.svg" alt="Atualizar" />
              <img src="/delete.svg" alt="Excluir" />
            </div>
          </div>
        </CompleteItem>
      </div>
      <ButtonAdd />
    </Modal>
  )
}
