# Proyecto: Gestor de Conceptos con Node.js y MySQL

Este es un proyecto Full-Stack que permite gestionar un glosario de conceptos. El backend está construido con Node.js puro y **Sequelize** como ORM para interactuar con una base de datos **MySQL**. Los datos ahora son persistentes.

## Cómo Instalar y Ejecutar

1.  **Prerrequisitos:** Tener un servidor MySQL corriendo y haber creado una base de datos (ej: `CREATE DATABASE conceptos_db;`).
2.  Clonar el repositorio y navegar a la carpeta.
3.  **Configurar la conexión:** Editar el archivo `database/connection.js` con tus credenciales de MySQL.
4.  **Instalar dependencias:**
    ```bash
    npm install
    ```
5.  **Iniciar el servidor:**
    ```bash
    npm start
    ```
    Al iniciar, Sequelize creará la tabla `conceptos` automáticamente si no existe.
6.  Abrir el navegador en `http://localhost:3000`.

---

## Pruebas y Validación 🧪

Se incluyen dos casos de prueba por cada funcionalidad.

### 1. Agregar un Concepto
* **Caso 1: Creación exitosa.**
    * **Pasos:** 1. Llenar el campo "Nombre" con "ORM". 2. Llenar "Descripción" con "Object-Relational Mapping". 3. Hacer clic en "Agregar Concepto".
    * **Resultado Esperado:** El concepto "ORM" aparece en la lista. Si se revisa la base de datos, existe un nuevo registro en la tabla `conceptos`.
* **Caso 2: Intento de creación con campos vacíos.**
    * **Pasos:** 1. Dejar el campo "Nombre" vacío. 2. Hacer clic en "Agregar Concepto".
    * **Resultado Esperado:** La aplicación muestra una alerta pidiendo completar los campos. No se crea ningún registro en la base de datos.

### 2. Listar Conceptos
* **Caso 1: Visualizar datos existentes.**
    * **Pasos:** 1. Agregar dos o más conceptos. 2. Recargar la página (`F5`).
    * **Resultado Esperado:** Todos los conceptos agregados previamente persisten y se muestran en la lista, ya que se leen desde la base de datos.
* **Caso 2: Lista vacía.**
    * **Pasos:** 1. Eliminar todos los conceptos existentes. 2. Recargar la página.
    * **Resultado Esperado:** La página muestra un mensaje indicando que no hay conceptos, reflejando el estado vacío de la tabla en la base de datos.

### 3. Eliminar un Concepto Específico
* **Caso 1: Eliminación exitosa.**
    * **Pasos:** 1. Localizar un concepto en la lista. 2. Hacer clic en su botón "Borrar". 3. Confirmar la acción.
    * **Resultado Esperado:** El concepto desaparece de la vista. El registro correspondiente es eliminado de la tabla en la base de datos.
* **Caso 2: Cancelar eliminación.**
    * **Pasos:** 1. Hacer clic en el botón "Borrar" de un concepto. 2. Hacer clic en "Cancelar" en el cuadro de diálogo de confirmación.
    * **Resultado Esperado:** El concepto permanece en la lista y en la base de datos. No se realiza ninguna acción de borrado.

### 4. Eliminar Todos los Conceptos
* **Caso 1: Vaciado de la tabla.**
    * **Pasos:** 1. Con varios conceptos en la lista, hacer clic en "Borrar Todos los Conceptos". 2. Confirmar la acción.
    * **Resultado Esperado:** La lista de conceptos en la página se vacía. Todos los registros de la tabla `conceptos` son eliminados.
* **Caso 2: Intentar borrar con la lista ya vacía.**
    * **Pasos:** 1. Sin conceptos en la lista, hacer clic en "Borrar Todos los Conceptos".
    * **Resultado Esperado:** No ocurre ningún cambio visual ni error. La tabla en la base de datos permanece vacía.

---

## Conclusiones y Reflexiones 💭

1.  **El Reto de la Asincronía y el ORM:** La mayor dificultad en esta etapa fue comprender y manejar correctamente la naturaleza asíncrona de las consultas a la base de datos. A diferencia de un array, cada operación con Sequelize (como `findAll`, `create`, `destroy`) devuelve una Promesa. La solución fue adoptar `async/await` en todas las rutas del servidor. Esto permitió escribir un código más limpio y secuencial, esperando a que la base de datos completara una operación antes de enviar la respuesta al cliente. El ORM (Sequelize) simplificó enormemente las consultas SQL, pero requirió un tiempo de aprendizaje para entender su API y cómo define los modelos de datos.

2.  **La Importancia de la Persistencia y el Modelo de Datos:** Integrar una base de datos cambió fundamentalmente la naturaleza de la aplicación. Pasar de un array volátil a datos persistentes me hizo consciente de la importancia de tener un "modelo" de datos bien definido (`models/concepto.js`). Establecer reglas como `allowNull: false` directamente en el modelo asegura la integridad de los datos desde el backend, en lugar de depender únicamente de validaciones en el frontend. Esta separación entre la lógica del servidor, la conexión a la base de datos y la definición del modelo hizo que el proyecto se sintiera mucho más robusto y profesional.