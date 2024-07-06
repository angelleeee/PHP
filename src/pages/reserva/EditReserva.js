import Header from '../../components/HeaderComponent';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FooterComponent from '../../components/FooterComponent';

function EditReserva() {
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

    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    useEffect(()=>{
        fetch('http://localhost:80/propiedades')
            .then(response => response.json())
            .then(propiedades => setPropiedades(propiedades.data))
            .catch(error => console.error('Error fetching propiedades:', error));
        fetch('http://localhost:80/inquilinos')
            .then(response => response.json())
            .then(inquilinos => setInquilinos(inquilinos.data))
            .catch(error => console.error('Error fetching inquilinos:', error));
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
    },[])


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
        .then(response => response.json().then(data => {
            if (!response.ok) {
              setError(data.message);
            }else{
                setMessage(data.message)
            } 
          }))
        .catch(error => setError('Error al enviar el formulario: ' + error.message));
    };

    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                {message && <p>{message}</p>}
                {error['invalido'] && <p>{error['invalido']}</p>}
                <label>
                    Propiedad:
                    <select name="propiedad_id" value={formData.propiedad_id} onChange={handleChange}>
                        <option value="">Selecciona una propiedad</option>
                        {propiedades.map(propiedad => (
                            <option key={propiedad.id} value={propiedad.id}>{propiedad.domicilio}</option>
                        ))}
                    </select>
                </label>
                {error['propiedad_id_vacio'] && <p>{error['propiedad_id_vacio']}</p>}
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
                {error['inquilino_id_vacio'] && <p>{error['inquilino_id_vacio']}</p>}
                {error['inquilino_id'] && <p>{error['inquilino_id']}</p>}
                <br />
                <label>
                    Fecha Desde:
                    <input type="date" name="fecha_desde" value={formData.fecha_desde} onChange={handleChange}/>
                </label>
                {error['fec'] && <p>{error['fec']}</p>}
                <br />
                <label>
                    Cantidad Noches:
                    <input type="number" name="cantidad_noches" value={formData.cantidad_noches} onChange={handleChange}/>
                </label>
                <br />
                <label>
                    Valor Total:
                    <input type="number" name="valor_total" value={formData.valor_total} onChange={handleChange}/>
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

