import Header from '../../components/HeaderComponent';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent';

const EditReserva = () => {
    const { id } = useParams();
    const [propiedades, setPropiedades] = useState([]);
    const [inquilinos, setInquilinos] = useState([]);
    const [formData, setFormData] = useState({
        propiedad_id: '' ,
        inquilino_id: '' ,
        fecha_desde: '' ,
        cantidad_noches: '',
        valor_total: '',
});

    const [mensaje, setMensaje] = useState('');

    useEffect(()=>{
        // Obtener la lista de propiedades
        fetch('http://localhost:80/propiedades')
            .then(response => response.json())
            .then(propiedades => setPropiedades(propiedades.data))
            .catch(error => console.error('Error fetching propiedades:', error));
    })
    useEffect(()=>{
        // Obtener la lista de inquilinos
        fetch('http://localhost:80/inquilinos')
            .then(response => response.json())
            .then(inquilinos => setInquilinos(inquilinos.data))
            .catch(error => console.error('Error fetching inquilinos:', error));
    })
    useEffect(() => {
        // Obtener todas las reservas
        fetch('http://localhost:80/reservas')
            .then(response => response.json())
            .then(reservas => {
                const reserva = reservas.data.find(reserva => reserva.id === parseInt(id));
                if (reserva) {
                    setFormData({
                        propiedad_id: reserva.propiedad_id,
                        inquilino_id: reserva.inquilino_id,
                        fecha_desde: reserva.fecha_desde,
                        cantidad_noches: reserva.cantidad_noches,
                        valor_total: reserva.valor_total
                    });
                }
            })
            .catch(error => console.error('Error fetching reservas:', error));
    }, [id]);

    const handleChange = (event) => {
        setFormData({ ...formData, [event.target.name]: event.target.value });
    };
    

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:80/reservas/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                if (data.message) {
                    setMensaje(data.message);
                } else {
                    setMensaje('Reserva actualizada correctamente');
                }
            })
            .catch(error => setMensaje('Error al enviar el formulario: ' + error.message));
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Confirmar</button>
            </form>
            
            <button type="button" id="volver"><a href="http://localhost:3000/reserva">Volver</a></button>
            <FooterComponent />
        </div>
    );
};

export default EditReserva;

