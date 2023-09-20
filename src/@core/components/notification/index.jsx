import { Close } from '@mui/icons-material'
import { Alert, AlertTitle, IconButton, Snackbar } from '@mui/material'
import clsx from 'clsx'
import { useState } from 'react'
import styles from './notification.module.scss'
import { useNotificationStore } from 'src/@core/store'

const alertClasses = {
  icon: styles.AlertIcon,
  action: styles.AlertAction,
  message: styles.AlertMessage
}

const AlertBase = (props) => {
  const { classes, children, ...rest } = props
  const [open, setOpen] = useState(true)

  const handleClose = (_, reason) => {
    if (reason === 'clickaway') return

    setOpen(false)
  }

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
      <Alert
        {...rest}
        variant='outlined'
        classes={{ ...alertClasses, ...classes }}
        action={
          <IconButton size='small' onClick={handleClose}>
            <Close />
          </IconButton>
        }>
        {children}
      </Alert>
    </Snackbar>
  )
}
export const SuccessNotification = (props) => {
  const { children, label, className, ...rest } = props

  return (
    <AlertBase
      {...rest}
      className={clsx(styles.AlertBase, styles.AlertSuccessRoot, styles.AlertBaseLabel, className)}
      severity='success'>
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>{label}</AlertTitle>
      {children}
    </AlertBase>
  )
}

export const InfoNotification = (props) => {
  const { children, label, className, ...rest } = props

  return (
    <AlertBase
      {...rest}
      className={clsx(styles.AlertBase, styles.AlertInfoRoot, styles.AlertBaseLabel, className)}
      severity='info'>
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>{label}</AlertTitle>
      {children}
    </AlertBase>
  )
}

export const WarningNotification = (props) => {
  const { children, label, className, ...rest } = props

  return (
    <AlertBase
      {...rest}
      className={clsx(styles.AlertBase, styles.AlertWarningRoot, styles.AlertBaseLabel, className)}
      severity='warning'>
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>{label}</AlertTitle>
      {children}
    </AlertBase>
  )
}

export const ErrorNotification = (props) => {
  const { children, label, className, ...rest } = props

  return (
    <AlertBase
      {...rest}
      className={clsx(styles.AlertBase, styles.AlertErrorRoot, styles.AlertBaseLabel, className)}
      severity='error'>
      <AlertTitle classes={{ root: styles.AlertContentLabel }}>{label}</AlertTitle>
      {children}
    </AlertBase>
  )
}

export const NotificationType = {
  INFO: 'info',
  ERROR: 'error',
  WARNING: 'warning',
  SUCCESS: 'success'
}

export const NotificationProvider = () => {
  const notification = useNotificationStore((store) => store.notification)

  if (notification) {
    const { description, label, type } = notification
    switch (type) {
      case NotificationType.INFO:
        return <InfoNotification label={label}>{description}</InfoNotification>
      case NotificationType.SUCCESS:
        return <SuccessNotification label={label}>{description}</SuccessNotification>
      case NotificationType.ERROR:
        const message = label || 'There is something wrong. Please try again later!'

        return <ErrorNotification label={message}>{description}</ErrorNotification>
      case NotificationType.WARNING:
        return <WarningNotification label={label}>{description}</WarningNotification>
      default:
        return <></>
    }
  }

  return <></>
}
