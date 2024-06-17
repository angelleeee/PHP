import FooterComponent from "../../components/FooterComponent";
import HeaderComponent from "../../components/HeaderComponent";
import NewPropiedad from "./NewPropiedad";
import FiltroPropiedad from "../../components/FiltroPropiedad";
import React,{useState, useEffect} from "react";
import '../../assets/styles/Propiedad.css'

function Propiedad(){
    const [data, setData] = useState([]); 
    const [localidad,setLocalidad] = useState([]);
    const[propiedad,setPropiedad] = useState([]);

    useEffect(() => { 
        loadData();
    }, []);


    function loadData (){
        fetch('http://localhost:80/propiedades')
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

    
    function handleDelete(id) {
        if(window.confirm("Estas seguro que queres elimiar este tipo de propiedad")){
            fetch(`http://localhost:80/propiedades/${id}`,  {
                method: 'DELETE',
            }).then(() => loadData()).catch(error => console.error('Error fetching data:', error));
        }         
    }

    hola
    return(
        <div>
            <HeaderComponent/>
            <FiltroPropiedad/>
            <ul > 
                {data.map(item => ( 
                    <li key={item.id} className="li">
                        Domicilio: {item.domicilio}<br/>
                        Localidad: {nombreLocalidad(item.localidad_id)}<br/>
                        Tipo de propiedad: {nombrePropiedad(item.tipo_propiedad_id)}<br/>
                        Fecha disponibilidad: {item.fecha_inicio_disponibilidad}<br/>
                        Valor Noche:{item.valor_noche}<br/>
                        Cantidad de Huespedes: {item.cantidad_huespedes}<br/>
                        <button className="boton">Editar</button>
                        <button className="boton-eliminar" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li> ))
                }
                
             </ul>
            <NewPropiedad/>
            <FooterComponent/>
        </div>
    )
}

export default Propiedad