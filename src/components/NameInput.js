import React, { useState } from 'react';

const NameInput = () => {
    const [name, setName] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(name==='')
            alert('No puede estar vacio');
        else alert(`Nombre ingresado: ${name}`);
    };
    
    return (
        <form onSubmit={handleSubmit}>
            <label>
                Nombre:
                <input type="text" value={name} onChange={handleChange} />
            </label>
            <button type="submit">Enviar</button>
            <p>Resultados para:{name}</p>
        </form>
        
    );
};


export default NameInput;
