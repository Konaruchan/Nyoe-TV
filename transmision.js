// URL de la hoja de cálculo en GitHub
const spreadsheetURL = 'https://raw.githubusercontent.com/Konaruchan/Nyoe-TV/hoja_de_calculo.csv';

// Función para cargar y procesar los datos de la hoja de cálculo
async function procesarHojaDeCalculo() {
    try {
        // Cargar datos desde la hoja de cálculo
        const response = await fetch(spreadsheetURL);
        const data = await response.text();

        // Procesar los datos de la hoja de cálculo
        const filas = data.split('\n');
        const horaActual = new Date().getHours();

        // Iterar sobre las filas y determinar qué serie transmitir
        filas.forEach(fila => {
            const columnas = fila.split(',');
            const horaInicio = parseInt(columnas[0].split(':')[0]);
            const nombreSerie = columnas[1];

            if (horaInicio <= horaActual) {
                console.log('La serie a transmitir es:', nombreSerie);
                // Aquí puedes llamar a funciones para manejar los videos
                reproducirBumper(columnas[2]);
                reproducirEpisodios(columnas[3]);
            }
        });
    } catch (error) {
        console.error('Error al procesar la hoja de cálculo:', error);
    }
}

// Función para reproducir el bumper de la serie
function reproducirBumper(archivoBumper) {
    const videoContainer = document.getElementById('video-container');

    // Crear elemento de video para el bumper
    const video = document.createElement('video');
    video.src = `bumpers/${archivoBumper}`;
    video.controls = false;
    video.autoplay = true;
    video.loop = false;

    // Agregar el video al contenedor
    videoContainer.appendChild(video);
}

// Función para reproducir los episodios de la serie
function reproducirEpisodios(archivoEpisodios) {
    const videoContainer = document.getElementById('video-container');

    // Crear elemento de video para cada episodio
    const episodios = archivoEpisodios.split(',');
    episodios.forEach(archivo => {
        const video = document.createElement('video');
        video.src = `episodios/${archivo}`;
        video.controls = false;
        video.autoplay = true;
        video.loop = false;

        // Agregar el video al contenedor
        videoContainer.appendChild(video);
    });
}

// Llamar a la función para procesar la hoja de cálculo cuando la página cargue
document.addEventListener('DOMContentLoaded', procesarHojaDeCalculo);
