// Se ejecuta cuando el DOM (la estructura de la página) se ha cargado completamente.
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. OBTENER REFERENCIAS A LOS ELEMENTOS DEL DOM
    const form = document.getElementById('concept-form');
    const conceptNameInput = document.getElementById('concept-name');
    const conceptDescriptionInput = document.getElementById('concept-description');
    const conceptsListDiv = document.getElementById('concepts-list');
    
    // URL base de nuestra API
    const API_URL = 'http://localhost:3000/conceptos';

    // 2. FUNCIÓN PARA OBTENER Y MOSTRAR TODOS LOS CONCEPTOS
    async function fetchAndDisplayConcepts() {
        try {
            // Hacemos una petición GET a nuestra API
            const response = await fetch(API_URL);
            const conceptos = await response.json();

            // Limpiamos la lista actual en el HTML
            conceptsListDiv.innerHTML = '';

            // Por cada concepto en el array, creamos una tarjeta y la añadimos al div
            conceptos.forEach(concepto => {
                const conceptCard = document.createElement('div');
                conceptCard.className = 'concept-card';
                conceptCard.innerHTML = `
                    <h3>${concepto.nombre}</h3>
                    <p>${concepto.descripcion}</p>
                    <button class="delete-btn" data-id="${concepto.id}">Eliminar</button>
                `;
                conceptsListDiv.appendChild(conceptCard);
            });
        } catch (error) {
            console.error('Error al obtener los conceptos:', error);
        }
    }

    // 3. MANEJAR EL ENVÍO DEL FORMULARIO PARA CREAR UN NUEVO CONCEPTO
    form.addEventListener('submit', async (event) => {
        // Prevenimos el comportamiento por defecto del formulario (recargar la página)
        event.preventDefault();

        const nombre = conceptNameInput.value;
        const descripcion = conceptDescriptionInput.value;

        // Creamos el objeto del nuevo concepto
        const newConcept = { nombre, descripcion };

        try {
            // Hacemos una petición POST a la API, enviando el nuevo concepto en el cuerpo
            await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newConcept), // Convertimos el objeto a un string JSON
            });

            // Limpiamos los campos del formulario
            conceptNameInput.value = '';
            conceptDescriptionInput.value = '';
            
            // Refrescamos la lista de conceptos para que aparezca el nuevo
            fetchAndDisplayConcepts();

        } catch (error) {
            console.error('Error al crear el concepto:', error);
        }
    });

    // 4. MANEJAR LA ELIMINACIÓN DE UN CONCEPTO
    // Usamos delegación de eventos para escuchar clics en los botones de eliminar
    conceptsListDiv.addEventListener('click', async (event) => {
        // Si el elemento clickeado tiene la clase 'delete-btn'
        if (event.target.classList.contains('delete-btn')) {
            // Obtenemos el ID del atributo 'data-id'
            const id = event.target.getAttribute('data-id');

            try {
                // Hacemos una petición DELETE a la API para el ID específico
                await fetch(`${API_URL}/${id}`, {
                    method: 'DELETE',
                });

                // Refrescamos la lista para que el concepto eliminado desaparezca
                fetchAndDisplayConcepts();

            } catch (error) {
                console.error('Error al eliminar el concepto:', error);
            }
        }
    });


    // 5. LLAMADA INICIAL PARA CARGAR LOS CONCEPTOS CUANDO LA PÁGINA SE ABRE
    fetchAndDisplayConcepts();
});