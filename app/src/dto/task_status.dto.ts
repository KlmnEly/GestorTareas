// DTO de Entrada: Lo que se espera del cliente al crear un nuevo estado de tarea
export interface CreateTaskStatusDTO {
    name: string;
    is_active?: boolean; 
}

// DTO de Salida: Lo que se le devuelve al cliente después de una operación (respuesta limpia)
export interface TaskStatusResponseDTO {
    id: number;
    name: string;
    isActive: boolean; 
}

/**
 * Función de mapeo para transformar un objeto Sequelize/Modelo a nuestro DTO de Salida.
 * Esto asegura que solo enviamos los campos que queremos.
 */
export const toTaskStatusResponseDTO = (task_status: { id_task_status: number, name: string, is_active: boolean }): TaskStatusResponseDTO => {
    return {
        id: task_status.id_task_status,
        name: task_status.name,
        isActive: task_status.is_active,
    };
};