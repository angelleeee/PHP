    import React, { useState } from 'react';
    //import "../../assets/styles/NewTipoPropiedad.css"

    const NewTipoPropiedad = ({updateData}) => {

    const [showInput, setShowInput] = useState(false);

    // Función para manejar el evento de clic del botón
    const handleButtonClick = () => {
        setShowInput(true);
    };
    const cerrar = () =>{
        setShowInput(false);
    }

    
    const [message, setMessage] = useState('');
    const [nombre, setNombre] = useState('');


    const handleSubmit = (event) => {
        event.preventDefault();
  
    
        const data = { nombre };
    
        fetch('http://localhost:80/tipos_propiedad', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "error") {
            throw new Error(data.message);
          }
          setMessage(data.message);
          setNombre(''); // Limpiar el campo de entrada después de un envío exitoso
        })
        .then(() => cerrar())
        .then(() => updateData())
        .catch((error) => {
          console.log('Error:', error);

          if (!nombre) {
            alert('El nombre no puede estar vacío.')
          }else{
            alert('El tipo de propiedad no puede repetirse')
          }

        });
      };
  return (
    <div>
    
    <form onSubmit={handleSubmit}>
      <div>
        
        {showInput && <input
          type="text"
          id="nombre"   
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />}
      </div>
      {showInput && <button type="submit" >Crear</button>}
    </form>
  </div>
  );
};

  

export default NewTipoPropiedad;
