import { useEffect, useState } from 'react';
import callToApi from '../services/api';
import ls from '../services/localStorage';
import '../styles/App.scss';

function App() {

  //LOCALSTORAGE
  
  // Estados

  // En vez de leer la propiedad name leemos la propiedad data y su valor por defecto es un objeto vacío: ls.get('data', {})
  // Del objeto (vacío o relleno que nos devuelve ls.get) obtenemos la propiedad name: ls.get('data', {}).name
  // Si la propiedad name existe la usamos, si no, usamos un string vacío: ls.get('data', {}).name || ''
  const [name, setName] = useState(ls.get('data', {}).name || '');
  // Lo mismo para el email
  const [email, setEmail] = useState(ls.get('data', {}).email || '');

  // useEffect

  // Usamos useEffect para guardar los datos en el local storage
  useEffect(() => {
    // En vez de guardar el nombre por un lado y el email por otro
    // Guardamos en el local storage un objeto data con las propiedad name y email: { name: 'loquesea', email: 'loquefuere' }
    ls.set('data', {
      name: name,
      email: email,
    });
  }, [name, email]);

  // Eventos

  const handleName = (ev) => {
    setName(ev.target.value);
  };

  const handleEmail = (ev) => {
    setEmail(ev.target.value);
  };

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

  return <div className="App">{/* Aquí va el HTML */}</div>;
}

export default App;
