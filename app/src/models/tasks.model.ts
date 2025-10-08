import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

import User from './users.model'; 
import GroupTask from './group_tasks.model'; 
import TaskStatus from './task_status.model'; 

export interface TaskAttributes {
    id_task: number;
    group_task_id: number;
    user_id: number;
    task_status_id: number;
    name: string;
    description?: string;
    date?: Date;
    is_active?: boolean;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    public id_task!: number;
    group_task_id!: number;
    public user_id!: number;
    public task_status_id!: number;
    public name!: string;
    public description?: string;
    public date?: Date;
    public is_active?: boolean;
    public user?: User; 
    public groupTask?: GroupTask; 
    public taskStatus?: TaskStatus;
}

Task.init(
    {
        id_task: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        group_task_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'group_tasks',
                key: 'id_group_task',
            },
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'users',
                key: 'id_user',
            },
        },
        task_status_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'task_status',
                key: 'id_task_status',
            },
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        date: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: true,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'Task',
        tableName: 'tasks',
        timestamps: false,
    }
)

export default Task;