
import React,{useState, useEffect} from "react";

const FiltroPropiedad = () => {
    const [localidades,setLocalidades] = useState([]);

    useEffect(() => { 
        fetch('http://localhost:80/localidades')
        .then(response => response.json())
        .then(localidades => setLocalidades(localidades.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);

    const [formData, setFormData] = useState({
        disponible: false,
        localidad: '',
        fechaDesde: '',
        cantHuesped: 0,
    });

    const [formResponses, setFormResponses] = useState([]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setFormResponses([...formResponses, formData]);
        // Resetear formulario si es necesario
        setFormData({
            available: false,
            localidad: '',
            startDate: '',
            guests: 0,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label htmlFor="available">
                Disponible:
                <input type="checkbox" name="available" checked={formData.disponible} onChange={handleChange}/>
            </label>

            <label htmlFor="location">
                Localidad:
                <select value={formData.localidad} name="localidad" onChange={handleChange}>
                    <option value="">Selecciona una propiedad</option>
                    {localidades.map(localidades => (
                        <option key={localidades.id} value={localidades.id}>{localidades.nombre}</option>
                    ))}
                </select>
            </label>

            <label htmlFor="startDate">
                Fecha de inicio:
                <input type="date" name="startDate" value={formData.fechaDesde} onChange={handleChange} />
            </label>

            <label htmlFor="guests">
                Cantidad de huéspedes:
                <input type="number" name="guests" value={formData.cantHuesped} onChange={handleChange}/>
            </label>

            <button type="submit">Filtrar</button>

            <h2>Respuestas del Formulario:</h2>
            <ul>
                {formResponses.map((response, index) => (
                    <li key={index}>
                        Disponible: {response.available ? 'Sí' : 'No'}, 
                        Localidad: {response.localidad}, 
                        Fecha de inicio: {response.startDate}, 
                        Cantidad de huéspedes: {response.guests}
                    </li>
                ))}
            </ul>
        </form>
    );
};

export default FiltroPropiedad
