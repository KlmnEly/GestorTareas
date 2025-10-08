import { GroupTaskAttributes } from "../models/group_tasks.model";

export interface CreateGroupTaskDTO {
    name: string;
    date: Date;
    is_done?: boolean;
    is_active?: boolean;
}

export interface UpdateGroupTaskDTO {
    name?: string;
    date?: Date;
    is_done?: boolean;
    is_active?: boolean;
}

export interface GroupTaskResponseDTO {
    id: number;
    name: string;
    date: Date;
    isDone: boolean;
    isActive: boolean;
}

export const toGroupTaskResponseDTO = (groupTask: GroupTaskAttributes): GroupTaskResponseDTO => {
    return {
        id: groupTask.id_group_task,
        name: groupTask.name,
        date: groupTask.date,
        isDone: groupTask.is_done,
        isActive: groupTask.is_active,
    };
};