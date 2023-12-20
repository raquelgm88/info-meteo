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
    });
  }, []);

  useEffect(() => {
    renderProvList();
  }, [provData]);


  useEffect(() => {
    callToApi(codProv).then((response) => {
      // tengo que hacer función que me muestre el tiempo de provincia y lueo me pinte el select con el listado de los municipios. La función la hago fuera y aquí la ejecuto.
      // Ver función use call back.
      renderMunList();
    });
  }, [codProv]);

  useEffect(() => {
    callToApi(provWeatherAndMunListData).then((response) => {
      setProvWeatherAndMunListData(response);
    });
  }, [codProv]);

  // FUNCIONES

  const renderProvList = () => {
    const provSelect = document.querySelector('.main__filter--select');
    if(provSelect.innerHTML === '') {
      for  (let prov of provData) {
        let  provOption = `<option className="main__filter--select_prov" value="${prov.CODPROV}">${prov.NOMBRE_PROVINCIA}</option>`;
        provSelect.innerHTML += provOption;
      };
    }
  };

  const renderMunList = () => {
    const munForm = document.querySelector('.js_mun');
    const label = `<label className="main__filter--label" htmlFor="mun">Selecciona un municipio</label>`;
    const munSelect = `<select className="main__filter--select" name="mun" id="mun" onChange={handleMun} >
    </select>`;
    munForm.innerHTML = label + munSelect;
    
    if(munSelect.innerHTML === '') {
      for  (let mun of codProv) {
        let  munOption = `<option className="main__filter--select_mun" value="${mun.CODIGOINE}">${mun.NOMBRE}</option>`;
        munSelect.innerHTML += munOption;
      };
    }
  };

  const handleProv = (ev) => {
    setCodProv(ev.target.value);
    renderMunList();
  };


  return (
    <>
      <header className="header">
        <h1 className="header__title">INFO METEO</h1>
      </header>
      <main className='main'>
        <form className="main__filter">
          <label className="main__filter--label" htmlFor="prov">Selecciona una provincia</label>
          <select className="main__filter--select" name="prov" id="prov" onChange={handleProv} >
          </select>
        </form>
        <form className='main__filter js_mun'>

        </form>
        <section className='main__container'>
          <h2 className='main__container--title'>El tiempo en (PROVINCIA)</h2>
          <div className='main__container--info'>
            <div className='main__container--info_today'>
              <h3 className='main__container--info_today-title'>Hoy</h3>
              <p className='main__container--info_today-desc'>Descripción de hoy</p>
            </div>
            <div className='main__container--info_tomorrow'>
              <h3 className='main__container--info_tomorrow-title'>Mañana</h3>
              <p className='main__container--info_tomorrow-desc'>Descripción de mañana</p>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default App;
