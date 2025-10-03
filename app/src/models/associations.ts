import Role from './roles.model';
import DocumentType from './document_types.model';
import TaskStatus from './task_status.model';
import Access from './accesses.model';
import User from './users.model';
import Task from './tasks.model';

export const applyAssociations = () => {
    // Accesses y Roles (Uno a Muchos)
    // Un rol puede tener muchos accesos, pero un acceso pertenece a un solo rol
    Role.hasMany(Access, { 
        foreignKey: 'role_id',
        as: 'accesses' 
    });
    Access.belongsTo(Role, { 
        foreignKey: 'role_id',
        as: 'role' 
    });

    // Users y DocumentTypes (Uno a Muchos)
    // Un tipo de documento puede tener muchos usuarios, pero un usuario pertenece a un solo tipo de documento
    DocumentType.hasMany(User, { 
        foreignKey: 'document_type_id' ,
        as: 'users'
    });
    User.belongsTo(DocumentType, { 
        foreignKey: 'document_type_id',
        as: 'documentType'
    });

    // Users y Accesses (Uno a Uno)
    // Un acceso tiene un usuario, y un usuario pertenece a un acceso
    Access.hasOne(User, { 
        foreignKey: 'access_id',
        as: 'user'
    });
    User.belongsTo(Access, { 
        foreignKey: 'access_id',
        as: 'access'
    });

    // Tasks y Users (Uno a Muchos)
    // Un usuario puede tener muchas tareas, pero una tarea pertenece a un solo usuario
    User.hasMany(Task, { 
        foreignKey: 'user_id',
        as: 'tasks'
    });
    Task.belongsTo(User, { 
        foreignKey: 'user_id',
        as: 'user'
    });

    // Tasks y TaskStatus (Uno a Muchos)
    // Un estado de tarea puede tener muchas tareas, pero una tarea pertenece a un solo estado de tarea
    TaskStatus.hasMany(Task, { 
        foreignKey: 'task_status_id',
        as: 'tasks'
    });
    Task.belongsTo(TaskStatus, { 
        foreignKey: 'task_status_id',
        as: 'taskStatus'
    });
}