import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TaskAttributes {
    id_task: number;
    user_id: number;
    task_status_id: number;
    name: string;
    description?: string;
    date: Date;
    is_active: boolean;
}

class Task extends Model<TaskAttributes> implements TaskAttributes {
    public id_task!: number;
    public user_id!: number;
    public task_status_id!: number;
    public name!: string;
    public description?: string;
    public date!: Date;
    public is_active!: boolean;
}

Task.init(
    {
        id_task: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
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
            allowNull: true,
            defaultValue: null,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
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