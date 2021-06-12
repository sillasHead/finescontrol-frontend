import { FormControlLabel, Radio, RadioGroup, RadioProps, TextField } from '@material-ui/core'
import { withStyles } from '@material-ui/core/styles'
import { Button } from 'components/Button'
import Modal from 'components/Modal'
import { useState } from 'react'
import { today } from 'utils/functions'
import styles from './styles.module.scss'

const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'var(--blue-600)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--blue-600)',
    },
  },
})(TextField)

const CssRadio = withStyles({
  root: {
    color: 'var(--gray-400)',
    '&$checked': {
      color: 'var(--blue-600)',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)


export default function ModalNewFine() {
  const [selectedDate, setSelectedDate] = useState<string | null>(today())
  const [amount, setAmount] = useState('0,00')

  function handleDateChange(newDateString: string) {
    setSelectedDate(newDateString)
  }

  return (
    <Modal>
      <div className={styles.modalContent}>
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
        <br />
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
        <br />
        <div className={styles.line}>
          <Button color={'secondary'} value={'Gerar aviso de multa'} />
          <div className={styles.cancelOrSave}>
            <Button color={'default'} value={'Cancelar'} />
            <Button color={'primary'} value={'Salvar'} />
          </div>
        </div>
      </div>
    </Modal>
  )
}
