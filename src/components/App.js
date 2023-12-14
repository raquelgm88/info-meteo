import { useEffect, useState } from 'react';
import callToApi from '../services/apis';
import '../styles/App.scss';
import Header from './Header';
import Filters from './Filters';


function App() {

  //LLAMAR A LA API
  
  const [provData, setProvData] = useState({});


  const [datosDeLAProv, setDatosDeLAProv] = useState([]);

  useEffect(() => {
    // Dentro de useEffect llamamos a la API
    callToApi().then((response) => {
      // Cuando la API responde guardamos los datos en el estado para que se vuelva a renderizar el componente
      setProvData(response);
    });
    // Aquí ponemos un array vacío porque solo queremos que se llame a la API la primera vez
  }, []);

  useEffect(() => {
    // Dentro de useEffect llamamos a la API
    callToApi(codProv).then((response) => {
      // Cuando la API responde guardamos los datos en el estado para que se vuelva a renderizar el componente
      setDatosDeLAProv(response);
    });
    // Aquí ponemos un array vacío porque solo queremos que se llame a la API la primera vez
  }, []);

  return (
    <>
    <Header/>
    <Filters/>
    </>
  );
};

export default App;
