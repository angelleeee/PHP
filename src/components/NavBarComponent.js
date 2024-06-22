import '../assets/styles/NavBar.css'

function NavBarComponent(){
    return (    
        <nav id='lista'> 
            <ul>
                <li>
                    <a href='http://localhost:3000/tipos_propiedad' >TIPO PROPIEDAD</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href='http://localhost:3000/reserva'>RESERVA</a>
                </li>
            </ul>
            <ul>
                <li>
                    <a href='http://localhost:3000'>PROPIEDAD</a>
                </li>
            </ul>
        </nav>
    );
}

export default NavBarComponent
