import { Item } from 'components/Item';
import styles from './styles.module.scss'

export default function CompleteFine() {
  return (
    <div className="">
      <Item flexDirection='column'>
        <>
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
              <strong>Prazo para indicação do condutor:&nbsp;</strong>01/01/2021
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
        </>
      </Item>
    </div>
  );
}
