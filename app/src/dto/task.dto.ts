export interface CreateTaskDTO {
    user_id: number;
    task_status_id: number;
    name: string;
    description: string;
    date?: string;
    is_active?: boolean;
}

export interface UpdateTaskDTO {
    user_id?: number;
    task_status_id?: number;
    name?: string;
    description?: string;
    date?: string;
    is_active?: boolean;
}

export interface TaskResponseDTO {
    id: number;
    userId: number;
    taskStatusId: number;
    name: string;
    description: string | null;
    date: Date;
    isActive: boolean;
}

export const toTaskResponseDTO = (task: {
    id_task: number,
    user_id: number,
    task_status_id: number,
    name: string,
    description: string | null,
    date: Date,
    is_active: boolean
}): TaskResponseDTO => {
    return {
        id: task.id_task,
        userId: task.user_id,
        taskStatusId: task.task_status_id,
        name: task.name,
        description: task.description ?? null,
        date: task.date,
        isActive: task.is_active,
    };
};
