import { FormControlLabel, InputAdornment, RadioGroup } from '@material-ui/core'
import { Autocomplete } from '@material-ui/lab'
import { ButtonBlue, ButtonGray, ButtonOrange, CssRadio, TextFieldBlue } from 'components/CustomComponents'
import Modal from 'components/Modal'
import { useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { api } from 'utils/api'
import { formatDate } from 'utils/functions'
import { Car, Driver, Fine, Infraction } from 'utils/types'
import styles from './styles.module.scss'

type Props = {
  showModal: boolean
  setShowModal: (state: boolean) => void
  setFineAdded: (fine: Fine) => void
  driverEdit?: Driver
  fineEdit?: Fine
}

type FormValues = {
  id?: number
  aitCode: string
  moment: string | Date
  dueDate: string | Date
  paymentDate: string | Date
  identifiedDriver: string | boolean
  amount: number
  driver: {
    id: number
    name: string
    status?: boolean
  } // nao posso definir como 'Driver' por conta do erro do typescript
  // 'Type of property circularly references itself in mapped type ts(2615)'
  car: Car
  infraction: Infraction

  // drivers: {
  //   id: number
  //   name: string
  //   status: boolean
  // }[]
  // cars: Car[]
  // infractions: Infraction[]
}

export default function ModalNewFine({ showModal, setShowModal, setFineAdded, driverEdit, fineEdit }: Props) {
  const { control, register, handleSubmit, getValues, setValue } = useForm<FormValues>()
  const [cars, setCars] = useState<Car[]>([])
  const [drivers, setDrivers] = useState<Driver[]>([])
  const [infractions, setInfractions] = useState<Infraction[]>([])

  useEffect(() => {
    api.get('carros')
      .then(response => {
        // setValue('cars', response.data)
        setCars(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.get(carros) => ', error)
      })

    api.get('motoristas')
      .then(response => {
        // setValue('drivers', response.data)
        setDrivers(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.get(motoristas) => ', error)
      })

    api.get('infracoes')
      .then(response => {
        // setValue('infractions', response.data)
        setInfractions(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.get(infracoes) => ', error)
      })

    if (fineEdit) {
      setValue('id', fineEdit.id)
      setValue('aitCode', fineEdit.aitCode)
      setValue('moment', formatDate(fineEdit.moment, 'datetime'))
      setValue('dueDate', formatDate(fineEdit.dueDate, 'date'))
      setValue('paymentDate', formatDate(fineEdit.paymentDate, 'date'))
      setValue('identifiedDriver', fineEdit.identifiedDriver ? 'y' : 'n')
      setValue('amount', fineEdit.amount)
      setValue('car', fineEdit.car)
      setValue('infraction', fineEdit.infraction)
      driverEdit && setValue('driver', driverEdit)
    }
  }, [driverEdit, fineEdit, setValue])

  function insertFine() {
    const fine = getValues()
    fine.moment = new Date(getValues('moment'))
    fine.dueDate = new Date(getValues('dueDate'))
    fine.paymentDate = new Date(getValues('paymentDate'))
    fine.identifiedDriver = (fine.identifiedDriver === 'y') ? true : false
    api.post('multas', fine)
      .then(response => {
        alert('Multa adicionada com sucesso')
        setFineAdded(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
  }

  function putFine() {
    const fine = getValues()
    fine.moment = new Date(getValues('moment'))
    fine.dueDate = new Date(getValues('dueDate'))
    fine.paymentDate = new Date(getValues('paymentDate'))
    fine.identifiedDriver = (fine.identifiedDriver === 'y') ? true : false
    api.put(`multas/${fine.id}`, fine)
      .then(response => {
        alert('Multa alterada com sucesso')
        setFineAdded(response.data)
      })
      .catch(error => {
        alert('erro')
        console.log('api.post => ', error)
      })
  }

  function onSubmit() {
    driverEdit && fineEdit 
      ? putFine() 
      : insertFine()
  }

  function handleInfractionChange(infraction: Infraction) {
    setValue('infraction', infraction)
    setValue('amount', infraction.amount)
  }

  function test() {
    // const fine: Fine = getValues()
    // fine.moment = new Date(getValues('moment'))
    // fine.dueDate = new Date(getValues('dueDate'))
    // fine.paymentDate = new Date(getValues('paymentDate'))
    // console.log(fine)
    console.log(getValues())
  }

  return (
    <Modal
      showModal={showModal}
      setShowModal={setShowModal}
      title={'Nova Multa'}
    >
      <form onSubmit={handleSubmit(onSubmit)} className={styles.modalContent}>
        <div className={styles.line}>

          <Controller
            name='infraction'
            control={control}
            defaultValue={{
              id: 0,
              description: '',
              amount: 0,
              type: '',
              rating: 0,
            }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                options={infractions}
                getOptionLabel={(infraction) => infraction.description}
                groupBy={(infraction) => infraction.type}
                renderInput={(params) => <TextFieldBlue {...params} label='Infração' variant='standard' />}
                getOptionSelected={(option, infraction) => option.type === infraction.type}
                onChange={(_, infraction) => infraction && handleInfractionChange(infraction)}
                style={{ width: '80%' }}
                openOnFocus
                autoHighlight
              />
            )}
          />

          <Controller
            name='amount'
            control={control}
            defaultValue={0}
            render={({ field }) => (
              <TextFieldBlue
                {...field}
                label='Valor'
                type='number'
                InputProps={{
                  startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                  readOnly: true,
                }}
                style={{ width: 125 }}
              />
            )}
          />
        </div>
        <div className={styles.line}>
          <Controller
            name='aitCode'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextFieldBlue
                {...field}
                label='AIT'
                style={{ width: 300 }}
              />
            )}
          />
          <Controller
            name='moment'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextFieldBlue
                {...field}
                InputLabelProps={{ shrink: true }}
                label='Momento da infração'
                type='datetime-local'
                style={{ width: 190 }}
              />
            )}
          />
        </div>
        <div className={styles.line}>
          <Controller
            name='driver'
            control={control}
            defaultValue={{
              id: 0,
              name: '',
            }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={getValues('driver')}
                options={drivers}
                getOptionLabel={(driver) => driver.name}
                renderInput={(params) => <TextFieldBlue {...params} label='Motorista' variant='standard' />}
                getOptionSelected={(option, driver) => option.name === driver.name}
                getOptionDisabled={driver => !driver.status}
                onChange={(_, driver) => driver && setValue('driver', driver)}
                style={{ width: 300 }}
                openOnFocus
                autoHighlight
              />
            )}
          />
          <Controller
            name='car'
            control={control}
            defaultValue={{
              id: 0,
              name: '',
              plate: '',
              renavam: '',
            }}
            render={({ field }) => (
              <Autocomplete
                {...field}
                value={getValues('car')}
                options={cars}
                getOptionLabel={(car) => car.name}
                renderInput={(params) => <TextFieldBlue {...params} label='Carro' variant='standard' />}
                getOptionSelected={(option, car) => option.name === car.name}
                getOptionDisabled={car => !car.status}
                onChange={(_, car) => car && setValue('car', car)}
                style={{ width: 300 }}
                openOnFocus
                autoHighlight
              />
            )}
          />
        </div>

        <div className={styles.line}>
          <div className={styles.column}>
            <span>
              <strong>Indicação da Habilitação</strong>
            </span>
            <Controller
              name='identifiedDriver'
              control={control}
              defaultValue='y'
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  aria-label='position'
                  defaultValue='top'
                  row
                >
                  <FormControlLabel value='y' control={<CssRadio color='default' />} label='Indicado' />
                  <FormControlLabel value='n' control={<CssRadio color='default' />} label='Não Indicado' />
                </RadioGroup>
              )}
            />
          </div>
          <Controller
            name='dueDate'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextFieldBlue
                {...field}
                label='Prazo'
                type='date'
                InputLabelProps={{ shrink: true }}
                style={{ width: 150 }}
              />
            )}
          />
          <Controller
            name='paymentDate'
            control={control}
            defaultValue=''
            render={({ field }) => (
              <TextFieldBlue
                {...field}
                label='Pagamento'
                type='date'
                InputLabelProps={{ shrink: true }}
                style={{ width: 150 }}
              />
            )}
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
            <ButtonBlue variant={'contained'} type='submit' /* onClick={insertFine} */>
              Salvar
            </ButtonBlue>
          </div>
        </div>
      </form>
    </Modal>
  )
}
