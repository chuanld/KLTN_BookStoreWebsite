import InputField from 'components/form-controls/InputField'
import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect, useState, useRef } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import DateTimePickerField from 'components/form-controls/DateTimePickerField'
import dayjs from 'dayjs'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

function FormDate({
  from,
  to,
  onSubmit,
  loading,
  distanceType,
  options,
  onSubmitChange,
}) {
  const schema = yup.object().shape({
    analyStart: yup.date().required('Please enter expire date'),
    analyEnd: yup.date(),
  })
  console.log(options, 'options')
  const form = useForm({
    defaultValues: {
      analyStart: from || '',
      analyEnd: to || dayjs().format('YYYY-MM-DD'),
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    from &&
      to &&
      form.reset({
        analyStart: from || '',
        analyEnd: to || dayjs().format('YYYY-MM-DD'),
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to])
  const handleSubmit = (values) => {
    if (!onSubmit) return
    // onSubmit({ ...values })

    const newValues = {
      analyStart: dayjs(values.analyStart).format('YYYY-MM-DD'),
      analyEnd: dayjs(values.analyEnd).format('YYYY-MM-DD'),
    }
    onSubmit(newValues)
  }

  const onChangeGroupBy = (e) => {
    if (options?.length === 0 || !distanceType) return
    console.log(e.target.value)
    onSubmitChange(e.target.value)
  }
  return (
    <form onSubmit={form.handleSubmit(handleSubmit)}>
      <div className="form-date-container">
        {options?.length > 0 && distanceType && (
          <div className="form-date-item">
            <FormControl sx={{ m: 0, width: 220, marginTop: 1 }}>
              <InputLabel id="type-distance">Group By</InputLabel>
              <Select
                color={'success'}
                name="typeDistance"
                labelId="type-distance"
                label="Group By"
                // placeholder={placeholder}

                onChange={onChangeGroupBy}
                value={distanceType}
                style={{ height: 55, width: 220, textTransform: 'uppercase' }}
              >
                {options.map((item, idx) => (
                  <MenuItem value={item} key={idx}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        )}
        <div className="form-date-item">
          <DateTimePickerField
            name="analyStart"
            label="From Date"
            form={form}
            className={'input-info-update'}
            height={'30px'}
            width="220px"
          />
        </div>
        <div className="form-date-item">
          <DateTimePickerField
            name="analyEnd"
            label="To Date"
            form={form}
            className={'input-info-update'}
            height={'30px'}
            width="220px"
          />
        </div>
        <div className="form-date-item">
          <div className="btn-submit">
            <button type="submit">Check</button>
          </div>
        </div>
        {loading && (
          <div className="form-date-item loading-data">
            <div className="loader-comment">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>
    </form>
  )
}

export default FormDate
