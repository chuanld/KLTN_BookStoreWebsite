import React from 'react'
// import TextField from '@mui/material/TextField';
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'

function DateTimePickerField(props) {
  const {
    form,
    name,
    label,
    disable,

    type,
    value,
    className,
    height,
    width,
    variant,
  } = props

  if (!form)
    return (
      <div className='input-fieldd'>
        <label>{label}</label>
        <input disabled={true} value={value} type={type} />
      </div>
    )

  return (
    <>
      <Controller
        name={name}
        control={form.control}
        label={label}
        disabled={disable}
        // placeholder={placeholder}
        render={({
          field: { onChange, onBlur, value, name },
          fieldState: { invalid, error },
        }) => (
          // <TextField
          //   color={'success'}
          //   InputProps={{ className }}
          //   name={name}
          //   label={label}
          //   type={type ? type : 'text'}
          //   placeholder={placeholder}
          //   onBlur={onBlur}
          //   onChange={onChange}
          //   value={value}
          //   disabled={disable}
          //   error={invalid}
          //   helperText={error?.message}
          //   sx={{ height: height, width: width }}
          //   margin='dense'
          //   variant={variant}
          // />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              renderInput={(params) => (
                <TextField
                  {...params}
                  color={'success'}
                  sx={{ height: height, width: width }}
                  margin='dense'
                  variant={variant}
                  error={invalid}
                  helperText={error?.message}
                />
              )}
              InputProps={{ className }}
              name={name}
              label={label}
              onBlur={onBlur}
              onChange={onChange}
              value={value}
              // value={value}
              //   onChange={(newValue) => {
              //     setValue(newValue);
              //   }}
              disabled={disable}
              error={invalid}
              helperText={error?.message}
              sx={{ height: height, width: width }}
            />
          </LocalizationProvider>
        )}
      />
    </>
  )
}

export default DateTimePickerField
