
import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import '../../assets/styles/TipoPropiedad.css';
import React, { useState, useEffect } from "react";


function TipoPropiedad() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(''); 

    useEffect(() => { 
        loadData();
    }, []);

    function loadData (){
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(data => setData(data.data)).catch(error => console.error('Error fetching data:', error)); 
    }

    function handleDelete(id) {
        if (window.confirm("Estas seguro que queres eliminar este tipo de propiedad")) {
            fetch(`http://localhost:80/tipos_propiedad/${id}`, {
                method: 'DELETE',
            })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(error =>{
                        setError(error.status)});
                }
                return response.json()
                .then(error=>{
                    setError(error.message)
                });
            })
            .then(() => loadData())
            .catch(error => {
                console.error('Error fetching data:', error);
            });
        }
    }

    const handleEdit = (id) => {
        window.location.href = `/tipos_propiedad/editar/${id}`;
    };

    return (
        <div>
            <HeaderComponent />
            <ul>
            {error && <div className="error-message">{error}</div>} 
                {data.map(item => (
                    <li key={item.id} className="li">
                        {item.nombre}
                        <button type="button" className="boton" onClick={() => handleEdit(item.id)}>Editar</button>
                        <button className="boton-eliminar" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
            <button type="button" id="nuevo" className="boton">
                <a href="http://localhost:3000/tipos_propiedad/crear">Crear Nuevo tipo de propiedad</a>
            </button>
            <FooterComponent />
        </div>
    );
}

export default TipoPropiedad
