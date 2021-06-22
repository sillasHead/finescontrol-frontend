import { Button, ButtonBase, ButtonBaseProps, ButtonProps, Radio, RadioProps, TextField, withStyles } from '@material-ui/core'
import { ReactNode } from 'react'
import styles from './styles.module.scss'

export const ButtonAdd = withStyles(({
  root: {
    backgroundColor: 'var(--blue-600)',
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    },
    borderRadius: 'var(--default-border-radius)',
    padding: 10,
  },
}))((props: ButtonProps) =>
  <Button variant={"contained"} {...props}>
    <img src="/add.svg" alt="Adicionar" />
  </Button>)

export const ButtonUpdate = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/update.svg" alt="Atualizar" />
  </ButtonBase>)

export const ButtonDelete = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/delete.svg" alt="Inativar" />
  </ButtonBase>)

export const ButtonAccept = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/accept.svg" alt="Atualizar" />
  </ButtonBase>)

export const ButtonDiscard = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/discard.svg" alt="Descartar" />
  </ButtonBase>)

export const ButtonReactivate = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/reactivate.svg" alt="Reativar" />
  </ButtonBase>)

export const ButtonText = withStyles(({
  root: {
    padding: 10,
    borderRadius: 'var(--default-border-radius)',
    fontSize: 'var(--p)',
    whiteSpace: 'nowrap',
  },
}))(ButtonBase)

export const ButtonNewFine = withStyles(({
  root: {
    position: 'fixed',
    width: '75px',
    height: '75px',

    backgroundColor: 'var(--blue-600)',
    boxShadow: 'var(--box-shadow)',
    borderRadius: '50%',

    top: '82%',
    left: '90%',
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    },
  },
}
))((props: ButtonProps) =>
  <Button {...props}>
    <img src="/add.svg" alt="Adicionar" />
  </Button>)

export const ButtonBlue = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--blue-600)',
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    },
  },
}))(Button)

export const ButtonOrange = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--orange-300)',
    '&:hover': {
      backgroundColor: 'var(--orange-400)',
    },
  },
}))(Button)

export const ButtonGray = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--gray-800)',
    '&:hover': {
      backgroundColor: 'var(--gray-900)',
    },
  },
}))(Button)

export const TextFieldBlue = withStyles({
  root: {
    width: '100%',
    '& label.Mui-focused': {
      color: 'var(--blue-600)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--blue-600)',
    },
  },
})(TextField)

export const TextFieldGray = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'var(--gray-800)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--gray-800)',
    },
  },
})(TextField)

export const CssRadio = withStyles({
  root: {
    color: 'var(--gray-400)',
    '&$checked': {
      color: 'var(--blue-600)',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

type LineSeparatorProps = {
  children: ReactNode
}
export function LineSeparator({ children }: LineSeparatorProps) {
  return (
    <div className={styles.lineSeparator}>
      <div className={styles.line} />
        {children}
      <div className={styles.line} />
    </div>
  )
}