import { FormControlLabel, RadioGroup } from '@material-ui/core'
import Modal from 'components/Modal'
import { ButtonBlue, CssRadio, TextFieldBlue, ButtonGray, ButtonOrange } from 'components/CustomComponents'
import { useState } from 'react'
import { today } from 'utils/functions'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalNewFine({ showModal, setShowModal }: Props) {
  const [infractionMoment, setInfractionMoment] = useState<string | null>(today('datetime'))
  const [dueDate, setDueDate] = useState<string | null>(today('date'))
  const [paymentDate, setPaymentDate] = useState<string | null>(today('date'))
  const [amount, setAmount] = useState('0,00')

  function handleDateChange(newDateString: string) {
    setInfractionMoment(newDateString)
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Nova Multa'}
    >
      <div /* action='' method='post' */ className={styles.modalContent}>
        <div className={styles.line}>
          <TextFieldBlue label="Descrição" style={{ width: '80%' }} />
          <TextFieldBlue label="Valor" value={amount} onKeyUp={() => Function} style={{ width: '15%' }} />
        </div>
        <div className={styles.line}>
          <TextFieldBlue label="AIT" style={{ width: 300 }} />
          <TextFieldBlue
            style={{ width: 190 }}
            label="Momento da infração"
            type="datetime-local"
            defaultValue={infractionMoment}
            onChange={e => handleDateChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <TextFieldBlue label="Motorista" style={{ width: 300 }} />
          <TextFieldBlue label="Carro" style={{ width: 300 }} />
        </div>

        <div className={styles.line}>
          <div className={styles.column}>
            <span>
              <strong>Indicação da Habilitação</strong>
            </span>
            <RadioGroup row aria-label="position" name="position" defaultValue="top" >
              <FormControlLabel value="y" control={<CssRadio color="default" />} label="Indicado" />
              <FormControlLabel value="n" control={<CssRadio color="default" />} label="Não Indicado" />
            </RadioGroup>
          </div>
          <TextFieldBlue
            label="Prazo"
            type="date"
            defaultValue={dueDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextFieldBlue
            label="Pagamento"
            type="date"
            defaultValue={paymentDate}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <ButtonOrange variant={'contained'}>
            Gerar aviso de multa
          </ButtonOrange>
          <div className={styles.cancelOrSave}>
            <ButtonGray variant={'contained'} onClick={() => setShowModal(false)}>
              Cancelar
            </ButtonGray>
            <ButtonBlue variant={'contained'}>
              Salvar
            </ButtonBlue>
          </div>
        </div>
      </div>
    </Modal>
  )
}
