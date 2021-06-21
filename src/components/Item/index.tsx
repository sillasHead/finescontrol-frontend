import styles from './styles.module.scss'

type CompleteItemProps = {
  children: React.ReactNode
  paddingContent?: number
  title: React.ReactNode
  inactive?: boolean
}

export function ItemComplete({ children, paddingContent, title, inactive }: CompleteItemProps) {
  return (
    <div className={`${styles.itemContainer} ${inactive ? styles.inactive : ''}`}>
      <div className={`${styles.itemHeader} ${inactive ? styles.inactive : ''}`}>
        {title}
      </div>
      <div
        className={`${styles.itemContent} ${inactive ? styles.inactive : ''}`}
        style={{
          padding: paddingContent
        }}
      >
        {children}
      </div>
    </div>
  )
}

export function ItemFine() {
  return (
    <div className={styles.item}>
      <div className={styles.line}>
        <span className={styles.w75}>
          <strong>Descrição:&nbsp;</strong>Usar qualquer veículo para, deliberadamente, interromper a circulação na via sem autorização do órgão
        </span>

        <span className={styles.w25}>
          <strong>Data | Hora:&nbsp;</strong>01/01/2021 | 13:00
        </span>
      </div>

      <div className={styles.line}>
        <span className={styles.w25}>
          <strong>Motorista:&nbsp;</strong>Claudio
        </span>

        <span className={styles.w25}>
          <strong>Carro:&nbsp;</strong>Mercedes Preta
        </span>

        <span className={styles.w25}>
          <strong>Placa:&nbsp;</strong>DPA8883
        </span>

        <span className={styles.w25}>
          <strong>Prazo para indicação:&nbsp;</strong>01/01/2021
        </span>
      </div>

      <div className={styles.line}>
        <span className={styles.w25}>
          <strong>AIT:&nbsp;</strong>QXA53152130
        </span>

        <span className={styles.w25}>
          <strong>Pontuação:&nbsp;</strong>7
        </span>

        <span className={styles.w25}>
          <strong>Valor:&nbsp;</strong>R$ 130,00
        </span>

        <span className={styles.w25}>
          <strong>Situação:&nbsp;</strong>indicado
        </span>
      </div>
    </div>
  )
}

type MenuItemProps = {
  selected: boolean
  title: string
  setShowModal?: (state: boolean) => void
}

export function ItemMenu({ selected, title, setShowModal }: MenuItemProps) {
  return (
    <>
      <div className={`${styles.menuItem} ${selected ? styles.selected : ''}`} onClick={setShowModal ? () => setShowModal(true) : () => Function}>
        <p>{title}</p>
      </div>
      {/* <div className={styles.lineSeparator} /> //TODO */}
    </>
  )
}

type ItemProps = {
  children: React.ReactNode
  flexDirection?: 'column' | 'row'
  alignItems?: 'center'
  inactive?: boolean
}

export function Item({ children, flexDirection, alignItems, inactive }: ItemProps) {
  return (
    <div
      className={`${styles.item} ${inactive ? styles.inactive : ''}`}
      style={{
        flexDirection: flexDirection,
        alignItems: alignItems
      }}
    >
      {children}
    </div>
  )
}
