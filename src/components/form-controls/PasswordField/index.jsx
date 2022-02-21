import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function PasswordField(props) {
  const { form, name, label, disable, placeholder, className, height, width } =
    props

  return (
    <Controller
      name={name}
      control={form.control}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        <TextField
          className={className || ''}
          label={label}
          name={name}
          type='password'
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          disabled={disable}
          error={invalid}
          helperText={error?.message}
          style={{ height: height, width: width }}
          margin='dense'
        />
      )}
    />
  )
}

export default PasswordField
