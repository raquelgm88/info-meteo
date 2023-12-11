// Fichero src/services/api.js
const callToApi = (codProv , idMun) => {
  // Llamamos a la API
  return fetch(`https://www.el-tiempo.net/api/json/v2/provincias/${codProv}/municipios/${idMun}`)
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
};

export default callToApi;