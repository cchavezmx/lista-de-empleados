
const MoneyHook = ({ currency = "MXN", salario } = {} ) => {

  const currencySalario = new Intl.NumberFormat('en-MX', { style: "currency", currency: currency }).format(salario)
  const style = salario > 10000 ? 'texto--verde' : 'texto--rojo' 
  
  return (
    <span className={style}>{ currencySalario }</span>
  )
  
}

export default MoneyHook


