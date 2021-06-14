import { useEffect, useState, useCallback } from 'react'

const URL = `https://free.currconv.com/api/v7/convert?q=USD_MXN&compact=ultra&apiKey=c73f552b2247bfd56e1b `

const UsdConversionHook = ({ salario }) => {
  
  const [ currency, setCurrency ] = useState(null)
  const [ open, setOpen ] = useState(true)
  const handledOpen = () => setOpen(!open)

  useEffect(() => {
    fetch(URL)
      .then(res => res.json())
      .then(res => setCurrency(res) )
  },[])

  const usdConversion = useCallback(() => {

    if(currency !== null ){
      const convert = salario / currency.USD_MXN
      return 'USD' + new Intl.NumberFormat('en-US', { style: "currency", currency: 'USD' }).format(convert)
    }
    
  },[currency, salario])

  return(
    <div className="flex-column">
      <button onClick={handledOpen}>{ open ? "Ver en USD" : "Close" }</button>
      <span hidden={open} className="currencyDollar">{ usdConversion() }</span>
    </div>
  )

}

export default UsdConversionHook