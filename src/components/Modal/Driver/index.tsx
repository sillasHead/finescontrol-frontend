import { ButtonAdd } from 'components/Button'
import { Item } from 'components/Item'
import Modal from 'components/Modal'
import styles from './styles.module.scss'

export default function ModalDriver() {
  return (
    <Modal>
      <div className={styles.modalContent}>
        <Item flexDirection='row' alignItems='center'>
          <span>Cláudio Almeida Mascarenhas</span>
          <div className={styles.buttons}>
            <img src="/update.svg" alt="Atualizar" />
            <img src="/delete.svg" alt="Excluir" />
          </div>
        </Item>
      </div>
      <ButtonAdd />
    </Modal>
  )
}
