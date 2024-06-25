
import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import React,{useState, useEffect} from "react";
import '../../assets/styles/Propiedad.css'

function Propiedad(){
    const [data, setData] = useState([]); 
    const [localidad,setLocalidad] = useState([]);
    const[propiedad,setPropiedad] = useState([]);

      
    useEffect(() => { 
        loadData();
    }, []);


    function loadData (query = ''){
        fetch(`http://localhost:80/propiedades${query}`)
        .then(response => response.json())
        .then(data => setData(data.data)) .catch(error => console.error('Error fetching data:', error)); 
    }

    useEffect(() => { 
        fetch('http://localhost:80/localidades')
        .then(response => response.json())
        .then(localidad => setLocalidad(localidad.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);

    useEffect(() => { 
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(propiedad => setPropiedad(propiedad.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);
    function nombreLocalidad(id) {
        const loc = localidad.find(localidad => localidad.id === id);
        return loc ? loc.nombre : 'Localidad no encontrada';
    }
    function nombrePropiedad(id) {
        const loc = propiedad.find(propiedad => propiedad.id === id);
        return loc ? loc.nombre : 'Propiedad no encontrada';
    }

    ////Filtro---------------------
    const [localidades,setLocalidades] = useState([]);

    useEffect(() => { 
        fetch('http://localhost:80/localidades')
        .then(response => response.json())
        .then(localidades => setLocalidades(localidades.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);

    const [formData, setFormData] = useState({
        disponible: '1',
        localidad: '',
        fechaDesde: '',
        cantHuesped: '0',
    });

    console.log(formData)

    const handleChange = (event) => {
        const { name, value, type, checked } = event.target;
        const newFilters = {
            ...formData,
            [name]: type === 'checkbox' ? checked  : value
        };
        setFormData(newFilters);
      };
      







    
    const handleSubmit = (event) => {
        event.preventDefault();
        const query = new URLSearchParams();
        if (formData.disponible) query.append('disponible', formData.disponible);
        if (formData.localidad) query.append('localidad_id', formData.localidad);
        if (formData.fechaDesde) query.append('fechaDesde', formData.fechaDesde);
        if (formData.cantHuesped) query.append('cantidad_huespedes', formData.cantHuesped);
      
      
        loadData(`?${query.toString()}`);

    };
    ////--------------------------------------------
    function handleDelete(id) {
        if(window.confirm("Estas seguro que queres eliminar esta propiedad?")){
            fetch(`http://localhost:80/propiedades/${id}`,  {
                method: 'DELETE',
            }).then(() => loadData()).catch(error => console.error('Error fetching data:', error));
        }         
    }
    const handleDetail = (id) => {
        window.location.href = `/detalle/${id}`;
    };
    const handleEdit = (id) => {
        window.location.href = `/editar/${id}`;
    };

    return(
        <div>
            <HeaderComponent/>
            <form id="filtro" onSubmit={handleSubmit} >
                <label>
                    Disponible:
                    <input type="checkbox" name="disponible" checked={formData.disponible} onChange={handleChange}/>
                </label>

                <label>
                    Localidad:
                    <select value={formData.localidad} name="localidad" onChange={handleChange}>
                        <option value="">Selecciona una propiedad</option>
                        {localidades.map(localidades => (
                            <option key={localidades.id} value={localidades.id}>{localidades.nombre}</option>
                        ))}
                    </select>
                </label>

                <label>
                    Fecha de inicio:
                    <input type="date" name="fechaDesde" value={formData.fechaDesde} onChange={handleChange} />
                </label>

                <label >
                    Cantidad de huéspedes:
                    <input type="number" name="cantHuesped" value={formData.cantHuesped} onChange={handleChange}/>
                </label>
                <button type="submit">Filtrar</button>
            </form>
            
            <ul > 
                {data.map(item => ( 
                    <li key={item.id} className="li">
                        Domicilio: {item.domicilio}<br/>
                        Localidad: {nombreLocalidad(item.localidad_id)}<br/>
                        Tipo de propiedad: {nombrePropiedad(item.tipo_propiedad_id)}<br/>
                        Fecha disponibilidad: {item.fecha_inicio_disponibilidad}<br/>
                        Valor Noche:{item.valor_noche}<br/>
                        Cantidad de Huespedes: {item.cantidad_huespedes}<br/>
                        <button type="boton" className="boton" onClick={() => handleEdit(item.id)}>Editar</button>
                        <button className="boton-eliminarP" onClick={() => handleDelete(item.id)}>Eliminar</button>
                        <button className="boton-detalle" onClick={() => handleDetail(item.id)}>Detalles</button>
                    </li> ))
                }
             </ul>
             <button type="boton" id="nuevo" className="boton"><a href="http://localhost:3000/crear">Crear propiedad</a></button>
            <FooterComponent/>
        </div>
    )
}

export default Propiedad