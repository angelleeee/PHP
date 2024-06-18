import HeaderComponent from "../../components/HeaderComponent";
import FooterComponent from "../../components/FooterComponent";
import React,{useState, useEffect} from "react";
import NewReserva from "./NewReserva";
import '../../assets/styles/ReservaPage.css';


function Reserva(){
    const [data, setData] = useState([]); 
    const[inquilino,setInquilino] = useState([]);
    const[reserva,setReserva] = useState([]);
    useEffect(() => {                                         
        fetch('http://localhost:80/propiedades')
        .then(response => response.json())
        .then(data => setData(data.data)) 
        .catch(error => console.error('Error fetching data:', error)); 
    }, []);
    useEffect(() => { 
        fetch('http://localhost:80/inquilinos')
        .then(response => response.json())
        .then(inquilino => setInquilino(inquilino.data)) 
        .catch(error => console.error('Error fetching data:', error)); 
    }, []);
    useEffect(() => { 
        loadData();
    }, []);
    function loadData (){
        fetch('http://localhost:80/reservas')
        .then(response => response.json())
        .then(reserva => setReserva(reserva.data)) .catch(error => console.error('Error fetching data:', error)); 
    }


    function domicilio(id) {
        const loc = data.find(data => data.id === id);
        return loc ? loc.domicilio : 'Domicilio no encontrada';
    }
    function nombreApellido(id) {
        const loc = inquilino.find(inquilino => inquilino.id === id);
        return loc ? loc.nombre : 'Inquilino no encontrada';
    }

    function handleDelete(id) {
        if(window.confirm("Estas seguro que queres eliminar esta reserva?")){
            fetch(`http://localhost:80/reservas/${id}`,  {
                method: 'DELETE',
            })
            .then(() => loadData())
            .catch(error => console.error('Error fetching data:', error));
        }         
    }

    return(
        <div>
            <HeaderComponent />
            <ul > 
                {reserva.map(item => ( 
                    <li key={item.id} className="li">
                        Domicilio: {domicilio(item.propiedad_id)}<br/>
                        Inquilino: {nombreApellido(item.inquilino_id)}<br/>
                        Fecha desde: {item.fecha_desde}<br/>
                        Cantidad de noches: {item.cantidad_noches}<br/>
                        Valor total: {item.valor_total}<br/>
                        <button type="boton" className="boton"><a href="http://localhost:3000/reserva/editar" >Editar</a></button>
                        <button className="boton-eliminar" onClick={() => handleDelete(item.id)}>Eliminar</button>
                    </li> ))
                }
             </ul>
             <button type="boton" id="nuevo" className="boton"><a href="http://localhost:3000/reserva/crear">Hacer una reserva</a></button>
            <FooterComponent/>
        </div>
    )
}


export default Reserva