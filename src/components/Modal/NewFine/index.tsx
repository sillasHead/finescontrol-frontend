import { FormControlLabel, InputAdornment, RadioGroup } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ButtonBlue, ButtonGray, ButtonOrange, CssRadio, TextFieldBlue } from 'components/CustomComponents'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { api, getCars, getDrivers, getInfractions } from 'utils/api'
import { getElementValue, today } from 'utils/functions'
import { Car, Driver, Fine, Infraction } from 'utils/types'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
  setFineAdded: (fine: Fine) => void
}

type FormValues = {
  id: number
  aitCode: string
  moment: Date
  dueDate: Date
  paymentDate: Date
  identifiedDriver: boolean
  amount: number
  driver: {
    id: number
    name: string
    status: boolean
  } // nao posso definir como 'Driver' por conta do erro do typescript
    // 'Type of property circularly references itself in mapped type ts(2615)'
  car: Car
  infraction: Infraction
}

export default function ModalNewFine({ showModal, setShowModal, setFineAdded }: Props) {
  const { register, /* handleSubmit, */ getValues, setValue/* , reset */ } = useForm<FormValues>()
  const [cars, setCars] = useState<Car[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [infractions, setInfractions] = useState<Infraction[]>([])

  useEffect(() => {
    getCars(setCars)
    getDrivers(setDrivers)
    getInfractions(setInfractions)
  }, [showModal])

  function insertFine() {
      api.post('multas', getValues())
        .then(response => {
          alert('Multa adicionada com sucesso')
          setFineAdded(response.data)
        })
        .catch(error => {
          alert('erro')
          console.log('api.post => ', error)
        })
  }

  function handleInfractionChange(infraction: Infraction) {
    setValue('infraction', infraction)
    setValue('amount', infraction.amount)
  }

  function test() {
    console.log(getValues())
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Nova Multa'}
    >
      <form className={styles.modalContent}>
        <div className={styles.line}>
          <Autocomplete
            {...register('infraction')}
            options={infractions}
            getOptionLabel={(infraction) => infraction.description}
            style={{ width: '80%' }}
            renderInput={(params) => <TextFieldBlue {...params} label='Infração' variant='standard' />}
            getOptionSelected={(option, infraction) => option === infraction}
            onChange={(e, infraction) => infraction && handleInfractionChange(infraction)}
          />
          <TextFieldBlue
            {...register('amount')}
            label='Valor'
            style={{ width: 125 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>, 
              id: 'amount'
              // readOnly: true
            }}
          />
        </div>
        <div className={styles.line}>
          <TextFieldBlue
            {...register('aitCode')}
            label='AIT'
            style={{ width: 300 }}
          />
          <TextFieldBlue
            {...register('moment')}
            style={{ width: 190 }}
            label='Momento da infração'
            type='datetime-local'
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <Autocomplete
            options={drivers}
            getOptionLabel={(driver) => driver.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextFieldBlue {...params} label='Motorista' variant='standard' />}
            getOptionSelected={(option, driver) => option === driver}
            onChange={(e, driver) => driver && setValue('driver', driver)}
          />
          <Autocomplete
            options={cars}
            getOptionLabel={(car) => car.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextFieldBlue {...params} label='Carro' variant='standard' />}
            getOptionSelected={(option, car) => option === car}
            onChange={(e, car) => car && setValue('car', car)}
          />
        </div>

        <div className={styles.line}>
          <div className={styles.column}>
            <span>
              <strong>Indicação da Habilitação</strong>
            </span>
            <RadioGroup
              {...register('car')}
              row
              aria-label='position'
              name='position'
              defaultValue='top'
            >
              <FormControlLabel value='true' control={<CssRadio color='default' />} label='Indicado' />
              <FormControlLabel value='false' control={<CssRadio color='default' />} label='Não Indicado' />
            </RadioGroup>
          </div>
          <TextFieldBlue
            {...register('dueDate')}
            label='Prazo'
            type='date'
            style={{ width: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextFieldBlue
            {...register('paymentDate')}
            label='Pagamento'
            type='date'
            style={{ width: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </div>
        <div className={styles.line}>
          <ButtonOrange variant={'contained'} onClick={test}>
            Gerar aviso de multa
          </ButtonOrange>
          <div className={styles.cancelOrSave}>
            <ButtonGray variant={'contained'} onClick={() => setShowModal(false)}>
              Cancelar
            </ButtonGray>
            <ButtonBlue variant={'contained'} /* onClick={insertFine} */>
              Salvar
            </ButtonBlue>
          </div>
        </div>
      </form>
    </Modal>
  )
}
