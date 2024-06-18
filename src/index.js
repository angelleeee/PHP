import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import TipoPropiedadPage from "./pages/tipoPropiedad/TipoPropiedadPage"
import Reserva from './pages/reserva/ReservaPage';
import Propiedad from './pages/propiedad/PropiedadPage';
import NewTipoPropiedad from './pages/tipoPropiedad/NewTipoPropiedad';
import EditTipoPropiedad from './pages/tipoPropiedad/EditTipoPropiedad';
import NewReserva from './pages/reserva/NewReserva';
import EditReserva from './pages/reserva/EditReserva';
import NewPropiedad from './pages/propiedad/NewPropiedad';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/tipo_propiedad" element={<TipoPropiedadPage/>}/>
        <Route path="/reserva" element={<Reserva/>}/>
        <Route path="/" element={<Propiedad/>}/>
        <Route path="tipo_propiedad/crear" element={<NewTipoPropiedad/>}/>
        <Route path="/tipo_propiedad/editar" element={<EditTipoPropiedad/>}/>
        <Route path="/reserva/crear" element={<NewReserva/>}/>
        <Route path="/reserva/editar" element={<EditReserva/>}/>
        <Route path="/crear" element={<NewPropiedad/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
