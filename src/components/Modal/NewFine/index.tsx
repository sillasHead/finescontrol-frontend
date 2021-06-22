import { FormControlLabel, InputAdornment, RadioGroup } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ButtonBlue, ButtonGray, ButtonOrange, CssRadio, TextFieldBlue } from 'components/CustomComponents'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'
import { api, getCars, getDrivers, getInfractions } from 'utils/api'
import { getElementValue, today } from 'utils/functions'
import { Car, Driver, Fine, Infraction } from 'utils/types'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
  setFineAdded: (fine: Fine) => void
}

export default function ModalNewFine({ showModal, setShowModal, setFineAdded }: Props) {
  const [infractionMoment, setInfractionMoment] = useState<string>(today('datetime'))
  const [dueDate, setDueDate] = useState<string>(today('date'))
  const [paymentDate, setPaymentDate] = useState<string>(today('date'))
  const [amount, setAmount] = useState(0)
  const [identifiedDriver, setIdentifiedDriver] = useState<boolean>()
  const [cars, setCars] = useState<Car[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [infractions, setInfractions] = useState<Infraction[]>([])
  const [car, setCar] = useState<Car>()
  const [driver, setDriver] = useState<Driver>()
  const [infraction, setInfraction] = useState<Infraction>()

  useEffect(() => {
    getCars(setCars)
    getDrivers(setDrivers)
    getInfractions(setInfractions)
  }, [showModal])

  function handleInfraction(selectedInfraction: Infraction) {
    setInfraction(selectedInfraction)
    setAmount(selectedInfraction.amount)
  }

  function handleDriver(selectedDriver: Driver) {
    setDriver(selectedDriver)
  }

  function handleCar(selectedCar: Car) {
    setCar(selectedCar)
  }

  function handleMomentChange(newDateTimeString: string) {
    setInfractionMoment(newDateTimeString)
  }

  function handleDueDateChange(newDateString: string) {
    setDueDate(newDateString)
  }

  function handlePaymentDateChange(newDateString: string) {
    setPaymentDate(newDateString)
  }

  function handleRadio(select: string) {
    select === 'true' ? 
    setIdentifiedDriver(true) :
    setIdentifiedDriver(false)
  }

  function insertFine() {
    car && driver && infraction && identifiedDriver && 
    api.post('multas', {
      id: 0,
      aitCode: getElementValue('aitCode', 'uppercase'),
      amount: amount,
      car: car,
      driver: driver,
      identifiedDriver: identifiedDriver,
      infraction: infraction,
      dueDate: new Date(dueDate),
      moment: new Date(infractionMoment),
      paymentDate: new Date(paymentDate),
    } as Fine)
      .then(response => {
        alert('Multa adicionada com sucesso')
        setFineAdded(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
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
            options={infractions}
            getOptionLabel={(infraction) => infraction.description}
            style={{ width: '80%' }}
            renderInput={(params) => <TextFieldBlue {...params} label='Infração' variant='standard' />}
            onChange={(e, infraction) => infraction && handleInfraction(infraction)}
            clearText={'true'}
          />
          <TextFieldBlue
            label='Valor'
            value={amount}
            onKeyUp={() => Function}
            style={{ width: 125 }}
            InputProps={{
              startAdornment: <InputAdornment position="start">R$</InputAdornment>
            }}
          />
        </div>
        <div className={styles.line}>
          <TextFieldBlue id='aitCode' label='AIT' style={{ width: 300 }} />
          <TextFieldBlue
            style={{ width: 190 }}
            label='Momento da infração'
            type='datetime-local'
            defaultValue={infractionMoment}
            onChange={e => handleMomentChange(e.target.value)}
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
            onChange={(e, driver) => driver && handleDriver(driver)}
          />
          <Autocomplete
            options={cars}
            getOptionLabel={(car) => car.name}
            style={{ width: 300 }}
            renderInput={(params) => <TextFieldBlue {...params} label='Carro' variant='standard' />}
            onChange={(e, car) => car && handleCar(car)}
          />
        </div>

        <div className={styles.line}>
          <div className={styles.column}>
            <span>
              <strong>Indicação da Habilitação</strong>
            </span>
            <RadioGroup
              row
              aria-label='position'
              name='position'
              defaultValue='top'
              onChange={(e, value) => handleRadio(e.target.value)}
            >
              <FormControlLabel value='true' control={<CssRadio color='default' />} label='Indicado' />
              <FormControlLabel value='false' control={<CssRadio color='default' />} label='Não Indicado' />
            </RadioGroup>
          </div>
          <TextFieldBlue
            label='Prazo'
            type='date'
            defaultValue={dueDate}
            onChange={e => handleDueDateChange(e.target.value)}
            style={{ width: 150 }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <TextFieldBlue
            label='Pagamento'
            type='date'
            defaultValue={paymentDate}
            onChange={e => handlePaymentDateChange(e.target.value)}
            style={{ width: 150 }}
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
            <ButtonBlue variant={'contained'} onClick={insertFine}>
              Salvar
            </ButtonBlue>
          </div>
        </div>
      </form>
    </Modal>
  )
}
