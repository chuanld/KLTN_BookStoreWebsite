import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import React, { useEffect } from 'react'

import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import dayjs from 'dayjs'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import DateTimePickerField from 'components/form-controls/DateTimePickerField'

function FormDate({
  from,
  to,
  onSubmit,
  loading,
  distanceType,
  options,
  onSubmitChange,

  params,
}) {
  const schema = yup.object().shape({
    analyStart: yup.date().required('Please enter expire date'),
    analyEnd: yup.date(),
  })
  console.log(options, 'options')
  const form = useForm({
    defaultValues: {
      analyStart: params['price[gte]'] || '',
      analyEnd: params['price[lte]'] || '',
    },
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    from &&
      to &&
      form.reset({
        analyStart: params['price[gte]'] || '',
        analyEnd: params['price[lte]'] || '',
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
        <div className="form-date-item">
          <DateTimePickerField
            name="analyStart"
            label="From Date"
            form={form}
            className={'input-info-update'}
            height={'55px'}
            width="220px"
          />
        </div>
        <div className="form-date-item">
          <DateTimePickerField
            name="analyEnd"
            label="To Date"
            form={form}
            className={'input-info-update'}
            height={'55px'}
            width="220px"
          />
        </div>
        <div className="form-date-item">
          <div className="btn-submit">
            <button type="submit">Check</button>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FormDate
