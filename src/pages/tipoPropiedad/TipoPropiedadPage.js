import HeaderComponent from "../../components/HeaderComponent"
import FooterComponent from "../../components/FooterComponent"
import NewTipoPropiedad from "./NewTipoPropiedad"
import '../../assets/styles/TipoPropiedad.css'
import "../../assets/styles/NewTipoPropiedad.css"
import EditTipoPropiedad from "./EditTipoPropiedad"
import React,{useState, useEffect} from "react";

function TipoPropiedad(){

    //{showSelect && <input className="input_edit" type="text"  value={currentValue}  onChange={(e) => handleInputChange(e)}/>}
    //{showSelect && <button className="boton" onClick={() => handleUpdate(item.id, { nombre: currentValue })} >Confirmar</button>}

    const [data, setData] = useState([]);
    const [showSelect, setShowSelect] = useState(false); 
    const[showDelete,setShowDelete] = useState(true);
    const [currentValue, setCurrentValue] = useState("");
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


    /*function handleUpdate(id, updatedData){
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
        
        }*/
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
                    <EditTipoPropiedad updateData={loadData} createItem={item}  value={currentValue} select={showSelect} setDelete={setShowDelete}  setValue={setCurrentValue} setSelect={setShowSelect}/>
                    </li>
                     ))
                }
             </ul>
             <button type="button"><a href="http://localhost:3000/tipo_propiedad/crear">Crear Nuevo tipo de propiedad</a></button>
            

            <FooterComponent/>
        </div>
    )
}


export default TipoPropiedad
