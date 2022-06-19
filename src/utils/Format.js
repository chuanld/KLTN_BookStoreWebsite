import CurrencyFormat from 'react-currency-format'

export function formatCurrency(crc) {
  return (
    <CurrencyFormat
      value={crc}
      displayType={'text'}
      thousandSeparator={true}
      suffix={'₫'}
    />
  )
}
