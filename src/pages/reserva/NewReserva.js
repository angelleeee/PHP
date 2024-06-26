import React, { useState, useEffect } from 'react';
import Header from '../../components/HeaderComponent';
import FooterComponent from '../../components/FooterComponent';

const NewReserva = () => {
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        propiedad_id: '' ,
        inquilino_id: '' ,
        fecha_desde: '' ,
        cantidad_noches: '',
        valor_total: '',
});

    useEffect(() => {
        // Aquí realiza la solicitud al backend para obtener la lista de propiedades
        fetch('http://localhost:80/propiedades')
            .then(response => response.json())
            .then(propiedades => setPropiedades(propiedades.data))
            .catch(error => console.error('Error fetching propiedades:', error));

        // Aquí realiza la solicitud al backend para obtener la lista de inquilinos
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
        .then((response) => {
            if (!response.ok) {
                return response.json().then(error =>{
                    setError(error.message['fec'])});
            }
            return response.json()
            .then(error=>{
                setError(error.message)
            });
        })
        .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div>
            <Header/>
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}   
                <label>
                    Propiedad:
                    <select name="propiedad_id" value={formData.propiedad_id} onChange={handleChange} required>
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map(propiedad => (
                            <option key={propiedad.id} value={propiedad.id}>{propiedad.domicilio}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Inquilino:
                    <select name="inquilino_id" value={formData.inquilino_id} onChange={handleChange} required>
                        <option value="">Selecciona un inquilino</option>
                        {inquilinos.map(inquilino => (
                            <option key={inquilino.id} value={inquilino.id}>{inquilino.nombre}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Fecha Desde:
                    <input type="date" name="fecha_desde" value={formData.fecha_desde} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Cantidad Noches:
                    <input type="number" name="cantidad_noches" value={formData.cantidad_noches} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Valor Total:
                    <input type="number" name="valor_total" value={formData.valor_total} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Enviar Reserva</button>
            </form>
            <button type="button" id="volver"><a href="http://localhost:3000/reserva">Volver</a></button>
            <FooterComponent/>
        </div>
    );
};

export default NewReserva;