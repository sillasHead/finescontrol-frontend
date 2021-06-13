import { FormControlLabel, Radio, RadioGroup, RadioProps, TextField } from '@material-ui/core'
import { Theme, withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Modal from 'components/Modal'
import { useState } from 'react'
import { today } from 'utils/functions'
import styles from './styles.module.scss'
import { BlueButton, CssRadio, CssTextField, GrayButton, OrangeButton } from 'components/PersonalizedComponents'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
}

export default function ModalNewFine({ showModal, setShowModal }: Props) {
  const [selectedDate, setSelectedDate] = useState<string | null>(today())
  const [amount, setAmount] = useState('0,00')

  function handleDateChange(newDateString: string) {
    setSelectedDate(newDateString)
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Nova Multa'}
    >
      <div /* action='' method='post' */ className={styles.modalContent}>
        <div className={styles.line}>
          <CssTextField label="Descrição" style={{ width: '80%' }} />
          <CssTextField label="Valor" value={amount} onKeyUp={() => Function} style={{ width: '15%' }} />
        </div>
        <div className={styles.line}>
          <CssTextField label="AIT" style={{ width: 300 }} />
          <CssTextField
            style={{ width: 190 }}
            label="Momento da infração"
            type="datetime-local"
            defaultValue={selectedDate}
            color={"secondary"}
            onChange={e => handleDateChange(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <CssTextField label="Motorista" style={{ width: 300 }} />
          <CssTextField label="Carro" style={{ width: 300 }} />
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
          <CssTextField
            label="Prazo"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <CssTextField
            label="Pagamento"
            type="date"
            defaultValue="2017-05-24"
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <OrangeButton variant={'contained'}>
            Gerar aviso de multa
          </OrangeButton>
          <div className={styles.cancelOrSave}>
            <GrayButton variant={'contained'} onClick={() => setShowModal(false)}>
              Cancelar
            </GrayButton>
            <BlueButton variant={'contained'}>
              Salvar
            </BlueButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
