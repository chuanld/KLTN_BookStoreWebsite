import React from 'react'
import { Controller } from 'react-hook-form'
import TextareaAutosize from '@mui/material/TextareaAutosize'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'

function TextAreaField(props) {
  const {
    form,
    name,
    label,
    disable,
    placeholder,
    type,
    value,
    className,
    height,
    width,
    variant,
    minRows,
  } = props
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
        <FormControl sx={{ m: 0, minWidth: 120 }} error>
          <TextareaAutosize
            color={'success'}
            name={name}
            label={label}
            type={type ? type : 'text'}
            placeholder={placeholder}
            onBlur={onBlur}
            onChange={onChange}
            value={value}
            disabled={disable}
            style={{ height: height, width: width }}
            margin='dense'
            variant={variant}
            minRows={minRows || 3}
          />
          {invalid ? <FormHelperText>{error?.message}</FormHelperText> : null}
        </FormControl>
      )}
    />
  )
}

export default TextAreaField
