
import Header from '../../components/HeaderComponent'
import React, { useState } from 'react'
import FooterComponent from '../../components/FooterComponent'


const EditTipoPropiedad = (item) =>{
   
    const [data, setData] = useState([]);
    function loadData (){
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(data => setData(data.data)) .catch(error => console.error('Error fetching data:', error)); 
    }
    const [currentValue, setCurrentValue] = useState("");
    function handleUpdate(id, updatedData){
        fetch(`http://localhost:80/tipos_propiedad/${id}`,  {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
        .then(() => loadData())
        .catch(error => console.error('Error fetching data:', error));
    }
    
    const handleInputChange = (e) => {
    setCurrentValue(e.target.value);
    
    }
    return(
        <div>
            <Header/>
            <form>
                <input className="input_edit" type="text"  value={currentValue}  onChange={(e) => handleInputChange(e)}/>
                <button className="boton" onClick={() => handleUpdate(item.id, { nombre: currentValue })} >Confirmar</button>
            </form>
            <button type="button" id="volver"><a href="http://localhost:3000/tipo_propiedad">Volver</a></button>
            <FooterComponent/>
        </div>
    )
}


export default EditTipoPropiedad
