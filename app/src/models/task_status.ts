import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface TaskStatusAttributes {
    id_task_status: number;
    name: string;
    is_active: boolean;
}

class TaskStatus extends Model<TaskStatusAttributes> implements TaskStatusAttributes {
    public id_task_status!: number;
    public name!: string;
    public is_active!: boolean;
}

TaskStatus.init(
    {
        id_task_status: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(100),
            allowNull: false,
            unique: true,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'TaskStatus',
        tableName: 'task_status',
        timestamps: false,
    }
)

export default TaskStatus;