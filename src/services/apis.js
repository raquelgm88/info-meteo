// Fichero src/services/api.js

const URL_PROV = 'https://www.el-tiempo.net/api/json/v2/provincias'

// Obtener provincias
// callToApi()

// // Obtener tiempo provincia
// callToApi(codProv)

// // Obtener tiempo municipio
// callToApi(codProv, codMun)


const callToApi = (codProv = '', codMun = '') => {
  let url = URL_PROV;

 if(codProv !== '' && codMun === '') {
    url = `${url}/${codProv}`;
    let urlMun = `${url}/municipios`;

    const provWeather = fetch(url).then(response => response.json())
    const munList = fetch(urlMun).then(response => response.json())

    return Promise.all([provWeather, munList]).then(results => {
      // aquí obtenemos un array con los resultados de cada promesa
      // const [provResult, munResult] = results
      return results;
    })

  } else if(codProv !== '' && codMun !== '') {
    url = `${url}/${codProv}/municipios/${codMun}`;
  }

// si los dos parámetros son string vacío, la url se devuelve tal cual por defecto
// si codProv no es vacío, y codMun es vacío, url + codProv + /municipios
// LLAMADA CUANDO SELECCIONO MUNICIPIO: cuando no estan vacíos nunguno, hago 3ª llamada


  // Llamamos a la API
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export default callToApi;