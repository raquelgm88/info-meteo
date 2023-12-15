import { useEffect, useState } from 'react';
import callToApi from '../services/apis';
import '../styles/App.scss';


function App() {

// VARIABLES DE ESTADO

  const [provData, setProvData] = useState([]);
  const [codProv, setCodProv] = useState([]);
  const [provWeatherAndMunListData, setProvWeatherAndMunListData] = useState([]);
  // const [munWeatherData, setMunWeatherData] = useState({});


 // LLAMAR A LA API

    // Llamada para obtener listado de provincias
  useEffect(() => {
    callToApi().then((response) => {
      setProvData(response.provincias);

      debugger;
    });
  }, []);

  useEffect(() => {
    renderProvList();
  }, [provData]);


  useEffect(() => {
    debugger;
    callToApi(provWeatherAndMunListData).then((response) => {
      debugger;
      // tengo que hacer función que me muestre el tiempo de provincia y lueo me pinte el select con el listado de los municipios. La función la hago fuera y aquí la ejecuto.
      // Ver función use call back.
    });
  }, [codProv]);

  useEffect(() => {
    debugger;
    callToApi(provWeatherAndMunListData).then((response) => {
      debugger;
      setProvWeatherAndMunListData(response);
    });
  }, [codProv]);

  // FUNCIONES

  const renderProvList = () => {
    const provSelect = document.querySelector('.filter__select');
debugger;
    if(provSelect.innerHTML === '') {
      for  (let prov of provData) {
        let  provOption = `<option className="filter__select--prov" value="${prov.CODPROV}">${prov.NOMBRE_PROVINCIA}</option>`;
        provSelect.innerHTML += provOption;
      };
    }
  };

  // renderProvList();

  const handleProv = (ev) => {
    debugger;
    setCodProv(ev.target.value);
  };


  const renderMunList = () => {
    
  };

  return (
    <>
      <header className="header">
        <h1 className="header__title">INFO METEO</h1>
      </header>
      <main>
        <form className="filter">
            <label className="filter__label" htmlFor="prov">Selecciona una provincia</label>
            <select className="filter__select" name="prov" id="prov" onChange={handleProv} >
            </select>
        </form>
      </main>
    </>
  );
};

export default App;
