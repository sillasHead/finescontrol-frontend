import { MenuItem } from 'components/Item'
import styles from './styles.module.scss'

export function Menu() {
  return (
    <div className={styles.menuContainer}>
      <MenuItem selected={true} />
      <MenuItem selected={false} />
      <MenuItem selected={false} />
      <MenuItem selected={false} />
    </div>
  )
}
