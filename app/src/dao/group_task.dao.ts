// src/dao/group-task.dao.ts

import GroupTask from "../models/group_tasks.model"; // Asume que la ruta es correcta
import { GroupTaskAttributes } from "../models/group_tasks.model";
import {
    CreateGroupTaskDTO,
    UpdateGroupTaskDTO,
    GroupTaskResponseDTO,
    toGroupTaskResponseDTO
} from "../dto/group_task.dto";

class GroupTaskDAO {

    public static async getAllGroupTasks(): Promise<GroupTaskResponseDTO[]> {
        const groupTasks = await GroupTask.findAll({
            attributes: ['id_group_task', 'name', 'date', 'is_done', 'is_active']
        });

        return groupTasks.map(groupTask => toGroupTaskResponseDTO(groupTask.get()));
    }

    public static async getGroupTaskById(id_group_task: number): Promise<GroupTaskResponseDTO | null> {
        const groupTask = await GroupTask.findByPk(id_group_task);
        if (!groupTask) {
            return null;
        }

        return toGroupTaskResponseDTO(groupTask.get());
    }

    public static async createGroupTask(groupTaskData: CreateGroupTaskDTO): Promise<GroupTaskResponseDTO> {
        const newGroupTask = await GroupTask.create({
            ...groupTaskData,
            date: new Date(groupTaskData.date),
        } as GroupTaskAttributes); 

        return toGroupTaskResponseDTO(newGroupTask.get());
    }

    public static async updateGroupTask(id_group_task: number, updateData: UpdateGroupTaskDTO): Promise<GroupTaskResponseDTO | null> {
        if (updateData.date) {
            updateData.date = new Date(updateData.date);
        }

        const [rowsAffected, [updatedGroupTask]] = await GroupTask.update(updateData, {
            where: { id_group_task },
            returning: true,
        });

        if (rowsAffected === 0) {
            return null;
        }

        return toGroupTaskResponseDTO(updatedGroupTask.get());
    }

    public static async deleteGroupTask(id_group_task: number): Promise<boolean> {
        const [rowsAffected] = await GroupTask.update({ is_active: false }, {
            where: { id_group_task, is_active: true },
            returning: true,
        });
        return rowsAffected > 0;
    }
}

export default GroupTaskDAO;