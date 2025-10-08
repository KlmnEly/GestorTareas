import User from '../models/users.model';
import TaskStatus from '../models/task_status.model';
import GroupTask from '../models/group_tasks.model';

// Interfaces de modelos anidados (puedes usar interfaces más simples si solo necesitas algunos campos)
interface UserInTaskDTO {
    id_user: number;
    name: string;
    // Agrega aquí cualquier otro campo del User que quieras ver
}

interface TaskStatusInTaskDTO {
    id_task_status: number;
    name: string;
}

interface GroupTaskInTaskDTO {
    id_group_task: number;
    name: string;
}

export interface CreateTaskDTO {
    group_task_id: number;
    user_id: number;
    task_status_id: number;
    name: string;
    description?: string;
    date?: Date;
    is_active?: boolean;
}

export interface UpdateTaskDTO {
    group_task_id?: number;
    user_id?: number;
    task_status_id?: number;
    name?: string;
    description?: string;
    date?: Date;
    is_active?: boolean;
}

// 💥 NUEVA INTERFAZ DE RESPUESTA
export interface TaskResponseDTO {
    id: number;
    name: string;
    description: string;
    date: Date;
    isActive: boolean;
    
    // Las claves de relación ahora contienen objetos, no solo IDs
    user: UserInTaskDTO;
    taskStatus: TaskStatusInTaskDTO;
    groupTask: GroupTaskInTaskDTO;

    // Puedes mantener los IDs si los necesitas en el frontend, pero ya no son estrictamente necesarios
    groupTaskId: number;
    userId: number;
    taskStatusId: number;
}

// 💥 NUEVA FUNCIÓN DE MAPEO
export const toTaskResponseDTO = (task: {
    id_task: number,
    group_task_id: number,
    user_id: number,
    task_status_id: number,
    name: string,
    description?: string | null,
    date?: Date,
    is_active?: boolean,
    user?: User, // Sequelize adjunta el objeto User aquí
    taskStatus?: TaskStatus, // Sequelize adjunta el objeto TaskStatus aquí
    groupTask?: GroupTask // Sequelize adjunta el objeto GroupTask aquí
}): TaskResponseDTO => {

    // Helper para asegurar que la descripción no sea nula/undefined
    const description = task.description ?? ''; 
    
    // Helper para mapear solo los campos que necesitamos del Usuario
    const mapUser = (user: User) => ({
        id_user: user.id_user,
        name: user.fullname,
    });

    // Helper para mapear solo los campos que necesitamos del Estado
    const mapTaskStatus = (status: TaskStatus) => ({
        id_task_status: status.id_task_status,
        name: status.name,
    });

    // Helper para mapear solo los campos que necesitamos del Grupo
    const mapGroupTask = (group: GroupTask) => ({
        id_group_task: group.id_group_task,
        name: group.name,
    });

    return {
        id: task.id_task,
        name: task.name,
        description: description,
        date: task.date ?? new Date(),
        isActive: task.is_active ?? true,

        user: mapUser(task.user as User), // Asumimos que el DAO siempre lo incluye
        taskStatus: mapTaskStatus(task.taskStatus as TaskStatus),
        groupTask: mapGroupTask(task.groupTask as GroupTask),
        
        // Mantenemos los IDs para compatibilidad o uso directo si es necesario
        groupTaskId: task.group_task_id,
        userId: task.user_id,
        taskStatusId: task.task_status_id,
    };
}