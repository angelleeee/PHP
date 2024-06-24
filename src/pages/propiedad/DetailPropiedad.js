import FooterComponent from "../../components/FooterComponent"
import Header from "../../components/HeaderComponent"
import '../../assets/styles/DetailPropiedad.css'


const DetailPropiedad = () =>{

    return(
        <div>
            <Header/>
            <div className="propiedad">
                <img src="imagen" className="imagen-propiedad" />
                <div className="propiedad-detalles">
                    <h2>nombre_tipo_propiedad</h2>
                    <p><strong>Domicilio:</strong> domicilio</p>
                    <p><strong>Localidad:</strong> nombre_localidad</p>
                    <p><strong>Habitaciones:</strong> cantidad_habitaciones</p>
                    <p><strong>Baños:</strong> cantidad_banios</p>
                    <p><strong>Cochera:</strong> cochera</p>
                    <p><strong>Huéspedes:</strong> cantidad_huespedes</p>
                    <p><strong>Fecha de inicio de disponibilidad:</strong> fecha_inicio_disponibilidad</p>
                    <p><strong>Cantidad de días:</strong> cantidad_dias</p>
                    <p><strong>Valor por noche:</strong> $valor_noche</p>
                    <p><strong>Disponible:</strong> disponible</p>
                </div>
            </div>
            <button type="button" id="volver"><a href="http://localhost:3000">Volver</a></button>
            <FooterComponent/>
        </div>
    )
}


export default DetailPropiedad