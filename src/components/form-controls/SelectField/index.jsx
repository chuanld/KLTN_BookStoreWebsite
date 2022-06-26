import React from 'react'
import { Controller } from 'react-hook-form'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'

function SelectField(props) {
  const {
    form,
    name,
    label,
    options,
    disable,
    placeholder,
    defaulvalue,

    height,
    width,
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
        <>
          <FormControl sx={{ m: 0, width: 700, marginTop: 1 }}>
            <InputLabel id={label}>{label}</InputLabel>
            <Select
              color={'success'}
              name={name}
              labelId={label}
              label={label}
              // placeholder={placeholder}
              onBlur={onBlur}
              onChange={onChange}
              defaulvalue={defaulvalue}
              value={value}
              disabled={disable}
              style={{ height: height, width: width }}
            >
              {options.map((item) => (
                <MenuItem value={item._id} key={item._id}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </>
      )}
    />
  )
}

export default SelectField
