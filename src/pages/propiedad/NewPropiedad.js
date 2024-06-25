
import FooterComponent from '../../components/FooterComponent';
import Header from '../../components/HeaderComponent';
import { useEffect,useState } from 'react';
import '../../assets/styles/NewPropiedad.css'

const NewPropiedad = () => {
  const [formData, setFormData] = useState({
    domicilio:'',
    localidad_id:'',
    cantidad_huespedes: '' ,
    disponible: '0' ,
    tipo_propiedad_id: '' ,
    valor_noche: '' ,
    fecha_inicio_disponibilidad: '' ,
    cantidad_habitaciones: null ,
    cantidad_banios: null ,
    cochera:'0',
    cantidad_dias: '',
    imagen:null,
    tipo_imagen:'' ,
});
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [localidades,setLocalidades] = useState([]);
  const [propiedades,setPropiedades] = useState([]);
  useEffect(() => { 
    fetch('http://localhost:80/tipos_propiedad')
    .then(response => response.json())
    .then(propiedades => setPropiedades(propiedades.data)) .catch(error => console.error('Error fetching data:', error)); 
}, []);
  useEffect(() => { 
      fetch('http://localhost:80/localidades')
      .then(response => response.json())
      .then(localidades => setLocalidades(localidades.data)) .catch(error => console.error('Error fetching data:', error)); 
  }, []);
  const validate = () => {
    const newErrors = {};

    if (!formData.domicilio) newErrors.domicilio = 'El domicilio no puede estar vacío';
    if (!formData.localidad_id) newErrors.localidad_id = 'Debe seleccionar una localidad';
    if (formData.cantidadHabitaciones && isNaN(formData.cantidadHabitaciones)) newErrors.cantidadHabitaciones = 'La cantidad de habitaciones debe ser un número';
    if (formData.cantidadBanios && isNaN(formData.cantidadBanios)) newErrors.cantidadBanios = 'La cantidad de baños debe ser un número';
    if (!formData.cantidad_huespedes) newErrors.cantidad_huespedes = 'La cantidad de huéspedes no puede estar vacía';
    if (formData.cantidad_huespedes && isNaN(formData.cantidad_huespedes)) newErrors.cantidad_huespedes = 'La cantidad de huéspedes debe ser un número';
    if (!formData.fecha_inicio_disponibilidad) newErrors.fecha_inicio_disponibilidad = 'La fecha de inicio no puede estar vacía';
    if (!formData.cantidadDias) newErrors.cantidadDias = 'La cantidad de días no puede estar vacía';
    if (formData.cantidadDias && isNaN(formData.cantidadDias)) newErrors.cantidadDias = 'La cantidad de días debe ser un número';
    if (!formData.valor_noche) newErrors.valor_noche = 'El valor por noche no puede estar vacío';
    if (formData.valor_noche && isNaN(formData.valor_noche)) newErrors.valor_noche = 'El valor por noche debe ser un número';
    if (!formData.tipo_propiedad_id) newErrors.tipo_propiedad_id = 'Debe seleccionar un tipo de propiedad';

    return newErrors;
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? (checked ? '1' : '0') : value,
        });
  };

  const handleSubmit =  (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);  
    fetch('http://localhost:80/propiedades', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then((response) => {
      if (!response) {
          return response.json().then(error => {
              const errorMessages = Object.keys(error.message).map(key => ` ${error.message[key]}`).join('\n');
              setError(errorMessages);
          });
      }
      return response.json()
      .then(error=>{
          setError(error.message)
      });
    })
    .catch(error => console.error('Error submitting form:', error));
  }
  

  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {error && <p>{error}</p>}
          <label>
            Domicilio:
            <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange}/>
          </label>
          {errors.domicilio && <p style={{ color: 'red' }}>{errors.domicilio}</p>}
        </div>

        <div>
          <label>
            Localidad:
            <select name="localidad_id" value={formData.localidad_id} onChange={handleChange}>
              <option value="">Seleccione una localidad</option>
                {localidades.map(localidades => (
                  <option key={localidades.id} value={localidades.id}>
                  {localidades.nombre}
              </option>
              ))}
            </select>
          </label>
          {errors.localidad_id && <p style={{ color: 'red' }}>{errors.localidad_id}</p>}
        </div>

        <div>
          <label>
            Cantidad de Habitaciones:
            <input type="text" name="cantidadHabitaciones" value={formData.cantidadHabitaciones} onChange={handleChange}/>
          </label>
          {errors.cantidadHabitaciones && <p style={{ color: 'red' }}>{errors.cantidadHabitaciones}</p>}
        </div>

        <div>
          <label>
            Cantidad de Baños:
            <input type="text" name="cantidadBanios" value={formData.cantidadBanios} onChange={handleChange}/>
          </label>
          {errors.cantidadBanios && <p style={{ color: 'red' }}>{errors.cantidadBanios}</p>}
        </div>

        <div>
          <label>
            Cochera:
            <input type="checkbox" name="cochera" checked={formData.cochera==='1'} onChange={handleChange}/>
          </label>
        </div>

        <div>
          <label>
            Cantidad de Huéspedes:
            <input type="text" name="cantidad_huespedes" value={formData.cantidad_huespedes} onChange={handleChange}/>
          </label>
          {errors.cantidad_huespedes && <p style={{ color: 'red' }}>{errors.cantidad_huespedes}</p>}
        </div>

        <div>
          <label>
            Fecha de Inicio de Disponibilidad:
            <input type="date" name="fecha_inicio_disponibilidad" value={formData.fecha_inicio_disponibilidad} onChange={handleChange}/>
          </label>
          {errors.fecha_inicio_disponibilidad && <p style={{ color: 'red' }}>{errors.fecha_inicio_disponibilidad}</p>}
        </div>

        <div>
          <label>
            Cantidad de Días:
            <input type="text" name="cantidad_dias" value={formData.cantidad_dias} onChange={handleChange}/>
          </label>
          {errors.cantidad_dias && <p style={{ color: 'red' }}>{errors.cantidad_dias}</p>}
        </div>
 
        <div>
          <label>
            Disponible:
            <input type="checkbox" name="disponible" checked={formData.disponible==='1'} onChange={handleChange}/>
          </label>
        </div>

        <div>
          <label>
          Valor por Noche:
          <input type="text" name="valor_noche" value={formData.valor_noche} onChange={handleChange}/>
          </label>
          {errors.valor_noche && <p style={{ color: 'red' }}>{errors.valor_noche}</p>}
        </div>

        <div>
          <label>
            Tipo de Propiedad:
            <select name="tipo_propiedad_id" value={formData.tipo_propiedad_id} onChange={handleChange}>
              <option value="">Seleccione un tipo de propiedad</option>
              {propiedades.map(propiedad => (
                <option key={propiedad.id} value={propiedad.id}>{propiedad.nombre}</option>
              ))}
            </select>
          </label>
          {errors.tipo_propiedad_id && <p style={{ color: 'red' }}>{errors.tipo_propiedad_id}</p>}
        </div>

        <div>
          <label>
            Imagen:
            <input type="file" name="imagen" onChange={handleChange}/>
          </label>
          {errors.imagen && <p style={{ color: 'red' }}>{errors.imagen}</p>}
        </div>
        
        <div>
          <label>
            Tipo de imagen:
            <input type="text" name="tipo_imagen" value={formData.tipo_imagen} onChange={handleChange}/>
          </label>
        </div>

        
        <button type="submit">Enviar</button>
      </form>
      {message && <p>{message}</p>}
      <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>

      <FooterComponent/>
    </div>
  );
};

export default NewPropiedad;