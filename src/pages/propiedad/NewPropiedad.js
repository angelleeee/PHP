
import '../../assets/styles/NewPropiedad.css'
import FooterComponent from '../../components/FooterComponent';
import Header from '../../components/HeaderComponent';
import { useEffect,useState } from 'react';


const NewPropiedad = () => {
  const [formData, setFormData] = useState({
    domicilio: '',
    localidad: '',
    cantidadHabitaciones: '',
    cantidadBanios: '',
    cochera: false,
    cantidadHuespedes: '',
    fechaInicioDisponibilidad: '',
    cantidadDias: '',
    disponible: false,
    valorNoche: '',
    tipoPropiedad: '',
    imagen: null,
  });

  const [errors, setErrors] = useState({});
  const tiposPropiedad = ['Casa', 'Departamento', 'Cabaña'];
  const [localidades,setLocalidades] = useState([]);

  useEffect(() => { 
      fetch('http://localhost:80/localidades')
      .then(response => response.json())
      .then(localidades => setLocalidades(localidades.data)) .catch(error => console.error('Error fetching data:', error)); 
  }, []);
  const validate = () => {
    const newErrors = {};

    if (!formData.domicilio) newErrors.domicilio = 'El domicilio no puede estar vacío';
    if (!formData.localidad) newErrors.localidad = 'Debe seleccionar una localidad';
    if (formData.cantidadHabitaciones && isNaN(formData.cantidadHabitaciones)) newErrors.cantidadHabitaciones = 'La cantidad de habitaciones debe ser un número';
    if (formData.cantidadBanios && isNaN(formData.cantidadBanios)) newErrors.cantidadBanios = 'La cantidad de baños debe ser un número';
    if (!formData.cantidadHuespedes) newErrors.cantidadHuespedes = 'La cantidad de huéspedes no puede estar vacía';
    if (formData.cantidadHuespedes && isNaN(formData.cantidadHuespedes)) newErrors.cantidadHuespedes = 'La cantidad de huéspedes debe ser un número';
    if (!formData.fechaInicioDisponibilidad) newErrors.fechaInicioDisponibilidad = 'La fecha de inicio no puede estar vacía';
    if (!formData.cantidadDias) newErrors.cantidadDias = 'La cantidad de días no puede estar vacía';
    if (formData.cantidadDias && isNaN(formData.cantidadDias)) newErrors.cantidadDias = 'La cantidad de días debe ser un número';
    if (!formData.valorNoche) newErrors.valorNoche = 'El valor por noche no puede estar vacío';
    if (formData.valorNoche && isNaN(formData.valorNoche)) newErrors.valorNoche = 'El valor por noche debe ser un número';
    if (!formData.tipoPropiedad) newErrors.tipoPropiedad = 'Debe seleccionar un tipo de propiedad';

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // Enviar formulario
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        formDataToSend.append(key, formData[key]);
      });

      try {
        const response = await fetch('http://localhost:5000/submit', {
          method: 'POST',
          body: formDataToSend,
        });

        const result = await response.json();
        alert(result.message);
      } catch (error) {
        console.error('Error al enviar el formulario:', error);
      }
    }
  };

  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          <label>
            Domicilio:
            <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange}/>
          </label>
          {errors.domicilio && <p style={{ color: 'red' }}>{errors.domicilio}</p>}
        </div>

        <div>
          <label>
            Localidad:
            <select name="localidad" value={formData.localidad} onChange={handleChange}>
              <option value="">Seleccione una localidad</option>
                {localidades.map(localidades => (
                  <option key={localidades.id} value={localidades.id}>
                  {localidades.nombre}
              </option>
              ))}
            </select>
          </label>
          {errors.localidad && <p style={{ color: 'red' }}>{errors.localidad}</p>}
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
            <input type="checkbox" name="cochera" checked={formData.cochera} onChange={handleChange}/>
          </label>
        </div>

        <div>
          <label>
            Cantidad de Huéspedes:
            <input type="text" name="cantidadHuespedes" value={formData.cantidadHuespedes} onChange={handleChange}/>
          </label>
          {errors.cantidadHuespedes && <p style={{ color: 'red' }}>{errors.cantidadHuespedes}</p>}
        </div>

        <div>
          <label>
            Fecha de Inicio de Disponibilidad:
            <input type="date" name="fechaInicioDisponibilidad" value={formData.fechaInicioDisponibilidad} onChange={handleChange}/>
          </label>
          {errors.fechaInicioDisponibilidad && <p style={{ color: 'red' }}>{errors.fechaInicioDisponibilidad}</p>}
        </div>

        <div>
          <label>
            Cantidad de Días:
            <input type="text" name="cantidadDias" value={formData.cantidadDias} onChange={handleChange}/>
          </label>
          {errors.cantidadDias && <p style={{ color: 'red' }}>{errors.cantidadDias}</p>}
        </div>

        <div>
          <label>
            Disponible:
            <input type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange}/>
          </label>
        </div>

        <div>
          <label>
          Valor por Noche:
          <input type="text" name="valorNoche" value={formData.valorNoche} onChange={handleChange}/>
          </label>
          {errors.valorNoche && <p style={{ color: 'red' }}>{errors.valorNoche}</p>}
        </div>

        <div>
          <label>
            Tipo de Propiedad:
            <select name="tipoPropiedad" value={formData.tipoPropiedad} onChange={handleChange}>
              <option value="">Seleccione un tipo de propiedad</option>
              {tiposPropiedad.map((tipo, index) => (
                <option key={index} value={tipo}>
                  {tipo}
                </option>
              ))}
            </select>
          </label>
          {errors.tipoPropiedad && <p style={{ color: 'red' }}>{errors.tipoPropiedad}</p>}
        </div>

        <div>
          <label>
            Imagen:
            <input type="file" name="imagen" onChange={handleChange}/>
          </label>
          {errors.imagen && <p style={{ color: 'red' }}>{errors.imagen}</p>}
        </div>
        <button type="submit">Enviar</button>

      </form>
      <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>

      <FooterComponent/>
    </div>
  );
};

export default NewPropiedad;