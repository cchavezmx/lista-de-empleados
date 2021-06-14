import { useState, useEffect, useContext } from 'react'
import RecordCompount from './RecordCompount'
import { UpdateContext } from '../context/UpdateContext'

const UpdateEmployee = ({ employee, updateDialog, setUpdateDialog, updateData }) => {

  const { setNewElement } = useContext(UpdateContext)

  // buscamos los datos para los inputs
  const objectUpdate =  updateData !== undefined 
    ? employee.find(employee => employee.name.trim().toLowerCase() === updateData.trim().toLowerCase())
    : null

  // buscamos el index
  const objectIndex = updateData !== undefined
    ? employee.findIndex(employee => employee.name.trim().toLowerCase() === updateData.trim().toLowerCase())
    : null

  const [ save, setSave ] = useState(undefined)
  const [ name, setName ] = useState("")
  const [ empresa, setEmpresa ] = useState("")
  const [ salario, setSalario ] = useState("")

  useEffect(() => {
    if(objectUpdate !== undefined){
    setName(objectUpdate?.name)
    setEmpresa(objectUpdate?.empresa)
    setSalario(objectUpdate?.salario)
    }
  },[objectUpdate])


  const handleClose = () => {

      setTimeout(() => {
        setNewElement(false)
        setUpdateDialog(false)
      },700)      
  }


  const handleSubmit = (event) => {

    if( name === objectUpdate.name && empresa === objectUpdate.empresa && salario === objectUpdate.salario ) handleClose()
    
    event.preventDefault()
    if(name !== objectUpdate.name ) employee[objectIndex].name = name 
    if(empresa !== objectUpdate.empresa ) employee[objectIndex].empresa = empresa 
    if(salario !== objectUpdate.salario ) employee[objectIndex].salario = salario 

      setSave("Actualizando Datos")
      setNewElement(true)
      handleClose()
  } 

  return(

    <div className={updateDialog ? null : "dialog" } id="updateForm">
      { save && <span className="save--employee--dialog">{ save }</span> }
      <form onSubmit={handleSubmit} className="form--newEmployee bg-blue">   
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
          <button type="reset" onClick={() => setUpdateDialog(false)}>Close</button>
        </div>
      </form>
      <RecordCompount employeeName={name} setNewElement={setNewElement} handleClose={handleClose} />
    </div>

  )
}


export default UpdateEmployee