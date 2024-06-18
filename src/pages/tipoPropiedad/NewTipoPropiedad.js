    import React, { useState } from 'react';
    import Header from '../../components/HeaderComponent';
   
    import FooterComponent from '../../components/FooterComponent';
    import "../../assets/styles/NewTipoPropiedad.css"

    const NewTipoPropiedad = () => {

    const [message, setMessage] = useState('');
    const [nombre, setNombre] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = { nombre };
        if (!nombre) {
          alert('El campo no puede estar vacío.')
        }
        fetch('http://localhost:80/tipos_propiedad', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .catch((error) => {
          console.log('Error:', error);
        });
      };
  return (
    <div>
      <Header/>
      <form onSubmit={handleSubmit}>
        <div>
           <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)}/>
        </div>
        <button type="submit" id='crear' >Crear</button>
      </form>
      <button type="button" id="volver"><a href="http://localhost:3000/tipo_propiedad">Volver</a></button>
      <FooterComponent/>
  </div>
  );
};

  

export default NewTipoPropiedad;
