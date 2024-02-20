import { useEffect, useState } from 'react';
import callToApi from '../services/apis';
import '../styles/App.scss';


function App() {

// VARIABLES DE ESTADO

  const [provData, setProvData] = useState([]);
  const [codProv, setCodProv] = useState([]);
  const [provWeather, setProvWeather] = useState([]);
  const [munListData, setMunListData] = useState([]);
  const [codMun, setCodMun] = useState([]);
  const [munWeather, setMunWeather] = useState({});


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
    // if(provWeather.length !== 0 && munListData.length !== 0) {
    if(provWeather?.title && munListData?.municipios) { 
      renderProvWeather(provWeather);
      renderMunList(munListData);
    };
  }, [codProv, provWeather, munListData]);

  useEffect(() => {
    callToApi(codMun).then((response) => {
      setMunWeather();
    });
  }, [codProv, codMun]);

  // FALTA useEffect PARA EJECUTAR LA FUNCIÓN renderMunWeather

  // useEffect(() => {
  //   callToApi(munListData).then((response) => {
  //     setMunWeatherData(response);
  //   });
  // }, [codProv, munListData]);



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
    const provWeatherContainer = document.querySelector('.js_prov-container');
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
    const munSelect = `<select className="main__filter--select" name="mun" id="mun" onChange={handleMun}>
    </select>`;
    munForm.innerHTML = label + munSelect;
    const selectMun = document.querySelector('#mun');

    for (let mun of munListData?.municipios) {
      let valueMun = mun.CODIGOINE.slice(0, -6);
      let  munOption = `<option className="main__filter--select_mun" value="${valueMun}">${mun.NOMBRE}</option>`;
      selectMun.innerHTML += munOption;
    };
  };

  const handleProv = (ev) => {
    setCodProv(ev.target.value);
  };

  // const handleMun = (ev) => {
  //   setCodMun(ev.target.value);
  // };

  const renderMunWeather = () => {
    const munWeatherContainer = document.querySelector('.js_mun-container');
    const munWeatherInfo = 
    `<h2 className='main__container--title'>${munWeather.metadescripcion}</h2>
    <div className='main__container-mun--info'>
      <div className='main__container-mun--info_
      temperature'>
        <img className='main__container-mun--info_temperature-
        img' src="" alt="" />
        <p className='main__container-mun--info_temperature-
        degrees'>${munWeather.temperatura_actual} ºC</p>
      </div>
      <div className='main__container-mun--info_maxMin'>
        <p className='main__container-mun--info_maxMin---max'>${munWeather.temperaturas.max} ºC</p>
        <p className='main__container-mun--info_maxMin---min'>${munWeather.temperaturas.min} ºC</p>
      </div>
      <div className='main__container-mun--info_others'>
        <p className='main__container-mun--info_others---precipitation'>${munWeather.precipitacion}%</p>
        <p className='main__container-mun--info_others---humidity'>${munWeather.humedad}%</p>
        <p className='main__container-mun--info_others---wind'>${munWeather.viento} km/h</p>
      </div>
    </div>`;
    munWeatherContainer.innerHTML = munWeatherInfo;
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
        <section className='main__container js_prov-container'>
        </section>
        <section className='main__container-mun js_mun-container'></section>
      </main>
    </>
  );
};

export default App;
