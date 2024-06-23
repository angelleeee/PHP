import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';
import "../../assets/styles/NewTipoPropiedad.css";

const EditTipoPropiedad = () => {
    const { id } = useParams(); // Asegúrate de que 'id' es el nombre correcto del parámetro en la URL
    const [data, setData] = useState([]);
    const [currentValue, setCurrentValue] = useState("");
    const [message, setMessage] = useState('');
    const loadData = () => {
        fetch('http://localhost:80/tipos_propiedad')
            .then(response => response.json())
            .then(data => setData(data.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        loadData();
    }, []);

    useEffect(() => {
        // Inicializa currentValue una vez que los datos se hayan cargado
        if (data.length > 0) {
            const initialValue = nombreLocalidad(id);
            setCurrentValue(initialValue);
        }
    }, [data, id]);

    const nombreLocalidad = (id) => {
        const loc = data.find(item => item.id === parseInt(id)); 
        return loc ? loc.nombre : 'Localidad no encontrada';
    };

    const handleUpdate = (id, updatedData) => {
        fetch(`http://localhost:80/tipos_propiedad/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedData),
        })
            .then(() => loadData())
            .then(data => {
                if (data.message) {
                  setMessage(data.message);
                }})
            .catch(error => console.error('Error updating data:', error));
    };

    const handleInputChange = (e) => {
        setCurrentValue(e.target.value);
    };

    return (
        <div>
            <Header/>
            <form>
                <input className="input_edit" type="text" value={currentValue || nombreLocalidad(id)} onChange={handleInputChange}/>
                {message && <p>{message}</p>} 
                <button type="button" className="boton" onClick={() => handleUpdate(id, { nombre: currentValue })}>Confirmar</button>
            </form>
            <button type="button" id="volver">
                <a href="http://localhost:3000/tipos_propiedad">Volver</a>
            </button>
            <FooterComponent />
        </div>
    );
}

export default EditTipoPropiedad;
