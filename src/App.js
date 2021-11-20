import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  //citas en localstorage
  let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  if(!citasIniciales){
    citasIniciales = [];
  }

  //arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  //useEffect 
  useEffect( () => {
    if(citasIniciales){
      localStorage.setItem('citas', JSON.stringify(citas));
    }
  }, [citas, citasIniciales]);

  //funcion que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas,cita]);
  }

  //elimnar cita por ID
  const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita=> cita.id !== id);
    guardarCitas(nuevasCitas);
  }
  //mensaje condicional
  

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>  
      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            { citas.length !== 0 ? <h2>Administra tus Citas</h2> : <h2>Crea una nueva Cita</h2> }
            {citas.map(cita => (
              <Cita
                key={cita.id}
                cita={cita}
                eliminarCita={eliminarCita}
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
