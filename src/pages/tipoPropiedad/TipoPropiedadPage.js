import HeaderComponent from "../../components/HeaderComponent"
import FooterComponent from "../../components/FooterComponent"
import '../../assets/styles/TipoPropiedad.css'
import React,{useState, useEffect} from "react";

function TipoPropiedad(){
    const [data, setData] = useState([]);
    ///const [currentValue, setCurrentValue] = useState("");

    useEffect(() => { 
        loadData();
    }, []);


    function loadData (){
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(data => setData(data.data)) .catch(error => console.error('Error fetching data:', error)); 
    }

    function handleDelete(id) {
        if(window.confirm("Estas seguro que queres elimiar este tipo de propiedad")){
            fetch(`http://localhost:80/tipos_propiedad/${id}`,  {
                method: 'DELETE',
            }).then(() => loadData()).catch(error => console.error('Error fetching data:', error));
        }
    }

        return(
            <div>
            <HeaderComponent />
            <ul > 
                {data.map(item => ( 
                    <li key={item.id} className="li">
                        {item.nombre} 
                        <button type="boton" className="boton"><a href="http://localhost:3000/tipo_propiedad/editar" >Editar</a></button>
                        <button className="boton-eliminar" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li>
                     ))
                }
             </ul>
             <button type="boton" id="nuevo" className="boton"><a href="http://localhost:3000/tipo_propiedad/crear">Crear Nuevo tipo de propiedad</a></button>
            <FooterComponent/>
        </div>
    )
}


export default TipoPropiedad
