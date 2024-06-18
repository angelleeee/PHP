
import React, { useState } from 'react';


const EditTipoPropiedad = (updateData,  createItem, values, select, setShowDelete, setCurrentValue, setShowSelect) =>{
   
    function handleUpdate(id, updatedData){
        fetch(`http://localhost:80/tipos_propiedad/${id}`,  {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(() => updateData())
        .then(()=>setShowDelete(true))
        .then(()=>setShowSelect(false))
        .catch(error => console.error('Error fetching data:', error));
    }
    
    const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
    
    }
    
    
   
    
    return(
        <div>
            {select && <input className="input_edit" type="text"  value={values}  onChange={(e) => handleInputChange(e)}/>}
            {select && <button className="boton" onClick={() => handleUpdate(createItem.id, { nombre: values })} >Confirmar</button>}
        </div>
    )
}


export default EditTipoPropiedad
