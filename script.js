const characterElement = document.getElementById('characters')
const nameFilterElement = document.getElementById('name-filter')
const statusFilterElement = document.getElementById('status-filter')

// Función que hace el llamado a la API
async function getCharacters(name, status){

    // Guardamos en una variable la url de la API
    let url = 'https://rickandmortyapi.com/api/character/';

    if (name || status){
        url+= '?';
        if (name){
            url += `name=${name}&`;
        }

        if (status){
            url += `status=${status}`;
        }
    }

    /* Dentro de una variable guardamos los datos del llamado a la api.
     - Con await decimos que espere hasta que se obtenga el resultado de haber llamado a la API.
     - Fetch es una función que hace un GET.
     */
    const response = await fetch(url);
    // Esperamos hasta convertir el GET de un raw (en sucio) a un .json
    const data = await response.json();

    // Con esto en consola podremos ver el resultado
    // console.log(data.results)
    
    // Devuelve los resultados de la API en el formato correspondiente anterior (.json)
    return data.results
}

async function displayCharacters (name, status) {
    
    // Obtener los personajes filtrados
    const characters = await getCharacters(name, status);

    characterElement.innerHTML = '';

    // renderizar los personajes
    for( let character of characters ){
        const card = document.createElement('div');
        card.classList.add('character-card');

        card.innerHTML = `
            <img src="${character.image}" />
            <h2> ${character.name} </h2>
            <p> Status: ${character.status} </p>
            <p> Especie: ${character.species} </p>
        `;

        characterElement.appendChild(card);

    }
}

displayCharacters();

nameFilterElement.addEventListener('input', () => {
    // console.log(nameFilterElement.value);
    displayCharacters(nameFilterElement.value, statusFilterElement.value);
});

statusFilterElement.addEventListener('change', () => {
    displayCharacters(nameFilterElement.value, statusFilterElement.value) 
})