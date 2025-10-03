# 🎯 GestorTareas (API)

Este proyecto es una API de gestión de tareas construida con un stack moderno y containerizado: **Node.js** con **TypeScript**, **Express**, **Sequelize** (ORM) y **PostgreSQL** como base de datos, todo orquestado por **Docker Compose**.

## 🚀 Tecnologías

* **Lenguaje:** TypeScript / JavaScript (Node.js)
* **Framework:** Express
* **Base de Datos:** PostgreSQL
* **ORM:** Sequelize
* **Containerización:** Docker & Docker Compose

---

## 🏗️ Estructura del Proyecto

El proyecto sigue una arquitectura limpia donde la lógica de la aplicación está encapsulada en la carpeta `app`.
```
├── app/
│   ├── src/                 # Código fuente de la aplicación (controladores, modelos, etc.)
│   ├── package.json         # Dependencias de Node
│   ├── tsconfig.json        # Configuración de TypeScript
│   └── Dockerfile           # Instrucciones para construir el contenedor de la API
└── docker-compose.yml       # Orquestación de la API (app) y la DB (db)
```

## Variables de entorno
El proyecto maneja dos archivos .env, uno fuera de app y otro dentro de app.

- Fuera de app
```
APP_CONTAINER_NAME=node_app_task_manager
APP_PORT=3000
NODE_ENV=development
APP_CPU_LIMIT=0.50
APP_MEM_LIMIT=512M

DB_CONTAINER_NAME=postgres_db_task_manager
POSTGRES_USER=postgres
POSTGRES_PASSWORD=supersecret123
POSTGRES_DB=task_manager
POSTGRES_PORT=5432
POSTGRES_LOCAL=5434
DB_CPU_LIMIT=0.5
DB_MEM_LIMIT=512M
```

- Dentro de app
```
APP_CONTAINER_NAME=node_app_task_manager
APP_PORT=3000
NODE_ENV=development
APP_CPU_LIMIT=0.50
APP_MEM_LIMIT=512M

DB_CONTAINER_NAME=postgres_db_task_manager
POSTGRES_USER=postgres
POSTGRES_PASSWORD=supersecret123
POSTGRES_DB=task_manager
POSTGRES_PORT=5432
DB_CPU_LIMIT=0.50
DB_MEM_LIMIT=512M
```

## 💻 Inicio Rápido

Asegúrate de tener **Docker** y **Docker Compose** instalados en tu sistema.

1.  **Clonar el repositorio** y navegar a la carpeta:
    ```bash
    git clone https://github.com/KlmnEly/GestorTareas.git
    cd GestorTareas
    ```

2.  **Crear el archivo `.env`** basado en la sección anterior.

3.  **Ejecutar los contenedores:**
    Este comando construye la imagen de la API, descarga la imagen de PostgreSQL y levanta ambos servicios en segundo plano (`-d`).
    ```bash
    docker-compose up --build -d
    ```

4.  **Verificar la ejecución:**
    La API debería estar disponible en `http://localhost:3000`.

---