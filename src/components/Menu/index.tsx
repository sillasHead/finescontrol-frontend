import Modal from 'components/Modal';
import FormInfraction from 'components/ModalsForms/Infraction';
import styles from './styles.module.scss';

type MenuProps = {
  children: React.ReactNode;
}

export function Menu({ children }: MenuProps) {
  return (
    <div className={styles.menuContainer}>
      {children}
    </div>
  );
}

type ItemProps = {
  selected: boolean;
};

export function ItemMenu({ selected }: ItemProps) {
  return (
    <>
      <div className={`${styles.menuItem} ${selected ? styles.selected : ''}`}>
        <p>Carros</p>
      </div>
      <div className={styles.lineSeparator} />
      <Modal>
        <FormInfraction />
      </Modal>
    </>
  );
}
