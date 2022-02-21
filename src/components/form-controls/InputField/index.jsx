import { TextField } from '@mui/material'
import React from 'react'
import { Controller } from 'react-hook-form'

function InputField(props) {
  const {
    form,
    name,
    label,
    disable,
    placeholder,
    type = 'text',
    value,
    className,
    height,
    width,
  } = props

  if (!form)
    return (
      <div className='input-fieldd'>
        <label>{label}</label>
        <input disabled={true} value={value} type={type} />
      </div>
    )

  return (
    <Controller
      name={name}
      control={form.control}
      label={label}
      disabled={disable}
      placeholder={placeholder}
      render={({
        field: { onChange, onBlur, value, name },
        fieldState: { invalid, error },
      }) => (
        // <div className={error ? 'input-field error' : 'input-field'}>
        //   <label>{label}</label>
        //   <input
        //     disabled={disable}
        //     value={value}
        //     onChange={onChange}
        //     onBlur={onBlur}
        //     placeholder={placeholder}
        //     type={type}
        //     name={name}
        //     className={className || ''}
        //   />
        //   {invalid && <span>{error?.message}</span>}
        // </div>
        <TextField
          className={className || ''}
          name={name}
          label={label}
          type={type}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={onChange}
          value={value}
          disabled={disable}
          error={invalid}
          helperText={error?.message}
          sx={{ height: height, width: width }}
          margin='dense'
        />
      )}
    />
  )
}

export default InputField
