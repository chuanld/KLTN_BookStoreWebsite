import React, { useState, useEffect } from 'react'

const defaultRemainingTime = {
  days: '00',
  hours: '00',
  minutes: '00',
  seconds: '00',
}
function FlashSale({ countdownTimestampMs }) {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime)
  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestampMs)
    }, 1000)

    return () => clearTimeout(intervalId)
  }, [countdownTimestampMs])
  const updateRemainingTime = (countdown) => {
    console.log(countdown)
  }
  return (
    <div style={{ display: 'flex' }}>
      <span>{defaultRemainingTime.days}</span>
      <span>days</span>
      <span>{defaultRemainingTime.hours}</span>
      <span>hours</span>
      <span>{defaultRemainingTime.minutes}</span>
      <span>minutes</span>
      <span>{defaultRemainingTime.seconds}</span>
      <span>seconds</span>
    </div>
  )
}

export default FlashSale
