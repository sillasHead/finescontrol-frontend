import { Button, ButtonBase, ButtonBaseProps, ButtonProps, Radio, RadioProps, TextField, withStyles } from '@material-ui/core'

export const AddButton = withStyles(({
  root: {
    backgroundColor: 'var(--blue-600)',
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    },
    borderRadius: 10,
    padding: 10,
  },
}))((props: ButtonProps) =>
  <Button variant={"contained"} {...props}>
    <img src="/add.svg" alt="Adicionar" />
  </Button>)

export const UpdateButton = withStyles(({
  root: {
    padding: 10,
    borderRadius: 10,
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/update.svg" alt="Atualizar" />
  </ButtonBase>)

export const DeleteButton = withStyles(({
  root: {
    padding: 10,
    borderRadius: 10,
  },
}))((props: ButtonBaseProps) =>
  <ButtonBase {...props}>
    <img src="/delete.svg" alt="Atualizar" />
  </ButtonBase>)

export const NewFineButton = withStyles(({
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

export const BlueButton = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--blue-600)',
    '&:hover': {
      backgroundColor: 'var(--blue-700)',
    },
  },
}))(Button)

export const OrangeButton = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--orange-300)',
    '&:hover': {
      backgroundColor: 'var(--orange-400)',
    },
  },
}))(Button)

export const GrayButton = withStyles(({
  root: {
    color: 'var(--white)',
    backgroundColor: 'var(--gray-800)',
    '&:hover': {
      backgroundColor: 'var(--gray-900)',
    },
  },
}))(Button)

export const CssTextField = withStyles({
  root: {
    '& label.Mui-focused': {
      color: 'var(--blue-600)',
    },
    '& .MuiInput-underline:after': {
      borderBottomColor: 'var(--blue-600)',
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
