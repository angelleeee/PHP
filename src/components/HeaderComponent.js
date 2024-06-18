import imagenes from "./imagenes"
import {useLocation} from 'react-router-dom'
import '../assets/styles/HeaderStyle.css'
import NavBarComponent from "./NavBarComponent";

const Header = () => {
    const location = useLocation();
    const getPageName = () =>{
        switch(location.pathname){
            case '/tipo_propiedad':
                return 'Tipo de propiedades';
            case '/reserva':
                return 'Reservas'
            case '/':
                return 'Propiedades-Lee';
            case '/propiedad':
                return 'Propiedades';
            case '/tipo_propiedad/editar':
                return 'Editar tipo de propiedad';
            case '/tipo_propiedad/crear':
                return 'Crear tipo propiedad';
            case '/reserva/editar':
                return 'Editar';
            case '/reserva/crear':
                return 'Hacer una reserva';
            case '/crear':
                return 'Crear';
            case '/editar':
                return 'Editar';
            case '/detalle':
                    return 'Detalle';
        }
    }

    const getImageSrc = () =>{
        switch(location.pathname){
            case '/tipo_propiedad':
                return imagenes.Logo;
            case'/':
                return imagenes.Logo;
            case '/reserva':
                return imagenes.Reserva;
            case '/propiedad':
                return imagenes.Logo;
        }
    }

    return (
        <header className="site-header">
            <div className="logo-container">
                <img src={getImageSrc()} alt="Logo" className="logo" />
            </div>
            <h1 className="site-name">{getPageName()}</h1>
            <NavBarComponent/>
        </header>
    );
};




export default Header