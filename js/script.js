const titleElement = document.getElementById('title');
const textElement = document.getElementById('text');

const firebaseUrl = 'https://dawn-9601d-default-rtdb.firebaseio.com/mundotech.json';

fetch(firebaseUrl)
  .then(response => response.json())
  .then(data => {
    if (data) {
      const dataKey = Object.keys(data)[0];
      const dataObj = data[dataKey];

      titleElement.textContent = dataObj.title;
      textElement.textContent = dataObj.text;
    } else {
      console.log('No hay datos disponibles');
    }
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });
