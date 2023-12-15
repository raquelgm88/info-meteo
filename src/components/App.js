import { useEffect, useState } from 'react';
import callToApi from '../services/apis';
import '../styles/App.scss';


function App() {

// VARIABLES DE ESTADO

  const [provData, setProvData] = useState([]);
  // const [provWeatherAndMunListData, setProvWeatherAndMunListData] = useState([]);
  // const [munWeatherData, setMunWeatherData] = useState({});


 // LLAMAR A LA API

    // Llamada para obtener listado de provincias
  useEffect(() => {
    callToApi().then((response) => {
      setProvData(response.provincias);
      console.log(response.provincias);
    });
  }, []);

  // useEffect(() => {
  //   callToApi(codProv).then((response) => {
  //     setDatosDeLAProv(response);
  //   });
  // }, []);

  // FUNCIONES

  const renderProvList = () => {
    const provSelect = document.querySelector('.filter__select');

    if(provSelect.innerHTML === '') {
      for  (let prov of provData) {
        let  provOption = `<option className="filter__select--prov" value="${prov.CODPROV}">${prov.NOMBRE_PROVINCIA}</option>`;
        provSelect.innerHTML += provOption;
      };
    }
  };

  renderProvList();

  const handleProv = (ev) => {
    
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">INFO METEO</h1>
      </header>
      <main>
        <form className="filter">
            <label className="filter__label" htmlFor="prov">Selecciona una provincia</label>
            <select className="filter__select" name="prov" id="prov" onChange={handleProv} value="Elige provincia" >
            </select>
        </form>
      </main>
    </>
  );
};

export default App;
