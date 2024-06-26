import FooterComponent from "../../components/FooterComponent"
import Header from "../../components/HeaderComponent"
import '../../assets/styles/DetailPropiedad.css'
import React,{useState, useEffect} from "react";
import { useParams } from "react-router-dom";

const DetailPropiedad = () =>{
    const { id } = useParams();
    const [data, setData] = useState([]); 
    const [localidades, setLocalidades] = useState([]);
    const [tiposPropiedad, setTiposPropiedad] = useState([]);
    const [formData, setFormData] = useState({
        domicilio:'',
        localidad_id:'',
        cantidad_huespedes: '' ,
        disponible: '0' ,
        tipo_propiedad_id: '' ,
        valor_noche: '' ,
        fecha_inicio_disponibilidad: '' ,
        cantidad_habitaciones: '' ,
        cantidad_banios: '' ,
        cochera:'0',
        cantidad_dias: '',
        imagen:null,
        tipo_imagen:'' ,
    });
    function nombreLocalidad(id) {
        const loc = localidades.find(localidad => localidad.id === id);
        return loc ? loc.nombre : 'Localidad no encontrada';
    }
    
    function nombreTipoPropiedad(id) {
        const tipo = tiposPropiedad.find(tipoPropiedad => tipoPropiedad.id === id);
        return tipo ? tipo.nombre : 'Tipo de Propiedad no encontrada';
    }
    useEffect(() => { 
        loadData();
    }, []);
    function loadData (){
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(tiposPropiedad => setTiposPropiedad(tiposPropiedad.data)) .catch(error => console.error('Error fetching data:', error)); 
    }
    useEffect(() => { 
        fetch('http://localhost:80/localidades')
            .then(response => response.json())
            .then(localidades => setLocalidades(localidades.data))
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
                        cantidad_dias:propiedades.cantidad_dias,
                        disponible:propiedades.disponible,
                        cantidad_habitaciones:propiedades.cantidad_habitaciones,
                        cantidad_banios:propiedades.cantidad_banios,
                        cochera:propiedades.cochera,
                        imagen:propiedades.imagen,
                        tipo_imagen:propiedades.tipo_imagen
                    });
                }
            }) 
            .catch(error => console.error('Error fetching data:', error)); 
    }, [id]);
    function booleano(x){
        return x ==='1' ? 'Disponible' : 'No disponible';
    }
    return(
        <div>
            <Header/>
            <div className="propiedad">
                <img src={formData.imagen} className="imagen-propiedad" />
                <div className="propiedad-detalles">
                    <h2>{nombreTipoPropiedad(formData.tipo_propiedad_id)}</h2>
                    <p><strong>Domicilio:</strong> {formData.domicilio}</p>
                    <p><strong>Localidad:</strong> {nombreLocalidad(formData.localidad_id)}</p>
                    <p><strong>Cantidad de habitaciones:</strong> {formData.cantidad_habitaciones}</p>
                    <p><strong>Baños:</strong> {formData.cantidad_banios}</p>
                    <p><strong>Cochera:</strong> {formData.cochera}</p>
                    <p><strong>Cantidad de huéspedes:</strong> {formData.cantidad_huespedes}</p>
                    <p><strong>Fecha de inicio de disponibilidad:</strong> {formData.fecha_inicio_disponibilidad}</p>
                    <p><strong>Cantidad de días:</strong> {formData.cantidad_dias}</p>
                    <p><strong>Valor por noche:</strong> ${formData.valor_noche}</p>
                    <p><strong>{booleano(formData.disponible)}</strong> </p>
                </div>
            </div>
            <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>
            <FooterComponent/>
        </div>
    )
}


export default DetailPropiedad