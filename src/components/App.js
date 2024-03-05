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
  const [munWeather, setMunWeather] = useState([]);


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
    if(provWeather?.title && munListData?.municipios) {
      renderProvWeather(provWeather);
      renderMunList(munListData);
    };
  }, [codProv, provWeather, munListData]);

  // useEffect(() => {
  //   renderMunList(munListData);
  // }, [codProv, munListData]);

  useEffect(() => {
    callToApi(codProv, codMun).then((response) => {
      setMunWeather(response);
    });
  }, [codProv, munListData, codMun]);

  useEffect(() => {
    if(munListData?.municipios && codMun){
      renderMunWeather(munWeather);
    }
  }, [codMun, munWeather]);


  // FUNCIONES

  const renderProvList = () => {
    const provSelect = document.querySelector('.main__filter--select');
    const optionProv = document.querySelector('.js_option-prov');
    if(optionProv) {
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
    // const munForm = document.querySelector('.js_mun');
    // const label = `<label className="main__filter--label" htmlFor="mun">Selecciona un municipio</label>`;
    // const munSelect = `<select className="main__filter--select" name="mun" id="mun" onChange={${handleMun}}>
    // </select>`;
    // munForm.innerHTML = label + munSelect;
    const selectMun = document.querySelector('#mun');

    for (let mun of munListData?.municipios) {
      let valueMun = mun.CODIGOINE.slice(0, -6);
      let  munOption = `<option className="main__filter--select_mun" value="${valueMun}">${mun.NOMBRE}</option>`;
      selectMun.innerHTML += munOption;
    };
  };

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
        degrees'>Temperatura actual: ${munWeather.temperatura_actual} ºC</p>
      </div>
      <div className='main__container-mun--info_maxMin'>
        <p className='main__container-mun--info_maxMin---maxi'>Temperatura máxima hoy: ${munWeather.temperaturas?.max} ºC</p>
        <p className='main__container-mun--info_maxMin---min'>Temperatura mínima hoy: ${munWeather.temperaturas?.min} ºC</p>
      </div>
      <div className='main__container-mun--info_others'>
        <p className='main__container-mun--info_others---precipitation'>Precipitación: ${munWeather.precipitacion}%</p>
        <p className='main__container-mun--info_others---humidity'>Humedad: ${munWeather.humedad}%</p>
        <p className='main__container-mun--info_others---wind'>Viento: ${munWeather.viento} km/h</p>
      </div>
    </div>`;
    munWeatherContainer.innerHTML = munWeatherInfo;
  };


  const deleteProvWeather = () => {
    document.querySelector('.js_prov-container').innerHTML = '';
  };

   const deleteMunList = () => {
    document.querySelector('#mun').innerHTML = '';
  };

  const deleteMunWeather = () =>  {
    document.querySelector('.js_mun-container').innerHTML = '';
  };

  const resetAll = () => {
    deleteProvWeather();
    deleteMunList();
    deleteMunWeather();
    setProvWeather([]);
    setMunListData([]);
    setCodMun([]);
    setMunWeather([]);
  };
  
 


  const handleProv = (ev) => {
    if(!ev.target.value) {
      resetAll();
    }else{
      setCodProv(ev.target.value);
      deleteMunWeather(); 
      setCodMun([]);
      setMunWeather([]);
    }
  };

  const handleMun = (ev) => {
    setCodMun(ev.target.value);
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
            <option className="main__filter--select_prov js_option-prov" value="">PROVINCIAS</option>
          </select>
        </form>
        <form className='main__filter js_mun'>
          <label className="main__filter--label" htmlFor="mun">Selecciona un municipio</label>
          <select className="main__filter--select" name="mun" id="mun" onChange={handleMun}>
            <option className="main__filter--select_mun" value="">MUNICIPIOS</option>
          </select>
        </form>
        <section className='main__container js_prov-container'>
        </section>
        <section className='main__container-mun js_mun-container'></section>
      </main>
    </>
  );
};

export default App;
