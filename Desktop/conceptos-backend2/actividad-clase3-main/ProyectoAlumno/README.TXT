# Trabajo Práctico de Backend - Gestor de Conceptos

Esta es una aplicación de Node.js  permite gestionar un listado de conceptos.

---


### 1. Crear un Nuevo Concepto

* **Pasos:**
    1.  Abrir la aplicación en `http://localhost:3000`.
    2.  Ingresar "API REST" en el campo "Concepto".
    3.  Ingresar "Interfaz para conectar sistemas y permitir que se comuniquen entre sí" en el campo "Descripción".
    4.  Hacer clic en el botón "Guardar Concepto".
* **Resultado Esperado:** El nuevo concepto aparece en la lista de "Conceptos Guardados" sin necesidad de recargar la página.
* **Captura de Pantalla:**
    *(Aquí debes insertar una captura de pantalla que muestre el resultado)*
    

### 2. Obtener listado de todos los conceptos (API)

* **Pasos:**
    1.  Con el servidor corriendo, acceder a la URL `http://localhost:3000/conceptos` en el navegador o usar una herramienta como Postman.
* **Resultado Esperado:** Se recibe una respuesta en formato JSON con un arreglo que contiene todos los conceptos creados. `[{"id":1,"nombre":"API REST",...}]`
* **Captura de Pantalla:**
    *(Aquí debes insertar una captura de pantalla de la respuesta JSON)*
    

### 3. Eliminar un concepto específico

* **Pasos:**
    1.  Asegurarse de que haya al menos un concepto en la lista.
    2.  Hacer clic en el botón "Eliminar" correspondiente al concepto que se desea borrar.
* **Resultado Esperado:** El concepto desaparece de la lista inmediatamente.
* **Captura de Pantalla:**
    *(Aquí debes insertar una captura de pantalla antes y después de hacer clic en eliminar)*


## Conclusiones

### Reflexión 1: Manejo de la Asincronía

Una de las principales dificultades que encontré fue comprender el flujo asíncrono de JavaScript, especialmente al usar `fetch` para comunicarme con el backend. Al principio, mi lista de conceptos no se actualizaba después de crear uno nuevo. Resolví este problema utilizando `async/await`, lo que me permitió esperar la respuesta del servidor antes de llamar a la función que refresca la lista. Esto me enseñó la importancia de manejar correctamente las promesas para crear interfaces de usuario fluidas.
