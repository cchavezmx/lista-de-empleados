import { useState, useMemo, useContext } from 'react'
import MoneyHook from './utils/MoneyHook';
import UsdConversionHook from './utils/UsdConversionHook';
import employee from './assets/employee';

import FormEmployee from './utils/FormEmployee';
import UpdateEmployee from './utils/UpdateEmployee';

// context data
import { UpdateContext } from './context/UpdateContext'

import './App.css';
import noperson from './assets/noperson.png'

const ImgenEmployee = ({ employeeName }) => {

  let src = localStorage.getItem(employeeName)
  if(src === null ){
    return <img src={noperson} alt="fata por capturar" style={{ width: '30px' }} />
  }
  return <video src={src} className="video--tag" />
}

function ListOfEmployee() {

  const { newElement, setNewElement } = useContext(UpdateContext)

  const [ open, setOpen] = useState(false)
  

  const [ updateDialog, setUpdateDialog] = useState(undefined)
  const [ updateData, setUpdateData ] = useState(undefined)

  // pasamos el nombre y abrimos el dialogg
  const handleEditEmployee = ( updateUserName ) => { 
    setUpdateData(updateUserName)
    setUpdateDialog(true)
  }

  const updateDialogRact = (
    <UpdateEmployee 
      employee={employee} 
      updateDialog={updateDialog}
      updateData={updateData} 
      setUpdateDialog={setUpdateDialog}
      setNewElement={setNewElement}
    />)
  
  const listEmployee = useMemo(() => {

    return(
      <tbody>
              {
                employee.map((item, index) => {
                  return(
                    <tr key={index}>
                    <td>{item.name}</td>
                    <td>{item.empresa}</td>
                    <td className="flex-justify-between">
                    <MoneyHook salario={item.salario} />
                    <UsdConversionHook salario={item.salario} />
                    </td>
                    <td>
                      <ImgenEmployee employeeName={item.name} />
                    </td>
                    <td>
                      <button onClick={() => handleEditEmployee(item.name)}>Editar</button>
                    </td>
                  </tr>
                  )
                })
              }
          </tbody>
    )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[newElement])

  return (
    <>
    <FormEmployee employee={employee} setNewElement={setNewElement} setOpen={setOpen} open={open} />
    { updateDialogRact }
    <div className="App">
      
      <div className="menu--bar">
        <button onClick={() => setOpen(true)}>Agregar</button>
        <div>
          <p style={{ width: "80px" }}>{`Total de Empleados ${employee.length}`}</p>
        </div>
        <div>
          <input placeholder="Buscar empleado" />
        </div>
      </div>
      <table className="table--container">
          <thead>
          <tr>
            <th>Nombre</th>
            <th>Empresa</th>
            <th>Salario</th>
            <th>Foto</th>
            <th>Acciones</th>
          </tr>
          </thead>
            { listEmployee }
      </table>
      
    </div>

    <div id="footer"/>
    </>  
  );
}

export default ListOfEmployee;
