import HeaderComponent from "../../components/HeaderComponent"
import FooterComponent from "../../components/FooterComponent"
import NewTipoPropiedad from "./NewTipoPropiedad"
import '../../assets/styles/TipoPropiedad.css'
import React,{useState, useEffect} from "react";

function TipoPropiedad(){


    const [data, setData] = useState([]);
    const [showSelect, setShowSelect] = useState(false); 
    const[showDelete,setShowDelete] = useState(true);
    const [currentValue, setCurrentValue] = useState("");

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


    function handleUpdate(id, updatedData){
            fetch(`http://localhost:80/tipos_propiedad/${id}`,  {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            })
            .then(() => loadData())
            .then(()=>setShowDelete(true))
            .then(()=>setShowSelect(false))
            .catch(error => console.error('Error fetching data:', error));
    }

    const handleInputChange = (e) => {
        setCurrentValue(e.target.value);

    }


    function edit(item){
        setShowSelect(true)
        setCurrentValue(item.nombre);
        setShowDelete(false);
    }
    
    return(
        <div>
            <HeaderComponent />
            <ul > 
                {data.map(item => ( 
                    <li key={item.id} className="li">
                        {item.nombre} 
                    <button className="boton" onClick={() => edit(item)}>Editar</button>
                    {showDelete && <button className="boton-eliminar" onClick={() => handleDelete(item.id)}>Eliminar</button>}
                    {showSelect && <input className="input_edit" type="text"  value={currentValue}  onChange={(e) => handleInputChange(e)}/>}
                    {showSelect && <button className="boton" onClick={() => handleUpdate(item.id, { nombre: currentValue })} >Confirmar</button>}
                    </li>
                     ))
                }
             </ul>
            <NewTipoPropiedad updateData={loadData}/>

            <FooterComponent/>
        </div>
    )
}


export default TipoPropiedad
