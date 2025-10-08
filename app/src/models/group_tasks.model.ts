import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';

export interface GroupTaskAttributes {
    id_group_task: number;
    name: string;
    date: Date;
    is_done: boolean;
    is_active: boolean;
}

class GroupTask extends Model<GroupTaskAttributes> implements GroupTaskAttributes {
    public id_group_task!: number;
    public name!: string;
    public date!: Date;
    public is_done!: boolean;
    public is_active!: boolean;
}

GroupTask.init(
    {
        id_group_task: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        is_done: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        is_active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true,
        },
    },
    {
        sequelize,
        modelName: 'GroupTask',
        tableName: 'group_tasks',
        timestamps: false,
    }
)

export default GroupTask;