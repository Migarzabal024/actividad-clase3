
Este proyecto es una aplicación web que permite gestionar un glosario de conceptos. Utiliza HTML, CSS y JavaScript en el lado del cliente, y Node.js puro (sin frameworks como Express) en el lado del servidor para manejar una API RESTful que gestiona los datos en memoria.

---


Para levantar el proyecto en un entorno local:

1.  **Clonar el repositorio:** (Recuerda reemplazar la URL por la de tu propio repositorio cuando lo subas a GitHub)
    ```bash
    git clone [https://github.com/tu_usuario/tu_repositorio.git](https://github.com/tu_usuario/tu_repositorio.git)
    ```
2.  **Navegar a la carpeta del proyecto:**
    ```bash
    cd tu_repositorio
    ```
3.  **Iniciar el servidor:**
    ```bash
    node server.js
    ```
4.  Abrir tu navegador web preferido y visitar la siguiente dirección:
    ```
    http://localhost:3000
    ```

---

Visualizar la lista de conceptos inicial

    1.  Iniciar el servidor con `node server.js`.
    2.  Abrir el navegador en `http://localhost:3000`.
* **Resultado Esperado:** La página debe cargar correctamente. Se deben visualizar los dos conceptos que vienen por defecto en el código ("Node.js" y "DOM"), cada uno con su título, descripción y un botón rojo para "Eliminar".


Agregar un nuevo concepto


    1.  En el formulario "Agregar Nuevo Concepto", rellenar el campo "Concepto" (ej: "Git").
    2.  Rellenar el campo "Desarrollo" (ej: "Sistema de control de versiones distribuido.").
    3.  Hacer clic en el botón "Guardar Concepto".
* **Resultado Esperado:** El nuevo concepto "Git" debe aparecer al final de la lista, sin que la página se recargue. Los campos del formulario deben limpiarse automáticamente.


Eliminar un concepto específico


    1.  Ubicar un concepto en la lista (ej: "DOM").
    2.  Hacer clic en su respectivo botón "Eliminar".
* **Resultado Esperado:** El concepto "DOM" debe desaparecer de la lista de forma instantánea, sin que la página se recargue.


Eliminar todos los conceptos


    1.  Hacer clic en el botón rojo "Eliminar Todo" que se encuentra sobre la lista.
    2.  Confirmar la acción en la ventana emergente del navegador haciendo clic in "Aceptar".
* **Resultado Esperado:** Todos los conceptos de la lista deben 
---

##  Conclusiones
