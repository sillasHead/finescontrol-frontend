import styles from './styles.module.scss'

type Props = {
  value: string
  color: 'primary' | 'secondary' | 'default'
}

export function Button({ value, color }: Props) {
  return (
    <button className={`${styles.button} ${styles[color]}`}>
      {value}
    </button>
  )
}

export function ButtonAdd() {
  return (
    <div className={`${styles.buttonAdd} ${styles.primary}`}>
    </div>
  )
}

export function ButtonAddFixed() {
  return (
    <div className={`${styles.buttonAddFixed} ${styles.primary}`}>
      {/* <img src="/add.svg" alt="Adicionar" /> */}
    </div>
  )
}
