import { ButtonAddFixed } from 'components/Button';
import styles from './styles.module.scss';

type Props = {
  children: React.ReactNode;
}

export default function Background({ children }: Props) {
  return (
    <div className={styles.backgroundContainer}>
      {children}
      <ButtonAddFixed />
    </div>
  );
}
