
import FooterComponent from '../../components/FooterComponent';
import Header from '../../components/HeaderComponent';
import { useEffect, useState } from 'react';
import '../../assets/styles/NewPropiedad.css';

const NewPropiedad = () => {
  const [formData, setFormData] = useState({
    domicilio: '',
    localidad_id: null,
    cantidad_huespedes: '',
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

  const [error, setError] = useState({});
  const [localidades, setLocalidades] = useState([]);
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    fetch('http://localhost:80/tipos_propiedad')
      .then(response => response.json())
      .then(propiedades => setPropiedades(propiedades.data))
      .catch(error => console.error('Error fetching data:', error));
    fetch('http://localhost:80/localidades')
      .then(response => response.json())
      .then(localidades => setLocalidades(localidades.data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (checked ? '1' : '0') : value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch('http://localhost:80/propiedades', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json().then(data => {
      if (!response.ok) {
        setError(data.message);
      } 
    }))
    .catch(error => console.error('Error submitting form:', error));
  };
  console.log(error);
  return (
    <div>
      <Header />
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div>
          {error.global && <p>{error.global}</p>}
          <label>
            Domicilio:
            <input type="text" name="domicilio" value={formData.domicilio} onChange={handleChange} />
          </label>
          {error['domicilio vacio'] && <p>{error['domicilio vacio']}</p>}
          {error['domicilio'] && <p>{error['domicilio']}</p>}
        </div>

        <div>
          <label>
            Localidad:
            <select name="localidad_id" value={formData.localidad_id} onChange={handleChange}>
              <option value="">Seleccione una localidad</option>
              {localidades.map(localidad => (
                <option key={localidad.id} value={localidad.id}>
                  {localidad.nombre}
                </option>
              ))}
            </select>
          </label>
          {error['localidad_id'] && <p>{error['localidad_id']}</p>}
        </div>

        <div>
          <label>
            Cantidad de Habitaciones:
            <input type="number" name="cantidad_habitaciones" value={formData.cantidad_habitaciones} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Cantidad de Baños:
            <input type="number" name="cantidad_banios" value={formData.cantidad_banios} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Cochera:
            <input type="checkbox" name="cochera" checked={formData.cochera === '1'} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Cantidad de Huéspedes:
            <input type="number" name="cantidad_huespedes" value={formData.cantidad_huespedes} onChange={handleChange} />
          </label>
          {error['cantidad_huespedes'] && <p>{error['cantidad_huespedes']}</p>}
        </div>

        <div>
          <label>
            Fecha de Inicio de Disponibilidad:
            <input type="date" name="fecha_inicio_disponibilidad" value={formData.fecha_inicio_disponibilidad} onChange={handleChange} />
          </label>
          {error['fecha_inicio_disponibilidad vacio'] && <p>{error['fecha_inicio_disponibilidad vacio']}</p>}
        </div>

        <div>
          <label>
            Cantidad de Días:
            <input type="number" name="cantidad_dias" value={formData.cantidad_dias} onChange={handleChange} />
          </label>
          {error['cantidad_dias'] && <p>{error['cantidad_dias']}</p>}
        </div>

        <div>
          <label>
            Disponible:
            <input type="checkbox" name="disponible" checked={formData.disponible === '1'} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Valor por Noche:
            <input type="number" name="valor_noche" value={formData.valor_noche} onChange={handleChange} />
          </label>
          {error['valor_noche'] && <p>{error['valor_noche']}</p>}
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
          {error['tipo_propiedad_id'] && <p>{error['tipo_propiedad_id']}</p>}
        </div>

        <div>
          <label>
            Imagen:
            <input type="file" name="imagen" onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>
            Tipo de imagen:
            <input type="text" name="tipo_imagen" value={formData.tipo_imagen} onChange={handleChange} />
          </label>
        </div>
        
        <button type="submit">Enviar</button>
        {error && <p>{error.message}</p>}
      </form>

      <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>
      <FooterComponent />
    </div>
  );
};

export default NewPropiedad;
