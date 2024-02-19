import { useEffect, useState } from 'react';
import callToApi from '../services/apis';
import '../styles/App.scss';


function App() {

// VARIABLES DE ESTADO

  const [provData, setProvData] = useState([]);
  const [codProv, setCodProv] = useState([]);
  const [provWeather, setProvWeather] = useState([]);
  const [munListData, setMunListData] = useState([]);
  // const [munWeatherData, setMunWeatherData] = useState({});


 // LLAMAR A LA API

    // Llamada para obtener listado de provincias
  useEffect(() => {
    callToApi().then((response) => {
      setProvData(response.provincias);
    });
  }, []);

  // Hacemos useEffect para poder detectar el cambio en el valor de la variable (provData), y ahí sí se ejecutaría la función.

  useEffect(() => {
    renderProvList();
  }, [provData]);


  useEffect(() => {
    callToApi(codProv).then((response) => {
      // const {municipios} = response[1];
      // setMunListData(municipios);

      setProvWeather(response[0]);
      setMunListData(response[1]);
    });
  }, [codProv]);

  useEffect(() => {
    debugger;
    // if(provWeather.length !== 0 && munListData.length !== 0) {
    if(provWeather?.title && munListData?.municipios) { 
      renderProvWeather(provWeather);
      renderMunList(munListData);
    };
  }, [codProv, provWeather, munListData]);


  // useEffect(() => {
  //   callToApi(provWeatherAndMunListData).then((response) => {
  //     setProvWeatherAndMunListData(response);
  //   });
  // }, [codProv]);

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

  const renderProvWeather = () => {
    const provWeatherContainer = document.querySelector('.js__prov-container');
    const provWeatherInfo = 
    `<h2 className='main__container--title'>${provWeather.title}</h2>
    <div className='main__container--info'>
      <div className='main__container--info_today'>
        <h3 className='main__container--info_today-title'>Hoy</h3>
        <p className='main__container--info_today-desc'>${provWeather.today.p}</p>
      </div>
      <div className='main__container--info_tomorrow'>
        <h3 className='main__container--info_tomorrow-title'>Mañana</h3>
        <p className='main__container--info_tomorrow-desc'>${provWeather.tomorrow.p}</p>
      </div>
    </div>`;
    provWeatherContainer.innerHTML = provWeatherInfo;
  };


  
  const renderMunList = () => {
    const munForm = document.querySelector('.js_mun');
    const label = `<label className="main__filter--label" htmlFor="mun">Selecciona un municipio</label>`;
    const munSelect = `<select className="main__filter--select" name="mun" id="mun" onChange={handleMun} >
    </select>`;
    munForm.innerHTML = label + munSelect;
    const selectMun = document.querySelector('#mun');

    for (let mun of munListData?.municipios) {
      console.log(mun.NOMBRE);
      console.log(mun.CODIGOINE.slice(0, -6));
      let valueMun = mun.CODIGOINE.slice(0, -6);
      // let codigoIne = mun.CODIGOINE;
      // let valueMun = codigoIne.slice(0, -6);
      debugger;

      let  munOption = `<option className="main__filter--select_mun" value="${valueMun}">${mun.NOMBRE}</option>`;
      selectMun.innerHTML += munOption;
    };
  };

  const handleProv = (ev) => {
    setCodProv(ev.target.value);
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
        <section className='main__container js__prov-container'>
        </section>
      </main>
    </>
  );
};

export default App;
