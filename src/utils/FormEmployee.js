import { useState } from 'react'

const FormEmployee = ({ open, employee, setNewElement, setOpen } = {}) => {

  const [ save, setSave ] = useState(undefined)
  const [ name, setName ] = useState("")
  const [ empresa, setEmpresa ] = useState("")
  const [ salario, setSalario ] = useState("")

  const handleClose = () => {

      setTimeout(() => {
        setName("")
        setEmpresa("")
        setSalario("")
        setNewElement(false)
        setSave("")
      },2000)      
  }


  const handleSubmit = (event) => {

    if( name === "" && empresa === "" && salario === "" ) handleClose()
    
    event.preventDefault()
    setSave("Guardando Empleado")
      employee.push({
        name,
        empresa,
        salario: +salario
      })

      setNewElement(true)
      handleClose()
  } 

  return(

    <div className={open ? null : "dialog" } id="formDialog">
      { save && <span className="save--employee--dialog">{ save }</span> }
      <form onSubmit={handleSubmit} className="form--newEmployee">   
        <fieldset>
            <label htmlFor="name" >Nombre del empleado</label>
            <input value={name} id="name" onChange={(e) => setName(e.target.value)}></input>
        </fieldset>
        <fieldset>
            <label htmlFor="empresa">Empresa</label>
            <input value={empresa} id="empresa" onChange={(e) => setEmpresa(e.target.value)}></input>
        </fieldset>
        <fieldset>
            <label htmlFor="salario">Salario</label>
            <input value={salario} id="salario" onChange={(e) => setSalario(e.target.value)}></input>
        </fieldset>
        <div>
          <button type="submit">Guardar</button>
          <button type="reset" onClick={() => setOpen(false)}>Close</button>
        </div>
      </form>
    </div>

  )
}


export default FormEmployee