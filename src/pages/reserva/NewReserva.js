import React, { useState, useEffect } from 'react';
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';

const NewReserva = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        propiedad_id: '' ,
        inquilino_id: '' ,
        fecha_desde: '' ,
        cantidad_noches: '',
        valor_total: '',
});

    useEffect(() => {

        fetch('http://localhost:80/propiedades')
            .then(response => response.json())
            .then(propiedades => setPropiedades(propiedades.data))
            .catch(error => console.error('Error fetching propiedades:', error));

        fetch('http://localhost:80/inquilinos')
            .then(response => response.json())
            .then(inquilinos => setInquilinos(inquilinos.data))
            .catch(error => console.error('Error fetching inquilinos:', error));
    }, []);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch('http://localhost:80/reservas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json().then(data => {
            if (!response.ok) {
              setError(data.message);
            }else{
                setMessage(data.message)
            } 
          }))
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div>
            <Header/>
            <form onSubmit={handleSubmit}>
                {message && <p>{message}</p>}   
                <label>
                    Propiedad:
                    <select name="propiedad_id" value={formData.propiedad_id} onChange={handleChange}>
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map(propiedad => (
                            <option key={propiedad.id} value={propiedad.id}>{propiedad.domicilio}</option>
                        ))}
                    </select>
                </label>
                {error['propiedad_id vacia'] && <p>{error['propiedad_id vacia']}</p>}
                {error['propiedad_id'] && <p>{error['propiedad_id']}</p>}
                <br />
                <label>
                    Inquilino:
                    <select name="inquilino_id" value={formData.inquilino_id} onChange={handleChange}>
                        <option value="">Selecciona un inquilino</option>
                        {inquilinos.map(inquilino => (
                            <option key={inquilino.id} value={inquilino.id}>{inquilino.nombre}</option>
                        ))}
                    </select>
                </label>
                {error['inquilino_id vacia'] && <p>{error['inquilino_id vacia']}</p>}
                {error['inquilino_id'] && <p>{error['inquilino_id']}</p>}
                <br />
                <label>
                    Fecha Desde:
                    <input type="date" name="fecha_desde" value={formData.fecha_desde} onChange={handleChange}/>
                </label>
                {error['fecha_desde'] && <p>{error['fecha_desde']}</p>}
                {error['fec'] && <p>{error['fec']}</p>}
                <br />
                <label>
                    Cantidad Noches:
                    <input type="number" name="cantidad_noches" value={formData.cantidad_noches} onChange={handleChange}/>
                </label>
                {error['cantidad_noches'] && <p>{error['cantidad_noches']}</p>}
                <br />
                <label>
                    Valor Total:
                    <input type="number" name="valor_total" value={formData.valor_total} onChange={handleChange}/>
                </label>    
                {error['valor_total'] && <p>{error['valor_total']}</p>}
                <br />
                <button type="submit">Enviar Reserva</button>
            </form>
            <button type="button" id="volver"><a href="http://localhost:3000/reserva">Volver</a></button>
            <FooterComponent/>
        </div>
    );
};

export default NewReserva;