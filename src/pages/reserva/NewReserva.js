import React, { useState, useEffect } from 'react';

const NewReserva = ({updateData}) => {
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [formData, setFormData] = useState([
        { name: 'propiedad', value: '' },
        { name: 'inquilino', value: '' },
        { name: 'fechaDesde', value: '' },
        { name: 'cantidadNoches', value: '' },
        { name: 'valorTotal', value: '' }
    ]);

    const [mensaje, setMensaje] = useState('');
    const getFieldValue = (name) => {
        const field = formData.find(field => field.name === name);
        return field ? field.value : '';
    };
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
            .then(response => response.json())
            .then(() => updateData())
            .then(data => setMensaje(data.message))
            .catch(error => console.error('Error submitting form:', error));
    };

    return (
        <div>
            <h2>Nueva Reserva</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Propiedad:
                    <select name="propiedad" value={formData.propiedad} onChange={handleChange} required>
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map(propiedad => (
                            <option key={propiedad.id} value={propiedad.id}>{propiedad.domicilio}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Inquilino:
                    <select name="inquilino" value={formData.inquilino} onChange={handleChange} required>
                        <option value="">Selecciona un inquilino</option>
                        {inquilinos.map(inquilino => (
                            <option key={inquilino.id} value={inquilino.id}>{inquilino.nombre}</option>
                        ))}
                    </select>
                </label>
                <br />
                <label>
                    Fecha Desde:
                    <input type="date" name="fechaDesde" value={formData.fechaDesde} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Cantidad Noches:
                    <input type="number" name="cantidadNoches" value={formData.cantidadNoches} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Valor Total:
                    <input type="number" name="valorTotal" value={formData.valorTotal} onChange={handleChange} required />
                </label>
                <br />
                <button type="submit">Enviar Reserva</button>
            </form>
            {mensaje && <p>{mensaje}</p>}
        </div>
    );
};

export default NewReserva;