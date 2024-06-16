
function FiltroPropiedad(){
    return(
        <div>
            
            <label for="available">
                Disponible:
                <input type="checkbox" id="available" name="available"/>
            </label>

            <label for="location">
            Localidad:
            <select id="location" name="location">
                <option value="">Selecciona una localidad</option>
                <option value="localidad1">Localidad 1</option>
                <option value="localidad2">Localidad 2</option>
                <option value="localidad3">Localidad 3</option>
            </select>
            </label>

            <label for="startDate">
            Fecha de inicio:
            <input type="date" id="startDate" name="startDate"/>
            </label>

            <label for="guests">
            Cantidad de huéspedes:
            <input type="number" id="guests" name="guests" min="1"/>
            </label>

            <button type="submit">Filtrar</button>

            
        </div>
    )
}

export default FiltroPropiedad