import {createContext, useState } from 'react'

export const UpdateContext = createContext()

const UpdateContextProvider = (props) => {


  const [ newElement, setNewElement ] = useState(false)


  return(
    <UpdateContext.Provider value={{
      newElement, setNewElement
    }}>
      { props.children }
    </UpdateContext.Provider>
  )

}


export default UpdateContextProvider