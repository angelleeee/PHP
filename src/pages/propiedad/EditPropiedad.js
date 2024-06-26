import { useParams } from "react-router-dom";
import FooterComponent from "../../components/FooterComponent";
import Header from "../../components/HeaderComponent";
import { useState, useEffect } from "react";

const EditPropiedad = () => {
    const { id } = useParams();
    const [localidades, setLocalidades] = useState([]);
    const [tipoPropiedad, setTipoPropiedad] = useState([]);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        domicilio: '',
        localidad_id: '',
        cantidad_huespedes: null,
        disponible: '0',
        tipo_propiedad_id: '',
        valor_noche: '',
        fecha_inicio_disponibilidad: '',
        cantidad_habitaciones: null,
        cantidad_banios: null,
        cochera: '0',
        cantidad_dias: '',
        imagen: null,
        tipo_imagen: '',
    });

    useEffect(() => {
        fetch('http://localhost:80/localidades')
            .then(response => response.json())
            .then(localidades => setLocalidades(localidades.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:80/tipos_propiedad')
            .then(response => response.json())
            .then(tipoPropiedad => setTipoPropiedad(tipoPropiedad.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    useEffect(() => {
        fetch('http://localhost:80/propiedades')
            .then(response => response.json())
            .then(propiedad => {
                const propiedades = propiedad.data.find(propiedad => propiedad.id === parseInt(id));
                if (propiedades) {
                    setFormData({
                        domicilio: propiedades.domicilio,
                        localidad_id: propiedades.localidad_id,
                        tipo_propiedad_id: propiedades.tipo_propiedad_id,
                        fecha_inicio_disponibilidad: propiedades.fecha_inicio_disponibilidad,
                        valor_noche: propiedades.valor_noche,
                        cantidad_huespedes: propiedades.cantidad_huespedes,
                        cantidad_dias: propiedades.cantidad_dias,
                        disponible: propiedades.disponible ? '1' : '0',
                        cantidad_habitaciones: propiedades.cantidad_habitaciones,
                        cantidad_banios: propiedades.cantidad_banios,
                        cochera: propiedades.cochera ? '1' : '0',
                        imagen: propiedades.imagen,
                        tipo_imagen: propiedades.tipo_imagen
                    });
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [id]);

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked ? '1' : '0') : value,
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        fetch(`http://localhost:80/propiedades/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then((response) => {
                if (!response.ok) {
                    return response.json().then(error => {
                        const errorMessages = Object.keys(error.message).map(key => ` ${error.message[key]}`).join('\n');
                        setError(errorMessages);
                    });
                }
                return response.json()
                    .then(error => {
                        setError(error.message)
                    });
            })
            .catch(error => setError('Error al enviar el formulario: ' + error.message));
    };



    return (
        <div>
            <Header />
            <form onSubmit={handleSubmit}>
                {error && <p>{error}</p>}
                <div>
                    Domicilio:
                    <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} />
                </div>

                <div>
                    Localidad:
                    <select name="localidad_id" value={formData.localidad_id} onChange={handleChange}>
                        <option value="">Selecciona una localidad</option>
                        {localidades.map(localidad => (
                            <option key={localidad.id} value={localidad.id}>{localidad.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    Tipo de propiedad:
                    <select name="tipo_propiedad_id" value={formData.tipo_propiedad_id} onChange={handleChange}>
                        <option value="">Selecciona un tipo de propiedad</option>
                        {tipoPropiedad.map(tipo => (
                            <option key={tipo.id} value={tipo.id}>{tipo.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    Fecha disponibilidad:
                    <input type="date" name="fecha_inicio_disponibilidad" value={formData.fecha_inicio_disponibilidad} onChange={handleChange} />
                </div>

                <div>
                    Valor noche:
                    <input type="number" name="valor_noche" value={formData.valor_noche} onChange={handleChange} />
                </div>

                <div>
                    Cantidad de Días:
                    <input type="text" name="cantidad_dias" value={formData.cantidad_dias} onChange={handleChange} />
                </div>

                <div>
                    Cantidad de Huéspedes:
                    <input type="text" name="cantidad_huespedes" value={formData.cantidad_huespedes} onChange={handleChange} />
                </div>

                <div>
                    Disponible:
                    <input type="checkbox" name="disponible" checked={formData.disponible === '1'} onChange={handleChange} />
                </div>

                <div>
                    Cochera:
                    <input type="checkbox" name="cochera" checked={formData.cochera === '1'} onChange={handleChange} />
                </div>

                <div>
                    Cantidad de Habitaciones:
                    <input type="text" name="cantidad_habitaciones" value={formData.cantidad_habitaciones} onChange={handleChange} />
                </div>

                <div>
                    Cantidad de Baños:
                    <input type="number" name="cantidad_banios" value={formData.cantidad_banios} onChange={handleChange} />
                </div>

                <div>
                    Imagen:
                    <input type="file" name="imagen" onChange={handleChange} />
                </div>
                <div>
                    Tipo de imagen:
                    <input type="text" name="tipo_imagen" value={formData.tipo_imagen} onChange={handleChange} />
                </div>

                <button type="submit">Confirmar</button>
            </form>
            <button type="button" id="volver">
                <a href="http://localhost:3000">Volver</a>
            </button>
            <FooterComponent />
        </div>
    );
}

export default EditPropiedad;

