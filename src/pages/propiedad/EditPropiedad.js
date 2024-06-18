import FooterComponent from "../../components/FooterComponent"
import Header from "../../components/HeaderComponent"
import { useState, useEffect } from "react";


const EditPropiedad =()=>{
    const [localidades,setLocalidades] = useState([]);
    const [tipoPropiedad,setTipoPropiedad] = useState([]);

    useEffect(() => { 
        fetch('http://localhost:80/localidades')
        .then(response => response.json())
        .then(localidades => setLocalidades(localidades.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);

    useEffect(() => { 
        fetch('http://localhost:80/tipos_propiedad')
        .then(response => response.json())
        .then(tipoPropiedad => setTipoPropiedad(tipoPropiedad.data)) .catch(error => console.error('Error fetching data:', error)); 
    }, []);


    return(
        <div>
            <Header/>
            <form>
                <div>
                    Domicilio:
                    <input type="text" />
                </div>

                <div>
                    Localidad:
                    <select>
                        <option value="">Selecciona una propiedad</option>
                        {localidades.map(localidades => (
                            <option key={localidades.id} value={localidades.id}>{localidades.nombre}</option>
                        ))}
                    </select>
                </div>

                <div>
                    Tipo de propiedad:
                    <select>
                        <option value="">Selecciona una propiedad</option>
                        {tipoPropiedad.map(tipoPropiedad => (
                            <option key={tipoPropiedad.id} value={tipoPropiedad.id}>{tipoPropiedad.nombre}</option>
                        ))}
                    </select>
                </div>
                
                <div>
                    Fecha disponibilidad:
                    <input type="date" />
                </div>

                <div>
                    Valor noche:
                    <input type="number" />
                </div>

                <div>
                    Cantidad de Huespedes:
                    <input type="number" />
                </div>
                <button type="submit">Enviar</button>
            </form>
            



            <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>
            <FooterComponent/>
        </div>
    )
}



export default EditPropiedad