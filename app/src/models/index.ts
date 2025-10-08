import sequelize from "../config/database";

import Access from "./accesses.model";
import DocumentType from "./document_types.model";
import Role from "./roles.model";
import Task from "./tasks.model";
import User from "./users.model";
import TaskStatus from "./task_status.model";
import GroupTask from "./group_tasks.model";

import { applyAssociations } from "./associations";

applyAssociations();

// Sincronizar modelos con la base de datos
const syncDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Conexión establecida con éxito.');

        await sequelize.sync();
        console.log('Modelos sincronizados con la base de datos.');
    } catch (error) {
        console.error('No se pudo conectar a la base de datos:', error);
    }
};

export {
    sequelize,
    syncDB,
    Access,
    DocumentType,
    Role,
    Task,
    User,
    TaskStatus,
    GroupTask
};