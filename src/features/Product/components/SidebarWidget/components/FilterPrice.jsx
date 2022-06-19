import React, { useEffect, useRef, useState } from 'react'
import Box from '@mui/material/Box'
import Slider from '@mui/material/Slider'
import { styled } from '@mui/material/styles'

const minDistance = 80
const PrettoSlider = styled(Slider)({
  // color: '#52af77',
  color: '#087b39',
  height: 6,
  '& .MuiSlider-track': {
    border: 'none',
  },
  '& .MuiSlider-thumb': {
    height: 24,
    width: 24,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    '&:focus, &:hover, &.Mui-active, &.Mui-focusVisible': {
      boxShadow: 'inherit',
    },

    '&:before': {
      display: 'none',
    },
  },
  '& .MuiSlider-valueLabel': {
    lineHeight: 1.2,
    fontSize: 12,
    background: 'unset',
    padding: 0,
    width: 32,
    height: 32,
    borderRadius: '50% 50% 50% 0',
    backgroundColor: '#087b39',
    transformOrigin: 'bottom left',
    transform: 'translate(50%, -100%) rotate(-45deg) scale(0)',
    '&:before': { display: 'none' },

    '&.MuiSlider-valueLabelOpen': {
      transform: 'translate(50%, -100%) rotate(-45deg) scale(1)',
    },
    '& > *': {
      transform: 'rotate(45deg)',
    },
  },
})
function FilterPrice(props) {
  const { params, onSubmit } = props
  const [value2, setValue2] = useState([
    parseInt(params['price[gte]'] || 0),
    parseInt(params['price[lte]']) || 500000,
  ])
  useEffect(() => {
    setValue2([
      parseInt(params['price[gte]'] || 0),
      parseInt(params['price[lte]']) || 500000,
    ])
  }, [params])
  const typingTimeOutRef = useRef(null)
  const handleChange2 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    // console.log(newValue[0], newValue[1], 'min max')
    if (newValue[1] - newValue[0] < minDistance) {
      if (activeThumb === 0) {
        const clamped = Math.min(newValue[0], 100 - minDistance)
        setValue2([clamped, clamped + minDistance])
      } else {
        const clamped = Math.max(newValue[1], minDistance)
        setValue2([clamped - minDistance, clamped])
      }
    } else {
      setValue2(newValue)
    }
    if (typingTimeOutRef.current) {
      clearTimeout(typingTimeOutRef.current)
    }
    typingTimeOutRef.current = setTimeout(() => {
      const formValues = {
        min: newValue[0],
        max: newValue[1],
      }
      onSubmit(formValues, 'handleChange2')
    }, 2000)
  }

  // function valuetext(value) {
  //   // return `${value}`

  //   if (typingTimeOutRef.current) {
  //     clearTimeout(typingTimeOutRef.current)
  //   }
  //   typingTimeOutRef.current = setTimeout(() => {
  //     const formValues = {
  //       values: value,
  //     }
  //     onSubmit(formValues)
  //   }, 2000)
  // }
  return (
    <Box sx={{ width: 240 }}>
      <PrettoSlider
        valueLabelDisplay={params['price[gte]'] ? 'on' : 'auto'}
        // getAriaLabel={() => 'Minimum distance shift'}
        value={value2}
        onChange={handleChange2}
        // getAriaValueText={valuetext}
        disableSwap
        max={500000}
        min={0}
        step={50000}
        marks
      />
    </Box>
  )
}

export default FilterPrice
