import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import '../styles/App.scss';
import Header from './Header';
import Filters from './Filters';


function App() {

  //LLAMAR A LA API
  
  const [starWarsData, setStarWarsData] = useState({});

  useEffect(() => {
    // Dentro de useEffect llamamos a la API
    callToApi().then((response) => {
      // Cuando la API responde guardamos los datos en el estado para que se vuelva a renderizar el componente
      setStarWarsData(response);
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
